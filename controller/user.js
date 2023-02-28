const userService = require("../services/user")

const addOrUpdateUser = async (req,res) => {
    const id = req.params.id
    let data;
    if(id){
        data = JSON.parse(req.body.data)
    }else{
        data = req.body
    }
    const files = req.files
    const result = await userService.addOrUpdate(data, files,id)
    res.json({status: 'success', data: result}) 
}

const getUsers = async (req,res) => {
    const result = await userService.getAllUsers()
    res.json({status: 'success', data: result}) 
}

const deleteUser = async (req,res) => {
    const id = req.params.id
    const result = await userService.deleteUser(id)
    res.json({status: 'success', data: result}) 
}

const getUser = async (req,res) => {
    const id = req.params.id
    const result = await userService.getUser(id)
    res.json({status: 'success', data: result}) 
}

const loginUser = async (req, res,next) => {
    const data = req.body
    try {
        const result = await userService.loginUser(data)
        res.json({status: 'success', data: result})
    } catch (error) {
        next(error)
    }
}
const checkedUserLoggedIn = async (req, res) => {
    const token =  JSON.parse(req.headers.token)
    const user = req.user
    const data = {
        username: user.username,
        access_level: user.access_level,
        token: token,
        subject_id: user.subject_id,
        id: user._id,
        name: user.name,
        mobile: user?.mobile
    }
    res.json({status: 'success', data: data})
}

module.exports = {
    addOrUpdateUser,
    getUsers,
    deleteUser,
    getUser,
    loginUser,
    checkedUserLoggedIn
}