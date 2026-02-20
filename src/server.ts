// @ts-ignore
import express, { Request, Response } from 'express';
// @ts-ignore
import { createServer } from 'http';
// @ts-ignore
import { Server } from 'socket.io';
// @ts-ignore
import cors from 'cors';
// @ts-ignore
import dotenv from 'dotenv';

// .env fayldan o'zgaruvchilarni o'qish (agar bo'lsa)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// HTTP Server va Socket.io ni ulash
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "*" } // Flutter va JS dan ulanishga ruxsat
});

// Middleware (Xavfsizlik va JSON o'qish uchun)
app.use(cors());
app.use(express.json());

// 1. API - SERVER ISHLAYOTGANINI TEKSHIRISH (Health Check)
app.get('/', (req: Request, res: Response) => {
    res.send("✅ Smart Cam Backend muvaffaqiyatli ishlamoqda!");
});

// 2. JONLI ALOQA (SOCKET.IO) KANALI
io.on('connection', (socket) => {
    console.log(`📱 Yangi mijoz ulandi: ${socket.id}`);

    // Kimdir uzilib qolsa
    socket.on('disconnect', () => {
        console.log(`❌ Mijoz uzildi: ${socket.id}`);
    });
});

// Serverni ishga tushirish
httpServer.listen(PORT, () => {
    console.log(`\n🚀 SERVER YONDI! PORT: ${PORT}`);
    console.log(`📡 SOCKET KUTMOQDA...`);
    console.log(`🌐 Brauzerda tekshiring: http://localhost:${PORT}`);
});