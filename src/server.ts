import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { CustomError } from './models/types';
import bookRouter from './routes/bookRoutes';
import authorRouter from './routes/authorRoutes';
import memberRouter from './routes/memberRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());           // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/members", memberRouter);

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Server is running!' });
});

// Example protected route
app.get('/api/protected', (req: Request, res: Response) => {
    // Add your authentication middleware here
    res.json({ message: 'This is a protected route' });
});

// Error handling middleware
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal server error',
            status: err.status || 500
        }
    });
});

// Handle 404 routes
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: {
            message: 'Route not found',
            status: 404
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;