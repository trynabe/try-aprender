(() => {
  const slides = "Main Ideas  Supporting Details (Student Version).pdf";
  const worksheet = "Prima’s Thesis statement and main idea.pdf";
  const brain = "The Parts of the Brain.pdf";

  function paragraph(page, english, thai, role, vocabulary = []) {
    return { english, thai, role: "PDF หน้า " + page + " · " + role, vocabulary };
  }

  window.ReadingSkills.addChapter({
    number: 4,
    title: "Main Idea & Supporting Ideas",
    thaiTitle: "Week 3.1 · แยกหัวข้อ ใจความหลัก รายละเอียด และ Thesis Statement",
    summary: "อ่านย่อหน้าเพื่อจับว่าพูดเรื่องอะไร ผู้เขียนกำลังบอกอะไรเกี่ยวกับเรื่องนั้น และรายละเอียดใดทำให้ข้อสรุปน่าเชื่อ แล้วขยายจากย่อหน้าเดียวสู่ใจความของทั้งบทความ",
    goals: [
      "ตอบ Topic เป็นคำหรือวลีสั้น ๆ และเขียน Main Idea เป็นประโยคที่ครอบคลุมทั้งย่อหน้า",
      "แยก Stated Main Idea กับ Implied Main Idea และตรวจว่ารายละเอียดสนับสนุนข้อสรุปจริง",
      "ระบุ Thesis Statement พร้อม Topic, Opinion และ Reason และหา Topic Sentence ในย่อหน้าเนื้อหา"
    ],
    confusions: [
      "Topic ตอบว่าเขียนเรื่องอะไร ส่วน Main Idea ตอบว่าผู้เขียนต้องการบอกอะไรเกี่ยวกับเรื่องนั้น",
      "ประโยคแรกเป็นจุดเริ่มค้นหา ใจความอาจอยู่กลาง ท้าย หรือเกิดจากการรวมรายละเอียดหลายประโยค",
      "Topic Sentence ครอบคลุมหนึ่งย่อหน้า Thesis Statement ครอบคลุมทั้งบทความ"
    ],
    sections: [
      {
        id: "topic-and-details", title: "Topic, Main Idea และ Supporting Details", pdf: slides, pages: [1, 2, 3, 4, 5, 6, 7, 8],
        summary: "หน้า 1 เปิดหัวข้อ หน้า 2–4 นิยามสามระดับของข้อมูล และหน้า 5–8 ใช้ย่อหน้าเดียวกันเพื่อค่อย ๆ ไฮไลต์หัวข้อ ประโยคใจความ และรายละเอียด",
        points: [
          ["Topic", "เรื่องที่กล่าวถึง มักตอบเป็นคำหนึ่งหรือสองคำตามตัวอย่าง เช่น pets"],
          ["Main Idea", "ใจความสำคัญที่สุดของย่อหน้า ต้องเป็นประโยคที่บอกแนวคิดเกี่ยวกับ Topic"],
          ["Stated / implied", "Stated มีประโยคหลักฐานที่ระบุใจความตรง ๆ ส่วน implied ต้องรวมรายละเอียดแล้วถอดความเอง"],
          ["Supporting Details", "ข้อเท็จจริง คำอธิบาย หลักฐาน หรือตัวอย่างที่ทำให้ Main Idea ชัดขึ้น ภาพหน้า 4 ย้ำเรื่องการขอรายละเอียดเพิ่ม"],
          ["ทดสอบใจความ", "อ่านตัวเลือกแล้วถามว่าครอบคลุมรายละเอียดสำคัญทุกกลุ่มไหม และมีข้ออ้างเกินหลักฐานหรือเปล่า"]
        ],
        passages: [{
          id: "pets", title: "Having a pet can be good for you", pdf: slides, pages: [5, 6, 7, 8],
          paragraphs: [{
            english: "Having a pet can be good for you.",
            thai: "การเลี้ยงสัตว์อาจส่งผลดีต่อตัวคุณ ย่อหน้ายกความเป็นเพื่อน การมีสิ่งอื่นให้ใส่ใจ และการลดความเครียดมาขยาย",
            role: "ประโยคเปิดและ Stated Main Idea",
            vocabulary: ["good company = เพื่อนคลายเหงา", "focus on = จดจ่อหรือใส่ใจ", "reduce stress = ลดความเครียด", "adopt = รับมาเลี้ยง"],
            analysis: "คำว่า can แสดงความเป็นไปได้ อย่าแทนด้วย always หรือ must ในคำตอบ ส่วน dogs and cats เป็นตัวอย่างของ pets"
          }],
          questions: [{
            id: "pets-model", title: "แบบตัวอย่างสัตว์เลี้ยงจากสไลด์", pdf: slides, pages: [5, 6, 7, 8],
            prompt: "Identify the topic, main idea and three supporting details.",
            task: "หาแถบสีของแต่ละระดับตามตัวอย่าง",
            steps: [
              "หน้า 6 ไฮไลต์ pet/pets ซ้ำ ๆ จึงตอบ Topic ว่า pets",
              "หน้า 7 ไฮไลต์ประโยคแรก เพราะครอบคลุมประโยชน์หลายแบบ",
              "หน้า 8 เลือกสามประโยคที่อธิบายว่าดีอย่างไร ได้แก่ เป็นเพื่อน ให้สิ่งอื่นให้ใส่ใจ และอาจลดความเครียด"
            ],
            answer: "Topic: pets. Main idea: Having a pet can be good for you. Details: companionship, giving people something to focus on and reducing stress.",
            note: "สไลด์เฉลยด้วยสีเหลืองสำหรับ Topic สีฟ้าสำหรับ Main Idea และสีชมพูสำหรับ Supporting Details"
          }]
        }],
        examples: []
      },
      {
        id: "protect-amazon", title: "Now You Try · The Amazon Rainforest", pdf: slides, pages: [9],
        summary: "แยกข้อสรุปเรื่องการปกป้องป่าออกจากข้อมูลที่ใช้รองรับ เช่น ความหลากหลาย การกักเก็บคาร์บอน และวัฏจักรน้ำ",
        points: [["preserve / extinction", "preserve คือรักษาไว้ ส่วน extinction คือการสูญพันธุ์"], ["carbon and water cycles", "วัฏจักรคาร์บอนและน้ำเป็นเหตุผลเชิงระบบที่อธิบายความสำคัญของป่า"]],
        passages: [{
          id: "protect-amazon-paragraph", title: "อ่านย่อหน้า · Protecting the Amazon Rainforest", pdf: slides, pages: [9],
          paragraphs: [
            paragraph(9, "Protecting the Amazon rainforest is very important.", "ย่อหน้าตั้งใจความว่าต้องปกป้องป่า จากนั้นให้ข้อมูลอายุและขนาด ความหลากหลายที่เสี่ยงสูญพันธุ์ คาร์บอนที่ป่ากักไว้ และน้ำที่ต้นไม้ปล่อยสู่อากาศ ตัวเลขสนับสนุนประโยชน์ต่อภูมิอากาศและวัฏจักรธรรมชาติ", "Stated Main Idea ตามด้วยหลักฐานสามกลุ่ม", ["preserved = ได้รับการปกป้อง", "stored = ถูกกักเก็บ", "stabilizing the Earth’s climate = ช่วยให้ภูมิอากาศโลกเสถียร"])
          ]
        }],
        examples: [{
          id: "amazon-original-task", title: "เติม Topic, Main Idea และ Supporting Details", pdf: slides, pages: [9],
          prompt: "Protecting the Amazon rainforest is very important. Identify the topic, main idea and supporting details in the paragraph.",
          task: "ตอบให้ครบสามช่องและจัดกลุ่มหลักฐาน",
          steps: [
            "คำหลักคือ the Amazon rainforest ส่วนประโยคแรกยืนยันว่าการปกป้องป่าสำคัญ",
            "อ่านตัวเลขตามข้อความหน้า 9 ป่ามีมาราว 55 ล้านปี ครอบคลุม 6.7 ล้านตารางกิโลเมตร และมีสัตว์ป่ากว่า 3 ล้านชนิด สัตว์อาจสูญพันธุ์หากป่าไม่ได้รับการปกป้อง",
            "ในสไลด์มีคาร์บอนราว 76 พันล้านตัน และต้นไม้ปล่อยน้ำเข้าบรรยากาศราว 20 พันล้านตันต่อวัน เชื่อมกับการควบคุมสภาพภูมิอากาศและวัฏจักรน้ำ"
          ],
          answer: "Topic: the Amazon rainforest. Main idea: Protecting the Amazon rainforest is very important. Details: biodiversity and extinction risk, carbon storage and climate, and the release of water into the atmosphere.",
          note: "แนวเฉลยจากย่อหน้า ตัวเลขเป็นข้อมูลที่ยกไว้ในต้นฉบับเพื่อฝึกอ่าน"
        }]
      },
      {
        id: "thesis-and-topic-sentence", title: "Thesis Statement เทียบกับ Topic Sentence", pdf: slides, pages: [10, 11, 12, 13, 14, 15],
        summary: "ภาพเปรียบเทียบหน้า 10 แยกขอบเขตทั้งบทความกับหนึ่งย่อหน้า หน้า 11 ชี้ข้อยกเว้นเรื่องจำนวนประโยคและจำนวนเหตุผล หน้า 12–15 ทำสีแยกส่วนใน Why Protect the Amazon",
        points: [
          ["Thesis Statement", "ใจความระดับบทความ มักอยู่ท้ายบทนำ มี Topic + Opinion หรือ Claim + Reason แบบที่ใช้ในชั้นเรียน"],
          ["Topic Sentence", "ประโยคที่บอกหัวข้อและแนวคิดควบคุม (controlling idea) ของย่อหน้า มักอยู่ต้นย่อหน้าเนื้อหา"],
          ["ข้อยกเว้นหน้า 11", "ความชัดเจนสำคัญกว่าแบบตายตัว Thesis อาจยาวสองหรือสามประโยคและจำนวนเหตุผลไม่จำเป็นต้องสามข้อ"],
          ["Controlling Idea", "ส่วนที่กำหนดว่าจะพูดเรื่องใดเกี่ยวกับ Topic ในย่อหน้านี้ เช่น ความสำคัญของ Amazon ในฐานะบ้านของกลุ่มชนพื้นเมือง"]
        ],
        passages: [{
          id: "why-protect-amazon-paragraphs", title: "อ่านสองย่อหน้า · Why Protect the Amazon", pdf: slides, pages: [12, 13, 14, 15],
          paragraphs: [
            paragraph("12–13", "The Amazon contains the single largest tropical rainforest on the planet.", "ย่อหน้าแนะนำขนาดที่ครอบคลุมประมาณร้อยละ 40 ของทวีปและพื้นที่กว่าพันหกร้อยล้านเอเคอร์ในเก้าประเทศ น้ำจากแอนดีสไหลสู่แม่น้ำไปถึงแอตแลนติก ทำให้เกิดลุ่มน้ำขนาดใหญ่ ประโยคท้ายยกบทบาทต่อวัฏจักรคาร์บอนและน้ำเป็นเหตุผลที่ระบบนิเวศนี้สำคัญ", "บทนำและ Thesis ที่ท้ายย่อหน้า", ["foothills = เชิงเขา", "river basin = ลุ่มน้ำ", "terrestrial biome = ชีวนิเวศบนบก"]),
            paragraph("12, 14–15", "Not only is the Amazon a biodiversity hotspot, but it is also home to a wide range of indigenous groups.", "ย่อหน้า Ancestral Homelands เน้นว่าป่านอกจากมีความหลากหลายทางชีวภาพ ยังเป็นบ้านของกลุ่มชนพื้นเมืองจำนวนมาก กว่า 400 กลุ่มมีวัฒนธรรม ภาษา และอาณาเขตของตัวเอง ส่วนเกือบ 100 กลุ่มเลือกแยกตัวหรือยังไม่ได้ติดต่อกับคนภายนอก", "ย่อหน้าเนื้อหา · Topic Sentence แล้วตามด้วยรายละเอียด", ["biodiversity hotspot = พื้นที่ความหลากหลายทางชีวภาพสูง", "uncontacted = ยังไม่ได้ติดต่อกับสังคมภายนอก"])
          ]
        }],
        examples: [
          {
            id: "amazon-thesis", title: "Why Protect the Amazon · แยก Topic, Opinion และ Reason", pdf: slides, pages: [12, 13],
            prompt: "Identify the parts of the thesis statement in the first passage.",
            task: "ใช้ประโยคที่สไลด์ทำตัวหนาและทำสีเป็นหลักฐาน",
            steps: ["หน้า 12 วางประโยค Thesis ไว้ท้ายย่อหน้าแรก ประโยคก่อนหน้าให้ขนาดของป่าและเส้นทางแม่น้ำ", "หน้า 13 สีฟ้าทำเครื่องหมาย “The Amazon’s forests and waters” สีส้มเน้นการจัดให้เป็น terrestrial biome ที่สำคัญที่สุด", "คำเชื่อม for นำเหตุผลเรื่องบทบาทในวัฏจักรคาร์บอนและน้ำระดับโลกและระดับภูมิภาค"],
            answer: "Topic: the Amazon’s forests and waters. Opinion: they make it the most important terrestrial biome. Reason: it is critical to global and regional carbon and water cycles.",
            note: "อิงสีและลูกศรในภาพสไลด์"
          },
          {
            id: "amazon-topic-sentence", title: "Ancestral Homelands · แยก Topic Sentence และรายละเอียด", pdf: slides, pages: [12, 13, 14, 15],
            prompt: "Identify the topic sentence, its controlling idea and two supporting details.",
            task: "แยกข้อสรุปของย่อหน้าออกจาก Thesis ทั้งบทความ",
            steps: ["ประโยคต้นใช้ Not only … but also … เชื่อมความหลากหลายทางชีวภาพกับบทบาทการเป็นบ้านของชนพื้นเมือง โดยภาพหน้า 14 ทำสีกรอบใจความเรื่องชนพื้นเมือง", "ตัวเลขกว่า 400 กลุ่มรองรับความหลากหลายของวัฒนธรรม ภาษา และดินแดน", "เกือบ 100 กลุ่มอยู่แบบแยกตัว ป่ามีบทบาทคุ้มครองและหล่อเลี้ยงวิถีชีวิต"],
            answer: "The Amazon is a biodiversity hotspot and home to many Indigenous groups. Supporting details: over 400 tribes rely on the forest; nearly 100 tribes are uncontacted or voluntarily isolated.",
            note: "ตัวเลขและช่วงความหมายอิงสไลด์หน้า 12–15"
          }
        ]
      },
      {
        id: "parts-of-the-brain", title: "The Parts of the Brain · ฝึกหา Thesis", pdf: brain, pages: [1, 2],
        summary: "อ่านบทความเสริมเพื่อทำกิจกรรมหน้า 16 ของสไลด์ ภาพหน้า 1 แสดง cerebrum, lobes, cerebellum และ brain stem แล้วบทความอธิบายหน้าที่ของแต่ละส่วน",
        points: [
          ["Cerebrum", "สมองส่วนใหญ่ที่สุด ควบคุมการคิดและการเคลื่อนไหวที่ตั้งใจ แบ่งสอง hemispheres และอธิบายหน้าที่ของ lobes สี่ส่วน"],
          ["Lobes", "Frontal เกี่ยวกับการคิดวางแผน การพูด การเคลื่อนไหวและอารมณ์ Occipital ประมวลภาพ Temporal เกี่ยวกับการได้ยินและความจำ Parietal ประมวลสิ่งเร้า เช่น แรงกด อุณหภูมิ และความเจ็บ"],
          ["Cerebellum", "อยู่ด้านหลังและใต้ cerebrum ช่วยให้กล้ามเนื้อทำงานประสาน การทรงตัว และการเคลื่อนไหว"],
          ["Brainstem", "อยู่ใต้ cerebrum หน้า cerebellum เชื่อมสมองกับไขสันหลัง และควบคุมหน้าที่อัตโนมัติ เช่น หายใจ"],
          ["ป้ายกำกับในภาพหน้า 1", "วงเล็บ Brainstem รวม Midbrain, Pons และ Medulla จากบนลงล่าง ส่วนวงเล็บ Cerebrum ครอบ Frontal, Parietal, Temporal และ Occipital Lobes"],
          ["Voluntary / involuntary", "เต้นหรือวิ่งเพราะตั้งใจเป็น voluntary การหายใจตามปกติโดยไม่ได้คิดสั่งเป็นตัวอย่าง involuntary ในบทอ่าน"]
        ],
        passages: [{
          id: "brain-passage", title: "โครงบทอ่านสองหน้าและคำศัพท์", pdf: brain, pages: [1, 2],
          paragraphs: [
            paragraph(1, "The brain is the control center of the body.", "ย่อหน้าเปิดบอกว่าสมองประมวลผลการตัดสินใจ ความจำ และการเคลื่อนไหว จากนั้นถามว่าสมองจัดการงานเหล่านี้ได้อย่างไร ประโยคท้ายเสนอให้เข้าใจส่วนต่าง ๆ ของสมองเพื่อเข้าใจการทำงาน", "บทนำและ Thesis", ["control center = ศูนย์ควบคุม", "function = ทำหน้าที่"]),
            paragraph(1, "There are three main parts of the brain.", "แต่ละส่วนรับผิดชอบงานเฉพาะ และทุกส่วนประสานกันให้ร่างกายมีชีวิต หายใจ และคิดได้ บทอ่านตั้งชื่อสามส่วนที่จะอธิบายต่อ คือ cerebrum, cerebellum และ brain stem", "แจกแจงโครงเรื่องที่จะอ่านต่อ"),
            paragraph(1, "The cerebrum is the biggest part of the brain.", "สมองใหญ่เกี่ยวกับการคิดและการเคลื่อนไหวที่ตั้งใจ เช่น วิ่ง เต้น เตะลูกบอล มีสองซีกและแบ่งเป็นสี่กลีบที่มีหน้าที่ต่างกัน", "อธิบายส่วนที่หนึ่งและเตรียมเข้าสู่กลีบสมอง", ["hemisphere = ซีก", "lobe = กลีบสมอง", "voluntary = ที่ตั้งใจ"]),
            paragraph(2, "The four lobes are the frontal lobe, the occipital lobe, the temporal lobe, and the parietal lobe.", "Frontal เกี่ยวกับการคิด วางแผน พูด การเคลื่อนไหว อารมณ์ และแก้ปัญหา Occipital ประมวลภาพ Temporal เกี่ยวกับการได้ยินและความจำ Parietal รับสิ่งเร้า เช่น แรงกด อุณหภูมิ หรือความเจ็บ", "รายละเอียดรองรับว่ากลีบต่าง ๆ มีหน้าที่เฉพาะ", ["stimuli = สิ่งเร้า"]),
            paragraph(2, "The cerebellum is another part of the brain", "สมองน้อยอยู่ด้านหลังและใต้สมองใหญ่ ช่วยให้ทรงตัว เคลื่อนไหว และให้กล้ามเนื้อทำงานประสานกัน ตัวอย่างคือขยับร่างกายได้โดยไม่ล้ม", "อธิบายส่วนที่สอง", ["coordination = การประสานกัน"]),
            paragraph(2, "The brainstem is below the cerebrum and in front of the cerebellum.", "ก้านสมองอยู่ใต้สมองใหญ่และหน้าสมองน้อย เชื่อมกับไขสันหลัง บทอ่านใช้การหายใจโดยไม่ต้องคิดสั่งเป็นตัวอย่างของการทำงานอัตโนมัติ และยกการสูบฉีดเลือด การย่อยอาหาร และงานจำเป็นต่อการดำรงชีวิต", "อธิบายส่วนที่สาม และเปรียบเทียบ voluntary กับ involuntary", ["spinal cord = ไขสันหลัง", "involuntary = ที่เกิดโดยอัตโนมัติ"]),
            paragraph(2, "Together, these three parts coordinate across different areas of the brain", "แม้แต่ละส่วนจะมีบริเวณย่อยและหน้าที่เฉพาะ การทำงานทั้งหมดต้องอาศัยทั้งสามส่วนประสานกัน ใจความนี้ตอบคำถามที่ตั้งไว้ต้นเรื่อง", "ย่อหน้าสรุป", ["accomplish = ทำให้สำเร็จ"])
          ]
        }],
        examples: [{
          id: "brain-original-task", title: "Now You Try · The Parts of the Brain", pdf: slides, pages: [16],
          prompt: "Identify the thesis statement and label its topic, opinion and reason.",
          task: "เปิดบทอ่านหน้า 1 ย่อหน้าแรกแล้วเทียบกับเนื้อหาส่วนที่เหลือ",
          steps: [
            "คำถามต้นบทคือสมองจัดการงานอย่างไร ประโยคสุดท้ายของย่อหน้าแรกเชื่อม how the brain functions เข้ากับ understand the different parts",
            "Topic คือส่วนต่าง ๆ ของสมอง ข้อเสนอของผู้เขียนคือเราควรทำความเข้าใจส่วนเหล่านี้ และวัตถุประสงค์คือเพื่อเข้าใจว่าสมองทำงานอย่างไร",
            "ยืนยันด้วยย่อหน้าถัดไปที่แจกแจงแต่ละส่วนและย่อหน้าสุดท้ายที่อธิบายการทำงานร่วมกัน"
          ],
          answer: "“In order to understand how the brain functions, it’s important to understand the different parts of the brain.” Topic: the different parts of the brain. Opinion: understanding them is important. Reason/purpose: to understand how the brain functions.",
          note: "แนววิเคราะห์อิงหน้า 1 ของ The Parts of the Brain.pdf คำว่า Opinion ในแบบฝึกหมายถึงข้อเสนอแกนกลางของผู้เขียนในบทความอธิบาย"
        }]
      },
      {
        id: "primas-worksheet", title: "Prima’s Worksheet · Internet and School Uniforms", pdf: worksheet, pages: [1, 2, 3],
        summary: "หน้า 1 มีสองย่อหน้าหัวข้ออินเทอร์เน็ต ใช้คนละชุดคำถาม หน้า 2 เป็นเรียงความเรื่องเครื่องแบบนักเรียน และหน้า 3 เป็นช่องคำตอบของเรียงความ",
        points: [["because / therefore", "because เปิดเหตุผล ส่วน therefore เปิดข้อสรุปที่เชื่อมจากข้อมูลก่อนหน้า"], ["First / Second / Finally", "คำบอกลำดับช่วยหา main points และ topic sentences แยกเป็นสามย่อหน้า"]],
        passages: [
          {
            id: "primas-internet-paragraphs", title: "อ่านตามย่อหน้า · Internet: Education and Society", pdf: worksheet, pages: [1],
            paragraphs: [
              paragraph(1, "The internet has become an important part of education today.", "อินเทอร์เน็ตช่วยให้ค้นข้อมูลได้เร็ว เรียนเพิ่มผ่านคอร์สและวิดีโอ และติดต่อครูกับเพื่อนสะดวก ผู้เขียนย้ำท้ายย่อหน้าว่าประโยชน์รวมกันทำให้อินเทอร์เน็ตเป็นเครื่องมือเรียนรู้ที่ทรงพลัง", "ย่อหน้าที่ 1 · ตั้งแล้วขยาย Main Idea ด้วยสามกลุ่มประโยชน์", ["research information = ค้นคว้าข้อมูล", "enhance = ยกระดับ"]),
              paragraph(1, "In today’s digital age, the internet has transformed how people communicate, learn, and work.", "ย่อหน้าที่สองมองอินเทอร์เน็ตในชีวิตสมัยใหม่กว้างขึ้น ทั้งความรู้ การเชื่อมต่อ ความสร้างสรรค์ ความบันเทิง และการแสดงตัวตน ส่วน While ยอมรับปัญหาสมาธิหรือใช้นานเกินก่อนสรุปจุดยืนหลัง Therefore", "ย่อหน้าที่ 2 · ปูบริบท ยอมรับข้อจำกัด และลงท้ายด้วย Thesis", ["overuse = การใช้งานมากเกิน", "self-expression = การแสดงตัวตน"])
            ]
          },
          {
            id: "primas-uniform-paragraphs", title: "อ่านตามย่อหน้า · Why School Uniforms Should Not Be Mandatory", pdf: worksheet, pages: [2],
            paragraphs: [
              paragraph(2, "Many schools around the world require students to wear uniforms every day.", "ผู้สนับสนุนเชื่อว่าเครื่องแบบช่วยให้เท่าเทียมและลดแรงกดดันเรื่องแฟชั่น ผู้เขียนเปลี่ยนมุมด้วย However แล้วลงท้ายด้วยจุดยืนว่าไม่ควรบังคับ เพราะจำกัดความเป็นตัวเอง เพิ่มค่าใช้จ่าย และลดความสบาย", "ย่อหน้าบทนำและ Thesis", ["mandatory = ที่ต้องทำตามข้อบังคับ", "equality = ความเท่าเทียม"]),
              paragraph(2, "First, mandatory school uniforms restrict students’ individuality.", "เสื้อผ้าช่วยแสดงรสนิยม ความสนใจ และวัฒนธรรม การแต่งเหมือนกันอาจทำให้นักเรียนพลาดโอกาสแสดงตัวตนและรู้สึกผูกพันกับโรงเรียนน้อยลง", "ย่อหน้าเนื้อหา 1 · อธิบายความเป็นตัวเอง", ["individuality = ลักษณะเฉพาะและความเป็นตัวเอง"]),
              paragraph(2, "Second, uniforms add unnecessary costs for families.", "ผู้ปกครองต้องซื้อเสื้อผ้าทั่วไปและเครื่องแบบเพิ่ม เด็กโตเร็วจนใส่ชุดเดิมไม่ได้ และบางครั้งต้องมีหลายชุด เงินจึงอาจถูกใช้แทนงบซื้อหนังสือหรืออุปกรณ์เรียน", "ย่อหน้าเนื้อหา 2 · ขยายต้นทุนและสิ่งที่ต้องเสียโอกาส", ["outgrow = โตจนใส่ของเดิมไม่ได้", "financial stress = ความตึงเครียดทางการเงิน"]),
              paragraph(2, "Finally, uniforms often reduce student comfort.", "ผ้าหนาในอากาศร้อนหรือชุดที่ไม่พอดีตัวทำให้อึดอัดหรือประหม่า เมื่อสมาธิลดลงก็อาจกระทบการเรียน", "ย่อหน้าเนื้อหา 3 · เชื่อมความสบายกับการเรียน", ["overheated = ร้อนเกิน", "self-conscious = ประหม่าเพราะกังวลสายตาผู้อื่น"]),
              paragraph(2, "In conclusion, school uniforms should not be mandatory", "ผู้เขียนย้ำเหตุผลสามข้อแล้วเสนอให้โรงเรียนส่งเสริมการแต่งกายที่ให้เกียรติและเหมาะสม โดยเปิดทางให้นักเรียนเลือกชุดได้", "ย่อหน้าสรุป · ย้ำข้ออ้างและเสนอทางเลือก", ["appropriate = เหมาะสม"])
            ]
          }
        ],
        examples: [
          {
            id: "internet-education", title: "Worksheet หน้า 1 · Internet in Education", pdf: worksheet, pages: [1],
            prompt: "Identify the topic, main idea and three supporting details in the first passage.",
            task: "แยกประโยชน์หลักออกจากชื่อเครื่องมือที่เป็นตัวอย่างย่อย",
            steps: ["Topic คืออินเทอร์เน็ตในด้านการศึกษา ประโยคแรกตั้งใจความ และประโยคท้ายย้ำว่าเป็นเครื่องมือเรียนรู้ที่ทรงพลัง", "จับสามกลุ่มคือการค้นข้อมูลเร็ว (Google) การเรียนข้างนอกห้อง (คอร์สและวิดีโอ) และการติดต่อครูกับเพื่อน (อีเมลและข้อความ)", "ชื่อแพลตฟอร์มในวงเล็บทำหน้าที่เป็นตัวอย่าง กลุ่มประโยชน์ครอบคลุมรายละเอียดได้มากกว่า"],
            answer: "Topic: the internet in education. Main idea: The internet is an important tool for learning. Details: quick research, online courses and videos, and communication with teachers and classmates.",
            note: "แนวเฉลยจากใบงานที่เว้นช่องให้ตอบ"
          },
          {
            id: "internet-society", title: "Worksheet หน้า 1 · The Internet in Modern Society", pdf: worksheet, pages: [1],
            prompt: "Find the thesis statement. Identify its topic, opinion and reasons.",
            task: "อ่านย่อหน้าที่สองและหาประโยคหลัง Therefore",
            steps: ["Therefore สรุปข้ออ้างของย่อหน้าว่าอินเทอร์เน็ตเป็นเครื่องมือจำเป็นของสังคมสมัยใหม่", "Topic คือ the internet ส่วน essential tool for modern society คือความคิดเห็น", "หลัง because แยกเป็นสามเหตุผล ได้แก่ เข้าถึงความรู้ เชื่อมต่อทั่วโลก และเติบโตส่วนบุคคล คำว่า While นำข้อจำกัดที่ผู้เขียนยอมรับ"],
            answer: "The internet is essential to modern society because it improves access to knowledge, strengthens global connections and encourages personal growth.",
            note: "แนวเฉลยจากใบงาน ข้อสรุปนี้มาจากย่อหน้าที่สอง"
          },
          {
            id: "uniform-essay", title: "Worksheet หน้า 2–3 · Why School Uniforms Should Not Be Mandatory", pdf: worksheet, pages: [2, 3],
            prompt: "Write the topic, thesis statement and the three body-paragraph topic sentences.",
            task: "จับโครงของบทนำ ย่อหน้าเนื้อหาสามย่อหน้า และบทสรุป",
            steps: ["บทนำเปิดด้วยมุมของผู้สนับสนุนเรื่อง equality และ fashion pressure แล้ว However เปลี่ยนไปจุดยืนผู้เขียน ก่อน Therefore สรุป Thesis", "First บอกเรื่องการจำกัด individuality ตัวอย่างคือเสื้อผ้าสีสันและชุดวัฒนธรรม Second บอกเรื่องค่าใช้จ่าย เช่น ต้องซื้อหลายชุดและเด็กโตเร็ว", "Finally บอกเรื่อง comfort ผ้าหนาในอากาศร้อนหรือรูปทรงชุดที่ไม่เหมาะอาจรบกวนการเรียน ท้ายเรื่องย้ำทั้งสามและเสนอกฎการแต่งกายที่เหมาะสม"],
            answer: "Topic: mandatory school uniforms. Thesis: school uniforms should not be mandatory because they restrict individuality, add unnecessary costs and reduce student comfort. Body points: (1) restrict individuality, (2) increase family costs, (3) reduce comfort.",
            note: "แนวเฉลยสำหรับช่องหน้า 3 หากโจทย์ให้คัด topic sentences ให้เปิดหน้า 2 และใช้ประโยคขึ้นต้นด้วย First, Second และ Finally"
          }
        ]
      }
    ],
    exercises: [
      {
        id: "q1", title: "Select the topic", pdf: slides, pages: [2, 3],
        prompt: "A paragraph explains that a school garden gives students a place to learn science and helps them work together. Which answer is the topic?",
        choices: ["Science experiments", "The school garden", "A school garden helps students learn and cooperate.", "Working together is difficult."], correctChoice: 1,
        steps: ["B เป็นวลีสั้นระบุเรื่องที่ครอบคลุมทั้งสองผล", "A จับรายละเอียดด้านการเรียนส่วนเดียว", "C เป็นประโยคใจความของย่อหน้า", "D เป็นข้ออ้างเรื่องความยากที่โจทย์ไม่บอก"],
        answer: "The school garden"
      },
      {
        id: "q2", title: "Infer the main idea", pdf: slides, pages: [3, 4],
        prompt: "The library now stays open after class. Students who work in the afternoon can come later, and students without a quiet study space at home can use its desks. What is the implied main idea?",
        choices: ["Every student works in the afternoon.", "The library has more desks than it used to.", "Students should always study at home.", "Longer library hours make study space more accessible."], correctChoice: 3,
        steps: ["D รวมประโยชน์ของช่วงเวลาที่เข้าถึงได้และสถานที่อ่านหนังสือ", "A เปลี่ยนผู้เรียนบางส่วนเป็นทุกคน", "B สรุปจำนวนโต๊ะที่ข้อความไม่เปรียบเทียบ", "C กลับทิศกับตัวอย่างที่ช่วยคนไม่มีที่อ่านที่บ้าน"],
        answer: "Longer library hours make study space more accessible."
      },
      {
        id: "q3", title: "Pick the supporting detail", pdf: slides, pages: [4, 5, 6, 7, 8],
        prompt: "Which detail best supports the claim that public parks encourage exercise?",
        choices: ["Marked walking paths give visitors a place to jog.", "The park gate is dark green.", "The park opens near a busy road.", "Some people prefer tea to coffee."], correctChoice: 0,
        steps: ["A เชื่อมสิ่งอำนวยความสะดวกกับกิจกรรมออกกำลัง", "B อธิบายสีซึ่งไม่แสดงผลต่อการออกกำลัง", "C เป็นที่ตั้งและไม่แสดงว่ามีการออกกำลัง", "D อยู่นอกหัวข้อสวนสาธารณะ"],
        answer: "Marked walking paths give visitors a place to jog."
      },
      {
        id: "q4", title: "Thesis versus topic sentence", pdf: slides, pages: [10, 11, 12, 13, 14, 15],
        prompt: "An essay argues that cycling improves city life by reducing noise, traffic and air pollution. Which sentence best starts the body paragraph about noise?",
        choices: ["Cycling improves cities by reducing noise, traffic and air pollution.", "Air quality can improve when fewer cars are used.", "Replacing some car trips with bicycle trips can make streets quieter.", "There are many bicycles."], correctChoice: 2,
        steps: ["C จำกัดขอบเขตไว้ที่ความเงียบของถนนซึ่งเป็น controlling idea ของย่อหน้า", "A ครอบคลุมทั้งสามประเด็น จึงเหมาะเป็น Thesis", "B เปิดประเด็นย่อหน้าเรื่องมลพิษ", "D กล่าวถึงจำนวนจักรยานโดยยังไม่ตั้งประเด็นเรื่องเสียง"],
        answer: "Replacing some car trips with bicycle trips can make streets quieter."
      },
      {
        id: "q5", title: "Identify the reason", pdf: worksheet, pages: [1],
        prompt: "In the thesis “Schools should offer free breakfast because it helps students concentrate in morning lessons,” what is the reason?",
        choices: ["Schools already offer free breakfast.", "Free breakfast helps students concentrate in morning lessons.", "Schools should offer free breakfast.", "Students should skip morning lessons."], correctChoice: 1,
        steps: ["B ถอดข้อความหลัง because ซึ่งบอกเหตุผล", "A เพิ่มข้อเท็จจริงที่โจทย์ไม่บอก", "C ยกจุดยืนก่อน because", "D เสนอพฤติกรรมที่ไม่ปรากฏและผิดทิศกับเป้าหมายการเรียน"],
        answer: "Free breakfast helps students concentrate in morning lessons."
      }
    ],
    checklist: [
      "บอก Topic เป็นคำ วลี หรือชื่อเรื่อง และเขียน Main Idea ให้เป็นประโยคเต็ม",
      "ชี้ supporting details อย่างน้อยสองกลุ่มแล้วอธิบายว่าหนุนใจความอย่างไร",
      "หา Thesis ในบทนำและ Topic Sentence ในย่อหน้าเนื้อหาโดยตรวจขอบเขต",
      "แยก Topic–Opinion–Reason และตรวจคำที่แสดงทิศทาง เช่น however, because, therefore"
    ],
    coverage: [
      {pdf: slides, from: 1, to: 8, section: "topic-and-details", topic: "นิยามและตัวอย่าง Pets พร้อมไฮไลต์สามระดับ"},
      {pdf: slides, from: 9, to: 9, section: "protect-amazon", topic: "กิจกรรมปกป้อง Amazon และข้อมูลเชิงตัวเลข"},
      {pdf: slides, from: 10, to: 15, section: "thesis-and-topic-sentence", topic: "ภาพเปรียบเทียบ Thesis/Topic Sentence และตัวอย่าง Amazon"},
      {pdf: slides, from: 16, to: 16, section: "parts-of-the-brain", topic: "โจทย์ระบุ Thesis, Topic, Opinion และ Reason"},
      {pdf: brain, from: 1, to: 2, section: "parts-of-the-brain", topic: "บทอ่านสองหน้าและภาพส่วนของสมอง"},
      {pdf: worksheet, from: 1, to: 3, section: "primas-worksheet", topic: "ตอบใบงานอินเทอร์เน็ตสองย่อหน้าและเรียงความเรื่อง Uniforms"}
    ]
  });
})();

