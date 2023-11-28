import { Op } from "sequelize";
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

export const getTipBySlug = async ({ slug }) => {
  try {
    if (!slug) {
      return { ok: false, error: "Missing required parameter" };
    }
    const tip = await db.Tip.findOne({
      where: { slug },
      attributes: [
        "title",
        "thumbnail",
        "id",
        "slug",
        "content",
        "description",
      ],
      include: [
        {
          model: db.User,
          attributes: ["firstName", "lastName"],
        },
      ],
      raw: true,
      nest: true,
    });
    return { ok: true, article: tip };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getTipResults = async ({ query }) => {
  try {
    const tips = await db.Tip.findAll({
      where: {
        title: {
          [Op.iLike]: `%${query}%`,
        },
      },
      attributes: [
        "title",
        "thumbnail",
        "id",
        "slug",
        "createdAt",
        "updatedAt",
      ],
    });

    return { ok: true, articles: tips };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
