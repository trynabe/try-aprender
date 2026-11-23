(() => {
  const file = (name, language, code) => ({ name, language, code });
  const step = (title, body, ...files) => ({ title, body, files });
  const ignoreEnv = file(".gitignore · เพิ่มบรรทัดเหล่านี้ถ้ายังไม่มี", null, "node_modules/\n.env");

  window.WebTechnologyLabSolutions = {
    9: [
      step("จัดไฟล์ให้อยู่ข้างกัน",
        "แตกไฟล์ตั้งต้นจากหัวข้อเตรียมไฟล์ สร้าง server.js ไว้ข้าง sign-in.html และ error.html แล้วเติมชื่อและ Section ใน comment บรรทัดแรก ใช้ __dirname เพื่ออ่านไฟล์จากตำแหน่งของ server.js"),
      step("เขียน server.js ทั้งไฟล์",
        "ให้ handler เช็ก path ก่อน ถ้าเป็น /hello ให้จบ response ด้วยข้อความทันที ส่วนเส้นทาง HTML ให้อ่านไฟล์ก่อนส่ง status และ body",
        file("server.js", "javascript", String.raw`// Name: [ชื่อ-นามสกุล] | Section: [ห้องเรียน]
const http = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  console.log("Req: " + pathname);

  if (req.method === "GET" && pathname === "/hello") {
    const message = "Hello from Server: " + Date.now();
    console.log(message);
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(message);
  }

  const isSignIn = req.method === "GET" && pathname === "/signin";
  const filename = isSignIn ? "sign-in.html" : "error.html";
  try {
    const html = await readFile(path.join(__dirname, filename));
    res.writeHead(isSignIn ? 200 : 404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  } catch (error) {
    console.error("Cannot read " + filename + ":", error.message);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Server could not read the HTML file.");
  }
});

server.listen(8081, "127.0.0.1", () => {
  console.log("Listening on the port 8081");
});`)),
      step("รันแล้วลองขอทั้งสามเส้นทาง",
        "เปิด terminal ที่โฟลเดอร์ฝึก รัน server ค้างไว้ แล้วเปิด terminal อีกอันเพื่อตรวจ status และ Content-Type ด้วย curl.exe บน Windows ตัวเลขของ /hello จะเปลี่ยนตามเวลาจริง",
        file("Terminal · รัน server", "bash", "node server.js"),
        file("Terminal อีกแท็บ · ตรวจผล", "bash", String.raw`curl.exe -i http://127.0.0.1:8081/hello
curl.exe -i http://127.0.0.1:8081/signin
curl.exe -i http://127.0.0.1:8081/mehh
# ผลตามลำดับ: 200 กับ Hello from Server, 200 กับฟอร์ม, 404 กับหน้า error`))
    ],
    10: [
      step("สร้างโปรเจกต์และตั้ง npm start",
        "แตก ZIP ให้โฟลเดอร์ html อยู่ใน root ของโปรเจกต์ รันคำสั่งจาก root จากนั้นเติม author ของคุณใน package.json หากใช้ส่งงานตาม README",
        file("Terminal", "bash", String.raw`npm init -y
npm install express@5
npm install --save-dev nodemon
npm pkg set main=app.js "scripts.start=nodemon app.js"`)),
      step("แก้ form tag ใน html/sign-in.html",
        "แทนที่แท็กเปิด <form> เดิมด้วยบรรทัดแรกด้านล่าง แล้วตรวจช่องอีเมลที่มีอยู่ให้มี name=\"email\" ตามบรรทัดที่สอง เก็บ label, ช่อง password, ปุ่ม Submit และแท็กปิด </form> ของชุดตั้งต้นไว้",
        file("html/sign-in.html · สองจุดที่ต้องแก้", "markup", String.raw`<form action="/form-submit" method="post">
  <input type="email" class="form-control" id="floatingInput" name="email" placeholder="name@example.com" required>`)),
      step("เขียน app.js ทั้งไฟล์",
        "ใช้ express.urlencoded อ่านค่าที่ form ส่งมาก่อนเข้า POST handler จากนั้น log เฉพาะอีเมลกับเวลา แล้วให้ browser ขอ GET /member ต่อ",
        file("app.js", "javascript", String.raw`const express = require("express");
const path = require("node:path");

const app = express();
const htmlDir = path.join(__dirname, "html");

app.use((req, res, next) => {
  console.log("Request at " + req.path);
  next();
});
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.type("text/plain").send("Hello World! in plain text");
});

app.get("/signin", (req, res) => {
  console.log("Retrieve a form");
  res.sendFile(path.join(htmlDir, "sign-in.html"));
});

app.post("/form-submit", (req, res) => {
  const email = req.body?.email;
  if (typeof email !== "string" || !email.trim()) {
    return res.status(400).send("Please enter an email.");
  }
  console.log("Form submitted by " + email.trim() + " at " + Date.now());
  res.redirect("/member");
});

app.get("/member", (req, res) => {
  res.sendFile(path.join(htmlDir, "success.html"));
});

app.use((req, res) => {
  console.log("404: Invalid accessed");
  res.status(404).sendFile(path.join(htmlDir, "error.html"));
});

app.listen(3030, "127.0.0.1", () => {
  console.log("Server listening on port: 3030");
});`)),
      step("เดินตาม flow ใน browser",
        "รัน npm start แล้วเปิด http://localhost:3030/signin กรอก student@example.test และใช้รหัสผ่านสมมติถ้าฟอร์มขอ กด Submit แล้วดู URL /member และ terminal ลองเปิด /omg เพื่อดู error.html พร้อม status 404",
        file("Terminal · ตัวอย่าง log หลัง Submit", null, String.raw`Request at /form-submit
Form submitted by student@example.test at 1728453550390
Request at /member`))
    ],
    11: [
      step("สร้างฐานฝึกและติดตั้งแพ็กเกจ",
        "แตก ZIP แล้วเปิด tinycollege-lab11.sql ใน MySQL Workbench รันไฟล์เพื่อสร้างฐานฝึก ถ้า SELECT COUNT(*) FROM tinycollege_lab11.Professor; ได้ 22 แถว ให้สร้าง app.js ที่ root แล้วติดตั้งแพ็กเกจ",
        file("Terminal", "bash", String.raw`npm init -y
npm install express@5 mysql2 dotenv
npm install --save-dev nodemon
npm pkg set main=app.js "scripts.start=nodemon app.js"`)),
      step("สร้าง .env และแก้ form",
        "ใช้บัญชี MySQL ของเครื่องที่อ่านตาราง Professor ได้ แทนค่าตัวอย่างใน .env ให้ตรงเครื่อง ใน html/searchProf.html ให้แทนแท็กเปิด form และตรวจให้ input เดิมมี name=\"empnum\"",
        file(".env", "ini", String.raw`PORT=3030
DB_HOST=127.0.0.1
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=tinycollege_lab11`),
        ignoreEnv,
        file("html/searchProf.html · สองจุดที่ต้องแก้", "markup", String.raw`<form action="/form-submit" method="post">
  <input type="text" class="form-control" id="floatingInput" placeholder="Employee Number" name="empnum" required>`)),
      step("เขียน app.js ทั้งไฟล์",
        "แปลงหมายเลขจากฟอร์มหลังตรวจรูปแบบ ส่งค่าเข้า pool.execute ผ่าน ? แล้วดู rows.length เพื่อเลือกหน้าที่แสดง ในเฉลยนี้กรณีค้นไม่พบใช้ HTTP 404",
        file("app.js", "javascript", String.raw`require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const path = require("node:path");

const app = express();
const port = Number(process.env.PORT || 3030);
const htmlDir = path.join(__dirname, "html");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log("Request at /");
  res.sendFile(path.join(htmlDir, "searchProf.html"));
});

app.post("/form-submit", async (req, res) => {
  console.log("Request at /form-submit");
  const input = req.body?.empnum;
  const employeeNumber = typeof input === "string" ? input.trim() : "";
  if (!/^\d+$/.test(employeeNumber) || Number(employeeNumber) > 2147483647) {
    return res.status(400).send("Please enter an Employee Number.");
  }
  console.log("Form submitted with Emp Num: " + employeeNumber);
  const [rows] = await pool.execute(
    "SELECT EMP_NUM, EMP_FNAME, EMP_LNAME FROM Professor WHERE EMP_NUM = ?",
    [Number(employeeNumber)]
  );
  console.log(rows.length + " rows returned");
  if (rows.length === 0) {
    console.log("Not found");
    return res.status(404).sendFile(path.join(htmlDir, "notfound.html"));
  }
  console.log("Found " + employeeNumber);
  res.sendFile(path.join(htmlDir, "found.html"));
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  console.error("Request failed:", error.code || error.message);
  res.status(500).send("Server could not complete the search.");
});

async function start() {
  try {
    await pool.query("SELECT 1");
    app.listen(port, "127.0.0.1", () => {
      console.log("Server listening on port: " + port);
    });
  } catch (error) {
    console.error("Cannot connect to MySQL:", error.code || error.message);
    await pool.end();
    process.exitCode = 1;
  }
}
start();`)),
      step("ทดสอบทั้งกรณีเจอและไม่เจอ",
        "ปิด server ที่พอร์ต 3030 จาก Lab 10 ก่อนถ้ายังเปิดอยู่ รัน npm start แล้วเปิด http://localhost:3030 กรอก 297 จากนั้นกลับมาที่ฟอร์มและกรอก 111",
        file("Terminal · ผลที่เทียบได้", null, String.raw`# 297: 1 rows returned และ Found 297 → found.html
# 111: 0 rows returned และ Not found → notfound.html`))
    ],
    12: [
      step("สร้างหน้าเว็บและใส่โค้ด Fetch",
        "สร้าง webservice-lab.html แล้ววางโค้ดทั้งหมดนี้ แทน YOUR_API_KEY ด้วยคีย์ของคุณในสำเนาที่ใช้ฝึกบนเครื่อง เก็บ placeholder ไว้ในสำเนาที่ส่งหรือเผยแพร่",
        file("webservice-lab.html", "markup", String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recipe Search</title>
  <style>
    #food-list li { margin-block: 0.6rem; }
    #food-list img { display: block; max-width: 100%; height: auto; }
  </style>
</head>
<body>
  <form id="search-form">
    <label for="query">Search:</label>
    <input id="query" type="search" value="Chicken" required>
    <button id="search-button" type="submit">Search</button>
  </form>
  <h1>Food List</h1>
  <p id="status" role="status"></p>
  <ul id="food-list"></ul>

  <script>
    const apiKey = "YOUR_API_KEY";
    const form = document.querySelector("#search-form");
    const input = document.querySelector("#query");
    const button = document.querySelector("#search-button");
    const list = document.querySelector("#food-list");
    const status = document.querySelector("#status");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const query = input.value.trim();
      if (button.disabled || !query) return;
      if (apiKey === "YOUR_API_KEY") {
        status.textContent = "Add your Spoonacular API key first.";
        return;
      }

      const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
      url.search = new URLSearchParams({ query, apiKey, number: "10" });
      button.disabled = true;
      status.textContent = "Searching...";
      list.replaceChildren();

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("HTTP " + response.status);
        const data = await response.json();
        if (!Array.isArray(data.results)) throw new Error("Unexpected API response");

        const items = data.results.map((recipe) => {
          const item = document.createElement("li");
          item.textContent = recipe.title;
          if (recipe.image) {
            const image = document.createElement("img");
            image.src = recipe.image;
            image.alt = recipe.title;
            image.width = 250;
            image.loading = "lazy";
            item.append(image);
          }
          return item;
        });
        list.append(...items);
        status.textContent = items.length ? "" : "No recipes found.";
      } catch (error) {
        status.textContent = "Search failed: " + error.message;
      } finally {
        button.disabled = false;
      }
    });
  </script>
</body>
</html>`)),
      step("ตามลำดับว่าโค้ดทำอะไรเมื่อกด Search",
        "submit หยุดการรีโหลดหน้า URLSearchParams จัดคำค้นให้เป็น query ของ URL fetch รอ HTTP response แล้วอ่าน JSON จากนั้น map ข้อมูลใน results ให้เป็น <li> และ <img> เมื่อค้นใหม่ replaceChildren ล้างชุดเดิมก่อน"),
      step("เปิดไฟล์ผ่านเว็บเซิร์ฟเวอร์ในเครื่อง",
        "เปิด terminal ในโฟลเดอร์ที่มีไฟล์ รันคำสั่งแล้วเปิด http://127.0.0.1:8000/webservice-lab.html กด Search ด้วยคำว่า Chicken ควรเห็นชื่อและรูปใต้ Food List ถ้าขึ้น Search failed ให้ดู status ใน Network เพื่อแยกปัญหา API key กับการแสดงผล",
        file("Terminal", "bash", "python -m http.server 8000 --bind 127.0.0.1"))
    ],
    13: [
      step("สร้างตารางและข้อมูลตั้งต้นใน Workbench",
        "รัน SQL ใน MySQL Workbench เพื่อเตรียมฐานฝึก lab13_practice ใช้ DOB ตามภาพ schema ส่วน Mobilephone เป็นข้อความเพื่อให้เลข 0 ตัวแรกอยู่ครบ",
        file("SQL · รันใน MySQL Workbench", "sql", String.raw`CREATE DATABASE IF NOT EXISTS lab13_practice;
USE lab13_practice;

CREATE TABLE IF NOT EXISTS personal_info (
  StudentID INT NOT NULL PRIMARY KEY,
  Firstname VARCHAR(45) NOT NULL,
  Lastname VARCHAR(45) NOT NULL,
  DOB DATETIME NOT NULL,
  Mobilephone VARCHAR(10) NOT NULL
);

INSERT IGNORE INTO personal_info (StudentID, Firstname, Lastname, DOB, Mobilephone)
VALUES (1, 'Robert', 'Dolls', '1985-01-20 00:00:00', '0919998877'),
       (2, 'Peter', 'Jones', '1980-06-10 00:00:00', '0834455667'),
       (3, 'Lily', 'James', '1991-10-20 00:00:00', '0889988776');`)),
      step("เตรียมโปรเจกต์ Node และค่าตั้ง MySQL",
        "รันคำสั่งในโฟลเดอร์ใหม่สำหรับ Lab นี้ จากนั้นสร้าง .env และแทนค่าบัญชี MySQL ให้ตรงเครื่อง บัญชีต้องอ่านและแก้ข้อมูลใน lab13_practice ได้",
        file("Terminal", "bash", String.raw`npm init -y
npm install express@5 mysql2 dotenv
npm pkg set main=StudentService.js "scripts.start=node StudentService.js"`),
        file(".env", "ini", String.raw`PORT=3013
DB_HOST=127.0.0.1
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=lab13_practice`),
        ignoreEnv),
      step("เขียน StudentService.js ทั้งไฟล์",
        "ส่วนแรกอ่าน JSON และตรวจข้อมูล ส่วน route ใช้ SELECT/INSERT/UPDATE/DELETE กับตารางเดียวกัน ค่าจาก URL และ body ใส่ผ่าน SQL parameters ทุกครั้ง โดย PUT และ DELETE ใช้ ID จาก URL",
        file("StudentService.js", "javascript", String.raw`require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = Number(process.env.PORT || 3013);
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true
});
app.use(express.json());

function isStudentId(value) {
  return Number.isInteger(value) && value > 0 && value <= 2147483647;
}

function readStudent(body, routeId) {
  const student = body?.student;
  if (!student || typeof student !== "object" || Array.isArray(student)) return null;
  const id = routeId ?? student.StudentID;
  if (!isStudentId(id) || (student.StudentID !== undefined && student.StudentID !== id)) return null;

  const { Firstname, Lastname, DOB, Mobilephone } = student;
  const validName = value => typeof value === "string" && value.trim().length > 0 && value.trim().length <= 45;
  if (!validName(Firstname) || !validName(Lastname)) return null;
  if (typeof DOB !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(DOB) || DOB < "1000-01-01") return null;
  const date = new Date(DOB + "T00:00:00.000Z");
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== DOB) return null;
  if (typeof Mobilephone !== "string" || !/^\d{10}$/.test(Mobilephone)) return null;
  return {
    StudentID: id,
    Firstname: Firstname.trim(),
    Lastname: Lastname.trim(),
    DOB: DOB + " 00:00:00",
    Mobilephone
  };
}

