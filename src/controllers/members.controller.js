const Member = require('../models/Member');


class MembersController {

    static getAllMembers = async (req, res) => {

        const members = await Member.find();
        res.status(200).json({message : "Members found successfully", data: members});
    }

    static getMemberById = async (req, res) => {
        const {id} = req.params;

        const member = await Member.findById(id);
        if(!member) {
            return res.status(404).json({ message : "Member not found" })
        }
        res.status(200).json({ message : "Member found successfully", member });
    }

    static createMember = async (req, res) => {
      const { name , email , phone, registeredAt, password , address, dateOfBirth, membershipNumber}= req.body;

      const newMember = new Member({ name , email , phone, registeredAt, password , address, dateOfBirth, membershipNumber });
      await newMember.save();
      res.status(201).json({ message : "Member created successfully", member : newMember})
    }

    static updateMember = async (req, res) => {
        const {id} = req.params;
        const { name , email , phone, registeredAt, password , address, dateOfBirth, membershipNumber} = req.body;
        const updatedMember = await Member.findById(id);
        if (!updatedMember) {
            return res.status(404).json({ message: "Member not found" });
        }
        updatedMember.name = name || updatedMember.name;
        updatedMember.email = email || updatedMember.email;
        updatedMember.phone = phone || updatedMember.phone;
        updatedMember.registeredAt = registeredAt || updatedMember.registeredAt;
        updatedMember.password = password || updatedMember.password;
        updatedMember.address = address || updatedMember.address;
        updatedMember.dateOfBirth = dateOfBirth || updatedMember.dateOfBirth;
        updatedMember.membershipNumber = membershipNumber || updatedMember.membershipNumber;
        await updatedMember.save();
        res.status(200).json({ message: "Member updated successfully", member: updatedMember });
    }

    static deleteMember = async (req, res) => {
        const {id} = req.params;
        const deletedMember = await Member.findByIdAndDelete(id);
        if (!deletedMember) {
            return res.status(404).json({ message : "Member not found"})
        }
        res.status(200).json({ message : "Member deleted successfully", member: deletedMember})
    }
}

module.exports = MembersController;