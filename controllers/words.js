const { prisma } = require("../prisma/prsma-client");

/**  - api/words/ */
const words = async (req, res) => {
  try {
    const start = req.query?.start ? parseInt(req.query.start) : null;
    const limit = req.query?.limit ? parseInt(req.query.limit) : null;
    const search = req.query?.search;

    // Создаем фильтр для поиска
    const searchFilter = search
      ? {
          OR: Array.isArray(search)
            ? search.map((s) => ({ word: { contains: s } }))
            : [{ word: { contains: search } }],
        }
      : {};

    // Проверяем, указаны ли параметры для пагинации
    const allWords = await prisma.word.findMany({
      where: searchFilter, // Применяем фильтр поиска
      skip: start || undefined,
      take: limit || undefined,
    });

    // Отправляем слова в ответе
    return res.status(200).json(allWords);
  } catch (error) {
    console.error("Ошибка при получении слов:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = { words };
