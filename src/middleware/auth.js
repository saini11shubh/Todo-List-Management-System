const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        if (!req.headers["authorization"]) {
            return res.status(401).json({ status: false, errorCode: 'Unauthorized', message: 'Authentication token is required to access this resource' });
        }
        const token = req.headers["authorization"].replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ status: false, errorCode: 'Unauthorized', message: 'Authentication token is required to access this resource' });
        }

        const secretKey = process.env.SECRET_KEY ?? "AZGUARDS SECRET";
        jwt.verify(token, secretKey, (err, data) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = data;
            next();
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'Something went wrong on the server' });
    }
}