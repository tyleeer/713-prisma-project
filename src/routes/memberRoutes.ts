import { Request, Response, Router } from "express";
import { getAllMembers, getSortedMembers } from "../services/memberServices";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { sort } = req.query;
        if (sort) {
            const sortedMembers = await getSortedMembers(sort as string);
            res.status(200).json(sortedMembers);
            return;
        }

        const members = await getAllMembers();
        res.status(200).json(members);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

export default router;
