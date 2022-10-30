const query = require("../query");

module.exports = {
  // get all user
  getUsers: async (req, res) => {
    let data = await query.selectUser();
    res.json(data);
  },
  // get single user
  getUserById: async (req, res) => {
    let [data] = await query.selectUser(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.json({ message: "no record found" });
    }
  },
  // create User
  addUser: async (req, res) => {
    await query.insertUser(req.body.username);
    res.json({ message: "user created successfully" });
  },

};
