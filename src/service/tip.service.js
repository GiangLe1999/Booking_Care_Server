import db from "../models";

export const createTip = async (data) => {
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

    await db.Tip.create({
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

export const getHomeTips = async () => {
  try {
    const tips = await db.Tip.findAll({
      attributes: ["title", "thumbnail", "id", "slug"],
    });
    return { ok: true, articles: tips };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
