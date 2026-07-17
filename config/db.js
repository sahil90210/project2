const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("MongoDB Connected");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;