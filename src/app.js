require("dotenv").config();
const e = require("express");
const express = require("express");

const app = express();
const mongoose = require("mongoose");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// Routes
app.get("/api/health", (req, res) => res.status(200).json({ message: "API is working" }));
app.use("/api/v1/members", require("./routes/members.route"));
app.use("/api/v1/librarians", require("./routes/librarians.route"));
app.use("/api/v1/books", require("./routes/books.route"));
app.use("/api/v1/libraries", require("./routes/libraries.route"));
app.use("/api/v1/magazines", require("./routes/magazines.route"));
app.use("/api/v1/loans", require("./routes/loans.route"));
app.use("/api/v1/reservations", require("./routes/reservations.route"));
app.use("/api/v1/reviews", require("./routes/reviews.route"));


app.use(errorHandler);
app.use(notFound);
//console.log(Math.abs(new Date() - new Date("2026-05-23T15:06:31.856Z")));
//console.log(Math.ceil(Math.abs(new Date() - new Date("2026-05-23T15:06:31.856Z")) / (1000 * 60 * 60 * 24)));
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
.then(() => {
  console.log("Connected to MongoDB successfully");
  
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

