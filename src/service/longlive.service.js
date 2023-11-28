import { Op } from "sequelize";
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

export const getLongliveBySlug = async ({ slug }) => {
  try {
    if (!slug) {
      return { ok: false, error: "Missing required parameter" };
    }
    const longlive = await db.Longlive.findOne({
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
    return { ok: true, article: longlive };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getLongliveResults = async ({ query }) => {
  try {
    const longlives = await db.Longlive.findAll({
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

    return { ok: true, articles: longlives };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
