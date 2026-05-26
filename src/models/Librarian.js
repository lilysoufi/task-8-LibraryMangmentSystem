const mongoose = require("mongoose");
const User = require("../models/User");

const librarianSchema = new mongoose.Schema({

    
    officeLocation: {
        type: String,
        required: true,
        trim: true
    },
    responsibleDepartment: {
        type: String,
        required: true,
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

const Librarian = User.discriminator("Librarian", librarianSchema);

module.exports = Librarian;