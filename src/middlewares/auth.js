const validarTokenApp = (req, res, next) => {
  const tokenCliente = req.header("app-token");
  const tokenServidor = process.env.APP_TOKEN;

  if (!tokenCliente || tokenCliente !== tokenServidor) {
    return res.status(401).json({
      error: "Acceso denegado: Token de aplicacion faltante o incorrecto.",
    });
  }

  next();
};

module.exports = validarTokenApp;
