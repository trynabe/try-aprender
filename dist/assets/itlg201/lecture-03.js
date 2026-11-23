(() => {
  const slides = "Scanning  Skimming (Student Version).pdf";
  const reading = "The English Language Reading.pdf";
  const worksheet = "ITLG201 RS Worksheet#1 (2026).pdf";
  const worked = (id, title, pdf, pages, prompt, steps, answer, extra = {}) => ({
    id, title, pdf, pages, prompt, steps, answer, original: !extra.practice,
    answerOrigin: extra.practice ? undefined : "คำตอบตัวอย่างจากการวิเคราะห์", ...extra
  });
  const quiz = (id, title, pdf, pages, prompt, choices, correctChoice, steps) => ({
    id, title, pdf, pages, prompt, choices, correctChoice, steps, answer: choices[correctChoice], practice: true
  });
  window.ReadingSkills.addChapter({
    number: 3,
    title: "Scanning & Skimming",
    thaiTitle: "Week 2.2 · อ่านเอาคำตอบ อ่านจับใจความ และทบทวน Worksheet #1",
    summary: "เริ่มจากอ่านเมนูและหน้าหนังสือเพื่อหาข้อมูลเฉพาะ แล้วเทียบกับการอ่านเอาภาพรวม ฝึก pre-reading, keywords และ annotation ก่อนนำไปอ่าน The English Language และทำใบงานทบทวน",
    goals: [
      "เลือก Scanning หรือ Skimming ตามเป้าหมายและชี้คำในบทอ่านที่เป็นหลักฐาน",
      "ตั้งคำถามก่อนอ่าน เดาอย่างมีหลักฐาน และปรับความเข้าใจหลังอ่านจริงได้",
      "ทำใบงานทบทวน Prefixes, Noun Suffixes, Prepositions และ Phrasal Verbs พร้อมอธิบายเบาะแส"
    ],
    confusions: [
      "Scanning มุ่งข้อมูลเฉพาะ เช่น ปีที่เริ่มหรือจำนวนที่ได้ยิน ส่วน Skimming มุ่งหัวเรื่อง จุดหลัก และโครงสร้างของบทอ่าน",
      "คำถามกับบทอ่านอาจใช้คนละคำ เช่น improvements กับ made gains ให้จับความหมายที่เทียบกันได้",
      "ข้อที่มีตัวเลขหรืออาชีพหลายอัน ให้หา noun หรือ verb ที่เชื่อมกับสิ่งที่โจทย์ถามก่อนเลือก"
    ],
    sections: [
      {
        id: "scan-and-skim", title: "Scanning, Skimming และกิจกรรมจับเวลา", pdf: slides, pages: "1–18",
        summary: "เริ่มจากตัดสินว่ากำลังหาเรื่องที่ผู้เขียนพูดถึงทั้งชิ้น หรือหาคำตอบจุดเดียว เมื่อเจอคำที่คาดไว้ ให้อ่านประโยครอบข้างเพื่อยืนยันประธาน เหตุการณ์ และตัวเลข",
        points: [
          ["Scanning · หน้า 2–8, 16", "ตั้งคำถามก่อน เช่น ราคาอะไรหรือปีใด เล็งคอลัมน์ ชื่อ ย่อหน้า หัวข้อ ตัวเลข หรือคำที่มีความหมายใกล้กับโจทย์ กวาดผ่านสิ่งที่ไม่เกี่ยว แล้วอ่านตรงจุดที่พบให้ครบ"],
          ["Skimming · หน้า 9–10, 17–18", "อ่านชื่อเรื่อง หัวข้อ คำเน้น บรรทัดต้นของย่อหน้า และย่อหน้าสุดท้าย เพื่อจับใจความ น้ำเสียง และลำดับแนวคิด สไลด์บอกว่า topic sentence มักอยู่ช่วงต้น แต่ให้ตรวจทั้งต้นและท้ายตามโครงจริง"],
          ["Read closely after a scan", "คำถาม who, how many และ what job ต้องยืนยันว่าใครสัมพันธ์กับคำตอบ คำถามเกี่ยวกับ overall message ต้องเห็นภาพทั้งบทก่อนตอบ"],
          ["กิจกรรมหน้า 11–15", "ต้นฉบับเสนอให้กวาดสายตาต่อตอนละ 15 วินาที ลองตอบด้วยหลักฐานสั้น ๆ จากภาพหรือข้อความก่อนเปิดเฉลย"]
        ],
        examples: [
          worked("menu-scan", "ฝึกจากเมนูภาพ · หาเครื่องดื่ม", slides, [4, 5],
            "What would you like to drink? Locate the relevant section and check an item and its price.",
            [
              "สแกนหัวข้อ DRINKS ทางขวาของภาพ แทนการอ่าน Starters, Main Courses หรือ Desserts",
              "เห็น MINERAL WATER, FRESH FRUIT JUICE, COFFEE, TEA และ WINES ราคาในภาพ $2.00 ต่อรายการ จึงเลือกตอบเป็นประโยคได้"
            ], "I’d like a tea. The menu lists tea at $2.00.", { original: false, answerOrigin: undefined }),
          worked("history-scan", "ฝึกหาหลักฐานในหนังสือ · improvements and limitations", slides, [6, 7, 8],
            "What were some improvements and some limitations for African Americans in the illustrated textbook extract?",
            [
              "หาหัวข้อ EDUCATION AND FARMING ตามภาพ แล้วจับคู่ improvements กับ made gains",
              "หลักฐานที่สไลด์เน้นคือ “African Americans also made gains in higher education” จึงสรุปได้ว่ามีความก้าวหน้าด้านอุดมศึกษา",
              "สำหรับ limitations ดูใจความ “usually went to different schools” และ “integration laws were not enforced” ใน Education and Farming; หน้า 586 ยังระบุว่าเจ้าของที่ดินบางคนปฏิเสธการให้เช่า"
            ], "Education expanded, including higher education, but schools usually remained separate and integration laws were often not enforced.",
            { note: "สไลด์หน้า 8 ชี้คำตอบฝั่ง improvements โดยตรง ส่วนหลักฐานฝั่ง limitations อยู่ในภาพหนังสือหน้า 586–587 บนสไลด์หน้า 6–7" }),
          worked("reconstruction-image-questions", "โจทย์ในภาพหนังสือ Reconstruction · หนังสือหน้า 586–587", slides, [6, 7, 8],
            "Answer the questions printed in the textbook spread.\n1. Why do you think Douglass is in the center of this image?\n2. What is the main argument of the excerpt from Hiram Revels’s letter?\n3. Based on context, what does inculcate mean?\n4. Why did many Southerners resent scalawags and carpetbaggers?\n5. What were some effects of Reconstruction on African Americans in the South?\n6. Is the tone of Education and Farming positive or negative in regard to African American lives in the South? Give examples.\n7. Determine the main topic of each visible paragraph in that section.\n8. What did it mean for schools to be integrated during this time?",
            [
              "1 Drawing Conclusions · คำบรรยายภาพหน้า 586 ระบุว่า Frederick Douglass อยู่กลางภาพกลุ่มผู้นำ โดยมี Hiram Revels และ Blanche K. Bruce อยู่ข้าง ๆ ตำแหน่งกลางช่วยเน้นความสำคัญของเขาในกลุ่มผู้นำ การตีความนี้อาศัยองค์ประกอบภาพและคำบรรยาย",
              "2 Central Ideas · ไล่จดหมายจากท้ายหน้า 586 ไปต้นหน้า 587 Revels เห็นว่าความขมขื่นจากสงครามส่วนใหญ่คลี่คลายแล้ว แต่คนบางกลุ่มจงใจคงความขัดแย้งระหว่างเชื้อชาติไว้เพื่ออำนาจและผลประโยชน์จากตำแหน่ง วลี “keep alive the bitterness of the past” และ “aggrandize themselves by office” เชื่อมการกระทำกับแรงจูงใจ",
              "3 Determining Meaning · ในวลี “inculcate a hatred between the races” คำที่ตามหลังคือ a hatred และวลีข้าง ๆ พูดถึงการคงความขมขื่นไว้ จึงอ่าน inculcate ว่า instill หรือปลูกฝังความเกลียดชัง",
              "4 Checking for Understanding · หน้า 586 บอกว่าชาวใต้ผิวขาวกล่าวหารัฐบาล Reconstruction ว่าทุจริต และกล่าวว่าคาร์เพ็ตแบ็กเกอร์บางคนหวังฉวยประโยชน์จากความลำบากในภาคใต้ ขณะเดียวกันหนังสือระบุว่าคนส่วนใหญ่ในกลุ่มนั้นไม่ได้ทุจริต ความไม่พอใจต่อฝ่ายที่สนับสนุนรัฐบาลจึงเป็นข้อสรุปจากบริบท ส่วนย่อหน้าที่แจกแจงคำว่า scalawags อยู่นอกภาพส่วนที่ให้มา",
              "5 Checking for Understanding · หน้า 587 ระบุว่ามีโรงเรียนและโอกาสอุดมศึกษาเพิ่มขึ้น ส่วนหน้า 586 บรรยายการถูกปฏิเสธการเช่าที่ดิน สินเชื่อ และงาน ตลอดจนการข่มขู่และความรุนแรงจากกลุ่มต่อต้าน",
              "6 Analyzing Text Presentation · มุมบวกมีการสร้างโรงเรียนรัฐและ “made gains in higher education” มุมจำกัดคือโรงเรียนส่วนมากแยกกันและกฎหมาย integration มักไม่ได้บังคับใช้ จึงอธิบายน้ำเสียงว่าเห็นความก้าวหน้าพร้อมพิจารณาข้อจำกัดอย่างระมัดระวัง พร้อมยกหลักฐานทั้งสองด้าน",
              "7 Analyzing Structure · ย่อหน้า 1 การตั้งโรงเรียนและการเข้าเรียนในภาคใต้; 2 ความก้าวหน้าในอุดมศึกษาจาก academies สู่ colleges; 3 การแยกโรงเรียนและการบังคับใช้กฎหมาย; 4 ความต้องการที่ดินทำกินเพื่อเลี้ยงครอบครัว นับเฉพาะสี่ย่อหน้าที่เห็นใต้หัวข้อ Education and Farming บนหน้า 587",
              "8 Determining Meaning · บทอ่านนิยามตรง ๆ ว่า “Integrated schools have both white and African American students.” ในบริบทนี้ integrate จึงหมายถึงให้เด็กทั้งสองกลุ่มเข้าเรียนในโรงเรียนเดียวกัน"
            ], "1 The center emphasizes Douglass’s prominence. 2 Revels argues that some people perpetuated racial hostility for political gain. 3 Instill. 4 Resentment reflected perceived profiteering and distrust of Reconstruction supporters. 5 More educational opportunities alongside exclusion and violence. 6 Progress is presented alongside persistent restrictions. 7 Schools and attendance; higher education; segregation; land for families. 8 Students of both groups attended the same schools.",
            {
              hint: "เริ่มที่คำบรรยายภาพและกรอบคำถามของแต่ละข้อ จากนั้นแยกหลักฐานในจดหมายออกจากเนื้อเรื่องใต้ Education and Farming",
              note: "เลข 586–587 คือหน้าหนังสือที่ฝังเป็นภาพ เลข 6–8 คือหน้า PDF สไลด์ ใช้ภาพหน้า PDF 6 อ่านกรอบด้านบนที่ป้ายเหลืองในหน้า 7 บัง ข้อ 1 และ 4 เป็นการอนุมาน ข้อ 7 จำกัดที่สี่ย่อหน้าที่เห็นในภาพ"
            }),
          worked("audience-scan", "กิจกรรมภาพ · หุ้นหรือ Crash Team Racing", slides, [12],
            "Which of these texts would teenage boys be more interested in? Compare Text A and Text B.",
            [
              "Text A พูดถึง investing in stocks, research และ market; Text B ระบุ computer games, play ... friends และ characters",
              "ถ้าอิงกลุ่มผู้เล่นเกมที่สไลด์ใช้เป็นสมมติฐาน Text B มีเบาะแสตรงกว่า ความสนใจขึ้นกับแต่ละคน"
            ], "Text B is the expected choice for the activity because it discusses a multiplayer video game."),
          worked("alison-scan", "กิจกรรมข้อความ · What job does Alison do?", slides, [13],
            "Alison interviewed a baker for a piece and was praised for attention to detail like a surgeon. What job does Alison do?",
            [
              "หา Alison กับ job แล้วกวาดไปยังประโยค “Alison loves being a journalist.” ซึ่งตอบตรง",
              "baker เป็นคนที่ถูกสัมภาษณ์ ส่วน surgeon เป็นการเปรียบความละเอียด ทั้งสองคำใช้เป็นตัวลวงได้"
            ], "She is a journalist."),
          worked("shamir-scan", "กิจกรรมภาพ · How many dogs could Shamir hear?", slides, [14],
            "Three dogs were chasing Shamir; the passage also mentions two howls and five dogs in a house. How many dogs could he hear?",
            [
              "คำเป้าหมายคือ how many + hear ให้หา clause ที่มีกริยาเดียวกัน",
              "ประโยคในภาพเขียนว่า “he could hear the howls of two of them.” สามคือจำนวนที่ไล่ตามและห้าคือจำนวนในบ้านที่เคยอยู่"
            ], "Two dogs.", { hint: "ขีดเส้นใต้กริยาที่โจทย์ถาม แล้วหาว่าตัวเลขใดอยู่ใน clause เดียวกับกริยานั้น" }),
          worked("recommendations-scan", "กิจกรรมภาพ · หา 2 คำแนะนำ", slides, [15],
            "What are the two things the writer recommends that you do when pursuing an education that should lead to a job?",
            [
              "หาเครื่องหมายลำดับ First และ Secondly ในย่อหน้าภาพ",
              "First ... do your research เพื่อรู้ว่าควรเลือกคอร์สอะไร; Secondly ... take part in ... work experience ที่เกี่ยวกับสายที่อยากเรียน",
              "ประโยคท้าย I like education เป็นความเห็นทั่วไป ไม่ใช่รายการแนะนำที่สาม"
            ], "Research which course you need and gain relevant work experience.",
            { hint: "หา First และ Secondly แล้วขีดเฉพาะสิ่งที่แนะนำให้ผู้อ่านทำในสองส่วนนี้" })
        ]
      },
      {
        id: "reading-prep", title: "Pre-Reading, Keywords และ Annotation", pdf: slides, pages: "19–33",
        summary: "ก่อนอ่านให้ประเมินประเภทและโครง ตั้งคำถามไว้ แล้วใช้โน้ตสั้น ๆ ที่บอกหน้าที่ของหลักฐาน เช่น date, example, reason หรือ opposite idea",
        points: [
          ["สี่แนวคิดหน้า 19–24", "Preview หัวเรื่อง หัวข้อย่อย รูปและคำบรรยาย; Predict ตั้งสมมติฐานจากคำใบ้; Prior knowledge นึกสิ่งที่รู้อยู่แล้ว; Purpose แยกเป้าหมายของผู้อ่านและจุดประสงค์ผู้เขียน เช่น entertain, persuade หรือ inform"],
          ["ขั้นต่อยอดหน้า 25", "Preview → activate prior knowledge → set goals → predict → preview vocabulary → formulate questions ก่อนอ่านจึงมีเป้าหมายที่ใช้กรองรายละเอียดได้"],
          ["Keywords หน้า 26–28", "สำคัญต่อแนวคิดหลัก ระบุจากความเกี่ยวข้อง การพบซ้ำ และบริบท ช่วยค้นข้อมูล เป็นได้ทั้งคำเดี่ยว วลี ชื่อ และวันที่ คำเดิมอาจมีน้ำหนักไม่เท่ากันในแต่ละบทความ"],
          ["Annotation หน้า 30–33", "เพิ่มโน้ตหรือเครื่องหมายเพื่ออธิบายข้อมูล เช่น ขีดหลักฐานหรือเขียนคำแปลสั้น ๆ สไลด์แยก Text, Image, Data, Audio annotation และเปิดให้ใช้ระบบจดที่เหมาะกับงาน"]
        ],
        examples: [
          worked("annotation-example", "ลองตั้งคำถามและเขียน annotation ก่อนอ่าน", slides, [19, 25, 26, 30, 33],
            "You are reading to find when English arrived in different countries. What should you preview and mark?",
            [
              "Preview หัวข้อรายประเทศ แล้วตั้งคำถามว่าแต่ละประเทศมีปีใด",
              "Scan ชื่อประเทศและปี ขีดเส้นข้อความที่บอกว่าเกิดเหตุการณ์อะไรในปีนั้น และเขียน year of arrival สั้น ๆ ข้างหลักฐาน",
              "แยกระหว่าง prior knowledge กับสิ่งที่บทอ่านเขียน ถ้าปีที่เดาต่างจากข้อความ ให้ใช้ปีตามบทอ่านเมื่อตอบข้อ comprehension"
            ], "Preview country headings and annotate each year together with the event or location it describes.", {
              practice: true,
              references: [
                ["Keywords · วิดีโอที่สไลด์หน้า 28 อ้างถึง", "https://www.youtube.com/watch?v=A0Sn7f7pkXI"],
                ["Annotating · วิดีโอที่สไลด์หน้า 32 อ้างถึง", "https://www.youtube.com/watch?v=w5Mz4nwciWc"]
              ]
            })
        ]
      },
      {
        id: "english-language", title: "The English Language · อ่านภูมิหลัง คำยืม และเวลาในแต่ละประเทศ", pdf: reading, pages: [1],
        summary: "หน้าเดียวมีสองคอลัมน์ พร้อมกล่อง New words และ Comprehension Questions สไลด์หน้า 34 ให้ใช้ทั้ง pre-reading, scanning, skimming, keywords และ annotation ลองหา England, 500 AD, Australia และ official languages ก่อนเปิดคำอธิบาย",
        points: [
          ["วิธีอ่าน", "อ่านคอลัมน์ซ้ายก่อนเพื่อจับประวัติและคำศัพท์ จากนั้นอ่านหัวข้อประเทศในคอลัมน์ขวา เมื่อเจอตัวเลขให้จดว่านับปี นับคำ หรือจำนวนภาษา"],
          ["กล่อง New words", "difficult = ยาก; cousins = ลูกพี่ลูกน้อง/สิ่งที่มีความสัมพันธ์ใกล้; selfie = ภาพถ่ายตัวเอง; blog = บันทึกออนไลน์; website = กลุ่มหน้าเว็บที่ให้ข้อมูล"]
        ],
        examples: [],
        passages: [{
          id: "english-reading", title: "The English Language", pdf: reading, pages: [1],
          paragraphs: [
            { english: "People speak English in many different countries. The English language started in England, which is now a part of the UK. The English-speaking people came from Europe, from places in modern Germany. English started in England about 500 AD – about 1500 years ago. It’s an old language.", thai: "ผู้คนใช้ภาษาอังกฤษในหลายประเทศ บทอ่านเล่าว่าภาษาเริ่มในอังกฤษซึ่งปัจจุบันเป็นส่วนหนึ่งของสหราชอาณาจักร ผู้พูดมาจากยุโรปบริเวณเยอรมนีปัจจุบัน และภาษาอังกฤษเริ่มราว ค.ศ. 500 หรือราว 1,500 ปีก่อน", role: "เปิดหัวข้อและบอกต้นกำเนิด", vocabulary: ["started = เริ่ม", "about = ประมาณ", "AD = คริสต์ศักราช"], analysis: "which is now a part of the UK ขยาย England; คำ about กำกับว่าปีเป็นค่าประมาณ" },
            { english: "English has many words – perhaps more words than other languages. It is difficult to count the number of words. But some experts say that English has about 250,000 words, but German has about 135,000 and French has about 100,000 words. So English is not always easy to learn! There are so many new words to learn.", thai: "อังกฤษมีคำจำนวนมากและอาจมีมากกว่าภาษาอื่น การนับทั้งหมดทำได้ยาก บทอ่านยกค่าประเมินว่าอังกฤษราว 250,000 เยอรมันราว 135,000 และฝรั่งเศสราว 100,000 คำ จึงมีคำใหม่ให้เรียนเยอะ", role: "เปรียบเทียบตัวเลขเพื่อขยายข้อสังเกตเรื่องคำศัพท์", vocabulary: ["perhaps = อาจจะ", "experts = ผู้เชี่ยวชาญ", "count = นับ"], analysis: "But เชื่อมประเด็นนับยากกับตัวเลขประเมิน และ So นำไปสู่เหตุผลว่าทำไมจึงเรียนศัพท์เยอะ" },
            { english: "English is the cousin of other languages in Europe. Dutch and German are cousins of English, and some words are the same. In the old days, more than 1000 years ago, the cousins were more similar and it was possible to understand each other.", thai: "ภาษาอังกฤษมีความสัมพันธ์ใกล้กับภาษาอื่นในยุโรป เช่น ดัตช์กับเยอรมัน บางคำใช้ร่วมกัน ย้อนไปกว่า 1,000 ปีก่อน ภาษาที่เกี่ยวข้องกันยิ่งคล้ายจนเข้าใจกันได้", role: "อธิบายความสัมพันธ์ของภาษา", vocabulary: ["cousin = ญาติ/สิ่งที่ใกล้กันในเชิงเปรียบเทียบ", "similar = คล้ายกัน"], analysis: "cousins ใช้เปรียบความสัมพันธ์ของภาษา ส่วน each other ชี้ความเข้าใจกันทั้งสองฝ่าย" },
            { english: "English likes to use new words from other languages and other countries. English has many words from other languages – from French, German, Arabic, Chinese and other languages.", thai: "ภาษาอังกฤษรับคำใหม่มาจากภาษาและประเทศอื่น บทอ่านยกฝรั่งเศส เยอรมัน อาหรับ และจีนเป็นตัวอย่าง", role: "เสนอใจความเรื่องคำยืม", vocabulary: ["from = จาก/มาจาก", "word borrowing = การยืมคำ"], analysis: "other ปรากฏซ้ำเพื่อเน้นว่าต้นแหล่งของคำมีหลายภาษา" },
            { english: "From French, English uses words like façade, matinee, encore, hors d’oeuvre. From Arabic, English uses words like algorithm, algebra, admiral. From Italian, English uses words like pasta, opera, propaganda. From Hindi, English uses words like bungalow, pyjamas, veranda.", thai: "กลุ่มตัวอย่างในบทอ่าน ได้แก่ façade, matinee, encore และ hors d’oeuvre จากฝรั่งเศส, algorithm, algebra และ admiral จากอาหรับ, pasta, opera และ propaganda จากอิตาลี, bungalow, pyjamas และ veranda จากฮินดี", role: "ยกตัวอย่างจริงมาสนับสนุนแนวคิดเรื่องคำยืม", vocabulary: ["like = เช่น เมื่อใช้ยกตัวอย่าง"], analysis: "วลี From ... ขึ้นต้นหลายประโยคเพื่อบอกแหล่งคำยืม ใช้ตำแหน่งนี้สแกนหาชื่อภาษาได้เร็ว" },
            { english: "English has words from African languages too. Words like ‘banana’ from Wolof, ‘safari’ from Swahili, ‘jazz’ from Mandinka and ‘cola’ from the Temne language.", thai: "บทอ่านยกตัวอย่างคำจากภาษาในแอฟริกาเพิ่ม เช่น banana จากโวลอฟ, safari จากสวาฮีลี, jazz จากมันดิงกา และ cola จากเทมเน ข้อมูลเหล่านี้เป็นไปตามบทอ่าน", role: "เพิ่มแหล่งคำยืมจากแอฟริกา", vocabulary: ["too = ด้วย/เช่นกัน"], analysis: "too เชื่อมกลับไปยังย่อหน้าที่แจกแจงแหล่งคำยืมก่อนหน้านี้" },
            { english: "English also likes to make new words, like the word ‘app’ for the programme on your phone. These words are new, and started in the 21st century: smartphone – a phone that can use the internet; to google – to search for information on the Google website; troll – a person who writes insulting words on Facebook and Twitter and the internet; selfie – a photo of yourself; blog – personal notes you write on the internet; hashtag – this symbol # which people use to make a label or name for something like #myfavoriteword; lol – a short way of writing ‘laughing out loud’; geek – a technology expert.", thai: "นอกจากคำยืม บทอ่านพูดถึงการสร้างคำและศัพท์ร่วมสมัย เช่น app โปรแกรมบนมือถือ smartphone โทรศัพท์ต่ออินเทอร์เน็ตได้ to google ค้นข้อมูล troll ผู้ก่อกวนด้วยข้อความ selfie ภาพตัวเอง blog บันทึกออนไลน์ hashtag ป้ายกำกับที่ขึ้นด้วย # lol ย่อจาก laughing out loud และ geek ผู้สนใจหรือเชี่ยวชาญเทคโนโลยี", role: "ต่อยอดจากคำยืมไปยังคำใหม่และคำในโลกออนไลน์", vocabulary: ["also = นอกจากนี้", "programme = โปรแกรม", "insulting = ดูหมิ่น", "label = ป้ายกำกับ"], analysis: "These words อ้างกลับไปยังกลุ่มคำใหม่ ตัวอย่างและข้อมูลอายุของคำให้ตีความว่าบทอ่านนำเสนออย่างไร" },
            { english: "People speak English in many different countries. And English has a long history in many countries outside the UK, where it was born.", thai: "ภาษาอังกฤษใช้ในหลายประเทศและมีประวัติยาวนานนอกสหราชอาณาจักรซึ่งเป็นถิ่นกำเนิด", role: "เชื่อมจากภูมิหลังของภาษาไปสู่ตัวอย่างแต่ละประเทศ", analysis: "where it was born เป็นอนุประโยคขยาย UK โดย it ในที่นี้หมายถึงภาษาอังกฤษ" },
            { english: "English in the USA – English started in North America in 1620, when English people arrived in Virginia. Now English is the main language of the USA and its neighbour, Canada, and almost everybody can speak English. In Canada many people speak French too.", thai: "บทอ่านระบุภาษาอังกฤษในอเมริกาเหนือเมื่อปี 1620 เชื่อมกับการมาถึงเวอร์จิเนีย และบอกว่าอังกฤษเป็นภาษาหลักของสหรัฐฯ และแคนาดา แม้แคนาดามีผู้พูดฝรั่งเศสด้วย", role: "ตัวอย่างภูมิภาคแรกและปีที่บทอ่านระบุ", vocabulary: ["neighbour = ประเทศเพื่อนบ้าน", "almost everybody = เกือบทุกคน"], analysis: "when English people arrived ... ขยายปี 1620 และ Now เปลี่ยนจากเหตุการณ์ในอดีตมาสู่สถานการณ์ปัจจุบันตามบทอ่าน" },
            { english: "English in Australia – English started in Australia in 1770, when Captain Cook and English people arrived in ships. Now English is the main language of the country and almost everybody can speak English here and in New Zealand nearby.", thai: "สำหรับออสเตรเลีย บทอ่านระบุปี 1770 เชื่อมกับ Captain Cook และผู้เดินทางมาทางเรือ และอธิบายว่าอังกฤษเป็นภาษาหลักของออสเตรเลียและใช้กันกว้างขวางในนิวซีแลนด์ใกล้เคียง", role: "ตัวอย่างภูมิภาคที่สองและหลักฐานตอบข้อ 4", vocabulary: ["arrived = มาถึง", "nearby = ใกล้เคียง"], analysis: "here อ้างถึง Australia ที่เป็นหัวข้อของย่อหน้า" },
            { english: "English in South Africa – English started in South Africa in 1820, when English people arrived in ships in Cape Town. Now English is one of the official languages and most people speak English.", thai: "สำหรับแอฟริกาใต้ บทอ่านระบุปี 1820 และจุดมาถึงคือ Cape Town จากนั้นกล่าวว่าอังกฤษเป็นหนึ่งในภาษาทางการและคนส่วนใหญ่ใช้ภาษาอังกฤษ", role: "ตัวอย่างภูมิภาคที่สาม", vocabulary: ["official language = ภาษาทางการ", "one of = หนึ่งในกลุ่ม"], analysis: "one of the official languages บอกว่ามีภาษาทางการหลายภาษา" },
            { english: "English in India – English started in India in 1612, when English people arrived in ships to do business. They stayed a long time and controlled the country. Now English is one of the 11 official languages and many millions of people speak English – but not everybody.", thai: "สำหรับอินเดีย บทอ่านระบุปี 1612 เชื่อมกับการเดินทางมาค้าขาย ผู้ที่มาถึงอยู่ต่อเป็นเวลานานและปกครองประเทศ บทอ่านระบุว่าอังกฤษเป็นหนึ่งใน 11 ภาษาทางการและมีคนพูดหลายล้านคน ส่วนจำนวนภาษาที่ใช้ตอบให้ยึดข้อความนี้", role: "ตัวอย่างภูมิภาคสุดท้ายและหลักฐานตอบข้อ 5", vocabulary: ["do business = ทำธุรกิจ", "controlled = ควบคุมหรือปกครอง", "but not everybody = แต่ไม่ได้หมายถึงทุกคน"], analysis: "They ชี้กลับไปที่ English people และเครื่องหมาย dash เน้นข้อจำกัดของ many millions" }
          ],
          questions: [
            worked("english-q1", "Comprehension 1 · จุดเริ่มต้นของภาษา", reading, [1], "When did the English language start?", ["โจทย์ถาม when สแกน started กับปีในย่อหน้าแรก", "ประโยค “English started in England about 500 AD” ให้ปีโดยตรง ส่วน about 1500 years ago เป็นการอธิบายเวลาเดิมอีกแบบ"], "About 500 AD.", { hint: "ปีที่ถามเป็นจุดเริ่มของภาษาโดยรวม ลองมองย่อหน้าเปิดก่อนหัวข้อรายประเทศ" }),
            worked("english-q2", "Comprehension 2 · เปรียบเทียบจำนวนคำ", reading, [1], "Which language has the biggest number of words?", ["biggest number ต้องเปรียบเทียบสามค่าในย่อหน้าที่สอง", "อังกฤษ 250,000 > เยอรมัน 135,000 > ฝรั่งเศส 100,000 ตามตัวเลขประเมินในบทอ่าน"], "English, according to the figures cited in the passage."),
            worked("english-q3", "Comprehension 3 · คำยืมมาจากภาษาใด", reading, [1], "What languages does English take words from?", ["หา words from other languages แล้วอ่านตัวอย่างต่อจาก French, German, Arabic และ Chinese", "ย่อหน้าถัดมายก Italian, Hindi และภาษาในแอฟริกา ได้แก่ Wolof, Swahili, Mandinka และ Temne"], "Examples given include French, German, Arabic, Chinese, Italian, Hindi, Wolof, Swahili, Mandinka and Temne."),
            worked("english-q4", "Comprehension 4 · ค้นปีจากหัวข้อประเทศ", reading, [1], "When did English start in Australia?", ["ไปที่ English in Australia แล้วจับ started ... in 1770", "ตัวเลข 1620, 1820 และ 1612 อยู่คนละหัวข้อจึงไม่ตอบ Australia"], "In 1770, according to the passage."),
            worked("english-q5", "Comprehension 5 · official languages ในบทอ่าน", reading, [1], "How many official languages are there in India according to this passage?", ["หา English in India แล้วเล็งวลี one of the 11 official languages", "จำนวนภาษาในบทอ่านคือ 11; many millions เป็นจำนวนผู้พูดโดยประมาณ ไม่ใช่จำนวนภาษา"], "Eleven, according to the passage.", { note: "คำตอบตามบทอ่านหน้า 1 เอกสารนี้ไม่ได้ใช้เพื่อยืนยันจำนวนตามกฎหมายปัจจุบัน" })
          ]
        }]
      },
      {
        id: "timed-assignment", title: "กิจกรรมท้ายสไลด์ · อ่านบทความให้ทันเวลา", pdf: slides, pages: "34–36",
        summary: "หน้า 34 ให้ทำ The English Language ในชั้นเรียน ส่วนหน้า 35 มอบหมายบทความ 7 Proven Health Benefits of Dark Chocolate พร้อมใบงานจับเวลา 10 นาที",
        points: [
          ["เอกสารที่ต้องใช้เพิ่ม", "ไม่พบตัวบทความ Dark Chocolate และใบงานที่อ้างในหน้า 35 จากโฟลเดอร์ที่ให้มาด้วย จึงยังเฉลยกิจกรรมจับเวลานี้ไม่ได้"],
          ["วิธีเตรียม", "เมื่อได้บทอ่านและใบงาน ให้ preview หัวข้อกับคำถามก่อน จับเวลาสแกนแต่ละคำถาม แล้วจดหน้าและประโยคหลักฐานเพื่อทบทวน"]
        ],
        examples: []
      },
      {
        id: "worksheet-word-form", title: "Worksheet #1 · Prefixes และ Noun Suffixes", pdf: worksheet, pages: "1–7",
        summary: "ทบทวนรูปคำจากสองบทแรกผ่านโจทย์เลือกคำ แปลความจากประโยค แต่งประโยค และเปลี่ยนคำฐานเป็นคำนาม",
        points: [
          ["หน้า 1–5", "จำรูป valid word และความหมาย เช่น illegal ใช้ il- ก่อน l ข้อความที่หน้า 2 ระบุ i ขัดกับตัวอย่าง illegal; im- พบก่อน m หรือ p เช่น immature, impossible; ir- ก่อน r เช่น irrelevant"],
          ["หน้า 6–7", "เลือกคำนามจากตำแหน่งหลัง article, possessive หรือ preposition และแยกคำบอกคน -er/-or/-ist ออกจากสภาพ/การกระทำ -ness/-ment/-ion/-ance/-ence"]
        ],
        examples: [
          worked("sheet-prefix-choice", "เลือกคำปฏิเสธ 7 ข้อจากต้นฉบับ", worksheet, [2, 3],
            "Choose the correct forms for the situations on pages 2–3: legal, fair, accurate, successful, possible, relevant and mature.",
            [
              "1 illegal (ฝ่าฝืนกฎหมาย), 2 unfair (แบ่งงานไม่ยุติธรรม), 3 inaccurate (ข้อมูลคลาดเคลื่อนจึงต้องทำใหม่), 4 unsuccessful (ดาวน์โหลดไม่สำเร็จ)",
              "5 impossible (ทำไม่ทันวันจันทร์), 6 irrelevant (ไม่เกี่ยวกับงานเขียนโค้ด), 7 immature (ทำตัวไม่เป็นผู้ใหญ่)"
            ], "1 illegal; 2 unfair; 3 inaccurate; 4 unsuccessful; 5 impossible; 6 irrelevant; 7 immature."),
          worked("sheet-prefix-meaning", "เขียนความหมายแบบภาษาง่าย 6 ข้อ", worksheet, [4],
            "Explain the six sentences using simpler English. Focus on malfunctioning, disconnect, overheating, abnormal, misread, uninstalled and illegible.",
            [
              "1 The computer worked badly after water was spilled on it. · malfunctioning = ทำงานผิดปกติ",
              "2 I unplugged my phone because it got too hot. · disconnect = ถอดออก และ overheating = ร้อนเกิน",
              "3 She probably thinks my Iron Man outfit at work is unusual. · abnormal = ผิดจากปกติ",
              "4 I understood the instructions incorrectly, so the result was poor. · misread = อ่านผิด",
              "5 Freddy removed Instagram from his phone. · uninstalled = ลบโปรแกรมที่ติดตั้ง",
              "6 People cannot read my handwriting, so I take notes on a tablet. · illegible = อ่านไม่ออก"
            ], "เขียนด้วยคำง่ายโดยคงผู้กระทำ เหตุการณ์ และเหตุผลของต้นฉบับ."),
          worked("sheet-prefix-sentences", "แต่งประโยค 5 ข้อด้วยคำในโจทย์", worksheet, [5],
            "Write one sentence for Disapprove, Dismiss, Irregular, Misleading and Unsure.",
            [
              "I disapprove of keeping borrowed books. (ฉันไม่เห็นด้วยกับการเก็บหนังสือที่ยืมไว้)",
              "Please do not dismiss her idea before listening. (อย่าเพิ่งปัดความคิดของเธอทิ้งก่อนฟัง)",
              "The shuttle runs at irregular intervals. (รถรับส่งมาในช่วงเวลาที่ไม่สม่ำเสมอ)",
              "The chart is misleading because it hides the total. (แผนภูมิทำให้เข้าใจผิดเพราะซ่อนยอดรวม)",
              "I am unsure which route to take. (ฉันยังไม่แน่ใจว่าจะไปทางไหน)"
            ], "ตรวจว่าประโยคสมบูรณ์ คำเป้าหมายอยู่ในรูปที่ถูกและคนอ่านเดาความหมายได้จากบริบท."),
          worked("sheet-noun-fill", "เติม Noun Suffixes 12 ข้อ", worksheet, [6],
            "Write noun forms of program, annoy, improve, guide, connect, biology, happy, invest, commit, assist, exist and influence.",
            [
              "1 programmer (คนทำงาน), 2 annoyance (สิ่งน่ารำคาญ), 3 improvement (การปรับดีขึ้น), 4 guidance (คำแนะนำ)",
              "5 connection (การเชื่อมต่อ), 6 biologist (นักชีววิทยา), 7 happiness (ความสุข), 8 investor (นักลงทุน)",
              "9 commitment (ความทุ่มเท), 10 assistance (ความช่วยเหลือ), 11 existence (การมีอยู่), 12 influencer (ผู้มีอิทธิพลบนสื่อ)"
            ], "1 programmer; 2 annoyance; 3 improvement; 4 guidance; 5 connection; 6 biologist; 7 happiness; 8 investor; 9 commitment; 10 assistance; 11 existence; 12 influencer."),
          worked("sheet-noun-choice", "Multiple Choice เดิม 8 ข้อ · คำนามและตำแหน่ง", worksheet, [7],
            "Choose the noun suffix forms in Q1–4 and the sentences that use noun forms correctly in Q5–8.",
            [
              "Q1 D judgment (-ment); Q2 B suggestion (-ion); Q3 C banker (-er บอกบุคคล); Q4 B kindness (-ness)",
              "Q5 A My decision is final. ใช้ decision เป็นคำนามประธาน; Q6 B hire a teacher’s assistant ให้ assistant เป็นคำนามกรรม",
              "Q7 A take your measurements ใช้ measurements เป็นคำนาม; Q8 A his appearance ให้ appearance อยู่หลัง possessive คำอย่าง decide, assist, measure, appear จึงใช้เมื่อประโยคต้องการกริยา"
            ], "1 D; 2 B; 3 C; 4 B; 5 A; 6 B; 7 A; 8 A.")
        ]
      },
      {
        id: "worksheet-prepositions", title: "Worksheet #1 · Prepositions จากภาพและบริบท", pdf: worksheet, pages: [8, 9],
        summary: "ดูตำแหน่งคน โต๊ะ กระดาน หน้าต่างในภาพ แล้วแยก noun phrase เช่น the presentation ออกจาก clause เช่น the speaker is presenting",
        points: [],
        examples: [
          worked("sheet-class-image", "เติมคำจากภาพห้องเรียน 8 ข้อ", worksheet, [8],
            "Use during, inside, between, by, behind, beside, while and with to describe the classroom picture on page 8.",
            [
              "1 beside the table (ผู้พูดยืนข้างโต๊ะ), 2 behind the guest speaker (กระดานด้านหลัง), 3 during the presentation (ตามด้วย noun phrase), 4 inside a classroom (อยู่ในห้อง)",
              "5 with black trousers (สวมควบคู่), 6 by the window (ใกล้หน้าต่าง), 7 while the speaker is presenting (ตามด้วย clause), 8 between two boys (ระหว่างคนสองคน)",
              "by กับ beside ใกล้ความหมายกันมาก ข้อ 1 และ 6 เป็นคำตอบเมื่อกระจายคำในกล่องให้แต่ละคำใช้ครั้งเดียว"
            ], "1 beside; 2 behind; 3 during; 4 inside; 5 with; 6 by; 7 while; 8 between."),
          worked("sheet-on-in-at-of", "เติม On, In, At, Of ใน 12 ข้อ", worksheet, [9],
            "Fill the prepositions in the 12 sentences on page 9. Items 11 and 12 have two blanks each.",
            [
              "1 in the car (ภายในรถ), 2 in August (เดือน), 3 slice of pizza (ส่วนย่อย), 4 at the entrance (จุด), 5 on your desk (พื้นผิว), 6 a man of science (เกี่ยวข้องกับวิทยาศาสตร์)",
              "7 at his parent’s house (สถานที่เป็นจุด), 8 in this class (เข้าอยู่ในกลุ่ม), 9 on November 17th (วันที่), 10 in Germany (ประเทศ)",
              "11 part of the police force in New York City (ส่วนหนึ่ง + เมือง), 12 in four years ... in Japan (อีกสี่ปี + ในประเทศ)"
            ], "1 in; 2 in; 3 of; 4 at; 5 on; 6 of; 7 at; 8 in; 9 on; 10 in; 11 of, in; 12 in, in.")
        ]
      },
      {
        id: "lily-story", title: "Worksheet #1 · อ่านการเดินทางของ Lily และแปลคำในบริบท", pdf: worksheet, pages: "10–12",
        summary: "อ่านลำดับเหตุการณ์จากออกเดินทางไปจนกลับบ้าน แล้วชี้กริยาและส่วนประกอบที่ช่วยบอกการเคลื่อนที่ การพบโดยบังเอิญ และความพยายาม",
        points: [["สังเกตชนิดคำ", "หน้า 11 เรียกรวมว่า phrasal verbs แต่ overcome และ await เป็นกริยาคำเดียว และ retrace one’s steps เป็นวลีที่มีกริยากับกรรม คำว่า Set of ในหน้า 11 เทียบเนื้อเรื่องและคีย์หน้า 12 แล้วคือ set off"]],
        examples: [],
        passages: [{
          id: "lily-passage", title: "Lily’s journey", pdf: worksheet, pages: [10],
          paragraphs: [
            { english: "Once upon a time, in a small village nestled by a glistening river, there lived a curious young girl named Lily. Lily had always dreamed of embarking on a great adventure and exploring the world beyond her little village.", thai: "ลิลีเป็นเด็กสาวช่างสงสัยในหมู่บ้านริมแม่น้ำ เธอใฝ่ฝันจะออกผจญภัยและสำรวจโลกที่อยู่นอกหมู่บ้านมานาน", role: "วางฉากและแรงจูงใจ", vocabulary: ["nestled by = ตั้งอยู่ข้าง", "embark on = เริ่มลงมือทำ/ออกเดินทาง"] },
            { english: "One sunny morning, Lily woke up with an idea that had been brewing in her mind for quite some time. She decided to set off on a journey to find a legendary treasure that was said to be hidden deep within a mystical forest, far beyond the hills.", thai: "เช้าวันหนึ่งลิลีตื่นมาพร้อมความคิดที่ก่อตัวมาพักใหญ่ เธอตัดสินใจออกเดินทางไปหาสมบัติในตำนานที่ว่ากันว่าซ่อนอยู่ลึกในป่าลึกลับเลยเนินเขาไป", role: "จุดเริ่มการเดินทาง", analysis: "to find ... บอกเป้าหมายของ set off; that was said to be hidden ขยาย treasure", vocabulary: ["set off = เริ่มเดินทาง", "legendary = ในตำนาน"] },
            { english: "With her heart pounding and her backpack filled with supplies, Lily set out on her quest. She walked through the village, bidding farewell to her family and friends, who wished her luck on her adventure. As she made her way through the forest, she came across an old, weathered signpost that pointed in different directions. It read, “Follow your dreams” and pointed towards a narrow path.", thai: "ลิลีใจเต้นและเตรียมสัมภาระพร้อมแล้วจึงออกเดินทาง ลาครอบครัวกับเพื่อนขณะเดินผ่านหมู่บ้าน เข้าไปในป่าแล้วเจอป้ายเก่าโดยบังเอิญ ป้ายเขียนว่าให้เดินตามความฝันและชี้ไปทางทางแคบ", role: "เดินหน้าและพบเบาะแส", vocabulary: ["set out = เริ่มออกเดินทาง", "walked through = เดินผ่าน", "came across = บังเอิญพบ"], analysis: "It อ้างถึง signpost; towards เป็นทิศทางที่ป้ายชี้ไป" },
            { english: "Lily followed the path, which led her through dense thickets and over babbling brooks. She climbed up steep hills and crossed treacherous bridges. At times, she felt like giving up, but she reminded herself to keep pushing forward. She came across several obstacles along the way, but she persevered and overcame each one.", thai: "ตามทางเธอเดินผ่านพุ่มไม้ ลำธาร เนินชัน และสะพานอันตราย หลายครั้งอยากหยุดพยายาม แต่เตือนตัวเองให้ไปต่อและผ่านอุปสรรคได้ทีละอย่าง", role: "แสดงอุปสรรคและการตัดสินใจ", vocabulary: ["giving up = ยอมแพ้", "pushing forward = เดินหน้าต่อ", "overcame = ผ่านพ้น"], analysis: "but เชื่อมความรู้สึกอยากยอมแพ้กับการเลือกไปต่อ" },
            { english: "Finally, after what felt like an eternity, Lily stumbled upon a clearing in the forest. In the middle of the clearing stood a towering oak tree, with its branches reaching towards the heavens. And beneath the oak tree, partially hidden by fallen leaves, was a gleaming treasure chest.", thai: "จนในที่สุดเธอบังเอิญเจอลานโล่ง กลางลานมีต้นโอ๊กสูงที่กิ่งยื่นขึ้นฟ้า ใต้ต้นไม้มีหีบสมบัติแวววาวซ่อนอยู่บางส่วนใต้ใบไม้", role: "พบสถานที่และหีบสมบัติ", vocabulary: ["stumbled upon = พบโดยบังเอิญ", "clearing = ลานโล่ง", "reaching towards = ยื่นไปทาง"] },
            { english: "Lily’s eyes widened with excitement as she approached the chest. With trembling hands, she unlocked it using an ancient key she had discovered earlier in her journey. As the lid creaked open, a radiant light poured out, illuminating the entire clearing. Inside the chest, she found not just gold and jewels but also a note that read, “The real treasure is the knowledge and experience gained on your journey.”", thai: "เธอตื่นเต้นและไขหีบด้วยกุญแจโบราณที่พบมาก่อน แสงส่องออกมาขณะฝาเปิด ในหีบมีทองและอัญมณีกับข้อความที่บอกว่าสมบัติแท้จริงคือความรู้และประสบการณ์ที่ได้ระหว่างทาง", role: "เปิดเผยข้อคิดของเรื่อง", vocabulary: ["trembling = สั่น", "radiant = สว่างจ้า", "poured out = พรั่งพรูออก"], analysis: "not just ... but also ... เชื่อมสมบัติที่จับต้องได้กับโน้ตซึ่งเสนอใจความหลัก" },
            { english: "Overwhelmed with joy and a newfound sense of accomplishment, Lily closed the treasure chest and retraced her steps back to the village. She returned home, where her family and friends eagerly awaited her arrival. She regaled them with tales of her daring adventures, recounting the challenges she had faced and the lessons she had learned.", thai: "ด้วยความดีใจและภูมิใจ เธอปิดหีบและย้อนเส้นทางเดิมกลับหมู่บ้าน ครอบครัวกับเพื่อนกำลังเฝ้ารอ เธอเล่าการผจญภัย อุปสรรค และสิ่งที่เรียนรู้", role: "เดินทางกลับและถ่ายทอดบทเรียน", vocabulary: ["retraced her steps = ย้อนรอยทางเดิม", "awaited = เฝ้ารอ", "regaled = เล่าเรื่องให้ฟังอย่างเพลิดเพลิน"] },
            { english: "Lily’s journey had transformed her. She had not only discovered a hidden treasure but also realized the true power of determination, perseverance, and following one’s dreams. From that day forward, Lily became an inspiration to others in her village, encouraging them to step out of their comfort zones and embark on their own remarkable journeys.", thai: "การเดินทางทำให้ลิลีเปลี่ยนไป เธอเข้าใจคุณค่าของความมุ่งมั่น ความอดทน และการตามความฝัน จึงเป็นแรงบันดาลใจให้คนอื่นก้าวออกจากความคุ้นเคยและเริ่มเดินทางของตนเอง", role: "สรุปการเปลี่ยนแปลงและผลต่อคนรอบข้าง", vocabulary: ["perseverance = ความพากเพียร", "step out of = ก้าวออกจาก", "comfort zone = พื้นที่คุ้นเคย"] },
            { english: "And so, the story of Lily, the young girl who chased her dreams and found her treasure, became a legend that was told and retold for generations to come, inspiring countless others to set out on their own phrasal verb-filled adventures.", thai: "เรื่องของลิลีผู้วิ่งตามความฝันจนพบสมบัติถูกเล่าซ้ำต่อหลายชั่วอายุคน และเป็นแรงบันดาลใจให้คนอื่นเริ่มผจญภัย", role: "ปิดเรื่องด้วยผลที่ส่งต่อไปยังคนรุ่นหลัง", analysis: "the young girl who ... เป็นส่วนขยาย Lily; inspiring ... บอกผลที่เรื่องมีต่อผู้ฟัง" }
          ],
          questions: [
            worked("lily-verb-prompts", "เขียนความหมายแต่ละคำเป็นประโยค · 12 ข้อ", worksheet, [10, 11, 12],
              "Explain each expression in full sentences: set off, set out, walk through, push forward, come across, give up, overcome, stumble upon, reach towards, retrace one’s steps, await and step out of.",
              [
                "1 Lily set off means she began her journey. 2 Lily set out means she started her quest. 3 She walked through the village means she passed through it on foot.",
                "4 She kept pushing forward means she continued despite obstacles. 5 She came across a signpost means she found it unexpectedly. 6 She felt like giving up means she almost stopped trying.",
                "7 She overcame obstacles means she successfully dealt with them. 8 She stumbled upon a clearing means she discovered it by chance. 9 Branches reached towards the heavens means they extended upwards.",
                "10 She retraced her steps means she went back along the same path. 11 Her friends awaited her arrival means they waited for her to return. 12 She encouraged others to step out of their comfort zones means she urged them to leave familiar situations."
              ], "เทียบกับรายการความหมายจากหน้า 12 และยกเหตุการณ์ย่อในประโยคตามที่หน้า 11 กำหนด.",
              { answerOrigin: "ความหมายจากคีย์ต้นฉบับหน้า 12 และคำตอบตัวอย่างในบริบท", note: "ความหมายอิงคีย์ต้นฉบับหน้า 12 ส่วนประโยคเต็มเป็นตัวอย่างที่เขียนอธิบายบริบทจากหน้า 10" })
          ]
        }]
      }
    ],
    exercises: [
      quiz("q1", "Choose a reading strategy", slides, [2, 3, 9, 16, 17], "You need to find the application deadline in a three-page brochure. What should you do first?", ["Read every word aloud.", "Scan for dates and a heading such as Application Deadlines.", "Skim only to decide whether the brochure sounds persuasive.", "Predict a date without checking the text."], 1, ["deadline คือข้อมูลเฉพาะ จึงหา heading และรูปวันที่ด้วย scanning", "A ช้าเกินเป้าหมาย; C หาโทนแทนวัน; D ให้การเดาโดยไม่ยืนยันหลักฐาน"]),
      quiz("q2", "Match a detail to its verb", slides, [13, 14, 15], "Mina bought five notebooks. She lent two to a friend and kept three. How many notebooks did she lend?", ["Five.", "One.", "Three.", "Two."], 3, ["lend จับคู่กับ lent two ในประโยคหลักฐาน", "five อยู่กับ bought; three อยู่กับ kept; one ไม่มีหลักฐานรองรับ"]),
      quiz("q3", "Read an approximate comparison", reading, [1], "What can you conclude from “perhaps” and “about” in the paragraph comparing word counts?", ["The figures are approximate.", "The numbers prove that all languages have the same number of words.", "The writer says word counts are easy to measure precisely.", "The comparison applies to every language in the world."], 0, ["perhaps บอกความไม่แน่นอนและ about กำกับค่าประมาณ", "B ขัดกับตัวเลขที่ต่างกัน; C ขัดกับ difficult to count; D ขยายเกินจากภาษาที่บทอ่านยกมาเปรียบ"]),
      quiz("q4", "Understand a phrasal verb in context", worksheet, [10, 12], "I came across an old photo while cleaning the attic. What does “came across” mean here?", ["Carried the photo across the room.", "Threw the photo away.", "Found the photo by chance.", "Followed a photo’s instructions."], 2, ["came across ใช้กับการบังเอิญเจอสิ่งหนึ่ง เช่น Lily เจอป้าย; while cleaning บอกกิจกรรมที่กำลังทำตอนเจอ", "A ตี across ตรงตัว; B ทิ้งรูปไม่มีข้อความรองรับ; D ใช้แนวคิดป้ายบอกทางกับฉากคนละเรื่อง"]),
      quiz("q5", "Main idea versus example", reading, [1], "In the part that lists words from French, Arabic, Italian and Hindi, what is the writer’s main point?", ["French supplied every word that English uses.", "English borrows words from many languages.", "English speakers only use new technology words.", "The article is mainly about a pasta recipe."], 1, ["รายการหลายภาษาสนับสนุนใจความ English uses words from other languages", "A จำกัดแหล่งผิดและใช้ every; C เปลี่ยนไปกลุ่มคำเทคโนโลยีในช่วงถัดไป; D pasta เป็นเพียงตัวอย่างคำยืมหนึ่งคำ"])
    ],
    checklist: [
      "บอกได้ว่าจะ scan หรือ skim แล้วอธิบายว่าคำถามกำลังวัดอะไร",
      "ย้อนชี้คำหลักและประโยคหลักฐานใน The English Language ได้จากทั้งคอลัมน์ซ้ายและขวา",
      "ตอบโจทย์ที่มีตัวเลขหลายค่าโดยจับคู่กับคน เหตุการณ์ และกริยาที่คำถามระบุ",
      "อธิบายคำหลายคำในเรื่อง Lily ด้วยภาษาอังกฤษง่าย ๆ พร้อมเหตุการณ์ตัวอย่าง"
    ],
    coverage: [
      { pdf: slides, from: 1, to: 18, section: "scan-and-skim", topic: "Week 2.2, เมนู/หนังสือภาพและกิจกรรมจับเวลา" },
      { pdf: slides, from: 19, to: 33, section: "reading-prep", topic: "Pre-reading, keywords, annotation และวิดีโอที่เอกสารลิงก์ไว้" },
      { pdf: slides, from: 34, to: 34, section: "english-language", topic: "กิจกรรมอ่าน The English Language ร่วมกัน" },
      { pdf: slides, from: 35, to: 36, section: "timed-assignment", topic: "งานอ่าน Dark Chocolate และสไลด์จบ (บทความและใบงานอ้างถึงยังขาด)" },
      { pdf: reading, from: 1, to: 1, section: "english-language", topic: "หน้าแบบภาพสองคอลัมน์ คำศัพท์ และ Comprehension 5 ข้อ" },
      { pdf: worksheet, from: 1, to: 7, section: "worksheet-word-form", topic: "Worksheet #1: Prefixes, Noun Suffixes และเฉลยเดิมทุกชุด" },
      { pdf: worksheet, from: 8, to: 9, section: "worksheet-prepositions", topic: "ภาพตำแหน่งในห้องและ Prepositions เติมคำ" },
      { pdf: worksheet, from: 10, to: 12, section: "lily-story", topic: "เรื่อง Lily, Phrasal Verbs 12 ข้อ และคีย์ความหมาย" }
    ]
  });
})();
