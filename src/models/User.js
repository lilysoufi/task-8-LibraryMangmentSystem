const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    trim : true
  },

  phone : {
    type : Number,
    required : true,
    trim : true
  },
  registeredAt : {
    type : Date,
    default : Date.now
  },
  
  password : {
    type : String,
    required : true,
    trim : true
  },

  //member specific fields
   address : {
      type : String,
    },

    dateOfBirth : {
      type : Date
    },

    membershipNumber : {
      type : Number
    },

    //Librarian specific fields
 
        responsibleDepartment: {
        type: String
    },
    
    // manager specific fields
        officeLocation: {
        type: String,
        trim: true
    },
     department: {
        type: String,
     },

}, {
    toJSON: {
        virtuals: true
    },
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);