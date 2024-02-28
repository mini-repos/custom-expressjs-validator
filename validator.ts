// !Important: This file assumes that you already have installed expressjs
import { Request, Response, NextFunction } from "express";

/**
Validate the input data.
@param key - The request key to validate.
@param inputArr - The input array to check.
@returns An Express middleware function.
 */
export default function validate(key = "body", inputArr: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!inputArr || inputArr.length === 0) {
            return next();
        }
        let missedInputs: any[] = [];
        req["validData"] = {};
        inputArr.forEach((input) => {
            if ([undefined, null, ""].includes(req[key][input])) {
                missedInputs.push(input);
            }
            req["validData"][input] = req[key][input];
        });
        if (missedInputs.length > 0) {
            return res.status(400).json({
                status: "error",
                message: "provide the correct parameters",
                missedInputs
            });
        }
        return next();
    }
}

