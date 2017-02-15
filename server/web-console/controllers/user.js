let userController = {
    registration: (req, res) => {
        // Serve up registration page

        res.sendStatus(200);
    },

    list: (req, res) => {
        // Check the user isStaff = true, then render
        // a page showing all users.

        res.sendStatus(200);
    },

    profile: (req, res) => {
        // Check the user is accessing their own page
        // if so, render their profile.

        res.sendStatus(200);
    }
};

module.exports = userController;