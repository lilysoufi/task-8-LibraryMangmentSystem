const mongoose = require('mongoose');
const Material = require('./Material');

const magazineSchema = new mongoose.Schema({

    issueNumber: {
        type: Number,
        required: true,
        min: 1
    },

    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    
    year: {
        type: Number,
        required: true,
        min: 1800,
        max: new Date().getFullYear() 
    },
    
    volume: {
        type: Number,
        min: 1
    },
    
    ISSN: {
        type: String,
        unique: true,
    },

    editor: {
        type: String,
        trim: true
    },
    
    frequency: {
        type: String,
        enum: ['Weekly', 'Bi-weekly', 'Monthly', 'Bi-monthly', 'Quarterly', 'Annual'],
        default: 'Monthly'
    },
}, {
    toJSON: {
        virtuals: true
    },
    timestamps: true
})

const Magazine = Material.discriminator('Magazine', magazineSchema);

module.exports = Magazine;
