(() => {
  const { addChapter, section, example, quiz } = window.SoftwareEngineering;

  addChapter({
    number: 9,
    title: "Design Architecture and Methodology",
    thaiTitle: "เปลี่ยน Requirements ให้เป็นโครงและรายละเอียดของโปรแกรม",
    totalPages: 65,
    summary: "อ่าน Requirements แล้วแบ่งหน้าที่ระดับระบบก่อนออกแบบรายละเอียดในแต่ละส่วน จากนั้นแปลง DFD เป็น Structure Chart และฝึกประเมินโครงด้วย Cohesion, Coupling และหลักการออกแบบ",
    goals: [
      "สารบัญบทนี้มีระดับการออกแบบ → Architectural Styles → DFD และ Structure Chart → Modularity และหลักการออกแบบ",
      "จับคู่ Architectural Style กับลักษณะงานและอธิบายผลที่ต้องแลกได้",
      "แยก Transform Flow กับ Transaction Flow วาดลำดับ Controller และชี้ว่าจะลดการพึ่งพากันของ Module ตรงไหนได้"
    ],
    confusions: [
      "Architectural Design ตัดสินใจเรื่องขอบเขตและความสัมพันธ์ของส่วนหลัก ส่วน Detailed Design ตัดสินใจว่าจะสร้างแต่ละส่วนให้ทำงานได้อย่างไร",
      "DFD ติดตามข้อมูลระหว่าง Process ส่วน Structure Chart บอกว่า Module ใดสั่งหรือเรียก Module ใด",
      "Cohesion สูงคือหน้าที่ใน Module เดียวไปด้วยกัน ส่วน Coupling ต่ำคือ Module ต่าง ๆ พึ่งรายละเอียดกันน้อย",
      "Design with reuse คือหยิบของที่มีมาใช้ ส่วน Design for reuse คือทำชิ้นงานนี้ให้ผู้อื่นนำไปใช้ต่อได้"
    ],
    sections: [
      section("architecture-detail", "1–13", "Architecture กับ Detailed Design ตัดสินใจคนละระดับ",
        "หน้า 1 เป็นประกาศการใช้เอกสาร หน้า 2–3 เป็นบทนำและสารบัญ งานออกแบบเริ่มจาก Requirements แล้วตัดสินใจว่าส่วนใหญ่มีอะไร ทำหน้าที่อะไร เชื่อมกันอย่างไร จากนั้นค่อยระบุข้อมูล อัลกอริทึม คลาส และวิธีรับมือข้อผิดพลาดของแต่ละส่วน",
        [
          ["Architectural Design", "ออกแบบ Layers, Modules, Services, ช่องทาง API, การไหลและการจัดเก็บข้อมูล รวมข้อกำหนดระดับระบบ เช่น Security, Performance, Scalability และ Maintainability"],
          ["Detailed Design", "ลงถึง Module, Class, Object, Function, Algorithm และ Database Schema ระบุวิธีใช้ Interface/API การจัดการ Error และ Logging ในส่วนที่รับผิดชอบ"],
          ["Analysis Model → Design Model", "ภาพหน้า 8 ใช้ Scenario, Flow, Class และ Behavior เป็นข้อมูลสำหรับออกแบบ Data/Class, Architecture, Interface และ Component หลักฐานชุดเดียวอาจส่งผลหลายระดับ"]
        ],
        [
          example("bridge-types", [4], "สะพานหกแบบให้ผลปลายทางเดียวกัน",
            "ภาพเทียบ Beam, Arch, Truss, Cantilever, Suspension และ Cable-stayed Bridge",
            "อธิบายว่าทำไม Requirement ว่าต้องให้คนข้ามยังไม่บอกโครงสร้าง",
            ["ทุกแบบช่วยให้ข้ามได้ แต่รูปประกอบแสดงการรองรับต่างกัน เช่น คานตรง โค้งถ่ายแรง โครงสามเหลี่ยม หรือสายเคเบิล", "ก่อนเลือกแบบต้องรู้เงื่อนไข เช่น ระยะช่วงสะพาน จุดตั้งเสา และงบ", "เทียบกับซอฟต์แวร์ เป้าหมายเดียวอาจมีหลาย Architecture ต้องชั่งผลตามข้อจำกัด"],
            "Requirement ระบุสิ่งที่ต้องได้ ส่วนการเลือกโครงเป็นงานออกแบบ ภาพไม่มีตัวเลขพอให้ฟันธงว่าสะพานใดดีที่สุด"),
          example("hello-world-three-designs", [5], "Hello World สามโครงสร้าง",
            "สไลด์แสดง main พิมพ์ตรง, main เรียก MessagePrinter.getMessage() และ main เรียก MessagePrinter.printMessage() ที่มี HelloProvider กับ WorldProvider",
            "ไล่ว่าแต่ละแบบรับอะไร เรียกใครบ้าง และ Terminal แสดงอะไร",
            ["ทุกแบบมี args จาก Java แต่ตัวอย่างไม่ได้อ่านค่า จึงไม่ต้องป้อนข้อมูล", "แบบ 1 ใช้ println ใน main แบบ 2 สร้าง MessagePrinter รับ String จาก getMessage() แล้ว main เป็นคนพิมพ์", "แบบ 3 ให้ Provider ส่ง Hello กับ World แล้ว MessagePrinter ต่อช่องว่างและเครื่องหมาย ! ก่อนพิมพ์"],
            "ทั้งสามพิมพ์ Hello World! หนึ่งบรรทัด โดยความรับผิดชอบและจำนวนจุดที่ต้องอ่านต่างกัน งานเล็กแบบนี้ทำให้เห็นว่าการเพิ่มคลาสต้องมีเหตุผล",
            { codeLanguage: "java", code: '// ลำดับการเรียก เขียนย่อจากทั้งสามตัวอย่าง\nSystem.out.println("Hello World!");               // แบบ 1\nSystem.out.println(new MessagePrinter().getMessage()); // แบบ 2\nnew MessagePrinter().printMessage();             // แบบ 3', note: "สามบรรทัดเป็นคนละทางเลือกสรุปการเรียกจากหน้า 5 พิจารณาแยกกัน และแต่ละแบบมีนิยาม MessagePrinter ของตัวเอง" }),
          example("requirements-to-house-design", [7, 8, 9], "จากความต้องการสร้างบ้านถึงแบบที่ช่างใช้ได้",
            "สไลด์ให้ความต้องการบ้าน 4 ห้องนอน 3 ห้องน้ำและพื้นที่กระจกมาก พร้อมภาพโยง Requirements, Architecture และ Detailed Design",
            "หาเหตุผลว่าทำไมต้องมีขั้นกำหนดโครงก่อนสร้าง",
            ["Requirement บอกความต้องการ แต่ยังต้องกำหนดการจัดพื้นที่และทางเดินของบ้าน", "กำหนดโครงหลัก แล้วใช้ทั้งโครงกับ Requirement ตัดสินใจรายละเอียด เช่น ขนาด ประตูและวัสดุ", "ในซอฟต์แวร์ Use Case/Scenario ให้หลักฐานเรื่องการใช้งาน, Flow ให้เส้นข้อมูล, Class ให้ข้อมูลกับความสัมพันธ์ และ Behavior ให้สถานะกับเหตุการณ์"],
            "แบบที่เลือกยังตรวจกลับไปยังความต้องการได้ และมีรายละเอียดพอให้แต่ละส่วนลงมือสร้าง",
            { diagram: ["Requirements และ Analysis Model", "Architecture แบ่งส่วนหลัก", "Detailed Design ของแต่ละส่วน", "Implementation"] }),
          example("design-level-exercise", [12, 13], "เฉลยโจทย์ Architectural หรือ Detailed ทั้ง 7 ข้อ",
            "โจทย์ให้เรื่องอัลกอริทึม การแยก UI เวลาประมวลผล โครงสร้างข้อมูล Thread Safety และการทำงานระหว่าง Car, Clock และ ClockUser",
            "จำแนกจากขอบเขตของการตัดสินใจ พร้อมอธิบายข้อที่ทับกัน",
            ["ข้อ 1 เลือก Binary Search ให้ find() เป็นขั้นตอนใน Operation ส่วนข้อ 2 แยก UI ออกจากส่วนอื่นเป็นขอบเขตของระบบ", "ข้อ 3 เวลาประมวลผล Client ≤ 1 วินาที และ Server ≤ 0.5 วินาที กำกับสองส่วนหลัก ข้อ 4 เลือก Hash Table ภายใน Register", "ข้อ 5 Thread Safety ของทุก Utility เป็นเงื่อนไขทั้ง Library ข้อ 6 ระบุวิธีให้ Car ลงทะเบียนกับ Clock แล้วถูกแจ้งทุกวินาที ข้อ 7 บังคับสัญญาของ Observer"],
            "ในโจทย์นี้จัด Architectural เป็น 2, 3, 5 และ Detailed เป็น 1, 4, 6, 7 เมื่อใช้ขอบเขตของเงื่อนไขเป็นเกณฑ์",
            { table: { headers: ["ข้อ", "จัดระดับ", "สิ่งที่โจทย์ตัดสินใจ"], rows: [["1", "Detailed", "อัลกอริทึมของ find() และต้องรักษาเงื่อนไขข้อมูลเรียงสำหรับ Binary Search"], ["2", "Architectural", "แบ่ง UI ออกจากส่วนระบบอื่น"], ["3", "Architectural", "กระจาย Performance Budget ไป Client และ Server"], ["4", "Detailed", "เลือก Data Structure ภายใน Register"], ["5", "Architectural", "กำหนดคุณสมบัติข้าม Utility ทั้ง Library"], ["6", "Detailed", "กำหนด Protocol ระหว่าง Object และช่วงเวลาแจ้ง"], ["7", "Detailed", "กำหนด Interface ของ Observer"]] }, note: "หน้า 12–13 ไม่ได้ให้เฉลย ข้อ 3 และ 5 เป็นข้อกำหนดที่มีผลกับ Architecture ส่วนวิธีรับประกัน Thread Safety ราย Method เป็น Detailed ด้วย ข้อ 6 จะเป็น Architectural ได้ถ้า Car และ Clock หมายถึงระบบย่อยหลัก แต่ที่นี่สมมติเป็น Object ตามถ้อยคำ ข้อ 7 ใช้คำว่า implement the ClockUser class ถ้าเขียน Java ตีความเป็น implements เมื่อ ClockUser เป็น interface หรือ extends เมื่อเป็น class" })
        ]),
      section("architectural-styles", "14–23", "เลือก Architectural Style จากสิ่งที่ต้องแยก",
        "เริ่มจากมองว่าความสัมพันธ์เด่นของระบบคือส่งข้อมูลต่อกัน แบ่งความรับผิดชอบเป็นชั้น เรียกบริการ หรือแชร์ข้อมูลกลาง ระบบเดียวอธิบายด้วยหลายแบบพร้อมกันได้ถ้ามองคนละระดับ",
        [
          ["Batch Sequential / Pipe and Filter", "Filter แปลงข้อมูล Pipe ขนข้อมูลระหว่างขั้น แบบ Batch ประมวลเป็นชุด ส่วน Pipe and Filter อาจแตกและรวมเส้นทางได้ ถ้ารูปแบบข้อมูลไม่ตรงกันอาจต้องมีตัวแปลง และการรอครบหลายขั้นอาจไม่เหมาะกับงาน Interactive"],
          ["Data-centered Architecture", "หลายส่วนใช้ Repository กลาง จัดการและสำรองข้อมูลร่วมกันง่าย แต่การเปลี่ยน Data Model อาจกระทบส่วนอื่นที่ใช้ Schema เดียวกัน"],
          ["Layered Architecture", "ภาพจัด UI → Application → Utility → Core แต่ละชั้นพึ่งชั้นด้านล่างตามที่กำหนด แยกหน้าที่และเปลี่ยนได้เมื่อ Interface คงเดิม ระวังการส่งผ่านชั้นมากจนช้า"],
          ["Client-Server Architecture", "Client ขอใช้บริการ Server ตอบ เช่น Browser กับ Desktop App เรียก Application Server ที่อ่านฐานข้อมูล ขยายหรืออัปเกรดเครื่องได้ แต่ต้องจัดการโหลดและการควบคุมเครื่อง"],
          ["Microservice Architecture", "แยกแอปเป็นบริการขนาดเล็กที่รันเป็น Process ของตัวเอง สื่อสารผ่าน API แบบเบาและ Deploy แยกได้ ทีมต้องดูแลการสื่อสารและความล้มเหลวข้าม Service"],
          ["Call and Return Architecture", "Main เรียก Controller หรือโปรแกรมย่อย แล้วโปรแกรมย่อยอาจเรียกต่อ ตามภาพหน้า 21–23 Interface ที่ชัดช่วยให้เปลี่ยนโมดูลได้ การเผยข้อมูลภายในเพิ่มแรงกระทบจากการแก้ส่วนเดียว"]
        ],
        [
          example("read-style-diagrams", [15, 16, 17, 18, 19, 20, 21, 22, 23], "มองลูกศรและขอบเขตในรูปให้รู้ Style",
            "ภาพแสดงท่อระหว่าง Filter, Shared Data กลาง, ชั้นเรียงลง, ลูกค้ากับ Server, การ Deploy ทั้งแอปเทียบหลาย Service และลำดับโปรแกรมหลักเรียกโมดูล",
            "เลือกหลักฐานในรูปที่ใช้จำแนกแต่ละแบบ",
            ["ถ้าลูกศรแทนข้อมูลผ่านตัวแปลง ให้ดู Pipe and Filter ถ้าทุกส่วนหันเข้าคลังกลาง ให้ดู Data-centered", "ถ้าเห็นการเรียงระดับตามหน้าที่ ให้ดู Layered ถ้าเห็นผู้ขอกับผู้ให้บริการ ให้ดู Client-Server", "ถ้าหน่วยธุรกิจ Deploy แยกกันได้ ให้ดู Microservices ถ้าแสดงว่าฟังก์ชันแม่เรียกฟังก์ชันลูก ให้ดู Call and Return"],
            "จุดเด่นของรูปช่วยเลือกคำอธิบายที่ตรงกับคำถาม เช่น Browser ขอ API เป็น Client–Server ขณะที่ API ภายในยังจัดเป็น Layers ได้"),
          example("final-styles-extra", [14, 18, 19], "Three-Tier กับ MVC ที่ปรากฏในแนวสอบ",
            "Final Guideline หน้า 8 เพิ่มชื่อ Three-Tier และ Model View Controller ให้พิจารณาเทียบกับ Layered และ Client–Server",
            "บอกว่าทั้งสองแบบแบ่งระบบด้วยเกณฑ์ใด",
            ["Three-Tier จัดหน่วยรันเป็น Presentation, Application/Business Logic และ Data เช่น Browser → Backend → Database", "MVC แบ่งบทบาท Model จัดสถานะและกฎของข้อมูล View แสดงผล Controller รับการกระทำและประสานการทำงาน", "ระบบ Three-Tier อาจจัดโค้ดบาง Tier ด้วย MVC ได้ ให้ดู Deployment Boundary แยกจากบทบาทในโปรแกรม"],
            "Three-Tier ช่วยอธิบายหน่วยของระบบ ส่วน MVC ช่วยอ่านว่าข้อมูล การแสดงผล และการรับคำสั่งอยู่ตรงไหน",
            { practice: true, note: "หน้า 14, 18 และ 19 ของ Lecture 9 ใช้เทียบพื้นฐาน แหล่งที่ระบุชื่อสองรูปแบบนี้คือ 2026 - ITDS261 - Final guideline.pdf หน้า PDF 8 คำอธิบายและตัวอย่าง Browser เป็นเนื้อหาฝึกเพิ่มเติม", references: [["2026 - ITDS261 - Final guideline.pdf · หน้า PDF 8", "/itds261-reference/lecture-15.pdf#page=8"]] })
        ]),
      section("structured-design", "24–36", "แปลง DFD เป็น Structure Chart",
        "Structured Design ใช้ DFD หรือแผนภาพการไหลของข้อมูลช่วยหาโมดูล ใช้ PSPEC หรือคำอธิบายกฎของ Process และ STD หรือแผนภาพการเปลี่ยนสถานะเติมพฤติกรรม จากนั้นแสดงสายเรียก Module ด้วย Structure Chart",
        [
          ["Transform Flow", "ข้อมูลไหลเข้า ผ่านศูนย์แปลง แล้วผลิตผลออก หนึ่งงานอาจมีหลายช่วงรับและส่ง ให้หาเส้นแบ่ง Incoming, Transform และ Outgoing"],
          ["Transaction Flow", "ข้อมูลเข้าถึงจุดตัดสินใจ Transaction Center ที่เลือก Action Path ตามชนิดของงาน เช่น อ่านสถานะ ส่งคำสั่ง หรือทำรายงาน"],
          ["Factoring", "First-Level ตั้ง Main Controller และกลุ่มควบคุมงานหลัก Second-Level ไล่จากขอบเขตไปหา Worker ที่ทำ I/O แปลงข้อมูลหรือคำนวณ ขอบเขตแต่ละกลุ่มควรเรียกผ่านสัญญาชัดเจน"]
        ],
        [
          example("transform-mapping", [25, 26, 27, 28, 29, 30, 31], "ตามโหนด a–j จาก Data Flow ไปสายเรียก",
            "รูปหน้า 28 มี a–c ฝั่งรับ, d–f ช่วงแปลง และ g–j ฝั่งส่งออก ส่วนหน้า 31 แยกเส้นรอบขอบเขตสำหรับทำ Second-Level Mapping",
            "ตั้ง Controller แล้วอธิบายว่าทำไมสายเรียกไม่จำเป็นต้องเรียงเหมือนลูกศรข้อมูล",
            ["ขีดเส้นตามขอบเขตของรูป แล้วตั้ง x1 เป็น Main Controller, x2 ฝั่งรับ, x3 ฝั่งแปลง และ x4 ฝั่งส่ง", "x2 ประสาน b และ c ที่ต้องใช้ a ส่วน x3 รับผิดชอบ d, e, f และ x4 ประสาน g กับ i ที่ส่งต่อไป h กับ j", "ในภาพหน้า 29 งานตัดสินใจอยู่ชั้นบนและ Worker อยู่ล่าง หน้า 30 แสดง Main กับ Input, Processing, Output Controller หน้า 31 จึงไล่ Module Worker จากจุดขอบเขตออกไป"],
            "ได้ลำดับควบคุมของงานรับ แปลง และส่ง ซึ่งใช้จัดโค้ดตามหน้าที่ได้ รูปลูกศรข้อมูลกับเส้นเรียกจึงอ่านคนละแบบ",
            { diagram: ["DFD ระบุจุดรับ แปลง และส่ง", "First-Level Factoring ตั้ง Controller ตามงานหลัก", "Second-Level Mapping ไล่ Worker จากขอบเขต", "ตรวจ Interface และปรับโมดูล"] }),
          example("operator-dfd", [32, 33, 34, 35, 36], "Robot Control แยก Action Path จากคำสั่งเดียว",
            "Level 1 เริ่มที่ Operator ส่ง Command ไปอ่านและแยกประเภท มี Fixture Servos, Display Screen, Robot Control System และ Assembly Record ในภาพ Level 2 แตกวิธีทำงานย่อย",
            "หา Transaction Center กับผลลัพธ์ของเส้นทางที่ระบุ แล้วจัดสายเรียกตามรูป",
            ["อ่านและ Validate Command ก่อน ถ้าผิดให้ Produce Error Message ถ้าถูกจึงเข้า Determine Type", "หน้า 34 ล้อมเส้นทางสถานะ Fixture ที่ผ่าน Read Fixture Status → Determine Setting → Format Setting, เส้นทางรายงานที่อ่าน Assembly Record → Calculate Output Values → Format Report และเส้นส่ง Control Value ไป Robot", "หน้า 35 ให้ Process Operator Commands เรียก Command Input Controller และ Determine Type หน้า 36 แตก Fixture Status Controller กับ Report Generation Controller ลงถึง Worker"],
            "คำสั่งที่ถูกเลือกผลลัพธ์ตามประเภท ได้แก่ Fixture Setting, Report หรือ Robot Control ส่วนคำสั่งผิดออก Error Message",
            { table: { headers: ["เส้นทาง", "อินพุตหลัก", "ผล"], rows: [["ตรวจคำสั่ง", "Operator Command", "Valid Command หรือ Error Message"], ["สถานะ Fixture", "Fixture/Status", "Fixture Setting ที่จัดรูปแบบแล้ว"], ["รายงาน", "Selected Report และ Assembly Record", "Report"], ["ควบคุม Robot", "Robot Control / Start-Stop", "Control Value ไป Robot"]] }, note: "Level 2 ตัดชื่อ Process หลายคำข้ามบรรทัด เช่น Read command และ Determine type ชื่อในตารางอ่านรวมเป็นคำเดียว ภาพเส้นประเป็นการส่ง Control ไม่ใช้อนุมานลำดับเวลาที่ไม่ได้ระบุ" })
        ]),
      section("physical-modules", "37–40", "จากงานทางธุรกิจไปโมดูลจริง",
        "หน้าที่ทางธุรกิจอธิบายว่าเกิดงานอะไร ส่วน Physical Module เลือกว่าโค้ดหรือบริการส่วนไหนทำงานนั้น Function Decomposition จึงเป็นข้อมูลตั้งต้นให้ Structure Chart บาง Module อาจใช้ร่วมกันในหลายงาน",
        [
          ["Logical Module", "อธิบายหน้าที่ เช่น Login หรือ Create Parcel ตามงานของผู้ใช้"],
          ["Physical Module", "กำหนดหน่วยลงมือทำ เช่น ตรวจรหัสกับบริการ Authentication หรือเก็บเลขพัสดุลงระบบ"],
          ["SRS → Design Document", "เริ่มจาก Software Requirements Specification วิเคราะห์ข้อกำหนด สร้างและประเมิน Architecture หลายตัว เลือกแล้วลง Detailed Design ประเมินและวนแก้ก่อนบันทึกเป็น Design Document ตามภาพหน้า 40"]
        ],
        [
          example("login-logical-physical", [37], "Login หนึ่งงานอาจต้องใช้หลายขั้นยืนยัน",
            "ภาพวาง Login ฝั่ง Logical และกล่อง Two Factor Authentication ที่มีการติดต่อ Authentication Server แรกและที่สองฝั่ง Physical",
            "ชี้ว่าส่วนใดอธิบายงาน และส่วนใดบอกวิธีสร้าง",
            ["เริ่มจาก Logical ว่าผู้ใช้ต้องยืนยันตัวตน", "Physical เลือกกลไกและลำดับงานของบริการตรวจแต่ละขั้น", "จะเป็น Two-Factor จริงต้องอาศัยปัจจัยคนละประเภท เช่น สิ่งที่รู้กับสิ่งที่มี"],
            "ใช้ภาพนี้แยกระดับ Logical กับ Physical ได้ แต่จำนวน Server อย่างเดียวไม่บอกชนิดของปัจจัย",
            { note: "หน้า 37 เขียน Password ทั้งสองกล่องโดยไม่ได้บอกว่าใช้ปัจจัยคนละชนิด ยึดภาพเพื่ออธิบายการแบ่งโมดูล และสมมติปัจจัยอิสระเฉพาะเมื่ออภิปราย 2FA" }),
          example("postal-system-chart", [38, 39], "อ่าน Postal System และไล่ Create_Parcel",
            "หน้า 38 แตกงาน Postal System เป็น Create Parcel, Update Parcel Info, View History and Status, Feedback, Bank@Post และ Pay Online หน้า 39 จัดโมดูลที่ใช้ร่วมและให้ Pseudocode ของ Create_Parcel",
            "ไล่ Input, การเรียก Module และข้อมูลที่ใช้บันทึก",
            ["รหัสในหน้า 39 แสดงว่า Create_Parcel ไม่รับพารามิเตอร์ตรง ๆ แต่ Fill_Parcel_Detail ขอให้ Login เมื่อยังไม่เข้า แล้วคืนรายละเอียดที่ผู้ใช้ป้อน", "Create_Tracking_Number คืนเลขติดตาม แล้ว Calculate_Weight คำนวณจากรายละเอียดดังกล่าว", "Update_Parcel_History รับรายละเอียด เลขและน้ำหนัก แล้วเก็บประวัติ โค้ดไม่ได้ระบุค่าคืนของ Create_Parcel หรือสูตรคำนวณน้ำหนัก", "ดูเส้นใน Structure Chart ว่า Login หรือ Deduct Balance มีผู้เรียกหลายทาง เช่น Bank@Post กับ Pay Online ใช้การหักยอดร่วม"],
            "ผลในตัวอย่างคือบันทึกประวัติพัสดุพร้อมรายละเอียด เลขติดตาม และน้ำหนัก โครงแสดงการแชร์ Module ได้ชัดกว่าต้นไม้แจกแจงงาน",
            { codeLanguage: "text", code: "createParcel()\n  details = fillParcelDetails()\n  trackingNumber = createTrackingNumber()\n  weight = calculateWeight(details)\n  updateParcelHistory(details, trackingNumber, weight)", note: "หน้า 39 ใช้ parcelDetail ตอนรับข้อมูลแต่ส่ง Parcel_Detail ไปคำนวณน้ำหนัก สมมติทั้งสองหมายถึงตัวเดียวกันและเขียนเป็น details ลำดับที่ไล่อิงโค้ดหน้า 39 ที่สร้างเลขก่อนคำนวณน้ำหนัก แผนภาพ Analysis หน้า 38 และ Final Guideline หน้า 11 ใช้เลขกำกับไม่เหมือนกันบางจุด ให้เทียบจากชื่อและหน้าที่" })
        ]),
      section("design-principles", "41–48", "เกณฑ์เลือกแบบและหลักจัดโมดูล",
        "ใช้ Basic Principles ดูว่าแบบตอบผู้เกี่ยวข้องภายใต้ข้อจำกัดได้แค่ไหน แล้วใช้ Constructive Principles ดูว่าส่วนประกอบอ่านง่าย สร้างได้และดูแลต่อสะดวกหรือไม่",
        [
          ["Basic Principles", "Feasibility ทำได้จริง, Adequacy ตอบความต้องการได้เพียงพอ, Changeability เปลี่ยนได้ง่าย และ Economy ประหยัดเวลา เงิน หรือความเสี่ยง"],
          ["Constructive Principles", "Modularity จัดส่วนชัด, Implementability ขึ้นระบบได้ง่าย และ Aesthetic ทำให้โครงอ่านแล้วจับหน้าที่กับรูปแบบได้"],
          ["Modularity", "แบ่งโปรแกรมเป็นหน่วยที่เข้าใจและแยกดูได้ ภาพแสดงระดับ Subsystem, Package, Class/Function จนถึง Block และจัดขนาดเป็น Modules, Objects, Components, Services เพื่อช่วยทำเอกสาร ทดสอบ Debug และปรับประสิทธิภาพ"],
          ["Small Modules, Information Hiding, Least Privilege", "แบ่งให้ขนาดพอเข้าใจ ซ่อนขั้นตอนและโครงข้อมูลภายในหลัง Interface และให้สิทธิ์เฉพาะทรัพยากรที่ต้องใช้"]
        ],
        [
          example("principles-in-practice", [41, 42, 43, 44, 45, 46, 47, 48], "ประเมินแบบสำหรับโมดูลงานรับพัสดุ",
            "สมมติระบบรับพัสดุมีงบจำกัด ต้องแก้ราคาบ่อย และหน้ารับพัสดุต้องอ่านราคาแต่ไม่ต้องเปลี่ยนราคา",
            "เลือก Basic Principles และวางขอบเขตโมดูลให้แก้ได้ตรงจุด",
            ["เทียบงบและเวลาตาม Economy และเช็กข้อกำหนดก่อนเลือกแบบตาม Adequacy", "แยกการคำนวณราคาเพื่อให้แก้กฎในจุดเดียวตาม Changeability ใช้ Interface ที่ซ่อนสูตรภายในตาม Information Hiding", "ให้หน้ารับพัสดุมีสิทธิ์อ่านผลราคา ส่วนการแก้ตารางราคาอยู่กับส่วนจัดการตาม Least Privilege"],
            "การแก้ราคาไม่จำเป็นต้องแก้โค้ดหน้ารับพัสดุหาก Interface คงเดิม และหน้าอ่านราคาเปลี่ยนราคาด้วยตัวเองไม่ได้",
            { practice: true })
        ]),
      section("cohesion-coupling", "49–55", "High Cohesion และ Low Coupling ดูจากอะไร",
        "Cohesion วัดว่าภายในส่วนเดียวกันทำงานมุ่งเป้าเดียวแค่ไหน Coupling วัดว่าคนละส่วนพึ่งข้อมูล โครงสร้าง หรือพฤติกรรมของกันและกันมากเพียงใด เวลาทำโจทย์ให้ขีดเส้นแบ่ง Module ก่อนแล้วถามว่าจะเกิดอะไรเมื่อแก้เพียงส่วนเดียว",
        [
          ["Cohesion สูง", "Functional อยู่ด้านสูงเพราะองค์ประกอบร่วมทำงานเดียวให้เสร็จ ส่วน Coincidental อยู่ด้านต่ำ เพราะจับสิ่งไม่เกี่ยวกันมาอยู่ด้วยกัน"],
          ["Coupling ต่ำ", "Content Coupling แตะจุดภายในโดยตรงจึงแน่น Data Coupling แลกเฉพาะข้อมูลที่จำเป็นผ่านขอบเขตชัดจึงหลวมกว่า ภาพหน้า 53 วาง No Coupling เป็นขอบอุดมคติสำหรับส่วนที่ไม่ต้องสื่อสารกัน"],
          ["Data Coupling", "ส่งค่าเรียบง่ายหรือส่งโครงข้อมูลที่ใช้ทุกส่วน จึงเขียน Contract และเปลี่ยน Implementation ได้ง่ายกว่าเมื่อคง Contract เดิม"]
        ],
        [
          example("staff-module", [49, 50, 51], "ทำไม Staff ในรูปมี Cohesion ต่างกัน",
            "ภาพแรก Staff รวม checkEmail, sendEmail, emailValidate และ printLetter ภาพที่สอง Staff เก็บ salary และ email พร้อม Getter/Setter",
            "หาแกนหน้าที่ของแต่ละ Module แล้วเปรียบเทียบ",
            ["ด้านซ้ายมีทั้งงานส่งและตรวจอีเมลกับงานพิมพ์จดหมาย หลายหน้าที่ปนกันเมื่อมองว่า Staff มีหน้าที่ดูแลข้อมูลพนักงาน", "ด้านขวา Method แต่ละตัวเกี่ยวกับการอ่านหรือแก้สถานะของ Staff", "ภาพหน้า 49 ใช้สีแสดงกลุ่มหน้าที่ ให้ดูเส้นในกลุ่มเทียบเส้นเชื่อมระหว่างกลุ่ม แล้วใช้ปลายสเกลหน้า 51 ประกอบ"],
            "ด้านขวา Cohesion สูงกว่าในกรอบหน้าที่ตามสไลด์ การรวม Function ต้องพิจารณาว่าร่วมทำงานอะไรจริง"),
          example("address-data-coupling", [52, 53, 54, 55], "ส่ง Customer ID เพื่อขอ Customer Address",
            "Retrieve Customer Info ส่ง Customer ID ให้ Retrieve Customer Address และได้ Customer Address กลับตามรูป",
            "บอกว่าโมดูลบนพึ่งอะไรและเพราะอะไรแก้โครงสร้างภายในได้ง่าย",
            ["ตัวเรียกต้องรู้รูปแบบ ID และ Address ตามสัญญา จึงยังมีการพึ่งพากัน", "ตัวที่เรียกไม่ต้องถือข้อมูลลูกค้าทั้งก้อนหรือเปิดตัวแปรภายในด้านล่าง", "ถ้าเปลี่ยนจากอ่านไฟล์เป็นฐานข้อมูลแต่สัญญาเดิม ผู้เรียกยังใช้ Input/Output เดิมได้"],
            "เป็น Data Coupling แบบหลวมตามภาพ นับจำนวนเส้นอย่างเดียวไม่พอ ต้องดูสิ่งที่แลกและความรู้ต่อรายละเอียดของอีกส่วนด้วย")
        ]),
      section("module-exercises", "56–60", "เฉลยโจทย์ตัดสินการออกแบบโมดูล",
        "โจทย์ช่วงนี้ให้หาเหตุผลจากข้อมูลที่แต่ละ Module ใช้และหน้าที่ที่ถืออยู่ ถ้ากล่าวถึงงานภายในให้ดู Cohesion ถ้ากล่าวถึงสิ่งที่ใช้ข้ามขอบเขตให้ดู Coupling",
        [
          ["ถามเรื่องหน้าที่", "ดูว่าชื่อ Module และงานภายในบอกจุดหมายเดียวกันหรือมีงานที่เปลี่ยนคนละเหตุผล"],
          ["ถามเรื่องการเชื่อมต่อ", "ดูว่าอีกฝ่ายต้องรู้ข้อมูลจำเป็นหรือพึ่งตัวแปรก้อนใหญ่ รูปแบบที่ไม่ใช้ และรายละเอียดภายในด้วย"]
        ],
        [
          example("six-module-statements", [56], "โจทย์จำแนก 6 สถานการณ์",
            "โจทย์บอกงานอ่านไฟล์/แสดงผล/คำนวณ การอ้างตัวแปรข้ามส่วน หน้าที่เฉพาะ Interface ผลกระทบเวลาปรับโค้ด และโค้ดทำงานเดียว",
            "จัดแต่ละข้อเป็น Cohesion สูง/ต่ำ หรือ Coupling สูง/ต่ำ",
            ["ข้อ 1, 3 และ 6 บอกหน้าที่ที่อยู่ใน Module ให้ประเมิน Cohesion", "ข้อ 2, 4 และ 5 บอกการเชื่อมกับอีก Module ให้ประเมิน Coupling", "กรณี 4 มอง Interface ว่าชัดและจำกัดข้อมูลที่แลกตามสมมติฐาน ถ้า Interface เปิดรายละเอียดมาก Coupling ยังสูงได้"],
            "เรียงข้อ 1–6 ได้ Low Cohesion, High Coupling, High Cohesion, Low Coupling, High Coupling และ High Cohesion",
            { table: { headers: ["ข้อ", "ตอบ", "เหตุผล"], rows: [["1", "Low Cohesion", "จับ I/O, แสดงผล และคำนวณหลายหน้าที่ไว้รวมกัน"], ["2", "High Coupling", "อ้างตัวแปรภายในของอีกโมดูลโดยตรง"], ["3", "High Cohesion", "งานภายในมุ่งหน้าที่เฉพาะ"], ["4", "Low Coupling", "ใช้ Interface ที่ชัดและจำกัดสิ่งที่ต้องรู้"], ["5", "High Coupling", "เปลี่ยนโมดูลแล้วเกิดผลกระทบต่อโมดูลอื่นบ่อย"], ["6", "High Cohesion", "โค้ดในโมดูลมุ่งทำงานเดียว"]] } }),
          example("customer-billing-design", [57], "พิมพ์บิลจากข้อมูลที่จำเป็นหรือจาก Customer ทั้งก้อน",
            "Design A ส่งชื่อ ที่อยู่ และข้อมูลบิลให้ตัวพิมพ์ Design B ส่งโครง Customer ที่ตัวพิมพ์ต้องแยกฟิลด์เอง",
            "หาแบบที่ลดการพึ่งพาโครงข้อมูล",
            ["จดข้อมูลที่ฟังก์ชันใช้จริงคือชื่อ ที่อยู่ และข้อมูลบิล", "A ส่งเฉพาะข้อมูลเหล่านั้น ส่วน B ทำให้ตัวพิมพ์ต้องรู้รูปโครงของ Customer", "ถ้า Customer มีฟิลด์อื่นที่ไม่ได้ใช้ B เกิดการพึ่งโครงที่เกินงาน หากโครงมีเฉพาะสามฟิลด์และตั้งใจทำเป็นข้อมูลบิลโดยเฉพาะก็เป็นอีกทางเลือกที่หลวมได้"],
            "เลือก A ดีกว่าด้าน Coupling ภายใต้สมมติฐานว่า Customer ใน B เป็นข้อมูลลูกค้าทั่วไปและมีส่วนเกิน",
            { note: "หน้า 57 ไม่แสดง Schema ของ Customer จึงระบุสมมติฐานเรื่องฟิลด์ส่วนเกินก่อนตัดสิน" }),
          example("global-variable-coupling", [58], "ส่งพารามิเตอร์เทียบกับใช้ตัวแปร Global ร่วม",
            "ภาพซ้าย Retrieve Customer Info แลก Customer ID และ Customer Address ผ่านการเรียก ส่วนภาพขวา Module A และ B ใช้ Global Data Variable เดียวกัน",
            "เลือกแบบที่เปลี่ยนได้อิสระกว่าและให้เหตุผล",
            ["ซ้ายเห็น Input และ Output ที่ Contract ชัด จึงตรวจได้ว่าต้องรู้อะไร", "ขวาทั้งสองโมดูลต้องเข้าใจข้อมูล Global และการแก้ของฝ่ายหนึ่งอาจเปลี่ยนผลอีกฝ่าย", "กรณีซ้ายคือ Data Coupling กรณีขวาคือ Common Coupling ผ่านข้อมูลร่วม"],
            "เลือกภาพซ้ายเพื่อให้การพึ่งพากันน้อยลงและทดสอบแยกได้ชัดกว่า"),
          example("file-reader-cohesion", [59], "FileReader เทียบกับ DataProcessor หลายหน้าที่",
            "Design A เปิด อ่าน และปิดไฟล์ Design B อ่านไฟล์ คำนวณ และส่งอีเมล",
            "เปรียบเทียบว่ากิจกรรมภายในแบบใดไปด้วยกันมากกว่า",
            ["A มีขั้นตอนที่ร่วมทำงานเกี่ยวกับการอ่านไฟล์", "B รวมการจัดการไฟล์ กฎคำนวณ และการแจ้งผลที่มีเหตุให้เปลี่ยนต่างกัน", "ถ้าต้องปรับระบบส่งเมล โครงที่แยกหน้าที่ช่วยให้ตรวจเฉพาะส่วนส่งเมลได้"],
            "A มี Cohesion สูงกว่าในโจทย์"),
          example("employee-module-cohesion", [60], "Utility เทียบกับ EmployeeDatabase",
            "Design A รวมไฟล์ คำนวณ UI และจัดการข้อมูลหลายเรื่อง Design B รวมเพิ่มพนักงาน แก้ข้อมูล ออกรายงาน และคำนวณ Payroll ไว้ในบริบท HR",
            "เลือกแบบที่มีแกนหน้าที่ชัดกว่า",
            ["A ใช้ชื่อกว้างและมีงานต่างเป้าหมายปนกัน", "B อย่างน้อยมีแกนเป็นข้อมูลและงานพนักงาน แม้บางงานซับซ้อนพอให้แยกเป็นโมดูล", "จึงเลือกจากความสัมพันธ์ภายในก่อน ถ้าออกแบบระบบจริงให้ดูว่า Payroll เปลี่ยนด้วยกฎของตัวเองบ่อยไหม"],
            "B มี Cohesion สูงกว่า A ตามโจทย์ หาก Payroll และรายงานเริ่มมีหน้าที่อิสระ ควรพิจารณาขอบเขตให้แคบลง")
        ]),
      section("implementability-aesthetics", "61–65", "ออกแบบให้สร้างง่ายและอ่านได้",
        "แบบที่ดีเริ่มจากโครงที่ตรงโจทย์และเรียบพออธิบายได้ หลักหลายข้อเกื้อกัน เช่น Information Hiding กับ Low Coupling บางข้อมีผลแลกเปลี่ยน เช่น ทำให้ทั่วไปเพื่อใช้ซ้ำมากขึ้นอาจเพิ่มความซับซ้อน",
        [
          ["Implementability", "Simplicity ลดโครงที่เกินงาน Design with reuse ใช้ของที่มีอยู่ Design for reuse ทำส่วนนี้ให้รับไปใช้ซ้ำได้"],
          ["Aesthetic Principles", "Beauty คือโครงชัดและเรียบง่าย Symmetry คือส่วนคล้ายกันจัดเหมือนกัน Balance คือกระจายหน้าที่ ไม่กระจุกใน God Class และ Proportion คือเลือกขนาดพอดีกับงาน"],
          ["Trade-offs", "แยก Module แล้วอ่านง่ายเมื่อหน้าที่เป็นเอกภาพ หากแบ่งเล็กจนต้องเรียกข้ามไปมามาก Cohesion อาจลด หากออกแบบให้ใช้ซ้ำได้มากเกินโจทย์ Simplicity อาจลด เปรียบเทียบกับ Requirements ก่อนตัดสิน"]
        ],
        [
          example("beauty-calculator", [62, 63, 64], "Calculator แบบ if/else เทียบกับ Operation",
            "ฝั่งซ้าย calc รับ int a, int b และ string op รองรับ add, sub, mul ฝั่งขวากำหนด Operation.execute(a,b) แล้วสไลด์ยก Add กับ Multiply",
            "ไล่ผลของตัวอย่างและบอกว่าถ้าจะเพิ่มเครื่องหมายต้องไปแก้ที่ใด",
            ["ลอง a = 6, b = 4 ฝั่งซ้ายเลือก add ได้ 10, sub ได้ 2, mul ได้ 24 ส่วน op ที่ไม่รู้จักคืน 0 ตามโค้ด", "ฝั่งขวาเลือก Add แล้ว execute(6, 4) ได้ 10 หรือเลือก Multiply ได้ 24 Interface บอกสัญญาแต่ละ Operation รู้กฎของตัวเอง", "ถ้าจะเพิ่ม Subtract ฝั่งขวาเพิ่มคลาสที่ใช้ Interface เดิม แล้วระบุวิธีเลือก Operator ในจุดเลือก ฝั่งซ้ายต้องเพิ่มเงื่อนไขใน calc"],
            "การแยก Operation ทำให้ขยายและทดสอบการคำนวณแต่ละแบบได้ชัด ประโยชน์ขึ้นกับว่าระบบจะเพิ่มการคำนวณมากเพียงใด",
            { codeLanguage: "java", code: "interface Operation {\n    int execute(int left, int right);\n}\n\nclass Add implements Operation {\n    public int execute(int left, int right) {\n        return left + right;\n    }\n}\n\nclass Multiply implements Operation {\n    public int execute(int left, int right) {\n        return left * right;\n    }\n}", note: "ค่า 6 และ 4 เป็นตัวเลขฝึกเพิ่มเติม หน้า 63 ฝั่งขวาไม่มี Subtract และไม่มีโค้ดเลือก Operation จึงเทียบการทำงานเฉพาะ Add กับ Multiply ที่ปรากฏ โค้ดกล่องนี้เขียนใหม่เพื่อเน้น Interface และค่าที่คืน" })
        ])
    ],
    exercises: [
      quiz("q1", [6, 7, 10, 11, 12, 13], "แยกระดับการตัดสินใจ", "ทีมกำหนดให้หน้าแสดงผลเรียก Order Service ผ่าน API เท่านั้น จากนั้นกำหนดให้ Order Service ค้นรายการด้วย Hash Map ข้อใดจำแนกได้ตรงที่สุด?",
        ["ข้อแรก Architectural ส่วน Hash Map เป็น Detailed", "ทั้งคู่ Architectural เพราะพูดถึง Order Service", "ทั้งคู่ Detailed เพราะสามารถเขียนโค้ดทำได้", "ข้อแรก Detailed ส่วน Hash Map เป็น Architectural"], 0,
        ["กติกาเรียกผ่าน API กำหนดขอบเขตและการเชื่อมส่วนหลัก จึงอยู่ระดับ Architectural", "การเลือก Hash Map เป็นวิธีเก็บและค้นในส่วนเดียว จึงอยู่ระดับ Detailed", "การมีชื่อ Service หรือการเขียนเป็นโค้ดได้ไม่ได้เป็นเกณฑ์ ต้องดูขอบเขตผลกระทบ"], { practice: true }),
      quiz("q2", [14, 15, 16, 17, 18, 19, 20], "เลือก Style ให้ตรงการไหล", "ระบบประมวลผลภาพต้องปรับขนาด ลด Noise และบีบอัดตามลำดับ แต่ละขั้นรับและคืนรูป พร้อมเปลี่ยนตัวลด Noise ได้ ตรงกับแบบใดโดยตรงที่สุด?",
        ["Client–Server เพราะมีหลายขั้น", "Data-centered เพราะทุกขั้นรับข้อมูล", "Pipe and Filter เพราะแต่ละตัวแปลงรับผลจากขั้นก่อน", "Microservices เพราะแยกการทำงานเป็นสามชื่อ"], 2,
        ["โจทย์เน้นการแปลง Input เป็น Output ต่อกัน จึงเห็น Filter สามขั้นกับทางส่งข้อมูล", "Client–Server ต้องมีบทบาทขอและให้บริการ Data-centered เน้นคลังร่วม ส่วน Microservices ต้องเห็นการรันและ Deploy แยก ไม่ได้สรุปจากการมีชื่อขั้นหลายชื่อ"], { practice: true }),
      quiz("q3", [24, 25, 26, 32, 33, 34, 35, 36], "หา Transaction Center", "ตู้บริการอ่านรหัสคำสั่งแล้วเลือกทาง จ่ายเงิน พิมพ์ใบเสร็จ หรือดูสถานะ ตามชนิดคำสั่ง ข้อใดอธิบายการทำ Structure Chart ได้ถูก?",
        ["เป็น Transform Flow เสมอเพราะมีข้อมูลไหลเข้า", "เป็น Transaction Flow ให้ Controller ที่แยกชนิดคำสั่งเรียก Action Path ที่ตรง", "ทุกคำสั่งต้องเรียกทั้งสาม Action Path ตามลำดับ", "การวางสายเรียกต้องเหมือนลูกศร DFD ทุกเส้น"], 1,
        ["ใช้ชนิดคำสั่งตัดสินใจว่าจะไปทางใด การแยกชนิดจึงเป็น Transaction Center", "การมี Input อย่างเดียวแยกชนิด Flow ไม่ได้ ในโจทย์เลือกหนึ่งทางต่อคำสั่ง ไม่มีเหตุให้เรียกครบทั้งสาม", "DFD แสดงข้อมูล ส่วน Structure Chart แสดงการเรียก Module จึงไม่บังคับว่าทุกเส้นต้องเหมือนกัน"], { practice: true }),
      quiz("q4", [48, 49, 52, 53, 54, 57, 58], "ลด Coupling จากตัวแปรร่วม", "โมดูลส่งใบแจ้งหนี้ต้องใช้แค่ที่อยู่จัดส่ง วิธีใดลดการพึ่งโครงข้อมูลลูกค้าได้ตรงที่สุด?",
        ["อ่าน field ภายใน CustomerStore โดยตรง", "ใช้ Global CurrentCustomer ร่วมกัน", "ส่ง Customer ทั้งก้อนพร้อมบัญชีและประวัติการจ่าย", "รับเฉพาะ ShippingAddress ผ่าน Interface ที่ระบุชัด"], 3,
        ["เลือกข้อมูลที่จำเป็นจริงคือ ShippingAddress แล้วส่งตามสัญญา", "เข้า field ภายในโดยตรงทำให้พึ่ง Implementation ใช้ Global ทำให้พึ่ง State ร่วม ส่วนส่ง Customer ทั้งก้อนทำให้ผู้รับต้องรู้รูปโครงและเปิดข้อมูลมากเกินงาน"], { practice: true }),
      quiz("q5", [61, 62, 63, 64], "อธิบายผลการแยก Operation", "ให้ Subtract ทำตามสัญญา Operation ด้านล่าง เมื่อเรียก execute(9, 4) ได้อะไร และประโยชน์ที่โจทย์แสดงคืออะไร?",
        ["5 และแยกกฎลบออกจากเงื่อนไขรวมของ Calculator", "13 และช่วยให้ทุก Operation ใช้วิธีบวกเดียวกัน", "5 และ Controller ไม่ต้องเลือก Operation อีก", "4 และ Interface ทำให้ทุกโมดูลไม่พึ่งพากันเลย"], 0,
        ["execute คืน left ลบ right จึงได้ 9 − 4 = 5", "การแยกคลาสช่วยให้กฎลบมีที่อยู่ของตัวเอง Interface ยังเป็นสัญญาที่ผู้เรียกพึ่งพา และโค้ดที่รับคำสั่งยังต้องเลือก Operation", "13 มาจากการบวก ส่วน 4 เป็นเพียงค่าพารามิเตอร์ขวา"], { practice: true, codeLanguage: "java", codePrompt: "class Subtract implements Operation {\n    public int execute(int left, int right) {\n        return left - right;\n    }\n}" })
    ],
    checklist: [
      "จำแนกข้อกำหนดระดับ Component ออกจากอัลกอริทึมและโครงสร้างข้อมูลภายในได้",
      "เลือก Style จากรูปหรือโจทย์ แล้วพูดข้อได้เปรียบและต้นทุนอย่างละหนึ่งข้อได้",
      "หาขอบเขต Incoming, Transform, Outgoing หรือ Transaction Center แล้ววาง Controller กับ Worker ได้",
      "อธิบายความต่างระหว่าง Cohesion และ Coupling พร้อมไล่ผลเมื่อแก้ Interface ได้",
      "ไล่ผลลัพธ์ของ HelloWorld, Create_Parcel และตัวอย่าง Operation ได้ และแยก Design with reuse จาก Design for reuse ได้"
    ]
  });
})();
