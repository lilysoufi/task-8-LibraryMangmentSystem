const Loan = require("../models/Loan");
const Material = require("../models/Material");
const Librarian = require("../models/Librarian");

class loanController {

    static getAllLoans = async ( req , res ) => {
        const loans = await Loan.find()
        .populate("materialId" , "title -_id")
        .populate("memberId" , "name -_id")
        .populate("employeeId" , "name -_id");

        res.status(200).json({ message : "Loans found successfully" , loans })
    }

    static getLoanById = async ( req , res ) => {
        const {id} = req.params;
        const loan = await Loan.findById(id)
        .populate("materialId" , "title -_id")
        .populate("memberId" , "name -_id")
        .populate("employeeId" , "name -_id");

        if (!loan) {
            return res.status(404).json({ message : "Loan not found" })
        }
        res.status(200).json({ message : "Loan found successfully" , loan })
    }

    static createLoan = async ( req , res) => {
        const { materialId, memberId, employeeId, loanDate, dueDate, actualReturnDate , status , fines , paymentStatus } = req.body;

        if(!materialId || !memberId || !employeeId) {
            return res.status(400).json({ message : "Invalid or empty loan information"})
        }

        const employee = await Librarian.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message : "Not Authorized" })
        }

        const newLoan = await Loan.create({
            materialId,
            memberId,
            employeeId,
            loanDate,
            dueDate,
            actualReturnDate,
            status,
            fines,
            paymentStatus
        });
        const material = await Material.findById(materialId);
        if (!material) {
            return res.status(404).json({ message : "Material not found" })
        }
        if (material.isAvailable) {
            material.availableCopies -= 1;
        }
        else {
            return res.status(400).json({ message : "Material is not available" })
        }
        await material.save();
   
        res.status(201).json({ message : "Loan created successfully" , loan : newLoan.populate("materialId" , "title").populate("memberId" , "name").populate("employeeId" , "name") });

    }

    static calculateFine = async (req , res ) => {
        const { id } = req.params;
        const loan = await Loan.findById(id);
        if (!loan) {
            return res.status(404).json({ message : "Loan not found" })
        }

        const fineAmount = loan.calculateFine();
        await loan.save();
  
        res.status(200).json({ message : "Fine amount returned successfully" , fineAmount})
    }

    static updateLoan = async ( req , res ) => {
        const { id } = req.params;
        const { materialId, memberId, employeeId ,loanDate, dueDate, actualReturnDate , status , fines , paymentStatus } = req.body;
        const loan = await Loan.findById(id)
        if (!loan) {
            return res.status(404).json({ message : "Loan to be updated not found"})
        }
        loan.materialId = materialId || loan.materialId;
        loan.memberId = memberId || loan.memberId;
        loan.employeeId = employeeId || loan.employeeId;
        loan.loanDate = loanDate || loan.loanDate;
        loan.dueDate = dueDate || loan.dueDate;
        loan.actualReturnDate = actualReturnDate || loan.actualReturnDate;
        loan.status = status || loan.status;
        loan.fines = fines || loan.fines;
        loan.paymentStatus = paymentStatus || loan.paymentStatus;
        await loan.save();
        res.status(200).json({ message : "Loan updated successfully" , loan : loan.populate("materialId" , "title").populate("memberId" , "name").populate("employeeId" , "name") })
    }
    static returnLoan = async ( req, res) => {
        const { id } = req.params;
        const loan = await Loan.findById(id).populate("materialId" , "title");
        const material = await Material.findById(loan.materialId);
        if (!loan) {
            return res.status(404).json({ message : "Loan not found" })
        }

        loan.status = "returned";
        material.availableCopies += 1;
        await loan.save();

        res.status(200).json({ message : "Loan returned successfully" ,
             loan : loan
            .populate("materialId" , "title -_id")
            .populate("memberId" , "name -_id")
            .populate("employeeId" , "name -_id") })
    }

    static deleteLoan = async ( req , res ) => {
        const { id } = req.params;
        const loan = await Loan.findByIdAndDelete(id);
        if (!loan) {
            return res.status(404).json({ message : "Loan to be deleted not found" })
        }
        res.status(200).json({ message : "Loan deleted successfully" ,
            data :  loan
            .populate("materialId" , "title -_id")
            .populate("memberId" , "name -_id")
            .populate("employeeId" , "name -_id ") })
    }
}

module.exports = loanController;