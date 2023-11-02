import db from "../models";

export const getTopDoctors = async (limit = 10) => {
  try {
    const users = await db.User.findAll({
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

    return { users, ok: true };
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
    const { doctorId, content, description } = newDoctorInfo;
    if (!doctorId || !content) {
      return {
        ok: false,
        error: "Missing required parameter",
      };
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
