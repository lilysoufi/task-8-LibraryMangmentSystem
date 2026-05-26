const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
   
    title : {
            type : String,
            required : true
         },

     publisher : {
        type : String,
     },

     totalCopies : {
        type : Number,
        min : 0
     },

     availableCopies : {
        type : Number,
         min: [0, 'Quantity cannot be negative']
     },

     reservedCopies : {
         type : Number,
         min: [0, 'Quantity cannot be negative'],
         default: 0
     },

     coverImageUrl : {
        type : String,
         min: [0, 'Quantity cannot be negative'],
         
     }

    
},
{
    toJSON: {
        virtuals: true
    },
    timestamps: true
})

//virtual
materialSchema.virtual("isAvailable").get(function() {
    if (this.availableCopies > 0) {
        return true;
    }
    return false;
})
module.exports = mongoose.model("Material", materialSchema);
