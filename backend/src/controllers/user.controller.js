import User from "../models/User.js";
import bcrypt from "bcrypt";
import Joi from "joi";

/**
 * GET /api/users/profile
 * Devuelve el perfil del usuario autenticado (sin password)
 */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener perfil" });
  }
};

/**
 * PUT /api/users/update
 * Actualiza username y/o email del usuario autenticado
 * Body: { username?, email? }
 */
export const updateProfile = async (req, res) => {
  // ✅ Validación con Joi
  const updateSchema = Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email(),
  });

  const { error } = updateSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  try {
    const { username, email } = req.body;
    const updates = {};

    if (username) updates.username = username;
    if (email) updates.email = email;

    // Validar unicidad (que no haya otro usuario con ese email/username)
    if (email) {
      const exists = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (exists) return res.status(400).json({ msg: "Email ya en uso" });
    }
    if (username) {
      const existsU = await User.findOne({ username, _id: { $ne: req.user.id } });
      if (existsU) return res.status(400).json({ msg: "Username ya en uso" });
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
    return res.json({ msg: "Perfil actualizado", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al actualizar perfil" });
  }
};

/**
 * PUT /api/users/change-password
 * Cambiar contraseña. Body: { oldPassword, newPassword }
 */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).json({ msg: "Faltan datos" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) return res.status(400).json({ msg: "Contraseña actual incorrecta" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return res.json({ msg: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al cambiar contraseña" });
  }
};

/**
 * DELETE /api/users/delete
 * Eliminar cuenta del usuario autenticado
 */
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    return res.json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al eliminar usuario" });
  }
};
