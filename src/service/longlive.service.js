import db from "../models";

export const createLonglive = async (data) => {
  try {
    if (
      !data.title ||
      !data.description ||
      !data.slug ||
      !data.description ||
      !data.authorId ||
      !data.content
    ) {
      return { ok: false, error: "Missing required parameter" };
    }

    await db.Longlive.create({
      title: data.title,
      description: data.description,
      slug: data.slug,
      thumbnail: data.thumbnail,
      content: data.content,
      authorId: data.authorId,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getHomeLonglives = async () => {
  try {
    const Longlives = await db.Longlive.findAll({
      attributes: ["title", "thumbnail", "id", "slug"],
    });
    return { ok: true, articles: Longlives };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
