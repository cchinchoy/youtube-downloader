import {Router, Request, Response} from "express";
import { downloadRequestSchema } from "../validators/downloadValidators";
import { createDownloadJob } from "../services/downloadService";


const router = Router();

router.post ("/download", (req: Request, res: Response) => {
    const result = downloadRequestSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid request data",
            errors: result.error.issues,
        });
    }

    const job = createDownloadJob(result.data);

    res.json({
        message: "Download job created",
        job,
    });
});

export default router;