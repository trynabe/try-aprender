(() => {
  const paraphrasing = "Week 5.2 Paraphrasing Part 2 (Student Version) (1).pdf";
  const mainIdeas = "Reading Skills Practice Sheet #1 (1) (1).pdf";
  const practiceSheet = "Reading Skills Practice Sheet #3 (1) (1).pdf";
  const summarySlides = "Writing a Short Summary (1).pdf";
  const pages = (from, to = from) => Array.from({ length: to - from + 1 }, (_, index) => from + index);

  function section(id, pdf, from, to, title, summary, points, examples, extra = {}) {
    return { id, pdf, pages: pages(from, to), title, summary, points, examples, ...extra };
  }

  function work(id, pdf, pageList, title, prompt, task, steps, answer, note, original = false, practice = false) {
    const answerOrigin = original || practice ? "คำตอบตัวอย่างที่วิเคราะห์จากเอกสาร" : undefined;
    return { id, pdf, pages: pageList, title, prompt, task, steps, answer, note, original, practice, answerable: practice, answerOrigin };
  }

  function quiz(id, pdf, pageList, title, prompt, choices, correctChoice, steps) {
    return { id, pdf, pages: pageList, title, prompt, choices, correctChoice, steps, answer: choices[correctChoice] };
  }

  const paraphraseActivities = [
    work("activity-prefix", paraphrasing, [9], "กิจกรรม 1 · Add a prefix",
      "The buyer was not satisfied with the order she received from Lazada.",
      "ใช้คำที่มี prefix โดยรักษาความรู้สึกของผู้ซื้อ แหล่งที่มา และความสัมพันธ์กับคำสั่งซื้อ",
      [
        "มองคู่ not satisfied → dissatisfied โดย dis- เปลี่ยนความหมายของ satisfied",
        "ย่อ she received from Lazada เป็น her Lazada order ได้โดยยังชี้ถึงสินค้าที่ได้รับ",
        "คืนรายละเอียด she received ไว้ในฉบับนี้เพื่อรักษาลำดับว่าได้รับของแล้วจึงรู้สึกไม่พอใจ"
      ], "The buyer was dissatisfied with the order she had received from Lazada.", "คำตอบตัวอย่าง · หน้า 9 เว้นบรรทัดให้ผู้เรียนเขียน", true),
    work("activity-suffix", paraphrasing, [10], "กิจกรรม 2 · Add a noun suffix",
      "My next-door neighbor who is an expert in martial arts is going to audition as a stuntman for Chuck Norris’ new movie.",
      "ใช้ noun suffix และรักษาความหมายว่าเขาจะไปคัดตัวเพื่อรับบท",
      [
        "ข้อมูลหลักคือ my next-door neighbor, martial arts, going to audition, stuntman และ Chuck Norris’ new movie",
        "martial arts specialist ใช้ -ist เพื่อรวม an expert in martial arts เป็นคำนามสั้นลง",
        "คง intends to audition หรือ is going to audition เพื่อบอกแผนการ คำว่า got the role จะข้ามจากการคัดตัวไปถึงผลการคัดตัว"
      ], "My next-door neighbor, a martial arts specialist, plans to audition for a stuntman role in Chuck Norris’ new movie.", "คำตอบตัวอย่าง · หน้า 10 มีโจทย์และช่องว่าง", true),
    work("activity-idiom", paraphrasing, [11], "กิจกรรม 3 · Use an idiom",
      "Since he was sick, he decided to work from home today.",
      "ใส่สำนวนเกี่ยวกับอาการป่วยและคงความเป็นเหตุเป็นผล",
      [
        "under the weather หมายถึงรู้สึกไม่สบาย เหมาะกับการเล่าทั่วไป",
        "ย้ายเหตุผลมาไว้ท้ายประโยคด้วย because แต่รักษาความสัมพันธ์ว่าอาการป่วยเป็นเหตุของการเลือกทำงานที่บ้าน",
        "เก็บ today ไว้เพื่อให้เวลาเท่ากับต้นฉบับ"
      ], "He decided to work from home today because he was feeling under the weather.", "คำตอบตัวอย่าง · สไลด์หน้า 11 เว้นให้ลองเขียน", true),
    work("activity-phrasal", paraphrasing, [12], "กิจกรรม 4 · Use a phrasal verb",
      "If you arrive at the airport ahead of time, then you won’t be late when it is time to board the plane.",
      "เลือก phrasal verb ที่แทนรูป arrive ได้และเก็บเงื่อนไข if ไว้",
      [
        "show up หมายถึงมาถึง ใส่ at the airport เพื่อระบุสถานที่",
        "ahead of time → early และ won’t be late → will be on time รักษาผลลัพธ์ของเงื่อนไข",
        "คง boarding ไว้เพื่อให้รู้ว่าความตรงเวลาที่กล่าวถึงคือการขึ้นเครื่อง"
      ], "If you show up at the airport early, you’ll be on time to board the plane.", "คำตอบตัวอย่าง · หน้า 12 เว้นคำตอบไว้", true)
  ];

  const worksheetSentences = [
    [1, "Climate change is a pressing global issue that requires immediate action.",
      "Climate change is an urgent worldwide concern that calls for action now.",
      "pressing → urgent, global → worldwide และ immediate action → action now รักษาความเร่งด่วน", "pressing"],
    [1, "Artificial intelligence has the potential to revolutionize various industries.",
      "AI could radically transform a range of industries.",
      "has the potential → could รักษาความเป็นไปได้ คำว่า will ทำให้ผลลัพธ์ฟังดูแน่นอนขึ้น", "has the potential"],
    [1, "Social media has transformed the way we share information and interact with others.",
      "Social networking platforms have changed how people exchange information and communicate with one another.",
      "รักษาทั้งการแลกเปลี่ยนข้อมูลและการปฏิสัมพันธ์ และใช้ present perfect เพื่อสื่อการเปลี่ยนแปลงที่โยงถึงปัจจุบัน", "has transformed"],
    [1, "Quality healthcare should be accessible and affordable for all individuals.",
      "Everyone should be able to obtain good healthcare at a price they can afford.",
      "แตก accessible และ affordable เป็นเงื่อนไขเข้าถึงได้และจ่ายไหว คง should เพื่อรักษาข้อเสนอ", "accessible and affordable"],
    [1, "The use of plastic has had a detrimental impact on the environment and marine life.",
      "Using plastic has harmed the environment and organisms that live in the sea.",
      "detrimental impact → harmed ขยาย marine life ให้เข้าใจว่าเป็นสิ่งมีชีวิตในทะเล และเก็บ environment ไว้อีกส่วน", "detrimental impact"],
    [2, "The use of plastic has had a detrimental impact on the environment and marine life.",
      "Plastic use has adversely affected the environment and sea life.",
      "โจทย์ซ้ำจากหน้า 1 คราวนี้เปลี่ยน a detrimental impact เป็น adversely affected และ marine life เป็น sea life", "marine life"],
    [2, "The novel tells a captivating story of love and adventure in a distant land.",
      "The novel follows an engrossing tale about romance and adventure in a faraway place.",
      "captivating → engrossing, love → romance, distant → faraway รักษาทั้งความรัก การผจญภัย และสถานที่ห่างไกล", "in a distant land"],
    [2, "The novel tells a captivating story of love and adventure in a distant land.",
      "Set in a far-off land, the book recounts a compelling story that combines love with adventure.",
      "โจทย์ปรากฏสองบรรทัดติดกันในหน้า 2 ตัวอย่างนี้ย้ายสถานที่ขึ้นต้นและยังเก็บว่าเป็นเรื่องแต่งในหนังสือ", "a captivating story"],
    [2, "The children were excited to visit the amusement park and go on the thrilling rides.",
      "The children were eager to go to the amusement park and try its exciting rides.",
      "คงความรู้สึกตื่นเต้นของเด็ก กิจกรรมไปสวนสนุก และการขึ้นเครื่องเล่น โดยใช้โครง eager to + verb", "thrilling rides"],
    [2, "She enjoys playing the piano as a form of relaxation and self-expression.",
      "She likes to play the piano because it helps her unwind and express herself.",
      "as a form of → because it helps her ตามด้วยประโยชน์ทั้งสองด้าน เปลี่ยน self-expression เป็น express herself", "relaxation and self-expression"]
  ];

  const worksheetExamples = worksheetSentences.map(([page, original, answer, explanation, evidence], index) =>
    work("worksheet3-" + (index + 1), practiceSheet, [page], "Practice Sheet #3 · ข้อ " + (index + 1),
      original, "เขียนเป็นประโยคอังกฤษใหม่โดยเก็บใจความ น้ำหนักคำ และรายละเอียดเดิม",
      ["ขีดคำสำคัญในต้นฉบับ โดยเฉพาะ “" + evidence + "”", explanation, "อ่านสองประโยคเทียบกันและถามว่าผู้อ่านจะเข้าใจข้อเท็จจริงเหมือนเดิมไหม"],
      answer, "คำตอบตัวอย่าง · ใบงาน Student Version มีช่องให้เขียนด้วยตนเอง", true)
  );

  const mainIdeaPassages = [
    {
      id: "computers-passage", title: "Practice Sheet #1 · Computers", pdf: mainIdeas, pages: [1],
      paragraphs: [{
        english: "Computers have revolutionized the way we live and work, playing an indispensable role in various aspects of our daily lives. From personal computers to smartphones and tablets, these powerful devices have become essential tools for communication, information access, and productivity. They have transformed the way we connect with others, enabling instant messaging, video calls, and social networking platforms that bridge distances and foster global connections. Moreover, computers have opened up a vast realm of knowledge through the internet, offering us access to a wealth of information, online courses, and educational resources, empowering individuals to learn and grow at their own pace. Additionally, computers have greatly enhanced productivity in the workplace, automating tasks, streamlining processes, and enabling efficient collaboration among teams, ultimately leading to increased efficiency and profitability for businesses. In the realm of entertainment, computers have become indispensable for gaming, multimedia creation, and immersive virtual experiences, providing endless hours of enjoyment and creativity. In conclusion, computers have undoubtedly transformed our lives, enabling us to communicate, learn, work, and entertain ourselves in ways that were unimaginable just a few decades ago.",
        thai: "คอมพิวเตอร์และอุปกรณ์อย่างสมาร์ตโฟนกับแท็บเล็ตเปลี่ยนชีวิตและการทำงาน เราสื่อสารข้ามระยะทางผ่านข้อความ วิดีโอ และโซเชียล ใช้อินเทอร์เน็ตเข้าถึงความรู้และเรียนตามจังหวะตัวเอง ทำงานมีประสิทธิภาพขึ้นด้วยระบบอัตโนมัติและการทำงานร่วมกัน และใช้เล่นเกม สร้างสื่อ หรือสัมผัสโลกเสมือน",
        role: "เริ่มด้วยข้อสรุปกว้าง แล้วแยกหลักฐานเป็นด้านการสื่อสาร การเรียน งาน และความบันเทิง",
        vocabulary: ["indispensable = จำเป็นมาก", "bridge distances = เชื่อมต่อคนที่อยู่ห่างกัน", "streamline = ทำให้กระบวนการคล่องตัว"],
        analysis: "They และ these powerful devices ย้อนกลับไปยังกลุ่มอุปกรณ์ที่ผู้เขียนบอกไว้ คำว่า Moreover กับ Additionally เปิดหลักฐานชุดถัดไป ส่วน In conclusion รวมหมวดกลับเป็นใจความเดียว"
      }],
      questions: [work("worksheet1-computers", mainIdeas, [1], "หา Topic, Main Idea และ 3 Supporting Details",
        "Find the Topic, the Main Idea, and three Supporting Details of the computers paragraph.",
        "เขียน Topic เป็นวลี Main Idea เป็นประโยค และยกหลักฐานสามข้อจากคนละด้าน",
        [
          "คำที่กล่าวซ้ำคือ computers ส่วนย่อหน้าจบด้วย “communicate, learn, work, and entertain ourselves” จึงเห็นขอบเขตของ Main Idea",
          "หลักฐานสื่อสารจาก “instant messaging, video calls” หลักฐานเรียนจาก “online courses, and educational resources” และหลักฐานทำงานจาก “automating tasks, streamlining processes”",
          "ตัวอย่าง gaming หรือ multimedia creation ใช้แทนหนึ่งข้อได้ถ้าชี้ชัดว่าเป็นรายละเอียดด้านความบันเทิง"
        ], "Topic: Computers in daily life. Main idea: Computers have transformed communication, learning, work, and entertainment. Details: (1) Instant messages and video calls connect people. (2) Online resources support self-paced learning. (3) Automation and collaboration improve workplace productivity.", "คำตอบตัวอย่าง · ใบงานหน้า 1", true)]
    },
    {
      id: "gaming-passage", title: "Practice Sheet #1 · Gaming", pdf: mainIdeas, pages: [2],
      paragraphs: [{
        english: "Gaming has evolved into a multi-billion dollar industry, captivating millions of players worldwide with its immersive experiences and diverse range of genres. Whether it's the adrenaline-pumping action of first-person shooters, the strategic challenges of real-time strategy games, or the captivating narratives of role-playing adventures, gaming offers something for every kind of player. With advancements in technology, gaming has become more visually stunning and realistic, with lifelike graphics and intricate virtual worlds that transport players to fantastical realms. Furthermore, gaming has transcended traditional boundaries, fostering online communities where players can connect, compete, and collaborate with fellow enthusiasts from around the globe. The rise of esports has further propelled gaming into the mainstream, turning professional gaming into a legitimate career option and drawing huge audiences to spectate thrilling competitions. Moreover, gaming has not only provided entertainment but has also been utilized as a tool for education, training, and therapeutic purposes, harnessing the interactive nature of games to engage and motivate learners. In conclusion, gaming has emerged as a dynamic and influential industry, captivating players with its immersive experiences, diverse genres, and the endless possibilities it offers for both entertainment and personal growth.",
        thai: "เกมเติบโตเป็นอุตสาหกรรมขนาดใหญ่ มีแนวให้เลือกหลากหลายและโลกเสมือนที่สมจริงมากขึ้น ผู้เล่นพบกันในชุมชนออนไลน์ แข่งขันหรือร่วมมือกันได้ อีสปอร์ตขยายทั้งผู้ชมและโอกาสทางอาชีพ เกมยังนำไปใช้ในการศึกษา ฝึกทักษะ และงานบำบัด",
        role: "เกริ่นอุตสาหกรรม แล้วอธิบายด้วยตัวอย่างประเภทเกม เทคโนโลยี ชุมชน อาชีพ และการนำไปใช้",
        vocabulary: ["immersive = ให้ความรู้สึกเหมือนเข้าไปอยู่ในนั้น", "mainstream = กระแสหลัก", "therapeutic = เกี่ยวกับการบำบัด"],
        analysis: "Whether ... or ... เชื่อมรายการประเภทเกมที่เป็นตัวอย่าง คำว่า not only ... but also ... เพิ่มขอบเขตไปถึงการใช้งานนอกความบันเทิง"
      }],
      questions: [work("worksheet1-gaming", mainIdeas, [2], "หา Topic, Main Idea และ 3 Supporting Details",
        "Find the Topic, the Main Idea, and three Supporting Details of the gaming paragraph.",
        "หาแนวคิดที่ครอบทั้งความบันเทิง ประสบการณ์ และประโยชน์ด้านอื่น",
        [
          "ประโยคเปิดบอกว่า gaming เป็น “a multi-billion dollar industry” ส่วนท้ายขยาย “both entertainment and personal growth”",
          "เลือกหลักฐานที่สะท้อนคนละด้าน เช่น lifelike graphics, online communities และ education/training/therapy",
          "ประเด็น esports เป็นรายละเอียดสนับสนุนอีกตัวอย่าง ใช้แทนข้อใดข้อหนึ่งได้"
        ], "Topic: The development of gaming. Main idea: Gaming has become an influential industry offering varied immersive experiences and uses beyond entertainment. Details: (1) Better graphics create realistic worlds. (2) Online communities let players connect and compete. (3) Games support education, training, and therapy.", "คำตอบตัวอย่าง · ใบงานหน้า 2", true)]
    },
    {
      id: "smart-cars-passage", title: "Practice Sheet #1 · Smart Cars", pdf: mainIdeas, pages: [3],
      paragraphs: [{
        english: "Smart cars are changing the automotive industry, introducing advanced technologies that enhance safety, efficiency, and connectivity on the roads. These intelligent vehicles incorporate a wide array of features, such as adaptive cruise control, lane-keeping assist, and automatic emergency braking, which significantly improve road safety by reducing human error and mitigating accidents. Smart cars are equipped with sensors and cameras that constantly monitor the surroundings, providing real-time data for enhanced situational awareness and enabling features like blind-spot detection and collision warning systems. Additionally, these vehicles leverage connectivity to the internet, allowing for over-the-air software updates, integration with smart devices, and access to a multitude of services, including real-time traffic information, navigation assistance, and entertainment options. Furthermore, smart cars contribute to a more sustainable future by integrating electric or hybrid powertrains, reducing emissions and dependence on fossil fuels. With advancements in autonomous driving technology, smart cars are inching closer to self-driving capabilities, promising a future of enhanced convenience and efficiency on the roads. In conclusion, smart cars have ushered in a new era of automotive innovation, leveraging advanced technologies to create safer, more efficient, and connected driving experiences, paving the way for a future of intelligent transportation.",
        thai: "รถอัจฉริยะนำเทคโนโลยีมาเพิ่มความปลอดภัย ประสิทธิภาพ และการเชื่อมต่อ มีระบบช่วยขับกับเซนเซอร์ที่ติดตามสิ่งรอบรถ เชื่อมอินเทอร์เน็ตเพื่ออัปเดตซอฟต์แวร์และรับข้อมูลจราจร ใช้ขุมพลังไฟฟ้าหรือไฮบริดเพื่อลดการปล่อย และค่อย ๆ ก้าวใกล้การขับเคลื่อนอัตโนมัติ",
        role: "เปิดด้วยสามแกน แล้วใช้รายการเทคโนโลยีและประโยชน์ของแต่ละแกนมาขยาย",
        vocabulary: ["blind-spot detection = การตรวจจุดอับสายตา", "over-the-air = ส่งข้อมูลผ่านเครือข่ายไร้สาย", "inching closer to = ค่อย ๆ เข้าใกล้"],
        analysis: "which ในประโยคที่สองชี้กลับไปยังกลุ่มฟีเจอร์ช่วยขับ ส่วน promising a future บอกแนวโน้ม คงระดับความแน่ใจนี้เมื่อเขียนสรุป"
      }],
      questions: [work("worksheet1-smart-cars", mainIdeas, [3], "หา Topic, Main Idea และ 3 Supporting Details",
        "Find the Topic, the Main Idea, and three Supporting Details of the smart cars paragraph.",
        "เลือกตัวอย่างที่เชื่อมกับประโยชน์สามแกนได้ชัด",
        [
          "ประโยคแรกและสุดท้ายใช้แนวเดียวกันคือ safety, efficiency, and connectivity",
          "automatic emergency braking เป็นหลักฐานด้านความปลอดภัย ส่วน over-the-air software updates เป็นผลจากการเชื่อมต่อ",
          "electric or hybrid powertrains เป็นรายละเอียดด้านการลดการปล่อย คำว่า inching closer ย้ำว่าบทอ่านพูดถึงความคืบหน้าไปสู่ self-driving"
        ], "Topic: Smart cars. Main idea: Smart-car technologies are reshaping driving through greater safety, efficiency, and connectivity. Details: (1) Automatic braking can help reduce accidents. (2) Internet connectivity enables wireless updates and traffic information. (3) Electric and hybrid powertrains can reduce emissions.", "คำตอบตัวอย่าง · ใบงานหน้า 3", true)]
    }
  ];

  const exercisePassage = {
    id: "exercise-article", title: "The Transformative Power of Exercise: Elevating Body and Mind",
    pdf: summarySlides, pages: [4, 10, 12, 13, 15, 17, 18, 19, 21],
    paragraphs: [
      {
        english: "In a world that constantly pushes us to lead sedentary lifestyles, it is crucial to understand the profound impact that exercise can have on our overall well-being. Regular physical activity not only enhances our physical fitness but also boosts our mental and emotional health. Whether it’s hitting the gym, practicing yoga, going for a jog, or engaging in team sports, exercise offers a multitude of benefits that can transform our lives for the better.",
        thai: "บทนำตั้งปัญหาว่าสภาพชีวิตผลักให้คนเคลื่อนไหวน้อย แล้วเสนอว่าการออกกำลังกายหลายรูปแบบช่วยยกระดับความเป็นอยู่ได้หลายด้าน ทั้งสมรรถภาพร่างกาย สุขภาพใจ และอารมณ์",
        role: "A · Introduction · ภาพหน้า 12 และ 15",
        vocabulary: ["sedentary lifestyle = วิถีชีวิตที่ขยับตัวน้อย", "overall well-being = ความเป็นอยู่ที่ดีโดยรวม", "a multitude of = จำนวนมาก"],
        analysis: "Whether it’s ... or ... วางทางเลือกหลายกิจกรรมไว้หน้าประโยค ก่อนเข้าสู่ประธาน exercise กริยา offers และกรรม a multitude of benefits ใน Thesis ที่ไฮไลต์หน้า 15"
      },
      {
        english: "Engaging in regular exercise is vital for maintaining optimal physical health and vitality. Physical activities such as cardio workouts, strength training, and flexibility exercises help to improve cardiovascular health, build muscle strength, enhance bone density, and boost metabolism. Regular exercise also aids in weight management, reducing the risk of obesity and related health conditions such as diabetes, heart disease, and certain cancers. By promoting a stronger immune system, exercise helps to ward off illnesses and improve longevity.",
        thai: "ย่อหน้าแรกของเนื้อเรื่องอธิบายประโยชน์ทางกายและความกระฉับกระเฉง ผู้เขียนตามด้วยตัวอย่างรูปแบบการฝึกและรายละเอียดสุขภาพ เช่น หัวใจ กล้ามเนื้อ กระดูก การควบคุมน้ำหนัก และภูมิคุ้มกัน",
        role: "B · Body Paragraph 1, Physical Health and Vitality · ภาพหน้า 12 และ 19",
        vocabulary: ["vitality = ความมีพลัง", "metabolism = กระบวนการเผาผลาญ", "ward off = ป้องกันหรือช่วยให้หลีกเลี่ยง"],
        analysis: "ประธานของประโยคแรกคือ Engaging in regular exercise ทั้งกลุ่ม คำว่า such as เปิดรายละเอียดประกอบ สำหรับ Key Point ให้เริ่มจากประโยคแรกที่ครอบทุกตัวอย่าง"
      },
      {
        english: "Exercise is not just beneficial for the body but also for the mind. Engaging in physical activity releases endorphins, commonly known as “feel-good” hormones, which help reduce stress, anxiety, and depression. Regular exercise is linked to improved mood and increased self-esteem, as it provides a sense of accomplishment and promotes a positive body image. Furthermore, physical activity has been shown to enhance cognitive function, memory retention, and overall brain health. It can sharpen focus, boost creativity, and improve productivity, making exercise an essential component of a healthy lifestyle.",
        thai: "ย่อหน้าที่สองขยายไปด้านจิตใจ อารมณ์ ความมั่นใจ และการทำงานของสมอง รายละเอียดอย่างสมาธิ ความจำ และความคิดสร้างสรรค์สนับสนุนใจความว่าการออกกำลังกายมีผลดีต่อใจด้วย",
        role: "C · Body Paragraph 2, Mental Well-being and Cognitive Function · ภาพหน้า 13 และ 19",
        vocabulary: ["self-esteem = ความเห็นคุณค่าในตนเอง", "cognitive function = การทำงานเกี่ยวกับการคิด", "retention = การเก็บรักษา"],
        analysis: "not just ... but also ... ขยายจาก body ไปยัง mind ส่วน Furthermore เปิดเหตุผลเพิ่มด้านความคิด คำว่า is linked to บอกความสัมพันธ์ และควรรักษาน้ำหนักนี้เมื่อถอดความรายละเอียด"
      },
      {
        english: "Exercise serves as a powerful catalyst for forging social connections and nurturing emotional resilience. Participating in group activities, team sports, or fitness classes not only offers the opportunity to meet like-minded individuals but also fosters a sense of belonging and camaraderie. The shared goals, challenges, and triumphs experienced during exercise can build lasting friendships and support networks. Moreover, physical activity acts as a natural stress reliever, helping individuals develop emotional resilience and cope better with life’s ups and downs.",
        thai: "ย่อหน้าที่สามรวมสองผลคือสร้างสายสัมพันธ์กับคนอื่นและพัฒนาความสามารถรับมืออารมณ์ การออกกำลังกายเป็นกลุ่มสร้างเป้าหมายร่วม เพื่อน และเครือข่ายสนับสนุน ส่วนการคลายเครียดช่วยปรับตัวกับความผันผวนในชีวิต",
        role: "D · Body Paragraph 3, Social Connections and Emotional Resilience · ภาพหน้า 13 และ 19",
        vocabulary: ["catalyst = ตัวกระตุ้น", "camaraderie = ความเป็นเพื่อนร่วมกลุ่ม", "emotional resilience = ความสามารถฟื้นตัวทางอารมณ์"],
        analysis: "forging ... and nurturing ... เป็นสองชุดที่ขนานกันหลัง catalyst สรุป Key Point ให้เก็บทั้ง Social Connections และ Emotional Resilience"
      },
      {
        english: "Incorporating exercise into our daily routines holds immense transformative power, revolutionizing both our bodies and minds. The myriad benefits of exercise encompass improved physical health, enhanced mental well-being, and strengthened emotional resilience. By making a commitment to regular physical activity, we take an active step towards a healthier and more fulfilling life. So let’s embrace the transformative power of exercise, allowing it to uplift our spirits, energize our bodies, and pave the way to a brighter future.",
        thai: "ย่อหน้าสรุปย้อนประโยชน์ที่กล่าวมา แล้วชวนให้ผู้อ่านยอมรับพลังของการออกกำลังกายและทำเป็นประจำ ประโยคท้ายใช้ let’s เพื่อเชิญชวนผู้อ่านร่วมลงมือ",
        role: "E · Conclusion, Make it A Daily Routine · ภาพหน้า 13 และ 21",
        vocabulary: ["incorporate = รวมเข้าเป็นส่วนหนึ่ง", "myriad benefits = ประโยชน์หลากหลาย", "pave the way = ปูทาง"],
        analysis: "คำว่า So let’s แสดงท่าทีแบบ Advice ในกรอบ WOOPA และ allowing it เพิ่มผลที่ผู้เขียนคาดหวัง"
      }
    ]
  };

  const shortSummary = "According to Lorenzo Von Matterhorn’s article, “The Transformative Power of Exercise: Elevating Body and Mind,” regular physical activity can improve people’s lives in several ways, whether they train at a gym, practice yoga, run, or play team sports. Exercising frequently supports physical health and energy through activities that strengthen the body. The writer also explains that movement benefits the mind by supporting mood, confidence, and thinking. Furthermore, exercising with others can strengthen social ties, and being active helps people cope with stress and develop emotional resilience. The author concludes by encouraging readers to make exercise part of everyday life so that they can improve their overall well-being.";

  window.ReadingSkills.addChapter({
    number: 11,
    title: "Paraphrasing Part 2 and Writing a Short Summary",
    thaiTitle: "ถอดความให้ยังได้ความหมายเดิม แล้วเขียนสรุปจากหลักฐาน · Week 5.2 และ Week 6.1",
    summary: "ฝึกใช้ Prefix, Noun Suffix, Idiom และ Phrasal Verb แปลงประโยค จากนั้นหา Topic กับ Main Idea ในใบงานและเปลี่ยน Outline ของบทอ่านให้เป็น Summary Paragraph 100–150 คำ โดยตรวจ Thesis, Key Points และ Author’s Final Comment",
    goals: [
      "เลือกวิธี Paraphrase ให้เหมาะกับคำและบริบท พร้อมชี้คำในต้นฉบับที่ต้องรักษาน้ำหนักเดิม",
      "หา Topic, Main Idea และ Supporting Details สามข้อจากย่อหน้าที่ให้มาได้",
      "กรอก Summary Outline จากบทความจริงและเปลี่ยน Thesis, Key Points และ WOOPA เป็นย่อหน้าภาษาอังกฤษด้วยคำของตนเอง"
    ],
    confusions: [
      "Paraphrase รักษาระดับรายละเอียดของข้อความที่เลือก ส่วน Summary เลือกใจความแล้วลดรายละเอียดลง",
      "Topic เป็นเรื่องที่พูดถึง ส่วน Thesis คือความคิดหลักที่ผู้เขียนเสนอเกี่ยวกับเรื่องนั้น",
      "อ้าง A หรือ E เมื่อต้องหา Thesis หรือ Final Comment ใช้ B–D เมื่อต้องเลือก Key Points ตามภาพโครงสร้าง"
    ],
    sections: [
      section("paraphrase-tools", paraphrasing, 1, 8, "Word forms, idioms and phrasal verbs",
        "สไลด์ Week 5.2 นำรูปคำและสำนวนที่เรียนก่อนหน้ามาใช้ถอดความ เลือกจากความหมายในบริบท แล้วตรวจเวลา ความแน่นอน ความสัมพันธ์ และรายละเอียดที่ต้นฉบับระบุ",
        [
          ["Prefix", "หน้า 3–4 ใช้ re- ใน redo เพื่อสื่อทำซ้ำ mal- ใน malfunctioning เพื่อบอกว่าทำงานผิดปกติ และ ir- ใน irrelevant เพื่อบอกว่าไม่เกี่ยวหรือไม่มีผลในบริบทนั้น"],
          ["Noun Suffix", "หน้า 5–6 ใช้ baker, dancer และ zoologist แทนวลีที่อธิบายผู้ทำกริยาหรือผู้เชี่ยวชาญ คงชื่อคน ตำแหน่ง และบทบาทที่ต้นฉบับให้มา"],
          ["Idiom", "หน้า 7–8 ใช้ a piece of cake, take it easy และ face the music ตามความหมายเชิงสำนวนและระดับภาษาที่เหมาะกับงาน"],
          ["Phrasal Verb", "หน้า 8 ให้ look forward to + noun หรือรูป -ing เพื่อสื่อการตั้งตารอ คำว่า to ในสำนวนนี้เป็น preposition"]
        ],
        [
          work("redo-course", paraphrasing, [3], "ย้ายเงื่อนไขและใช้ redo",
            "If ICT students do not pass the exam, they have to do the course again.",
            "รักษา if, ผลสอบ และข้อบังคับให้เรียนซ้ำ",
            ["do not pass → fail", "do the course again → redo the course โดย re- หมายถึงอีกครั้ง", "หากนำอนุประโยค if ไปไว้ท้าย เรายังคงผลที่เกิดเมื่อสอบไม่ผ่าน"],
            "ICT students have to redo the course if they fail the exam.",
            "ตัวอย่างปรับจากสไลด์ · redo เป็น verb ที่มี prefix re- ประโยคในสไลด์ใช้ would have to ซึ่งฟังเป็นสมมติขึ้น"),
          work("prefix-examples", paraphrasing, [4], "ตัวอย่างหน้า 4 · malfunctioning และ irrelevant",
            "The Python script could not be completed because the computer was not working. The ability to play an instrument is not important for a professional mime.",
            "เปลี่ยนวลีปฏิเสธเป็นคำกระชับและรักษาความเป็นเหตุเป็นผล",
            ["คู่แรก not working → malfunctioning และ because → since โดยย้ายเหตุผลขึ้นหน้าได้", "คู่ที่สอง not important → irrelevant in this context คง professional mime ไว้ ผู้ที่เป็นมืออาชีพอาจมีระดับทักษะหลากหลาย", "ตรวจว่า code ยังอยู่ใน Python และเหตุที่ทำไม่เสร็จยังเป็นปัญหาคอมพิวเตอร์"],
            "Since my computer was malfunctioning, I could not finish coding my Python script. / For a professional mime, being able to play an instrument is irrelevant.",
            "คำตอบตัวอย่างอิงคู่ในสไลด์ · accomplished เพิ่มนัยความเก่ง จึงคง professional ไว้ในฉบับฝึก"),
          work("baker-example", paraphrasing, [5], "จาก who bakes เป็น baker",
            "The man from the village who bakes the most delicious muffins wants to open another store downtown.",
            "ใช้คำนามที่มี -er และเก็บตำแหน่งของร้านที่อยากเปิด",
            ["who bakes → baker โดย -er สร้างคำนามผู้กระทำ", "เก็บ in the village เป็นข้อมูลถิ่นของคน และ downtown เป็นตำแหน่งร้าน", "another ระบุว่าต้องการเพิ่มร้าน ส่วน wants to บอกความต้องการ"],
            "The village baker who makes the tastiest muffins wants to open another shop downtown.", "คำตอบตัวอย่างอิงสไลด์"),
          work("suffix-examples", paraphrasing, [6], "แยกคู่ตัวอย่างคำนามห้าชุด",
            "The employee was fired. / The chauffeur drove so fast. / The person who cuts hair is very good. / Beyonce had people dancing behind her. / He studies animals and can identify different types.",
            "ดูว่าคำนามใหม่แทนคนเดิมได้ไหม และตรวจน้ำหนักความหมายที่อาจเปลี่ยน",
            [
              "employee → worker ได้ในบริบทนี้ ส่วน fired กับ laid off ต่างกันที่นัยของเหตุที่งานสิ้นสุด จึงใช้ dismissed หรือ lost their job ตามระดับความแม่นยำที่ต้องการ",
              "chauffeur → hired driver ได้ ส่วน very fast รักษาระดับความเร็วจาก so fast ได้ชัดกว่า speedily driving",
              "person who cuts hair → barber และ very good → skilled ส่วน people dancing → dancers ด้วย -er",
              "man who studies animals → zoologist มี -ist สำหรับผู้เชี่ยวชาญ คำว่า since รักษาเหตุที่จำแนกชนิดได้ เช่นเดียวกับ because"
            ],
            "The worker was dismissed. / The hired driver drove very fast. / The barber is skilled. / Beyonce had dancers behind her during her concert. / As a zoologist, he can identify different kinds of animals.",
            "คำตอบตัวอย่างอิงทุกคู่ในหน้า 6 · คงช่วงเวลาของตัวอย่าง dancers ว่า “during her concert”"),
          work("idiom-examples", paraphrasing, [7, 8], "ตัวอย่าง a piece of cake, take it easy, face the music, look forward to",
            "The worksheets are very easy and quick to finish. James Bond is going to relax. The child must face the consequences. ICT students are eagerly anticipating their summer vacation.",
            "แทนคำสำคัญด้วยสำนวนและเก็บรายละเอียดที่กำหนดสถานการณ์",
            [
              "a piece of cake = very easy ส่วน can be completed quickly เก็บความหมายว่าทำเสร็จในเวลาไม่นาน",
              "take it easy = relax ตัวอย่าง James Bond เก็บว่าเพิ่งช่วยโลกอีกครั้ง และตั้งใจพักบนชายหาดในไทย",
              "face the music = accept the consequences เก็บเหตุว่าลูกทำตุ๊กตากระเบื้องใบโปรดของแม่แตกโดยบังเอิญ และต้องรับผลเมื่อแม่กลับถึงบ้าน",
              "look forward to + their summer vacation รักษาการตั้งตารอในตัวอย่างนักศึกษา ICT"
            ],
            "The worksheets are a piece of cake and can be finished quickly. / Bond plans to take it easy on a Thai beach after saving the world again. / The child will face the music when her mother gets home after accidentally breaking her favorite porcelain doll. / ICT students are looking forward to their summer vacation.",
            "คำตอบตัวอย่างอิงสไลด์ · คำว่า dill ในตัวอย่างหน้า 8 น่าจะเป็นการพิมพ์ doll ผิด หลักฐานคือ original text ใช้ doll")
        ]),
      section("try-paraphrasing", paraphrasing, 9, 14, "Try this Activity and Classwork",
        "ลองถอดความทั้งสี่ประโยคโดยใช้ชนิดคำที่แต่ละหน้าขอ หน้า 13 ชี้ไปยัง Practice Sheet #3 และหน้า 14 เป็นภาพพัก «Time to take a break»",
        [["ตรวจความหมาย", "ขีดคำที่หายไปหลังเปลี่ยนรูป เช่น เงื่อนไข if การปฏิเสธ หรือความตั้งใจ แล้วเขียนคืนถ้าความหมายเปลี่ยน"]], paraphraseActivities),
      section("practice-main-idea", mainIdeas, 1, 3, "Practice Sheet #1 · Main Idea and Supporting Details",
        "ใบงานมีสามย่อหน้า ให้ระบุ Topic, Main Idea และ Supporting Details สามข้อในแต่ละหน้า ลองตอบเองจากบทอ่านภาษาอังกฤษก่อนเปิดแนวคำตอบ",
        [
          ["Topic", "เขียนเป็นวลี เช่น Computers in daily life"],
          ["Main Idea", "เขียนเป็นประโยคที่ครอบย่อหน้าทั้งหมด"],
          ["Supporting Details", "เลือกข้อมูลที่ชี้กลับไปยัง Main Idea ได้จริง และเลือกคนละประเด็นเพื่อแสดงขอบเขตให้ครบ"]
        ], [], { passages: mainIdeaPassages }),
      section("practice-paraphrase", practiceSheet, 1, 2, "Practice Sheet #3 · Paraphrasing",
        "ใบงานให้เขียนประโยคของตนเอง มีสิบช่องตามลำดับจริง ประโยคเกี่ยวกับพลาสติกและนวนิยายปรากฏซ้ำ จึงคงตำแหน่งโจทย์และให้คำตอบตัวอย่างคนละสำนวน",
        [["ตรวจตัวเอง", "เทียบผู้กระทำ การกระทำ เป้าหมาย เวลา ความหนักเบาของคำ และรายละเอียดที่จำเป็นกับต้นฉบับ"]], worksheetExamples),
      section("summary-outline", summarySlides, 1, 15, "Writing a Short Summary · Fill the outline",
        "Week 6.1 ใช้ Outline เก็บแกนของบทอ่านก่อนเขียนย่อหน้า ภาพบทความออกกำลังกายในสไลด์เป็นต้นฉบับที่ใช้เติมช่องทีละส่วน",
        [
          ["Summary", "สรุปสั้นด้วยคำของตนเอง โดยเก็บสาระหลักของต้นฉบับ"],
          ["Outline เจ็ดช่อง", "Title, Source (if known), Author (if known), Topic, Thesis, Main Ideas or Key Points และ Author’s Final Comment (WOOPA) ใช้คำสำคัญเป็นโน้ตได้"],
          ["Title / Source / Author", "ภาพหน้า 4, 6, 8 และ 10 แสดงการชี้ชื่อเรื่องและชื่อ Lorenzo Von Matterhorn สไลด์ระบุให้เว้น Source เพราะไม่มีชื่อแพลตฟอร์มให้เห็น"],
          ["Topic / Thesis", "หน้า 12 ใช้ลูกศรชี้คำ exercise และไฮไลต์คำซ้ำในหน้า 13 ส่วนหน้า 15 ไฮไลต์ประโยค thesis ทั้งประโยคในย่อหน้าเปิด"]
        ],
        [work("fill-summary-metadata", summarySlides, pages(4, 15), "เติมข้อมูลก่อนเขียนสรุป",
          "Read the title and byline in the slide image, scan for the repeated topic, and find the thesis in the introduction.",
          "เติม Title, Source, Author, Topic และ Thesis จากข้อมูลที่เห็นจริง",
          [
            "อ่านชื่อเรื่องจากแถบไฮไลต์ในภาพหน้า 6 แยกชื่อผู้เขียนที่ลูกศรชี้ในหน้า 10",
            "หน้า 7 บอกว่าไม่เห็นแหล่งเผยแพร่ในตัวอย่าง จึงปล่อยช่อง Source ว่างตามหน้า 8",
            "หน้า 12–13 ไฮไลต์ exercise กับ physical activity ซ้ำ จึงสรุป Topic เป็น Exercise หน้า 15 ชี้ Thesis ที่ครอบประโยชน์หลายอย่าง"
          ], "Title: The Transformative Power of Exercise: Elevating Body and Mind. Source: Unspecified. Author: Lorenzo Von Matterhorn. Topic: Exercise. Thesis: Exercise in its various forms offers many benefits that can improve our lives.",
          "Title, Author และ Topic มาจากสไลด์ หน้า 15 ให้ Thesis ต้นฉบับ คำตอบนี้ถอดความ Thesis เพื่อเตรียมเขียน Summary", true)],
        { passages: [exercisePassage] }),
      section("summary-key-points", summarySlides, 16, 22, "Key points and the author’s final comment",
        "ภาพหน้า 17–18 แยก A = Introduction, B–D = Body, E = Conclusion ตอนหา Key Points ให้เลือกใจความของ Body แต่ละย่อหน้า จากนั้นอ่านประโยคท้ายของ Conclusion เพื่อระบุความเห็นปิดท้าย",
        [
          ["Key Point 1", "Physical Health and Vitality · การออกกำลังกายสม่ำเสมอช่วยด้านสุขภาพกายและความกระฉับกระเฉง"],
          ["Key Point 2", "Mental Well-being and Cognitive Function · การออกกำลังกายส่งผลดีต่อจิตใจด้วย"],
          ["Key Point 3", "Social Connections and Emotional Resilience · การออกกำลังกายสร้างความสัมพันธ์และความยืดหยุ่นทางอารมณ์"],
          ["WOOPA", "Warning, Opinion, Observation, Prediction, Advice เป็นตัวเลือกท่าทีของประโยคปิดท้าย หน้า 20 ให้สำรวจท้าย Conclusion"]
        ],
        [work("fill-key-points", summarySlides, pages(16, 22), "อ่านไฮไลต์ B–D แล้วระบุ WOOPA",
          "Locate the three body topic sentences and classify the author's final comment.",
          "เขียน Key Points สามข้อและเลือก WOOPA ที่ตรงกับหลักฐาน",
          [
            "หน้า 18 กรอบเหลืองล้อม B–D และหน้า 19 ไฮไลต์ประโยคที่ครอบย่อหน้านั้น",
            "รวบประโยชน์ด้านกาย ใจ และความสัมพันธ์พร้อมการรับมืออารมณ์ ประโยคย่อยเรื่องฮอร์โมนหรือชนิดการฝึกใช้สนับสนุน แต่ Outline ช่อง Key Points ต้องการใจความใหญ่",
            "หน้า 21 ไฮไลต์ “So let’s embrace” ในย่อหน้า E การชวนให้ทำบางอย่างมีลักษณะ Advice"
          ], "Regular exercise supports physical vitality, benefits the mind, and builds social connections and emotional resilience. Final comment — Advice: The writer urges readers to embrace exercise as a regular part of life.",
          "Key Points มาจากหน้า 19 ส่วน Advice เป็นการจัดประเภทจากหลักฐานในหน้า 21", true)]),
      section("summary-opening", summarySlides, 23, 29, "First sentence · Three signal-word patterns",
        "เปลี่ยนข้อมูลห้าช่องแรกของ Outline ให้เป็นประโยคเปิด ใช้ Signal Words บอกว่าเรากำลังถ่ายทอดงานของผู้เขียน และถอดความ Thesis ให้กระชับ",
        [
          ["Method #1 · According to", "According to the article, ‘[title],’ by [author], [paraphrased thesis]."],
          ["Method #2 · Based on", "Based on [author]’s article, ‘[title],’ [author or pronoun] states that [paraphrased thesis]."],
          ["Method #3 · Author + clause", "[Author], who wrote ‘[title],’ states that [paraphrased thesis]."],
          ["ไฮไลต์หน้า 28", "สีและลูกศรจับคู่ Title, Author, Topic และ Thesis จาก Outline ไปยังประโยคเปิด Source ไม่มีข้อมูลในตัวอย่างนี้"]
        ],
        [work("three-openings", summarySlides, pages(24, 28), "ลองเขียนประโยคเปิดทั้งสามรูป",
          "Use the exercise article to write an opening sentence with each of the three patterns.",
          "ยึดชื่อบทความ ชื่อผู้เขียน และ Thesis จาก Outline",
          [
            "หยิบชื่อกับผู้เขียนจากหน้า 23 และรักษาว่า exercise gives many benefits",
            "รูปที่หนึ่งใช้ According to นำชื่อบทความ รูปที่สองใช้ Based on นำชื่อผู้เขียน รูปที่สามให้ Lorenzo Von Matterhorn เป็นประธานของ states",
            "ใส่ source เมื่อแหล่งเผยแพร่ปรากฏ ในตัวอย่างนี้ใช้เท่าที่หน้า 7 และ 28 ยืนยัน"
          ],
          "According to Lorenzo Von Matterhorn’s article, “The Transformative Power of Exercise: Elevating Body and Mind,” various kinds of physical activity can improve our lives. / Based on Lorenzo Von Matterhorn’s article, “The Transformative Power of Exercise: Elevating Body and Mind,” he states that physical activity improves life in many ways. / Lorenzo Von Matterhorn, who wrote “The Transformative Power of Exercise: Elevating Body and Mind,” states that many kinds of exercise can improve quality of life.",
          "คำตอบตัวอย่างตามโครงทั้งสามแบบในสไลด์", false, true)]),
      section("summary-body", summarySlides, 30, 37, "Sentences 2–4 · Connect the three body ideas",
        "หน้า 30 ใช้เส้นชี้จาก Outline สามข้อไปยังประโยค 2, 3, 4 ตามลำดับ หน้า 32 ใช้สีจับคู่ว่าแต่ละประโยคถอดมาจาก Key Point ใด แล้วหน้า 34–37 ทดลองเปลี่ยน Signal Word ของประโยคสุดท้ายในส่วนเนื้อหา",
        [
          ["Sentence 2", "ถอด Key Point จาก Body 1 เป็นประโยคประโยชน์ด้านกาย"],
          ["Sentence 3", "ถอด Key Point จาก Body 2 เป็นประโยคประโยชน์ด้านจิตใจ"],
          ["Sentence 4", "ถอด Key Point จาก Body 3 โดยเก็บทั้ง Social Connections และ Emotional Resilience"],
          ["Signal words", "หน้า 34 ยก In addition, Also, Moreover และ Furthermore เมื่อวางต้นประโยคในตัวอย่างตามด้วย comma หน้า 35–37 ใช้ใจความเดิมและเปลี่ยนคำเชื่อม"]
        ],
        [work("paraphrase-three-points", summarySlides, pages(30, 37), "ถอดความสาม Key Points",
          "Paraphrase the three body points. Add a suitable signal word before the final key point.",
          "ร่างประโยค 2–4 ที่เรียงตามย่อหน้า Body",
          [
            "จาก “regular exercise” ใช้ exercising regularly เพื่อเก็บความหมายสม่ำเสมอ รูป on a daily basis ในสไลด์เพิ่มนัยว่าทุกวัน",
            "ประโยคด้านจิตใจอาจใช้ also supports mental well-being แล้วคงระดับข้อกล่าวอ้างของบทอ่าน",
            "ขึ้นประโยคสังคมและอารมณ์ด้วย Furthermore, หรือ In addition, ตรวจว่าคำเชื่อมเป็นการเพิ่มประเด็น"
          ], "Exercising regularly supports physical health and energy. It also helps improve mental well-being. Furthermore, physical activity can strengthen social relationships and help people cope emotionally.",
          "คำตอบตัวอย่างอิงหน้า 31–37", false, true)]),
      section("summary-finish", summarySlides, 38, 48, "Finish, check the word count and try the group activity",
        "ถอดความ Author’s Final Comment ในประโยคท้าย รวมเป็นย่อหน้าแล้วตรวจการอ้างเสียงของผู้เขียน การย่อหน้า และจำนวนคำตามเกณฑ์สไลด์",
        [
          ["Sentence 5", "หน้า 38–39 กรอบข้อความและลูกศรเชื่อม Final Comment ไปยังประโยคเปิด The author’s final comment ... คงรูปข้อแนะนำของผู้เขียน"],
          ["จัดรูปย่อหน้า", "หน้า 40–43 รวมข้อความเป็นหนึ่งย่อหน้า ภาพหน้า 42 ชี้ให้วางเคอร์เซอร์หน้าคำแรกแล้วกด Tab เพื่อเยื้อง"],
          ["Word Count", "หน้า 44 แสดงตัวอย่าง 147 คำ หน้า 45 ให้เป้าหมาย 100–150 คำ ยอมให้เกินเล็กน้อยและแนะนำพยายามคุมไม่เกิน 170 คำ"],
          ["กรณีข้อมูลผู้เขียนไม่ปรากฏ", "หน้า 46 ใช้ the author states that หน้า 47 เสนอทางเลือกเล่า Key Points ด้วย In the first body paragraph, Later in the article และ The last main idea"]
        ],
        [
          work("complete-short-summary", summarySlides, pages(38, 47), "รวมเป็น Short Summary",
            "Put together one summary paragraph based on the exercise article.",
            "เปิดด้วยแหล่งที่มาและ Thesis ตามที่มี ต่อด้วย Key Points สามข้อ และปิดด้วย Advice ของผู้เขียน",
            [
              "ประโยคเปิดตั้งชื่อบทความกับผู้เขียน แล้วเก็บภาพรวมว่าการออกกำลังกายหลายแบบส่งผลดีได้",
              "ประโยคกลางสามประโยคแทน Body B–D และใช้ Furthermore, ก่อน Key Point สุดท้าย",
              "ประโยคท้ายถอดความคำชวนในหน้า 21 ระบุว่าท่าทีนั้นเป็นของผู้เขียน จากนั้นนับคำให้ถึงเป้าหมาย"
            ], shortSummary, "คำตอบตัวอย่างสำหรับฝึกมี 107 คำเมื่อนับตามช่องว่าง · สไลด์มีฉบับของอาจารย์หน้า 40–46 และบอกจำนวน 147 คำ", false, true),
          work("group-sweet-trap", summarySlides, [48], "Your Turn · The Sweet Trap",
            "In groups of 3 to 4, read “The Sweet Trap: Unveiling the Hidden Dangers of Sugar,” create a summary outline, and write a summary paragraph.",
            "ใช้โครงสรุปเจ็ดช่องกับบทอ่านที่ระบุในหน้า 48",
            [
              "เตรียมช่อง Title, Source, Author, Topic, Thesis, Key Points และ Author’s Final Comment",
              "เมื่อมีบทอ่าน ให้อ่าน Intro เพื่อหา Thesis, Body เพื่อหา Key Points และ Conclusion เพื่อหา WOOPA",
              "สไลด์ระบุว่าเป็นงานกลุ่ม 3–4 คน ให้เรียบเรียงด้วยตนเอง และระบุวันส่ง July 6th ก่อนคาบถัดไปตามกิจกรรมในเอกสาร"
            ], "Title: The Sweet Trap: Unveiling the Hidden Dangers of Sugar. เติมช่องที่เหลือจากบทอ่านเมื่อมีตัวบทให้ตรวจสอบ.",
            "ต้องมีไฟล์ต้นฉบับ The Sweet Trap เพิ่มเพื่อยืนยัน Thesis, Key Points และ Final Comment · ในชุดไฟล์ที่ได้รับพบเฉพาะคำสั่งกิจกรรมหน้า 48", true)
        ])
    ],
    exercises: [
      quiz("q1", paraphrasing, [3, 4], "Choose the closest paraphrase",
        "Original: If Mina doesn’t pass the practical test, she must take the practical test again. Which sentence keeps the original meaning?",
        [
          "Mina must retake the practical test if she fails it.",
          "Mina may skip the practical test if she fails it.",
          "Mina must retake the course before she sits the test.",
          "Mina will take a new practical test even if she passes."
        ], 0, [
          "must คงความจำเป็น และ retake สื่อ take ... again ด้วย re- ตามรูปในหน้า 3",
          "ข้อ ข เปลี่ยนต้องสอบใหม่เป็นเลือกข้ามการสอบ ข้อ ค เปลี่ยนจากสอบใหม่เป็นเรียนหลักสูตรใหม่และเพิ่ม before",
          "ข้อ ง เปลี่ยนเงื่อนไขสอบไม่ผ่านเป็นทำเช่นนั้นแม้สอบผ่าน"
        ]),
      quiz("q2", paraphrasing, [5, 6], "Keep the noun suffix and the details",
        "Original: The woman who designs costumes backstage will open another studio downtown. Which paraphrase preserves the details with a noun ending in -er?",
        [
          "The backstage actor will sell her studio downtown.",
          "The costume designer working backstage will open an additional studio downtown.",
          "The stylist opened the only studio in town last week.",
          "The costume wearer will close another studio backstage."
        ], 1, [
          "design + -er → designer จึงย่อ who designs costumes และ additional เก็บ another",
          "ข้อ ก เปลี่ยนหน้าที่เป็น actor และเปลี่ยนการเปิดเป็นขาย ข้อ ค เปลี่ยนเหตุการณ์อนาคตเป็นอดีตและเปลี่ยนอีกแห่งเป็นแห่งเดียว",
          "ข้อ ง สลับหน้าที่เป็นคนสวมชุดและสลับ action จาก open เป็น close"
        ]),
      quiz("q3", paraphrasing, [7, 8, 12], "Paraphrase the action and the time",
        "Original: The volunteers are eagerly anticipating Saturday’s event. Which paraphrase is closest?",
        [
          "The volunteers are putting off Saturday’s event.",
          "The volunteers took it easy at Saturday’s event.",
          "The volunteers are looking forward to Saturday’s event.",
          "The volunteers are looking into why Saturday’s event was canceled."
        ], 2, [
          "eagerly anticipating → looking forward to คงท่าทีตั้งตารอและเก็บ Saturday’s event",
          "ข้อ ก put off แปลว่าเลื่อน ข้อ ข take it easy คือพักและใช้กาลอดีต",
          "ข้อ ง look into คือสืบหาสาเหตุ รวมถึงเพิ่มการยกเลิกซึ่งต้นฉบับไม่ได้ระบุ"
        ]),
      quiz("q4", mainIdeas, [1, 2, 3], "Identify the main idea",
        "Passage: The school garden brings science lessons to life. Students test soil conditions, measure plant growth, and observe insects during their weekly visits. What is the main idea?",
        [
          "Students visit the garden every week.",
          "Insects are the most useful part of every science lesson.",
          "Students learn mostly by measuring plant growth.",
          "The school garden helps students learn science through direct experience."
        ], 3, [
          "ประโยคแรกบอกข้อกว้างว่า brings science lessons to life และประโยคถัดไปให้หลักฐานการทดลองและสังเกต",
          "ข้อ ก เป็นรายละเอียดเวลา ข้อ ข ยกแมลงเป็นส่วนสำคัญที่สุดโดยไม่มีหลักฐานเปรียบเทียบ",
          "ข้อ ค จำกัดใจความเหลือเพียงการวัดต้นไม้และเพิ่มคำว่า mostly"
        ]),
      quiz("q5", summarySlides, [20, 23, 24, 28, 39, 46], "Open a summary with an unnamed author",
        "A text titled “City Trees” has no byline and argues that planting street trees can improve urban life by providing shade and cleaner air. Which sentence is a suitable opening for a summary?",
        [
          "According to the article “City Trees,” the author argues that roadside trees can make cities more livable by cooling streets and improving air quality.",
          "I know every city must ban cars and buy more trees.",
          "The famous researcher Maria Lane says every tree will eliminate urban pollution.",
          "Furthermore, there are 50 tall trees outside my house."
        ], 0, [
          "ตามหน้า 24 และ 46 ใส่ชื่อเรื่อง ใช้ the author โดยไม่สร้างชื่อ และถอด Thesis เป็นคำของเรา",
          "ข้อ ข เป็นความเห็นของผู้สรุปและเพิ่มการห้ามรถ ข้อ ค สร้างชื่อและขยาย can improve เป็น will eliminate",
          "ข้อ ง เริ่มด้วยคำเชื่อมเพิ่มประเด็นและนำข้อมูลส่วนตัวที่ไม่อยู่ในบทอ่านมาใช้"
        ])
    ],
    checklist: [
      "เปลี่ยนประโยคด้วย Prefix, Noun Suffix, Idiom และ Phrasal Verb อย่างละหนึ่งครั้ง แล้วตรวจความหมายกับต้นฉบับ",
      "ระบุ Topic, Main Idea และ Supporting Details สามข้อโดยชี้หลักฐานอังกฤษจากย่อหน้าเดิม",
      "กรอก Outline เจ็ดช่อง เลือก WOOPA จากประโยคสุดท้าย แล้วเขียนสรุปหนึ่งย่อหน้าในช่วง 100–150 คำ",
      "เขียนประโยคเปิดแบบ According to, Based on และ Author + clause ได้ และปรับเมื่อไม่ปรากฏชื่อผู้เขียน"
    ],
    coverage: [
      { pdf: paraphrasing, from: 1, to: 8, section: "paraphrase-tools", topic: "Week 5.2 และตัวอย่างทุกกลุ่ม" },
      { pdf: paraphrasing, from: 9, to: 14, section: "try-paraphrasing", topic: "กิจกรรมสี่ข้อ ใบงาน และภาพช่วงพัก" },
      { pdf: mainIdeas, from: 1, to: 3, section: "practice-main-idea", topic: "บทอ่านสามเรื่องและโจทย์ Topic, Main Idea, Supporting Details" },
      { pdf: practiceSheet, from: 1, to: 2, section: "practice-paraphrase", topic: "Paraphrase ครบสิบช่องตามหน้าจริง" },
      { pdf: summarySlides, from: 1, to: 15, section: "summary-outline", topic: "Week 6.1, Summary Outline และบทอ่านในภาพ" },
      { pdf: summarySlides, from: 16, to: 22, section: "summary-key-points", topic: "แผนภาพ A–E, Key Points, WOOPA" },
      { pdf: summarySlides, from: 23, to: 29, section: "summary-opening", topic: "First sentence สามรูปและลูกศรเชื่อม Outline" },
      { pdf: summarySlides, from: 30, to: 37, section: "summary-body", topic: "Sentences 2–4 กับ Signal Words" },
      { pdf: summarySlides, from: 38, to: 48, section: "summary-finish", topic: "ย่อหน้าสรุป เกณฑ์จำนวนคำ และโจทย์กลุ่มที่ต้องใช้ไฟล์ The Sweet Trap เพิ่ม" }
    ]
  });
})();
