const Librarian = require("../models/Librarian");

class librarianController  {

    static getAllLibrarians = async ( req, res ) => {
        const librarians = await Librarian.find();

        return res.status(200).json({ message : "Librarians retrieved successfully", data: librarians });
    }

    static getLibrarianById = async ( req, res ) => {
        const { id } = req.params;
        const librarian = await Librarian.findById(id);

        if (!librarian) {
            return res.status(404).json({ message: "Librarian not found" });
        }

        return res.status(200).json({ message: "Librarian retrieved successfully", data: librarian });
    }

    static createLibrarian = async ( req, res ) => {
        const { name , email , phone, registeredAt, password, officeLocation, responsibleDepartment, hireDate } = req.body;

        const newLibrarian = new Librarian({ name , email , phone, registeredAt, password, officeLocation, responsibleDepartment, hireDate });
        await newLibrarian.save();

        return res.status(201).json({ message: "Librarian created successfully", data: newLibrarian });
    }

    static updateLibrarian = async ( req, res ) => {
        const { id } = req.params;
        const { name , email , phone, registeredAt, password, officeLocation, responsibleDepartment, hireDate } = req.body;

       const updatedLibrarian = await Librarian.findById(id);
       if (!updatedLibrarian) {
           return res.status(404).json({ message: "Librarian not found" });
       }

       updatedLibrarian.name = name || updatedLibrarian.name;
       updatedLibrarian.email = email || updatedLibrarian.email;
       updatedLibrarian.phone = phone || updatedLibrarian.phone;
       updatedLibrarian.registeredAt = registeredAt || updatedLibrarian.registeredAt;
       updatedLibrarian.password = password || updatedLibrarian.password;
       updatedLibrarian.officeLocation = officeLocation || updatedLibrarian.officeLocation;
       updatedLibrarian.responsibleDepartment = responsibleDepartment || updatedLibrarian.responsibleDepartment;
       updatedLibrarian.hireDate = hireDate || updatedLibrarian.hireDate;

       await updatedLibrarian.save();

        return res.status(200).json({ message: "Librarian updated successfully", data: updatedLibrarian });
    }

    static deleteLibrarian = async ( req, res ) => {
        const { id } = req.params;
        const deletedLibrarian = await Librarian.findByIdAndDelete(id);

        if (!deletedLibrarian) {
            return res.status(404).json({ message: "Librarian not found" });
        }

        return res.status(200).json({ message: "Librarian deleted successfully", data: deletedLibrarian });
    }

}

module.exports = librarianController;