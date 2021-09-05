import { AppError } from "./errors/AppError";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { usersRoutes } from "./routes/users.routes";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`
    });
});

export { app };
