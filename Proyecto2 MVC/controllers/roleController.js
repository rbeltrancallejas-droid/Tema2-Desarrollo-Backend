const RoleService = require('../services/roleService');

const logAction = (type, message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type}] ${message}`);
};


// GET - Obtener todos los roles
const getRoles = async (req, res, next) => {

  try {

    const roles = await RoleService.getRoles();

    logAction("INFO", "Roles retrieved successfully");

    res.status(200).json(roles);

  } catch (error) {

    logAction("ERROR", "Error retrieving roles");

    next(error);

  }

};


// GET - Obtener un rol por ID
const getRoleById = async (req, res, next) => {

  try {

    const { id } = req.params;

    const role = await RoleService.getRoleById(id);

    if (!role) {

      logAction("WARN", `Role with ID ${id} not found`);

      return res.status(404).json({
        error: "Role not found"
      });

    }

    logAction("INFO", `Role with ID ${id} retrieved successfully`);

    res.status(200).json(role);

  } catch (error) {

    logAction("ERROR", "Error retrieving role");

    next(error);

  }

};


// POST - Crear un rol
const createRole = async (req, res, next) => {

  try {

    const {
      name,
      description
    } = req.body;

    if (!name || !description) {

      logAction("WARN", "Missing role data");

      return res.status(400).json({
        error: "Name and description are required"
      });

    }

    const role = await RoleService.createRole(
      name,
      description
    );

    logAction("INFO", "Role created successfully");

    res.status(201).json(role);

  } catch (error) {

    logAction("ERROR", "Error creating role");

    next(error);

  }

};


// PUT - Actualizar un rol
const updateRole = async (req, res, next) => {

  try {

    const { id } = req.params;

    const {
      name,
      description
    } = req.body;

    if (!name || !description) {

      logAction("WARN", "Missing role data");

      return res.status(400).json({
        error: "Name and description are required"
      });

    }

    const role = await RoleService.updateRole(
      id,
      name,
      description
    );

    if (!role) {

      logAction("WARN", `Role with ID ${id} not found`);

      return res.status(404).json({
        error: "Role not found"
      });

    }

    logAction("INFO", `Role with ID ${id} updated successfully`);

    res.status(200).json(role);

  } catch (error) {

    logAction("ERROR", "Error updating role");

    next(error);

  }

};


// DELETE - Eliminar un rol
const deleteRole = async (req, res, next) => {

  try {

    const { id } = req.params;

    const role = await RoleService.deleteRole(id);

    if (!role) {

      logAction("WARN", `Role with ID ${id} not found`);

      return res.status(404).json({
        error: "Role not found"
      });

    }

    logAction("INFO", `Role with ID ${id} deleted successfully`);

    res.status(200).json({
      message: "Role deleted successfully",
      role
    });

  } catch (error) {

    logAction("ERROR", "Error deleting role");

    next(error);

  }

};


module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};