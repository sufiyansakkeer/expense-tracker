export const errorHandler = (err, req, res, next) => {
    // If headers already sent, delegate to default Express error handler
    if (res.headersSent) {
        return next(err);
    }

    console.error("🔥 Error caught:", err);

    // Production safe message
    if (process.env.NODE_ENV === "production") {
        return res.status(err.statusCode || 500).json({
            error: err.publicMessage || "Internal server error",
        });
    }

    // Development detailed message
    return res.status(err.statusCode || 500).json({
        error: err.message,
        stack: err.stack,
    });
};
