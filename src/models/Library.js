const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({

    title : {
        type : String,
        required : true 
    },
    
    location :  {
        type : String,
        required : true
    },

    desc : {
        trpe : String,
    },

    photo  : {
        type : String,
    },

     address : {
        type : String,
        required : true
     }, 
     hoursWork : {
        type : String,
        required : true
     },
     
     avgRate : {
        type : Number,
        min : 0,
        required : true,
     }

}, {
    toJSON: {
        virtuals: true,
        versionKey: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Library", librarySchema)
