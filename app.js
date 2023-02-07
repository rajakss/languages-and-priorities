const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "todoApplication.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get(/todos/, async (request, response) => {
  const { status } = request.query;
  const query = `select * from 
    todo
    where status='${status}'`;
  const r = await db.all(query);
  response.send(r);
});

app.get(/todos/, async (request, response) => {
  const { id } = request.body;
  const query = `select * from 
    todo
    where id=${id}`;
  const r = await db.all(query);
  response.send(r);
});
