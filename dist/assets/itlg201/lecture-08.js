(() => {
  const slides = "Week 5.1 Paraphrasing (Student Version) (1).pdf";
  const clauses = "DST RS_ Clauses Review for Paraphrasing.pdf";
  const skimming = "Skimming Activity (Student Version) (1).pdf";
  const pesticides = "Potential Health Effects of Pesticides.pdf";
  const recycling = "How to Recycle and Why You Should Do It.pdf";
  const dogs = "Dogs Are Not Here for Our Convenience.pdf";
  const sea = "Turns Out Swimming in the Sea Is Actually Kind of Bad for You.pdf";
  const coffee = "Coffees Source of Nutrition.pdf";
  const dragon = "Dragon Ball Super.pdf";

  function article(id, title, pdf, pages, notes) {
    const paragraphs = notes.map(([page, english, thai, role, vocabulary = []]) => ({
      english, thai, role: "PDF หน้า " + page + " · " + role, vocabulary
    }));
    return { id, title, pdf, pages, paragraphs };
  }

  window.ReadingSkills.addChapter({
    number: 8,
    title: "Paraphrasing, Changing Clauses & Scanning and Skimming",
    thaiTitle: "Week 5.1 และกิจกรรม Week 5 · ถอดความด้วย Clause และ Voice พร้อมฝึกจำแนกบทอ่าน",
    summary: "Week 5 ฝึกสองด้าน อ่านเร็วเพื่อหาเจตนาและหลักฐานจำเพาะ และถอดความภาษาอังกฤษโดยรักษาใจความ เวลา ผู้กระทำ ระดับความแน่นอน และความสัมพันธ์ของเหตุการณ์",
    goals: [
      "ระบุประเภทบทอ่านจากจุดประสงค์และหลักฐาน มากกว่าดูชื่อเรื่องอย่างเดียว",
      "ใช้ Skimming หา Thesis และใช้ Scanning หาเลข สี หรือสัญลักษณ์ตามโจทย์",
      "แยก Adverb, Adjective และ Noun Clauses และปรับโครงสร้างโดยรักษาความหมาย",
      "แปลง Active / Passive ให้ tense และ aspect ตรงกัน และเลือกว่าจะระบุ agent หรือไม่"
    ],
    confusions: [
      "ใช้ synonym ได้เมื่อความหมายและระดับความแน่นอนเข้ากัน การเปลี่ยน tend to assume เป็น everyone เปลี่ยนขอบเขตของข้ออ้าง",
      "Where, when และ that อาจนำ clause คนละชนิด ให้ดูว่าขยายคำนาม บอกเงื่อนไข หรือทำหน้าที่เป็นประธาน/กรรม",
      "Passive ต้องรักษาเวลาและผู้กระทำ เช่น is being painted ต่างจาก was painted",
      "บทอ่านหนึ่งอาจให้ข้อมูลและเตือนพร้อมกัน ให้ตัดสินประเภทจากเจตนาหลักพร้อมยกหลักฐาน"
    ],
    sections: [
      {
        id: "paraphrasing-basics", title: "What Is Paraphrasing?", pdf: slides, pages: [1, 2, 3, 4, 5],
        summary: "เขียนสารเดิมด้วยภาษาของตัวเอง ใช้การเปลี่ยนคำ รูปคำ และโครงประโยคร่วมกัน โดยรักษาข้ออ้างเดิม",
        points: [
          ["Synonyms and word forms", "เลือกคำใกล้เคียงตามบริบท เช่น assume → make an assumption แล้วจัดตำแหน่งคำใหม่"],
          ["Grammatical structure", "สไลด์แบ่งเป็นเปลี่ยน clauses รวมเป็น compound sentences และสลับ active / passive"],
          ["ตรวจความหมาย", "ถามว่าใครทำอะไร ที่ไหน เมื่อใด และน่าเชื่อแค่ไหน จากนั้นเทียบกับต้นฉบับทีละส่วน"]
        ],
        examples: [{
          id: "cleaner-seas", title: "ตัวอย่าง Developed Nations and Cleaner Seas", pdf: slides, pages: [3],
          prompt: "People tend to assume that developed nations have cleaner seas.",
          task: "เทียบตัวอย่างสามแบบในสไลด์และเขียนแบบที่เก็บระดับความเชื่อเดิม",
          steps: ["ข้ออ้างในต้นฉบับเป็นสิ่งที่คนมักเชื่อ ไม่ได้ยืนยันว่าน้ำทะเลสะอาดกว่าจริง", "ตัวอย่าง Everyone seems to believe ขยายจากแนวโน้มไปถึงทุกคน Common knowledge ทำให้ความเชื่อดูเป็นความรู้ทั่วไป ส่วน Normally, people make the assumption ใกล้ต้นฉบับกว่า", "จัดกลุ่มคำใหม่ด้วย often กับ assume และคงการเปรียบเทียบว่าทะเลของประเทศพัฒนาแล้วสะอาดกว่า"],
          answer: "It is often assumed that the seas around developed countries are cleaner.",
          note: "แนวถอดความที่เขียนเพิ่มเพื่อคงขอบเขตของ tend to"
        }]
      },
      {
        id: "slide-clause-examples", title: "เปลี่ยน Clause จากตัวอย่าง Week 5.1", pdf: slides, pages: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        summary: "หน้า 6–12 สลับตำแหน่ง while-clause และประโยคหลัก หน้า 13–16 ทดลองจาก relative clause ไปสู่อีกรูป หน้า 17 เป็นภาพช่วงพัก",
        points: [
          ["while / when / until", "while ชี้การเกิดพร้อมกัน เมื่อใช้ when ต้องคงบริบทของการเกิดพร้อมกัน ส่วน until เปลี่ยนเป็นจุดสิ้นสุด"],
          ["Comma", "เมื่อ adverb clause อยู่หน้าประโยคหลักให้คั่นด้วย comma เช่น While I was playing video games, my brother was cooking dinner."],
          ["ภาพลูกศรหน้า 12", "ประธาน my brother ย้ายไปใน dependent clause ส่วน I กลายเป็นประธานประโยคหลัก cooking → making dinner และ playing → engaged in a video game"],
          ["แนวถอดความหลายแบบ", "รูปที่ต่างกันใช้ได้เมื่อยังคงคน เวลา ข้อเท็จจริง และน้ำหนักเดิม เช่น must แสดงความจำเป็นชัดกว่า may"]
        ],
        examples: [
          {
            id: "dinner-games", title: "My Brother Was Cooking Dinner", pdf: slides, pages: [6, 7, 8, 9, 10, 11, 12],
            prompt: "My brother was cooking dinner while I was playing video games.",
            task: "เปลี่ยนคำเชื่อมหรือสลับ clause โดยรักษาเหตุการณ์พร้อมกัน",
            steps: ["เหตุการณ์ทั้งสองกำลังเกิดในอดีต จึงเก็บ was + -ing", "เลื่อน While I was playing video games ขึ้นหน้าและคั่น comma ดูว่าใครทำกิจกรรมใด", "หากใช้ When my brother was making dinner ให้คง I was … ในประโยคหลัก เพื่อรักษาเหตุการณ์คู่เดิม"],
            answer: "While my brother was making dinner, I was playing a video game.",
            note: "เทียบแบบขั้นบันไดและคำอธิบายลูกศรหน้า 12"
          },
          {
            id: "harry-and-singing", title: "Harry Potter และการร้องเพลงเมื่ออารมณ์ดี", pdf: slides, pages: [13, 14, 15],
            prompt: "Compare how the slides change the clauses about Harry Potter and the woman who enjoys singing.",
            task: "ชี้สิ่งที่คงเดิมและคำที่ทำให้น้ำหนักเปลี่ยน",
            steps: ["Harry Potter เป็นคำนามที่ who is often referred to as … ขยาย การใช้ Wherever he goes … เพิ่มนัยว่าทุกที่ ควรเก็บ often และขอบเขต Wizarding World หากต้องการถอดความใกล้ต้นฉบับ", "ประโยคร้องเพลงวาง whenever she is in a happy mood เพื่อบอกเวลา ส่วน something she enjoys มี relative clause ที่ละ that ได้", "หน้า 15 เรียกตัวอย่างแรกว่า Noun Clause แต่ส่วนที่ไฮไลต์ขึ้นต้น whenever ทำหน้าที่ขยายเวลา ใช้หน้าที่ของ clause แยกอีกครั้งและคง enjoys แทนการเพิ่มระดับเป็น loves"],
            answer: "In the Wizarding World, Harry Potter is famous and is often known as the boy who lived. Whenever she feels happy, she enjoys singing.",
            note: "แนวถอดความประกอบ การจำแนก whenever อิงหน้าที่ทางไวยากรณ์ในประโยค"
          },
          {
            id: "stolen-wallet", title: "A Wallet Was Stolen · หลายรูปที่ใช้ได้", pdf: slides, pages: [16],
            prompt: "He is the man who stole my wallet. He must be punished.",
            task: "รวมสองประโยคและเก็บแรงของ must",
            steps: ["แยกข้อเท็จจริงเรื่องขโมยกระเป๋าออกจากความเห็นเรื่องการลงโทษ", "ใช้ so เป็นตัวเชื่อมข้อสรุป หรือ because เพื่อระบุเหตุโดยตรง", "หากใช้ What this man did … ให้ตรวจว่าเขียนการลงโทษเป็นความจำเป็นเหมือนต้นฉบับ"],
            answer: "Because he stole my wallet, he must be punished. หรือ That man stole my wallet, so he must be punished.",
            note: "แนวตอบเพิ่มจากตัวอย่าง Compound / Adverb / Noun Clause ในสไลด์"
          }
        ]
      },
      {
        id: "voice-and-tense", title: "Active and Passive Voice", pdf: slides, pages: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        summary: "อ่านภาพตัวอย่างเตะบอล ตาราง Verb Forms และรูปแบบ be + past participle ทบทวนเหตุผลใช้ Passive, การใส่ agent และทำกิจกรรมสองข้อ",
        points: [
          ["รูปประโยค", "ย้ายกรรมจาก Active ขึ้นเป็นประธาน Passive แล้วใช้ be ให้ตรง tense และ subject + past participle ส่วน by + agent ใช้เมื่ออยากระบุผู้ทำ"],
          ["ภาพหน้า 19", "I kicked the ball. → The ball was kicked (by me). ผู้เตะคนเดิม และการกระทำยังเป็นอดีต"],
          ["ตัวอย่างหน้า 18–23", "Chocolate is loved by everybody, A man was saved by the lifeguard และ My house is being painted by decorators แสดง present simple, past simple และ present continuous ตามลำดับ คู่ She is reading a book ต้องใช้ is being read หากต้องการคง continuous"],
          ["Verb Forms หน้า 22", "be–was/were–been, come–came–come, do–did–done, eat–ate–eaten, make–made–made, see–saw–seen, take–took–taken, write–wrote–written"],
          ["เหตุผล 4 แบบ หน้า 24–27", "เน้นการกระทำหรือจำนวนเงิน ผู้กระทำไม่รู้หรือไม่สำคัญ ผู้กระทำพอเดาได้ หรือประธานรับการกระทำ เช่น cakes were sold"],
          ["Agent หน้า 28–29", "ภาพสายลับเป็นมุกนำเข้า ในไวยากรณ์ agent คือผู้ทำ เช่น by Bill Gates, by John Taylor Thomas หรือ by Little Home Bakery"]
        ],
        examples: [{
          id: "passive-activity", title: "Activity หน้า 30 · เปลี่ยนสองประโยคเป็น Passive", pdf: slides, pages: [30],
          prompt: "Change “Aj. Brian is going to quiz us on scanning and skimming” and “The technician fixed my old television” into the passive voice.",
          task: "ย้ายกรรมเป็นประธานและรักษา going to กับ past simple",
          steps: ["us เมื่อขึ้นประธานกลายเป็น we ใช้ We are going to be + quizzed", "my old television เป็นเอกพจน์และ tense อดีต จึงใช้ was fixed", "สามารถเก็บผู้กระทำ Aj. Brian และ the technician ใน by-phrase"],
          answer: "1. We are going to be quizzed on scanning and skimming by Aj. Brian. 2. My old television was fixed by the technician.",
          note: "แนวเฉลยจากกิจกรรมปลายเปิดหน้า 30"
        }]
      },
      {
        id: "what-paraphrase-keeps", title: "Extra Notes and Common Mistakes", pdf: slides, pages: [31, 32, 33, 34],
        summary: "หน้า 31 ย้ำว่ามีหลายคำตอบ หน้า 32–33 เตือนเรื่องเปลี่ยน tense และเพิ่มข้อมูล หน้า 34 อ้างถึงงาน Paraphrasing Worksheet และ RS Worksheet #3",
        points: [
          ["Tense", "I am walking → I was walking ย้ายเวลาจากปัจจุบันไปอดีต จึงเปลี่ยนสารแม้ศัพท์เหมือนเดิม"],
          ["ข้อมูลใหม่", "บท Elvis บอกชื่ออัลบั้ม ลำดับ ชาร์ต และเดือน ไม่ได้บอกว่าทุกคนซื้อหรือทุกคนชอบ"],
          ["หน้า 34", "สไลด์ระบุแยกกันสองงานคือ DST Paraphrasing Worksheet และ RS Worksheet #3 พบไฟล์ Reading Skills Practice Sheet #3 ใน Lecture 11 แต่ยังไม่พบไฟล์แยกชื่อ DST Paraphrasing Worksheet ในชุดเอกสารที่แนบ วันที่ในสไลด์เป็นกำหนดตามเอกสารต้นฉบับ"]
        ],
        examples: [{
          id: "elvis-error", title: "แก้การถอดความที่เพิ่มเหตุผลเอง", pdf: slides, pages: [33],
          prompt: "The slide reports that Elvis Presley Forever debuted at No. 1 on Billboard’s Top Rock Albums chart in August 2015.",
          task: "ถอดความโดยคงคำว่าเปิดตัวอันดับหนึ่งและตัดสาเหตุที่ไม่ได้ระบุ",
          steps: ["เก็บชื่อ CD เวลา และชื่อชาร์ต", "ใช้ entered … at No. 1 เพื่อรักษาว่าเป็นอันดับตอนเปิดตัว", "ไม่เพิ่ม everyone bought it หรือ everyone liked it เพราะต้นฉบับไม่มีสองข้ออ้างนี้"],
          answer: "In August 2015, the CD Elvis Presley Forever entered Billboard’s Top Rock Albums chart at number one.",
          note: "แนวแก้จากข้อผิดพลาดในสไลด์ หน้า 34 ระบุใบงานสองรายการ โดยเปิด Reading Skills Practice Sheet #3 ที่พบได้จากลิงก์ด้านล่าง",
          references: [["ฝึกต่อ · Reading Skills Practice Sheet #3", "#itlg201/lecture-11/practice-paraphrase"]]
        }]
      },
      {
        id: "clauses-review", title: "Changing Clauses · จับหน้าที่จากประโยค", pdf: clauses, pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        summary: "เอกสารเสริมทบทวน Adverb, Adjective และ Noun Clauses พร้อมตัวอย่างที่ต้องแก้ไวยากรณ์ และตารางเปรียบเทียบหน้าที่หน้า 14",
        points: [
          ["Adverb Clause หน้า 2–5", "ขยายกริยา คุณศัพท์ หรือคำวิเศษณ์ บอกเวลา สถานที่ เหตุผล เงื่อนไข หรือความขัดแย้ง ตัวอย่าง Wednesday, รถเก่า, Kate คิดถึงแม่, พกกล้อง, รอพิซซ่า, ใส่เสื้อหนาว และผลการแข่งขัน"],
          ["Subordinating Conjunctions", "if = เงื่อนไข, because/since = เหตุในบริบทที่ให้เหตุ, when/while/as/before/after/until = เวลาในตัวอย่าง, although = ยอมรับข้อขัดแย้ง as she walked ในประโยคของสไลด์สื่อเหตุการณ์เกิดพร้อมกันได้ แม้สไลด์ติดป้าย Manner"],
          ["Despite / in spite of", "ตามด้วยคำนามหรือกลุ่มคำ เช่น despite the poor service ส่วน although ตามด้วย clause ที่มีประธานและกริยา"],
          ["Relative Clause หน้า 6–9", "ขยาย teacher, computer, car, book, man หรือ city เลือก who/whom สำหรับคน, which สำหรับสิ่งของ, that สำหรับคนหรือสิ่งของ, whose สำหรับความเป็นเจ้าของ, when สำหรับเวลา, where สำหรับสถานที่"],
          ["ตารางพิซซ่าหน้า 8", "The teacher recommended เป็นส่วนใน clause ขยาย pizza ทั้งกรณี pizza เป็นกรรมของ ate และกรณี Pizza เป็นประธานของ was delicious ละ that ในแบบ object relative ได้ในเนื้อหาไม่เป็นทางการ"],
          ["Noun Clause หน้า 10–13", "ทำเป็น subject, subject complement, direct object, indirect object หรือ object of a preposition เช่น What you said surprised me, I don’t know where she went และ She is interested in what you have to say"],
          ["คำขึ้นต้น Noun Clause", "หน้า 11 รวบรวม how, that, what, whatever, when, where, whether, which, whichever, who, whoever, whom, whomever, whose และ why ใน embedded question ใช้ลำดับประธานก่อนกริยา"],
          ["ตารางเปรียบเทียบหน้า 14", "that she is honest เป็นกรรมของ believe, who is wearing glasses ขยาย girl, because I was happy ให้เหตุผลแก่ smiled"]
        ],
        examples: [
          {
            id: "club-activities", title: "Try หน้า 4 · กิจกรรมชมรมหลังเลิกเรียน", pdf: clauses, pages: [4],
            prompt: "He participates in club activities after he’s done with classes every weekend.",
            task: "คงลำดับเหตุการณ์และคำว่า every weekend",
            steps: ["เหตุการณ์เรียนเสร็จก่อนกิจกรรม จึงคง after", "ย้าย dependent clause มาต้นและคั่น comma", "ใช้ takes part in แทน participates in และ finishes his classes แทน he’s done with classes"],
            answer: "After he finishes his classes each weekend, he takes part in club activities.",
            note: "แนวตอบเพิ่ม หน้า 2 ใช้ Wednesday แต่โจทย์หน้า 4 ใช้ every weekend"
          },
          {
            id: "relative-clause-models", title: "Relative Clause · Boss, James and the Dictionary", pdf: clauses, pages: [8, 9],
            prompt: "Use the dictionary bought at the mall for the exam as an example of changing relative-clause structure.",
            task: "อ่านตัวอย่าง boss/James แล้วเปลี่ยนโจทย์ Try ให้ถูกไวยากรณ์",
            steps: ["การแทน my boss → my manager, bought → purchased และ rich → wealthy ยังรักษาโครงเดิมเกือบทั้งหมด สไลด์จึงเขียน too similar", "ตัวอย่าง James ใช้ who is my friend หรือ whose name is James และเก็บสถานที่ราคาย่อมเยา กับเวลา yesterday", "ต้นฉบับโจทย์มี I was bought ซึ่งให้ประธานผิดบทบาท หากผู้พูดเป็นคนซื้อ ใช้ I bought the dictionary หรือ the dictionary was bought by me"],
            answer: "I bought this dictionary at the mall to use for my exam.",
            note: "แนวแก้โจทย์หน้า 9 โดยตีความว่าผู้พูดเป็นผู้ซื้อ"
          },
          {
            id: "noun-clause-models", title: "Noun Clauses · Pizzas, Climate, Decisions and a Movie", pdf: clauses, pages: [10, 11, 12, 13],
            prompt: "Compare the noun-clause examples on page 13, then paraphrase the blank movie suggestion.",
            task: "คงความหมายและแก้ลำดับคำในตัวอย่างที่พิมพ์คลาด",
            steps: ["Pizza: ใช้ We still don’t know how long it will take to make the pizzas. โดยใช้ it will take และ take รูปพื้นฐานหลัง will", "Climate: ใช้ I find what you’re saying about climate change very interesting. เก็บ climate change เพราะ global warming แคบกว่า และ Decision: Her chief difficulty was that she couldn’t decide.", "Movie: ใช้ suggest + that-clause หรือ suggest + -ing วลีคืนนี้และการไปด้วยกันต้องอยู่ในคำตอบ"],
            answer: "I suggest that we go to a movie tonight. หรือ I suggest going to a movie together tonight.",
            note: "แนวตอบเติมบรรทัดว่างและแก้ตัวอย่างไวยากรณ์ หน้า 13"
          }
        ]
      },
      {
        id: "clause-practice", title: "Paraphrasing Practice · โจทย์เดิมทั้งหกข้อ", pdf: clauses, pages: [15, 16],
        summary: "ฝึกตามสองหน้าในเอกสารเสริม อ่านความสัมพันธ์ก่อนเปลี่ยนโครงสร้าง อนุญาตหลายคำตอบหากรักษาสารและเวลา",
        points: [["ลำดับตรวจ", "ความสัมพันธ์เหตุ–ผล ความขัดแย้ง ข้อมูลใน relative clause เวลา ลักษณะคำรายงาน และเจ้าของสิ่งของ"]],
        examples: [
          {
            id: "clauses-page-15", title: "หน้า 15 · ไม่สบาย เข้านอน และเค้ก", pdf: clauses, pages: [15],
            prompt: "1. He didn’t study because he was sick, but he passed the test anyway. 2. She was tired, so she went to bed early. 3. The cake, which was chocolate, tasted amazing.",
            task: "ถอดความสามข้อโดยเก็บเหตุ ข้อขัดแย้ง และคุณสมบัติ",
            steps: ["ข้อ 1 illness เป็นเหตุที่ไม่ได้อ่านหนังสือ ส่วนการสอบผ่านเป็นผลสวนความคาดหมาย", "ข้อ 2 ความเหนื่อยมาก่อนการนอน ใช้ Because … นำเหตุผล", "ข้อ 3 ข้อมูลว่าเค้กเป็น chocolate เปลี่ยน relative clause ไปเป็นคำขยายได้"],
            answer: "1. Although he did not study because he was ill, he still passed the test. 2. Because she felt tired, she went to bed early. 3. The chocolate cake tasted wonderful.",
            note: "ตัวอย่างคำตอบที่วิเคราะห์เองสำหรับโจทย์ปลายเปิด"
          },
          {
            id: "clauses-page-16", title: "หน้า 16 · Tom, ห้องรก และสายจากลุง", pdf: clauses, pages: [16],
            prompt: "1. When Tom was a child, he thought that his toys could talk at night. 2. The person who cleans our house told me that my room was very messy. 3. The man who is my mother’s brother will call me tonight to ask whether I’ve been using my time wisely.",
            task: "ถอดความโดยคงว่าคำกล่าวเป็นความเชื่อหรือคำบอก และคงคืนนี้กับประเด็นการใช้เวลา",
            steps: ["ข้อ 1 ห้ามแปลง thought เป็น knew เพราะเด็กเพียงเชื่อว่าของเล่นคุยได้", "ข้อ 2 รวมคนที่ทำความสะอาดบ้านเป็น the person who does our housecleaning หรือ our house cleaner แล้วเก็บผู้รับคำพูด me", "ข้อ 3 my mother’s brother = my uncle on my mother’s side และ whether เปลี่ยนเป็น if ในคำถามทางอ้อมได้"],
            answer: "1. As a child, Tom believed his toys could speak at night. 2. Our house cleaner told me that my room was very untidy. 3. My uncle on my mother’s side will phone me tonight to ask if I’ve been using my time sensibly.",
            note: "ตัวอย่างคำตอบที่วิเคราะห์เองสำหรับโจทย์ปลายเปิด"
          }
        ]
      },
      {
        id: "article-types-and-skimming", title: "Identify the Purpose and Skim", pdf: skimming, pages: [1, 2, 3, 4, 5, 6, 7],
        summary: "สไลด์แบ่งบทอ่านสี่ประเภทจากจุดประสงค์ และภาพหน้า 7 แสดงว่าจะกวาดส่วนใดเพื่อจับใจความโดยไม่อ่านทุกคำ",
        points: [
          ["Persuasive", "ชวนให้เห็นด้วยหรือทำบางอย่าง มีจุดยืน เหตุผล หลักฐาน และคำชี้แนะ"],
          ["Entertainment", "เน้นโลกบันเทิง เช่น หนัง เพลง คนดัง และกระแสวัฒนธรรม เพื่อให้ข้อมูลและสร้างความสนใจ"],
          ["Informative", "เน้นให้ข้อเท็จจริงหรืออธิบายอย่างเป็นกลาง หน้า 5 จัดจุดประสงค์ กลุ่มผู้อ่าน และประเภทแหล่งเผยแพร่"],
          ["Warning", "เตือนความเสี่ยงหรืออันตรายและลดผลเสีย ตัวอย่างรวมความปลอดภัย การเรียกคืนสินค้า ภัยสภาพแวดล้อม การหลอกลวง และคำเตือนเดินทาง"],
          ["ภาพ How to Skim", "อ่านต้นเรื่องหรือย่อหน้าแรก อ่านประโยคต้นของแต่ละย่อหน้า 1–2 ประโยค มองคำหนุนใจความ ข้ามส่วนไม่สำคัญ แล้วอ่านย่อหน้าสุดท้ายให้ดี โดยเริ่มหา Topic Sentence ในช่วงต้นก่อน"]
        ],
        examples: []
      },
      {
        id: "pesticides-article", title: "Activity 1 · Potential Health Effects of Pesticides", pdf: pesticides, pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        summary: "ใช้เวลา 5 นาทีตามสไลด์หน้า 8–9 กวาดหัวข้อใหญ่เพื่อหาเจตนาบทอ่าน จากนั้นค้นคำเฉพาะ เช่น DANGER, POISON และ Seeking Medical Attention",
        points: [
          ["PDF 1–2 · Hazard, routes and acute effects", "บทอ่านให้ Hazard = Toxicity × Exposure แยกความเป็นพิษออกจากปริมาณสัมผัส สี่ทางคือผิวหนัง ทางหายใจ ปาก และตา LD50/LC50 เป็นตัวชี้วัดที่บทความใช้เปรียบเทียบ acute toxicity"],
          ["PDF 2–4 · Chronic effects and labels", "chronic หมายถึงผลจากการได้รับซ้ำระยะยาว สัญญาณ Category I คือ DANGER และ POISON สีแดงพร้อมกะโหลกไขว้ ส่วน II ใช้ WARNING และ III–IV ใช้ CAUTION บทความแยก DANGER ที่มีอย่างเดียวในบางกรณี และอ้าง MSDS กับ Table 1 ซึ่งไม่มีตารางแนบใน PDF นี้"],
          ["PDF 4–6 · Symptoms and response headings", "topical เกิดตรงที่สัมผัส เช่น dermatitis ส่วน systemic เกิดหลังสารกระจายเข้าสู่ร่างกาย บท Seeking Medical Attention ระบุช่วงเวลาที่อาการอาจมาช้า สายติดต่อ และบทบาทของฉลากหรือ MSDS"],
          ["PDF 6–8 · Pesticide Families", "ข้อความแยก fungicides กับ insecticides และอธิบายคำว่า synapse, acetylcholine, cholinesterase รวมถึง baseline และ periodic testing ตามบทอ่าน อ้าง Table 2/4 แต่ PDF ไม่ได้แนบตาราง"],
          ["PDF 9–10 · Exposure and Preventative Measures", "ผู้เขียนกลับไปย้ำสูตร Hazard และใช้หัวข้อ Dermal, Inhalation, Oral, Eyes จัดข้อมูล ก่อนสรุปบทบาท PPE ฉลาก และการลดการสัมผัส"]
        ],
        examples: [{
          id: "pesticide-five-answers", title: "เฉลย Activity 1 จากคำถามทั้งห้าข้อ", pdf: skimming, pages: [8, 9],
          prompt: "Identify the article type, topic sentence, thesis statement, warning color and symbol, and the phone number listed in the article.",
          task: "แบ่งคำถามใจความออกจากคำถามค้นรายละเอียด",
          steps: [
            "1 Type: Warning เป็นแนวตอบ เพราะบทเปิดเน้น potentially hazardous หัวข้อส่วนใหญ่เป็นผลเสีย การสังเกต และการลดความเสี่ยง Informative มีเหตุผลรองจากน้ำเสียงให้ข้อมูล",
            "2 Topic sentence: หน้า 1 ประโยคแรกขึ้น Because pesticides are toxic และแนะนำว่ามีอันตรายต่อมนุษย์ สัตว์ และสิ่งแวดล้อม",
            "3 Thesis statement: หน้า 1 ประโยคหลัง Therefore ระบุทั้งสิ่งที่ผู้ใช้ต้องเข้าใจ ได้แก่ relative toxicity, potential health effects และ preventative measures",
            "4 Scan หน้า 3 หาคำ POISON/DANGER พบ printed in red และ skull and crossbones",
            "5 Scan หน้า 5 หาหัวข้อ Seeking Medical Attention และบรรทัด National Poison Center ได้ 1-800-222-1222 ตามเอกสาร"
          ],
          answer: "1. Warning. 2. The opening sentence beginning “Because pesticides are toxic …”. 3. The next sentence beginning “Therefore, people who use pesticides …”. 4. Red and a skull and crossbones. 5. 1-800-222-1222 as stated in the reading.",
          note: "แนวเฉลยที่วิเคราะห์จากบทอ่าน ไม่มีเฉลยทางการในสไลด์ ใช้หน้า 1, 3 และ 5 ของบทอ่านเป็นหลักฐานโดยตรง เปิด PDF และข้อความอังกฤษจากดัชนี Lecture 8 ได้",
          references: [["อ่านคำอธิบายภาษาไทยครบทุกย่อหน้าใน Lecture 12", "#itlg201/lecture-12/pesticide-risk"]]
        }]
      },
      {
        id: "five-article-activity", title: "Activity 2 · Skim Five Articles", pdf: skimming, pages: [10],
        summary: "สไลด์ให้ใช้เวลา 6 นาทีแยกบทอ่านห้าเรื่อง อ่านหัวเรื่อง คำโปรย หัวข้อย่อย และย่อหน้าสรุป พิจารณาวัตถุประสงค์ก่อนเลือกประเภท",
        points: [["การชี้หลักฐาน", "ตอบเป็นประเภทพร้อมคำหรือโครงข้อความที่บอกเจตนา เช่น shouldn’t เป็นข้อเสนอ, risks เป็นคำเตือน และ headings จัดข้อมูลเป็นหมวด"]],
        passages: [
          article("recycling-paragraphs", "อ่านตามย่อหน้า · How to Recycle and Why You Should Do It", recycling, [1, 2, 3], [
            [1, "The recycling rate in the United States has increased", "อัตรารีไซเคิลสหรัฐสูงขึ้นจากต่ำกว่า 7% ในปี 1960 เป็นมากกว่า 34% ในปี 2015 แต่ยังพัฒนาได้อีก บทความจะช่วยเริ่มแยกวัสดุที่บ้าน ที่ทำงาน และโรงเรียน", "เปิดเรื่องด้วยแนวโน้มและประกาศจุดประสงค์", ["promising = มีแนวโน้มดี"]],
            [1, "Why should we recycle?", "เปลี่ยนวัสดุเก่าเป็นของใหม่ช่วยประหยัดทรัพยากรและพลังงาน ลดขยะไปหลุมฝังกลบ และลดผลกระทบต่อสัตว์ป่า", "Importance · เหตุผลด้านสิ่งแวดล้อม", ["landfill = พื้นที่ฝังกลบขยะ"]],
            [1, "Recycling also helps create well-paying jobs.", "งานศึกษาปี 2016 ที่อ้างเชื่อมการรีไซเคิลและการใช้ซ้ำกับงาน 757,000 ตำแหน่งในสหรัฐ", "Importance · เหตุผลด้านงาน", ["accounted for = คิดเป็น"]],
            [1, "We can all make a difference by practicing proper recycling.", "ทุกคนมีส่วนได้ ข้อความที่ยกจากหน่วยงานท้องถิ่นเชื่อมการเก็บวัสดุในชุมชนเข้ากับผลกระทบระดับโลก", "Importance · ชวนลงมือ", ["make a difference = สร้างความเปลี่ยนแปลง"]],
            [1, "The main barrier to recycling is understanding the process.", "อุปสรรคคือไม่รู้ว่าวัสดุอะไรส่งได้และส่งที่ไหน ระเบียบของแต่ละเมืองจึงเป็นข้อมูลที่ต้องหาก่อน", "How to Recycle · เปลี่ยนจากเหตุผลไปสู่วิธีทำ", ["barrier = อุปสรรค"]],
            [2, "There are a number of places that you can set-up for easy recycling.", "สามารถจัดจุดแยกวัสดุได้หลายแห่ง ส่วนระบบรับจากบ้านขึ้นกับข้อกำหนดของเมือง", "Where to Recycle · เริ่มจากพื้นที่ของตัวเอง"],
            [2, "Check with their recycling department", "สอบถามหน่วยงานเรื่องภาชนะ เวลาและวิธีเก็บ วัสดุที่รับ การนัดรับขยะอิเล็กทรอนิกส์หรือโลหะ และเงื่อนไขที่ทำให้วัสดุถูกปฏิเสธ", "รายการคำถามห้าข้อก่อนใช้บริการ", ["special pickup = นัดรับเฉพาะ"]],
            [2, "You may also want to browse", "บทอ่านแนะนำฐานข้อมูลค้นจุดรับในอเมริกาเหนือโดยกรอกวัสดุและรหัสไปรษณีย์ การรู้ทางเลือกทำให้ลงมือได้ง่ายขึ้น", "แหล่งค้นจุดรับ", ["drop-off center = จุดรับวัสดุ", "follow-through = การทำต่อจนสำเร็จ"]],
            [2, "The most common recyclables include paper, batteries, plastics, and glass.", "เกริ่นวัสดุที่พบทั่วไปและกล่าวว่ามีบางชนิดที่รีไซเคิลไม่ได้ หัวข้อ What to Recycle ปรากฏซ้ำสองครั้งพร้อมใจความเดิมบนหน้านี้", "บทนำเข้าสู่หมวดวัสดุ"],
            [2, "paper products make up the largest percentage (26%)", "บทอ่านระบุว่ากระดาษมีสัดส่วน 26% ของวัสดุขยะในสหรัฐ ยกนิตยสาร กล่อง และจดหมายเป็นตัวอย่างที่ควรแยก", "Paper · ตัวเลขและตัวอย่าง"],
            [2, "Progress on plastic recycling has been slow", "บทอ่านเทียบการรีไซเคิลพลาสติกจากต่ำกว่า 1% ในปี 1970 กับ 9% หลังผ่าน 45 ปี และให้ช่วงเวลาย่อยสลาย 5–600 ปี", "Plastic · ตัวเลขชี้ความคืบหน้าช้า", ["break down = ย่อยสลาย"]],
            [3, "Only 1% of glass in the United States was recycled in 1970.", "อัตราที่บทอ่านอ้างเพิ่มจาก 1% เป็น 26% ในปี 2015 ขวดและกระปุกเป็นตัวอย่างภาชนะที่นำมาล้างก่อนส่งได้", "Glass · แนวโน้มและตัวอย่าง", ["rinse = ล้างน้ำ"]],
            [3, "You can recycle those soup cans, soda cans, and even aluminum foil!", "กระป๋องและฟอยล์เป็นตัวอย่างโลหะที่บทอ่านให้แยก เศษอาหารควรเอาออกก่อน บทอ่านอ้างว่าทิ้งอะลูมิเนียมราว 2.7 ล้านตันต่อปีและรีไซเคิลเพียงครึ่งหนึ่ง", "Metals · ตัวอย่างและข้อสังเกตเรื่องความสะอาด"],
            [3, "car batteries are the most recycled product in America", "ยกแบตเตอรี่รถยนต์เป็นตัวอย่างเด่น แล้วชวนตรวจชนิดของแบตเตอรี่ก่อนหาจุดรับ", "Batteries · จำแนกชนิดและหาแหล่งรับ"],
            [3, "only 20% of e-waste was recycled in 2016", "บทอ่านอ้างว่าราวหนึ่งในห้าของขยะอิเล็กทรอนิกส์ทั่วโลกถูกรีไซเคิลในปี 2016 โทรศัพท์ คอมพิวเตอร์ และทีวีอาจมีสารอันตราย จึงควรจัดการอย่างเหมาะสม", "Electronics · สถิติและเหตุผล", ["dispose of = จัดการทิ้ง"]],
            [3, "Even masters of recycling can find room for improvement.", "ผู้เขียนชวนคนที่แยกขยะอยู่แล้วให้ปรับวิธี ก่อนเข้าสู่แปดข้อแนะนำ", "Tips · เกริ่นนำรายการ"],
            [3, "Make sure it’s clean!", "สิ่งสกปรกชิ้นเดียวอาจปนเปื้อนทั้งกอง ทำให้วัสดุที่ควรรีไซเคิลกลับไปฝังกลบ", "Tips 1 · ความสะอาด", ["contaminate = ทำให้ปนเปื้อน"]],
            [3, "Flatten cardboard.", "พับหรือกดกล่องให้แบนเพื่อเพิ่มพื้นที่ในถัง", "Tips 2 · ลดปริมาตร"],
            [3, "Set up designated recycling containers", "จัดถังสำหรับวัสดุรีไซเคิลไว้ที่บ้าน ที่ทำงาน หรือโรงเรียน", "Tips 3 · เตรียมจุดแยก"],
            [3, "Look for products made out of recycled materials", "เลือกซื้อสินค้าที่ใช้วัสดุรีไซเคิล", "Tips 4 · หมุนเวียนวัสดุ"],
            [3, "Identify which types of plastic", "ตรวจชนิดพลาสติกที่อาคารและชุมชนรับจริง", "Tips 5 · เช็กกติกาท้องถิ่น"],
            [3, "think about reducing your waste and re-using items", "คิดวิธีลดขยะและใช้ของซ้ำก่อนส่งไปรีไซเคิล", "Tips 6 · ลดและใช้ซ้ำ"],
            [3, "Local artists and schools might be able to use your materials", "วัสดุบางอย่างอาจใช้ทำงานศิลปะหรือกิจกรรมการเรียนในชุมชนได้", "Tips 7 · ให้ผู้อื่นนำไปใช้"],
            [3, "Spread the word!", "ชวนคนรอบตัวเข้าร่วม เป็นร่องรอยเจตนาชักชวนท้ายเรื่อง", "Tips 8 · ชวนให้ทำร่วมกัน"]
          ]),
          article("dogs-paragraphs", "อ่านตามย่อหน้า · Dogs Are Not Here for Our Convenience", dogs, [1, 2], [
            [1, "Spaying and neutering puppies shouldn’t be standard policy", "คำโปรยแสดงจุดยืนคัดค้านการบังคับทำหมันลูกสุนัขเป็นมาตรฐาน และตั้งคำถามว่าทางเลือกนี้แปลว่ารับผิดชอบเสมอหรือไม่", "คำโปรยและจุดยืน", ["spay / neuter = ทำหมัน"]],
            [1, "I’ve never lived with a dog with testes or ovaries.", "ผู้เขียนเล่าการรับสุนัขจากศูนย์พักพิงที่มักทำหมันก่อนให้คนรับเลี้ยง จึงไม่เคยต้องตัดสินใจเรื่องการสืบพันธุ์ของสุนัขเอง", "ย่อหน้า 1 · เปิดด้วยประสบการณ์", ["shelter = ศูนย์พักพิง"]],
            [1, "has become the automatic mantra", "ผู้เขียนอธิบายว่าทำไมการทำหมันกลายเป็นคำตอบที่พูดซ้ำ โดยยกภาพสุนัขที่พบระหว่างเดินเล่นเทียบกับจำนวนสุนัขที่ถูกทำให้ตายตามที่บทความอ้าง", "ย่อหน้า 2 · ปัญหาที่นโยบายพยายามแก้", ["mantra = คำที่พูดซ้ำติดปาก", "euthanized = ถูกทำให้ตายโดยเจตนาในบริบทนี้"]],
            ["1–2", "It’s our species’ fault.", "ผู้เขียนโยงการที่สุนัขพึ่งมนุษย์เข้ากับความรับผิดชอบของมนุษย์ และยกการปล่อยหรือเลิกเลี้ยงว่าเป็นส่วนหนึ่งของปัญหาสุนัขเกินจำนวน", "ย่อหน้า 3 · เสนอรากของปัญหาตามมุมผู้เขียน", ["accountable = รับผิดชอบต่อผล"]],
            [2, "To solve the problem of our unwillingness to keep track of our dogs", "ผู้เขียนมองว่าการผ่าตัดสุนัขตัวใหม่ตั้งแต่อายุยังน้อยเป็นการเปลี่ยนจุดไปจากความรับผิดชอบในการดูแลและควบคุมจำนวน", "ย่อหน้า 4 · โต้ตรรกะของแนวทางเดิม", ["non sequitur = ข้อสรุปที่ไม่ตามมาจากเหตุผล"]],
            [2, "Spay-neuter is so widely accepted", "บทความยกแรงกดดันที่เชื่อมการทำหมันกับความรับผิดชอบ เช่น การปฏิเสธสุนัขที่ยังไม่ทำหมันในสถานรับเลี้ยงกลางวันหรือสวนบางแห่ง", "ย่อหน้า 5 · ยกตัวอย่างแรงกดดันทางสังคม", ["rebuffed = ถูกปฏิเสธ", "intact = ยังไม่ได้ทำหมัน"]],
            [2, "But I need to bring it up.", "ผู้เขียนเปลี่ยนเข้าสู่เหตุผลว่าทำไมต้องหยิบประเด็นมาพูด คือกังวลผลต่อตัวสุนัข สุขภาพ และพฤติกรรม", "ย่อหน้า 6 · หัวเลี้ยวของข้อโต้แย้ง", ["bring up = ยกขึ้นมาพูด", "to its peril = เสี่ยงก่ออันตรายแก่สิ่งนั้น"]],
            [2, "There are alternative ways to treat our animals.", "ผู้เขียนบอกว่ามีวิธีอื่นและยอมรับว่าอาจหาได้ยากกว่าการทำหมันตามปกติ", "ย่อหน้า 7 · ทางเลือกและข้อจำกัด", ["routine = ที่ทำเป็นกิจวัตร"]]
          ]),
          article("sea-paragraphs", "อ่านตามย่อหน้า · Turns Out Swimming in the Sea Is Actually Kind of Bad for You", sea, [1, 2], [
            [1, "Dunking around in the sea can feel like a rebirth", "เปิดด้วยภาพความสดชื่นและการลืมความกังวลชั่วคราว เพื่อปูให้เห็นความต่างกับหลักฐานถัดไป", "ย่อหน้า 1 · ดึงความสนใจ", ["oblivious to = ไม่รับรู้"]],
            [1, "substantially more likely to get stomach bugs", "But เปลี่ยนจากความรู้สึกดีไปสู่งานวิเคราะห์ที่เชื่อมการลงน้ำทะเลกับโรคทางท้อง อาการปวดหู และการติดเชื้อ", "ย่อหน้า 2 · ข้อค้นพบหลัก"],
            [1, "swimming in the sea doubled the odds", "บทอ่านบอกว่า odds ปัญหาหูทั่วไปเพิ่มสองเท่า ปวดหูเพิ่ม 77% และโรคทางเดินอาหารเพิ่ม 29% รวมทั้งกล่าวว่าการไม่จุ่มหัวไม่เปลี่ยนผลตามที่รายงาน", "ย่อหน้า 3 · ตัวเลขสนับสนุน", ["odds = อัตราส่วนโอกาสเกิดต่อโอกาสไม่เกิด"]],
            [2, "Going by strict inclusion criteria", "ผู้วิจัยใช้ 19 จากงานที่อาจเข้าข่าย 6,919 ชิ้นตามเกณฑ์คัดเลือก และครอบคลุมหลายประเทศ", "ย่อหน้า 4 · วิธีคัดหลักฐาน", ["inclusion criteria = เกณฑ์รับเข้า"]],
            [2, "Australia's coasts are subject to rubbish", "ยกขยะ น้ำเสีย ของเสียอุตสาหกรรม การขุดลอก และเศษพลาสติกเป็นตัวอย่างบริบทด้านมลพิษชายฝั่ง", "ย่อหน้า 5 · สภาพแวดล้อม", ["dredging = การขุดลอก"]],
            [2, "People tend to assume developed nations have cleaner seas", "ยกความเชื่อที่คนมักมี แล้วใช้ However บอกว่าผลวิเคราะห์ยังพบมลพิษกระทบคนลงน้ำในประเทศร่ำรวย", "ย่อหน้า 6 · เทียบความเชื่อกับข้อค้นพบ", ["tend to assume = มักคาดไว้ก่อน"]],
            [2, "make informed decisions", "นักวิจัยยอมรับประโยชน์ของการลงทะเล และต้องการให้คนรู้ความเสี่ยงเพื่อประกอบการตัดสินใจ", "ย่อหน้า 7 · กำหนดน้ำหนักคำเตือน", ["informed decision = การตัดสินใจโดยมีข้อมูล"]],
            [2, "Most people will recover from infections without medical treatment", "บทอ่านแยกคนส่วนใหญ่จากกลุ่มที่อาจได้รับผลรุนแรงกว่า เช่น เด็ก ผู้สูงอายุ และผู้มีภาวะสุขภาพเดิม แล้วสรุปว่างานปรับคุณภาพน้ำยังสำคัญ", "ย่อหน้า 8 · ข้อจำกัดและบทสรุป", ["vulnerable = เปราะบางหรือเสี่ยงต่อผลกระทบ"]]
          ]),
          article("coffee-paragraphs", "อ่านตามย่อหน้า · Coffee’s Source of Nutrition", coffee, [1, 2, 3, 4], [
            [1, "Coffee lovers around the world who reach for their favorite morning brew", "เปิดจากกิจวัตรดื่มกาแฟเข้าสู่ข้อถกเถียงสุขภาพ บทอ่านเทียบการจัดกลุ่มเมื่อปี 1991 กับข้อสรุปเมื่อปี 2016 ซึ่งพิจารณาประวัติการสูบบุหรี่ด้วย แล้วใช้คำถามเรื่องฉลากปี 2018 ชวนอ่านความซับซ้อน", "บทนำ · วางคำถามและบริบท", ["morning brew = กาแฟที่ชงตอนเช้า", "carcinogen = สารก่อมะเร็ง", "account for = นำมาพิจารณา"]],
            [1, "Caffeine", "เป็นสารที่รายการแรกระบุว่าพบในกาแฟ", "Source Of · รายการ 1"],
            [1, "Vitamin B2 (riboflavin)", "Riboflavin คือชื่ออีกแบบของวิตามินบี 2 ตามรายการ", "Source Of · รายการ 2"],
            [1, "Magnesium", "แมกนีเซียมเป็นแร่ธาตุที่ระบุในรายการนี้", "Source Of · รายการ 3"],
            [1, "Plant chemicals: polyphenols", "ยก chlorogenic acid และ quinic acid รวมถึง diterpenes อย่าง cafestol และ kahweol เป็นตัวอย่างสารจากพืช", "Source Of · รายการ 4"],
            [2, "One 8-ounce cup of brewed coffee contains about 95 mg of caffeine.", "ต้นหน้าให้ค่าประมาณคาเฟอีนราว 95 มก. ต่อถ้วยชง 8 ออนซ์ ส่วน 3–5 ถ้วยหรือเฉลี่ย 400 มก. เป็นนิยามปริมาณปานกลางที่บทอ่านอ้างจากแนวทางที่ระบุ", "Source Of · ตัวเลขและหน่วย", ["brewed coffee = กาแฟชง", "moderate = ปานกลาง"]],
            [2, "Coffee is an intricate mixture", "กาแฟมีสารหลายชนิดและต่างกันตามเมล็ด การคั่ว การบด การชง และตัวบุคคล บทอ่านเทียบความตื่นตัวเมื่อรับคาเฟอีนบางระดับกับผลที่อาจพบเมื่อได้รับสูงขึ้น และตั้งคำถามว่าสารใดมีส่วน", "Coffee and Health · อธิบายปัจจัยและตั้งคำถามต่อ", ["intricate = ซับซ้อน", "alertness = ความตื่นตัว", "insomnia = นอนไม่หลับ"]],
            [2, "Coffee beans are the seeds of a fruit called a coffee cherry.", "เมล็ดกาแฟมาจากผลที่เรียกว่า coffee cherry พืชสกุล Coffea มีหลายชนิดตั้งแต่ไม้พุ่มถึงไม้ต้น", "Types · เกริ่นแหล่งที่มาของเมล็ด"],
            [2, "Type of bean", "Arabica มีต้นกำเนิดจากเอธิโอเปีย รสค่อนข้างนุ่มและปลูกยากกว่าเพราะไวต่อสภาพแวดล้อม ส่วน Robusta ปลูกคุ้มกว่า ทนโรคและสภาพอากาศได้กว้างกว่า", "Types · เปรียบเทียบสายพันธุ์"],
            ["2–3", "Type of roast", "เริ่มจากเมล็ดสีเขียว คั่วด้วยความร้อนเพื่อเปลี่ยนกลิ่นและรส แบบอ่อนเปรี้ยวกว่า แบบเข้มขมกว่า ส่วน French roast เป็น medium-dark ตามการแบ่งในบทอ่าน", "Types · การคั่วและผลต่อรส", ["acidity = ความเป็นกรดหรือรสเปรี้ยว"]],
            [3, "Type of grind", "ระดับบดปานกลางเหมาะกับเครื่องดริป บดละเอียดใช้กับเอสเปรสโซ และบดหยาบใช้กับที่กดกาแฟตามตัวอย่าง", "Types · เลือกความละเอียดตามวิธีชง"],
            [3, "Decaffeinated coffee", "บทอ่านอธิบายสองแนวทางลดคาเฟอีนโดยใช้ตัวทำละลายหรือคาร์บอนไดออกไซด์ และอ้างเกณฑ์เอาออกอย่างน้อย 97% สำหรับฉลากในสหรัฐ จึงอาจมีคาเฟอีนเหลือและรสเปลี่ยน", "Types · วิธีลดคาเฟอีนและข้อจำกัด", ["trace amounts = ปริมาณตกค้างเพียงเล็กน้อย"]],
            [3, "Place beans or ground coffee in an airtight opaque container", "เก็บในภาชนะทึบและปิดสนิท ระวังแสง ความชื้น อากาศ และความร้อนซึ่งกระทบรส", "Store ข้อ 1 · เก็บที่อุณหภูมิห้อง", ["airtight = ป้องกันอากาศเข้า", "opaque = ทึบแสง"]],
            [3, "Coffee can be frozen if stored in a very airtight container.", "เก็บแช่แข็งได้หากภาชนะปิดสนิทมาก อากาศที่เข้าอาจก่อ freezer burn และลดคุณภาพ", "Store ข้อ 2 · เงื่อนไขแช่แข็ง"],
            [3, "Follow directions on the coffee package and your coffee machine", "ให้ยึดคำแนะนำของผลิตภัณฑ์กับเครื่องชง โดยมีสัดส่วนทั่วไปที่ยกไว้คือกาแฟบด 1–2 ช้อนโต๊ะต่อน้ำ 6 ออนซ์", "Make ข้อ 1 · สัดส่วนการชง"],
            [3, "For optimal coffee flavor, drink soon after brewing.", "ผู้เขียนแนะนำให้ดื่มหลังชงไม่นานเพื่อรสที่ดีที่สุด เพราะรสลดลงเมื่อเวลาผ่าน", "Make ข้อ 2 · เวลาหลังชง", ["optimal = เหมาะที่สุด"]],
            [3, "Use ground coffee within a few days and whole beans within two weeks.", "บทอ่านแยกเวลาที่แนะนำให้ใช้กาแฟบดภายในไม่กี่วัน ส่วนเมล็ดทั้งเมล็ดภายในสองสัปดาห์", "Make ข้อ 3 · ระยะเวลาใช้งาน"],
            [4, "It is a myth that darker roasts contain a higher level of caffeine", "แก้ความเชื่อว่าคั่วเข้มมีคาเฟอีนมากกว่า โดยบทอ่านระบุว่าคั่วอ่อนมีความเข้มข้นสูงกว่าเล็กน้อย", "Did You Know? ข้อ 1 · แก้ความเชื่อ", ["myth = ความเชื่อที่คลาดเคลื่อนในที่นี้"]],
            [4, "Coffee grinds should not be brewed more than once.", "กากที่ผ่านการชงอาจให้รสขมหรือรสที่ไม่ดีเมื่อชงซ้ำตามที่บทอ่านอธิบาย", "Did You Know? ข้อ 2 · การชงซ้ำ"],
            [4, "coffee can count towards your daily fluid goals", "บทอ่านยกน้ำเป็นทางเลือกดีที่สุดสำหรับดับกระหาย และกล่าวว่าของเหลวจากกาแฟนับรวมได้ โดยน้ำในเครื่องดื่มชดเชยผลขับปัสสาวะเล็กน้อย", "Did You Know? ข้อ 3 · ของเหลว", ["diuretic effect = ผลช่วยขับปัสสาวะ", "offset = ชดเชย"]]
          ]),
          article("dragon-paragraphs", "อ่านตามย่อหน้า · Dragon Ball Super: Super Hero", dragon, [1, 2, 3], [
            [1, "isn’t afraid to spend quiet time away from the battles", "คำโปรยบอกว่าหนังยอมพักฉากต่อสู้เพื่อให้เวลากับตัวละครโปรด เป็นกรอบของบทวิจารณ์", "คำโปรย · ตั้งประเด็นประเมินหนัง"],
            [1, "If you had or were a child during the late 90s and early 00s", "ผู้วิจารณ์ชวนระลึกถึงความคุ้นเคยกับ Goku และสูตรเล่าเรื่องที่แฟนเก่ารู้จัก หนังใช้ประวัติยาวนานเป็นจุดแข็งและผู้วิจารณ์มองว่าสนุกได้ทั้งแฟนเดิมและผู้ชมใหม่", "ย่อหน้า 1 · เชื่อมบริบทแฟรนไชส์กับคำประเมิน", ["legacy = สิ่งที่สืบต่อมา", "trope = แบบแผนที่เรื่องใช้บ่อย"]],
            ["1–2", "centers around Gohan enjoying some quiet time on Earth", "เกริ่นว่า Gohan อยู่บนโลกอย่างสงบ ส่วน Goku, Vegeta และ Broly กำลังฝึกบนดาวอีกแห่ง ความสงบจบลงเมื่อ Red Ribbon Army กลับมาสร้างแอนดรอยด์สองตัวเพื่อแก้แค้น", "ย่อหน้า 2 · ย่อเนื้อเรื่องตั้งต้น", ["revived = กลับมาอีกครั้ง", "take revenge = แก้แค้น"]],
            [2, "One of Dragon Ball Super: Super Hero’s greatest merits", "จุดแข็งตามผู้วิจารณ์คือ Toriyama ผู้สร้างเรื่องร่วมเขียน ทำให้พฤติกรรมตัวละครยังน่าเชื่อสำหรับแฟนแม้รูปลักษณ์เปลี่ยนเป็น 3D", "ย่อหน้า 3 · เหตุผลรองรับคำชม", ["merit = จุดดี", "die-hard fan = แฟนที่เหนียวแน่น"]],
            [2, "Toriyama and director Tetsuro Kodama are so confident", "บทเปิดใช้เวลากับฝ่ายตรงข้ามก่อนตัวละครโปรด ผู้วิจารณ์ชมว่าปูพล็อตและลักษณะตัวร้ายได้ดี และมองการพลิกความคาดหมายเป็นคุณสมบัติเด่น", "ย่อหน้า 4 · ยกโครงบทเปิดเป็นตัวอย่าง", ["subversion of expectation = การพลิกจากสิ่งที่คาด"]],
            [2, "As the movie progresses, it throws curveballs", "ชมการหักเรื่อง บุคลิกของ Gamma 1/2 มุกขำ ตัวละครรับเชิญ และการตัดฉากต่อสู้ให้กระชับต่างจากข้อวิจารณ์เดิมของซีรีส์", "ย่อหน้า 5 · รายละเอียดสนับสนุน", ["curveball = สิ่งที่พลิกจากที่คาด", "cameo = การปรากฏตัวสั้น ๆ"]],
            [2, "is also clever in grounding its characters", "Gohan ยอมรับว่าห่างการฝึกเพราะอยากเรียน ส่วน Vegeta ทักท้วงสไตล์ต่อสู้ของ Goku เหตุการณ์เหล่านี้ให้ตัวละครมีแรงจูงใจกับข้อจำกัดที่เข้าใจได้", "ย่อหน้า 6 · วิเคราะห์ตัวละคร", ["grounding = ทำให้สมจริง", "calls out = ทักท้วง"]],
            ["2–3", "The biggest problem of Dragon Ball Super: Super Hero", "ผู้วิจารณ์มองว่าหนังยังกลับไปใช้สูตรแปลงร่างและค้นพบพลังใหม่ตอนท้าย แม้จะเปลี่ยนวิธีเดินเรื่องและศักยภาพของตัวร้าย", "ย่อหน้า 7 · ระบุข้อวิจารณ์หลัก", ["scenic route = ทางอ้อมในเชิงเปรียบเทียบ"]],
            [3, "is a fun movie that knows how to use its humor", "บทสรุปชมมุก ฉากต่อสู้ และเวลาให้พล็อตกับตัวละคร ความสนุกในสายตาผู้วิจารณ์สัมพันธ์กับการใส่ใจตัวละครเหล่านั้น", "ย่อหน้า 8 · ประเมินภาพรวม"]
          ])
        ],
        examples: [
          {
            id: "recycling-type", title: "How to Recycle and Why You Should Do It", pdf: recycling, pages: [1, 2, 3],
            prompt: "What is the article's main purpose and which type best fits?",
            task: "เทียบบทนำ เหตุผล และคำแนะนำในหัวข้อย่อย",
            steps: ["หน้า 1 อ้างอัตรารีไซเคิลสหรัฐจากต่ำกว่า 7% ในปี 1960 ไปกว่า 34% ในปี 2015 และยกประโยชน์ต่อทรัพยากร พลังงาน สัตว์ป่า ขยะและงาน", "หน้า 2–3 ให้เช็กกฎท้องถิ่นและแบ่งวัสดุเป็น paper, plastic, glass, metals, batteries, electronics ทั้งมีคำแนะนำเรื่องทำความสะอาด พับกล่อง ลดและใช้ซ้ำ", "ชื่อ Why You Should Do It, We can all make a difference และ Spread the word ชวนให้ลงมือ เหตุผลเชิงข้อมูลรองรับข้อชวน"],
            answer: "Persuasive is a defensible primary label because the article explicitly encourages recycling. It also informs readers how to recycle.",
            note: "แนวจัดประเภทจากหลักฐาน หากให้ความสำคัญกับโครง how-to มากกว่า อธิบาย Informative ได้โดยยกเหตุผล สไลด์ไม่ให้เฉลยตายตัว"
          },
          {
            id: "dogs-type", title: "Dogs Are Not Here for Our Convenience", pdf: dogs, pages: [1, 2],
            prompt: "Classify the article and support your answer with its position and reasoning.",
            task: "แยกเสียงผู้เขียนออกจากความเห็นสังคมที่ผู้เขียนกำลังวิจารณ์",
            steps: ["คำโปรยหน้า 1 ใช้ shouldn’t be standard policy ตั้งจุดยืนเรื่องการทำหมันลูกสุนัข ตามด้วยประสบการณ์ส่วนตัวและเหตุผลเดิมของนโยบาย", "หน้า 2 โต้ว่าเจ้าของควรรับผิดชอบเรื่องการดูแล และเสนอว่าการผ่าตัดกระทบร่างกายหรือพฤติกรรม ตามด้วยการกล่าวถึงทางเลือก", "สังเกต bring up ในหน้า 2 ใช้ในความหมายยกประเด็นขึ้นมาพูด"],
            answer: "Persuasive. The author challenges routine early spaying/neutering and argues for considering its effects and alternatives.",
            note: "สรุปจุดยืนของผู้เขียนเพื่อจำแนกประเภทบทอ่าน"
          },
          {
            id: "sea-type", title: "Turns Out Swimming in the Sea Is Actually Kind of Bad for You", pdf: sea, pages: [1, 2],
            prompt: "Choose the strongest article type and explain how the closing paragraphs qualify its warning.",
            task: "อ่านคำนำ ตัวเลข และคำพูดท้ายเรื่อง",
            steps: ["หน้า 1 ยก odds ของ general ear ailments เป็นสองเท่า earache เพิ่ม 77% และ gastrointestinal illness เพิ่ม 29% ตามงานวิเคราะห์ที่บทอ่านอ้าง", "หน้า 2 ระบุใช้ 19 จาก 6,919 งานที่อาจเข้าข่าย พูดถึงมลพิษในหลายประเทศและความเชื่อเรื่องทะเลประเทศพัฒนาแล้ว", "ตอนท้ายระบุว่าไม่เจตนาห้ามลงทะเล แต่ต้องการให้ผู้อ่านรู้ความเสี่ยงและตัดสินใจได้"],
            answer: "Warning. It alerts swimmers to possible health effects while asking them to make informed decisions.",
            note: "ตัวเลขเป็น odds ตามที่บทอ่านรายงาน และเป็นหลักฐานจำแนกประเภท",
            references: [["อ่านฉบับคู่และโจทย์วิเคราะห์ · Lecture 12", "#itlg201/lecture-12/sea-research"]]
          },
          {
            id: "coffee-type", title: "Coffee’s Source of Nutrition", pdf: coffee, pages: [1, 2, 3, 4],
            prompt: "Which article type best describes this source, and which headings support your classification?",
            task: "หาเจตนาจากโครงทั้งสี่หน้าแม้บทนำพูดถึง warning label",
            steps: ["หน้า 1 อธิบายประวัติข้อถกเถียงและแหล่งสาร เช่น caffeine, riboflavin, magnesium และสารจากพืช", "หน้า 2–3 Coffee and Health / Types จัดข้อมูล Arabica เทียบ Robusta การคั่ว บด และ decaffeinated ส่วน Store กับ Make แนะนำการเก็บและชง", "หน้า 4 Did You Know? แก้ความเชื่อเรื่องระดับคาเฟอีน การต้มกากซ้ำ และกล่าวถึงการนับของเหลว"],
            answer: "Informative. Source Of, Coffee and Health, Types, Store, Make and Did You Know? organize an explanation about coffee.",
            note: "ผู้เขียนยกฉลากเตือนเป็นบริบทหนึ่งของเรื่อง จุดมุ่งหมายรวมคือให้ข้อมูล"
          },
          {
            id: "dragon-type", title: "Dragon Ball Super: Super Hero", pdf: dragon, pages: [1, 2, 3],
            prompt: "Classify the article and identify one positive and one negative judgment from the review.",
            task: "กวาดชื่อเรื่อง ย่อหน้าเล่าเรื่อง และข้อวิจารณ์ตอนท้าย",
            steps: ["หน้า 1 เป็นบทวิจารณ์ภาพยนตร์ เปิดด้วยแฟรนไชส์และความสนุก เล่าช่วงที่ Gohan อยู่โลกและ Red Ribbon Army กลับมา", "หน้า 2 ให้เครดิต Toriyama และผู้กำกับ Kodama การพลิกความคาดหมาย บุคลิกและมุกของ Gamma 1/2 รวมถึงการให้พื้นที่ตัวละคร", "หน้า 2–3 วิจารณ์ว่าตอนท้ายยังอาศัยการแปลงร่างแบบเดิม แต่สรุปว่าสนุกและกล้าให้พื้นที่บทตัวละคร"],
            answer: "Entertainment. The review praises the humor and time with the characters, but criticizes the return to a familiar transformation trope.",
            note: "แนวจัดประเภทจากจุดประสงค์ของบทวิจารณ์ภาพยนตร์"
          }
        ]
      }
    ],
    exercises: [
      {
        id: "q1", title: "Keep the scope of the claim", pdf: slides, pages: [2, 3],
        prompt: "Original: “Many students assume that printed notes are easier to review.” Which sentence keeps the same meaning?",
        choices: ["All students know that printed notes are easier to review.", "Many students think it is easier to review notes on paper.", "Many teachers prefer to write new printed notes.", "Printed notes are always easier to review."], correctChoice: 1,
        steps: ["B คง many, กลุ่ม students และระดับความเชื่อด้วย think", "A ขยายเป็น all และเปลี่ยน assume เป็น know", "C เปลี่ยนผู้คิดและกิจกรรม", "D เปลี่ยนความเชื่อของกลุ่มเป็นข้อเท็จจริงตายตัว"],
        answer: "Many students think it is easier to review notes on paper."
      },
      {
        id: "q2", title: "Identify a noun clause", pdf: clauses, pages: [10, 11, 12, 13, 14],
        prompt: "In “Nina wondered whether the bus would arrive on time,” what is the role of “whether the bus would arrive on time”?",
        choices: ["It identifies which Nina is meant.", "It tells when Nina wondered.", "It states the result of Nina’s action.", "It acts as the object of “wondered.”"], correctChoice: 3,
        steps: ["D ตอบคำถามว่า Nina สงสัยเรื่องอะไร เป็น noun clause ที่ทำหน้าที่กรรมของ wondered", "A เป็นบทบาทของ relative clause ขยายนาม", "B สับสนเวลารถมาถึงกับเวลาที่สงสัย", "C whether เปิดคำถามทางอ้อม ไม่ได้บอกผลลัพธ์"],
        answer: "It acts as the object of “wondered.”"
      },
      {
        id: "q3", title: "Keep the simultaneous timing", pdf: slides, pages: [6, 7, 8, 9, 10, 11, 12],
        prompt: "Original: “I was taking notes while the teacher was explaining the rule.” Which paraphrase best preserves the timing?",
        choices: ["While the teacher was explaining the rule, I was writing notes.", "I began taking notes after the teacher stopped explaining.", "I took notes before the teacher explained the rule.", "I was taking notes until the teacher began explaining."], correctChoice: 0,
        steps: ["A รักษาสองการกระทำที่กำลังเกิดพร้อมกัน", "B เปลี่ยนให้จดหลังครูหยุด", "C เปลี่ยนให้จดก่อนครูอธิบาย", "D ใช้การเริ่มอธิบายเป็นจุดสิ้นสุดของการจด"],
        answer: "While the teacher was explaining the rule, I was writing notes."
      },
      {
        id: "q4", title: "Change voice without changing tense", pdf: slides, pages: [18, 19, 20, 21, 22, 23],
        prompt: "Original: “The staff are updating the lab computers.” Which is the correct passive form?",
        choices: ["The lab computers were updated by the staff.", "The lab computers are updated by the staff.", "The lab computers are being updated by the staff.", "The lab computers have been updated by the staff."], correctChoice: 2,
        steps: ["C ใช้ are being updated ให้คง present continuous", "A ย้ายเป็นอดีต", "B เป็น present simple", "D เป็น present perfect และสื่อผลของงานที่เสร็จแล้ว"],
        answer: "The lab computers are being updated by the staff."
      },
      {
        id: "q5", title: "Recognize a warning article", pdf: skimming, pages: [2, 3, 4, 5, 6, 7],
        prompt: "An article describes unsafe links in fake delivery messages, lists signs of fraud, and explains how to avoid losing money. What is its primary purpose?",
        choices: ["To entertain readers with an amusing delivery story.", "To warn readers of a risk and show how to avoid harm.", "To persuade readers to subscribe to a delivery service.", "To provide a neutral history of package delivery."], correctChoice: 1,
        steps: ["B ตรงกับ unsafe, fraud และ avoid losing money ซึ่งชี้เจตนาเตือน", "A โจทย์ไม่มีเรื่องเล่าเพื่อความบันเทิง", "C ไม่มีการชักชวนสมัครบริการ", "D ข้อความไม่ได้อธิบายประวัติการจัดส่ง"],
        answer: "To warn readers of a risk and show how to avoid harm."
      }
    ],
    checklist: [
      "ตรวจ paraphrase ว่ายังเก็บคน เหตุการณ์ เวลา ระดับถ้อยคำ และความสัมพันธ์เดิม",
      "แยก clause สามชนิดจากหน้าที่ พร้อมยกตัวอย่างที่มี where, when หรือ that",
      "แปลง passive ด้วย be + past participle และคง tense/aspect",
      "กวาดหัวข้อและประโยคเปิด–จบเพื่อหา genre แล้ว scan รายละเอียดพร้อมชี้หน้า"
    ],
    coverage: [
      {pdf: slides, from: 1, to: 5, section: "paraphrasing-basics", topic: "นิยามและวิธีถอดความสามกลุ่ม"},
      {pdf: slides, from: 6, to: 17, section: "slide-clause-examples", topic: "การเปลี่ยน clause, ลูกศรวิธีแกะประโยค และภาพพัก"},
      {pdf: slides, from: 18, to: 30, section: "voice-and-tense", topic: "Active/Passive, ตารางกริยา, agent และกิจกรรม"},
      {pdf: slides, from: 31, to: 34, section: "what-paraphrase-keeps", topic: "ข้อผิดพลาดและใบงานที่อ้างถึง"},
      {pdf: clauses, from: 1, to: 14, section: "clauses-review", topic: "Adverb/Relative/Noun Clauses พร้อมตารางและโจทย์ Try"},
      {pdf: clauses, from: 15, to: 16, section: "clause-practice", topic: "แนวถอดความโจทย์ครบหกข้อ"},
      {pdf: skimming, from: 1, to: 7, section: "article-types-and-skimming", topic: "สี่ประเภทบทอ่านและภาพขั้นตอน Skimming"},
      {pdf: skimming, from: 8, to: 9, section: "pesticides-article", topic: "Activity 1 และแนวตอบห้าข้อ"},
      {pdf: skimming, from: 10, to: 10, section: "five-article-activity", topic: "Activity 2 จำแนกบทอ่านห้าเรื่อง"},
      {pdf: pesticides, from: 1, to: 10, section: "pesticides-article", topic: "อ่านตามหัวข้อและหาเลข สัญลักษณ์ และประโยคหลัก"},
      {pdf: recycling, from: 1, to: 3, section: "five-article-activity", topic: "Recycling: ข้อชวน เหตุผลและวิธีปฏิบัติ"},
      {pdf: dogs, from: 1, to: 2, section: "five-article-activity", topic: "Dogs: จุดยืนและข้อโต้แย้งนโยบาย"},
      {pdf: sea, from: 1, to: 2, section: "five-article-activity", topic: "Sea swimming: งานวิจัยและคำเตือน"},
      {pdf: coffee, from: 1, to: 4, section: "five-article-activity", topic: "Coffee: สารอาหาร ประเภท วิธีเก็บและชง"},
      {pdf: dragon, from: 1, to: 3, section: "five-article-activity", topic: "Dragon Ball: ประเด็นชมและวิจารณ์ภาพยนตร์"}
    ]
  });
})();