function invalidStudent(res) {
  return res.status(400).json({ error: true, message: "Check student fields, DOB and Mobilephone." });
}

function missingStudent(res) {
  return res.status(404).json({ error: true, message: "Student not found." });
}

app.param("id", (req, res, next, value) => {
  const id = Number(value);
  if (!/^\d+$/.test(value) || !isStudentId(id)) {
    return res.status(400).json({ error: true, message: "Invalid StudentID." });
  }
  req.studentId = id;
  next();
});

app.get("/students", async (req, res) => {
  const [rows] = await pool.execute(
    "SELECT StudentID, Firstname, Lastname, DOB, Mobilephone FROM personal_info ORDER BY StudentID"
  );
  res.json({ error: false, data: rows, message: "Student list." });
});

app.get("/student/:id", async (req, res) => {
  const [rows] = await pool.execute(
    "SELECT StudentID, Firstname, Lastname, DOB, Mobilephone FROM personal_info WHERE StudentID = ?",
    [req.studentId]
  );
  if (!rows.length) return missingStudent(res);
  res.json({ error: false, data: rows[0], message: "Student found." });
});

app.post("/student", async (req, res) => {
  const student = readStudent(req.body);
  if (!student) return invalidStudent(res);
  await pool.execute(
    "INSERT INTO personal_info (StudentID, Firstname, Lastname, DOB, Mobilephone) VALUES (?, ?, ?, ?, ?)",
    [student.StudentID, student.Firstname, student.Lastname, student.DOB, student.Mobilephone]
  );
  res.status(201).location("/student/" + student.StudentID)
    .json({ error: false, data: student, message: "Student created." });
});

