const { prisma } = require("../prisma/prsma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

/**  - api/user/login */
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "заполните все поля" });
  }
  const user = await prisma.user.findFirst({ where: { email } });
  const isPasswordCorrect =
    user && (await bcrypt.compare(password, user.password));

  if (user && isPasswordCorrect) {
    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
    });
  } else {
    return res.status(400).json({ message: "неверный логин или пароль" });
  }
};

/** - api/user/register */
const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "заполните все поля" });
  }

  const registrationUser = await prisma.user.findFirst({ where: { email } });

  if (registrationUser) {
    return res.status(400).json({ message: "пользователь зарегистрирован" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      email,
      name: email.split("@")[0],
      password: hashedPassword,
    },
  });
  if (user && secret && secret) {
    return res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
    });
  } else {
    return res.status(400).json({ message: "не удалось создатьпользователя" });
  }
};

/** - api/user/current */
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = { login, register, current };
