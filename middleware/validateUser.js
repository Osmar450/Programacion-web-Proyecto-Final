export const validateUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim().length < 6) {
    return res.status(400).json({
      message: 'El usuario debe tener mínimo 6 caracteres',
    });
  }

  if (!password || typeof password !== 'string' || password.trim().length < 8) {
    return res.status(400).json({
      message: 'La contraseña debe tener mínimo 8 caracteres',
    });
  }

  next();
};
