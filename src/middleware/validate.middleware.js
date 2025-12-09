export const validate = (shema) => (req, res, next) => {
    try {
   const result =    shema.safeparseAsync({ body: req.body,
            params: req.params,
            query: req.query,
        });
        if( !result.success){
            return res.status(400).json({ message: "Validation failed", error: result.error.errors });
        }
        req.body = result.data.body|| req.body;
        req.params = result.data.params || req.params;
        req.query = result.data.query || req.query;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid request body ", error: error.message });
    }
}