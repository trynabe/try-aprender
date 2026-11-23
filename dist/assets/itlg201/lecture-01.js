(() => {
  const slides = "Prefixes Week 1.2 (Student Version).pdf";
  const worksheet = "Prefix and Suffixes (Extra Activity).pdf";
  const story = "The-Lion-and-the-Mouse.pdf";
  const assessment = "Reading Skills - Discussion 1 Assessment DST.pdf";
  const worked = (id, title, pdf, pages, prompt, steps, answer, extra = {}) => ({
    id, title, pdf, pages, prompt, steps, answer, original: !extra.practice,
    answerOrigin: extra.practice ? undefined : "คำตอบตัวอย่างจากการวิเคราะห์", ...extra
  });
  const quiz = (id, title, pdf, pages, prompt, choices, correctChoice, steps) => ({
    id, title, pdf, pages, prompt, choices, correctChoice, steps, answer: choices[correctChoice], practice: true
  });

  window.ReadingSkills.addChapter({
    number: 1,
    title: "Prefixes & Suffixes",
    thaiTitle: "Week 1.2 · แกะส่วนประกอบของคำและเดาความหมายจากบริบท",
    summary: "อ่านคำยาวเป็นสามชิ้น คือ prefix + root + suffix แล้วใช้ประโยคเช็กความหมาย หน้าที่ และรูปสะกด ต่อด้วยใบงาน เรื่อง The Lion and the Mouse และเกณฑ์ Reading-based Discussion 1",
    goals: [
      "แยก root, prefix และ suffix จากคำจริง และอธิบายด้วยตัวอย่างในประโยค",
      "ใช้บริบทเลือกรูปคำ เช็กชนิดคำ และสะกดคำเมื่อเติม suffix ได้",
      "ยกคำจากบทอ่านเป็นหลักฐาน และเตรียมความเห็นที่อ้างข้อมูลจากบทอ่านได้"
    ],
    confusions: [
      "ตัวเติมรูปเดียวกันอาจสื่อคนละอย่าง เช่น im- ใน imperfect กับ import และ a- ใน atypical กับ aboard",
      "คำที่ขึ้นต้นคล้าย prefix ต้องเช็กว่าความหมายของทั้งคำสัมพันธ์กับรากอย่างไร เช่น upbringing",
      "-ing ต้องอ่านหน้าที่จากประโยค เช่น is walking เป็น verb phrase ส่วน Walking is fun ใช้กลุ่มคำเป็นประธาน"
    ],
    sections: [
      {
        id: "roots-negation", title: "Root words และ Prefixes ที่กลับหรือเปลี่ยนความหมาย", pdf: slides, pages: "1–24",
        summary: "หาคำฐานที่คุ้น เช่น play แล้วแยก re-play และ play-ful หลังจากนั้นอ่านประโยคทั้งประโยคเพื่อเลือกชนิดคำและความหมายที่ตรง ไม่ใช้ตัวอักษรต้นคำเป็นกฎตายตัว",
        points: [
          ["Root และ inflection · หน้า 2–3", "play → replay/playful ส่วน dance → dances/dancing/danced คำฐานยังเป็น dance ในรูป -ing ต้องดู auxiliary เช่น is dancing หรือ will be dancing ก่อนระบุ tense"],
          ["a-/an-, ab-, anti- · หน้า 4–13", "amoral = ขาดสำนึกทางศีลธรรม, atypical = ไม่เหมือนทั่วไป, atheist = ผู้ไม่เชื่อว่ามีพระเจ้า, apolitical = ไม่เกี่ยวการเมือง, asocial = ไม่ชอบเข้าสังคม, abduct = ลักพาตัว, abuse = ใช้ในทางผิด, anti-clockwise = ทวนเข็มนาฬิกา, anti-social = ต่อต้านสังคมหรือมีพฤติกรรมที่เป็นปฏิปักษ์, anti-aging = ต้านความชรา การใช้ขีดตามการสะกดของคำนั้น"],
          ["de- / dis- · หน้า 14–15", "de- มักสื่อการย้อน ลด หรือเอาออก เช่น dehydrate, deregulate, detoxify ส่วน dis- สื่อการกลับหรือขาดตรงข้าม เช่น dislike, discomfort, dissimilar"],
          ["in-/im-/il-/ir- · หน้า 16–19", "incompetent, invisible, inefficient, insane; impersonal, imperfect, impossible; illogical, illegible, illiterate; irreplaceable, irrational, irregular ให้สังเกตรูปที่ใช้จริง โดยเฉพาะ im- ในคำที่ขึ้นต้นด้วย p/m, il- ก่อน l, ir- ก่อน r"],
          ["mal- / mis- / non- / un- · หน้า 20–23", "malnutrition, malnourished, malpractice ชี้สภาพไม่ดี หรือปฏิบัติผิดมาตรฐาน; mislead, misfortune, misspell สื่อผิดพลาดหรือไม่ดี; non-existent, non-specific, non-refundable สื่อว่าไม่มีหรืออยู่นอกกลุ่ม; unfriendly, unreal, unfit ให้ความหมายปฏิเสธโดยตรง"],
          ["Word class · หน้า 8–10", "ภาพใช้ mask จำว่าสิ่งของเป็น noun ส่วน unmask เป็น verb หมายถึงถอดหน้ากากหรือเปิดเผยตัวตน"]
        ],
        examples: [
          worked("prefix-activity-1", "Prefix Activity #1 · จับคู่ความหมายและเติม prefix", slides, [24],
            "Match able, appear, correct, polite and normal to definitions 1–5. Add in-, ab-, im-, dis- or un-, then redefine each new word.",
            [
              "จับหมายเลขตามคำในต้นฉบับ: to come into sight = appear (1), regular = normal (2), has the ability = able (3), showing good manners = polite (4), not wrong = correct (5)",
              "เทียบรูปที่ใช้จริง: un + able, dis + appear, in + correct, im + polite และ ab + normal",
              "ทวนความหมายทั้งคำ: unable = not able, disappear = go out of sight, incorrect = wrong, impolite = rude, abnormal = unusual or not normal"
            ], "able 3 → unable; appear 1 → disappear; correct 5 → incorrect; polite 4 → impolite; normal 2 → abnormal.",
            { hint: "จับคู่ความหมายของคำฐานก่อนเติม prefix เช่น good manners บอกว่ากำลังพูดถึงความสุภาพ" })
        ]
      },
      {
        id: "prefix-position", title: "ตำแหน่ง ระดับ ทิศทาง และการทำให้เข้าสู่สภาพ", pdf: slides, pages: "25–45",
        summary: "คำอย่าง preorder, postoperative และ underdeveloped มีเบาะแสจากส่วนหน้า ให้จับว่าเปรียบเวลา พื้นที่ ปริมาณ หรือสภาพ แล้วทวนว่าคำแปลใช้ได้กับทั้งประโยค",
        points: [
          ["a-, pre-, post- · หน้า 26–28", "abed = in bed, aboard = on a vehicle, ashore = to/on the shore; preorder, preview, predate = ก่อน; post-production, postpone, postgraduate = หลังหรือเลื่อนออกไป"],
          ["im-, in-, inter-, trans- · หน้า 29–32", "implant, import, imprint เข้าหรือฝังใน; inside, input, internal อยู่ภายใน; internet, international เชื่อมระหว่าง; transform, transplant, transfer เปลี่ยนหรือเคลื่อนข้าม"],
          ["up-, out-, over-, under-, extra- · หน้า 33–37", "uphold/uphill ขึ้นหรือพยุง; outdoors/outshine/outgrow ออกไปหรือทำได้มากกว่า; overland/overheat บนบกหรือมากเกิน; underwater/underexposed ต่ำกว่าหรือไม่พอ; extraterrestrial/extracurricular นอกขอบเขตปกติ"],
          ["en-/em- และ in-/im- · หน้า 39–43", "endanger = ทำให้ตกอยู่ในอันตราย, enlarge = ขยาย, empower = ทำให้มีอำนาจหรือมั่นใจ, employ = ใช้หรือจ้าง, incriminate = ทำให้ดูว่าพัวพันความผิด, indebted = เป็นหนี้หรือรู้สึกเป็นบุญคุณ, imperil = ทำให้เสี่ยงอันตราย, imprison = คุมขัง"],
          ["ความหมายทั้งคำ · หน้า 45", "unpopular เปลี่ยน popular โดยตรง ส่วน upbringing หมายถึงการเลี้ยงดูและอบรมในวัยเด็ก อ่านตัวอย่างใช้จริงเพื่อยืนยัน"]
        ],
        examples: [
          worked("prefix-activity-2", "Prefix Activity #2 · อธิบายความหมายหลังเติม", slides, [38],
            "Explain immigrate, underdeveloped, postoperative, interconnected and overload in simple English.",
            [
              "im- = into จึงอ่าน immigrate จากมุมของประเทศปลายทาง: to move into another country to live there",
              "under- = not enough: underdeveloped = not developed enough; post- = after: postoperative = relating to the period after surgery",
              "inter- = between/one another: interconnected = linked to each other; over- = too much: overload = put too much weight or work on something"
            ], "ลำดับคำตอบคือ ย้ายเข้าไปอาศัยในอีกประเทศ, พัฒนาไม่เพียงพอ, หลังผ่าตัด, เชื่อมถึงกัน, ใส่น้ำหนักหรืองานมากเกินรับไหว"),
          worked("prefix-activity-3", "Prefix Activity #3 · จับคู่ entitle, embody, inflame, impregnate", slides, [44],
            "Match the four words to the definitions in the source.",
            [
              "entitle เกี่ยวกับ title/right ที่ให้สิทธิ จึงเลือก 4; embody คือแสดงแนวคิดหรือคุณสมบัติให้เห็นเป็นรูปธรรม จึงเลือก 2",
              "inflame ในโจทย์คือกระตุ้นความรู้สึกให้รุนแรงขึ้น จึงเลือก 1; impregnate ในความหมายตามโจทย์คือทำให้ตั้งท้อง จึงเลือก 3"
            ], "entitle 4, embody 2, inflame 1, impregnate 3.")
        ]
      },
      {
        id: "prefix-quantity", title: "Prefixes ที่บอกการทำซ้ำ จำนวน และปริมาณ", pdf: slides, pages: "46–56",
        summary: "อ่าน re- เป็นการทำใหม่ใน redo/reorganize/reheat และใช้ภาพคู่กับคำ ตัวอย่าง unicycle มีล้อเดียว tripod มีสามขา octopus มีแปดแขน และ semicircle เป็นครึ่งวงกลม",
        points: [
          ["ตารางภาพ หน้า 47", "mono-/uni- 1; di-/bi-/du- 2; tri- 3; tetra-/quadri-/quart- 4; penta-/quin- 5; hexa-/sext- 6; hepta-/septem-/septi- 7; octo-/octa-/oct- 8; ennea-/novem- 9; deca-/decem- 10; hemi-/semi- ครึ่ง; poly-/multi- หลาย; hecto-/cent- 100; kilo- 1,000"],
          ["ตัวอย่าง หน้า 48–55", "monotone/monologue/unicycle/universe; bicycle/binoculars/duel/duet; triangle/tripod; octopus; decade/decimal; semicircle; polygamy/polymer/multiple/multitask; kilogram/millennium"],
          ["คำที่ต้องระวัง", "decimal เป็นระบบฐานสิบ แต่ deci- ใน decimetre คือหนึ่งในสิบ ส่วน kilo- ใน kilogram คือหนึ่งพัน และ milli- ใน milligram คือหนึ่งในพัน แม้สไลด์จะนำ mill- ใน millennium ไว้ในกลุ่ม 1,000"],
          ["อ่านคำจากภาพ หน้า 56", "60 decaseconds คือ 60 × 10 วินาที เท่ากับ 600 วินาทีหรือ 10 นาที ใช้ deca- ที่บอกสิบ"]
        ],
        examples: []
      },
      {
        id: "suffix-rules", title: "Suffixes สี่ชนิดและการสะกดเมื่อเติม", pdf: slides, pages: "57–74",
        summary: "มองตำแหน่งในประโยคก่อนเลือก suffix เช่นหลัง an หรือ the มักต้องใช้คำนาม ถ้าอยู่หลัง be และอธิบายสภาพอาจเป็น adjective ให้ใช้คำจริงและดูทั้งประโยค",
        points: [
          ["Noun suffixes · ตารางภาพหน้า 58", "-ment (payment), -ness (readiness), -sion/-tion/-ation (infusion/description/distillation), -ence/-ance (preference/reliance), -al (denial), -ure (departure), -age (orphanage), -ery (robbery), -ity/-ty/-y (equality/loyalty/inquiry), -th (strength), -ism (capitalism), -dom (freedom), -hood (childhood), -ship (ownership); กลุ่มคน -er/-or/-ar/-ist/-ster/-ee/-eer/-ant/-ent/-arian; -logy (sociology) และ -scope (microscope)"],
          ["Verb, adjective, adverb · ตารางภาพหน้า 59–61", "Verb: -ate, -en, -ify, -ise/-ize, -ing; Adjective: -able/-ible, -ful/-ous/-ious/-ate/-y, -less, -al/-ic/-ish/-ive และ -en; Adverb: -ly/-ily, -ward(s), -wise ตำแหน่งในประโยคช่วยบอกหน้าที่ของคำเพิ่ม"],
          ["Rule 1–2 · หน้า 62–63", "เติม -ness/-ly ได้โดยทั่วไป เช่น darkness แต่ consonant + y มักเปลี่ยน y → i เช่น happiness/readily. เมื่อ suffix เริ่มด้วยสระมักตัด silent e เช่น caring/usable; -ce/-ge อาจคง e ก่อน a/o เช่น replaceable และ courageous"],
          ["Rule 3–5 · หน้า 64–66", "ถ้า suffix เริ่มด้วยพยัญชนะมักคง e เช่น careful/careless ยกเว้น truly/argument; consonant + y เปลี่ยนเป็น i เมื่อ suffix ไม่ขึ้นต้นด้วย i เช่น sunnier แต่ hurrying; เมื่อคำลงท้ายสระหนึ่งตัวตามด้วยพยัญชนะตัวเดียวและเน้นพยางค์ท้ายหรือเป็นคำพยางค์เดียว มักซ้ำพยัญชนะเมื่อ suffix เริ่มด้วยสระ เช่น tanning/regretting/preferred; สไลด์ใช้การสะกดแบบอเมริกัน canceled"],
          ["-ed และตัวเติมสองด้าน · หน้า 69, 72–74", "ended, hated, divided, investigated, negated เป็น past/past participle ของ regular verbs. ดู un + do + able, unachievable, unlucky, redoing, abnormality, misleading แยกความหมายจากประโยค หน้าสุดท้ายเป็นภาพปิดบท"]
        ],
        examples: [
          worked("suffix-activity-1", "Suffix Activity #1 · ใช้รูปคำนาม", slides, [67],
            "Change active, improve, depress, solve, champion and attend into nouns for the six sentences.",
            [
              "an ... that I do และ the ... of the application ต้องการชื่อกิจกรรมและการปรับปรุง จึงได้ activity, improvement",
              "suffering from ..., no easy ... to the problem, the final round of the ... ต้องการ depression, solution และ championship ตามลำดับ",
              "the ... at the meeting was sleepy หมายถึงบุคคล จึงเลือก attendee (ผู้เข้าประชุม); attendance หมายถึงการเข้าร่วม จึงไม่เข้ากับ sleepy"
            ], "1 activity; 2 improvement; 3 depression; 4 solution; 5 championship; 6 attendee."),
          worked("suffix-activity-2", "Suffix Activity #2 · เลือก verb ที่ใช้จริง", slides, [68],
            "Choose brighten/brightify, decorize/decorate, speciate/specialize, rectify/rectize and criticizing/critify.",
            [
              "flowers ... the room = ทำให้สว่างขึ้น (brighten); ... their house for Halloween = ตกแต่ง (decorate)",
              "students ... in computers ใช้ specialize in; ... your mistake = แก้ให้ถูก (rectify); is ... your cooking skills ใช้ criticizing"
            ], "1 brighten; 2 decorate; 3 specialize; 4 rectify; 5 criticizing."),
          worked("suffix-activity-3", "Suffix Activity #3 · เลือก adjective ตามความหมาย", slides, [70],
            "Find words meaning full of envy, able to catch fire easily, relating to the globe, able to be seen, and full of anger.",
            [
              "envious สื่อความอิจฉา; flammable คือไวไฟ; global มาจาก globe และสื่อทั่วโลก",
              "visible คือเห็นได้ ส่วน invisible เติม in- แล้วกลับความหมาย; angry ใช้กับเมื่อรู้สึกโกรธ"
            ], "1 envious; 2 flammable; 3 global; 4 visible; 5 angry."),
          worked("suffix-activity-4", "Suffix Activity #4 · เติมส่วนท้ายให้เป็น adverb", slides, [71],
            "Form adverbs from happy, for, sing, real and other. Mark X where no usual adverb is formed in this exercise.",
            [
              "happy → happily ตามกฎ consonant + y; real → really โดยรักษา l เดิมแล้วเติม -ly",
              "for และ sing ให้ X ในแบบฝึกพื้นฐาน; other → otherwise อาศัย -wise ตามหน้า 61 โดยมีความหมายว่าในกรณีอื่นหรือมิฉะนั้น"
            ], "happily; X; X; really; otherwise.", { note: "หน้า 71 ใช้คำว่า prefixes ในคำสั่ง แต่กิจกรรมอยู่ใต้หัวข้อ Adverb suffixes และหน้าก่อนหน้าสอนส่วนท้าย -ly และ -wise" })
        ]
      },
      {
        id: "extra-affixes", title: "Extra Activity · ใบงานเติม Prefixes และ Suffixes จากภาพ", pdf: worksheet, pages: [1, 2],
        summary: "เปิดหน้า PDF เพื่ออ่านประโยคเต็มจากภาพ แล้วใช้ความหมายของคำรอบช่องว่างเลือก prefix หรือคำฐาน + suffix ให้ตรง",
        points: [
          ["หน้า 1", "เติมหน้าคำด้วย over-, re-, un-, mis-, il-, dis-, anti-, im- และ in- มีบางตัวใช้ซ้ำได้"],
          ["หน้า 2", "เลือกคำฐานจากกล่องและประกอบด้วย -less, -ful หรือ -hood เติมให้ตรงความหมายและชนิดคำ"]
        ],
        examples: [
          worked("extra-prefix", "Exercise 1 · เติม Prefix ให้ครบ 17 ประโยค", worksheet, [1],
            "Complete each word with a prefix from the word bank. Some prefixes may be used more than once.\nWord bank: over-, re-, un-, mis-, il-, dis-, anti-, im-, in-.\n1. The student was ___able to finish the exam on time.\n2. He always ___agrees with me. I do not know why.\n3. The patient was prescribed an ___biotic to treat the infection.\n4. Some customers were ___satisfied with the service at the restaurant.\n5. The patient was ___charged from the hospital after a successful surgery.\n6. The book you recommended seemed ___interesting and difficult to finish.\n7. It was ___possible for me to have access to my Google account because I forgot the password.\n8. The teacher had to ___teach the lesson again because some students didn't understand it.\n9. She is ___capable of doing the change alone. She needs help.\n10. That man is an ___reliable source of information.\n11. I’m sorry to ___pronounce your name.\n12. It is ___legal to kill endangered species.\n13. Big cities are usually ___crowded.\n14. The sofa looked nice but it was ___comfortable to sit on.\n15. Be careful of your spelling. Try not to ___spell the words when writing an essay.\n16. Your desk is ___tidy. It looks like a mess.\n17. I did not do well on the last test. I think I will have to ___take it.",
            [
              "1 unable (finish on time ไม่ได้), 2 disagrees (เห็นต่าง), 3 antibiotic (ยาต้านแบคทีเรีย), 4 dissatisfied (ไม่พอใจบริการ), 5 discharged (ออกจากโรงพยาบาล), 6 uninteresting (ไม่ชวนอ่าน)",
              "7 impossible (ลืมรหัสผ่าน), 8 reteach (สอนซ้ำ), 9 incapable (ทำเองไม่ได้), 10 unreliable (เชื่อถือไม่ได้), 11 mispronounce (ออกเสียงผิด), 12 illegal (ผิดกฎหมาย)",
              "13 overcrowded (คนมากเกิน), 14 uncomfortable (นั่งไม่สบาย), 15 misspell (สะกดผิด), 16 untidy (ไม่เรียบร้อย), 17 retake (สอบใหม่)"
            ], "1 unable; 2 disagrees; 3 antibiotic; 4 dissatisfied; 5 discharged; 6 uninteresting; 7 impossible; 8 reteach; 9 incapable; 10 unreliable; 11 mispronounce; 12 illegal; 13 overcrowded; 14 uncomfortable; 15 misspell; 16 untidy; 17 retake.",
            { hint: "ลองจับคำบอกเหตุซึ่งอยู่ข้างช่องว่าง เช่น again สื่อว่าทำซ้ำ ส่วนต้องการความช่วยเหลือชี้ว่าทำเองไม่ได้" }),
          worked("extra-suffix", "Exercise 2 · จับคู่คำฐานกับ suffix ให้ครบ 14 ประโยค", worksheet, [2],
            "Complete the sentences with the right word and suffix. Some words may be used more than once.\nWords: home, help, hope, child, price, care, tree, colour, success, cloud, adult, use, harm, parent.\nSuffixes: -less, -ful, -hood.\n1. A dictionary is very ___. It helps you learn words and phrases.\n2. I need to recharge my mobile phone. It’s ___ without its battery.\n3. Smoking is ___. It is very bad for your health.\n4. A lot of children live on the street. They are ___.\n5. There are no trees in this part of the desert. It’s a ___ place.\n6. In my ___, I ate a lot of chocolate.\n7. He had a bad accident yesterday because he was ___. He was watching a video while driving.\n8. Because she is a hard-working student, she is always ___.\n9. The sky is ___. I don’t think it’s going to rain.\n10. My friends are really nice and ___. They are usually ready to help me.\n11. My uncle and his wife are a ___ couple. They do not have any children.\n12. A thief broke into the museum and stole a ___ painting by Picasso. It’s a very valuable painting.\n13. The rainbow is ___. It has a lot of colours.\n14. ___ is the state of being an adult.",
            [
              "1 useful (พจนานุกรมช่วยเรียน), 2 useless (แบตหมดแล้วใช้ไม่ได้), 3 harmful (อันตรายต่อสุขภาพ), 4 homeless (อาศัยข้างถนน), 5 treeless (ไม่มีต้นไม้), 6 childhood (ช่วงวัยเด็ก)",
              "7 careless (ขับขี่โดยไม่ระวัง), 8 successful (ทำงานหนักจนสำเร็จ), 9 cloudless (คิดว่าฝนจะไม่ตก), 10 helpful (พร้อมช่วยเพื่อน)",
              "11 childless (ไม่มีลูก), 12 priceless (ภาพมีค่ามาก), 13 colourful (หลายสี), 14 adulthood (ความเป็นผู้ใหญ่)"
            ], "1 useful; 2 useless; 3 harmful; 4 homeless; 5 treeless; 6 childhood; 7 careless; 8 successful; 9 cloudless; 10 helpful; 11 childless; 12 priceless; 13 colourful; 14 adulthood.",
            { hint: "ใช้ -less เมื่อขาดบางสิ่ง ใช้ -ful เมื่อมีคุณลักษณะนั้น และใช้ -hood เมื่อพูดถึงสถานะหรือช่วงชีวิต" })
        ]
      },
      {
        id: "lion-mouse", title: "The Lion and the Mouse · อ่านเรื่องแล้วหา affixes", pdf: story, pages: [1, 2],
        summary: "สองย่อหน้าต่อเนื่องกันข้ามหน้า อ่านรอบแรกเพื่อจับว่าใครช่วยใคร แล้วกลับมาไฮไลต์รูปคำและคำที่มีความหมายไปทางตรงข้าม",
        points: [
          ["ภาพประกอบ · หน้า 1", "ภาพแรกสิงโตจับหนูไว้ตรงหน้า ตรงกับเหตุในย่อหน้าแรก ภาพถัดมาแสดงสิงโตติดตาข่ายกับหนูอยู่ชิดตาข่าย ตรงกับเหตุในย่อหน้าที่สอง ซึ่งอ่านต่อขึ้นต้นหน้า 2"],
          ["Plot", "ช่วงแรกหนูรบกวนสิงโตและได้รับการไว้ชีวิต ช่วงหลังสิงโตติดตาข่ายและหนูช่วยตัดตาข่ายตอบแทน"],
          ["Words in context", "playful ขยาย mouse; angrily บอกวิธีที่สิงโตจับหนู; helpless ขยายสิงโตที่ติดตาข่าย; helpful ใช้กับเมาส์ที่ลงมือช่วย"]
        ],
        examples: [],
        passages: [{
          id: "lion-story", title: "The Lion and the Mouse", pdf: story, pages: [1, 2],
          paragraphs: [
            {
              english: "Once upon a time there lived a lion and a mouse. One hot summer day the lion was very tired and was sleeping under a tree. A playful little mouse started to play all over him. He disturbed the lion, and he woke up growling. He angrily caught the mouse and was going to kill him. The mouse was terrified. He begged the lion for forgiveness. The lion took pity on him and hesitantly let him go. The mouse was grateful and decided not to do it again.",
              thai: "กาลครั้งหนึ่งมีสิงโตกับหนู วันฤดูร้อนวันหนึ่งสิงโตเหนื่อยและหลับอยู่ใต้ต้นไม้ หนูขี้เล่นปีนเล่นไปทั่วตัวจนสิงโตตื่นและคำราม สิงโตจับหนูอย่างโกรธเกรี้ยวและกำลังจะฆ่า หนูตกใจกลัวและอ้อนวอนขออภัย สิงโตสงสารจึงลังเลก่อนปล่อยไป หนูซาบซึ้งใจและตั้งใจไม่ทำอีก",
              role: "ปูเหตุการณ์และสร้างเหตุผลว่าทำไมหนูถึงตอบแทนภายหลัง",
              vocabulary: ["playful = ขี้เล่น", "growling = คำราม", "forgiveness = การให้อภัย", "hesitantly = อย่างลังเล", "grateful = ซาบซึ้งใจ"],
              analysis: "ใน He disturbed the lion, and he woke up growling ทั้งสอง he อ้างถึงคนละตัว เหตุการณ์บอกว่าหนูเป็นผู้รบกวนและสิงโตเป็นผู้ตื่น"
            },
            {
              english: "After some days, the lion was in danger. Unluckily, he was caught in a net and was helpless. The mouse recalled how the lion had let him go. He didn’t want to be ungrateful, so he decided to help him. Before the hunter came, the mouse quickly cut the net with his sharp teeth and freed him. The lion was relieved that he escaped from being killed. He was extremely grateful to the little mouse and thanked him. The mouse was glad that he was able to be helpful and return the favour. They both became friends and lived happily.",
              thai: "หลายวันต่อมาสิงโตตกอยู่ในอันตราย โชคร้ายที่ติดตาข่ายและช่วยตัวเองไม่ได้ หนูนึกถึงตอนสิงโตปล่อยตนไป หนูไม่อยากเนรคุณจึงตัดสินใจช่วย ก่อนนายพรานมาถึง หนูใช้ฟันคมกัดตาข่ายอย่างรวดเร็วและปล่อยสิงโตเป็นอิสระ สิงโตโล่งใจที่รอดตาย รู้สึกซาบซึ้งและขอบคุณหนู หนูดีใจที่ช่วยเหลือและตอบแทนได้ ทั้งสองกลายเป็นเพื่อนกันและอยู่อย่างมีความสุข",
              role: "คลี่คลายเหตุการณ์ด้วยการตอบแทนและปิดเรื่อง",
              vocabulary: ["unluckily = อย่างโชคร้าย", "helpless = ช่วยตัวเองไม่ได้", "recalled = นึกย้อนถึง", "return the favour = ตอบแทนน้ำใจ", "relieved = โล่งใจ"],
              analysis: "so เชื่อมเหตุผลไปสู่การตัดสินใจช่วย ส่วน Before the hunter came เป็น clause ระบุเวลาก่อนเหตุการณ์หลัก mouse cut the net"
            }
          ],
          questions: [
            worked("lion-q1", "คำถาม 1 · ขีดเส้นใต้คำที่มี Prefixes และ Suffixes", story, [1, 2],
              "Read the story and underline all the prefixes and suffixes you can find.",
              [
                "เริ่มด้วยคำที่มองรูปชัด: playful = play + -ful; forgiveness = forgive + -ness; helpless = help + -less; helpful = help + -ful; ungrateful = un- + grateful; unluckily = un- + lucky → unlucky + -ly (y เปลี่ยนเป็น i)",
                "คำบอกลักษณะ/วิธีเพิ่ม: angrily, hesitantly, quickly, extremely และ happily มี -ly/-ily; grateful มีรูปลงท้าย -ful",
                "ถ้านับ inflection ที่บทเรียนกล่าวถึงด้วย ให้ขีด -ing ใน sleeping, growling, going และ being; -ed ใน started, disturbed, terrified, begged, decided (ซ้ำ), recalled, freed, relieved, escaped, killed และ thanked",
                "คำ recalled, return และ relieved สื่อความหมายทั้งคำตามบริบท เลือกจัด re- เป็นกลุ่มทบทวนรูปคำได้โดยระบุว่าทั้งคำไม่ได้แปลว่า ‘ทำซ้ำ’ ตรง ๆ ทุกคำ"
              ], "คำตอบตัวอย่างสำหรับ affixes หลักคือ playful, forgiveness, helpless, helpful, ungrateful, unluckily, angrily, hesitantly, quickly, extremely และ happily พร้อมแสดงรูปคำและความหมาย."),
            worked("lion-q2", "คำถาม 2 · เขียน 6 ประโยคโดยใช้ Prefixes", story, [2],
              "Choose any six prefixes and write your own sentences with them.",
              [
                "ใช้ un-: The lion was unlucky to get caught. (สิงโตโชคร้ายที่ติดตาข่าย) | re-: We reread the story before the quiz. (เราอ่านเรื่องซ้ำก่อนทำแบบทดสอบ)",
                "ใช้ mis-: I misread the final sentence. (ฉันอ่านประโยคสุดท้ายผิด) | dis-: The mouse disappeared into the grass. (หนูหายเข้าไปในพงหญ้า)",
                "ใช้ pre-: We previewed the passage before class. (เราดูบทอ่านคร่าว ๆ ก่อนเรียน) | over-: I overloaded my backpack. (ฉันใส่ของในกระเป๋าหนักเกินไป)"
              ], "unlucky, reread, misread, disappeared, previewed, overloaded เป็นคำเป้าหมาย 6 คำ แต่ละคำอยู่ในประโยคที่สมบูรณ์."),
            worked("lion-q3", "คำถาม 3 · เขียน 6 ประโยคโดยใช้ Suffixes", story, [2],
              "Choose any six suffixes and write your own sentences.",
              [
                "-ful: The mouse was helpful. (หนูช่วยเหลือดี) | -less: The lion felt helpless. (สิงโตรู้สึกช่วยตัวเองไม่ได้)",
                "-ly: The mouse worked quickly. (หนูลงมืออย่างรวดเร็ว) | -ness: The lion remembered the mouse’s kindness. (สิงโตจำความเมตตาของหนู)",
                "-ment: I made an improvement this week. (ฉันพัฒนาขึ้นในสัปดาห์นี้) | -able: The problem is solvable. (ปัญหานี้แก้ได้)"
              ], "helpful, helpless, quickly, kindness, improvement, solvable."),
            worked("lion-q4", "คำถาม 4 · เลือก 2 ประโยคไปอธิบาย", story, [2],
              "Choose one sentence from Question 2 and another from Question 3 to write on the board.",
              [
                "เลือกประโยคที่มี prefix ชัดและอธิบายได้ว่าคำเปลี่ยนความหมายอย่างไร",
                "เลือกอีกประโยคที่มี suffix ชัด บอกชนิดคำและคำที่ถูกขยาย"
              ], "We reread the story before the quiz. (re- = again) / The mouse worked quickly. (-ly ทำให้ quick เป็น adverb ขยาย worked)")
          ]
        }]
      },
      {
        id: "discussion-assessment", title: "Reading-based Discussion 1 · รูปแบบและเกณฑ์ประเมิน", pdf: assessment, pages: "1–3",
        summary: "ฝึกอ่านบทความย่อ จดใจความหลัก แล้วเสนอความเห็นที่อธิบายเหตุผลและหลักฐานด้วยคำของตัวเอง ตั้งคำถามและตอบกลับสมาชิกในกลุ่ม",
        points: [
          ["ขั้นตอนในเอกสาร · หน้า 1", "เตรียมจากบทความภาษาอังกฤษประมาณ 10 นาที และร่วมอภิปรายได้สูงสุด 10 นาที ใช้เนื้อหาที่เกี่ยวข้อง สรุปหรือ paraphrase และตอบกลับเพื่อนด้วย follow-up question หรือ interjection"],
          ["Rubric · หน้า 2–3", "Participation 5, Use of Language 5, Interaction 2, Opinion and Reasoning 5, Comprehension 5, Organisation 5, Sound 5 รวม 32 คะแนน ตามเกณฑ์ของเอกสาร"],
          ["เตรียมประโยค", "I think ... because ... (ฉันคิดว่า...เพราะ...), The article mentions ... (บทอ่านกล่าวถึง...), Could you explain why? (ช่วยอธิบายเหตุผลได้ไหม) ใช้หลังเลือกหลักฐานแล้วและเตรียมตอบข้อโต้แย้ง"]
        ],
        examples: [
          worked("discussion-prep", "เตรียมคำตอบอภิปรายจากเรื่องที่อ่าน", assessment, [1, 2, 3],
            "What makes the mouse’s action important in the story?",
            [
              "Opinion: เสนอความเห็นของตัวเองว่าการช่วยครั้งนี้สำคัญอย่างไร",
              "Reason + evidence: เชื่อมเหตุการณ์สิงโตปล่อยหนูกับเหตุการณ์หนูตัดตาข่ายด้วยคำของตัวเอง",
              "Interaction: ถามต่อว่าพฤติกรรมไหนเปลี่ยนความสัมพันธ์มากที่สุด แล้วฟังเหตุผลของเพื่อน"
            ], "I think the mouse’s action matters because it turns the lion’s earlier kindness into a friendship. The mouse remembers being spared and cuts the net to help the lion. What part of the story supports your view?",
            { practice: true, note: "ตัวอย่างฝึกตาม rubric โดยใช้เรื่อง The Lion and the Mouse. หน้า 1 พิมพ์วันที่ในปี 2025 ขณะที่หน้า 3 ระบุว่าแก้ไขในปี 2026 ให้ตรวจวันประเมินจริงจากประกาศของชั้นเรียน" })
        ]
      }
    ],
    exercises: [
      quiz("q1", "Negative prefix", slides, [16, 17, 18, 19], "The handwriting is almost impossible to read. Which adjective fits this description?", ["Invisible", "Illegible", "Irreplaceable", "Impersonal"], 1, ["almost impossible to read คืออ่านแทบไม่ได้; illegible มาจาก il- + legible", "Invisible คือมองไม่เห็น; irreplaceable คือแทนที่ไม่ได้; impersonal คือไม่มีความเป็นส่วนตัวหรือห่างเหิน"]),
      quiz("q2", "Prefix and direction", slides, [27, 28, 38], "The patient met the surgeon two days after the operation. Which word describes this appointment?", ["Preoperative", "Interconnected", "Postoperative", "Underdeveloped"], 2, ["after the operation = หลังผ่าตัด จึงใช้ postoperative", "Preoperative ใช้ก่อนผ่าตัด; interconnected คือเชื่อมถึงกัน; underdeveloped คือยังพัฒนาไม่พอ"]),
      quiz("q3", "Noun form", slides, [58, 67], "The team celebrated an ______ in the test results. Which form completes the sentence?", ["Improve", "Improved", "Improving", "Improvement"], 3, ["an ... in the test results ต้องการคำนามหมายถึงการปรับปรุง คือ improvement", "Improve เป็น base verb; improved มักใช้เป็น past form หรือ adjective; improving เป็น -ing form และไม่สมบูรณ์หลัง an ในประโยคนี้"]),
      quiz("q4", "Adding a suffix", slides, [65], "Which spelling correctly combines the base word hurry with the suffix -ing?", ["Hurrying", "Hurriing", "Hurryinng", "Hurryingg"], 0, ["เมื่อ suffix เริ่มด้วย i ให้คง y จึงได้ hurry + ing → hurrying", "Hurriing เปลี่ยน y ผิดที่; Hurryinng ซ้ำ n เกิน; Hurryingg ซ้ำ g เกิน"]),
      quiz("q5", "Affixes in context", story, [1, 2], "Which word best describes someone who remembers another person’s kindness and wants to return the favour?", ["Unlucky", "Helpless", "Grateful", "Uncomfortable"], 2, ["clue คือ remembers ... kindness และ return the favour สื่อว่าซาบซึ้งใจ = grateful", "Unlucky คือโชคร้าย; helpless คือช่วยตัวเองไม่ได้; uncomfortable คือไม่สบายตัวหรืออึดอัด"])
    ],
    checklist: [
      "แยกส่วนคำและเติมคำให้ถูกตามบริบทได้ อย่างน้อยหนึ่งตัวอย่างจากแต่ละกลุ่ม",
      "อธิบายกฎ -y, silent e และการซ้ำพยัญชนะพร้อมยกตัวอย่างได้",
      "อ่าน The Lion and the Mouse แล้วชี้ affix และบอกว่าช่วยตีความฉากไหนได้",
      "อภิปรายหนึ่งประเด็นโดยบอกความเห็น เหตุผล และหลักฐานจากเรื่องได้"
    ],
    coverage: [
      { pdf: slides, from: 1, to: 24, section: "roots-negation", topic: "Week 1.2: Root word, negative prefixes และ Activity 1" },
      { pdf: slides, from: 25, to: 45, section: "prefix-position", topic: "ตำแหน่ง ระดับ การทำให้เข้าสู่สภาพ และ Activities 2–3" },
      { pdf: slides, from: 46, to: 56, section: "prefix-quantity", topic: "การทำซ้ำและตารางตัวเลขจากภาพ" },
      { pdf: slides, from: 57, to: 74, section: "suffix-rules", topic: "ตาราง suffix จากภาพ การสะกด และ Activities 1–4" },
      { pdf: worksheet, from: 1, to: 2, section: "extra-affixes", topic: "ใบงานภาพ Prefix 17 ข้อและ Suffix 14 ข้อ" },
      { pdf: story, from: 1, to: 2, section: "lion-mouse", topic: "บทอ่านพร้อมกิจกรรม 4 ข้อ" },
      { pdf: assessment, from: 1, to: 3, section: "discussion-assessment", topic: "ข้อกำหนดและ rubric ของ Reading Discussion" }
    ]
  });
})();
