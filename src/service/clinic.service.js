import db from "../models";

export const createClinic = async (data) => {
  try {
    if (
      !data.name ||
      !data.description ||
      !data.address ||
      !data.logo ||
      !data.image
    ) {
      return { ok: false, error: "Missing required parameter" };
    }

    await db.Clinic.create({
      name: data.name,
      image: data.image,
      logo: data.logo,
      address: data.address,
      description: data.description,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getAllClinics = async () => {
  try {
    const clinics = await db.Clinic.findAll();
    return { ok: true, clinics };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getHomeClinics = async () => {
  try {
    const clinics = await db.Clinic.findAll({
      attributes: ["name", "id", "logo"],
    });
    return { ok: true, clinics };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getClinicById = async (id) => {
  try {
    if (!id) {
      return {
        ok: false,
        error: "Missing required parameter id",
      };
    }

    const clinic = await db.Clinic.findOne({
      where: { id: Number(id) },
    });
    return { ok: true, clinic };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