app.put("/student/:id", async (req, res) => {
  const student = readStudent(req.body, req.studentId);
  if (!student) return invalidStudent(res);
  const [result] = await pool.execute(
    "UPDATE personal_info SET Firstname = ?, Lastname = ?, DOB = ?, Mobilephone = ? WHERE StudentID = ?",
    [student.Firstname, student.Lastname, student.DOB, student.Mobilephone, req.studentId]
  );
  if (!result.affectedRows) return missingStudent(res);
  res.json({ error: false, data: student, message: "Student updated." });
});

app.delete("/student/:id", async (req, res) => {
  const [result] = await pool.execute(
    "DELETE FROM personal_info WHERE StudentID = ?", [req.studentId]
  );
  if (!result.affectedRows) return missingStudent(res);
  res.json({ error: false, data: req.studentId, message: "Student deleted." });
});

app.use((req, res) => {
  res.status(404).json({ error: true, message: "Endpoint not found." });
});
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ error: true, message: "Invalid JSON." });
  }
  if (error.type === "entity.too.large") {
    return res.status(413).json({ error: true, message: "Request body too large." });
  }
  if (error.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ error: true, message: "StudentID already exists." });
  }
  console.error("Request failed:", error.code || error.message);
  res.status(500).json({ error: true, message: "Database error." });
});

