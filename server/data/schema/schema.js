const tables = {
  users: {
    id: { type: "string", nullable: false, primary: true },
    email: { type: "string", maxlength: 254, nullable: false, unique: true },
    password: { type: "string", maxlength: 60, nullable: false },
    is_maintainer: { type: "bool", defaultTo: false, nullable: false },
    is_owner: { type: "bool", defaultTo: false, nullable: false },
    created_at: { type: "dateTime", nullable: false },
    updated_at: { type: "dateTime", nullable: false }
  },
  groups: {
    id: { type: "string", nullable: false, primary: true },
    name: { type: "string", maxlength: 60, nullable: false, unique: true },
    description: { type: "string", maxlength: 500 },
    created_at: { type: "dateTime", nullable: false },
    updated_at: { type: "dateTime", nullable: true }
  },
  groups_users: {
    id: { type: "string", nullable: false, primary: true },
    group_id: { type: "string", nullable: false, references: "groups.id" },
    user_id: { type: "string", nullable: false, references: "users.id" }
  },
  flags: {
    id: { type: "string", nullable: false, primary: true },
    name: { type: "string", maxlength: 60, nullable: false, unique: true },
    description: { type: "string", maxlength: 255 },
    active: { type: "bool", nullable: false },
    population_percentage: {
      type: "integer",
      nullable: false,
      unsigned: true,
      defaultTo: 0
    },
    created_at: { type: "dateTime", nullable: false },
    updated_at: { type: "dateTime", nullable: false }
  },
  flags_groups: {
    id: { type: "string", nullable: false, primary: true },
    flag_id: { type: "string", nullable: false, references: "flags.id" },
    group_id: { type: "string", nullable: false, references: "groups.id" }
  },
  settings: {
    id: { type: "string", nullable: false, primary: true },
    key: { type: "string", nullable: false, unique: true },
    value: { type: "string", nullable: true },
    created_at: { type: "dateTime", nullable: false },
    updated_at: { type: "dateTime", nullable: false }
  }
};

module.exports = tables;
