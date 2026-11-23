(() => {
  const source = "Screenshot 2569-09-14 at 15.57.43.png";

  window.ReadingSkills.addChapter({
    number: 7,
    title: "Phrasal Verbs",
    thaiTitle: "จำและอ่าน Phrasal Verbs ทั้ง 11 รายการจากตาราง",
    summary: "แหล่งของบทนี้เป็นภาพตาราง Phrasal Verb และ Meaning หนึ่งภาพ จับคู่คำทั้ง 11 รายการกับความหมายที่ภาพกำหนด และลองเลือกจากบริบทภาษาอังกฤษ",
    goals: [
      "จับคู่ phrasal verbs ทั้ง 11 รายการกับคำอธิบายภาษาอังกฤษในตาราง",
      "สังเกต clue ในประโยคเพื่อแยกคำที่หน้าตาคล้ายกัน เช่น look into กับ look forward to",
      "ใช้ phrasal verbs ในประโยคสั้น ๆ ได้ตรงความหมายที่กำลังฝึก"
    ],
    confusions: [
      "Take up ในภาพหมายถึงเริ่มทำกิจกรรม ส่วน take after หมายถึงคล้ายคนในครอบครัว",
      "Look forward to มองไปข้างหน้าด้วยความตื่นเต้น Think back on ย้อนนึกถึงอดีต",
      "Go over คือทบทวน Look into คือค้นหาข้อเท็จจริง Try out คือทดลองใช้"
    ],
    sections: [{
      id: "phrasal-table", title: "ตาราง Phrasal Verb และ Meaning", pdf: source, pages: [1],
      summary: "ภาพต้นฉบับมี 11 แถว ตารางด้านล่างจับคู่ความหมายตามภาพ พร้อมบริบทช่วยแยกคำที่ใช้คล้ายกัน",
      points: [
        ["Bring up · Mention a topic", "หยิบประเด็นขึ้นมาพูด เช่น She brought up the budget during the meeting."],
        ["Leave out · Omit", "ละหรือตัดออก เช่น Leave out the unnecessary details."],
        ["Take up · Start a new activity", "เริ่มกิจกรรมใหม่ เช่น He took up swimming last year."],
        ["Try out · Test", "ทดลองใช้หรือทดสอบ เช่น We tried out the new software before buying it."],
        ["Go over · Review", "อ่านทบทวนหรือตรวจซ้ำ เช่น Let’s go over the notes before the exam."],
        ["Look forward to · Anticipate eagerly", "ตั้งตารออย่างยินดี เช่น I look forward to meeting your group."],
        ["Look into · Investigate", "สืบหาสาเหตุหรือค้นข้อเท็จจริง เช่น The team will look into the error."],
        ["Run into · Encounter someone or something unexpectedly", "บังเอิญเจอคนหรือเรื่องที่ไม่ได้คาด เช่น I ran into an old friend at the station."],
        ["Show up · Arrive", "มาถึงหรือปรากฏตัว เช่น Only four students showed up for the session."],
        ["Take after · Resemble", "มีลักษณะคล้าย เช่น Nida takes after her father in the way she speaks."],
        ["Think back on · Recall", "นึกย้อนถึงประสบการณ์ในอดีต เช่น I often think back on my first school trip."]
      ],
      examples: [
        {
          id: "look-and-think", title: "ดูบริบทก่อนเลือกคำกลุ่ม look และ think", pdf: source, pages: [1],
          prompt: "Compare “The team will look into the problem,” “We look forward to the trip,” and “I think back on my first trip.”",
          task: "หาคำใบ้ที่บอกว่าสถานการณ์เป็นการสืบสวน การตั้งตารอ หรือการนึกย้อน",
          steps: ["problem เป็นสิ่งที่จะตรวจสอบ จึงเข้ากับ investigate", "trip ที่ยังไม่เกิดและกำลังรอตรงกับ anticipate eagerly", "first trip ที่เกิดไปแล้วเข้ากับ recall"],
          answer: "Look into = investigate. Look forward to = anticipate eagerly. Think back on = recall.",
          note: "ประโยคสร้างเพิ่มจากความหมายในภาพ คำว่า to ใน look forward to ตามด้วยคำนามหรือกริยา -ing ได้"
        },
        {
          id: "actions-and-encounters", title: "แยกกิจกรรมและการพบเจอ", pdf: source, pages: [1],
          prompt: "Which phrase fits each idea: start a new hobby, test a tool, review the notes, meet someone unexpectedly, and arrive?",
          task: "จับคู่วลีตามการกระทำหลักของแต่ละสถานการณ์",
          steps: ["start a new hobby → take up ส่วน test a tool → try out", "review notes → go over", "unexpected meeting → run into ส่วนการมาถึงตามสถานที่หรือเวลานัด → show up"],
          answer: "Take up, try out, go over, run into and show up.",
          note: "ตัวอย่างฝึกเพิ่ม ภาพต้นฉบับมีตารางความหมาย"
        }
      ]
    }],
    exercises: [
      {
        id: "q1", title: "Mention a point", pdf: source, pages: [1],
        prompt: "We did not discuss the schedule earlier, so I will ___ the issue at the next meeting.",
        choices: ["leave out", "bring up", "take after", "show up"], correctChoice: 1,
        steps: ["B ตรงกับ mention a topic และบริบทต้องการเริ่มพูดเรื่อง schedule", "A แปลว่าตัดประเด็นออก", "C แปลว่าคล้ายคนอื่น", "D บอกว่ามาถึงและใช้กับ the issue แบบนี้ไม่ได้"],
        answer: "bring up"
      },
      {
        id: "q2", title: "Start a hobby", pdf: source, pages: [1],
        prompt: "After years without a hobby, Luis decided to ___ pottery and enrolled in a beginner course.",
        choices: ["take up", "go over", "take after", "think back on"], correctChoice: 0,
        steps: ["A เหมาะกับการเริ่มกิจกรรมใหม่ คำว่า beginner course ชี้ไปที่การเริ่มต้น", "B คือทบทวน", "C คือมีลักษณะคล้ายคนอื่น", "D คือนึกย้อนถึงสิ่งที่เคยเกิดขึ้น"],
        answer: "take up"
      },
      {
        id: "q3", title: "Investigate a report", pdf: source, pages: [1],
        prompt: "The school received a complaint about missing books and promised to ___ the matter.",
        choices: ["run into", "look forward to", "show up", "look into"], correctChoice: 3,
        steps: ["D หมายถึงตรวจสอบข้อร้องเรียน", "A ใช้พบสิ่งโดยบังเอิญ", "B คือรออย่างตื่นเต้น", "C คือมาถึงหรือปรากฏตัว"],
        answer: "look into"
      },
      {
        id: "q4", title: "Meet unexpectedly", pdf: source, pages: [1],
        prompt: "I did not plan to meet Maia, but I ___ her in the supermarket yesterday.",
        choices: ["went over", "took after", "ran into", "left out"], correctChoice: 2,
        steps: ["C เข้ากับการเจอกันโดยไม่ได้วางแผน และ ran เป็นอดีตเข้ากับ yesterday", "A หมายถึงทบทวน", "B หมายถึงคล้าย", "D หมายถึงละไว้หรือตัดออก"],
        answer: "ran into"
      },
      {
        id: "q5", title: "Recall an experience", pdf: source, pages: [1],
        prompt: "Whenever I see this old photograph, I ___ the time we spent together as children.",
        choices: ["think back on", "look forward to", "try out", "bring up"], correctChoice: 0,
        steps: ["A หมายถึงนึกย้อน ภาพเก่าและ as children เป็นหลักฐานว่าเรื่องเกิดในอดีต", "B หมายถึงตั้งตารอเรื่องอนาคต", "C หมายถึงทดสอบ", "D หมายถึงยกเรื่องมาพูด ในโจทย์เน้นสิ่งที่หวนคิดเมื่อเห็นภาพ"],
        answer: "think back on"
      }
    ],
    checklist: [
      "ปิดความหมายในตารางแล้วนึกคำแปลครบ 11 รายการ",
      "บอกความแตกต่างระหว่าง go over, try out และ look into จากตัวอย่างอย่างละประโยค",
      "ยกประโยคที่แสดงว่า run into คือการพบโดยบังเอิญ และ show up คือการมาถึง"
    ],
    coverage: [
      {pdf: source, from: 1, to: 1, section: "phrasal-table", topic: "ถอดและอธิบายความหมายทั้ง 11 แถวของภาพ"}
    ]
  });
})();

