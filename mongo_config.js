const mongoose = require('mongoose');

const mongoConnect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log('Connection success');
      } catch (error) {
        console.log(">>>",error);
    }
}

mongoConnect()

module.exports = {
    mongoConnect
}