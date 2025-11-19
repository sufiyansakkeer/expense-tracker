import jwt from "jsonwebtoken";

const authMiddleware = (req, res) => {

    const authHeader = req.headers.authirization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split('')[1];

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.userId;

        next();
    } catch (error) {

        res.status(401).json({ message: "Invalid token" });

    }


}

export default authMiddleware;