import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';


export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  const validationResult = schema.safeParse(req.body);

  if (!validationResult.success) {
    const validationErrors = validationResult.error.errors.map(err => ({
      path: err.path[0],
      message: err.message
    }));
    return res.status(400).json({ errors: validationErrors });
  }


  req.body = validationResult.data;
  next();
};
