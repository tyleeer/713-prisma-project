import { Request, Response, Router } from "express";
import { getAllBooks, getFilteredBooks } from "../services/bookServices";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        // Parse query parameters
        const { title, dueDate, isReturned } = req.query;
        const pageSize = parseInt(req.query.pageSize as string) || 5;
        const pageNo = parseInt(req.query.pageNo as string) || 1;
        const keyword = req.query.keyword as string;

        // Choose query based on filter presence
        let result;
        if (title || dueDate || isReturned || keyword) {
            result = await getFilteredBooks({ title, dueDate, isReturned, pageNo, pageSize, keyword });
        } else {
            result = await getAllBooks({ pageNo, pageSize });
        }

        // Set pagination headers
        const { pagination, data } = result;
        res.setHeader("x-total-records", pagination.total_records.toString());
        res.setHeader("x-total-pages", pagination.totle_pages.toString()); // Note: there's a typo here that should be fixed
        res.setHeader("x-current-records", pagination.current_records.toString());
        res.setHeader("x-current-page", pagination.current_page.toString());

        // Return data
        res.status(200).json(data);
        return;
    } catch (error) {
        console.error("Error fetching books:", error);

        if ((error as Error).message === "No book found.") {
            res.status(404).send("No book found");
            return;
        } else if ((error as Error).message === "Invalid pageNo or pageSize") {
            res.status(400).send("Invalid pageNo or pageSize");
            return;
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;