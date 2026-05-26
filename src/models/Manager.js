const mongoose = require("mongoose");
const User = require("./User");

const managerSchema = new mongoose.Schema({
        
        employeeId: {
        type: mongoose.Schema.Types.ObjectId,
  
        unique: true
    },

        officeLocation: {
        type: String,
        trim: true
    },
     department: {
        type: String,
    },

      hireDate: {
        type: Date,
   
        default: Date.now
    },
    
},
{
    toJSON: { virtuals: true },
    timestamps: true
})

const manager = User.discriminator("Manager", managerSchema);

module.exports = manager;
