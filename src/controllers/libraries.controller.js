const Library = require("../models/Library");

class libraryController {
    
    static getAllLibraries = async (req, res) => {
        const libraries = await Library.find();
        res.status(200).json(libraries);
    }

    static getLibraryById = async (req, res) => {
        const { id } = req.params;
        const library = await Library.findById(id);
        if (!library) {
            return res.status(404).json({ message: "Library not found" });
        }
        res.status(200).json(library);
    }

    static createLibrary = async (req, res) => {
        const { title, location, desc, photo, hoursWork, avgRate } = req.body;
        const newLibrary = new Library({ title, location, desc, photo, hoursWork, avgRate });
        await newLibrary.save();
        res.status(201).json(newLibrary);
    }

    static updateLibrary = async (req, res) => {
        const { id } = req.params;
        const updatedLibrary = await Library.findById(id);
        const { title, location, desc, photo, hoursWork, avgRate } = req.body;
        if(!updatedLibrary) {
            return res.status(404).json({ message: "Library not found" });
        }
        updatedLibrary.title = title || updatedLibrary.title;
        updatedLibrary.location = location || updatedLibrary.location;
        updatedLibrary.desc = desc || updatedLibrary.desc;
        updatedLibrary.photo = photo || updatedLibrary.photo;
        updatedLibrary.hoursWork = hoursWork || updatedLibrary.hoursWork;
        updatedLibrary.avgRate = avgRate || updatedLibrary.avgRate;
        await updatedLibrary.save();
        res.status(200).json(updatedLibrary);
    }

    static removeLibrary = async ( req, res ) => {
        const { id }= req.params;
        const deletedLibrary = await Library.findByIdAndDelete(id);
        if (!deletedLibrary) {
            return res.status(404).json({ message: "Library not found" });
        }
        res.status(204).send();
    }

}

module.exports = libraryController;