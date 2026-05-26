const notFound = (req, res, next) => {
    return res.status(404).json("This Route Not Found")
}

module.exports = notFound;