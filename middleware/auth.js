const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prsma-client");

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Токен отсутствует" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    req.user = user;
    next(); // Передаем управление следующему middleware
  } catch (error) {
    return res.status(401).json({ message: "не авторизован" });
  }
};

module.exports = { auth };