async function start() {
  try {
    await pool.query("SELECT 1");
    app.listen(port, "127.0.0.1", () => {
      console.log("Student Service listening on " + port);
    });
  } catch (error) {
    console.error("Cannot connect to MySQL:", error.code || error.message);
    await pool.end();
    process.exitCode = 1;
  }
}
start();`)),
      step("รันและไล่ทดสอบใน Postman",
        "รัน npm start แล้วใช้ http://localhost:3013 เป็น Base URL ใน POST และ PUT ให้เลือก Body → raw → JSON โดย PUT ใช้ payload เดิมและเปลี่ยน Lastname เป็น Smith เมื่อได้ผลตามลำดับแล้วให้เก็บภาพ request และ response ของทั้ง 5 operations ใน webservic-testing.pdf",
        file("Postman · POST /student · Body", "json", String.raw`{
  "student": {
    "StudentID": 4,
    "Firstname": "Alice",
    "Lastname": "Brown",
    "DOB": "1995-04-18",
    "Mobilephone": "0800000000"
  }
}`),
        file("Postman · ลำดับทดสอบ", null, String.raw`GET    /students      → 200 รายการเริ่มต้น 3 คน
POST   /student       → 201 สร้าง ID 4
PUT    /student/4     → 200 Lastname เปลี่ยนเป็น Smith
GET    /student/4     → 200 อ่าน Smith กลับมาได้
DELETE /student/4     → 200 ลบ ID 4
GET    /student/4     → 404 หลังลบ
GET    /students      → 200 กลับมาเหลือ 3 คน`))
    ],
    14: [
      step("เปิดโปรเจกต์ React แยกสำหรับฝึก",
        "ใช้โปรเจกต์ reactlab ที่เตรียมตามโจทย์หรือสำเนาของโปรเจกต์นั้น เปิด src/index.js ในสำเนาฝึก ตัวอย่างนี้ใช้ React 19 และ createRoot ตามชุดที่มีในโฟลเดอร์ Lab 14"),
      step("เขียน src/index.js ทั้งไฟล์",
        "InfoForm ใช้ state เก็บค่าฟอร์มและใช้ name ของแต่ละช่องเลือก key ที่จะอัปเดต render อ่าน props.type เพื่อแสดงช่องของ Special ส่วน handleSubmit เลือกข้อความ alert จากโหมดนั้น",
        file("src/index.js", "jsx", String.raw`import React from "react";
