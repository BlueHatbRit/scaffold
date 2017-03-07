const tables = {
    users: {
        id: {type: 'string', nullable: false, primary: true},
        email: {type: 'string', maxlength: 254, nullable: false, unique: true},
        password: {type: 'string', maxlength: 60, nullable: false},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: false}
    },
    groups: {
        id: {type: 'string', nullable: false, primary: true},
        name: {type: 'string', maxlength: 60, nullable: false, unique: true},
        description: {type: 'string', maxlength: 500},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true},
    },
    groups_users: {
        id: {type: 'string', nullable: false, primary: true},
        group_id: {type: 'string', nullable: false, references: 'groups.id'},
        user_id: {type: 'string', nullable: false, references: 'users.id'}
    },
    flags: {
        id: {type: 'string', nullable: false, primary: true},
        name: {type: 'string', maxlength: 60, nullable: false, unique: true},
        description: {type: 'string', maxlength: 255},
        active: {type: 'bool', nullable: false},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: false}
    }
};

module.exports = tables;