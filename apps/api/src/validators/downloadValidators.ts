import {z} from "zod";

export const downloadRequestSchema = z.object({
    url: z.url(),
    format: z.enum(["video","audio"]),
    quality: z.enum(["best","1080p","720p","480p"]),
});

export type DownloadRequestBody = z.infer<typeof downloadRequestSchema>;
