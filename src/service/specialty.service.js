import db from "../models";

export const createSpecialty = async (data) => {
  try {
    if (!data.name || !data.description || !data.image) {
      return { ok: false, error: "Missing required parameter" };
    }

    await db.Specialty.create({
      name: data.name,
      image: data.image,
      description: data.description,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getAllSpecialties = async () => {
  try {
    const specialties = await db.Specialty.findAll();
    return { ok: true, specialties };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getSpecialtyById = async (id) => {
  try {
    if (!id) {
      return {
        ok: false,
        error: "Missing required parameter id",
      };
    }

    const specialty = await db.Specialty.findOne({
      where: { id: Number(id) },
    });
    return { ok: true, specialty };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
