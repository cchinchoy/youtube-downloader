import { DownloadRequestBody } from "../validators/downloadValidators";

export type DownloadResult = {
    status: "queued";
    url: string;
    format: string;
    quality: string;
    outputPath: string;

};

export function createDownloadJob(request: DownloadRequestBody): DownloadResult {
    const outputPath = "/downloads";

    return {
        status: "queued",
        url: request.url,
        format: request.format,
        quality: request.quality,
        outputPath,
    };
}
