const { isEmpty } = require("lodash")
const { addOrUpdateSubject, getSubject, deleteSub } = require("../dao/subject")
const { setRedisKeyValue, deleteRedisKey, getRedisKeys, getMultipleKeyValues, redisTransaction } = require("../helper/redis_helpers")

const addOrUpdate = async (data,id = undefined) => {
    try {
        const result = await addOrUpdateSubject(data,id)
        await setRedisKeyValue(`subject-${result._id}`, result)
        return result
    } catch (error) {
        throw Error(error)
    }
}
const getSubjects = async () => {
    try {
        const keys = await getRedisKeys('subject-*')
        if(!isEmpty(keys)){
            const values = await getMultipleKeyValues(keys)
            return values.map(data=> JSON.parse(data))
        }else {
            return await getSubject()
        }
    } catch (error) {
        throw Error(error)
    }
}

const deleteSubject = async (id) => {
    try {
        const result = await deleteSub(id)
        await deleteRedisKey(`subject-${id}`)
        return result
    } catch (error) {
        throw Error(error)
    }
}


/* The below function is just for testing trasaction of redis  */

// const transaction = async () => {
//     try {
//         const results = redisTransaction
//         results.set('name', 'himanshu')
//         results.set('age', 24)
//         results.hSet('name')  // this gives us an error and transaction is incomplete
//         results.set('language', 'hindi')
//         const res  = await results.exec()
//         console.log(">>>>", res);
//     } catch (error) {
//         console.log(">>>error",error);
//     }
// }

module.exports = {
    addOrUpdate,
    getSubjects,
    deleteSubject
}