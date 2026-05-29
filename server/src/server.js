import app from './app.js';
import dotenv from "dotenv";
import { initializeDatabase } from './config/initDb.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    await initializeDatabase();

    app.listen(PORT, () => {
        console.log(`Server lancé sur le port ${PORT}`)
    })
}

startServer();