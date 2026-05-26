const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
   
    memberId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    materialId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Material"
    },

    employeeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Librarian"
    },
    loanDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true,
        default : function() {
            const date = new Date()
            date.setDate(new Date().getDate() + 14);
            return date;
    },},

    actualReturnDate: {
        type: Date
    },
    status : {
        type : String,
        enum : [ "active", "returned", "overdue", "cancelled" ],
        default : "active"
    },

    fines: {
        finePerDay: {
            type: Number,
            default: 0.5
        },

        totalFineDays: {
            type: Number,
            default: 0
        },

        totalFineAmount: {
            type: Number,
            default: 0
        },

        paymentStatus: {
            type: String,
            enum: ["paid", "unpaid"],
            default: "unpaid"
        }
    }
},

{
    toJSON: { virtuals: true },
    timestamps: true
})

//virtuals
loanSchema.virtual("isOverdue").get(function() {
    if(this.dueDate < new Date() ){
        return true;
    }
    return false;
})



loanSchema.virtual("currentOverdueDays").get(function() {
    if ( this.status === "returned" ) {
        if (this.actualReturnDate > this.dueDate) {
            const daysDifference = Math.abs(this.actualReturnDate - this.dueDate);
            return Math.ceil(daysDifference / (1000 * 60 * 60 * 24 ));
        }
      
    } else {
        const currentDay = new Date();
        const daysDifference = Math.abs(currentDay - this.dueDate);
        return Math.ceil(daysDifference / (1000 * 60 * 60 * 24));
    }
})


loanSchema.virtual("fineCalculated").get(function() {
    return this.currentOverdueDays * this.fines.finePerDay;
})

loanSchema.methods.calculateFine = function() {
    if (this.status === "active" || this.status === "returned") {
        const daysOverDue = this.currentOverdueDays;
        this.fines.totalFineDays = daysOverDue;
        this.fines.totalFineAmount = daysOverDue * this.fines.finePerDay;
        return this.fines.totalFineAmount;
      }
      return 0;
}

module.exports = mongoose.model("Loan", loanSchema);