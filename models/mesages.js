const mongoose = require("mongoose");
const { Schema } = mongoose;
const message = new Schema([{
    name:"string",
    message:"string",
    expires: {
        type: Date,
        default: Date.now,
        expires: 3600
      }
}]);
const msg =mongoose.model("chatMessage", message);
module.exports =msg;