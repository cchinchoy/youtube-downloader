export type DownloadFormat = "video" | "audio";

export type DownloadQuality = "best" | "1080p" | "720p" | "480p";

export type DownloadRequest = {
    url: string,
    format: DownloadFormat,
    quality: DownloadQuality
};

