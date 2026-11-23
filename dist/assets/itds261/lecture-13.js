(() => {
  const { addChapter, section, example, quiz } = window.SoftwareEngineering;

  const zooPrice = [
    "class Zoo:",
    "    def get_ticket_price(self, age):",
    "        if 0 < age <= 12:",
    "            return 50",
    "        elif 13 <= age <= 20:",
    "            return 100",
    "        elif 21 <= age <= 60:",
    "            return 150",
    "        elif age > 60:",
    "            return 100"
  ].join("\n");

  addChapter({
    number: 13,
    title: "Unit Testing, Integration Testing, and System Testing",
    thaiTitle: "เลือกระดับการทดสอบ เขียนหลักฐาน และไล่เส้นทางจากโค้ด",
    totalPages: 40,
    codeLanguage: "java",
    summary: "เริ่มจากเลือกขอบเขตที่จะทดสอบ แล้วใช้ JUnit ตรวจผลฟังก์ชัน อ่าน V-model กับเอกสารการทดสอบ และฝึก ECP, BVA และ Path Analysis จากโจทย์ท้ายสไลด์",
    goals: [
      "เลือก Unit, Integration หรือ System Testing จากจุดที่ต้องการจับความผิดพลาดได้",
      "ไล่ผล JUnit แยก expected กับ actual และอ่าน Test Report กับ Traceability Record ได้",
      "เลือกตัววัด Usability ให้ตรงกับสิ่งที่อยากรู้ แล้วทำ ECP, BVA และชุด Independent Paths ได้"
    ],
    confusions: [
      "ระดับทดสอบบอกขอบเขต ส่วน Regression บอกจุดประสงค์ของการรันซ้ำหลังการเปลี่ยนแปลง จึงทำได้หลายระดับ",
      "assertEquals เช็กความเท่ากันของค่า ส่วน assertSame เช็กว่า reference ชี้ object ตัวเดียวกัน",
      "โจทย์อายุและยอดซื้อหน้า 33–38 มีช่วงทับซ้อนหรือขาด จึงต้องประกาศสมมติฐานก่อนกำหนด Expected Result"
    ],
    sections: [
      section("testing-phases", "1–5", "เลือกขอบเขตก่อนเลือก Test",
        "Testing คือการเก็บหลักฐานว่าพฤติกรรมจริงตรงกับสิ่งที่ต้องการ เช่น ฟังก์ชันคืนค่าอะไร โมดูลคุยกันได้ไหม และระบบทั้งชุดทำงานตาม Requirement หรือเปล่า การเจอ defect ตั้งแต่ขอบเขตเล็กช่วยลดเวลาและต้นทุนในการตามสาเหตุทีหลัง",
        [
          ["Unit Testing", "ตรวจส่วนเล็กที่สุดที่ทดสอบแยกได้ เช่น method หนึ่งตัว รันเร็ว ต้นทุนต่ำ จึงทำถี่"],
          ["Integration Testing", "ประกอบหน่วยแล้วตรวจรอยต่อ ข้อมูล และการพึ่งพากัน ใช้การเตรียมสภาพแวดล้อมและเวลามากขึ้น"],
          ["System Testing", "ตรวจระบบที่ประกอบครบเทียบกับ Requirement ใช้ขอบเขตกว้างและสภาพแวดล้อมใกล้ใช้งานจริง จึงมีต้นทุนสูงกว่าสองระดับแรก"]
        ]),
      section("junit", "6–14", "Unit Test, JUnit และการอ่าน Assertion",
        "Unit test ที่ดีทดสอบพฤติกรรมเฉพาะจุด รันเร็ว ทำซ้ำแล้วให้ผลเดิม และรันอัตโนมัติใน CI/CD ได้ ถ้าผลขึ้นกับฐานข้อมูลหรือเวลาจริง ให้คุมหรือจำลอง dependency เพื่อให้ตามสาเหตุได้ตรงจุด",
        [
          ["JUnit", "เฟรมเวิร์ก Java ของ Kent Beck และ Erich Gamma ที่สไลด์เชื่อมกับ TDD หรือ Test-Driven Development ใช้ dependency แบบ JAR, test runner, annotation และ assertion ร่วมกับ IDE หรือเครื่องมือ build เช่น Eclipse, Ant และ Maven"],
          ["เครื่องมือ Java หน้า 8", "สไลด์ยก Jmockit, Cactus, Cobertura, Dbunit และ dJUnit เป็นตัวอย่างเครื่องมือในงานทดสอบ Java แต่จุดเน้นต่างกัน เช่น Cobertura รายงาน coverage และ Dbunit เตรียมหรือยืนยันข้อมูลสำหรับการทดสอบที่ใช้ฐานข้อมูล"],
          ["Assertion", "เงื่อนไขที่ต้องเป็นจริงเพื่อให้ Test ผ่าน อ่าน arguments ให้ถูกว่าอะไรคือ expected จากข้อกำหนด และอะไรคือ actual ที่โค้ดคำนวณ"]
        ], [
          example("junit-lifecycle", [10, 11], "ไล่ JUnit Checklist และ Test Class Lifecycle",
            "ภาพหน้า 10 แสดง Initialize, Write test cases, Write a test suite และ Execute test suite ภาพหน้า 11 เพิ่มลำดับ lifecycle ของ JUnit 4 โดยมี StudentTest เป็นตัวอย่าง",
            "เรียงว่าเมื่อต้องรันสอง test cases โค้ดเตรียมและเก็บกวาดถูกเรียกกี่ครั้ง",
            [
              "เตรียมโครงการให้ test runner ทำงานได้ เขียนเคสที่กำหนด input และ expected result แล้วจัดชุดเพื่อรัน",
              "ใช้ @Test ระบุ test method และใช้ @BeforeClass เตรียมของร่วมกันหนึ่งครั้งก่อนเริ่มทั้งคลาส",
              "สำหรับแต่ละเคสให้รัน @Before → @Test → @After ส่วน @AfterClass ทำครั้งเดียวท้ายคลาส"
            ],
            "สองเคสทำให้ @Before และ @After รันอย่างละสองครั้ง ส่วน @BeforeClass และ @AfterClass รันอย่างละครั้ง",
            { diagram: ["Initialize และเขียน Test Cases", "รวมเป็น Test Suite", "@BeforeClass", "แต่ละเคส: @Before → @Test → @After", "@AfterClass"] }),
          example("assertion-table", [12], "เลือก Assertion ให้ตรงชนิดที่ต้องเช็ก",
            "ตารางในภาพแยกการเช็กค่า เงื่อนไข null ตัวตนของ object และสมาชิกของ array",
            "เลือกเมธอดที่นิยามพฤติกรรมที่อยากตรวจได้ชัดที่สุด",
            [
              "ถ้าเทียบค่ากับผลจริง ให้ใช้ assertEquals(expected, actual) ส่วนเงื่อนไข boolean ใช้ assertTrue หรือ assertFalse",
              "ระบุว่าอนุญาตให้ไม่มี object ไหม แล้วเลือก assertNull หรือ assertNotNull",
              "ถ้าข้อกำหนดพูดถึง object เดียวกัน ให้เทียบ reference ด้วย assertSame ส่วน array ให้ตรวจสมาชิกตามตำแหน่งด้วย assertArrayEquals"
            ],
            "เลือก assertion ตามสิ่งที่กำลังพิสูจน์ เช่น ค่าข้างใน Array ใช้ assertArrayEquals แม้สอง Array สร้างคนละอัน",
            { table: { headers: ["เมธอด", "สิ่งที่ต้องจริง"], rows: [
              ["assertEquals", "ค่าที่คาดกับค่าจริงเท่ากัน ตาม overload ที่ใช้"],
              ["assertTrue / assertFalse", "เงื่อนไขเป็น true / false ตามลำดับ"],
              ["assertNotNull / assertNull", "ค่าไม่เป็น null / เป็น null ตามลำดับ"],
              ["assertSame / assertNotSame", "reference ชี้ object เดียวกัน / คนละ object"],
              ["assertArrayEquals", "สมาชิก array ตรงกันตามลำดับ"]
            ] } }),
          example("junit-assertion-trace", [13], "ไล่ผลจากตัวอย่าง Assertion",
            "ภาพสร้าง String ใหม่สองครั้งจาก abc, ค่าที่เป็น null หนึ่งตัว, String literal ที่ซ้ำกันสองตัว, จำนวน 5 กับ 6 และ Array ที่สมาชิกเหมือนกัน",
            "ทำนายว่าการตรวจค่าและการตรวจ reference ให้ผลแบบไหน",
            [
              'new String("abc") สองรอบได้คนละ object แต่มีค่าเท่ากัน จึง assertEquals ผ่านและ assertSame จะไม่ผ่าน',
              "5 < 6 เป็น true และ 5 > 6 เป็น false จึงผ่านทั้ง assertTrue และ assertFalse ที่แสดง",
              "str1 มี object ส่วน str3 เป็น null ทำให้ assertNotNull(str1) และ assertNull(str3) ผ่าน",
              "สำหรับค่าที่เตรียมต่อไว้ String literal เหมือนกันชี้ String interned ตัวเดียวกัน และสอง Array มีสมาชิกเหมือนกัน จึงตรวจได้ด้วย assertSame(str4, str5) และ assertArrayEquals ตามลำดับ"
            ],
            "Assertions ที่เห็นในภาพผ่านทั้งหมด ตัวแปร literal และ Array ใช้เชื่อมกับเมธอดในตารางหน้า 12",
            { codePrompt: [
              'String str1 = new String("abc");',
              'String str2 = new String("abc");',
              'String str3 = null;',
              'String str4 = "abc", str5 = "abc";',
              'int val1 = 5, val2 = 6;',
              'String[] expectedArray = {"one", "two", "three"};',
              'String[] resultArray = {"one", "two", "three"};',
              '',
              'assertEquals(str1, str2);',
              'assertTrue(val1 < val2);',
              'assertFalse(val1 > val2);',
              'assertNotNull(str1);',
              'assertNull(str3);'
            ].join("\n"), note: "กล่องถอดเฉพาะส่วนที่มีผลต่อการไล่ Assertion จากภาพ โค้ดนี้อยู่ใน test method ของ JUnit" }),
          example("student-junit", [14], "JUnit Example: Student.getDisplayName()",
            "Student รับ firstName, lastName, ID และ birthYear แต่ getDisplayName ใช้เฉพาะชื่อกับนามสกุล ภาพสร้าง Student ชื่อ Morakot Choetkiertikul และมี test ที่คาดหวัง String สองแบบ",
            "หาข้อความจริงและชี้ว่า test ใดผ่าน",
            [
              'Constructor เก็บค่าที่ส่งเข้ามา จากนั้นเมธอดรับข้อมูลจาก fields แล้วต่อ firstName + " " + lastName',
              "testGetDisplayNameSpace คาดหวังข้อความที่มีช่องว่างหนึ่งตัว จึงตรงกับค่าจริง",
              "testGetDisplayNameNospace คาดหวังข้อความติดกัน ผลจริงมีช่องว่างจึง fail ถ้า Requirement ต้องมีช่องว่าง ให้แก้ expectation ของเคสนี้หรือเปลี่ยนเคสเป็นการตรวจพฤติกรรมที่ตั้งใจ"
            ],
            "ผลจริงคือ Morakot Choetkiertikul เคส space ผ่านและเคส nospace ไม่ผ่านตาม implementation ในสไลด์",
            { codePrompt: [
              "public String getDisplayName() {",
              '    return firstName + " " + lastName;',
              "}",
              "",
              "// expected ในสอง test เมื่อสร้างชื่อและนามสกุลตามสไลด์",
              'assertEquals("Morakot Choetkiertikul", displayName);',
              'assertEquals("MorakotChoetkiertikul", displayName);'
            ].join("\n"), note: "ตัด constructor และ imports ที่ไม่เปลี่ยนผลลัพธ์ออกเพื่อให้เห็นจุดที่ทั้งสองเคสต่างกัน ภาพใช้ org.junit.Test และ org.junit.Assert ตาม JUnit 4" })
        ]),
      section("integration-system", "15–18", "จากรอยต่อโมดูลถึงระบบที่ประกอบครบ",
        "Integration Test จับความผิดพลาดที่โผล่เมื่อส่วนต่าง ๆ ทำงานร่วมกัน เช่น service ส่งค่าให้ฐานข้อมูลผิดแบบ ส่วน System Test เทียบพฤติกรรมของระบบที่ประกอบแล้วกับข้อกำหนดจริงทั้งด้านฟังก์ชันและคุณภาพ",
        [
          ["Scaffolding", "ชุดช่วยทดสอบ เช่น test harness, fixture และ mock/stub สำหรับควบคุมบริบท สไลด์บอกว่า Integration มักเตรียมมากเพราะต้องต่อหลายส่วน"],
          ["ความผิดพลาดที่เจอระหว่าง Integration", "ถ้าฟังก์ชันเดี่ยวคำนวณผิด ให้ย้อนดู Unit Test ถ้าหน่วยถูกแต่คุยกันไม่ได้ ให้ดู Interface Specification และการแบ่งโมดูล"],
          ["ประเภท System Test", "Functional ตรวจว่าทำงานได้ตามที่ระบุ Non-functional ตรวจคุณภาพ เช่น ความเร็ว Usability และความน่าเชื่อถือ Security ตรวจการควบคุมสิทธิ์และความปลอดภัยของการใช้งาน"]
        ], [
          example("database-integration", [15, 16, 17, 18], "ฟังก์ชันที่ต้องเชื่อมฐานข้อมูล",
            "สไลด์ยกฟังก์ชันที่มีการเชื่อม DB และตารางเปรียบเทียบ Specification, โครงสร้างที่มองเห็น, Scaffolding และจุดที่แต่ละระดับค้นหา Fault",
            "เลือกว่าจะตรวจฟังก์ชัน รอยต่อ หรือการใช้งานครบระบบ",
            [
              "ชั้น Unit ใช้ contract ของโมดูลและดูรายละเอียดโค้ด แยก dependency เพื่อไล่ input และ output ของหน่วยเอง",
              "ชั้น Integration ใช้ interface specs และโครงสร้างโมดูล เชื่อมฟังก์ชันเข้าฐานข้อมูลทดสอบเพื่อดูว่า query, mapping และข้อมูลที่คืนตรงกัน",
              "ชั้น System ใช้ requirements specification และสังเกตพฤติกรรมจากมุมผู้ใช้โดยรวม เช่น ทำรายการสำเร็จและระบบรับภาระได้ตามเกณฑ์"
            ],
            "ถ้าโจทย์เจาะการสื่อสารของฟังก์ชันกับ DB คำตอบคือ Integration Test",
            { table: { headers: ["ระดับ", "ฐานอ้างอิง", "Fault ที่มองหา"], rows: [
              ["Unit", "Module interface และรายละเอียดโค้ด", "Fault ในโมดูล"],
              ["Integration", "Interface specs, module breakdown และสถาปัตยกรรม", "Fault ในรอยต่อและความเข้ากันได้"],
              ["System", "Requirements specification และพฤติกรรมที่มองเห็นจากระบบ", "Fault ในการทำงานของระบบ"]
            ] } })
        ]),
      section("evidence-regression", "19–24", "V-model, หลักฐานการรัน และ Regression",
        "การทดสอบที่ตามรอยได้มีทั้งแผน ทดสอบจริง ผลที่ได้ และรหัสเชื่อมกลับไปยัง Requirement เมื่อแก้โค้ด ให้ใช้ข้อมูลเชื่อมโยงนี้เลือกเคสเดิมที่มีโอกาสได้รับผลกระทบ",
        [
          ["Verification / Validation", "Verification เช็กกับข้อกำหนดหรือแบบที่ใช้สร้าง ส่วน Validation เช็กว่าได้ระบบที่ตอบโจทย์การใช้งานจริง V-model แสดงจุดเชื่อมตั้งแต่ Requirements ถึง Coding และระดับการทดสอบที่คู่กัน"],
          ["Test Case / Test Report / RTM", "Test Case เป็นขั้นตอนกับผลคาดหวังของเคสหนึ่ง Test Report สรุปสถานะการรันหลายเคส RTM หรือ Requirements Traceability Matrix เชื่อม Business Requirement, Functional Requirement และ Test Case ID"],
          ["Regression Testing", "รันชุดทดสอบเดิมที่เกี่ยวข้องหลังแก้บั๊ก เพิ่มฟีเจอร์ ปรับประสิทธิภาพ หรือบำรุงรักษา เพื่อเช็กว่าพฤติกรรมที่เคยทำงานยังใช้ได้"]
        ], [
          example("testing-v-model", [19], "อ่านลูกศรของ V-model",
            "ภาพมีกิ่ง Development จาก Requirements ลงมาถึง Coding และกิ่ง Testing จาก Unit ขึ้นไปถึง Acceptance",
            "จับคู่กิจกรรมทดสอบกับหลักฐานที่ต้องกลับไปเช็ก",
            [
              "ลูกศรเข้มของ Verification เชื่อม Unit → Coding, Integration → Detailed Design และ System → High-Level Design ตามภาพ",
              "ลูกศรอ่อนของ Validation เชื่อม Acceptance กับ Requirements และชวนย้อนดูว่า artefacts ระหว่างทางยังตอบโจทย์ที่เริ่มต้นหรือไม่"
            ],
            "อ่านจากชื่อระดับทดสอบทางขวากลับไปยัง artefact ทางซ้ายเพื่อรู้ว่าควรหา Expected Behavior จากอะไร",
            { diagram: ["Coding ↔ Unit", "Detailed Design ↔ Integration", "High-Level Design ↔ System", "Requirements ↔ Acceptance"] }),
          example("login-test-case", [20], "อ่าน Test Case Template ของการเข้าสู่ระบบ",
            "เคสตัวอย่าง Fun_10 ตรวจ login ด้วย username และ password ที่ valid โดยมีบัญชีที่ใช้ได้เป็น Precondition",
            "แยกข้อมูลทดสอบ ขั้นตอน Expected Result, Actual Result และสถานะ",
            [
              "เตรียมบัญชีทดสอบตาม precondition แล้วเปิดหน้า login กรอก username และ password จาก test data และกด Login",
              "Expected Result คือเข้าสู่ระบบได้ เปรียบเทียบกับ Actual Result ที่ผู้ใช้ไปหน้า dashboard หลัง login",
              "ถ้าพฤติกรรมตรงให้บันทึก Pass และตรวจ Postcondition ที่ภาพระบุว่าบัญชีผ่านการยืนยันและมี session ถูกบันทึก"
            ],
            "ตัวอย่างแสดง Pass โดยมีหลักฐานเป็นการเข้าถึง dashboard และผลหลังเข้าสู่ระบบตามที่ระบุ"),
          example("system-report", [21], "อ่านภาพ Test Report จากรอบ System Test",
            "ภาพรายงานแยกแผนกับผลรัน และแจกแจงตาม Functions เช่น New Customer, Edit Account และ Mini Statement",
            "บอกจำนวนที่รัน ผลผ่าน–ไม่ผ่าน และจะเปิดดูคอลัมน์ใดถ้าต้องตามรายฟังก์ชัน",
            [
              "อ่านยอด Test Planned และ Tests Executed แยกกัน ภาพรายงานตัวอย่างแสดงทั้งคู่เป็น 130",
              "ดู Passed 130, Failed 0, Pending 0, In Progress 0 และ Blocked 0",
              "ดู % TCs Executed, % TCs Passed, TCs pending, Priority และ Remarks ของแต่ละฟังก์ชันเพื่อแยกสถานะออกจากยอดรวม"
            ],
            "รอบตัวอย่างรัน 130 จาก 130 เคสและผ่าน 130 เคส ตัวเลขอธิบายเฉพาะเคสที่กำหนดในรายงาน"),
          example("flight-traceability", [22], "ไล่ Requirements Traceability Matrix ของระบบจองเที่ยวบิน",
            "ภาพแบ่ง BR_1 Reservation Module กับ BR_2 Payment Module แล้วผูกแต่ละ Functional Requirement กับรหัสทดสอบ",
            "ถ้าแก้ระบบชำระด้วยบัตรเครดิต ให้หา Test Case ที่ต้องทบทวนจากตาราง",
            [
              "เริ่มที่ BR_2 ซึ่งรวม requirements ด้านชำระเงิน",
              "เลือก FR_4 By Credit Card แล้วอ่าน Test Case ID ในคอลัมน์ขวาสุด",
              "ทดสอบ TC#007 และ TC#008 จาก mapping โดยตรวจรอยต่อกับเคสอื่นเพิ่มเติมตามขอบเขตโค้ดที่แตะ"
            ],
            "FR_4 เชื่อมกับ TC#007 และ TC#008 จึงเป็นจุดเริ่มต้นเลือก Regression Suite",
            { table: { headers: ["BR", "FR", "เคสตามภาพ"], rows: [
              ["BR_1 Reservation", "FR_1 One Way Ticket", "TC#001, TC#002"],
              ["BR_1 Reservation", "FR_2 Round Way Ticket", "TC#003, TC#004"],
              ["BR_1 Reservation", "FR_3 Multicity Ticket", "TC#005, TC#006"],
              ["BR_2 Payment", "FR_4 Credit Card", "TC#007, TC#008"],
              ["BR_2 Payment", "FR_5 Debit Card", "TC#009"],
              ["BR_2 Payment", "FR_6 Reward Points", "TC#010, TC#011"]
            ] } })
        ]),
      section("quality-usability", "25–31", "Software Quality Models และวิธีวัด Usability",
        "Usability คือความง่ายและความคล่องในการทำเป้าหมายของผู้ใช้ เริ่มจากให้ผู้ใช้เป้าหมายทำงานจริง แล้ววัดว่าเรียนรู้ได้แค่ไหน ใช้เวลานานเท่าไร ผิดอย่างไร และรู้สึกแบบไหน",
        [
          ["Usability 5 ด้าน", "Learnability คือเริ่มเป็นง่ายไหม Efficiency คือทำงานเร็วไหม Memorability คือกลับมาแล้วจำวิธีได้ไหม Errors คือผิดบ่อยและกู้กลับได้อย่างไร Satisfaction คือพอใจแค่ไหน"],
          ["วิธีเก็บข้อมูล", "Task-Based Testing ให้ผู้ใช้ทำภารกิจแล้วสังเกต A/B Testing เปรียบเทียบสองแบบด้วยเกณฑ์เดียวกัน ส่วน Survey หรือ Questionnaire เก็บความพอใจและความง่ายที่ผู้ใช้รับรู้"],
          ["Performance Measurement", "ตัววัดในบริบทผู้ใช้มีเวลาต่อภารกิจ จำนวนงานในเวลาจำกัด สัดส่วนสำเร็จต่อข้อผิดพลาด จำนวน error เวลาแก้ จำนวนฟีเจอร์ที่ไม่ถูกใช้ และความถี่หรือเวลาที่ใช้เปิด Help"],
          ["Best Practices", "ทำโค้ดให้แบ่งหน่วยได้ ผูกชุด test กับ CI/CD รันสม่ำเสมอ จำลอง dependency ตามโจทย์ และใช้ coverage หาเคสที่ยังขาด โดยให้ความสำคัญกับพฤติกรรมที่ทดสอบจริง"]
        ], [
          example("product-quality-model", [25], "อ่านแผนภาพ Software Product Quality",
            "ภาพประกอบ Software Product Quality แตกเป็น 8 กลุ่ม เช่น Usability, Reliability และ Maintainability",
            "จับว่าข้อกำหนดคุณภาพที่อ่านเป็นคนละกลุ่มกันอย่างไร",
            [
              "ถ้าโจทย์ถามว่าฟังก์ชันครบ ถูก และเหมาะกับงาน ให้ดู Functional Suitability",
              "ถ้าถามเวลาและทรัพยากร ให้ดู Performance Efficiency ส่วนการทำงานร่วมกับระบบอื่นอยู่ใน Compatibility",
              "โยงคำถามที่เหลือตามลักษณะงาน เช่น รองรับการเข้าถึงอยู่ใน Usability กู้ระบบกลับได้อยู่ใน Reliability และแก้งานหรือเขียน test ง่ายอยู่ใน Maintainability"
            ],
            "เกณฑ์ Functional Suitability เป็นเพียงหนึ่งในแปดมิติ จึงต้องเลือกการวัดให้ตรงกับข้อกำหนดคุณภาพแต่ละข้อ",
            { table: { headers: ["กลุ่มในภาพ", "องค์ประกอบที่ภาพยก"], rows: [
              ["Functional Suitability", "Completeness, Correctness, Appropriateness"],
              ["Performance Efficiency", "Time Behaviour, Resource Utilization, Capacity"],
              ["Compatibility", "Co-existence, Interoperability"],
              ["Usability", "Appropriateness Recognizability, Learnability, Operability, User Error Protection, UI Aesthetics, Accessibility"],
              ["Reliability", "Maturity, Availability, Fault Tolerance, Recoverability"],
              ["Security", "Confidentiality, Integrity, Non-repudiation, Authenticity, Accountability"],
              ["Maintainability", "Modularity, Reusability, Analysability, Modifiability, Testability"],
              ["Portability", "Adaptability, Installability, Replaceability"]
            ] } }),
          example("usability-observation", [27, 28, 29, 30], "อ่านการจัดโต๊ะ Usability Testing",
            "ภาพมี Participant กับ laptop ที่ใช้ทำงาน, Facilitator กับ laptop ของผู้สังเกต, external monitor และ task sheets",
            "ระบุใครทำภารกิจและใช้หลักฐานอะไรแยกความเร็วออกจากความพึงพอใจ",
            [
              "ให้ผู้ใช้เป้าหมายทำตาม task sheet ด้วยเครื่องของผู้เข้าร่วม ส่วน Facilitator สังเกตและบันทึกโดยไม่ทำแทน",
              "จับเวลาจบงานและเก็บจำนวนครั้งที่ผิดหรือเวลาที่ใช้แก้เพื่อประเมิน Efficiency กับ Errors",
              "เก็บ Satisfaction ด้วยคำถามหลังทำภารกิจ ถ้ามีสอง UI ให้ใช้ภารกิจและตัววัดที่เทียบกันได้ในการทำ A/B Test"
            ],
            "ผู้ใช้เป็นคนลงมือ ส่วนผู้ดูแลเก็บทั้งตัวเลขพฤติกรรมและความคิดเห็นจากผู้ใช้")
        ]),
      section("bva-ecp-exercises", "32–38", "โจทย์สไลด์ 5–7: แบ่ง Class แล้วทดสอบขอบ",
        "เริ่มจากแปลงข้อความเป็นช่วงที่ไม่ทับและไม่มีรู ECP ใช้ค่าตัวแทนจากแต่ละกลุ่มที่คาดว่าจะประมวลผลเหมือนกัน ส่วน Boundary Value Analysis หรือ BVA เน้นค่าตรงขอบและข้างขอบที่หลุดเงื่อนไขได้ง่าย",
        [
          ["ECP", "Equivalence Class Partitioning แบ่งอินพุตเป็น classes ทั้งแบบ valid และ invalid แล้วกำหนด expected behavior ของแต่ละกลุ่ม"],
          ["BVA ตามตารางสไลด์", "All Cases รวมค่ารอบปลายช่วงทั้งด้านในและนอก Belonging Cases เก็บค่าที่อยู่ใน class นั้น Reduced Class เก็บตัวแทนปลายช่วงเพื่อทดสอบรอยต่อ"],
          ["สมมติฐาน", "โจทย์ใช้ค่าอายุและยอดซื้อเป็นจำนวนเต็ม Expected Result ของแต่ละค่าต้องมาจาก class ที่ค่านั้นอยู่จริง"]
        ], [
          example("park-tickets-bva", [33, 34], "Exercise 5: BVA ของราคาตั๋วอุทยาน",
            "โจทย์ให้เด็กอายุต่ำกว่า 12 เข้าฟรี ผู้ใหญ่อายุ 18–60 จ่าย 200 บาท และกลุ่มอายุนอกช่วงผู้ใหญ่จ่าย 100 บาท ตารางเฉลยให้ <0 เป็น invalid",
            "เลือกค่าที่คาบทุกขอบ และระบุราคาในแต่ละช่วง",
            [
              "ให้เงื่อนไขเด็กเข้าฟรีมาก่อนกลุ่มอายุต่ำกว่า 18 จึงเหลือ 12–17 ราคา 100 บาท",
              "จัด class ที่เหลือเป็น <0 invalid, 0–11 ฟรี, 18–60 ราคา 200 และ ≥61 ราคา 100",
              "เลือกค่าขอบตามสไลด์ เช่น −1, 0, 1 รอบอายุศูนย์ และ 59, 60, 61 รอบขอบ 60 แล้วรวมค่าซ้ำ",
              "ถ้าต้องการ Reduced Cases ใช้สองค่าติดกันคนละด้านของรอยต่อคือ −1/0, 11/12, 17/18 และ 60/61 แล้วใส่ผลแยกแต่ละค่า"
            ],
            "−1 → invalid, 0 และ 11 → ฟรี, 12 และ 17 → 100, 18 และ 60 → 200, 61 → 100 บาท",
            { note: "หน้า 33 ใช้ถ้อยคำ under 18 and older than 60 ซึ่งถ้าอ่านเป็น AND อายุเดียวเข้าไม่ได้ และ under 18 ยังทับเด็กฟรี หน้า 34 แยก 12–17 กับกลุ่มสูงวัย แถวท้ายเขียน >61 แต่ใส่ 61 เป็นเคสที่อยู่ในกลุ่ม จึงใช้ >60 หรือ ≥61 ของจำนวนเต็มตามตัวอย่าง" }),
          example("discount-ecp", [35, 36], "Exercise 6: ECP ของส่วนลดสมาชิก",
            "โจทย์แบ่งตามยอดซื้อ <500, 500–999, 1,000–4,999, >5,000 และ >100,000 เป็น invalid ส่วนตารางเฉลยเพิ่ม <=0 เป็น invalid และจัดขอบ 500 กับ 5,000 ต่างจากถ้อยคำโจทย์",
            "ทำช่วงที่ครอบคลุมจำนวนเต็มทุกค่าแล้วเลือกตัวแทนจากแต่ละช่วง",
            [
              "ให้เงื่อนไข invalid จากเฉลยมีลำดับก่อนส่วนลด เพื่อให้ยอด ≤0 หรือ >100,000 ถูกปฏิเสธ",
              "ใช้ถ้อยคำ 500–999 ตามโจทย์ จึงได้ 500 เป็น 5% และใช้ 5,000 เป็น 20% ตามตารางเฉลยเพื่อปิดช่องว่างที่โจทย์ทิ้งไว้",
              "เลือกค่าตัวแทนกลางกลุ่ม เช่น 450, 658, 2,599 และ 45,100 พร้อมค่าตัวแทนของกลุ่ม invalid ทั้งด้านล่างและบน"
            ],
            "ตัวแทน −5, 450, 658, 2,599, 45,100, 111,111 ให้ผล Invalid, 0%, 5%, 10%, 20%, Invalid ตามลำดับ",
            { table: { headers: ["Class ที่ใช้ในบทนี้", "Representative", "Expected Result"], rows: [
              ["≤0", "−5", "Invalid"], ["1–499", "450", "0%"], ["500–999", "658", "5%"],
              ["1,000–4,999", "2,599", "10%"], ["5,000–100,000", "45,100", "20%"], [">100,000", "111,111", "Invalid"]
            ] }, note: "หน้า 36 ในตารางเดิมให้ 1–500 เป็น 0% และ 501–999 เป็น 5% ต่างจากหน้า 35 ที่ให้ 500 เป็น 5% ส่วนหน้า 35–36 เขียน >5,000 คู่กับช่วง 1,000–4,999 จึงไม่ได้ระบุผลของ 5,000 ในข้อความ แต่วาง 5,000 ไว้ในช่วง 20% ของตาราง ถ้าใช้ตารางเดิมทั้งชุดให้ประกาศว่า 500 เป็น 0%" }),
          example("discount-bva", [37, 38], "Exercise 7: BVA ของส่วนลดสมาชิก",
            "ใช้ข้อกำหนดยอดซื้อชุดเดียวกับ Exercise 6 โดยหน้า 38 มี All Cases, Belonging Cases, Reduced Class และ Expected Result",
            "สร้างเคสรอบรอยต่อทุกจุดแล้วให้ผลคาดหวังตามช่วงที่ประกาศ",
            [
              "หาตัวเปลี่ยน class ที่ 0/1, 499/500, 999/1,000, 4,999/5,000 และ 100,000/100,001",
              "สร้าง All Cases โดยเลื่อนจากปลายช่วงแต่ละด้าน ±1 เช่น ปลาย 499 ใช้ 498, 499, 500 และต้น 500 ใช้ 499, 500, 501",
              "ถ้าต้องการ Belonging Cases ให้เก็บ 498, 499 ไว้ฝั่ง 0% และ 500, 501 ไว้ฝั่ง 5% ตาม class ที่ใช้จริง",
              "รวมค่าที่ซ้ำแล้วเลือกสองค่าติดกันคนละฝั่งเป็น Reduced Cases ตรวจว่าผลของทั้งคู่ต่างกันตามข้อกำหนด"
            ],
            "Reduced Cases ครอบคลุม 5 รอยต่อด้วย 10 ค่า ในบทนี้ 499 → 0%, 500 → 5%, 4,999 → 10% และ 5,000 → 20%",
            { table: { headers: ["Reduced Case ฝั่งซ้าย", "ผล", "Reduced Case ฝั่งขวา", "ผล"], rows: [
              ["0", "Invalid", "1", "0%"], ["499", "0%", "500", "5%"], ["999", "5%", "1,000", "10%"],
              ["4,999", "10%", "5,000", "20%"], ["100,000", "20%", "100,001", "Invalid"]
            ] }, note: "ตารางหน้า 38 ใช้ขอบ 500/501 ส่วนข้อความหน้า 37–38 ใช้ 499/500 บทนี้ใช้ 499/500 ให้ตรงกับกติกาของ Exercise 6 ที่ระบุไว้ด้านบน" })
        ]),
      section("path-exercise", "39–40", "โจทย์สไลด์ 8: อ่านโค้ด Zoo เป็น Control Flow",
        "อ่าน if/elif จากบนลงล่าง เมื่อเจอเงื่อนไขจริงก็ return และจบเลย การวาด Control Flow ให้ระบุทั้งทาง True และ False ของแต่ละ Decision และชี้ทางที่ตกถึงท้ายฟังก์ชันด้วย",
        [
          ["Independent Path", "เส้นทางในชุดฐานที่เพิ่มอย่างน้อยหนึ่ง edge ที่เส้นทางก่อนหน้ายังไม่ใช้ ตัวอย่างนี้นับเงื่อนไขแต่ละ if/elif เป็น Decision เดียว"],
          ["Cyclomatic Complexity", "ตามวิธีระดับเงื่อนไขรวมของสไลด์ เมื่อมี Decision ที่แตกสองทาง 4 จุดและรวมทางออกเดียว จำนวนเส้นทางฐานคือ 4 + 1 = 5"],
          ["Implicit Return", "Python คืน None เมื่อออกจากฟังก์ชันที่ไม่เข้าคำสั่ง return ใดเลย"]
        ], [
          example("zoo-path-analysis", [39, 40], "Exercise 8: Flowchart และชุด Independent Paths ของราคาตั๋วสวนสัตว์",
            "เมธอดรับ age และเช็กเงื่อนไข D1 ถึง D4 ตามลำดับในโค้ด นับตามกิ่ง if/elif และให้ทดสอบอายุจำนวนเต็มรวมค่าที่ไม่ valid",
            "วาด Flowchart หา Cyclomatic Complexity ระบุเส้นทางทั้งหมดและชุดฐานทุกชุด",
            [
              "วาด Start → D1 ถ้า True ให้ Return 50 → End ถ้า False ให้ไป D2 ใช้แบบเดียวกันจนถึง D4 ที่มีทาง False → คืน None โดยปริยาย → End",
              "D1 ตรวจ 0 < age ≤ 12, D2 ตรวจ 13 ≤ age ≤ 20, D3 ตรวจ 21 ≤ age ≤ 60 และ D4 ตรวจ age > 60 แต่ละจุดเป็น True/False จึงมี 4 + 1 = 5 Independent Paths",
              "เลือกอายุ 12, 13, 21, 61 และ 0 เพื่อวิ่งเส้นทางทุกชนิด แม้ D2 กับ D4 คืนค่า 100 เท่ากัน แต่เป็นคนละเส้นทาง",
              "แต่ละทางออกทั้งห้ามี edge เฉพาะตัวที่ต้องถูกเลือก จึงมีชุดฐานหนึ่งชุดคือ {P1, P2, P3, P4, P5} เมื่อไม่สนลำดับ"
            ],
            "กราฟระดับ if/elif มี 5 เส้นทาง และชุดฐานหนึ่งชุดที่รวมทั้ง 5 เส้นทาง",
            { codePrompt: zooPrice, codeLanguage: "python",
              table: { headers: ["เส้นทางจาก Start ถึง End", "อายุตัวอย่าง", "ผลคืน"], rows: [
                ["P1: D1(T)", "12", "50"], ["P2: D1(F) → D2(T)", "13", "100"],
                ["P3: D1(F) → D2(F) → D3(T)", "21", "150"],
                ["P4: D1(F) → D2(F) → D3(F) → D4(T)", "61", "100"],
                ["P5: D1(F) → D2(F) → D3(F) → D4(F)", "0", "None"]
              ] },
              note: "หน้า 40 ของ PDF ที่ตรวจแสดงชื่อเฉลยและภาพโค้ด แต่ไม่เห็น Flowchart หรือชุด Path ผลในบทนี้จึงไล่จากโค้ดหน้า 39–40 โดยถือ chained comparison เป็น Decision เดียวต่อบรรทัด ถ้าจำกัดโดเมนให้เป็นอายุจำนวนเต็มบวก ทางคืน None จะเข้าไม่ถึงจากโดเมนนั้น แต่ยังอยู่ในกราฟโค้ด และถ้าอนุญาตทศนิยมจะมีช่องว่างระหว่าง 12–13 กับ 20–21 เช่น 12.5 ก็คืน None" })
        ])
    ],
    exercises: [
      quiz("q1", [5, 15, 16, 17, 18], "เลือก Test ที่รอยต่อ Repository",
        "ฟังก์ชันคำนวณยอดถูกแล้ว ทีมเชื่อม OrderService กับฐานข้อมูลทดสอบเพื่อยืนยันว่า Order ID และยอดเงินถูกบันทึก–อ่านกลับได้ โจทย์นี้เข้าระดับใด?",
        ["Unit Testing ของฟังก์ชันคำนวณยอด", "Integration Testing ของ Service กับ DB", "System Testing ของร้านทั้งระบบ", "Usability Testing กับลูกค้า"], 1,
        ["เริ่มจากสิ่งที่อยากพิสูจน์คือ contract และข้อมูลที่เดินข้าม Service ไป DB", "มีส่วนประกอบจริงมากกว่าหนึ่งส่วนแต่ขอบเขตยังเป็นเพียงรอยต่อ จึงเป็น Integration", "Unit แยกหน่วยออกจาก dependency ส่วน System ต้องตรวจระบบที่ประกอบครบ และ Usability วัดการทำงานของผู้ใช้"], { practice: true }),
      quiz("q2", [11, 12, 13, 14], "Assertion ของชื่อที่ต่อจากสอง Field",
        'getDisplayName() คืน firstName + " " + lastName ถ้า firstName = "Mali", lastName = "Suk" แล้ว assertEquals("MaliSuk", getDisplayName()) ผลเป็นอย่างไร?',
        ["ผ่านเพราะ assertEquals ตัดช่องว่าง", "ผ่านเพราะชื่อทั้งสองเป็น String", "Fail เพราะ actual คือ Mali Suk", "Fail เพราะต้องใช้ assertSame เมื่อเทียบข้อความ"], 2,
        ["แทนค่าลงใน expression จะได้ Mali Suk ที่มีช่องว่างตรงกลาง", "assertEquals เปรียบเทียบค่าจริงกับ MaliSuk ซึ่งไม่มีช่องว่าง", "การมีชนิดเป็น String เหมือนกันไม่ทำให้ค่าเท่ากัน และ assertSame วัดตัวตนของ object จึงไม่ใช่ตัวแก้"], { practice: true }),
      quiz("q3", [22, 23, 24], "ใช้ Traceability เลือก Regression Cases",
        "RTM ระบุ FR_Card → TC_7, TC_8 และ FR_Reward → TC_10, TC_11 นักพัฒนาเพิ่ม validation วันหมดอายุเฉพาะบัตรเครดิต คู่ใดเป็นจุดเริ่มต้นของ Regression Test ที่มี mapping ตรง?",
        ["TC_7 และ TC_8", "TC_10 และ TC_11", "TC_7 และ TC_10 เพราะอยู่คนละกลุ่ม", "ไม่มีเคสเดิมที่ใช้ได้ เพราะเพิ่งเพิ่มเงื่อนไข"], 0,
        ["ตามจากพฤติกรรมบัตรเครดิตไปที่ FR_Card", "อ่าน Test Case ID ที่เชื่อมตรงคือ TC_7 และ TC_8 แล้วเพิ่มเคสวันหมดอายุสำหรับเงื่อนไขใหม่ตามจำเป็น", "กลุ่ม Reward ไม่ตรง mapping และการเพิ่ม validation ยังมีเหตุให้รันเคสเดิมเพื่อกัน regression"], { practice: true }),
      quiz("q4", [37, 38], "ค่าที่คร่อมรอยต่อส่วนลด",
        "โปรโมชันฝึกเพิ่มเติมให้ 1–249 บาทลด 0% และ 250–799 บาทลด 8% หากเลือก BVA แบบ reduced ฝั่งละหนึ่งค่าที่ชิดรอยต่อแรกของสองช่วงนี้ ควรใช้คู่ใด?",
        ["1 และ 799", "248 และ 251", "250 และ 251", "249 และ 250"], 3,
        ["ปลายช่วงที่ลด 0% คือ 249 และต้นช่วงลด 8% คือ 250", "ทั้งสองติดกันและอยู่คนละ class จึงทดสอบได้ว่าการเปลี่ยนผลเกิดตรงจุด", "250/251 อยู่ฝั่งเดียว ส่วน 248/251 และ 1/799 ไม่ใช่คู่ที่ชิดรอยต่อ"], { practice: true }),
      quiz("q5", [39, 40], "นับทางออกของ if/elif",
        "นับเงื่อนไขแต่ละบรรทัดเป็น Decision หนึ่งจุด ฟังก์ชันนี้มี Independent Paths กี่เส้น และ input 0 วิ่งทางไหน?",
        ["3 เส้น และคืน 10", "4 เส้น และคืน None", "8 เส้น และคืน None", "4 เส้น และคืน 30"], 1,
        ["สาม Decision แบบสองทางให้ Cyclomatic Complexity เท่ากับ 3 + 1 = 4", "0 ไม่ผ่านทุกเงื่อนไขจึงถึงท้ายฟังก์ชันและคืน None", "เลข 3 นับเฉพาะทางที่มี return ส่วน 8 มาจากคิดว่าทุก Decision ถูกประเมินทั้งสามตัวเสมอ ทั้งที่ return ตัดเส้นทาง และ 0 ไม่มากกว่า 20"],
        { practice: true, codeLanguage: "python", codePrompt: [
          "def fee(age):", "    if 1 <= age <= 10:", "        return 10", "    elif 11 <= age <= 20:",
          "        return 20", "    elif age > 20:", "        return 30"
        ].join("\n") })
    ],
    checklist: [
      "ยกสถานการณ์หนึ่งอย่างแล้วอธิบายว่าจะตรวจที่ Unit, Integration หรือ System พร้อมบอกว่าต้องเตรียม dependency อะไรได้",
      "ไล่ผล Student.getDisplayName และเลือก assertEquals, assertSame หรือ assertArrayEquals ตามพฤติกรรมที่ต้องการได้",
      "ตาม Requirement ไปหา Test Case ID ใน RTM และอ่าน Planned, Executed, Passed จาก Test Report ได้",
      "ระบุ Usability 5 ด้านและเลือกตัววัดให้ตรงกับ Efficiency, Errors และ Satisfaction ได้",
      "กำหนดช่วงที่ไม่ทับกัน เลือกค่าตัวแทน ECP และใช้สองค่าคร่อมขอบใน Reduced BVA ได้",
      "วาดทาง True/False ของโค้ด Zoo และชี้ได้ว่าเหตุใด input 0 จึงทำให้เกิด Path ที่ห้า"
    ]
  });
})();
