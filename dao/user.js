const { upsert } = require("../helper/mongo_helper");
const User = require("../model/user");

const addOrUpdateUser = async (data, id = undefined) => {
    const result = await upsert(data,User,id)
    return result
};

const getAllUsers = async () => {
  const result = await User.find({}, { password: 0 });
  return result;
};

const deleteUser = async (id) => {
  const result = await User.deleteOne({ _id: id });
  return result;
};

const getUser = async (id) => {
  const result = await User.findOne({ _id: id }, { password: 0 });
  return result;
};

const loginUser = async (data) => {
  const result = await User.findOne({ username: data.username });
  return result;
};

module.exports = {
  addOrUpdateUser,
  getAllUsers,
  deleteUser,
  getUser,
  loginUser,
};
