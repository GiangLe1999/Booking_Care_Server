import _ from "lodash";
import db from "../models";
import { convertToDDMMYY } from "../lib/format-date";
import moment from "moment/moment";

export const getTopDoctors = async (limit = 10) => {
  try {
    const doctors = await db.User.findAll({
      limit: +limit,
      where: { roleId: "R2" },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "genderData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      raw: true,
      nest: true,
    });

    return { doctors, ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getAllDoctors = async () => {
  try {
    const doctors = await db.User.findAll({
      where: { roleId: "R2" },
    });
    return { ok: true, doctors };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const saveDoctorInfo = async (newDoctorInfo) => {
  try {
    const {
      doctorId,
      content,
      description,
      priceId,
      provinceId,
      paymentId,
      clinicAddress,
      clinicName,
      note,
    } = newDoctorInfo;
    if (!doctorId || !content || !priceId || paymentId || !clinicName) {
      return {
        ok: false,
        error: "Missing required parameter",
      };
    }

    const existedDoctorInfo = await db.Doctor_Info.findOne({
      where: { doctorId },
      raw: false,
    });

    if (existedDoctorInfo) {
      existedDoctorInfo.priceId = priceId;
      existedDoctorInfo.provinceId = provinceId;
      existedDoctorInfo.paymentId = paymentId;
      existedDoctorInfo.clinicAddress = clinicAddress;
      existedDoctorInfo.clinicName = clinicName;
      existedDoctorInfo.note = note;

      await existedDoctorInfo.save();
    } else {
      await db.Doctor_Info.create({
        doctorId,
        priceId,
        provinceId,
        paymentId,
        clinicAddress,
        clinicName,
        note,
      });
    }

    await db.Content.create({
      doctorId,
      content,
      description,
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const editDoctorInfo = async (newDoctorInfo) => {
  try {
    const {
      doctorId,
      content,
      description,
      priceId,
      provinceId,
      paymentId,
      clinicAddress,
      clinicName,
      note,
    } = newDoctorInfo;
    if (!doctorId || !content || !priceId || !paymentId || !clinicName) {
      return {
        ok: false,
        error: "Missing required parameter",
      };
    }

    const existedContent = await db.Content.findOne({
      where: { doctorId },
      raw: false,
    });
    if (!existedContent) {
      return {
        ok: false,
        error: "Found no content of doctor",
      };
    }

    existedContent.content = content;
    existedContent.description = description;

    await existedContent.save();

    const existedDoctorInfo = await db.Doctor_Info.findOne({
      where: { doctorId },
      raw: false,
    });

    if (existedDoctorInfo) {
      existedDoctorInfo.priceId = priceId;
      existedDoctorInfo.provinceId = provinceId;
      existedDoctorInfo.paymentId = paymentId;
      existedDoctorInfo.clinicAddress = clinicAddress;
      existedDoctorInfo.clinicName = clinicName;
      existedDoctorInfo.note = note;

      await existedDoctorInfo.save();
    } else {
      await db.Doctor_Info.create({
        doctorId,
        priceId,
        provinceId,
        paymentId,
        clinicAddress,
        clinicName,
        note,
      });
    }

    await db.Content.create({
      doctorId,
      content,
      description,
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getDoctorById = async (id) => {
  try {
    if (!id) {
      return {
        ok: false,
        error: "Missing required parameter id",
      };
    }

    const doctor = await db.User.findOne({
      where: { id },
      include: [
        {
          model: db.Content,
          attributes: ["description", "content"],
        },
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Doctor_Info,
          attributes: {
            exclude: ["id", "doctorId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });

    return {
      ok: true,
      doctor,
    };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

const MAX_SCHEDULES_AT_SAME_TIME = 10;
export const bulkCreateSchedule = async (data) => {
  try {
    if (!data || !data.length) {
      return { ok: false, error: "Missing required parameter schedules" };
    }

    const existedSchedules = await db.Schedule.findAll({
      where: {
        doctorId: data[0].doctorId,
      },
      attributes: ["doctorId", "date", "timeType", "maxNumber"],
    });

    let formattedSchedules = data;
    formattedSchedules = formattedSchedules.map((schedule) => ({
      ...schedule,
      date: new Date(schedule.date),
      maxNumber: MAX_SCHEDULES_AT_SAME_TIME,
    }));

    const newExistedSchedules = existedSchedules.map((e) => {
      return JSON.stringify({ ...e, date: convertToDDMMYY(e.date) });
    });

    const uniqueSchedules = formattedSchedules.filter((g) => {
      const duplicate = newExistedSchedules.find(
        (f) => f === JSON.stringify({ ...g, date: convertToDDMMYY(g.date) })
      );

      return !duplicate;
    });

    await db.Schedule.bulkCreate(uniqueSchedules);

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getScheduleByDate = async ({ doctorId, date }) => {
  try {
    if (!doctorId) {
      return { ok: false, error: "Missing required parameter doctorId" };
    }

    if (!date) {
      return { ok: false, error: "Missing required parameter date" };
    }

    let schedules = await db.Schedule.findAll({
      where: { doctorId },
      include: [
        {
          model: db.Allcode,
          as: "timeTypeData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      raw: true,
      nest: true,
    });

    schedules = schedules.filter(
      (item) => moment(item.date).valueOf() === date
    );

    return { ok: true, schedules };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
