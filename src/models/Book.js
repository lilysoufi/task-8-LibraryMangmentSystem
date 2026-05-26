const mongoose = require("mongoose");
const Material = require("./Material");

const bookSchema = new mongoose.Schema({

      author: {
        type: String,
        required: true,
        trim: true
    },

      category: {
        type: String,
        required: true,
        enum: ['fiction', 'science', 'history', 'technology', 'art', 
                'philosophy', 'religion', 'biography', 'children', 
                'education', 'business', 'health', 'travel', 'cooking']
    },

     ISBN: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^(97(8|9))?\d{9}(\d|X)$/.test(v);
            },
            message: 'Invalid ISBN format'
        }
    },

      publicationYear : {
        type : Date
     },
}, {
    toJSON: {
        virtuals: true
    },
    timestamps: true
})


const Book = Material.discriminator('Book', bookSchema);

module.exports = Book;