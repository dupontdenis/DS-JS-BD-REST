const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("node:fs/promises");
const path = require("path");

const getAllUsers = () => {
  return usersDB.users;
};

const createNewUser = async (body) => {
  const newUser = {
    id: usersDB.users?.length
      ? usersDB.users[usersDB.users.length - 1].id + 1
      : 1,
    firstname: body.firstname,
    lastname: body.lastname,
  };

  if (!newUser.firstname || !newUser.lastname) {
    return { message: "First and last names are required." };
  }

  usersDB.setUsers([...usersDB.users, newUser]);
  //
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );
  return usersDB.users;
};

const updateUser = async (body) => {
  const user = usersDB.users.find((emp) => emp.id === parseInt(body.id));
  if (!user) {
    return { message: `User ID ${body.id} not found` };
  }
  if (body.firstname) user.firstname = body.firstname;
  if (body.lastname) user.lastname = body.lastname;
  const filteredArray = usersDB.users.filter(
    (emp) => emp.id !== parseInt(body.id)
  );
  const unsortedArray = [...filteredArray, user];
  usersDB.setUsers(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );
  return usersDB.users;
};

const deleteUser = (body) => {
  const user = usersDB.users.find((emp) => emp.id === parseInt(body.id));
  if (!user) {
    return { message: `User ID ${body.id} not found` };
  }
  const filteredArray = usersDB.users.filter(
    (emp) => emp.id !== parseInt(body.id)
  );
  usersDB.setUsers([...filteredArray]);
  return usersDB.users;
};

const getUser = (body) => {
  const user = usersDB.users.find((emp) => emp.id === parseInt(body.id));
  if (!user) {
    return { message: `User ID ${body.id} not found` };
  }
  return user;
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUser,
};
