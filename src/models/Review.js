const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    materialId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: true
    },

    rating : {
        type : Number,
        required: true,
        min: 1,
        max: 5
    },

    comment : {
        type : String,
        trim: true
    }
},
{
    toJSON : {
        virtuals: true
    },
    timestamps: true
})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;