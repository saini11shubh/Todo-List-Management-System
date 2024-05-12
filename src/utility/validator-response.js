const Joi = require("joi");

module.exports = (schema, params = "body") => async (req, res, next) => {
    try {
        const check = await schema.validate(req[params]);
        if (check.error) {
            res.status(400).json({
                message: check.error.details[0].message
            })
        } else {
            next();
        }

    } catch (error) {
        console.log("--validator==error===>", error)
    }
}