const mongoose = require("mongoose");
const mongoDB = async() => {
  await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected with mongoDB!"))
    .catch((error) => console.log(error));
};

module.exports = mongoDB;
