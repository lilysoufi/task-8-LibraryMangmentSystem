const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
     userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
     },

     materialId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: true
     },

     reservedAt : {
        type : Date,
        required: true,
        default: Date.now
     },

     queuePriority : {
        type : Number,
        default: 0
     },

     notifiedWhenAvailable : {
        type : Boolean,
        default : false
     },

     autoCancelAfter : {
        type : Date
     },

     status : {
        type : String,
        enum : ["active", "canceled", "completed"],
        default : "active"
     }


},
{
    toJSON : { virtuals: true },
    timestamps: true
})

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;