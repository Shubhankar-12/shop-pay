import jwt from "jsonwebtoken"

export const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN, {
        expiresIn: "2d"
    });
}

export const createResetToken = (payload) => {
    return jwt.sign(payload, process.env.RESET_TOKEN, {
        expiresIn: "2h"
    });
}