import moment from "moment";
import { sendMail } from "../lib/send-mail";
import db from "../models";
import "moment/locale/vi";
import { buildVerifyBookingUrl } from "../lib/build-url";
import { v4 as uuidv4 } from "uuid";

export const bookSchedule = async (data) => {
  try {
    if (
      !data.email ||
      !data.patientName ||
      !data.phone ||
      !data.address ||
      !data.doctorName ||
      !data.time ||
      !data.timeType
    ) {
      return { ok: false, error: "Thiếu thông tin bắt buộc" };
    }

    // Upsert user

    const userData = {
      email: data.email,
      roleId: "R3",
      lastName: data.patientName,
      address: data.address,
      gender: data.gender === "male" ? "M" : "F",
      phoneNumber: data.phone,
      dateOfBirth: data.dateOfBirth,
    };

    // Upsert User
    const existedUser = await db.User.findOne({
      where: {
        email: data.email,
      },
      raw: false,
    });

    let user;
    if (!existedUser) {
      const newUser = await db.User.create(userData);
      user = { ...newUser.dataValues };
    } else {
      existedUser.email = userData.email;
      existedUser.roleId = userData.roleId;
      existedUser.lastName = userData.lastName;
      existedUser.address = userData.address;
      existedUser.gender = userData.gender;
      existedUser.phoneNumber = userData.phoneNumber;
      existedUser.dateOfBirth = userData.dateOfBirth;
      await existedUser.save();
      user = { ...existedUser.dataValues };
    }

    // Upsert Booking
    const existedBooking = await db.Booking.findOne({
      where: {
        patientId: user.id,
      },
      raw: false,
    });

    const token = uuidv4();

    const bookingData = {
      statusId: "S1",
      doctorId: data.doctorId,
      patientId: user.id,
      date: data.date,
      timeType: data.timeType,
      reason: data.reason,
      token,
    };

    if (!existedBooking) {
      await db.Booking.create(bookingData);
    } else {
      existedBooking.statusId = bookingData.statusId;
      existedBooking.doctorId = bookingData.doctorId;
      existedBooking.patientId = bookingData.patientId;
      existedBooking.date = bookingData.date;
      existedBooking.timeType = bookingData.timeType;
      existedBooking.reason = bookingData.reason;
      existedBooking.token = bookingData.token;
      await existedBooking.save();
    }

    const variables = {
      patientName: data.name,
      doctorName: data.doctorName,
      time: data.time,
      date: moment(data.date).locale("vi").format("dddd - DD/MM/YYYY"),
      url: buildVerifyBookingUrl(data.doctorId, token),
    };

    await sendMail({
      email: data.email,
      subject: "Thông tin đặt lịch khám bệnh",
      template: "confirmation-mail.ejs",
      data: variables,
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const bookingVerify = async (data) => {
  try {
    if (!data.token || !data.doctorId) {
      return {
        ok: false,
        error: "Missing required parameter token or doctorId",
      };
    }

    const booking = await db.Booking.findOne({
      where: { token: data.token, doctorId: data.doctorId, statusId: "S1" },
      raw: false,
    });

    if (!booking) {
      return {
        ok: false,
        error: "Found no booking",
      };
    }

    booking.statusId = "S2";
    await booking.save();

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
