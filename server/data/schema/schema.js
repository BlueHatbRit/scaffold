const tables = {
    users: {
        id: {type: 'increments', nullable: false, primary: true},
        email: {type: 'string', maxlength: 254, nullable: false, unique: true},
        isStaff: {type: 'bool', nullable: false},
        password: {type: 'string', maxlength: 60, nullable: false},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: false}
    }
};

module.exports = tables;