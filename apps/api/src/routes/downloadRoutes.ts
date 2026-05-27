import {Router, Request, Response} from "express";
import { downloadRequestSchema } from "../validators/downloadValidators";

const router = Router();

router.post ("/download", (req: Request, res: Response) => {
    const result = downloadRequestSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid request data",
            errors: result.error.issues,
        });
    }

    res.json({
        message: "Download request received",
        data: result.data,
    });
});

export default router;