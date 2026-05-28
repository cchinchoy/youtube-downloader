import {spawn} from "child_process";
import path from "path";

import { DownloadRequestBody } from "../validators/downloadValidators";

export type DownloadResult = {
    status: "queued";
    url: string;
    format: string;
    quality: string;
    outputPath: string;

};

function buildFormatArgs(format: string, quality: string): string[] {
    if (format === "audio") {
        return[
            "-x",
            "--audio-format",
            "mp3",
        ];
    }

    switch (quality) {
        case "1080p":
            return[
                "-f",
                "bestvideo[height<=1080]+bestaudio/best[height<=1080]",
            ];
        case "720p":
            return[
                "-f",
                "bestvideo[height<=720]+bestaudio/best[height<=720]",
            ];
        case "480p":
            return[
                "-f",
                "bestvideo[height<=480]+bestaudio/best[height<=480]",
            ];

        default:
            return[
                "-f",
                "bestvideo+bestaudio/best",
            ];
    }
}

export function downloadVideo(request: DownloadRequestBody): Promise<DownloadResult> {
        return new Promise((resolve)=> {
            const downloadPath = path.resolve("downloads");

            const formatArgs = buildFormatArgs(request.format, request.quality);

            const args = [
                ...formatArgs,
                "-o",
                `${downloadPath}/%(title)s.%(ext)s`,
                request.url,
            ];

            console.log("yt-dlp args:", args);

            const process = spawn("yt-dlp", args);

            let output = "";
            let errorOutput = "";

            process.stdout.on("data", (data) => {
                const text = data.toString();

                console.log(text);
                output += text;
            });

            process.stderr.on("data",(data) => {
                const text = data.toString();

                errorOutput += text;
                
            });

            process.on("close", (code) => {
                if (code === 0) {
                    resolve({
                        success: true,
                        message: "Download Completed",
                        output,
                        outputPath: downloadPath,
                    });
                } else {
                    resolve({
                        success: false,
                        message: "Download Failed",
                        error: errorOutput,
                    });
                }
            });
        });
    }


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
