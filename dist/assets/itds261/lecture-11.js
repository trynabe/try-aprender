(() => {
  const { addChapter, section, example, quiz } = window.SoftwareEngineering;

  addChapter({
    number: 11,
    title: "Version Control System",
    thaiTitle: "ติดตามงานที่เปลี่ยน และทำ Git ร่วมกันเป็นทีม",
    totalPages: 33,
    codeLanguage: "bash",
    summary: "เริ่มจากการควบคุมการเปลี่ยนแปลงของงานทั้งโครงการ แล้วอ่านภาพ CVS, Subversion และ Git ไล่สถานะไฟล์จาก Working Directory ผ่าน Staging Area ถึง Local Repository และเลือก Branch ให้เหมาะกับ Feature, Release และ Hotfix",
    goals: [
      "ระบุ Configuration Item และอ่านแผนภาพ Software Configuration Management ได้",
      "บอกทิศทางของ add, commit, pull และ push พร้อมไล่สถานะไฟล์หลังแต่ละคำสั่งได้",
      "เลือกจุดที่แตก Branch และปลายทาง Merge ตาม Git Branching Model ในสไลด์ได้"
    ],
    confusions: [
      "Software Configuration Management ครอบคลุมการประเมินและควบคุมการเปลี่ยนแปลง ส่วน Version Control System ช่วยจัดเก็บและติดตามเวอร์ชัน",
      "Staging Area เตรียมเนื้อหาที่จะเข้า Commit ส่วน Commit บันทึกในเครื่องและ Push จึงส่ง Commit ไปยัง Remote",
      "Git เป็น Distributed VCS ได้แม้ทีมจะตกลงใช้ Remote กลางชื่อ origin เป็นจุดนัดหมาย",
      "Release Branch ใช้เตรียมรุ่นใหม่ ส่วน Hotfix Branch เริ่มจากรุ่น Production ที่ต้องแก้ด่วน"
    ],
    sections: [
      section("configuration", "1–7", "Software Configuration Management",
        "เมื่อหลายคนแก้ซอฟต์แวร์ คำถามแรกคือจะคุมการเปลี่ยนแปลงของอะไรบ้าง Software Configuration Management หรือ SCM เริ่มจากระบุชิ้นงาน ตั้งวิธีเรียกเวอร์ชัน และติดตาม Change Request ตั้งแต่เริ่มพัฒนาจนออกไปดูแลหลัง Release",
        [
          ["Software Configuration Management (CM)", "วินัยและวิธีเริ่ม ประเมิน และควบคุมการเปลี่ยนแปลงของ Software Product หน้า 4 ยก IEEE 828 และ IEEE 1042 เป็นมาตรฐานประกอบ"],
          ["Configuration Item (CI)", "ชิ้นงานที่เปลี่ยนได้และทีมกำหนดให้ติดตาม เช่น Source Code, Test Driver, Requirement, Design, คู่มือ, Compiler Version และ Hardware Configuration"],
          ["Version Numbering", "ใช้รหัสที่บอกเวอร์ชันได้ชัด เช่น V1.1 หรือ V2.2 เลขอย่างเดียวอาจบอกไม่ได้ว่าใครทำหรือใช้กับลูกค้ารายใด"],
          ["Attribute-based Identification", "ใช้คุณลักษณะมาช่วยระบุ เช่น Date, Creator, Programming Language, Customer หรือ Status เลือกชุดที่แยกเวอร์ชันได้ชัดจริง"]
        ],
        [
          example("cm-process", [4, 5, 6], "ตามลูกศรแผนภาพ Configuration Management Process",
            "ภาพมี Configuration Management Process, Project Management Processes และ Product Development Processes เชื่อมกันด้วยข้อมูลและชิ้นงาน",
            "ไล่สิ่งที่ส่งเข้า CM และสิ่งที่ CM ส่งคืน แล้วระบุว่าผู้จัดการกับผู้พัฒนานำไปใช้ต่างกันอย่างไร",
            ["ฝ่าย Project Management ส่ง Planning Data เข้า CM แล้วรับ CM Plan ตลอดจน Status Reports และ Audit Results ไปใช้ติดตามและควบคุมงาน", "ฝั่ง Product Development ส่ง Work Products และ Change Requests เข้า CM แล้วรับ Controlled Work Products และ Approved Change Requests กลับไปทำงานต่อ", "ภาพฝั่งพัฒนาวางลำดับจาก Systems Engineering ผ่าน Requirements, Design, Implementation, Testing และ Product Release ไปถึง Maintenance จึงเกิด CI ที่ต้องติดตามได้ตลอดทาง"],
            "CM ตั้งเกณฑ์และเก็บสถานะให้ฝ่ายจัดการติดตามงาน ส่วนฝ่ายพัฒนาใช้ชิ้นงานที่ถูกควบคุมและการเปลี่ยนแปลงที่ได้รับอนุมัติ",
            { table: { headers: ["ผู้ประสานกับ CM", "ส่งเข้า CM", "ข้อมูลหรือชิ้นงานที่ได้รับ"], rows: [
              ["Project Management", "Planning Data", "CM Plan, Status Reports, Audit Results"],
              ["Product Development", "Work Products, Change Requests", "Controlled Work Products, Approved Change Requests"]
            ] } }),
          example("version-identification", [7], "อ่านแผนผัง Version Identification",
            "ในภาพมีเส้นเวอร์ชันหลักจาก V1.0 ผ่านรุ่นย่อยไปถึง V2.2 และมีเวอร์ชันที่แตกแขนงออกจากเส้นหลัก",
            "ตอบว่ารหัสรุ่นอย่างเดียวบอกอะไร และเมื่อไหร่ต้องเพิ่ม Attribute",
            ["อ่านจุดเริ่มและลูกศรเพื่อหาว่ารุ่นหนึ่งต่อยอดจากรุ่นไหน", "อย่าใช้เวลาแก้ไฟล์เพียงอย่างเดียวแยกสองรุ่นที่พัฒนาควบคู่กัน ให้ใช้รหัสเวอร์ชันที่ไม่กำกวม", "เพิ่ม Customer หรือ Status เมื่อทีมมีรุ่นชื่อคล้ายกันแต่เงื่อนไขการส่งมอบต่างกัน"],
            "Version Number ระบุรุ่นได้รวดเร็ว ส่วน Attribute ช่วยบอกบริบทที่จะใช้ค้นหรือประกอบรุ่น")
        ]),
      section("version-control", "8–16", "VCS, CVS, Subversion และ Distributed Git",
        "Version Control System หรือ VCS ช่วยกู้การตั้งค่าเดิม ประสานการแก้ และระบุเวอร์ชันกับส่วนประกอบ Repository คือที่เก็บข้อมูลเวอร์ชันให้คนค้นย้อนหลังได้ Working Copy คือไฟล์ที่กำลังเปิดแก้",
        [
          ["Version Control", "เก็บประวัติว่าแต่ละรุ่นสร้างหรือแก้ไฟล์อะไร ช่วยหาว่าเวอร์ชันไหนมีการเปลี่ยนที่ต้องการ"],
          ["Centralized VCS", "ทีมใช้ Repository กลางเป็นที่เก็บประวัติหลัก ส่งงานและรับงานผ่านที่กลาง ตัวอย่างในสไลด์คือ CVS กับ Subversion"],
          ["Distributed VCS", "Git ให้แต่ละ Clone มี Local Repository ที่ทำงานกับประวัติได้ หลายคำสั่งจึงเร็วและทำแบบ Offline ได้ ส่วนการแลก Commit กับ Remote ต้องติดต่อปลายทาง"],
          ["Git", "ระบบควบคุมเวอร์ชันแบบกระจาย ตัวสไลด์เน้น Local Branching ที่เบา Staging Area และทางเลือกในการจัด Workflow"]
        ],
        [
          example("final-doc-timeline", [9, 10, 11], "จาก FINAL.doc หลายไฟล์สู่ Timeline ของ VCS",
            "หน้า 9 ใช้ภาพทดสอบจรวดกับการ์ตูน FINAL.doc และรายชื่อไฟล์ final-project หลายชุดเพื่อชวนคิดเรื่องการตามการเปลี่ยนแปลง หน้า 11 วาง v0.1, v0.2 และ v0.3 บนเส้นเวลา",
            "บอกว่าประวัติรุ่นช่วยตอบอะไรที่ชื่อไฟล์ FINAL ตอบได้ไม่ชัด",
            ["ที่ v0.1 วันที่ 24 ก.พ. 2017 มีไฟล์ใหม่หนึ่งชุด", "ที่ v0.2 วันที่ 20 มี.ค. 2017 สร้างอีกไฟล์และแก้ไฟล์เดิม", "ที่ v0.3 วันที่ 7 เม.ย. 2017 สร้างไฟล์เพิ่มและแก้ของเดิมต่อ", "อ่านรุ่นและรายการ Created หรือ Modified เพื่อเลือกจุดย้อนกลับหรือเปรียบเทียบ"],
            "VCS เก็บความสัมพันธ์ของรุ่นและการเปลี่ยนแปลง การตั้งชื่อสำเนาหลายไฟล์ให้ดูเหมือนรุ่นล่าสุดทำให้ทีมตอบคำถามนี้ยากขึ้น",
            { diagram: ["v0.1 · Created", "v0.2 · Created + Modified", "v0.3 · Modified + Created"], note: "ภาพจรวดหน้า 9 เป็นภาพประกอบคำถามในสไลด์ จึงไม่ใช้ระบุสาเหตุของเหตุการณ์ในภาพ" }),
          example("repository-topology", [12, 13, 14, 15, 16], "อ่านแผนภาพ Repository สามแบบ",
            "ภาพ CVS และ Subversion มี Alice และ Bob เชื่อมกับ Repository กลาง ส่วนภาพ Git วาด Working Files, Staging และ Repository ในเครื่อง Alice พร้อมลูกศรไปหลาย Repository",
            "ระบุทิศทางการเปลี่ยนแปลง และบอกว่าหลัง Commit งานอยู่ที่ใดในแต่ละภาพ",
            ["ใน CVS ลูกศร checkin วิ่งเข้า Repository กลาง ส่วน checkout ดึงไฟล์ออกมาทำงาน", "ใน Subversion commit ส่งการเปลี่ยนไปกลางและ update รับการเปลี่ยนจากกลาง ภาพ .svn สื่อถึงข้อมูลจัดการ Working Copy", "ใน Git เลือกงานผ่าน Staging แล้ว commit ลง Local Repository ของตัวเอง เมื่อพร้อมจึงใช้ push และ pull แลก Commit กับ Repository อื่น", "เมื่อทำงานในเครื่อง Local Repository มีประวัติให้อ่านและสร้าง Commit ได้ Clone ปกติช่วยเก็บประวัติ แต่ Remote หรือ Clone ที่ยังไม่ได้รับ Commit ล่าสุดก็ยังไม่มี Commit นั้น"],
            "ดูตำแหน่ง Repository ที่รับ Commit เป็นหลัก จะเห็นความต่างระหว่างการทำงานผ่านที่กลางกับการบันทึกในเครื่อง",
            { table: { headers: ["ระบบ", "รับไฟล์หรือประวัติ", "บันทึกเวอร์ชัน"], rows: [
              ["CVS", "checkout จาก Repository กลาง", "checkin ไปที่ Repository กลาง"],
              ["Subversion", "update Working Copy จาก Repository กลาง", "commit ไปที่ Repository กลาง"],
              ["Git", "pull จาก Remote มารวมที่ Branch ที่ใช้อยู่", "commit ที่ Local ก่อนใช้ push ส่งออก"]
            ] }, note: "หน้า 16 ใช้คำว่า almost การแลกข้อมูลกับ Remote ต้องเชื่อมต่อ และ Clone ที่เลือกดึงประวัติบางส่วนอาจมีประวัติไม่ครบ" })
        ]),
      section("staging", "17–21", "Staging Area และ File Status Lifecycle",
        "นึกถึง Staging Area หรือ Index ว่าเป็นชุดเนื้อหาที่เลือกไว้สำหรับ Commit ถัดไป ใน Working Directory เราแก้หลายไฟล์ได้ แต่เลือกเฉพาะส่วนที่พร้อมเข้า Commit ได้",
        [
          ["Untracked / Unmodified", "Untracked เป็นไฟล์ที่ยังไม่ถูกติดตาม Unmodified เป็นไฟล์ที่ Git ติดตามอยู่และยังตรงกับรุ่นล่าสุดในกรณีที่ภาพแสดง"],
          ["Modified / Staged", "Modified มีการแก้ที่ยังไม่เข้า Index ส่วน Staged มีเนื้อหาที่เตรียมบันทึกใน Commit ถัดไป"],
          ["git add", "ส่งเวอร์ชันของเนื้อหา ณ เวลาที่สั่งจาก Working Directory เข้า Index"],
          ["git commit", "สร้างรุ่นใหม่ใน Local Repository จากเนื้อหาใน Index พร้อมข้อความอธิบายเหตุผลหรือสิ่งที่เปลี่ยน"]
        ],
        [
          example("file-lifecycle", [17, 18, 19, 20, 21], "ไล่ทุกลูกศรของ File Status Lifecycle",
            "ภาพมี Untracked, Staged, Unmodified และ Modified พร้อมลูกศร add, commit, edit และ remove",
            "บอกสถานะเมื่อสร้างไฟล์ บันทึกไฟล์ครั้งแรก แก้ไฟล์เดิม และนำไฟล์ใหม่ออกจาก Staging",
            ["ไฟล์ใหม่เริ่ม Untracked ใช้ git add <file> แล้วเนื้อหารุ่นนั้นเข้า Staging", "git commit -m \"message\" บันทึกงานที่ Staged หากไม่ได้แก้เพิ่ม ไฟล์อยู่สถานะ Unmodified เทียบกับ Commit ล่าสุด", "แก้ไฟล์ที่ติดตามแล้วจะเป็น Modified ใช้ git add อีกครั้งเพื่อ Staged เนื้อหาที่แก้", "ลูกศร remove กลับ Untracked หมายถึงนำไฟล์ใหม่ที่ยังไม่ได้ Commit ออกจาก Index โดยเก็บไฟล์ไว้ ถ้าเป็นไฟล์ที่ติดตามอยู่แล้ว สถานะหลังเอาการแก้ออกจาก Staging จะเป็นคนละกรณี"],
            "ลำดับในภาพคือสร้าง → add → commit → edit → add อีกรอบ",
            { code: "git add notes.txt\ngit commit -m \"Add version notes\"", diagram: ["Untracked · สร้างไฟล์", "Staged · git add", "Unmodified · git commit เมื่อไม่มีการแก้เพิ่ม", "Modified · แก้ไฟล์", "Staged · git add อีกรอบ"], note: "หน้า 19 ใช้เครื่องหมายคำพูดแบบสิ่งพิมพ์รอบ message เมื่อนำไปรันให้ใช้เครื่องหมายคำพูดตรงอย่างในกล่องโค้ด" }),
          example("stage-snapshot", [17, 19, 20, 21], "แก้ไฟล์เพิ่มหลัง git add",
            "เริ่มจาก Repository ที่มี Commit อยู่แล้ว notes.txt เขียนว่า draft 1 แล้วสั่ง git add จากนั้นแก้เป็น draft 2 โดยยังไม่ add ซ้ำ",
            "ทำนายว่า Commit จะเก็บข้อความไหนและหลัง Commit ไฟล์ในเครื่องมีอะไร",
            ["git add เก็บ draft 1 ลง Index", "การแก้เป็น draft 2 เปลี่ยน Working Directory เท่านั้น", "git commit บันทึก draft 1 จาก Index ส่วนไฟล์ในเครื่องยังเป็น draft 2 จึงเหลือการแก้ที่ยังไม่ได้ Stage"],
            "ถ้าต้องการบันทึก draft 2 ให้ Stage เนื้อหานั้นก่อนสร้าง Commit ถัดไป",
            { practice: true })
        ]),
      section("remote", "22–24", "Pull, Push และ Remote กลางของทีม",
        "Remote คือ Repository ที่ทีมติดต่อเพื่อรับหรือส่งประวัติ การทำงานในเครื่องกับการซิงก์เป็นคนละจังหวะ ลองแยกทิศของลูกศรก่อนตัดสินใจว่าจะสั่งคำสั่งใด",
        [
          ["git pull", "ดึงข้อมูลจาก Remote แล้วรวมเข้ากับ Branch ปัจจุบัน สไลด์สาธิตแบบ Fetch แล้ว Merge ส่วนวิธีรวมจริงขึ้นกับการตั้งค่า เช่น อาจใช้ Rebase"],
          ["git push", "ส่ง Commit และอัปเดต Branch ที่ปลายทางตามสิทธิ์และนโยบายของ Remote งานใน Working Directory หรือ Index ยังไม่ได้ถูกส่งโดยคำสั่งนี้"],
          ["Push Rejected", "ถ้า Branch ปลายทางมี Commit เพิ่มที่ทำให้เลื่อนหัว Branch แบบ Fast-forward ไม่ได้ ให้รับประวัติมาดูและประสานการเปลี่ยนก่อนลองใหม่"],
          ["Patch", "สไลด์ระบุว่า Git สร้างและนำ Patch เข้าได้เป็นอีกทางแลกการแก้ไข การมี Patch ยังไม่เท่ากับการอัปเดต Branch กลางให้ทุกคน"]
        ],
        [
          example("origin-graph", [22, 23, 24], "อ่าน Decentralized but Centralized",
            "ภาพมี Alice, Bob, David และ Clair ถือ Repository ของตัวเอง ทุกคนมีลูกศร push/pull ไป origin และบางคู่รับงานกันโดยตรงตามลูกศร subteam fetches",
            "บอกเส้นทางที่ Commit ของ Alice จะไปถึง Bob และอธิบายว่าทำไมยังถือว่า Git กระจายอยู่",
            ["Alice สร้าง Commit ในเครื่องของตัวเองก่อน", "ตาม Workflow กลาง Alice push ไป origin แล้ว Bob ดึงจาก origin มารวมกับ Branch ของตน", "ภาพยังให้ทีมย่อย fetch กันตรง ๆ ได้ตามการตั้งค่า Remote และสิทธิ์", "แม้ origin ใช้ประสานงาน แต่ทุกคนมี Local Repository จึงอ่านประวัติและสร้าง Commit ของตัวเองได้"],
            "origin เป็นที่กลางตามข้อตกลงของทีม ส่วนที่เก็บประวัติและการทำ Commit ยังอยู่กระจายตามเครื่อง",
            { diagram: ["Local Repository ของ Alice", "origin · Remote ที่ทีมใช้ร่วมกัน", "Local Repository ของ Bob"] })
        ]),
      section("branching", "25–29", "Branches, Merging และสองสายหลัก",
        "Branch เป็นชื่อที่ชี้ไปยังสายการพัฒนา ใช้แยกงานก่อนนำมารวมตามกติกาทีม โมเดลในสไลด์แยก Production ที่พร้อมปล่อยออกจากงานที่จะออกรุ่นถัดไป",
        [
          ["Branch", "แยกสายเมื่อเพิ่ม Feature, เตรียม Release, ทดลองการเปลี่ยน หรือแก้ Bug สายชั่วคราวหลายสายเสร็จแล้วจึงรวมกลับ"],
          ["Merge / Conflict", "Merge รวมประวัติจากอีกสาย หลายกรณีทำได้อัตโนมัติ เมื่อ Git ตัดสินวิธีผสานการแก้ขัดกันไม่ได้ ให้คนเลือกผลที่ตรงเจตนาแล้วทดสอบ"],
          ["master / develop", "ใน Git Branching Model ของสไลด์ master เก็บสภาพพร้อม Production ส่วน develop รวมงานสำหรับ Release ถัดไป ผู้ดูแล Repo ตั้งชื่อ Branch หลักต่างออกไปได้"],
          ["Supporting Branches", "Feature, Release และ Hotfix เป็นสายช่วยแยกงานต่างเป้าหมาย ก่อนนำการเปลี่ยนที่จำเป็นกลับเข้ากิ่งหลัก"]
        ],
        [
          example("main-branches", [25, 26, 27, 28, 29], "อ่านภาพสองสายหลักจาก Initial Production",
            "ภาพหน้า 28 มีเวลาวิ่งลงด้านล่าง กิ่ง master สีฟ้าเป็นรุ่นที่พร้อมปล่อย และ develop สีเหลืองเป็นงานสำหรับรุ่นถัดไป",
            "หาว่าควรวางงานรุ่นถัดไปที่ไหนและเมื่อใดที่สาย Production เปลี่ยน",
            ["เริ่มจาก Initial Production Version แล้วต่อ develop เพื่อรวบรวมสิ่งที่จะส่งในอนาคต", "ทำงานในสายชั่วคราวสำหรับเป้าหมายแต่ละแบบ แล้วรวมเข้าสายที่เหมาะ", "เมื่อรุ่นใหม่ผ่านเกณฑ์พร้อมปล่อยจึงนำเข้า master วงกลมสีฟ้าถัดไปหมายถึง Production Release ถัดไป", "อ่าน Work in Progress ด้านล่างของ develop เป็นงานที่ยังเตรียมต่อสำหรับรอบใหม่"],
            "เมื่อเห็นชื่อ master ในรูปให้อ่านเป็นบทบาท Production ส่วน develop คือพื้นที่รวมงานรุ่นถัดไป"
          )
        ]),
      section("git-branching-model", "30–33", "ไล่ Feature, Release และ Hotfix ใน Git Branching Model",
        "ภาพสุดท้ายซ้อนสามสถานการณ์ไว้ในเส้นเวลาเดียวกัน เวลาเดินลงด้านล่าง ให้หาจุดแตกออก งานบนสาย และลูกศรที่รวมกลับก่อนอ่าน Tag ของรุ่น Production",
        [
          ["Feature Branch", "แตกจาก develop เพื่อทำ Feature ใหม่ และรวมเข้า develop เมื่อพร้อมเข้ารอบพัฒนาที่เหมาะ"],
          ["Release Branch", "แตกจาก develop เมื่อชุด Feature สำหรับรอบนั้นพร้อม ใช้เตรียมปล่อย เช่น แก้ Bug และจัดหมายเลขรุ่น ขณะ develop เปิดรับงานรอบถัดไป"],
          ["Hotfix Branch", "แตกจากรุ่น Production ที่มีปัญหาบน master แก้และทดสอบ จากนั้นรวมกลับ Production และส่ง Fix เข้า develop หรือสาย Release ที่เกี่ยวข้องเพื่อไม่ให้ Bug กลับมา"],
          ["Tag", "ชื่อที่ใช้ชี้ Commit ของรุ่น เช่น 1.2.1 ช่วยให้ทีมเลือกฐาน Hotfix หรืออ้างถึงรุ่นที่ปล่อยไปแล้วได้ชัด"]
        ],
        [
          example("feature-graph", [30], "ไล่ลูกศร Feature Branch สีชมพู",
            "ภาพแยกสาย develop สีเหลืองออกเป็น Feature สีชมพู แล้วลากลูกศรจาก Feature กลับเข้า develop",
            "ชี้ฐานที่เริ่มทำและปลายทางเมื่อ Feature พร้อม",
            ["อ่าน Commit ใน develop ตรงจุดแตกเป็นฐาน", "ทำ Commit บนสาย Feature จนงานครบและผ่านการตรวจ", "รวม Feature กลับเข้า develop ให้เข้าชุดพัฒนารุ่นตามแผน"],
            "เส้นทางคือ develop → Feature → develop งานชิ้นนี้รอผ่าน Release ตาม Workflow ของทีม",
            { diagram: ["develop", "Feature Branch · พัฒนาและทดสอบ", "develop · รวมงานที่เสร็จ"] }),
          example("release-graph", [31], "เตรียม Release 1.0 ขณะ develop เดินต่อ",
            "ภาพมี Tag 0.2 เป็น Production เดิม จากนั้นมี Start of release branch for 1.0 และ Only bugfixes บนสายสีเขียว",
            "ระบุว่าควรเก็บ Bug Fix กับ Feature ใหม่ที่ไหน และ Tag 1.0 เกิดหลังขั้นใด",
            ["แตก Release 1.0 จาก develop เมื่อชุดงานสำหรับ 1.0 พร้อม", "ปรับแก้ที่จำเป็นต่อการปล่อยบน Release Branch ขณะที่ Feature รอบถัดไปรวมใน develop ได้", "ส่ง Bug Fix ที่จำเป็นกลับ develop ระหว่างทำงานหรือเมื่อจบ เพื่อให้รุ่นถัดไปได้รับด้วย", "รวมชุดที่พร้อมปล่อยไป master แล้วติด Tag 1.0"],
            "Release Branch แยกงานทำให้รุ่นปัจจุบันนิ่งจากการรับ Feature รุ่นถัดไป"),
          example("hotfix-graph", [32], "ไล่ Hotfix จาก Production 1.2 ไป 1.2.1",
            "ภาพมี Tag 1.2 บน master กิ่ง Hotfix สีแดง และ Tag 1.2.1 หลังแก้",
            "หา Branch ที่ควรแตกจากรุ่นใด และตามผลของ Fix ให้ถึงงานรุ่นถัดไป",
            ["แตก Hotfix จาก Commit ที่ Production ใช้จริงตาม Tag 1.2", "แก้ Defect เฉพาะจุดและตรวจผลบนฐานของรุ่น Production", "รวมเข้า master และติด Tag 1.2.1 แล้วนำ Fix ไป develop ตามภาพเพื่อส่งต่อไป Release ถัดไป"],
            "ผู้ใช้ Production ได้รุ่นแก้ 1.2.1 และฝ่ายพัฒนาไม่ทิ้ง Fix ไว้เฉพาะใน Production"),
          example("whole-graph", [33], "อ่าน The Whole Picture จาก Tag 0.1 ผ่าน 0.2 ถึง 1.0",
            "ภาพรวมมีสาย Feature สองกลุ่ม สาย develop, Release, Hotfix และ master พร้อม Tag 0.1, 0.2, 1.0",
            "ตามว่าข้อบกพร่อง Production ถูกแก้เมื่อใด และ Feature ที่ยังเป็นงานอนาคตไปอยู่ที่ไหน",
            ["จาก 0.1 แตกสาย Hotfix เพื่อแก้ Bug ด่วน รวมคืน master เป็น 0.2 และรวมความเปลี่ยนกลับเข้า develop", "Feature สำหรับรุ่นใกล้เข้ามารวมใน develop เมื่อพร้อม ส่วน Feature ที่ตั้งไว้รอบอนาคตอยู่ในสายทางซ้ายต่อ", "เมื่อแตก Release 1.0 ให้สายสีเขียวโฟกัส Bug Fix และเตรียมปล่อย งานใหม่เดินต่อแม้ 1.0 ยังไม่เปิดใช้", "เมื่อ 1.0 พร้อม จึงรวมเข้า master ติด Tag และส่ง Fix ของ Release กลับ develop"],
            "ตามสีและหัวลูกศรแล้วแยกได้ว่าอะไรปล่อยให้ผู้ใช้ อะไรอยู่ในงานสำหรับรอบถัดไป")
        ])
    ],
    exercises: [
      quiz("q1", [4, 5, 6, 7], "เลือกชิ้นงานที่ SCM ควรติดตาม",
        "ทีมสร้างระบบได้ต่างกันเมื่อเปลี่ยน Compiler Version และเมื่อใช้ไฟล์ Requirement คนละรุ่น ข้อใดทำให้สร้างรุ่นเดิมซ้ำได้ตรงกับแนว SCM?",
        ["เก็บชื่อไฟล์ .java เท่านั้น", "ตั้งชื่อไฟล์ทุกตัวว่า FINAL", "ระบุทั้ง Compiler Version, Requirement Version และ Source Version ในชุด Configuration ของรุ่น", "ใช้วันที่ของการ Deploy อย่างเดียวโดยไม่โยงถึงชิ้นงาน"], 2,
        ["หาองค์ประกอบที่เปลี่ยนผล Build และความหมายของรุ่น", "Compiler, Requirement และ Source ต่างเป็น Configuration Item ที่ต้องระบุเวอร์ชันให้สัมพันธ์กัน", "ชื่อไฟล์หรือวันที่อย่างเดียวบอกชุดชิ้นงานไม่ครบ ส่วนการเก็บเพียงรายการไฟล์ไม่มีเวอร์ชันของสิ่งที่กำหนดผล Build"], { practice: true }),
      quiz("q2", [12, 13, 14, 15, 16], "อ่านขอบเขตการทำงานเมื่อ Offline",
        "ทำงานใน Git Clone ปกติบนรถที่ไม่มีเน็ต และมีการแก้ไฟล์ในเครื่องแล้ว ข้อใดทำได้ตามโครงสร้างในภาพ?",
        ["Stage และ Commit ใน Local Repository แล้ว Push เมื่อเชื่อมต่อ Remote ได้", "ต้องรอต่อเน็ตจึงดู Local History ได้", "Push ให้เพื่อนเห็นทันทีจากเครื่องที่ Offline", "สั่ง Pull เพื่อรับ Commit ใหม่จาก Repository กลางได้ทั้งที่ติดต่อปลายทางไม่ได้"], 0,
        ["แยกคำสั่งที่ทำกับ Local Repository ออกจากคำสั่งที่ต้องติดต่อ Remote", "add และ commit ใช้ข้อมูลในเครื่อง การดูประวัติที่ Clone มาแล้วก็ทำในเครื่องได้", "Push และ Pull กับ Repository กลางต้องติดต่อปลายทาง จึงทำสองตัวเลือกนั้นไม่ได้ระหว่าง Offline"], { practice: true }),
      quiz("q3", [17, 18, 19, 20, 21], "ทำนายเนื้อหาที่เข้า Commit",
        "Commit ล่าสุดใน Repo เก็บ note.txt เป็น A เราเขียน B แล้ว git add จากนั้นเขียน C ข้อใดเกิดขึ้นเมื่อสั่ง Commit ตามลำดับในกล่องโค้ด?",
        ["Commit เก็บ C เพราะอ่านจาก Working Directory ตอนสั่ง", "Commit เก็บทั้ง B และ C เป็นสองเวอร์ชัน", "Commit ไม่เกิดเพราะไฟล์ถูกเปลี่ยนหลัง Stage", "Commit เก็บ B และ Working Directory ยังมี C ที่ยังไม่ได้ Stage"], 3,
        ["หลัง git add เนื้อหา B อยู่ใน Index", "การเขียน C เปลี่ยน Working Directory โดยไม่ได้ Stage รอบใหม่", "commit ใช้ Index จึงสร้างรุ่นที่เป็น B เพียงรุ่นเดียว และทิ้ง C ไว้เป็นการแก้สำหรับ Commit ถัดไป"], { practice: true, codePrompt: "printf 'B\\n' > note.txt\ngit add note.txt\nprintf 'C\\n' > note.txt\ngit commit -m \"Update note\"" }),
      quiz("q4", [22, 23, 24, 27], "รับมือเมื่อ Remote มี Commit ของเพื่อน",
        "ทั้งเรากับเพื่อนเริ่มจาก Commit เดียวกัน เพื่อน Push ไป origin ก่อน เราสร้าง Commit แยกใน Branch เดียวกันและ Push ถูกปฏิเสธ ขั้นที่เหมาะคือข้อใด?",
        ["ใช้ git add file เดิมซ้ำจน Push ผ่าน", "รับ Commit จาก Remote ตรวจการรวมและแก้ Conflict หากมี แล้วจึง Push หลังทดสอบ", "ลบ Commit ของเพื่อนจาก Remote เพื่อให้ Local เป็นชุดล่าสุด", "เปลี่ยนข้อความ Commit ของเราอย่างเดียวโดยไม่รับงานของเพื่อน"], 1,
        ["เกิดประวัติแยกจากฐานเดียวกัน การ Push ตรง ๆ จะข้าม Commit ที่ปลายทางมี", "รับประวัติมาก่อน เมื่อรวมแล้วตรวจว่าการแก้ของทั้งสองฝ่ายยังอยู่และทดสอบ", "การ Stage หรือเปลี่ยนข้อความไม่รวมประวัติ ส่วนการลบงานเพื่อนไม่ตอบโจทย์การรักษาการเปลี่ยนร่วมกัน"], { practice: true }),
      quiz("q5", [28, 29, 30, 31, 32, 33], "เลือก Branch ให้ตรงกับเหตุการณ์ Production",
        "Production ที่ Tag 3.4 ใช้งานอยู่และพบ Bug ที่ต้องแก้ด่วน ใน develop มี Feature รุ่น 4.0 ที่ยังไม่เสร็จ ตามโมเดลในสไลด์ควรทำอย่างไร?",
        ["แตก Feature จาก develop แล้วเอา develop ทั้งหมดขึ้น Production", "รอให้ Release 4.0 จบแล้วค่อยแก้ Bug ในรุ่นใหม่", "แตก Hotfix จาก Tag 3.4 แก้และรวมกลับ master เพื่อติด Tag 3.4.1 แล้วส่ง Fix เข้า develop", "แตก Release Branch จาก develop และปล่อย 4.0 ทันทีพร้อม Feature ที่ยังไม่เสร็จ"], 2,
        ["เป้าหมายคือแก้รุ่นที่ใช้งานอยู่ ฐานที่ตรงคือ Commit ของ Tag 3.4", "Hotfix แยกการแก้เร่งด่วน จากนั้นรวมเข้า master และส่ง Fix ไป develop", "Feature และ Release จาก develop อาจพางาน 4.0 ที่ยังไม่พร้อมขึ้นด้วย ส่วนการรอ Release ถัดไปไม่แก้ปัญหาเร่งด่วน"], { practice: true })
    ],
    checklist: [
      "ชี้ทิศทาง Planning Data, CM Plan, Change Request และ Approved Change Request ในภาพหน้า 5 ได้",
      "แยก Version Numbering กับ Attribute-based Identification และยก Configuration Item นอกเหนือจากโค้ดได้",
      "ชี้ตำแหน่ง Repository ของ CVS, Subversion และ Git ในแผนภาพ แล้วบอกผลเมื่อ Offline ได้",
      "ไล่ Untracked, Modified, Staged และ Unmodified พร้อมทำนายผลเมื่อแก้ไฟล์หลัง git add ได้",
      "อธิบาย add, commit, pull และ push โดยระบุจุดต้นทางกับปลายทางได้",
      "อ่านภาพหน้า 33 แล้ววาดเส้นแตกและรวมของ Feature, Release และ Hotfix พร้อมระบุ Tag ที่อยู่บน Production ได้"
    ]
  });
})();
