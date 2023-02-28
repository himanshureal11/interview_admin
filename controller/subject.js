const subject = require('../services/subject')

const addOrUpdate = async (req,res) => {
    try {
        const data = req.body
        const id = req.params.id
        const result = await subject.addOrUpdate(data, id)
        res.json({status: 'success', data: result})
    } catch (error) {
        res.status(400).json({status: 'fail', error: error.message})
    }
}

const getSubjects = async (req,res) => {
    try {
        const result = await subject.getSubjects()
        res.json({status: 'success', data: result})
    } catch (error) {
        res.status(400).json({status: 'fail', error: error.message})
    }
}

const deleteSubject = async (req,res) => {
    try {
        const id = req.params.id
        const result = await subject.deleteSubject(id)
        res.json({status: 'success', data: result})
    } catch (error) {
        res.status(400).json({status: 'fail', error: error.message})
    }
}

module.exports = {
    addOrUpdate,
    getSubjects,
    deleteSubject
}