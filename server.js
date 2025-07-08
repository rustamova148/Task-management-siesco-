import jsonServer from 'json-server';
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(express.static(path.join(__dirname, "dist")));

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

server.use("/api", router);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
