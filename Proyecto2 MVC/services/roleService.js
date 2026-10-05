const RoleModel = require('../models/roleModel');

const RoleService = {

  // Get all roles
  getRoles: async () => {

    return await RoleModel.FindAllRoles();

  },

  // Get role by ID
  getRoleById: async (id) => {

    return await RoleModel.FindRoleById(id);

  },

  // Create role
  createRole: async (name, description) => {

    return await RoleModel.CreateRole(
      name,
      description
    );

  },

  // Update role
  updateRole: async (id, name, description) => {

    return await RoleModel.UpdateRole(
      id,
      name,
      description
    );

  },

  // Delete role
  deleteRole: async (id) => {

    return await RoleModel.DeleteRole(id);

  },

};

module.exports = RoleService;