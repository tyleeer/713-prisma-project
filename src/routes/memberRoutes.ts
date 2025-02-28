import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    const { sort } = req.params;
    if (sort) {

    }
})

export default router;
