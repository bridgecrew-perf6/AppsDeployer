const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            // useUnifiedToplogy: true,
            useNewUrlParser: true,
            // useCreateIndex: true
        });

        console.log(`MongoDB is Connected : ${connection.connection.host}`);

    } catch (error) {
        console.error(`Error Message : ${error}`);
        process.exit();
    }
}

module.exports = dbConnect;