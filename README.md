# Express Input Validation Middleware

This middleware simplifies input validation for Express.js applications, ensuring specified input parameters are present and handling missing inputs with a customizable error response.

## Usage

1. **Import and use in your Express router:**

    ```typescript
    // router file
    import express from 'express';
    const router = express.Router();
    import validator from '/path/to/validator/file';
    import { addRecord } from '../controllers/category';
    
    // Validating req.body
    router.post('/addRecord', validator("body", ['title']), addRecord);
    
    export default router;
    ```

2. **Adjust your controller function:**

    ```typescript
    import { Request, Response, NextFunction } from 'express';

    export async function addRecord(req: Request, res: Response, next: NextFunction) {
        try {
            const { title } = req["validData"];
            const oldData = await CategoryModel.findOne({ title });
            
            if (oldData != null) {
                return res.status(error.statusCode).json({
                    status: 'error',
                    statusCode: 403,
                    message: "Title already exists",
                })
            }
            
            const data = await CategoryModel.create({ ...req['validData'] });
            return res.json({ status: 'success', data });
        } catch (e) {
            return res.status(error.statusCode).json({
                status: 'error',
                statusCode: 500,
                message: "Internal server error",
            })
        }
    }
    ```
   
Feel free to adjust it further based on your preferences or project-specific details.
