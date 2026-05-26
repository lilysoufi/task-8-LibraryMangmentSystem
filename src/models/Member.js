const mongoose = require("mongoose");
const User = require("./User");

const memberSchema = new mongoose.Schema({

    address : {
      type : String,
    },

    dateOfBirth : {
      type : Date
    },

    membershipNumber : {
      type : String
    },

},
{
    toJSON: { virtuals: true },
    timestamps: true
})

const Member = User.discriminator("Member", memberSchema);

module.exports = Member;
