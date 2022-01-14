const tk = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Obtenemos valor de la propiedad auth-token recibido por la cabezera del usuario
  const token = req.header("auth-token");
  
  // Si el token no existe enviamos como respuesta que el acceso fue denegado
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    // Verificamos si el token es valido
    const verified = tk.verify(token, process.env.TOKEN_SECRET);
    // Creamos un objeto en nuestro request con la propiedad user y le asignamos un objeto con información del usuario
    req.user = verified;
    
    next();
  } catch (error) {
    // Si existe un error mandamos como respuesta que el token no era valido
    res.status(400).json({ error: "token is not valid " });
  }
};
