const { upsert } = require("../helper/mongo_helper")
const Subject = require("../model/subject")


const addOrUpdateSubject = async (data,id = undefined) => {
    try {
        const result = await upsert(data,Subject,id)
        return result
    } catch (error) {
        throw Error('Request cannot be processed due to some technical issue')
    }
}

const getSubject = async () => {
    try {
        const result = await Subject.find()
        return result
    } catch (error) {
        throw Error('Request cannot be processed due to some technical issue')
    }
}

const deleteSub = async (id) => {
    try {
        const result = await Subject.deleteOne({_id: id})
        return result
    } catch (error) {
        throw Error('Request cannot be processed due to some technical issue')
    }
}

module.exports = {
    addOrUpdateSubject,
    getSubject,
    deleteSub
}