import { createRoot } from "react-dom/client";

class InfoForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    age: "",
    nationality: "Thai",
    disability: "No"
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, age, nationality } = this.state;
    const intro = "Hello, " + firstName.trim() + " " + lastName.trim();
    const detail = this.props.type === "special"
      ? "Your nationality is " + nationality
      : "Your age is " + age;
    alert(intro + "\n" + detail);
  };

  render() {
    const { firstName, lastName, age, nationality, disability } = this.state;
    const special = this.props.type === "special";
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input id="firstName" name="firstName" value={firstName}
            onChange={this.handleChange} required />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input id="lastName" name="lastName" value={lastName}
            onChange={this.handleChange} required />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" name="age" type="number" min="0" value={age}
            onChange={this.handleChange} required />
        </div>
        {special && (
          <>
            <div>
              <label htmlFor="nationality">Pick your nationality:</label>
              <select id="nationality" name="nationality" value={nationality} onChange={this.handleChange}>
                {["Thai", "Chinese", "Japanese", "American", "Other"].map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="disability">Disability:</label>
              <select id="disability" name="disability" value={disability} onChange={this.handleChange}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </>
        )}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mode = new URLSearchParams(window.location.search).get("type");
const type = mode === "special" ? "special" : "normal";
createRoot(document.getElementById("root")).render(<InfoForm type={type} />);`)),
      step("เปิดสองโหมดแล้วเทียบ Alert",
        "รัน npm start ใน reactlab ใช้ URL ที่โปรเจกต์แจ้ง ตัวอย่างพอร์ต 3000 เปิด /?type=normal กับ /?type=special ทีละหน้า กรอก Mali Dee อายุ 21 ในทั้งสองหน้า โหมด Special ลองเปลี่ยนสัญชาติเป็น Japanese เพื่อยืนยันว่า alert อ่านค่าจาก state ล่าสุด",
        file("ผลที่ควรเห็นใน Alert", null, String.raw`Normal
Hello, Mali Dee
Your age is 21

Special เมื่อเลือก Japanese
Hello, Mali Dee
Your nationality is Japanese`))
    ]
  };
})();
