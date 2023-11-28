import { Op } from "sequelize";
import db from "../models";

export const createHandbook = async (data) => {
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

    await db.Handbook.create({
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

export const getHomeHandbooks = async () => {
  try {
    const handbooks = await db.Handbook.findAll({
      attributes: ["title", "thumbnail", "id", "slug"],
    });
    return { ok: true, articles: handbooks };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getHanbookBySlug = async ({ slug }) => {
  try {
    if (!slug) {
      return { ok: false, error: "Missing required parameter" };
    }
    const hanbook = await db.Handbook.findOne({
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
    return { ok: true, article: hanbook };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getHandbookResults = async ({ query }) => {
  try {
    const handbooks = await db.Handbook.findAll({
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

    return { ok: true, articles: handbooks };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
