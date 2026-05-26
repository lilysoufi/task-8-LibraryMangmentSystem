const Review = require("../models/review");

class reviewController {

    static getAllReviews = async (req, res) => {
        const reviews = await Review.find()
            .populate("userId" , "name -_id")
            .populate("materialId" , "title -_id");
        res.status(200).json({ message : "Reviews found successfully", data: reviews});
    }

      static createReview = async (req, res) => {
        const { userId, materialId, comment, rating } = req.body;

        const previousReview = await Review.findOne({ userId, materialId})
        

        if(!previousReview) {
            const newReview = new Review({ userId, materialId, comment, rating });
            await newReview.save();
            return  res.status(201).json({ message: "Review created successfully",
                data: newReview
            });
        }
        else {
            return res.status(400).json({ message: "User has already reviewed this material "  });
        }
    
    }

    static getReviewById = async (req, res) => {
        const { id } = req.params;
        const review = await Review.findById(id)
        .populate("userId" , "name -_id")
        .populate("materialId" , "title -_id");
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review found successfully",
            data: review
        });
    }

    static updateReview = async ( req , res ) => {
        const { id } = req.params;
        const {  rating, comment } = req.body;
        const updatedReview = await Review.findById(id);

        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        updatedReview.rating = rating || updatedReview.rating;
        updatedReview.comment = comment || updatedReview.comment;
        await updatedReview.save();

        res.status(200).json({ message: "Review updated successfully",
            data: updatedReview
        });
    }

    static deleteReview = async (req, res) => {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully",
             data: deletedReview
        });
    }

}

module.exports = reviewController;