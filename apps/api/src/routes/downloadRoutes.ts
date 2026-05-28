import {Router, Request, Response} from "express";
import { downloadRequestSchema } from "../validators/downloadValidators";
import { downloadVideo } from "../services/downloadService";


const router = Router();

router.post ("/download",  async(req: Request, res: Response) => {
    const result = downloadRequestSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid request data",
            errors: result.error.issues,
        });
    }

    const downloadResult = await downloadVideo(result.data);

    return res.json(downloadResult);
});

export default router;