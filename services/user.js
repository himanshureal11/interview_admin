const userDao = require("../dao/user")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { isEmpty } = require("lodash");
const { FILE_UPLOAD } = require("../constant");
const { setRedisKeyValue } = require("../helper/redis_helpers");

const addOrUpdate = async (data,files = [],id) => {
    const userData = {
        ...data
    }
    if(!isEmpty(files)){
        files.forEach(file=>{
            switch (file.fieldname) {
                case FILE_UPLOAD.USER_PROFILE_PIC:
                    userData.user_profile_pic_path = file.filename
                    break;
                case FILE_UPLOAD.USER_PIC_WITH_GOVERNMENT_ID:
                    userData.user_profile_pic_with_government_id_path = file.filename
                    break;
                default:
                    break;
            }
        })
    }
    if(data.password){
        const password = await bcrypt.hash(data.password, 10)
        userData.password = password
    }
    const result = await userDao.addOrUpdateUser(userData, id)
    return result
}

addOrUpdate({  username: 'admin@real11.com',
  password : 'admin@123',
  access_level: 100,
  name: 'admin',
  mobile: '7737305133'})


const getAllUsers = async () => {
    const result = await userDao.getAllUsers()
    return result
}

const deleteUser = async (id) => {
    const result = await userDao.deleteUser(id)
    return result
}

const getUser = async (id) => {
    const result = await userDao.getUser(id)
    return result
}

const loginUser = async (data) => {
    const result = await userDao.loginUser(data)
    if(result){
        const isPasswordMatch = await bcrypt.compare(data.password, result.password)
        if(isPasswordMatch){
            const userData = {
                username: result.username,
                access_level: result.access_level,
                _id: result._id
            }
            const token = jwt.sign({ user: userData} , process.env.JWT_TOKEN, {expiresIn: '9h'});
            await setRedisKeyValue(`user-${result._id}`, token)
            return {
                token,
                username: result.username,
                access_level: result.access_level,
                subject_id: result.subject_id,
                id: result._id,
                name: result.name,
                mobile: result?.mobile
            }
        }else{
            throw Error('incorrect password')
        }
    }else{
        throw Error('no user found')
    }
}

module.exports = {
    addOrUpdate,
    getAllUsers,
    deleteUser,
    getUser,
    loginUser
}