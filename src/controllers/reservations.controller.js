const Reservation = require("../models/Reservations");
const Material = require("../models/Material");

class reservationController {
    static  getAllReservations = async (req, res ) => {
        const reservations = await Reservation
        .find()
        .populate("materialId" , "title -_id")
        .populate("userId" , "name -_id");
        res.status(200).json({ message : "Reservations found successfully", data: reservations });
    }

    static getById = async (req, res) => {
        const { id } = req.params;
        const reservation = await Reservation
        .findById(id)
        .populate("materialId" , "title -_id")
        .populate("userId" , "name -_id");

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json({ message: "Reservation found successfully", data: reservation });
    }

    static createReservation = async (req , res) => {
        const { materialId, userId, reservedAt, queuePriority, notifiedWhenAvailable, autoCancelAfter } = req.body;
         const newReservation = new Reservation({ materialId, userId, reservedAt, queuePriority, notifiedWhenAvailable, autoCancelAfter });
         const material = await Material.findById(materialId);

        if (material.isAvailable) {
            return res.status(400).json({ message: "Material is available , no need for reservation" });
        }

            material.reservedCopies += 1;
            await newReservation.save();
            await material.save();
            res.status(201).json({ message: "Reservation created successfully", data: newReservation });
        } 
    


    static updateReservation = async (req , res ) => {
        const { id } = req.params;
        const {materialId, userId, reservedAt, queuePriority, notifiedWhenAvailable, autoCancelAfter }= req.body;
        const reservation = await Reservation.findById(id);

        reservation.reservedAt = reservedAt || reservation.reservedAt;
        reservation.queuePriority = queuePriority || reservation.queuePriority;
        reservation.notifiedWhenAvailable = notifiedWhenAvailable || reservation.notifiedWhenAvailable;
        reservation.autoCancelAfter = autoCancelAfter || reservation.autoCancelAfter;

        const updatedReservation = await reservation.save();
        if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json({ message: "Reservation updated successfully", data: updatedReservation });
    }

    static completeReservation = async (req, res) => {
        const { id } = req.params;
        const completedReservation = await Reservation.findById(id);
        const material = await Material.findById(completedReservation.materialId);
        if (!completedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        if (material.availableCopies <= 0) {
            return res.status(400).json({ message: `The reservation cannot be completed, ${material.title} is not available yet` });
        }
        material.availableCopies -= 1;
        material.reservedCopies -= 1;
        completedReservation.status = "completed";
        await material.save();
        await completedReservation.save();
        res.status(200).json({ message: "Reservation completed successfully", data: completedReservation });
    }

    static cancelReservation = async (req, res) => {
        const { id } = req.params
        const canceledReservation = await Reservation.findById(id);
        const material = await Material.findById(canceledReservation.materialId);
        if (!canceledReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        material.reservedCopies -= 1;
        canceledReservation.status = "canceled";
        await material.save();
        await canceledReservation.save();
        res.status(200).json({ message: "Reservation canceled successfully", data: canceledReservation });
    }

    static removeReservation = async (req, res) => {
        const { id } = req.params;
        const deletedReservation = await Reservation.findByIdAndDelete(id);
        res.status(200).json({ message: "Reservation removed successfully", data: deletedReservation });
    }
}

module.exports = reservationController;