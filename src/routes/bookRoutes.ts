import { Request, Response, Router } from "express";
import { getAllBooks, getFilteredBooks } from "../services/bookServices";

const router = Router();


router.get("/", async (req: Request, res: Response) => {
    try {
        const { title, dueDate, isReturned } = req.query;

        if (title || dueDate || isReturned) {
            const filteredBooks = await getFilteredBooks({ title, dueDate, isReturned });
            res.status(200).json(filteredBooks);
            return;
        }

        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
