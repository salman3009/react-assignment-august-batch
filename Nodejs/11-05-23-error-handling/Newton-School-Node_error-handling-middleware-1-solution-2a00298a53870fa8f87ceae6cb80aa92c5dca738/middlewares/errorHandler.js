function errorHandler(err, req, res, next) {
    try {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message);
            res.status(400).json({ message: 'Validation Error', errors });
        } else {
            console.error(err.stack);
            res.status(500).json({ message: 'Something went wrong' });
        }
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = errorHandler;