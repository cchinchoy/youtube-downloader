import express from 'express';
import cors from 'cors';
import downloadRoutes from './routes/downloadRoutes';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req,res) => {
    res.json({
        status: "ok",
        service: "youtube-downloader-api",
    });
});

app.use("/api", downloadRoutes);

app.listen(PORT, ()=> {
    console.log(`API running on http://localhost:${PORT}`);
});
