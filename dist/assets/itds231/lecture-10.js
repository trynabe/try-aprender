(() => {
  const { addChapter, section, example, quiz } = window.ComputerNetwork;
  const source = "control-plane";

  addChapter({
    number: 10,
    title: "Network Layer: Control Plane",
    thaiTitle: "ชั้นเครือข่าย การเลือกเส้นทางและการจัดการเครือข่าย",
    summary: "ลองคิดจากฝั่งคนวางเส้นทาง เริ่มที่ Router คำนวณเองกับ SDN แล้วตามเส้นทางภายในและข้าม Autonomous System ด้วย OSPF และ BGP ต่อด้วยการปรับกฎเมื่อ Link ล่ม การไล่ Hop ด้วย ICMP และการอ่านสถานะอุปกรณ์จาก SNMP",
    goals: [
      "ระบุว่าอุปกรณ์ใดคำนวณเส้นทางใน Per-Router Control Plane และใน SDN",
      "ไล่การหาเส้นทางข้าม AS ตั้งแต่ eBGP, iBGP จนถึงพอร์ตขาออกที่ IGP คำนวณ",
      "คำนวณ Link Cost ของแต่ละเส้นทาง และแยก Hot Potato Routing จากขั้นเลือก AS-PATH",
      "อธิบายทิศทาง OpenFlow Message เมื่อ Link ล่ม แล้วตามผลต่อ Flow Table",
      "อ่าน ICMP Type/Code ใน UDP Traceroute และเลือก SNMP Message หรือ MIB Counter จากสถานการณ์"
    ],
    confusions: [
      "iBGP กระจายข้อมูลเส้นทางของ BGP ภายใน AS ส่วน Intra-AS Routing แบบ OSPF คำนวณเส้นทางภายในวงไปยัง Next Hop",
      "AS-PATH นับเส้นทางระดับ AS ส่วน OSPF Cost วัดเส้นทางระดับลิงก์ภายใน AS",
      "SDN รวมวิธีมองและสั่งงานในเชิงตรรกะ ส่วนตัว Controller อาจรันกระจายกันหลายเครื่อง",
      "ICMP Time Exceeded ใน UDP Traceroute ระบุ Hop กลางทาง ส่วน Destination Port Unreachable ใช้เป็นสัญญาณว่าถึง Host ปลายทางแล้ว"
    ],
    sources: [[source, 1, 76]],
    sections: [
      section("control-plane", source, "1–17", "Control Plane และ Routing Protocols",
        "เส้นทางจากเครื่องต้นทางไปปลายทางอาจผ่าน Mobile Network, Enterprise Network, ISP และ Datacenter คำว่าเส้นทางดีในภาพขึ้นอยู่กับเกณฑ์ที่ใช้ เช่น Cost ต่ำ เวลาน้อย หรือความแออัดต่ำ Routing Protocol คือกติกาแลกข้อมูลที่ใช้ตัดสินเส้นทางเหล่านี้",
        [
          ["ภาพเปิดบท (หน้า 2–6)", "Data Plane ส่งแพ็กเก็ตทีละตัวตามตาราง Control Plane วางเส้นทางและเตรียมตาราง แบบดั้งเดิมให้ Router คำนวณเส้นทางเองจากข้อมูลที่แลกกัน แบบ Software-Defined Networking (SDN) ใช้ Controller และให้ Control Agent รับกฎไปใช้"],
          ["ภาพ Control Plane (หน้า 7–10)", "การแบ่ง Internet ออกเป็น Autonomous System (AS) หรือกลุ่มเครือข่ายที่บริหารภายใต้นโยบายร่วมกัน ช่วยลดขนาดตารางและให้องค์กรเลือกนโยบายเอง Gateway Router อยู่ขอบ AS ที่เชื่อมไปเครือข่ายอื่น"],
          ["แผนที่โปรโตคอล (หน้า 10–12)", "OSPF หาเส้นทางภายใน AS ส่วน BGP ใช้ข้อมูลการเข้าถึงข้าม AS ตัวอย่าง SDN เชื่อม Controller กับ Switch โดยใช้ OpenFlow และยก OpenDaylight (ODL) กับ ONOS เป็น Controller ส่วน ICMP ใช้ส่งข้อมูลควบคุม และ SNMP ใช้จัดการอุปกรณ์"],
          ["มุมมองเครือข่าย (หน้า 6, 13–17)", "Per-Router บอกว่าการคำนวณกระจายอยู่หลาย Router แต่ปริมาณข้อมูลที่แต่ละตัวรู้ขึ้นกับอัลกอริทึม เช่น Link State มีแผนผังภายในขอบเขตของตนเอง Controller ของ SDN มีมุมมองร่วมในส่วนที่ควบคุม"]
        ], [
          example("router-anatomy", [2, 3, 4, 5, 6, 13, 14, 15, 16, 17], "อ่านภาพตารางส่งต่อของ Router",
            "ภาพหน้า 3 วาดแพ็กเก็ตที่หัวมี 0111 เข้าพอร์ต 1 แล้วออกพอร์ต 2 หน้า 4–6 และ 13–16 เปรียบเทียบวิธีสร้างตาราง",
            "ระบุว่าใครสร้างตารางและใครส่งแพ็กเก็ตในสถาปัตยกรรมทั้งสองแบบ",
            [
              "ตามลูกศรของแพ็กเก็ตที่เข้าพอร์ต 1 Data Plane เทียบกฎในเครื่องแล้วส่งพอร์ต 2",
              "ใน Per-Router ส่วน Routing Algorithm ของแต่ละ Router แลกข้อมูลกับตัวอื่น แล้วคำนวณตารางของเครื่องตน",
              "ใน SDN Controller ใช้ข้อมูลเครือข่ายคำนวณแล้วส่งกฎลงมาที่ Control Agent ของอุปกรณ์ Data Plane ใช้ตารางที่ได้รับในเครื่อง"
            ],
            "ทั้งสองวิธีส่งต่อแพ็กเก็ตที่อุปกรณ์ ส่วนที่คำนวณและติดตั้งกฎอยู่คนละตำแหน่ง", {
              note: "ตารางภาพหน้า 6 ใช้คำว่า Router รู้เพียงบางส่วนเพื่อสื่อแนวทางแลกข้อมูล แต่ Link-State Router ในหน้า 24–25 รู้ Topology ภายในขอบเขตที่เผยแพร่ได้"
            })
        ]),
      section("ospf", source, "18–25", "Autonomous Systems และ Intra-AS Routing",
        "Internet เป็นเครือข่ายของหลายองค์กร แต่ละ AS จัดเส้นทางภายในได้เอง Intra-AS Routing หาเส้นทางภายใน ส่วน Inter-AS Routing บอกว่าปลายทางข้างนอกออกทางใด Router ใช้ข้อมูลจากทั้งคู่เมื่อส่งแพ็กเก็ตไปนอก AS",
        [
          ["Interior Gateway Protocol (IGP)", "ชื่อรวมของโปรโตคอลหาเส้นทางภายใน AS ในหน้า 23 มี RIP (Routing Information Protocol) ที่แลก Distance Vector ทุก 30 วินาทีตามตัวอย่าง, EIGRP ที่ใช้แนวคิด Distance Vector และ OSPF (Open Shortest Path First) ที่ใช้ Link State"],
          ["Distance Vector (DV)", "Vector คือชุดค่าระยะทางที่ Router ประเมินไว้สำหรับแต่ละปลายทาง Router รับค่าจากเพื่อนบ้านแล้วเทียบค่าลิงก์ถึงเพื่อนบ้านบวกค่าที่เพื่อนบ้านประกาศ ส่วน Link State แจ้งสถานะลิงก์ให้ Router สร้างแผนผังแล้วคำนวณเอง"],
          ["OSPF (หน้า 24)", "ส่ง Link-State Advertisement (LSA) โดยตรงใน IP แต่ละ Router สร้าง Link-State Database ตามขอบเขตที่เกี่ยวข้อง แล้วใช้ Dijkstra หาเส้นทาง Cost รวมต่ำสุด Cost เป็นค่าที่ใช้ตัดสินตามการตั้งค่าและนโยบาย การยืนยันข้อความขึ้นอยู่กับวิธี Authentication ที่ตั้งไว้"],
          ["OSPF Areas (หน้า 25)", "Backbone คือ Area 0 ส่วน Area Border Router (ABR) เชื่อม Area กับ Backbone และประกาศการเข้าถึงวงอื่น Internal Router ใช้รายละเอียดลิงก์ใน Area ตน ส่วน AS Boundary Router (ASBR) ทำหน้าที่เกี่ยวกับเส้นทางภายนอก AS"],
          ["ขอบเขตเอกสาร", "แผนการสอน ITDS231-2026s1-Syllabus-26July2026.pdf หน้า 3 ระบุ Routing Algorithms, Distance Vector, Broadcast และ Multicast ใน Lecture 10 ไฟล์ Chapter_5_rev3.pdf หน้า 23 กล่าวถึง Distance Vector ผ่าน RIP/EIGRP หน้า 48–50 เทียบข้อจำกัดของ LS/DV ส่วน Broadcast/Multicast ไม่มีสไลด์เฉพาะในไฟล์นี้"]
        ], [
          example("which-egress", [19, 20, 21, 22], "Router ใน AS1 ควรออกเกตเวย์ใด",
            "หน้า 22 ให้ Router ภายใน AS1 รับแพ็กเก็ตที่ปลายทางอยู่นอก AS1 ในภาพทางออกไป AS2 อยู่ที่ 1b และทางออกไป AS3 อยู่ที่ 1c",
            "ระบุข้อมูลที่ต้องรู้ก่อนเลือกทางออก",
            [
              "ดูว่า Prefix ปลายทางมี Gateway ใดประกาศว่าเข้าถึงได้ เช่น เรียนผ่าน AS2 หรือผ่าน AS3",
              "กระจายข้อมูลการเข้าถึงและทางออกที่เลือกให้ Router ภายใน AS1",
              "ใช้ Intra-AS Routing หาพอร์ตขาออกที่จะไปถึง Gateway Router นั้นในท้องถิ่น"
            ],
            "ตัวรูปให้ทางออก 1b และ 1c แต่โจทย์ยังต้องรู้ Prefix ปลายทางกับนโยบายของ AS1 จึงจะเลือก Gateway ตัวเดียวได้"),
          example("ospf-areas", [24, 25], "ตาม Link-State Information ข้าม OSPF Area",
            "ภาพมี Area 1, 2, 3 และ Backbone พร้อมป้ายกำกับ Internal Router, ABR, Backbone Router และ Boundary Router",
            "อธิบายสิ่งที่ Router ใน Area 1 รู้เมื่อจะส่งไปยังปลายทางใน Area 3",
            [
              "Internal Router รู้ลิงก์ใน Area 1 จากการ Flood LSA ในขอบเขตนั้นและคำนวณเส้นทางภายในด้วย Dijkstra",
              "ABR เชื่อม Area กับ Backbone และแลกหรือสรุปข้อมูล Prefix ที่เข้าถึงได้ระหว่าง Area",
              "เมื่อจะออก Area 1 ให้ส่งผ่าน ABR ตามข้อมูลเส้นทางข้าม Area Router ภายในวงจึงไม่ต้องพก Topology รายลิงก์ของทุก Area"
            ],
            "ภาพใช้ลำดับ Local Router → ABR → Backbone → Area ปลายทาง เพื่อให้เครือข่ายขยายได้")
        ]),
      section("bgp", source, "26–41", "Border Gateway Protocol, Policy และ Next Hop",
        "Border Gateway Protocol (BGP) แจ้งว่า Network Prefix ใดเข้าถึงได้และเส้นทางผ่าน AS ใดบ้าง เราเรียกว่า Path Vector เพราะ Advertisement พก AS-PATH มาด้วย ผู้ดูแลมีนโยบายเลือกว่าจะรับ ประกาศต่อ หรือใช้เส้นทางใด",
        [
          ["eBGP และ iBGP (หน้า 27–30)", "eBGP แลก Reachability ระหว่าง Peer คนละ AS ส่วน iBGP แลกข้อมูล BGP ภายใน AS เดียวกัน Gateway Router มักเข้าร่วมได้ทั้งคู่ BGP Peer สื่อสารผ่าน TCP Session"],
          ["BGP UPDATE (หน้า 31–32)", "Advertisement มี Destination Prefix และ Path Attributes เช่น AS-PATH ซึ่งเป็นลำดับ AS ที่ผ่าน และ NEXT_HOP ซึ่งชี้ที่อยู่ถัดไปที่ต้องส่งหา ใช้ Import Policy รับหรือกรองเส้นทาง และ Export Policy กำหนดว่าใครจะเห็นเส้นทางนี้"],
          ["เลือกรูตตามหน้า 40", "พิจารณา Local Preference ที่เกิดจากนโยบายก่อน ตามด้วยความยาว AS-PATH แคบลงอีกด้วย Cost ถึง BGP Next Hop (Hot Potato) และเกณฑ์อื่นตามลำดับที่สไลด์สรุป"],
          ["ทำไมแยก Intra-AS และ Inter-AS (หน้า 41)", "ภายในองค์กรปรับเพื่อประสิทธิภาพได้ตามเกณฑ์ร่วมกัน ข้ามองค์กรต้องคำนึงถึงนโยบายและข้อตกลง การแบ่งเป็น AS ช่วยจำกัดตารางและข้อมูลอัปเดต"]
        ], [
          example("bgp-messages", [30, 31], "อ่านชนิดข้อความใน BGP Session",
            "สไลด์แยกข้อความ BGP สี่แบบระหว่าง Peer ที่สื่อสารผ่าน TCP",
            "จับคู่หน้าที่ตั้ง Session ประกาศหรือถอนทาง รายงานสถานะ และแจ้งเหตุผิดพลาด",
            [
              "หลัง TCP เชื่อมต่อแล้ว ทั้งคู่ส่ง BGP OPEN เพื่อแลกพารามิเตอร์ของ Session เช่น AS และ Hold Time แล้วใช้ KEEPALIVE ตอบรับ OPEN ที่ยอมรับได้",
              "UPDATE ใช้ประกาศ Prefix/Path ใหม่และถอนข้อมูลเดิม KEEPALIVE ช่วยคง Session เมื่อไม่มี UPDATE",
              "NOTIFICATION รายงานข้อผิดพลาดหรือเหตุปิด Session"
            ],
            "TCP Connection มาก่อน BGP OPEN แล้วจึงแลกข้อมูล Routing ด้วย UPDATE", {
              note: "หน้า 31 เขียน RFC 4371 และอธิบายว่า OPEN เปิด TCP สำหรับ BGP-4 ใช้ RFC 4271 §4.2 ซึ่งกำหนดให้ส่ง OPEN หลัง TCP Connection ตั้งเสร็จ",
              references: [["RFC 4271 §4.2 · OPEN Message Format", "https://www.rfc-editor.org/rfc/rfc4271.html#section-4.2"]]
            }),
          example("bgp-path", [30, 32, 33, 34], "ตาม Advertisement ของ Prefix X จาก AS3",
            "Prefix X อยู่ที่ AS3 Router 3a มี eBGP ไป 2c ใน AS2 และไป 1c ใน AS1 นโยบายตัวอย่างยอมให้ AS2 ประกาศเส้นทางต่อจาก 2a",
            "ไล่ข้อความที่ AS1 ได้ทั้งทางตรงและผ่าน AS2 แล้วเลือกผลตามรูป",
            [
              "3a ประกาศ AS3,X ไป 2c ผ่าน eBGP 2c รับแล้วกระจายให้ Router ใน AS2 ผ่าน iBGP",
              "2a ประกาศต่อให้ 1c ทาง eBGP และเติม AS2 ที่ต้น AS-PATH 1c จึงเห็น AS2,AS3,X",
              "1c ยังได้ AS3,X จาก 3a โดยตรง ตามนโยบายตัวอย่างเลือก AS3,X แล้วกระจายภายใน AS1 ผ่าน iBGP"
            ],
            "AS1 เห็นสองเส้นทางไป X และเลือกทางตรงผ่าน AS3 ตามนโยบายในรูป", {
              diagram: ["3a ประกาศ AS3,X", "2c รับด้วย eBGP", "2a เรียนผ่าน iBGP", "1c รับ AS2,AS3,X"]
            }),
          example("next-hop-reachability", [34, 35, 36], "เติม Forwarding Table ของ 1d กับ 1a",
            "1c แจ้งทางไป X ภายใน AS1 ส่วน OSPF ในภาพให้ 1d ไป 1c ออก Interface 1 และให้ 1a ไป 1c ออก Interface 2",
            "หาว่า 1d กับ 1a จะส่ง Datagram ไป X จากพอร์ตใด",
            [
              "ใช้ BGP เลือกทางออกไป X ในภาพทางออกอยู่ที่ 1c",
              "ใช้ Intra-AS Routing ค้นเส้นทางไปยัง 1c แยกกันใน Router ผู้ส่งแต่ละตัว",
              "เติม Entry ของ X ด้วยขาออกที่มุ่งไปทาง Gateway ตามผล OSPF"
            ],
            "1d ใช้ Interface 1 ส่วน 1a ใช้ Interface 2 เพื่อมุ่งไป Gateway 1c เดียวกัน", {
              note: "ใช้ 1c เป็น Next Hop ภายใน AS ตามแบบย่อในสไลด์ วิธีประกาศ NEXT_HOP จริงขึ้นกับการตั้งค่าและการ Reach เส้นทาง Next Hop"
            }),
          example("hot-potato", [37, 40], "เลือกเกตเวย์ใกล้ที่สุดแบบ Hot Potato",
            "ที่ 2d ทางไป 2a มี OSPF Cost 201 และทางไป 2c มี Cost 263 ทั้งคู่มีทางไป X แต่ทางผ่าน 2a มี AS-PATH ยาวกว่า",
            "ถ้าพิจารณาเฉพาะขั้น Hot Potato ของรูป จะส่งออกที่ใด",
            [
              "อ่าน Cost ภายใน AS2 จาก 2d ไปยัง Gateway แต่ละตัว ได้แก่ 201 ถึง 2a และ 263 ถึง 2c ลิงก์ 112 ในรูปเชื่อม 2b กับ 2c",
              "Hot Potato เลือกทางออกที่ใช้ Cost ภายในน้อยกว่า 201 < 263 จึงเลือก 2a",
              "ถ้าทำตามลำดับหน้า 40 ทุกขั้น ต้องผ่านการเปรียบเทียบ Local Preference และ AS-PATH ก่อน จึงค่อยใช้ Cost ภายในตัดสิน"
            ],
            "คำตอบเฉพาะเกณฑ์ Hot Potato ในรูปคือ 2a", {
              note: "หน้า 37 แสดงเกณฑ์เดียวเพื่อสอนเรื่อง Cost ภายในเท่านั้น ถ้าใช้เกณฑ์หน้า 40 ครบและ Local Preference เท่ากัน ทางผ่าน 2c มี AS-PATH สั้นกว่าจึงชนะตั้งแต่ขั้นก่อน Hot Potato"
            }),
          example("isp-policy", [38], "ผู้ให้บริการ B จำกัดการส่ง Transit",
            "A ประกาศเส้นทาง A,w ไปทั้ง B และ C ส่วน w เป็นลูกค้าของ A ตัวอย่างให้ B รับส่ง Traffic ไปมาระหว่างฝ่ายที่เกี่ยวกับลูกค้าตน",
            "อธิบายว่า C เห็นและใช้ทางไป w อย่างไร",
            [
              "B เรียนรู้ทางไป w ผ่าน A แต่การนำ Traffic จาก C ข้าม B ไป A และ w จะเป็น Transit ที่ไม่ได้เกี่ยวกับลูกค้าของ B ในรูป",
              "B จึงไม่ประกาศ B,A,w ให้ C ตาม Export Policy",
              "C ยังมีประกาศ A,w จาก A โดยตรง จึงส่งไปทาง C → A → w"
            ],
            "C ใช้เส้นทางผ่าน A และ B ควบคุม Transit ได้ด้วยการจำกัด Advertisement"),
          example("dual-homed", [39], "ลูกค้า Dual-Homed x กำหนดว่าใครผ่านได้",
            "x เชื่อมต่อกับผู้ให้บริการ B และ C พร้อมกัน เป้าหมายคือไม่ให้ Traffic จาก B ไป C เดินผ่าน x",
            "เลือก Advertisement ที่ x ควรส่งหรือระงับ",
            [
              "คำว่า Dual-Homed คือเชื่อมกับผู้ให้บริการสองราย x ยังประกาศ Prefix ของตนเพื่อให้ทั้งสองรายเข้าถึงได้",
              "ถ้าประกาศทางไป C ให้ B, B อาจมอง x เป็นทางไป C",
              "จึงจำกัดการประกาศไป B ให้รวมทางที่ x ตั้งใจรับเท่านั้นและระงับทางไป C"
            ],
            "x ไม่ประกาศเส้นทางไป C ให้ B จึงไม่เสนอทาง B → x → C ผ่าน BGP ในตัวอย่าง")
        ]),
      section("traffic-engineering", source, "42–50", "Traffic Engineering และเหตุผลที่ใช้ SDN",
        "Traffic Engineering คือการกำหนดให้ Traffic ใช้เส้นทางตามเป้าหมาย เช่น กระจายโหลดหรือใช้คนละทางตามชนิดงาน ในโมเดล Shortest Path ของรูปแต่ละลิงก์มี Weight และ Router เลือกตาม Cost ถึงปลายทาง การแก้ Weight กระทบการเลือกของ Traffic อื่นได้ด้วย",
        [
          ["สถาปัตยกรรมเดิม (หน้า 43–45)", "Router รวมฮาร์ดแวร์ส่งต่อและซอฟต์แวร์ Routing ไว้ด้วยกัน และอาจใช้ Middlebox แยกตามหน้าที่ เช่น NAT กับ Load Balancer ภาพ SDN ย้ายการคำนวณกฎเครือข่ายไปที่ Controller"],
          ["เหตุผลที่รวมเชิงตรรกะ (หน้า 46–47)", "เมื่อโปรแกรมหนึ่งมองเครือข่ายได้ทั้งส่วนที่ควบคุม ก็เขียนกฎและกระจายจาก Controller ได้ตรงนโยบาย สไลด์เทียบกับการแยกแอป ระบบปฏิบัติการ และฮาร์ดแวร์ด้วย Open Interface ใน PC"],
          ["ขอบเขตตัวอย่าง (หน้า 48–50)", "ภาพใช้ Destination-Based Forwarding กับเส้นทาง Cost ต่ำสุดแบบธรรมดา การตั้งกฎแบบหลายฟิลด์ให้เลือกตาม Flow จึงแก้กรณีที่เป้าหมายละเอียดกว่าปลายทาง"]
        ], [
          example("route-preference", [48], "เปลี่ยนทางจาก u–x–y–z ให้เป็น u–v–w–z",
            "ภาพให้ Weight ของเส้น u–x = 1, x–y = 1, y–z = 2, u–v = 2, v–w = 3 และ w–z = 5",
            "อธิบายว่าทำไม Router เลือกทางล่าง และทำอย่างไรให้ทางบนถูกเลือก",
            [
              "คิด Cost เส้นทางเดิม u → x → y → z ได้ 1 + 1 + 2 = 4",
              "ทางที่ต้องการ u → v → w → z มี Cost 2 + 3 + 5 = 10 จึงแพ้เกณฑ์ Shortest Path เดิม",
              "ปรับ Weight ให้ Cost รวมของทางบนต่ำกว่าทางเลือกทั้งหมดแล้วปล่อยให้คำนวณใหม่ หรือใช้วิธีกำหนดเส้นทางที่ละเอียดกว่าการอาศัย Weight อย่างเดียว"
            ],
            "ภายใต้ Weight เดิมทางล่างถูกเลือก หากยังใช้ Shortest Path ต้องเปลี่ยนความสัมพันธ์ของ Cost หรือใช้กลไกควบคุมอื่น"),
          example("split-load", [49], "แบ่งโหลดให้ใช้ทั้งทางบนและล่าง",
            "ใช้กราฟเดิม ต้องการส่ง Traffic จาก u ไป z ทั้งผ่าน u–v–w–z และ u–x–y–z",
            "ระบุว่าเงื่อนไขเดิมสามารถใช้สองทางพร้อมกันได้หรือไม่",
            [
              "ในรูปสองทางมี Cost 10 กับ 4 ต่างกัน ตารางส่งต่อแบบเส้นเดียวให้ปลายทาง z มี Next Hop เพียงตัวที่ชนะ",
              "การเปลี่ยน Next Hop ไปทางบนยังส่งทุกแพ็กเก็ตตามกฎเดียวกัน",
              "การแบ่งโหลดตามโจทย์ต้องใช้ความสามารถหลายเส้นทางหรือ Flow Rules ที่แยกกลุ่ม Traffic ได้"
            ],
            "โมเดลในสไลด์ส่งเพียงทาง Cost 4 การกระจายบนสองทางตามโจทย์ต้องเพิ่มนโยบายส่งต่อ", {
              note: "หน้า 49 กล่าวถึงแบบจำลองที่มีทางเดียวหรือ Cost ต่างกัน อุปกรณ์ที่รองรับ Equal-Cost Multi-Path (ECMP) สามารถใช้หลายทางที่มี Cost เท่ากันตามกลไกของระบบได้"
            }),
          example("red-blue", [50], "ส่ง Flow สีแดงกับสีฟ้าคนละทางที่ w",
            "สีแดงเดินผ่าน v → w ไป z โดยตรง ส่วนสีฟ้ามาจาก x → w แล้วตั้งใจให้ไป y → z ตามลูกศรในสไลด์",
            "บอกข้อจำกัดของการดูเพียง Destination และอธิบายวิธีแยกสอง Flow",
            [
              "ทั้งสอง Flow มีปลายทาง z เดียวกัน ที่ w ทางตรง Cost 5 ส่วนทาง w → y → z Cost 1 + 2 = 3",
              "Destination-Based Forwarding เห็นปลายทางเดียวกันจึงใช้กฎเดียว หากต้องการให้แดงไปทางตรงและฟ้าไปทาง y ต้องใช้ข้อมูลเพิ่ม",
              "Controller ใช้ Match + Action เทียบฟิลด์ที่แยกกลุ่มได้ เช่น Ingress Port จาก v หรือ x แล้วลงกฎขาออกที่ต่างกัน"
            ],
            "Generalized Forwarding แยก Flow ได้แม้ปลายทาง IP เหมือนกัน เมื่อมีฟิลด์ให้จับคู่และอุปกรณ์รองรับ")
        ]),
      section("openflow-control", source, "51–58", "SDN Controller, APIs และ OpenFlow Messages",
        "ในภาพมีสามชั้น Data-Plane Switch ใช้ Flow Table ส่งแพ็กเก็ต SDN Controller เก็บสถานะเครือข่ายแล้วคุมอุปกรณ์ และ Network-Control Apps ใช้บริการของ Controller เพื่อเขียนนโยบาย Routing, Access Control หรือ Load Balancing",
        [
          ["Northbound API (หน้า 53–55)", "อินเทอร์เฟซของ Controller ให้แอปเข้าถึงข้อมูลและบริการ เช่น Network Graph, REST API และ Intent หรือคำอธิบายผลที่ต้องการระดับสูง"],
          ["State Management (หน้า 53–55)", "ฐานข้อมูลกระจายเก็บ Link State, Switch, Host, Statistics และ Flow Tables การกระจายช่วยเรื่องความทนทาน ประสิทธิภาพ และการขยายระบบ"],
          ["Southbound API (หน้า 52–56)", "Controller ใช้อินเทอร์เฟซด้านล่างติดต่อสวิตช์ เช่น OpenFlow ส่วนโปรโตคอล OpenFlow รับส่งข้อความระหว่าง Controller กับ Switch ผ่าน TCP มีการรองรับการเข้ารหัสตามการนำไปใช้ และมีข้อความสามทิศทางสำหรับคำสั่ง การแจ้งเหตุ และข้อความที่ทั้งสองส่งได้"]
        ], [
          example("openflow-messages", [56, 57, 58], "แยก Packet-In, Packet-Out และการแก้ Flow Entry",
            "ตารางสไลด์แบ่งข้อความ OpenFlow ตามฝั่งผู้เริ่มส่ง Controller อาจสั่งงาน ส่วนสวิตช์อาจรายงานเมื่อเกิดเหตุ",
            "เลือกข้อความให้ตรงกับผู้ส่งและสิ่งที่เกิดขึ้น",
            [
              "จาก Controller ใช้ Features เพื่อสอบถามความสามารถ Configure เพื่ออ่านหรือตั้งพารามิเตอร์ และ Modify-State เพื่อเพิ่ม ลบ หรือแก้ Flow Entries",
              "Packet-Out คือ Controller สั่งให้ส่ง Packet ที่พอร์ตของสวิตช์ ส่วน Packet-In มาจากสวิตช์เพื่อส่ง Packet/ข้อมูลให้ Controller ตัดสิน",
              "Flow-Removed บอกว่า Flow Entry ถูกลบ ส่วน Port Status แจ้งว่าพอร์ตเปลี่ยนสถานะ ข้อความสองแบบนี้มาจากสวิตช์"
            ],
            "อ่านชื่อข้อความพร้อมทิศทาง Controller → Switch หรือ Switch → Controller ก่อนสรุปหน้าที่", {
              table: {
                headers: ["ทิศทาง", "ข้อความในภาพ", "ใช้ทำอะไร"],
                rows: [
                  ["Controller → Switch", "Features / Configure", "สอบถามความสามารถและตั้งค่า"],
                  ["Controller → Switch", "Modify-State / Packet-Out", "แก้กฎหรือสั่งให้ส่งแพ็กเก็ต"],
                  ["Switch → Controller", "Packet-In", "ส่งแพ็กเก็ตขึ้น Controller"],
                  ["Switch → Controller", "Flow-Removed / Port Status", "แจ้งกฎถูกลบหรือพอร์ตเปลี่ยนสถานะ"]
                ]
              }
            })
        ]),
      section("sdn-cases", source, "59–65", "SDN Link Failure, ONOS และ ORION",
        "SDN ใช้เหตุการณ์จากอุปกรณ์เพื่อคำนวณตารางใหม่ เมื่อ Link ล่ม สวิตช์แจ้งสถานะ Controller อัปเดตภาพเครือข่าย แล้วแอป Routing คำนวณเส้นทางก่อนส่งกฎไปให้สวิตช์ที่เกี่ยวข้อง",
        [
          ["ONOS (หน้า 61)", "Open Network Operating System เป็นตัวอย่าง SDN Controller ที่แยก Network Apps จาก Distributed Core ใช้ REST/Intent ฝั่ง Northbound ส่วนฝั่ง Southbound รองรับโปรโตคอลอย่าง OpenFlow, NETCONF และ OVSDB"],
          ["Google ORION (หน้า 62–63)", "กรณีในสไลด์ใช้ ORION เป็น Control Plane ให้ Jupiter Datacenter และ B4 WAN ของ Google โครงส่วนกลางเก็บสถานะ มีแอป Routing และ Traffic Engineering อยู่ด้านบน ใช้ Publish/Subscribe ใน Core และ OpenFlow สำหรับการสื่อสารและติดตามสวิตช์"],
          ["ความท้าทาย (หน้า 64–65)", "ระบบที่กระจายต้องทนเมื่อ Controller หรือ Link ขาด มีการรักษาความปลอดภัยและรองรับการเติบโต WAN หลาย AS ยังต้องคุยนโยบายข้ามองค์กร ส่วนแนวคิดให้ Controller ปรับอัตราส่งตามความแออัดในหน้า 65 เป็นโจทย์ชวนคิด"]
        ], [
          example("link-failure", [59, 60], "คำนวณเส้นทางใหม่หลัง Link ของ s1 ล่ม",
            "รูปมีสวิตช์ s1–s4 และ Dijkstra Link-State Routing App ที่ลงทะเบียนให้เรียกเมื่อสถานะลิงก์เปลี่ยน",
            "ไล่เหตุการณ์หกขั้นจากพอร์ตเปลี่ยนสถานะถึงตารางใหม่ลงสวิตช์",
            [
              "s1 ส่ง OpenFlow Port Status แจ้ง Controller",
              "Controller อัปเดต Link State ในฐานข้อมูล",
              "Controller เรียก Routing App ที่รอเหตุการณ์เปลี่ยนสถานะ",
              "แอปอ่าน Network Graph กับ Link State แล้วใช้ Dijkstra หาทางใหม่",
              "แอปส่งผลให้ส่วนคำนวณตาราง Flow ของ Controller สร้าง Entry ที่จำเป็น",
              "Controller ติดตั้ง Flow Tables ที่เปลี่ยนให้สวิตช์ที่เกี่ยวข้องผ่าน OpenFlow"
            ],
            "เส้นทางใหม่มีผลตอนสวิตช์ได้รับและใช้ Flow Entries ที่ Controller ส่งลงมา", {
              diagram: ["s1 แจ้ง Port Status", "Controller อัปเดต Link State", "Routing App คำนวณ", "Controller ลง Flow Table"]
            }),
          example("controller-cases", [61, 62, 63, 64, 65], "อ่านตำแหน่ง Routing และนโยบายใน ONOS/ORION",
            "ภาพ ONOS มี Network Apps, Distributed Core และ Southbound Protocols ส่วน ORION แสดงแอปกับ Core แยกกันในเครือข่าย Google",
            "แยกว่าใครเก็บสถานะ ใครตัดสินนโยบาย และใครติดตั้งกฎ",
            [
              "ใน ONOS แอประบุ Intent ว่าต้องการผลแบบใด Core มีข้อมูล Devices, Hosts, Links, Paths และ Flow Rules สำหรับคำนวณและลงกฎ",
              "ใน ORION แอป Routing กับ Traffic Engineering ใช้ Orion Core กรณีในสไลด์ยังใช้ Flow Control ที่ขอบเครือข่ายเพื่อให้ได้ระดับบริการตามข้อตกลง (SLA)",
              "อุปกรณ์รับกฎปลายทางจาก Controller ความเชื่อถือได้ของข้อมูลใน Core และการกระจาย Configuration จึงสำคัญต่อระบบทั้งคู่"
            ],
            "ทั้งสองภาพแยกการนิยามนโยบายออกจากสถานะระบบร่วมและการสื่อสารกับอุปกรณ์")
        ]),
      section("icmp", source, "66–68", "Internet Control Message Protocol และ Traceroute",
        "ICMP (Internet Control Message Protocol) ถูกห่อใน IP Datagram ใช้รายงานเหตุในเครือข่ายหรือทดสอบการเข้าถึง เช่น Echo Request/Echo Reply ของ ping เวลาแกะข้อความให้ดู Type ก่อน แล้วใช้ Code ระบุรายละเอียดย่อย",
        [
          ["คู่ที่ต้องจำ", "Echo Request คือ Type 8 Code 0, Echo Reply คือ Type 0 Code 0, TTL หมดระหว่างทางคือ Type 11 Code 0 และ Destination Port Unreachable คือ Type 3 Code 3"],
          ["ข้อมูลที่แนบเมื่อรายงาน Error", "รูปแบบดั้งเดิมตาม RFC 792 ใส่ IP Header เดิมกับ 8 ไบต์แรกของ Payload เพื่อให้ต้นทางจับคู่กับแพ็กเก็ตเดิม หน้า 67 ย่อข้อความจนเหมือนนับ 8 ไบต์จาก Header"],
          ["RTT และเลขอ้างอิง", "Round-Trip Time (RTT) คือเวลาจากส่ง Probe จนได้รับข้อความตอบ หน้า PDF 67–68 ใช้เลขท้ายสไลด์ 4-67 และ 4-68 เช่นเดียวกับบางสไลด์ที่นำกลับมาใช้ในหน้า 44–45 บทนี้อ้างอิงลำดับหน้าไฟล์ PDF"]
        ], [
          example("icmp-codes", [67], "อ่าน Type และ Code จากตาราง ICMPv4",
            "ตารางหน้า 67 ยกทั้ง Echo, Destination Unreachable, TTL Expired และข้อความที่เกี่ยวกับ Router",
            "แปลความหมายของตัวเลขโดยดูทั้ง Type และ Code",
            [
              "Type 3 เป็น Destination Unreachable โดย Code 0, 1, 2, 3 ชี้ Network, Host, Protocol และ Port ตามลำดับ ส่วน Code 6 และ 7 ระบุ Network และ Host Unknown",
              "Type 8/0 คือ Echo Request และ Type 0/0 คือ Echo Reply ทั้งคู่ใช้ใน ping ส่วน Type 11/0 หมายถึง TTL หมดก่อนถึงปลายทาง",
              "Type 9/0 คือ Router Advertisement และ Type 10/0 คือ Router Solicitation ที่ใช้ค้นหา Router ตาม RFC 1256 ส่วน Type 12/0 คือ Parameter Problem ใน Header",
              "Type 4/0 คือ Source Quench ที่เคยใช้แจ้งความแออัดและเลิกใช้แล้วตามสไลด์"
            ],
            "ต้องอ่านคู่ Type/Code เช่น 3/3 คือ Port Unreachable ส่วน 11/0 คือ TTL Expired", {
              note: "หน้า 67 ใช้คำว่า Router Discovery กว้าง ๆ ในแถว Type 10 ชื่อข้อความเฉพาะคือ Router Solicitation",
              references: [["RFC 792 · ICMP Message Formats", "https://www.rfc-editor.org/rfc/rfc792.html"], ["RFC 1256 §5 · Router Discovery Messages", "https://www.rfc-editor.org/rfc/rfc1256.html#section-5"]]
            }),
          example("traceroute-udp", [68], "ไล่ Hop ใน UDP Traceroute ด้วย TTL",
            "สไลด์ส่ง UDP Probe ครั้งละ 3 แพ็กเก็ตโดยเพิ่ม TTL เป็น 1, 2, 3 และใช้พอร์ตที่ไม่มีโปรแกรมรับที่ปลายทาง",
            "บอกว่าใครตอบในแต่ละช่วง วัดค่าใด และหยุดเมื่อไร",
            [
              "ชุดแรก TTL = 1 จะหมดที่ Router ตัวแรก ตัวนั้นทิ้งแพ็กเก็ตและแจ้ง ICMP Type 11 Code 0 ต้นทางใช้ IP ผู้ตอบกับ RTT ของ Probe เป็นข้อมูล Hop แรก",
              "ชุด TTL = 2 ข้าม Router แรกแล้วหมดที่ Router ตัวที่สอง ทำซ้ำด้วย TTL ที่เพิ่มขึ้นเพื่อหา Hop ถัดไป",
              "เมื่อ Probe ถึงปลายทาง UDP พอร์ตนั้นไม่มีบริการ Destination Host ตอบ ICMP Type 3 Code 3 แล้ว Traceroute แบบในสไลด์หยุด"
            ],
            "11/0 ใช้ระบุ Router กลางทางและ 3/3 ใช้ระบุว่าถึง Host สำหรับ UDP Probe ในตัวอย่าง", {
              note: "สไลด์วาดสาม Probe ต่อ TTL แต่ไม่ให้ตัวเลข RTT จริง เครื่องมือที่เลือก ICMP Echo หรือ TCP Probe ใช้เงื่อนไขปลายทางต่างจากกรณี UDP นี้"
            })
        ]),
      section("snmp", source, "69–76", "Network Management, SNMP และ MIB",
        "Network Management คือการติดตาม ทดสอบ และตั้งค่าระบบหลายอุปกรณ์ ผู้ดูแลใช้ Managing Server ติดต่อ Agent ใน Managed Device เพื่ออ่านสถานะ ตัวนับ หรือปรับค่าที่อุปกรณ์อนุญาต",
        [
          ["CLI (หน้า 72)", "Command Line Interface ให้ผู้ดูแลพิมพ์คำสั่งหรือส่งสคริปต์ตรงไปแต่ละเครื่อง เช่น ผ่าน SSH ซึ่งเป็นช่องทางเข้าถึงแบบเข้ารหัส"],
          ["SNMP และ MIB", "Simple Network Management Protocol รับส่งข้อมูลจัดการ ส่วน Management Information Base (MIB) นิยามรายการข้อมูลที่ Agent จัดการ แต่ละตัวแปรมี Object Identifier (OID) และชนิดข้อมูลตาม Structure of Management Information (SMI)"],
          ["NETCONF/YANG", "YANG เป็นภาษานิยามโครงสร้างข้อมูล ส่วน NETCONF ใช้แลกและเปลี่ยน Configuration ของอุปกรณ์ที่รองรับ เหมาะกับการจัดการหลายอุปกรณ์ตามแบบจำลอง"],
          ["Polling และ Trap", "Polling คือ Manager ขอข้อมูลแล้ว Agent ตอบ ส่วน Trap คือ Agent แจ้งเหตุโดยเริ่มส่งเอง เช่น สถานะลิงก์เปลี่ยน"]
        ], [
          example("snmp-messages", [71, 72, 73, 74, 75], "อ่าน SNMP Request, Response และ Trap",
            "สไลด์แสดงรูป Agent แลกข้อความกับ Manager มีตารางชนิด Message แล้วตามด้วยภาพ Header ของ Get/Set และ Trap",
            "เลือกข้อความให้ตรงกับทิศทางและอ่านฟิลด์สำคัญ",
            [
              "Manager ส่ง GetRequest เพื่ออ่าน OID ที่ระบุ GetNextRequest เพื่อไล่ OID ถัดไป GetBulkRequest เพื่อขอข้อมูลหลายรายการ หรือ SetRequest เพื่อแก้ค่าที่เขียนได้",
              "Agent ใช้ Response ตอบคำขอ โดย Request ID ในภาพ Get/Set ใช้จับคู่คำขอกับคำตอบ Error Status/Index ระบุปัญหา และ Name/Value คือคู่ตัวแปร",
              "Trap เริ่มจาก Agent โดยไม่รอ Request ภาพ SNMPv1 Trap มี Enterprise, Agent Address, Generic Trap Type, Specific Code, Timestamp และข้อมูลตัวแปร"
            ],
            "Manager คุมการอ่านและตั้งค่า ส่วน Agent ส่ง Response หรือแจ้งเหตุเองด้วย Trap", {
              note: "หน้า 74 รวม GetBulkRequest ของ SNMPv2 ส่วนหน้า 75 วาดรูปแบบ SNMPv1 โดย RFC 1157 ระบุ Generic Trap Type 0–6 ภาพเขียน 0–7",
              references: [["RFC 1157 §4.1.6 · SNMPv1 Trap-PDU", "https://www.rfc-editor.org/rfc/rfc1157.html#section-4.1.6"], ["RFC 3416 §4.2.3 · GetBulkRequest-PDU", "https://www.rfc-editor.org/rfc/rfc3416.html#section-4.2.3"]]
            }),
          example("udp-mib", [76], "อ่านตาราง UDP MIB จาก OID",
            "ตารางตัวอย่างให้ OID 1.3.6.1.2.1.7.1 ถึง .5 สำหรับ UDP Datagrams และ Listener Table",
            "หา OID ที่เหมาะกับการวัด UDP ที่ถึงเครื่องแต่ไม่มีแอปฟังพอร์ตนั้น พร้อมแยก Error อื่น",
            [
              "ใช้ udpNoPorts ลงท้าย .2 เมื่อ UDP Datagram ส่งต่อให้แอปไม่ได้เพราะไม่มีแอปที่พอร์ตปลายทาง",
              "อ่าน udpInErrors ลงท้าย .3 สำหรับความผิดพลาดการรับประเภทอื่น ตัวนับ .1 และ .4 วัดที่ส่งถึงแอปแล้วและที่ส่งออกตามลำดับ",
              "ถ้าต้องการข้อมูลรายการ Endpoint ต้องดูตาราง เช่น udpTable แบบเก่าที่สไลด์ให้ไว้ ตัวนับเป็นยอดสะสม เมื่อต้องการจำนวนในช่วงเวลาหนึ่งให้หาผลต่างและคำนึงถึงการ Reset"
            ],
            "เลือก udpNoPorts = 1.3.6.1.2.1.7.2 สำหรับกรณีไม่มีแอปที่พอร์ต", {
              table: {
                headers: ["OID", "ชื่อ", "ชนิด", "ความหมาย"],
                rows: [
                  ["1.3.6.1.2.1.7.1", "udpInDatagrams", "Counter32", "Datagram ที่ส่งถึงแอปรับ"],
                  ["1.3.6.1.2.1.7.2", "udpNoPorts", "Counter32", "ไม่มีแอปที่พอร์ตปลายทาง"],
                  ["1.3.6.1.2.1.7.3", "udpInErrors", "Counter32", "ส่งให้แอปรับไม่ได้เพราะเหตุอื่น"],
                  ["1.3.6.1.2.1.7.4", "udpOutDatagrams", "Counter32", "Datagram ที่ UDP ส่งออก"],
                  ["1.3.6.1.2.1.7.5", "udpTable", "SEQUENCE", "ตารางตัวรับ IPv4 แบบเก่า"]
                ]
              },
              note: "หน้า 76 พิมพ์ UDInErrors ให้ยึดชื่อ udpInErrors จาก RFC 4113 ตาราง udpTable เป็นตัวอย่างแบบเก่าที่ RFC นี้ระบุว่า deprecated",
              references: [["RFC 4113 · UDP MIB", "https://www.rfc-editor.org/rfc/rfc4113.html"]]
            })
        ])
    ],
    exercises: [
      quiz("q1", source, [23, 24], "อัปเดต Distance Vector จากเพื่อนบ้าน",
        "Router R มีค่าลิงก์ถึง A = 3 และถึง B = 1 เมื่อ A ประกาศ Cost ถึง X = 2 และ B ประกาศ Cost ถึง X = 6 โดยมีเพียงสอง Next Hop นี้ R จะเลือกอะไร",
        ["ผ่าน A ด้วย Cost 5", "ผ่าน B ด้วย Cost 7", "ผ่าน A ด้วย Cost 2", "ผ่าน B ด้วย Cost 1"], 0,
        [
          "กฎ Distance Vector สำหรับปลายทาง X เปรียบเทียบ Cost จากเราถึงเพื่อนบ้านบวก Cost ที่เพื่อนบ้านประกาศถึง X",
          "ผ่าน A ใช้ 3 + 2 = 5 ส่วนผ่าน B ใช้ 1 + 6 = 7 เลือก A เพราะ Cost รวมต่ำกว่า",
          "ข คิด Cost ของ B ถูกแต่ 7 แพ้ 5 ค นับเฉพาะ Cost ที่ A ประกาศ ง ละ Cost จาก B ถึง X"
        ]),
      quiz("q2", source, [32, 37, 40], "เทียบ Local Preference, AS-PATH และ Cost ภายใน",
        "Prefix เดียวกันมีทาง R1 ที่ Local Preference 200, AS-PATH 4 AS, Cost ถึง NEXT_HOP 32 กับทาง R2 ที่ Local Preference 100, AS-PATH 1 AS, Cost ถึง NEXT_HOP 3 สมมติว่าทั้งสองเส้นทางใช้ได้ เลือกอะไรตามลำดับหน้า 40",
        ["R2 เพราะ Cost ภายในต่ำกว่า", "R2 เพราะ AS-PATH สั้นกว่า", "R1 เพราะ Local Preference สูงกว่า", "ต้องหยุดเพราะเกณฑ์ทั้งสามเลือกคนละทาง"], 2,
        [
          "ตรวจเกณฑ์ทีละขั้น เริ่มที่ Local Preference ซึ่งกำหนดจากนโยบาย",
          "R1 ได้ 200 สูงกว่า R2 ที่ได้ 100 จึงชนะที่เกณฑ์แรก",
          "ก และ ข ลัดไปเกณฑ์ที่ใช้เมื่อขั้นก่อนหน้าเสมอกัน ส่วน ง มองเกณฑ์เป็นการโหวตพร้อมกัน ทั้งที่มีลำดับชัดเจน"
        ]),
      quiz("q3", source, [56, 57, 58, 59, 60], "สวิตช์แจ้ง Controller ว่าพอร์ตล่ม",
        "S4 พบว่าพอร์ตที่ใช้ไป S2 เปลี่ยนเป็น Down ตาม OpenFlow ในสไลด์ ข้อความแรกที่แจ้งเหตุนี้แก่ Controller คือข้อใด",
        ["Packet-Out จาก S4", "Port Status จาก S4", "Modify-State จาก S4", "Packet-In จาก Controller"], 1,
        [
          "เหตุเริ่มที่พอร์ตของสวิตช์ จึงต้องหาข้อความที่ Switch เป็นผู้ส่ง",
          "Port Status รายงานการเปลี่ยนของพอร์ตโดยตรง หลังรับแล้ว Controller จึงอัปเดตสถานะและคำนวณใหม่",
          "ก และ ค เป็นหน้าที่ทาง Controller → Switch ส่วน ง กลับทิศของ Packet-In และชื่อข้อความนี้ใช้ส่งข้อมูล Packet ขึ้น Controller"
        ]),
      quiz("q4", source, [67, 68], "แพ็กเก็ตตอบกลับจาก Router ตัวที่สอง",
        "ใน UDP Traceroute มี Router สามตัวก่อนถึง Server ทุกตัวส่ง ICMP ตามภาพ Probe ที่เริ่ม TTL = 2 ควรได้รับข้อความใดก่อน",
        ["Type 3 Code 3 จาก Server", "Type 8 Code 0 จาก Router ตัวที่สอง", "Type 11 Code 0 จาก Router ตัวแรก", "Type 11 Code 0 จาก Router ตัวที่สอง"], 3,
        [
          "Router ตัวแรกเห็น TTL 2 ลดเหลือ 1 และยังส่งต่อได้",
          "Router ตัวที่สองลด 1 จนหมด จึงทิ้ง Probe แล้วแจ้ง Time Exceeded Type 11 Code 0",
          "ก เกิดเมื่อ Probe ไปถึง Server ที่ไม่มี UDP Port เปิด ข เป็น Echo Request ของ ping ค จะได้ถ้าเริ่ม TTL = 1"
        ]),
      quiz("q5", source, [73, 74, 76], "เลือกวิธีอ่านตัวนับ UDP",
        "ผู้ดูแลต้องการอ่านยอด UDP Datagram ที่ถึงเครื่องแต่ไม่มีโปรแกรมฟังพอร์ตปลายทางหนึ่งค่า โดยใช้ OID ของ Instance นั้นโดยตรง คู่ Message กับตัวแปรใดตรงที่สุด",
        ["GetRequest กับ udpNoPorts", "GetRequest กับ udpInErrors", "SetRequest กับ udpNoPorts", "Trap กับ udpOutDatagrams"], 0,
        [
          "เงื่อนไขไม่มีแอปที่ Destination Port ชี้ไปที่ udpNoPorts ซึ่งเป็นคนละตัวนับกับ udpInErrors",
          "Manager ต้องการอ่าน OID หนึ่งค่าที่รู้ตำแหน่งแล้ว จึงส่ง GetRequest และรอ Response",
          "ข ใช้ Counter ของข้อผิดพลาดอื่น ค เป็นคำสั่งเขียน ง ใช้ข้อความแจ้งเหตุเองและตัวนับการส่งออก"
        ])
    ],
    checklist: [
      "อธิบายว่าทำไม Internet แบ่งเป็น AS และยกหน้าที่ Intra-AS, Inter-AS, eBGP กับ iBGP ได้ครบ",
      "เทียบข้อมูลที่ใช้ใน Distance Vector กับ Link State และคำนวณ Cost แบบบวกผ่านเพื่อนบ้านได้",
      "วาดเส้นทางประกาศ Prefix X จาก AS3 ผ่าน AS2 ถึง AS1 และหาพอร์ตไป Gateway ภายใน AS ได้",
      "บอกได้ว่าเมื่อใด Local Preference, AS-PATH หรือ Hot Potato เป็นเกณฑ์ตัดสิน",
      "ไล่เหตุการณ์จาก OpenFlow Port Status จนถึง Controller ลง Flow Table ใหม่ได้",
      "แยก ICMP 11/0 กับ 3/3 ใน UDP Traceroute และเลือก SNMP Get, Set หรือ Trap จากสถานการณ์ได้"
    ]
  });
})();
