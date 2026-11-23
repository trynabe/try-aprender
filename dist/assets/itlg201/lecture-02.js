(() => {
  const pdf = "Prepositions and Phrasal Verbs (Student Version).pdf";
  const worked = (id, title, pages, prompt, steps, answer, extra = {}) => ({
    id, title, pdf, pages, prompt, steps, answer, original: !extra.practice,
    answerOrigin: extra.practice ? undefined : "คำตอบตัวอย่างจากการวิเคราะห์", ...extra
  });
  const quiz = (id, title, pages, prompt, choices, correctChoice, steps) => ({
    id, title, pdf, pages, prompt, choices, correctChoice, steps, answer: choices[correctChoice], practice: true
  });
  window.ReadingSkills.addChapter({
    number: 2,
    title: "Prepositions & Phrasal Verbs",
    thaiTitle: "Week 2.1 · อ่านความสัมพันธ์ในประโยคและความหมายของกริยาหลายคำ",
    summary: "เริ่มจากการมอง preposition กับ object เป็นกลุ่มเดียว แล้วอ่านคำบอกเวลา สถานที่ และความสัมพันธ์ ต่อด้วย idioms และกฎตำแหน่งกรรมของ phrasal verbs",
    goals: [
      "หา prepositional phrase, object และคำที่กลุ่มวลีขยายได้",
      "เลือก in, on, at และ of จากขนาดช่วงเวลา ตำแหน่ง และความสัมพันธ์ตามประโยคได้",
      "แปล idiom จากบริบทและวางกรรมที่เป็น noun หรือ pronoun ใน phrasal verb ได้"
    ],
    confusions: [
      "in, on และ at ใช้ได้ทั้งบอกเวลาและสถานที่ ให้เริ่มจากดูคำที่ตามหลัง",
      "to + สถานที่มักเป็น preposition เช่น to school ส่วน to + base verb มักเป็น infinitive เช่น to study; go to sleep เป็นสำนวนที่ใช้ sleep เป็นคำนามได้",
      "look up (ค้นข้อมูล) ในหน้า 41 แยกได้ แม้สไลด์จะจัดเป็น inseparable กลุ่มที่แยกไม่ได้มีตัวอย่างชัดอย่าง look after"
    ],
    sections: [
      {
        id: "preposition-objects", title: "Prepositions และ Object of a Preposition", pdf, pages: "1–15",
        summary: "Preposition บอกความสัมพันธ์ระหว่างส่วนของประโยค เช่น รูปแบบ เวลา สถานที่ ทิศทาง และวิธีการ ให้ขีดเส้นใต้ทั้งวลีแล้วถามว่าวลีสัมพันธ์กับอะไร",
        points: [
          ["หากรรม · หน้า 2–7", "in a taxi มี in เป็น preposition และ a taxi เป็น object ทั้งวลี; to a café, for his son, at the mall เป็นตัวอย่างที่มีคำนามตามหลังพร้อมคำขยาย ใน he went to sleep early ใช้ go to sleep = เข้านอน/หลับ"],
          ["มองสิ่งที่วลีขยาย · หน้า 8–12", "the man inside the restaurant = ผู้ชายคนไหน; the bag with the Prada logo = กระเป๋าแบบไหน; go to school = ไปที่ไหน; after work = เมื่อไหร่; in a taxi = ไปด้วยวิธีไหน"],
          ["ตารางและลูกศร · หน้า 13–14", "ตารางแยก time, place, direction/movement, manner และความสัมพันธ์อื่น ลูกศรช่วยชี้ว่า to the store บอกปลายทาง, from China บอกต้นทาง, with my friend บอกผู้ร่วม, on my desk อยู่บนพื้นผิว และ under the bed อยู่ด้านล่าง; at home มองบ้านเป็นจุดที่อยู่"],
          ["เข้าใจ phrase", "prepositional phrase มักประกอบด้วย preposition + noun phrase หรือ pronoun และบางครั้งตามด้วย -ing เช่น tired of studying; มองหน้าที่ทั้งกลุ่ม"]
        ],
        examples: [
          worked("preposition-activity-1", "Preposition Activity #1 · เลือกจากธนาคารคำ", [15],
            "Complete the five sentences with before, on, beneath, for or near.\n1. The bird that is ___ the tree branch is singing.\n2. This cake was baked ___ my daughter’s birthday party.\n3. He did not want this person ___ him.\n4. I arrived home ___ she did.\n5. She planted the seed ___ the soil.",
            [
              "on the tree branch = อยู่บนกิ่งไม้, for my daughter’s birthday party = ทำเพื่อโอกาสงานวันเกิด",
              "near him = อยู่ใกล้เขา, before she did = ก่อนที่เธอจะมาถึง, beneath the soil = ใต้ผิวดิน",
              "before she did มีอนุประโยคตามหลัง before ใช้เป็น conjunction ในประโยคนี้ ส่วน before dinner รับ noun phrase จึงเป็น preposition"
            ], "1 on; 2 for; 3 near; 4 before; 5 beneath.",
            { hint: "แยกตำแหน่งบนพื้นผิว/ด้านล่างออกจากความใกล้ แล้วดูข้อที่เกี่ยวกับจุดประสงค์งานวันเกิดและลำดับเวลา" })
        ]
      },
      {
        id: "time-place-of", title: "In, On, At และหน้าที่ของ Of", pdf, pages: "16–26",
        summary: "ตารางภาพไล่จากกว้างไปเฉพาะ ใช้ in สำหรับเวลาเป็นช่วงหรือสถานที่เป็นพื้นที่ on เมื่อระบุวันหรือมองเป็นพื้นผิว และ at สำหรับจุดเวลา/ตำแหน่ง",
        points: [
          ["Time · ภาพหน้า 17 และหน้า 18–20", "in the morning, in July, in 2018, in this century; on Valentine’s Day, on Friday, on the 6th of June, on November 16th; at Songkran, at Christmas time, at 8:30, at midnight"],
          ["Place · ภาพหน้า 21 และหน้า 22–24", "in Chinatown/Bangkok/Italy มองเป็นพื้นที่; on Sukhumvit Road/Ko Samui/the train/the water มองเป็นถนน เกาะ พาหนะใหญ่ หรือพื้นผิว; at home/at school/at the corner/at an exact address มองเป็นจุด"],
          ["Of · หน้า 25", "สัมพันธ์ความเป็นเจ้าของ (John’s book), เนื้อหาและปริมาณ (a cup of coffee / a bag of apples), วัสดุ (a house of bricks), ลักษณะ (a woman of great intelligence), ส่วนย่อย (a piece of cake), ช่วงเวลา (the dawn of a new era), ความรู้สึกหรือเหตุ (tired of studying)"],
          ["ความหมายตามกลุ่มคำ", "a cup of coffee คือถ้วยที่มีปริมาณกาแฟ ไม่ได้หมายถึงถ้วยผลิตจากกาแฟ; คำประกบ เช่น excel at/in และ reflect on ต้องดูการใช้ทั้งกลุ่ม"]
        ],
        examples: [
          worked("preposition-activity-2", "Preposition Activity #2 · เติม In, On, At, Of", [26],
            "Fill the gaps with on, in, at or of.\n1. Sarah waited ___ the bus stop for almost twenty minutes.\n2. I read an interesting article ___ climate change.\n3. They heard the sound ___ thunder in the distance.\n4. He got lost ___ the crowd during the festival.\n5. She excels ___ synthesizing complex data into actionable insights.\n6. She went jogging ___ Monday morning.\n7. The success ___ the project depended on everyone’s teamwork.\n8. She reflected ___ her experiences abroad and how they shaped her worldview.",
            [
              "1 at the bus stop (จุด), 2 article on climate change (หัวข้อ), 3 the sound of thunder (เสียงของอะไร), 4 in the crowd (อยู่ท่ามกลางกลุ่ม)",
              "5 excels at synthesizing (ทักษะที่ทำได้ดี), 6 on Monday morning (เช้าของวันเจาะจง), 7 success of the project (ความสำเร็จของโครงการ), 8 reflected on her experiences (ใคร่ครวญเรื่องประสบการณ์)",
              "ในข้อ 5 การใช้ excels in บางงานเขียนก็เป็นไปได้ เป็นทางเลือกตามบริบท สำหรับกิจกรรมหน้ากริยา -ing เลือก at เป็นคำตอบตัวอย่าง"
            ], "1 at; 2 on; 3 of; 4 in; 5 at; 6 on; 7 of; 8 on.",
            { hint: "วงคำบอกจุดและวันก่อน แล้วหาคู่คำที่มักใช้ด้วยกัน เช่น an article ___ a topic และ reflect ___ an experience" })
        ]
      },
      {
        id: "preposition-review", title: "Activities #3–6 · ตรวจวลีจากตารางประกอบในภาพ", pdf, pages: "27–31",
        summary: "เทียบกรรมของคำกับเจตนาของประโยค กลุ่มเวลาให้แยกช่วง จุด และกำหนดส่ง กลุ่มทิศทางให้แยกต้นทาง ปลายทาง และเส้นทาง",
        points: [
          ["Time · ตารางหน้า 27", "in ระบุเดือน ฤดู ปี ช่วงของวัน ศตวรรษ หรือจำนวนเวลาก่อนเหตุการณ์; at ระบุเวลา มื้อ/โอกาส หรืออายุ; on ระบุวัน; since ระบุจุดเริ่ม, for ระบุระยะ, from ... to ... ระบุช่วงเริ่มและจบ, until ระบุจุดสิ้นสุด, by ระบุกำหนดช้าที่สุด"],
          ["Location and direction · ตารางหน้า 28", "in พื้นที่ปิด, at จุด/งาน/กิจกรรม, on พื้นผิว ชั้น ตำแหน่งด้านข้าง ระบบขนส่งหรือสื่อ, to จุดหมาย, from จุดเริ่ม, towards ทิศ, across ข้าม, through ผ่านภายใน, between ระหว่างตำแหน่งที่แยกได้, among ท่ามกลางกลุ่ม"],
          ["Connections · ตารางหน้า 29", "of บอกส่วน ความเป็นเจ้าของหรือสายสัมพันธ์, with บอกลักษณะ การอยู่ด้วยกัน หรือเครื่องมือเฉพาะ, by + -ing บอกวิธีทำในภาพรวม"],
          ["Academic prepositions · ตารางหน้า 30", "about หัวข้อ; for จุดประสงค์และเหตุผล; from แหล่งที่มา; in ตำแหน่งหรือการรวมอยู่ในขอบเขต; on หลักฐานหรือฐานของข้อสรุป; of ความเกี่ยวข้อง/เหตุ; by ผู้กระทำหรือสาเหตุ; with สิ่งที่ใช้หรือความสัมพันธ์; between ความเชื่อมโยงระหว่างสองฝ่าย"]
        ],
        examples: [
          worked("preposition-activity-3", "Activity #3 · Time", [27],
            "Check the underlined relationships in Howard’s 7:30 shift, the principal’s 9 AM announcement, Friday collection, and Beth’s length of employment.",
            [
              "1 เปลี่ยน on 7:30 เป็น at 7:30 เพราะเป็นจุดเวลา; 2 waited until 9 AM ถ้าหมายถึงรอจนถึงเก้าโมง",
              "3 pickup ต้องใช้ on Friday เพราะเป็นวัน; 4 ระยะเวลาการเป็นพยาบาลใช้ for 47 years ส่วน In four days เดิมใช้ได้",
              "at 9 AM อาจใช้ระบุว่าเขารออยู่ ณ เวลาเก้าโมงได้ ถ้าโจทย์ต้องการจุดสิ้นสุดของการรอ ให้เลือก until"
            ], "1 at 7:30; 2 until 9 AM (ถ้ารอจนถึงเวลานั้น); 3 on Friday; 4 for 47 years."),
          worked("preposition-activity-4", "Activity #4 · Place and direction", [28],
            "Check between the two people, get my phone at the phone, sitting among from him and heading through the closet.",
            [
              "1 between สื่อว่านั่งระหว่างสองคน และ on a plane/in business class ใช้ได้",
              "2 ต้นฉบับซ้ำ phone ในส่วนที่ควรเป็นตำแหน่ง จึงต้องมีข้อมูลเพิ่มเพื่อระบุกรรมต้นทาง; ตัวอย่าง get my phone from the table",
              "3 across from him = ตรงข้ามเขา; 4 heading to the closet สื่อกำลังไปยังตู้เพื่อหยิบของ ส่วน through คือเดินทะลุผ่านพื้นที่ด้านใน"
            ], "1 CORRECT; 2 from + ต้นทางที่เหมาะสม; 3 across from him; 4 to the closet.",
            { note: "ต้นฉบับข้อ 2 เขียน get my phone at the phone และไม่ระบุว่าหยิบโทรศัพท์จากที่ใด จึงให้ตัวอย่างที่สมเหตุสมผลโดยไม่อ้างว่าเป็นคีย์ที่พิมพ์ในสไลด์" }),
          worked("preposition-activity-5", "Activity #5 · Connections", [29],
            "Check with playing golf, assignments by ChatGPT, the son of Bon Jovi, and eyes the color by blue.",
            [
              "1 by playing golf สื่อว่าเกิดเพราะกิจกรรม; ถ้าระบุเวลาใช้ while playing golf",
              "2 did all her assignments with ChatGPT สื่อใช้เครื่องมือ; with/using เข้ากับประธานที่ลงมือทำ; 3 the son of ... ใช้ of บอกความสัมพันธ์ถูกต้อง",
              "4 เปลี่ยนเป็น eyes the color of blue ตามโจทย์ที่ให้เลือก preposition; ในงานเขียนทั่วไปใช้ a bird with blue eyes เป็นธรรมชาติกว่า"
            ], "1 by (หรือ while เมื่อบอกเวลา); 2 with; 3 CORRECT; 4 of."),
          worked("preposition-activity-6", "Activity #6 · Academic prepositions", [30],
            "Check came of Wikipedia, scolded by her mother of using, been by my father, and known for telling jokes.",
            [
              "1 came from Wikipedia ใช้ from บอกแหล่ง; 2 was scolded by her mother for using ใช้ by บอกผู้ตำหนิและ for บอกเหตุ",
              "3 has been with my father ใช้ with เมื่อคบหาหรืออยู่ด้วยกัน; 4 known for telling jokes ใช้ for บอกสิ่งที่ทำให้เป็นที่รู้จัก"
            ], "1 from; 2 for; 3 with; 4 CORRECT.")
        ]
      },
      {
        id: "idioms", title: "Idioms และการอ่านความหมายเชิงเปรียบ", pdf, pages: "32–37",
        summary: "อ่าน idiom เป็นทั้งวลีและหาเหตุการณ์ที่แวดล้อม สิ่งที่ผู้พูดทำก่อนหรือหลังวลีช่วยให้ตีความได้ว่าหมายถึงอะไร",
        points: [
          ["Literal กับ figurative · หน้า 32–34", "kill two birds with one stone = ทำครั้งเดียวได้สองประโยชน์ ในสไลด์ผู้พูดออกกำลังกายไปด้วยและฟังเพลงอังกฤษไปด้วย เพื่อได้ทั้งสุขภาพและภาษา"],
          ["ชุด Idioms · หน้า 35", "under the weather = รู้สึกไม่สบาย; break a leg = ขอให้โชคดี; once in a blue moon = นาน ๆ ครั้ง; the ball is in your court = ถึงตาคุณตัดสินใจ; you can say that again = เห็นด้วยมาก; beat around the bush = พูดอ้อม; hit the sack = ไปนอน; kick the bucket = เสียชีวิต (ไม่เป็นทางการ); by the skin of your teeth = ผ่านแบบเฉียดฉิว"],
          ["ตัวอย่างสำนวนไทย · หน้า 36", "สมน้ำหน้า = ได้รับผลที่สมแก่การกระทำ; กินเหมือนหมูอยู่เหมือนหมา = ความเป็นอยู่ไม่เรียบร้อย; แข่งกับเวลา = เร่งให้ทัน; วัวแก่กินหญ้าอ่อน = คนสูงวัยกับคู่ที่อายุน้อยกว่ามาก; กระดูกอ่อน โดยทั่วไปหมายถึงยังอ่อนประสบการณ์ คำอธิบายภาษาอังกฤษในสไลด์จุดนี้อาจอ่านสับสน"]
        ],
        examples: [
          worked("idiom-guess", "กิจกรรมเดาความหมาย · Kill two birds with one stone", [32, 33, 34],
            "Can you guess what “kill two birds with one stone” means? Use the speaker’s example of listening to English songs while working out.",
            [
              "กิจกรรมเดียวเกิดขึ้นพร้อมประโยชน์สองด้าน คือ staying fit และ improving English",
              "จับคู่ two birds กับประโยชน์สองอย่าง และ one stone กับการลงมือครั้งเดียว จึงแปลวลีแบบ figurative ได้"
            ], "To achieve two things with one action.", {
              answerOrigin: "ความหมายจากสไลด์หน้า 34",
              hint: "วงสองผลลัพธ์ที่ผู้พูดได้จากการฟังเพลงระหว่างออกกำลังกาย"
            }),
          worked("idiom-thai", "กิจกรรมเสนอ Thai Idioms", [37],
            "Can you list some more Thai idioms for us?",
            [
              "เลือกสำนวนที่ความหมายรวมชัด เช่น น้ำขึ้นให้รีบตัก แปลว่ามีโอกาสแล้วควรรีบใช้",
              "อธิบายเป็นภาษาอังกฤษแล้วให้ฉากใช้งาน เช่น when applications open, submit yours early"
            ], "น้ำขึ้นให้รีบตัก — Make the most of a good opportunity while it lasts.", { note: "คำตอบเป็นตัวอย่างที่แต่งเพื่อการฝึก โจทย์เปิดให้ยกสำนวนไทยได้หลายแบบ" })
        ]
      },
      {
        id: "phrasal-verb-forms", title: "Phrasal Verbs · Separable และ Inseparable", pdf, pages: "38–43",
        summary: "มอง verb + particle เป็นหน่วยเดียว จากนั้นดูว่ากรรมนามและกรรมสรรพนามอยู่ตรงไหนได้ วาง it/them ให้ถูกช่วยแยกชนิดได้ดี",
        points: [
          ["หนังสืออ้างอิง · หน้า 38, 40–41", "สไลด์ชี้ไปยัง Unit 6 หน้า 54–59 สำหรับรายชื่อเพิ่มเติม ในโฟลเดอร์ Lecture 2 มีสไลด์ชุดนี้ ใช้ตารางภาพหน้า 39 และตัวอย่างหน้า 40–41 ทบทวนได้โดยตรง"],
          ["Separable · หน้า 40", "I turned off the light และ I turned the light off ใช้ได้ทั้งสองแบบ; ถ้าเป็นสรรพนาม ให้ใช้ I turned it off."],
          ["Inseparable · ประกอบหน้า 41", "I look after my brother / I look after him ใช้ object หลังทั้งวลี หน้า 41 ยก look up เป็น inseparable แต่ look up new words / look new words up / look them up ใช้ได้ จึงจัดความหมาย ‘ค้นข้อมูล’ เป็น separable"],
          ["หน้า 39 · back/carry/call/check", "back someone up = สนับสนุน; break down = เสียหรือหยุดทำงาน; carry on (with) = ทำต่อ; carry on about = พูดถึงไม่หยุด; carry off = ทำสำเร็จ/เอาไป; carry over = ส่งต่อ; carry out = ดำเนินการ; call around = โทรติดต่อหลายแห่ง; calm down = สงบลง; call off = ยกเลิก; check out = ตรวจดู/เช็กเอาต์; clean up = ทำความสะอาด; come around = ฟื้น/เปลี่ยนใจ/มาเยี่ยม"],
          ["หน้า 39 · come/count/dive/dress/end/fall/find/go", "come between = ทำให้ห่างกัน; come down on = ตำหนิ; come down with = เริ่มป่วย; come out of = ออกมาจาก/เป็นผลจาก; come up = เกิดขึ้น; come up with = คิดขึ้น; count on = พึ่ง; dive into = ลงมือจริงจัง; dress up = แต่งตัวพิเศษ; end up = ลงเอย; fall apart = พัง/แตก; find out = ค้นพบ; go about = ลงมือจัดการ; go after = ไล่ตาม"],
          ["หน้า 39 · go/get/hand/leave", "go against = ขัดกับ; go ahead (with) = ดำเนินต่อ; get across = สื่อให้เข้าใจ; get along = เข้ากันได้; get ahead = ก้าวหน้า; get at = เข้าถึง/สื่อเป็นนัย/ตำหนิ (ตามกรรม); get away = หนีหรือออกไปพัก; go for = เลือก/พยายามคว้า; go on = ทำต่อ; go over = ทบทวน; hand in = ส่งงาน; leave out = ละไว้"],
          ["หน้า 39 · let/look/make", "let down = ทำให้ผิดหวัง/หย่อนลง; let go of = ปล่อยมือ; let in = อนุญาตให้เข้า; let on = เปิดเผย; let off = ปล่อยไปหรือลงโทษเบา; let out = ปล่อยออก; let someone know = แจ้ง; look after = ดูแล; look up to = เคารพนับถือ; make off = รีบหนี; make up = แต่งเรื่อง/คืนดี; make for = มุ่งไป/เอื้อให้; make of = คิดหรือเข้าใจอย่างไร; make out = มองหรือฟังออก"],
          ["หน้า 39 · mix/pull/put/run/see/set/show/shut", "make up for = ชดเชย; mix up = สับสน; pull up = ดึงขึ้นหรือจอด; put on = สวม/เปิด; put up with = ทน; run out of = ใช้หมด; see to = ดูแลจัดการ; set up = จัดตั้ง; show off = โอ้อวด; shut off = ปิด; set about = เริ่มลงมือ หรือรุมทำร้ายเมื่อกรรมเป็นคน; set forth = อธิบาย/ออกเดินทาง; set off = ทำให้เริ่ม เช่น สัญญาณดัง"],
          ["Idioms ท้ายบท · หน้า 42", "break a leg = ขอให้โชคดี; bite the bullet = ยอมเผชิญเรื่องยาก; hit the nail on the head = พูดตรงจุด; piece of cake = ง่ายมาก; cost an arm and a leg = แพงมาก; under the weather = ไม่สบาย; spill the beans = เปิดเผยความลับ; barking up the wrong tree = มุ่งผิดเป้า; a dime a dozen = พบได้ทั่วไป; let the cat out of the bag = เผยความลับออกมา"]
        ],
        examples: [
          worked("placements", "ลองย้ายกรรม · turn off, look up, look after", [38, 40, 41],
            "Rewrite these expressions with a pronoun: turn off the light, look up the vocab item, look after my brother.",
            [
              "turn off และ look up ในความหมายนี้รับกรรมคั่นกลางเมื่อกรรมเป็น pronoun",
              "look after ต้องรักษาคู่ look after แล้ววาง pronoun ด้านท้าย",
              "ลองอ่านเต็มประโยค: Please turn it off. I’ll look it up. I look after him."
            ], "turn it off; look it up; look after him.", { practice: true, note: "ตัวอย่างฝึกเพิ่มเติมจากหลักตำแหน่งกรรม หน้า 38–41" })
        ]
      }
    ],
    exercises: [
      quiz("q1", "A point in time", [17, 20], "The workshop will start ______ midnight. Which preposition fits?", ["In", "On", "At", "Of"], 2, ["midnight ระบุจุดเวลา ใช้ at midnight", "in ใช้กับช่วงเวลา เช่น in June; on ใช้กับวัน เช่น on Friday; of ไม่ทำหน้าที่ชี้จุดเวลาในประโยคนี้"]),
      quiz("q2", "Specific day and location", [17, 19, 21, 24], "Which sentence naturally expresses a specific day and meeting point?", ["We will meet at Thursday in the entrance.", "We will meet on Thursday at the entrance.", "We will meet in Thursday on the entrance.", "We will meet of Thursday in the entrance."], 1, ["Thursday เป็นวัน ใช้ on; the entrance เป็นจุดนัดหมาย ใช้ at", "A ใช้ at กับวัน; C ใช้ in กับวันและ on กับจุดนัด; D ใช้ of หน้า Thursday จึงไม่บอกวันนัดแบบที่ต้องการ"]),
      quiz("q3", "Figurative meaning", [35], "Nora stayed home because she was feeling under the weather. What does the expression mean?", ["She felt ill.", "She was outdoors in the rain.", "She was very busy.", "She had just arrived."], 0, ["stayed home because ... เชื่อมเหตุว่ารู้สึกไม่สบาย จึงใช้ความหมาย figurative", "Rain เป็นการโยงกับอากาศแบบตรงตัว; busy และ just arrived ไม่มีคำสนับสนุน"]),
      quiz("q4", "A pronoun in a separable phrasal verb", [38, 40], "Replace “the radio” with “it” in “Please turn off the radio.” Which version is correct?", ["Please turn off it.", "Please it turn off.", "Please off turn it.", "Please turn it off."], 3, ["turn off แยกได้และกรรมสรรพนามต้องอยู่กลาง turn it off", "A วาง it หลัง off; B วาง it ก่อนกริยา; C สลับ particle มาไว้ก่อนกริยา"]),
      quiz("q5", "Deadline rather than duration", [27], "The report must reach the office no later than Friday. Which expression matches the deadline?", ["For Friday", "Since Friday", "By Friday", "During Friday"], 2, ["no later than = ช้าที่สุดเท่ากับวันนั้น ใช้ by Friday", "for มักสื่อระยะเวลาหรือการจัดไว้สำหรับ; since ชี้จุดเริ่มมาถึงปัจจุบัน; during บอกสิ่งที่เกิดในช่วงหนึ่ง ไม่สื่อความหมาย ‘ภายในกำหนด’"])
    ],
    checklist: [
      "แยก prepositional phrase และแปลความสัมพันธ์ในประโยคได้",
      "อธิบายเหตุผลของ at 8:30, on Monday morning และ in August ได้",
      "จับความหมาย idiom จากฉากและตำแหน่งกรรมของ phrasal verb ได้",
      "อธิบายตัวอย่างที่คำตอบขึ้นกับบริบท เช่น by/while หรือ at/until ได้"
    ],
    coverage: [
      { pdf, from: 1, to: 15, section: "preposition-objects", topic: "Week 2.1: Prepositions, object และ Activity #1" },
      { pdf, from: 16, to: 26, section: "time-place-of", topic: "In/On/At, ภาพตาราง และ Activity #2" },
      { pdf, from: 27, to: 31, section: "preposition-review", topic: "ตารางภาพ Time/Place/Connection/Academic Usage และ Activities #3–6" },
      { pdf, from: 32, to: 37, section: "idioms", topic: "Literal, figurative, English/Thai idioms และกิจกรรม" },
      { pdf, from: 38, to: 43, section: "phrasal-verb-forms", topic: "ตาราง Phrasal Verbs, การวางกรรม, Idioms ท้ายบท" }
    ]
  });
})();
