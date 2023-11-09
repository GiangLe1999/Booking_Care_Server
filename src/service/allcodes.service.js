import db from "../models";

export const getAllCodes = async () => {
  try {
    const allCodes = await db.Allcode.findAll();
    return { ok: true, allCodes };
  } catch (error) {
    return { ok: false, error: "Couldn't load all codes" };
  }
};

export const getCodesByType = async (rawType) => {
  try {
    if (!rawType) {
      return { ok: false, error: "Missing required parameter type" };
    }

    const type = rawType.toUpperCase();

    if (
      type !== "ROLE" &&
      type !== "STATUS" &&
      type !== "TIME" &&
      type !== "POSITION" &&
      type !== "GENDER" &&
      type !== "PRICE" &&
      type !== "PAYMENT" &&
      type !== "PROVINCE"
    ) {
      return {
        ok: false,
        error:
          "Type must be: 'role', 'status', 'time', 'position', 'gender', 'price', 'payment' or 'province'",
      };
    }

    const codes = await db.Allcode.findAll({ where: { type } });
    return { ok: true, codes };
  } catch (error) {
    return { ok: false, error: "Couldn't load codes" };
  }
};
