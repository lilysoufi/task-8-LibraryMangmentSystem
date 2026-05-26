
const Magazine = require("../models/Magazine");

class magazineController {

    static getAllMagazines = async ( req, res ) => {
        const magazines = await Magazine.find();
        res.status(200).json({ message : "Magazines found successfully", magazines })
    }

    static getMagazineById = async ( req, res ) => {
        const {id} = req.params;
        const magazine = await Magazine.findById(id);
        if (!magazine) {
            return res.status(404).json({ message : "Magazine not found"})
        }
        res.status(200).json({ message : "Magazine found successfully", magazine })
    }

    static createMagazine = async ( req, res ) => {
        const magazineInfo = req.body;
        if (magazineInfo === null || magazineInfo === undefined) {
            return res.status(400).json({ message : "Invalid magazine information" });
        }
        const newMagazine = new Magazine(magazineInfo);
        await newMagazine.save();
        res.status(201).json({ message : "Magazine created successfully", magazine : newMagazine })
    }

    static updateMagazine = async ( req, res ) => {
        const {id} = req.params;
        const magazineInfo = req.body;
        const magazine = await Magazine.findByIdAndUpdate(id, magazineInfo, { new : true });
        if (!magazine){
            return res.status(404).json({ message : " Magazine not found"})
        }
        res.status(200).json({ message : "Magazine updated successfully", magazine })
    }

    static deleteMagazine = async ( req, res ) => {
        const {id} = req.params;
        const deleteMagazine = await Magazine.findByIdAndDelete(id);
        if (!deleteMagazine) {
            return res.status(404).json({ message : "Magazine not found"})
        }
        res.status(200).json({ message : "Magazine deleted successfully"})
    }
}

module.exports = magazineController;