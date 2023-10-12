const fx = require("./controllers/usersController");

const playWithDB = async () => {
  await fx.createNewUser({ firstname: "c", lastname: "C" });
  await fx.updateUser({ id: 1, firstname: "AAA" });
};

playWithDB();
