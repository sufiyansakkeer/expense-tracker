export const validate = (shema) => (req, res, next) => {
    try {
        shema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid request body ", error: error.message });
    }
}