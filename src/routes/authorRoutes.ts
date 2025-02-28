import { Request, Response, Router } from "express";
import { getAllAuthors } from "../repositories/authorRepositories";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const authors = await getAllAuthors();
        res.status(200).json(authors);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

export default router;