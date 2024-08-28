// !Important: This file assumes that you already have installed expressjs
import { Request, Response, NextFunction } from "express";

/**
 * Validates the inputs in the request object based on the provided input array and field.
 *
 * @param {Object} options - The options object.
 * @param {string[]} options.inputArr - The array of input keys to validate.
 * @param {keyof Request} options.key - The field in the request object to validate against.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @returns An Express middleware function.
 */

export function validateKeyInputs({ inputArr, key: field }: { inputArr: string[], key: keyof Request }) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!inputArr || inputArr.length === 0) {
            return next();
        }
        let errors: any[] = [];
        req["validData"] = {};
        inputArr.forEach((input) => {
            if (!(String(input).startsWith("-"))) {
                if ([undefined, null, ""].includes(req[field][input])) {
                    errors.push(input);
                }
                req["validData"][input] = req[field][input];
                return;
            }
            const key = String(input).replace("-", "");
            if (!([undefined, null, ""].includes(req[field][key]))) {
                req["validData"][key] = req[field][key];
            }
        });
        if (errors.length > 0) {
            return res.status(400).json({
                status: "error",
                message: "provide the correct parameters",
                missedInputs: errors
            });
        }
        return next();
    }
}

