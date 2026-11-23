(() => {
  const { addChapter, section, example, quiz } = window.ComputerNetwork;
  const source = "transport";

  addChapter({
    number: 11,
    title: "Transport Layer (1)",
    thaiTitle: "จากข้อมูลของแอปไปถึง Socket ที่ถูกต้อง",
    summary: "IP พาข้อมูลไปถึงเครื่องปลายทาง แล้ว Transport Layer ต้องส่งต่อให้โปรแกรมที่กำลังรอข้อมูลอยู่ ลองตามเส้นทางของ HTTP หนึ่งข้อความ แล้วใช้ Port และ IP address อ่านแผนภาพ UDP กับ TCP ให้ได้ด้วยตัวเอง",
    goals: [
      "ไล่เส้นทาง Application message → Transport segment → IP datagram และอธิบายว่าฝั่งรับเปิดส่วนหัวอะไรตามลำดับ",
      "จำแนก Multiplexing ตอนส่งกับ Demultiplexing ตอนรับจากทิศลูกศรในภาพ",
      "เติม Source port และ Destination port ของข้อความ UDP ไปกลับ และใช้ TCP 4-tuple ระบุ Socket ของแต่ละ Connection"
    ],
    confusions: [
      "IP address ระบุปลายทางที่ชั้น IP ส่วน Port ช่วยระบุปลายทางของข้อมูลใน Transport Layer ภายในเครื่องนั้น",
      "Port 80 ที่ตรงกันอาจเป็นของ TCP Connection หลายเส้น ต้องดู IP และ Port ทั้งสองฝั่งประกอบ",
      "มัลติเพล็กซ์ข้อมูลจากหลาย Socket หมายถึงส่ง Segment ของแต่ละ Socket ลงชั้นเดียวกัน โดยแต่ละ Segment ยังมี Header ของตัวเอง"
    ],
    sources: [[source, 1, 23]],
    sections: [
      section("transport-services", source, "1–7", "Transport-layer services", "Transport Layer ให้ Logical communication หรือภาพมองเสมือนว่าโปรแกรมบนสองเครื่องคุยกันโดยตรง เส้นทางจริงในรูปหน้า 4 และ 7 ผ่านเครือข่ายบ้าน องค์กร หรือผู้ให้บริการหลายช่วง แต่การจัดส่งถึงโปรแกรมเป็นงานของเครื่องต้นทางและปลายทาง", [
        ["Process และ Socket", "Process คือโปรแกรมที่กำลังทำงาน ส่วน Socket คือจุดที่โปรแกรมใช้ส่งและรับข้อมูลผ่าน Transport Layer เครื่องเดียวมีได้หลาย Socket"],
        ["Segment และ Datagram", "Transport Layer ใส่ Header ของตัวเองหน้าข้อมูลเป็น Segment แล้วส่งให้ IP ซึ่งเพิ่ม IP header กลายเป็น IP datagram คำว่า UDP datagram ในมาตรฐานหมายถึงหน่วยข้อมูลของ UDP เอง ให้อ่านว่าบริบทกำลังพูดถึงชั้นไหน"],
        ["TCP (Transmission Control Protocol)", "เริ่มด้วย Connection setup ส่งเป็นลำดับไบต์ที่เชื่อถือได้ มี Flow control คุมความเร็วตามพื้นที่รับ และ Congestion control ปรับตามความแออัดของเครือข่าย ทั้งสองอย่างลงรายละเอียดใน Lecture 12 หน้า PDF 50–56 และ 65–88"],
        ["UDP (User Datagram Protocol)", "ส่งแบบ Best effort โดยแต่ละ Datagram เป็นอิสระจากกัน ข้อมูลอาจสูญหายหรือมาสลับลำดับ ทั้ง TCP และ UDP บน Internet ปกติให้บริการโดยไม่มีการรับประกัน Delay หรือ Bandwidth"],
        ["ลำดับตามเอกสาร", "ปกที่แสดงบนหน้า PDF 1 คือ Chapter 6 Transport Layer ชั้นข้อความมีปก Chapter 5 ซ้อนอยู่ และหน้า PDF 8 พิมพ์ Chapter 3 บน Roadmap ให้อิงหัวข้อที่มองเห็นกับเลขหน้า PDF ส่วนกลไก Error control และ Flow control อยู่ใน Lecture 12 ตามตำแหน่งจริงในไฟล์ เช่นเดียวกับตัวอย่าง Connection ค้างหน้า 60–61 เอกสารนี้ไม่มีหัวข้อ Crash recovery แยก"]
      ], [
        example("segment-journey", [4, 5, 6, 7], "ตามข้อความผ่านชั้น Transport ทั้งสองฝั่ง", "ในภาพมีโปรแกรมบนเครื่องส่งส่ง App message ลงมาหนึ่งข้อความ เครื่องรับใช้ IP และ Transport Layer รับข้อมูลเข้ามา", "ไล่สิ่งที่ฝั่งส่งเพิ่มและจุดที่ฝั่งรับตัดสินใจว่าจะส่งข้อมูลขึ้นไปที่ใด", [
          "เริ่มที่ Application ส่ง App message ให้ Transport Layer ผ่าน Socket",
          "ฝั่งส่งกำหนดค่า Transport header เช่น Port แล้วประกบกับข้อมูลเป็น Segment และส่งลง IP",
          "ฝั่งรับให้ IP ส่ง Segment ขึ้นมาให้ Transport Layer ตรวจ Header แล้วเลือก Socket สำหรับส่ง Payload ขึ้นไป"
        ], "ฝั่งส่งสร้าง Segment และฝั่งรับส่งข้อมูลให้โปรแกรมผ่าน Socket ที่ตรงกับ Header", {
          diagram: ["Application message", "Transport header + ข้อมูล", "IP ส่งถึงเครื่องรับ", "Transport เลือก Socket", "Application รับข้อมูล"]
        })
      ]),
      section("multiplex-demultiplex", source, "8–17", "Multiplexing and Demultiplexing", "ในภาพหน้า 9 ช่องสีเหลืองคือ Socket และวงรีคือ Process ให้ดูทิศลูกศรเป็นหลัก หลาย Socket ส่งลง Transport คือ Multiplexing ส่วน Transport แยกข้อมูลขาเข้าขึ้น Socket ที่ตรงกันคือ Demultiplexing", [
        ["Multiplexing", "รวบการส่งจากหลาย Socket ลงชั้น IP โดยสร้าง Header ให้แต่ละ Segment เพื่อให้ฝั่งรับแยกได้"],
        ["Demultiplexing", "อ่านเลขใน Header แล้วตัดสินใจว่า Segment ขาเข้าควรไปยัง Socket ไหน รูปทางด่วนใช้ภาพรวมเลนและแยกทางออกให้จำทิศของงาน"]
      ], [
        example("http-to-firefox", [9, 10, 11, 12, 13], "ทำไมข้อความ HTTP ถึงไปถึง Firefox", "Apache HTTP server ส่งข้อความกลับหาเครื่อง Client ที่เปิด Firefox, Netflix และ Skype พร้อมกัน สไลด์ถามว่าเครื่องรับรู้ได้ยังไงว่า Firefox ควรได้ข้อความนี้", "ระบุข้อมูลที่ต้องใช้เลือก Socket และลำดับที่แกะ Header", [
          "Server ใส่ Transport header (Hₜ) หน้าข้อความ HTTP แล้ว IP ใส่ Network header (Hₙ) ครอบอีกชั้น",
          "ที่ Client, IP เปิด Hₙ แล้วส่ง Segment ขึ้น Transport ภาพหน้า 12–13 วาดทางเดียววิ่งเข้าจุดตัดสินใจ แล้วแยกขึ้นโปรแกรมหลายตัว",
          "Transport ใช้ข้อมูลใน Header และการจับคู่กับ Socket ของ Connection ที่ Firefox เปิดไว้ ข้อความ HTTP จึงไปถึง Process ที่รออยู่"
        ], "ข้อความไป Firefox เพราะตรงกับ Socket ของ Connection นั้น", {
          diagram: ["Apache สร้าง HTTP response", "Transport และ IP ครอบ Header", "Client นำ Segment ขึ้น Transport", "Socket ของ Firefox รับข้อความ"]
        }),
        example("roadway-analogy", [14, 15, 16, 17], "แยกทางออกกับรวมเลนในภาพทางด่วน", "ภาพหนึ่งมีป้ายแยกทางออกหลายทิศ อีกภาพมีรถจากหลายทางรวมสู่ถนนเดียวกัน", "จับคู่ภาพกับสองกระบวนการ และอธิบายว่าป้ายเทียบได้กับข้อมูลอะไร", [
          "หน้า 14 วาดทางออกหลายทิศ เหมือนฝั่งรับเลือกปลายทางที่เหมาะสมให้แต่ละ Segment",
          "หน้า 15–17 วาดหลายทางเข้าสู่ทางเดียว เหมือนฝั่งส่งรับข้อมูลจากหลาย Socket แล้วส่ง Segment ลง IP",
          "ป้ายช่วยตัดสินเส้นทางของรถคล้ายกับ Port และข้อมูล Header ที่ช่วย Transport เลือก Socket"
        ], "แยกออกหลาย Socket คือ Demultiplexing และรวบจากหลาย Socket คือ Multiplexing")
      ]),
      section("udp-sockets", source, "18–20", "Connectionless Demultiplexing", "ในตัวอย่าง UDP เครื่องรับมี Socket ที่ผูกกับ Port หนึ่งตัว เมื่อ IP ส่ง Datagram ขึ้นมา Transport จะอ่าน Destination port เพื่อเลือก Socket บนเครื่องที่ถูกเลือกโดย IP แล้ว", [
        ["Header ในรูปหน้า 18", "แถวแรกกว้าง 32 บิต แบ่ง Source port 16 บิต และ Destination port 16 บิต และยังมีส่วน Header อื่นก่อนถึง Payload หรือข้อมูลของแอป"],
        ["Destination IP และ Destination port", "ตอนสร้าง Datagram เพื่อส่ง ให้ระบุสองค่านี้ IP ใช้ปลายทางระดับเครื่อง ส่วน UDP ใช้ Port ปลายทางที่เครื่องนั้น"]
      ], [
        example("java-datagram-socket", [19], "ผูก DatagramSocket กับ Port 12534", "สไลด์ให้ตัวอย่างคำสั่ง Java สร้าง DatagramSocket พร้อมเลข Port ของเครื่องที่จะรันโค้ด", "อธิบายว่าเลข 12534 เป็นของฝั่งไหนและบรรทัดนี้สร้างอะไร", [
          "Constructor รับ 12534 เป็น Local port ซึ่งเป็นหมายเลขบนเครื่องที่รันคำสั่ง",
          "Java สร้าง UDP Socket และผูกกับ Local port นี้ เมื่อโปรแกรมเรียกอ่าน Datagram ที่มาถึงเครื่องด้วย Destination port 12534 ก็จะอ่านผ่าน Socket ที่ผูกไว้",
          "หากจะส่ง Datagram ให้ระบุ Destination IP และ Destination port ใน Datagram ของปลายทางเพิ่ม ขั้นสร้าง Socket ยังไม่ได้รับหรือส่งข้อความ"
        ], "ได้ UDP Socket ชื่อ mySocket1 ที่ผูกกับ Port 12534 หาก Port ว่างและผูกได้", {
          codePrompt: "DatagramSocket mySocket1 = new DatagramSocket(12534);",
          codeLanguage: "java"
        }),
        example("udp-four-arrows", [20], "เติม Port ให้ UDP Datagram A, B, C, D", "รูปให้ Socket ของ P3, P1 และ P4 ผูกกับ Port 9157, 6428 และ 5775 ตามลำดับ A และ B มีเฉลยบนภาพ ส่วนลูกศร C วิ่งจาก P4 ไป P1 และ D วิ่งจาก P1 ไป P4", "เติม Source port และ Destination port ของ C กับ D แล้วหา Datagram ที่เข้า Socket เดียวกัน", [
          "อ่านลูกศรจาก Socket ที่ส่งไปยัง Socket ที่รับ A จาก P3 ไป P1 จึงเป็น 9157 → 6428 ส่วน B ย้อนเป็น 6428 → 9157",
          "C จาก P4 ไป P1 จึงเป็น 5775 → 6428 ส่วน D จาก P1 ไป P4 เป็น 6428 → 5775",
          "socket(AF_INET, SOCK_DGRAM) สร้าง UDP Socket ในตัวอย่าง IPv4 และ bind ใช้ IP ของเครื่องกับ Port ในตารางเพื่อผูก Socket โค้ดส่วนนี้เตรียมจุดรับส่ง แต่ยังไม่ส่ง Datagram",
          "ที่เครื่อง P1 Datagram A และ C มี Destination port 6428 ตรงกัน จึงส่งเข้าที่ Socket ของ P1 ทั้งคู่"
        ], "C = 5775 → 6428 และ D = 6428 → 5775 โดย A กับ C ถึง P1", {
          table: {
            headers: ["Datagram", "ทิศ", "Source port", "Destination port"],
            rows: [
              ["A", "P3 → P1", "9157", "6428"],
              ["B", "P1 → P3", "6428", "9157"],
              ["C", "P4 → P1", "5775", "6428"],
              ["D", "P1 → P4", "6428", "5775"]
            ]
          },
          code: "from socket import AF_INET, SOCK_DGRAM, socket\n\n# ตัวอย่างฝั่ง P1\nmy_socket = socket(AF_INET, SOCK_DGRAM)\nmy_socket.bind((myaddr, 6428))",
          codeLanguage: "python",
          note: "หน้า PDF 20 เขียน bind(myaddr, 6428) แบบสองอาร์กิวเมนต์ ตัวอย่างในกล่องใช้รูปแบบ Python จริง คือส่ง (IP, port) เป็น Tuple อาร์กิวเมนต์เดียว โดยสมมติว่า myaddr เป็น IP ของเครื่อง P1 ที่ผูกได้และ Port 6428 ยังว่าง"
        })
      ]),
      section("tcp-sockets", source, "21–23", "Connection-oriented Demultiplexing", "TCP แยก Socket ของ Connection ที่เปิดแล้วด้วย 4-tuple คือชุด Source IP, Source port, Destination IP และ Destination port ให้เขียนตัวเลขครบสี่ช่องก่อนเทียบ เพราะดูเฉพาะ Port 80 แล้วตัวอย่างในสไลด์จะเหมือนกันหมด", [
        ["TCP server", "เครื่องเดียวรองรับ Connection พร้อมกันได้หลายตัว แม้ทั้งหมดเริ่มจาก Port บริการเดียวกัน แต่ละ Connection มี Socket ที่จดจำ 4-tuple ของตัวเอง"],
        ["ขอบเขตของตัวอย่าง UDP", "เทียบที่เครื่องปลายทางและ Local IP เดียวกัน ใช้ Socket UDP ที่ไม่ได้จำคู่สื่อสารล่วงหน้า จึงสาธิตการแยกด้วย Destination port ส่วนการรวบและแยกข้อมูลลักษณะนี้พบได้ในหลายชั้นของเครือข่าย"]
      ], [
        example("apache-four-tuples", [21, 22, 23], "Apache Port 80 รับจากสาม Connection", "เครื่อง Server B มี Apache ที่ Port 80 เครื่อง A ส่งจาก Port 9157 และเครื่อง C ส่งจากสอง Port คือ 5775 กับ 9157", "ตามเส้นในรูปว่าข้อมูลขาเข้าไปถึง Socket ของ P4, P5 หรือ P6 และหาที่อยู่กับ Port ของ Segment ตอบกลับไป A", [
          "เขียนปลายทางของสามทางขาเข้าเป็น B:80 เหมือนกัน แล้วแยกทาง A:9157 ออกจาก C:9157 ด้วย Source IP",
          "ภายในเครื่อง C แยก C:5775 กับ C:9157 ด้วย Source port จากลูกศรในรูป เส้น C:9157 เข้า P5 และ C:5775 เข้า P6",
          "เมื่อ Server ตอบ A ให้อ่านตามทิศของ Segment ใหม่ ต้นทางกลายเป็น B:80 และปลายทางเป็น A:9157"
        ], "A:9157 → P4, C:9157 → P5, C:5775 → P6 และทางตอบไป A คือ B:80 → A:9157", {
          table: {
            headers: ["Source IP:port", "Destination IP:port", "Socket ในรูป"],
            rows: [
              ["A:9157", "B:80", "P4"],
              ["C:9157", "B:80", "P5"],
              ["C:5775", "B:80", "P6"]
            ]
          }
        })
      ])
    ],
    exercises: [
      quiz("q1", source, [4, 5, 6, 10, 11], "เครื่องกับโปรแกรมเป็นคนละปลายทาง", "เครื่องเรียนเปิดแอปรายงานกับเบราว์เซอร์พร้อมกัน เมื่อคำตอบ HTTP มาถึง เครื่องต้องอาศัยข้อมูลระดับใดเพื่อส่งให้ Socket ของเบราว์เซอร์?", [
        "Destination IP เพียงค่าเดียว",
        "ข้อมูล Transport header ประกอบกับการจับคู่ Socket ของ Connection",
        "ชื่อโปรแกรมที่อยู่ในข้อความ HTTP เสมอ",
        "ความยาวของ Payload เท่านั้น"
      ], 1, [
        "IP พา Datagram มาถึงเครื่องก่อน เครื่องนั้นมีโปรแกรมได้หลายตัว จึงใช้ Destination IP อย่างเดียวแบบข้อ ก แยกแอปบนเครื่องเดียวกันไม่ได้",
        "Transport ทำ Demultiplexing ด้วยข้อมูลที่อยู่และ Port ของ Connection จึงเลือก Socket ของเบราว์เซอร์ได้ตามข้อ ข",
        "ชื่อโปรแกรมในข้อความและขนาด Payload ในข้อ ค กับ ง ไม่ใช่ตัวระบุ Socket ที่ Transport ใช้จับคู่"
      ]),
      quiz("q2", source, [9, 12, 13, 15, 16, 17], "หลาย Socket ส่งลงทางเดียว", "เครื่องเดียวส่ง Segment จาก Socket ของแชตและเบราว์เซอร์ลง IP พร้อมกัน กระบวนการที่ฝั่งส่งทำคืออะไร?", [
        "Demultiplexing เพราะมีหลายแอป",
        "Flow control เพราะมีแอปสองตัว",
        "Multiplexing เพราะรวมทางส่งจากหลาย Socket ลง Transport/IP",
        "Congestion control เพราะข้อมูลใช้สายเดียวกัน"
      ], 2, [
        "หาทิศลูกศรก่อน ข้อมูลมาจากหลาย Socket แล้วลงชั้น IP ผ่าน Transport ซึ่งตรงกับ Multiplexing ในข้อ ค",
        "Demultiplexing ในข้อ ก เกิดตอนแยก Segment ขาเข้าให้ Socket",
        "Flow control ในข้อ ข คุมข้อมูลตามพื้นที่รับ ส่วน Congestion control ในข้อ ง คุมตามความแออัดของเครือข่าย โจทย์ไม่ได้ให้ข้อมูลคิวรับหรือความแออัด"
      ]),
      quiz("q3", source, [18, 19, 20], "อ่าน Local port จากโค้ด UDP", "ที่เครื่อง B สมมติว่า Local IP ผูกได้และ Port ว่าง โค้ดนี้เตรียม Socket ไว้รับ Datagram ที่ Local port ใด และฝั่งส่งควรกำหนดเลขนั้นในช่องใด?", [
        "Local port 4700 และใส่ 4700 ใน Destination port",
        "Local port 4700 และใส่ 4700 ใน Source port",
        "Local port เท่ากับ Port ของผู้ส่ง และ Destination port เป็นเลขใดก็ได้",
        "ระบบเลือก Local port ใหม่ทุก Datagram เพราะใช้ UDP"
      ], 0, [
        "bind รับ Tuple (local_ip, 4700) จึงผูก Socket ฝั่ง B กับ Port 4700",
        "จากฝั่งผู้ส่ง B คือปลายทาง เลข 4700 จึงต้องอยู่ใน Destination port ตามข้อ ก",
        "ข้อ ข สลับฝั่งของ Port ข้อ ค เข้าใจว่า Port ผู้ส่งต้องตรงกับ Port ผู้รับ และข้อ ง สับสนระหว่างการส่งแบบไม่มี Handshake กับการผูก Local port ซึ่งมีอยู่แล้ว"
      ], {
        codePrompt: "from socket import AF_INET, SOCK_DGRAM, socket\n\nreceiver = socket(AF_INET, SOCK_DGRAM)\nreceiver.bind((local_ip, 4700))",
        codeLanguage: "python"
      }),
      quiz("q4", source, [19, 20, 21, 22, 23], "เปลี่ยนต้นทางแต่ใช้ปลายทางเดิม", "B มี UDP Socket ที่ B:5300 ตัวเดียวและไม่ได้เชื่อมกับ Peer ล่วงหน้า ขาเข้าจาก A:8100 และ C:8100 มาที่ B:5300 แล้วลองเทียบกับ TCP สอง Connection ที่ใช้คู่ที่อยู่และ Port ชุดเดียวกัน ผลเป็นอย่างไร?", [
        "UDP เข้า 2 Socket และ TCP เข้า 1 Socket",
        "ทั้ง UDP และ TCP เข้า Socket เดียวกัน เพราะ Source port เหมือนกัน",
        "ทั้ง UDP และ TCP เข้า 2 Socket เพราะ Source IP ต่างกัน",
        "UDP เข้า Socket เดียวกัน ส่วน TCP แยก Connection ได้สอง Socket"
      ], 3, [
        "ทั้งสอง Datagram ของ UDP อยู่บน B และมี Destination port 5300 จึงเข้า Socket เดียวตามแบบของสไลด์",
        "TCP มี 4-tuple สองชุดที่ต่างกันตรง Source IP (A กับ C) จึงเลือก Socket แยกกันตามข้อ ง",
        "ข้อ ก สลับบทบาทของ UDP/TCP ข้อ ข มองแต่ Source port ส่วนข้อ ค นำกฎ 4-tuple ไปใช้กับ UDP Socket ตามโจทย์"
      ]),
      quiz("q5", source, [21, 22], "กลับทิศ 4-tuple ของคำตอบ", "Client X:52810 เปิด TCP Connection ไปยัง Server Y:8080 ถ้า Server ตอบกลับด้วย Connection เดิม ค่า Source และ Destination ของ Segment ขากลับคืออะไร?", [
        "Source X:52810 และ Destination Y:8080",
        "Source Y:8080 และ Destination X:52810",
        "Source Y:52810 และ Destination X:8080",
        "Source Y:8080 และ Destination X:8080"
      ], 1, [
        "ขาเข้า Server คือ X:52810 → Y:8080",
        "ขากลับ Server เป็นผู้ส่ง ให้สลับทั้ง IP และ Port เป็นคู่ จะได้ Y:8080 → X:52810 ตรงกับข้อ ข",
        "ข้อ ก ยังเป็นขาเดิม ข้อ ค สลับ IP โดยทิ้ง Port ไว้ที่ตำแหน่งเดิม ส่วนข้อ ง นำ Port บริการของ Server ไปใช้แทน Port ของ Client"
      ])
    ],
    checklist: [
      "วาด Header ที่เพิ่มตอนส่งและบอกได้ว่า IP ส่ง Payload ขึ้น Transport ตอนไหน",
      "อธิบายจากรูปทางด่วนได้ว่าภาพไหนคือ Multiplexing และภาพไหนคือ Demultiplexing",
      "เติม Port ของ C และ D หน้า PDF 20 จากทิศลูกศร และชี้ Datagram สองตัวที่เข้า Socket เดียวกัน",
      "เขียน TCP 4-tuple ของ Apache ครบสามเส้นและสลับคู่ IP:port สำหรับขาตอบกลับได้",
      "อ่านค่า Local port จาก DatagramSocket หรือ bind แล้วบอกได้ว่าผู้ส่งต้องใส่เลขนั้นในช่องใด"
    ]
  });
})();
