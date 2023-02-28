const upsert = async (data,model,id = undefined) => {
    if(id){
        const result =  await model.findOneAndUpdate({_id: id}, data, {returnOriginal: false})
        return result
    }else{
        const result = await model.create(data)
        return result
    }
}

module.exports = {
    upsert
}