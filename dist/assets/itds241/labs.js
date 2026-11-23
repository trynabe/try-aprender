(() => {
  const fileRoot = "assets/itds241/lab-files/";
  const starter = number => {
    const name = "practice " + number + ".zip";
    return { text: "ดาวน์โหลด " + name, href: fileRoot + encodeURIComponent(name), download: name };
  };

  window.WebTechnologyLabs = [
    {
      number: 9,
      title: "Node.js HTTP Server",
      thaiTitle: "สร้าง server ด้วย http module และตอบตามเส้นทาง",
      summary: "ให้ browser ขอข้อความทักทาย หน้า Sign in และหน้าข้อผิดพลาดจาก server ที่พอร์ต 8081",
      sections: [
        {
          id: "setup", title: "เตรียมไฟล์",
          steps: [
            "เช็ก Node.js ด้วย node --version แล้วสร้างโฟลเดอร์ XX87XXX-server หรือโฟลเดอร์ฝึกของคุณ",
            "แตก ZIP และวาง sign-in.html กับ error.html ไว้ที่ root สร้าง server.js เป็นไฟล์เริ่มต้น",
            "ใส่ชื่อและ section เป็น comment ใน server.js ตามโจทย์ แล้วใช้ node server.js เมื่อพร้อมทดสอบ"
          ],
          links: [starter(9)]
        },
        {
          id: "task", title: "โจทย์ที่ต้องทำ",
          steps: [
            "ใช้ http module สร้าง server ที่ localhost:8081 เมื่อเริ่มให้ terminal ขึ้น Listening on the port 8081",
            "รับ request จาก browser และ log เส้นทางทุกรอบในรูป Req: /path",
            "ทำ /hello ให้ตอบ 200 และส่ง Hello from Server: {timestamp} แบบ plain text พร้อม log ข้อความเดียวกันใน terminal",
            "ทำ /signin ให้ส่ง sign-in.html ด้วย status 200 และส่ง error.html ด้วย status 404 เมื่อ path อื่นเข้ามา"
          ],
          note: "คำอธิบายใน README เขียนว่าหน่วยวินาที แต่ตัวอย่างเป็นเลข 13 หลักจาก Date.now() ให้ใช้มิลลิวินาทีตามผลตัวอย่าง ส่วน /sigin ที่สะกดในตัวอย่างให้ใช้ /signin ตามโจทย์",
          hints: ["แยกหน้าที่ของ req.url, res.statusCode, Content-Type และการจบ response", "ไฟล์ HTML อยู่ข้าง server.js ใช้ fs อ่านไฟล์และจัดการกรณีอ่านไม่สำเร็จ"]
        },
        {
          id: "check", title: "ตรวจงาน",
          tables: [{
            title: "ลองเปิดทีละ URL", headers: ["Request", "Status", "ผลที่ต้องเห็น"], formats: ["request", "status"],
            rows: [["GET /hello", "200", "Hello from Server: 1728440776750 (เลขเปลี่ยนตามเวลาที่เปิด)"], ["GET /signin", "200", "หน้า sign-in.html ขึ้น Please sign in"], ["GET /mehh", "404", "หน้า error.html"]]
          }],
          checks: [["start", "รัน node server.js และเห็น Listening on the port 8081"], ["hello", "โหลด /hello สองครั้ง ข้อความและ timestamp ใน terminal กับ browser ตรงกัน"], ["pages", "เช็ก /signin กับ path อื่นใน Network และได้ status 200 กับ 404 ตามลำดับ"]],
          summary: "ไฟล์ที่ต้องทำใน Lab นี้คือ server.js"
        }
      ]
    },
    {
      number: 10,
      title: "Express Routing & Forms",
      thaiTitle: "สร้าง route และรับ POST จากฟอร์ม Sign in",
      summary: "ฝึกให้ Express ส่ง HTML ตาม route อ่านอีเมลจากฟอร์ม แล้ว redirect ผู้ใช้ไปหน้า Member",
      sections: [
        {
          id: "setup", title: "เตรียม Express",
          steps: [
            "สร้างโปรเจกต์ XX87XXX-express ด้วย npm init ตั้ง entry point เป็น app.js และเพิ่ม author ตามโจทย์",
            "ติดตั้ง express และ nodemon แล้วกำหนด scripts.start เป็น nodemon app.js",
            "แตก ZIP ให้ sign-in.html, success.html และ error.html อยู่ใต้ html/ สร้าง app.js ที่ root"
          ],
          links: [starter(10)]
        },
        {
          id: "task", title: "โจทย์ที่ต้องทำ",
          steps: [
            "เปิด server ที่ localhost:3030 และ log Request at ตาม path ของทุก request",
            "ทำ GET / และ GET /signin ตามตาราง แก้ฟอร์มใน sign-in.html ให้ submit แบบ POST ไป /form-submit โดยส่งค่า email",
            "ให้ POST /form-submit อ่านอีเมลแล้ว log Form submitted by {email} at {timestamp} จากนั้น redirect ไป /member",
            "ให้ GET /member ส่ง success.html และวาง fallback สำหรับ path อื่นให้ตอบ error.html พร้อม status 404 และ log 404: Invalid accessed"
          ],
          tables: [{
            title: "สัญญาของแต่ละ route", headers: ["Method / Path", "สิ่งที่ต้องตอบ"], formats: ["request"],
            rows: [["GET /", "Hello World! in plain text"], ["GET /signin", "sign-in.html และ log Retrieve a form"], ["POST /form-submit", "redirect ไป /member"], ["GET /member", "success.html แสดง Welcome ~ Let's Play"], ["Path ที่ไม่ได้ประกาศ", "404 และ error.html"]]
          }],
          hints: ["ฟอร์ม HTML แบบปกติส่งแบบ URL-encoded ติด parser ให้ทันก่อน handler อ่าน body", "ดู value ของ name ใน input อีเมล และให้ handler กับ HTML ใช้ชื่อเดียวกัน", "หลัง redirect browser จะขอ GET /member แยกอีก request จึงควรเห็น log ทั้งสองเส้นทาง"]
        },
        {
          id: "check", title: "ตรวจงาน",
          summary: "ใช้ตัวอย่างอีเมลฝึก student@example.test ตอนทดสอบ ไฟล์ที่ต้องทำคือ app.js และ html/sign-in.html",
          code: "Request at /form-submit\nForm submitted by student@example.test at 1728453550390\nRequest at /member",
          checks: [["start", "npm start เรียก nodemon และ terminal บอกว่า server ฟังที่ 3030"], ["get", "หน้า / แสดงข้อความครบ และ /signin เปิดฟอร์มได้"], ["post", "กด Submit แล้ว log มีอีเมลและ timestamp ครบ จากนั้น URL เป็น /member"], ["fallback", "เปิด /omg แล้วได้ error.html พร้อม HTTP 404"]]
        }
      ]
    },
    {
      number: 11,
      title: "Express & MySQL Search",
      thaiTitle: "ค้นหา Professor จากหมายเลขพนักงาน",
      summary: "รับ Employee Number จากฟอร์ม ค้นใน MySQL แล้วเลือกหน้า Found หรือ Not Found ให้ตรงกับผลค้นหา",
      sections: [
        {
          id: "setup", title: "เตรียมโปรเจกต์และฐานข้อมูล",
          steps: [
            "สร้างโปรเจกต์ XX87XXX-expressdb ด้วย npm init ตั้ง entry point เป็น app.js ติดตั้ง express, nodemon, mysql2 และ dotenv แล้วตั้ง npm start ให้เรียก nodemon app.js",
            "แตก ZIP ให้ html/searchProf.html, html/found.html และ html/notfound.html อยู่ในโปรเจกต์",
            "เปิด MySQL Server ใช้ Workbench เปิด tinycollege-lab11.sql จาก ZIP แล้วรันเพื่อสร้างฐานฝึก tinycollege_lab11 ซึ่งมีเฉพาะตาราง Professor และข้อมูลจำลอง 22 แถว",
            "เตรียม .env ในโปรเจกต์ ใส่ PORT=3030 และ DB_HOST, DB_USER, DB_PASSWORD, DB_NAME ให้ตรงกับ MySQL ของเครื่อง ตั้ง DB_NAME=tinycollege_lab11 เมื่อใช้ข้อมูลจาก ZIP"
          ],
          note: "โจทย์จริงใช้ฐาน tinycollege ชุดฝึกนี้ใช้ tinycollege_lab11 เพื่อให้ทดลองได้แยกจากข้อมูลที่มีอยู่แล้ว",
          links: [starter(11)]
        },
        {
          id: "task", title: "โจทย์ที่ต้องทำ",
          steps: [
            "โหลด .env และเชื่อม MySQL ตอนเริ่ม server ที่ localhost:3030",
            "ทำ GET / ให้ส่ง searchProf.html และ log Request at /",
            "แก้ form ให้ POST ไป /form-submit คงชื่อช่อง empnum แล้ว log Form submitted with Emp Num: {ค่าที่กรอก}",
            "ค้นหา EMP_NUM ในตาราง Professor จากหมายเลขที่รับมา และ log จำนวนแถวที่ได้",
            "ถ้าพบ ให้ log Found ตามด้วยหมายเลขและส่ง found.html ถ้าไม่พบ ให้ log Not found และส่ง notfound.html"
          ],
          note: "หัวข้อโจทย์บรรทัดหนึ่งระบุ found.html แม้ค้นไม่เจอ ให้ยึดภาพ Expected Output และไฟล์ notfound.html สำหรับกรณีไม่พบ",
          hints: ["ใส่หมายเลขพนักงานเป็น SQL parameter เพื่อแยกค่าที่กรอกจากคำสั่ง SQL", "อ่าน array แถวที่ได้ก่อนตัดสินใจส่งไฟล์ จัดการ DB error แยกจากกรณีผลเป็น 0 แถว"]
        },
        {
          id: "check", title: "ตรวจงาน",
          summary: "ไฟล์ที่ต้องทำใน Lab คือ app.js และ html/searchProf.html",
          tables: [{
            title: "เทียบผลกับข้อมูลฝึก", headers: ["ลองกรอก", "Terminal", "Browser"],
            rows: [["297", "1 rows returned / Found 297", "found.html"], ["111", "0 rows returned / Not found", "notfound.html"]]
          }],
          checks: [["database", "SELECT * FROM Professor บนฐานฝึกได้ 22 แถว"], ["found", "ส่งหมายเลข 297 แล้วได้หน้า Found พร้อม log"], ["missing", "ส่งหมายเลข 111 แล้วได้หน้า Employee not found"], ["env", "ค่าตั้งของการเชื่อม MySQL อยู่ใน .env ของโปรเจกต์ฝึก"]]
        }
      ]
    },
    {
      number: 12,
      title: "Spoonacular Recipe Search",
      thaiTitle: "ค้นหาสูตรอาหารด้วย Fetch และแสดงชื่อกับรูป",
      summary: "เขียน HTML และ JavaScript เพื่อรับคำค้น เรียก Search Recipes และแสดงรายการอาหารในหน้าเดียว",
      sections: [
        {
          id: "setup", title: "เตรียม API",
          steps: [
            "สร้างไฟล์ webservice-lab.html แล้วเปิดด้วยเว็บเซิร์ฟเวอร์ในเครื่อง",
            "เตรียม API key ของ Spoonacular สำหรับการฝึกในเครื่อง แล้วอ่านเรื่อง Search Recipes และ Authentication",
            "ลองวางโครงหน้า Search, ปุ่ม Search และหัวข้อ Food List ตามภาพตัวอย่าง"
          ],
          links: [
            starter(12),
            { text: "Spoonacular · Search Recipes", href: "https://spoonacular.com/food-api/docs#Search-Recipes-Complex" },
            { text: "Spoonacular · Authentication", href: "https://spoonacular.com/food-api/docs#Authentication" }
          ]
        },
        {
          id: "task", title: "โจทย์ที่ต้องทำ",
          steps: [
            "รับคำค้นจากช่อง Search เช่น Chicken แล้วส่ง GET ด้วย Fetch ไปที่ https://api.spoonacular.com/recipes/complexSearch โดยแนบ query และ apiKey ตามเอกสาร",
            "เมื่อได้ JSON สำเร็จ ให้อ่านผลจาก results ใช้ title เป็นชื่ออาหารและ image เป็นรูปของแต่ละรายการ",
            "นำชื่อและรูปมาจัดเป็นรายการใต้ Food List เมื่อค้นคำใหม่ให้เปลี่ยนเป็นผลชุดใหม่",
            "เพิ่มข้อความสำหรับกรณีค้นไม่พบหรือ API ตอบข้อผิดพลาด เพื่อให้แยกได้จากผลการค้นหาปกติ"
          ],
          hints: ["ตรวจ response.ok ก่อนอ่าน JSON และใช้ URLSearchParams สำหรับคำค้นที่มีช่องว่าง", "ให้ชื่อจาก API เป็น text ของ DOM และกำหนด src กับ alt ให้รูป", "ลองดู Network เพื่อแยกว่า request ไป endpoint ถูกต้องหรือปัญหาอยู่ที่การแสดงผล"]
        },
        {
          id: "check", title: "ตรวจงาน",
          summary: "ภาพโจทย์ใช้คำค้น Chicken ชื่อ ลำดับ และจำนวนเมนูจะขึ้นกับผลที่ API ส่งมาตอนฝึก",
          images: [{ file: "lab-12-example.png", width: 204, height: 471, caption: "ตัวอย่าง Food List เมื่อค้น Chicken", alt: "ช่อง Search สำหรับ Chicken และรายการอาหารพร้อมรูป เช่น Chicken 65, Chicken Suya และ Chicken Wings" }],
          checks: [["request", "กด Search แล้ว Fetch ส่งคำค้น Chicken ไปใน query"], ["results", "Food List แสดงชื่อและรูปของแต่ละผลจาก results"], ["repeat", "ลองคำที่มีช่องว่าง เช่น chicken soup แล้วผลชุดใหม่แทนชุดเก่า"], ["file", "บันทึกงานเป็น webservice-lab.html และเก็บ API key จริงไว้นอกไฟล์ที่จะส่งหรือเผยแพร่"]]
        }
      ]
    },
    {
      number: 13,
      title: "Student REST API & Postman",
      thaiTitle: "สร้าง CRUD ด้วย Node.js/MySQL และเทสต์ด้วย Postman",
      summary: "สร้าง StudentService.js ให้เพิ่ม อ่าน แก้ และลบข้อมูลใน personal_info แล้วทำรายงานจาก request ที่ทดสอบจริง",
      sections: [
        {
          id: "setup", title: "เตรียม Schema และข้อมูล",
          steps: [
            "เปิด MySQL Server และ Workbench โจทย์ตั้งชื่อฐานตามรูป itds242-[Section] เช่น itds242-2 หากฝึกซ้ำใช้ฐาน lab13_practice แล้วให้ค่า DB_NAME ใน .env ตรงกัน",
            "สร้างตาราง personal_info ตามภาพ schema ให้ StudentID เป็น primary key และเก็บ Mobilephone เป็นข้อความเพื่อรักษาเลข 0 ต้นสาย",
            "เพิ่มข้อมูลตัวอย่าง 3 แถวตามตาราง แล้วเตรียมโปรเจกต์ Node.js ที่ติดตั้ง express, mysql2 และ dotenv"
          ],
          links: [starter(13)],
          tables: [
            { title: "ฟิลด์ตามภาพ Schema", headers: ["ฟิลด์", "ชนิดข้อมูล"], rows: [["StudentID", "INT"], ["Firstname", "VARCHAR(45)"], ["Lastname", "VARCHAR(45)"], ["DOB", "DATETIME"], ["Mobilephone", "VARCHAR(10)"]] },
            { title: "ข้อมูลตั้งต้นจากโจทย์", headers: ["StudentID", "Firstname", "Lastname", "DOB", "Mobilephone"], rows: [["1", "Robert", "Dolls", "1985-01-20", "0919998877"], ["2", "Peter", "Jones", "1980-06-10", "0834455667"], ["3", "Lily", "James", "1991-10-20", "0889988776"]] }
          ],
          note: "README ใช้หัวตาราง Birthdate ส่วนภาพ schema ใช้ DOB ให้ใช้ DOB เป็นชื่อคอลัมน์และฟิลด์ JSON ของชุดฝึก",
          imageLabel: "ดูภาพ Schema จากโจทย์",
          images: [{ file: "lab-13-schema.png", width: 423, height: 217, caption: "Schema ของ personal_info ในโจทย์", alt: "ตาราง personal_info มี StudentID, Firstname, Lastname, DOB และ Mobilephone" }]
        },
        {
          id: "task", title: "โจทย์ที่ต้องทำ",
          steps: [
            "เขียน StudentService.js ให้เชื่อม MySQL และรองรับ Select all, Select, Insert, Update และ Delete โดยใช้ตาราง personal_info",
            "ใช้ route ด้านล่างเป็นสัญญาสำหรับฝึกตามชุด Postman ในโฟลเดอร์ Lab 13 เปิด service ที่ localhost:3013 เพื่อทดสอบ",
            "สำหรับ POST/PUT ใช้ Body แบบ raw JSON และ header Content-Type: application/json ให้ Node คืนผลเป็น JSON สำหรับทุก operation",
            "ทำรายงาน webservic-testing.pdf แบ่งเป็น 5 หัวข้อ Insert, Update, Delete, Select และ Select all พร้อมภาพที่เห็น Method, URL, Status และ Response"
          ],
          tables: [{
            title: "ห้า Request สำหรับฝึก", headers: ["Operation", "Method / Path", "ข้อมูลที่ส่ง"], formats: [null, "request"],
            rows: [["Select all", "GET /students", "ไม่มี body"], ["Select", "GET /student/4", "ID จาก path"], ["Insert", "POST /student", "Body student มี StudentID และข้อมูลครบ"], ["Update", "PUT /student/4", "Body student มีข้อมูลที่แก้ เช่น Lastname=Smith"], ["Delete", "DELETE /student/4", "ID จาก path"]]
          }],
          codeLanguage: "json",
          code: '{\n  "student": {\n    "StudentID": 4,\n    "Firstname": "Alice",\n    "Lastname": "Brown",\n    "DOB": "1995-04-18",\n    "Mobilephone": "0800000000"\n  }\n}',
          hints: ["ID ที่อ่านและ ID ที่กรองด้วย WHERE ต้องเป็นเลขเดียวกัน", "อ่าน SELECT เป็นชุดแถว ส่วน INSERT/UPDATE/DELETE ตรวจว่าคำสั่งกระทบกี่แถว", "ภาพ Insert ใน README เป็นตัวอย่างรูปแบบรายงาน ใช้ชื่อฟิลด์จาก personal_info สำหรับ API นี้"]
        },
        {
          id: "check", title: "ตรวจงาน",
          summary: "จับภาพขณะทดสอบด้วย Postman เก็บ StudentService.js ในโปรเจกต์และคง .gitignore ไว้",
          checks: [
            ["all", "GET /students ได้ 200 และเห็นข้อมูลตั้งต้น 3 คนก่อนเริ่มทดสอบกับ ID 4"],
            ["insert", "POST /student เพิ่ม Alice Brown แล้วได้ 201 และเห็น ID 4 ใน response"],
            ["update", "PUT /student/4 แก้นามสกุลเป็น Smith แล้วได้ 200"],
            ["select", "GET /student/4 ได้ 200 และอ่าน Lastname เป็น Smith"],
            ["delete", "DELETE /student/4 ได้ 200 จากนั้น GET ID 4 ได้ 404 และ GET /students เหลือชุดเดิม"],
            ["report", "รายงาน PDF มีหลักฐานของครบทั้ง 5 operations"]
          ]
        }
      ]
    },
    {
      number: 14,
      title: "React InfoForm",
      thaiTitle: "เขียน Class Component พร้อมฟอร์ม Normal และ Special",
      summary: "ให้ InfoForm เลือกหน้าตาฟอร์มจาก props.type เก็บค่าที่กรอก และขึ้น alert ตามประเภทตอนกด Submit",
      sections: [
        {
          id: "setup", title: "เตรียมโปรเจกต์ React",
          steps: [
            "สร้างโปรเจกต์ reactlab คำสั่งในโจทย์คือ npx create-react-app reactlab",
            "เปิดไฟล์ src/index.js แล้วเตรียม class InfoForm โดยให้จุด render เลือกได้ว่าจะส่ง type='normal' หรือ type='special'",
            "ถ้าใช้ชุด React 19 เหมือนโปรเจกต์ในโฟลเดอร์ Lab 14 ให้ใช้ createRoot จาก react-dom/client เพื่อ render component"
          ],
          links: [starter(14), { text: "React · createRoot", href: "https://react.dev/reference/react-dom/client/createRoot" }]
        },
        {
          id: "task", title: "โจทย์ที่ต้องทำ",
          steps: [
            "ให้ Normal มี First Name, Last Name, Age และปุ่ม Submit ตามภาพ",
            "ให้ Special มีสามช่องเดิมและเพิ่ม Pick your nationality กับ Disability เป็น select โดยตั้งค่าเริ่มต้น Thai และ No ตามภาพ",
            "เก็บค่าฟอร์มใน state ของ InfoForm และให้ onChange อัปเดตค่าจาก input/select ที่เปลี่ยน",
            "ให้ onSubmit หยุดการส่งฟอร์มแบบเดิม แล้ว alert สองบรรทัด Normal ให้ทักชื่อ-นามสกุลและแสดงอายุ ส่วน Special ให้ทักชื่อ-นามสกุลและแสดงสัญชาติ",
            "สลับ props.type แล้วลองฝึกทั้งสองกิ่งโดยใช้ InfoForm คลาสเดียว"
          ],
          hints: ["ใช้ props เพื่อเลือก field ระหว่าง render ใช้ state สำหรับค่าที่ผู้ใช้แก้ขณะกรอก", "ใน class ให้ตรวจว่า event handler ยังอ้าง this ได้ และ name ตรงกับ key ที่ใช้เก็บค่า", "Special มีช่อง Age และ Disability ตามภาพ แต่สองค่านั้นไม่อยู่ใน alert ตัวอย่าง"]
        },
        {
          id: "check", title: "ตรวจงาน",
          summary: "ลองกรอกชื่อ Mali Dee อายุ 21 เลือก Thai แล้วเทียบข้อความกับตัวอย่าง ตั้งชื่อโปรเจกต์ reactlab และคงไฟล์ .gitignore ตามโจทย์",
          tables: [{
            title: "ข้อความที่ควรได้หลัง Submit", headers: ["โหมด", "บรรทัดแรก", "บรรทัดที่สอง"],
            rows: [["normal", "Hello, Mali Dee", "Your age is 21"], ["special", "Hello, Mali Dee", "Your nationality is Thai"]]
          }],
          images: [
            { file: "lab-14-normal.png", width: 259, height: 119, caption: "Normal", alt: "ฟอร์ม Normal มี First Name, Last Name, Age และ Submit" },
            { file: "lab-14-special.png", width: 249, height: 160, caption: "Special", alt: "ฟอร์ม Special เพิ่มกล่องเลือกสัญชาติและ Disability" },
            { file: "lab-14-alert_normal.png", width: 442, height: 150, caption: "Alert ของ Normal", alt: "กล่อง Alert แสดงคำทักทายพร้อมชื่อและประโยค Your age is 35" },
            { file: "lab-14-alert_special.png", width: 434, height: 150, caption: "Alert ของ Special", alt: "กล่อง Alert แสดงคำทักทายพร้อมชื่อและประโยค Your nationality is Thai" }
          ],
          checks: [["normal-fields", "type='normal' แสดง First Name, Last Name และ Age ครบ"], ["special-fields", "type='special' เพิ่ม select สัญชาติและ Disability โดยค่าเริ่มต้นตรงภาพ"], ["normal", "กด Submit ใน Normal แล้ว alert แสดงชื่อและอายุจากค่าที่เพิ่งกรอก"], ["special", "เปลี่ยนสัญชาติแล้วกด Submit ใน Special และ alert แสดงสัญชาติที่เลือก"], ["page", "หลังปิด alert หน้าเดิมยังอยู่และค่าที่กรอกไม่หาย"]]
        }
      ]
    }
  ].map(lab => ({ ...lab, id: "lab-" + String(lab.number).padStart(2, "0") }));
})();
