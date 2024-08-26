import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
env.config();
const port = 3000;
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
// Should print 'string'

db.connect();

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  try {
    const result = await db.query(
      "INSERT INTO login (email, password) VALUES ($1, $2)",
      [email, password]
    );
    res.status(201).json({ success: true, message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error inserting data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
