(() => {
  const { addChapter, section, example, quiz } = window.ComputerNetwork;
  const trunkGuide = "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst2960/software/release/15-2_2_e/configuration/guide/b_1522e_2960_2960c_2960s_2960sf_2960p_cg/m_1522e_vlan_trunk_2960s_cg.html";

  addChapter({
    number: 8,
    title: "VLAN",
    thaiTitle: "แบ่งเครือข่ายด้วย VLAN และทบทวน Data Link Layer",
    summary: "ลองตามเฟรมจากเครื่องต้นทางผ่าน access port และ trunk จนถึงเครื่องปลายทาง แล้วอ่านผลคำสั่งบนสวิตช์ให้รู้ว่าแต่ละพอร์ตอยู่ VLAN ไหน ท้ายบทมีโจทย์จาก Data Link Layer Tutorial ตั้งแต่ parity และ MAC จนถึงการไล่ ACK ของ Go-Back-N กับ Selective Repeat",
    sources: [["vlan", 1, 23], ["tutorial", 1, 5]],
    goals: [
      "อ่านรูปสวิตช์หลายตัวแล้วบอกได้ว่า broadcast เดินทางถึงเครื่องใดและ trunk ใช้ VLAN tag ตรงไหน",
      "สร้าง VLAN กำหนด access port และอ่านผลตรวจ trunk กับ voice VLAN จาก Cisco IOS",
      "คำนวณ parity กับขนาด window และไล่เลข ACK เมื่อเฟรมหายแบบ modulo"
    ],
    confusions: [
      "Default VLAN คือสมาชิกเริ่มต้นของพอร์ต ส่วน Native VLAN บอกว่าเฟรม untagged บน trunk จะถูกจัดเข้า VLAN ใด",
      "Administrative Mode คือค่าที่ตั้งไว้ ส่วน Operational Mode คือสถานะที่พอร์ตกำลังทำงานจริง",
      "ACK k แบบ cumulative ใน Tutorial ระบุเฟรมถัดไปที่รอ ส่วน ACK k แบบ individual ยืนยันเฟรม k โดยตรง"
    ],
    sections: [
      section("vlan-overview", "vlan", "1–5", "Overview of VLANs",
        "VLAN (Virtual Local Area Network) คือการแบ่งเครือข่ายระดับ Layer 2 ตามกลุ่มงานด้วยการตั้งค่าสวิตช์ เครื่องในทีมเดียวกันจึงอยู่ใน broadcast domain เดียวกันได้แม้อยู่คนละชั้นของตึก",
        [
          ["ขอบเขตเอกสาร", "ปกหน้า 1 ใช้ชื่อ Lecture 7: VLAN และท้ายสไลด์ระบุ Lecture 7 + Labs 7/8 ไฟล์นี้อยู่ในโฟลเดอร์ Lecture 8 จึงใช้ชื่อหัวข้อ VLAN ในบทนี้ หน้า 2 เป็นเงื่อนไขใช้สื่อ และหน้า 3 เป็นสารบัญ เอกสารที่มีเน้น VLAN และโจทย์ Data Link Layer ส่วน STP และ EtherChannel ตามแผนการสอนต้องใช้สไลด์เพิ่มเติม"],
          ["Broadcast domain", "วงที่เฟรม broadcast กระจายไปถึง เมื่อแบ่ง LAN เดิมเป็นหลาย VLAN แต่ละวงมีผู้รับน้อยลง และจำนวนวงโดยรวมเพิ่มขึ้น ข้อความ Small Broadcast Domains ในตารางหน้า 5 ควรอ่านในความหมายนี้"],
          ["Layer 2 และ Layer 3", "L2 switch จด MAC ต้นทางคู่กับพอร์ตขาเข้าใน VLAN นั้น แล้วดู MAC ปลายทางเพื่อเลือกพอร์ตส่งเฟรม ARP (Address Resolution Protocol) ใช้ถามหา MAC จาก IPv4 address ของเครื่องถัดไป โดยคำขอแบบ broadcast จะกระจายอยู่ใน VLAN เดียว การส่ง IP ข้าม VLAN จึงต้องอาศัย router หรือ Layer 3 switch"],
          ["ผลของการจัดกลุ่ม", "สวิตช์ตัวเดียวรองรับหลายทีมได้ ลดเฟรม broadcast ที่ไปถึงผู้ใช้คนอื่น และช่วยให้จัดการเครื่องที่ใช้แอปหรือทรัพยากรร่วมกันง่ายขึ้น"]
        ], [
          example("three-floors", [4], "ตึกสามชั้นกับ VLAN ของแต่ละแผนก",
            "แต่ละชั้นมีเครื่องของ IT, HR และ Sales ต่อกับสวิตช์ประจำชั้น รูปจับทั้งสามแผนกแยกตาม VLAN และ IP subnet",
            "ระบุว่าเครื่องกลุ่มใดอยู่ broadcast domain เดียวกัน และจะเกิดอะไรขึ้นเมื่อเครื่อง IT ส่ง broadcast",
            [
              "ไล่ตามคอลัมน์แผนกในรูป VLAN 2 เป็น IT, VLAN 3 เป็น HR และ VLAN 4 เป็น Sales",
              "สมมติว่าลิงก์ระหว่างสวิตช์ตั้งให้ส่ง VLAN เหล่านี้ได้ เฟรม broadcast จาก IT จึงเดินข้ามชั้นภายใน VLAN 2",
              "จับคู่ subnet ตามรูป IT ใช้ 10.0.2.0/24, HR ใช้ 10.0.3.0/24 และ Sales ใช้ 10.0.4.0/24 ถ้า IT ต้องคุยกับ HR ด้วย IP ให้ส่งผ่าน gateway ที่ทำ inter-VLAN routing"
            ],
            "มีสาม broadcast domain ตามสาม VLAN และขอบเขต VLAN 2 ครอบคลุมเครื่อง IT ทั้งสามชั้น"),
          example("faculty-students-guests", [5], "แยก Faculty, Students และ Guests บนสวิตช์ชุดเดียว",
            "PC1–PC6 กระจายอยู่สองฝั่ง รูปใช้ VLAN 10 กับ Faculty, VLAN 20 กับ Students และ VLAN 30 กับ Guests",
            "จับคู่เครื่องปลายทางใน VLAN เดียวกันและตรวจว่า subnet ตรงกับกลุ่มใด",
            [
              "อ่านชื่อ VLAN ก่อน PC1 กับ PC4 อยู่ VLAN 10, PC2 กับ PC5 อยู่ VLAN 20 และ PC3 กับ PC6 อยู่ VLAN 30",
              "คู่ Faculty ใช้ 172.17.10.0/24 คู่ Students ใช้ 172.17.20.0/24 ส่วนคู่ Guests ใช้ 172.17.30.0/24 ตามตัวอย่างที่สอดคล้องกันในหน้า 8 และ 20",
              "สมมติว่า trunk ส่ง VLAN ที่เกี่ยวข้องได้ เครื่องในกลุ่มเดียวกันส่งเฟรมข้ามสวิตช์ได้ ส่วน broadcast ของแต่ละกลุ่มมีขอบเขตอยู่ใน VLAN นั้น"
            ],
            "PC1 ↔ PC4, PC2 ↔ PC5 และ PC3 ↔ PC6 เป็นสามคู่ที่อยู่ VLAN เดียวกัน",
            { note: "ในรูปหน้า PDF 5 ป้าย PC3 ระบุ VLAN 30 แต่ IP เป็น 172.17.20.23/24 ตัวอย่างนี้ยึด 172.17.30.23/24 ตามภาพหน้า 8 และ 20 ถ้าใช้เลขที่แสดงในหน้า 5 ตามตัวอักษร PC3 จะมี subnet ผิดจากแผน VLAN 30" })
        ]),
      section("vlan-types", "vlan", "6–7", "Types of VLANs",
        "แยกชนิด VLAN ตามหน้าที่ พอร์ตหลังเปิดใช้ใหม่เข้ากลุ่มเริ่มต้นได้ ส่วนลิงก์ trunk ต้องมีกติกาเฉพาะสำหรับเฟรมที่มาถึงแบบไม่มี tag",
        [
          ["Default VLAN", "กลุ่มเริ่มต้นที่พอร์ต access ถูกผูกไว้ ในสวิตช์ Cisco ของสไลด์คือ VLAN 1 ซึ่งลบหรือเปลี่ยนชื่อไม่ได้"],
          ["Data VLAN", "กลุ่มข้อมูลผู้ใช้ เช่น เว็บหรืออีเมล พอร์ต access หนึ่งพอร์ตผูกกับ data VLAN หนึ่งตัว"],
          ["Native VLAN", "ค่าใช้กับ trunk 802.1Q โดยค่าเริ่มต้นเฟรมของ VLAN นี้วิ่งแบบ untagged และปลายรับจัดเฟรม untagged เข้า VLAN นี้ สองฝั่งจึงต้องตกลงเลขเดียวกัน"],
          ["Management VLAN", "กลุ่มทราฟฟิกดูแลอุปกรณ์ เช่น SSH บน L2 switch มักมี SVI (Switched Virtual Interface) เป็นอินเทอร์เฟซเสมือนที่ถือ IP สำหรับเข้าบริหาร การย้ายหน้าที่เหล่านี้ออกจาก VLAN 1 ทำได้ตามการออกแบบ"]
        ], [
          example("default-vlan-output", [6], "อ่าน show vlan brief ก่อนเริ่มตั้งค่า",
            "ภาพ CLI แสดง VLAN 1 ชื่อ default สถานะ active พร้อม Fa0/1–24 และ Gi0/1–2 ด้านล่างมี VLAN 1002–1005 เป็นรายการเดิมที่ระบบจองไว้",
            "หา VLAN ของ Fa0/18 จากผลคำสั่ง",
            [
              "ส่งคำสั่ง show vlan brief ใน privileged EXEC mode เพื่อขอตาราง VLAN และพอร์ตสมาชิกแบบย่อ",
              "ไล่คอลัมน์ Ports จนถึง Fa0/18 จะพบว่ายังอยู่ในแถว VLAN 1",
              "แถว 1002–1005 เป็น VLAN ดั้งเดิมที่ระบบสร้างไว้ ตรวจชนิดและสถานะของ Fa0/18 แบบเจาะจงด้วย show interfaces fa0/18 switchport เมื่อต้องการดู voice หรือ trunk mode"
            ],
            "Fa0/18 เป็นสมาชิก VLAN 1 ในภาพนี้",
            { codePrompt: "show vlan brief" })
        ]),
      section("multi-switch", "vlan", "8–12", "VLANs in a Multi-Switched Environment",
        "Trunk เป็นลิงก์ Layer 2 ระหว่างอุปกรณ์ที่ขนเฟรมได้หลาย VLAN บนสายเส้นเดียว เมื่อเฟรมใช้ tag ตาม IEEE 802.1Q สวิตช์ปลายรับจะอ่าน VLAN ID ก่อนหาพอร์ตที่จะส่งต่อ",
        [
          ["เส้นทางของเฟรม", "Access port ระบุต้นทางจาก VLAN ของพอร์ต ส่วน trunk แยก VLAN ด้วย tag หรือ native VLAN ตามการตั้งค่า สวิตช์ปลายทางจึงนำเฟรมกลับไปส่งออก access port ของ VLAN นั้นได้"],
          ["Frame Check Sequence (FCS)", "ค่าท้ายเฟรมใช้ตรวจความผิดพลาด การเพิ่มหรือตัด tag เปลี่ยนไบต์ที่ต้องใช้คำนวณ จึงต้องคำนวณ FCS ของเฟรมขาออกใหม่"],
          ["Voice VLAN และ CoS", "โทรศัพท์ VoIP แยกเฟรมเสียงกับเฟรมข้อมูลที่วิ่งผ่าน ใช้ CDP (Cisco Discovery Protocol) รับข้อมูล Voice VLAN จากสวิตช์ในรูป และใช้ CoS (Class of Service) เป็นค่าลำดับความสำคัญที่ Layer 2"]
        ], [
          example("faculty-on-trunks", [8], "ตามเฟรม VLAN 10 จาก PC1 ไป PC4",
            "PC1 อยู่บน S2 และ PC4 อยู่บน S3 ทั้งคู่เป็น Faculty VLAN 10 โดย S2 และ S3 เชื่อมผ่าน S1",
            "วาดเส้นทาง Layer 2 จากต้นทางถึงปลายทาง",
            [
              "S2 รับเฟรม PC1 ทาง access port F0/11 และจัดเฟรมเข้า VLAN 10",
              "เฟรมขึ้น trunk F0/1 ไป S1 แล้วออก trunk F0/3 ไป S3 โดยถือว่าทั้งสองลิงก์อนุญาต VLAN 10",
              "เมื่อถึง S3 เฟรมของ PC4 ลง access port F0/11 ใน VLAN 10 ตามรูป"
            ],
            "PC1 → S2 → S1 → S3 → PC4 ภายใน VLAN 10",
            { diagram: ["PC1 · VLAN 10", "S2 Fa0/11", "S1 · trunk", "S3 Fa0/11", "PC4 · VLAN 10"] }),
          example("single-broadcast-domain", [9], "ถ้าทั้งหกเครื่องอยู่ LAN เดียว",
            "รูปเปลี่ยน PC1–PC6 ให้ใช้ 172.17.40.21–26/24 บน Layer 2 เดียวกัน PC1 ส่ง local broadcast",
            "หา network address และไล่กลุ่มเครื่องที่รับ broadcast",
            [
              "Mask /24 คือ 255.255.255.0 จึงเก็บ 172.17.40 ไว้และตั้งส่วน host เป็นศูนย์ ได้ 172.17.40.0",
              "S2 ทำ flooding ออกพอร์ตอื่นที่อยู่ในวงเดียวกัน รวมถึงพอร์ตขึ้นไป S1 เมื่อ S1 ส่งต่อถึง S3 เครื่องฝั่งขวาก็อยู่ในวงเดียวกัน",
              "สมมติทุกลิงก์ในรูปอยู่ในสถานะ forwarding จึงไปถึง PC2–PC6 ภาพเน้นกล่อง Broadcast บน PC4–PC6 เพื่อให้เห็นการส่งข้ามสวิตช์"
            ],
            "Network address คือ 172.17.40.0/24 และ broadcast จาก PC1 ไปถึงอีกห้าเครื่องในโดเมนเดียวกัน",
            { note: "หน้า PDF 9 เหมารวม unicast ไว้กับ broadcast ตัวอย่างในภาพใช้ broadcast โดยตรง สำหรับ known unicast สวิตช์จะส่งตาม MAC table ไปยังพอร์ตปลายทางภายใน VLAN ส่วน unknown unicast จึงถูก flood" }),
          example("dot1q-frame", [10], "อ่านโครงเฟรมที่เพิ่ม 802.1Q tag",
            "รูปเปรียบเทียบ Ethernet frame เดิมกับเฟรมที่แทรก tag ตรงกลางหลัง Source MAC ก่อน Type/Length",
            "หาขนาด tag จำนวนค่าที่ VID เข้ารหัสได้ และเหตุผลที่ FCS ต้องเปลี่ยน",
            [
              "TPID (Tag Protocol Identifier) มี 16 บิตและใช้ค่า 0x8100 ในตัวอย่าง ช่อง priority มี 3 บิต ช่องที่รูปเรียก CFI มี 1 บิต และ VID มี 12 บิต",
              "รวม 16 + 3 + 1 + 12 = 32 บิต หรือ 4 ไบต์ VID มี 2¹² = 4,096 รูปแบบ ค่า 0 ใช้กับ priority tag และ 4095 เป็นค่าจอง ดังนั้นช่วง VLAN ID ปกติอยู่ที่ 1–4094 ก่อนพิจารณาค่าที่อุปกรณ์สงวนเพิ่ม",
              "เมื่อออก trunk แบบ tagged ให้เพิ่ม tag แล้วคำนวณ FCS ใหม่ เมื่อออกพอร์ต access ที่ส่ง untagged ให้ตัด tag และคำนวณ FCS ของเฟรมที่ส่งจริงอีกครั้ง"
            ],
            "Tag ยาว 4 ไบต์ ช่อง priority เก็บได้ 8 ระดับ และ VID ใช้ 12 บิต",
            {
              table: {
                headers: ["ฟิลด์ตามรูป", "ขนาด", "หน้าที่"],
                rows: [["TPID", "16 บิต", "ระบุชนิด tag"], ["User Priority (PCP)", "3 บิต", "ลำดับความสำคัญ"], ["CFI ในรูป", "1 บิต", "ชื่อที่ใช้กับฟิลด์รูปแบบเดิม"], ["VID", "12 บิต", "ระบุ VLAN"]]
              },
              note: "หน้า PDF 10 ตัดข้อความ User Priority ไว้หลังคำว่า supports จึงอาศัยจำนวน 3 บิตในรูปมาคำนวณระดับได้ การคำนวณ FCS หลังตัด tag จะได้ค่าเดิมเมื่อไบต์ที่นำมาคำนวณเหมือนกับเฟรมต้นฉบับ"
            }),
          example("voice-verification", [11, 12], "PC ผ่านโทรศัพท์ IP และการดูสอง VLAN บน Fa0/18",
            "ในรูป CDP บอกให้โทรศัพท์ tag เสียงเป็น VLAN 150 โทรศัพท์มีสวิตช์สามพอร์ตเชื่อมสวิตช์ภายนอก ตัวโทรศัพท์ และ PC5 เข้าด้วยกัน",
            "อ่าน CLI ว่าพอร์ตทำงานแบบใด และแยกข้อมูลของ PC ออกจากเสียงของโทรศัพท์",
            [
              "ใช้ชื่อพอร์ต Fa0/18 เป็นพารามิเตอร์ของคำสั่ง show interfaces เพื่อเรียกสถานะ switchport",
              "อ่าน Administrative Mode และ Operational Mode ทั้งคู่เป็น static access จากนั้นอ่าน Access Mode VLAN เป็น 20 และ Voice VLAN เป็น 150",
              "เมื่อ PC ส่งข้อมูลแบบ untagged สวิตช์จัดเข้า VLAN 20 ส่วนเสียงที่โทรศัพท์ส่งตามแบบในรูปมากับ tag VLAN 150 และตั้ง CoS ได้ตามนโยบาย"
            ],
            "Fa0/18 ทำงานเป็น access port โดยมี data VLAN 20 และ voice VLAN 150",
            {
              codePrompt: "show interfaces fa0/18 switchport",
              code: "Administrative Mode: static access\nOperational Mode: static access\nAccess Mode VLAN: 20 (student)\nVoice VLAN: 150 (voice)",
              note: "หน้า PDF 11 ขยาย CoS เป็น Cost of Service ในข้อความ แต่บรรทัดตารางและการใช้งานนี้หมายถึง Class of Service แถว access ในตารางกล่าวถึงหลายทางเลือก ตัวอย่างนี้ใช้กรณีข้อมูลจาก PC วิ่ง untagged"
            })
        ]),
      section("vlan-configuration", "vlan", "13–18", "VLAN Configuration",
        "ลำดับงานบน Cisco IOS คือเลือกเลข VLAN ที่อุปกรณ์รองรับ ตั้งชื่อ ผูกพอร์ต แล้วใช้คำสั่ง show ตรวจคนละระดับ ก่อนแก้หรือลบ VLAN ให้เช็กผลต่อพอร์ตสมาชิก",
        [
          ["Normal range", "VLAN 1–1005 ตามแบบ Catalyst ในสไลด์ เลข 1002–1005 เป็นรายการ legacy ที่ระบบจองไว้ สำหรับ normal range ตัวอย่างบันทึกฐานข้อมูลใน vlan.dat"],
          ["Extended range", "ตารางหน้า 13 พิมพ์ปลายช่วง 4095 คู่มือ Catalyst 2960 ระบุ VLAN ID ถึง 4094 วิธีจัดเก็บและการซิงก์ขึ้นกับรุ่น IOS และโหมดหรือเวอร์ชัน VTP (VLAN Trunking Protocol)"],
          ["โหมดคำสั่ง", "เริ่มจาก privileged EXEC เข้า global configuration ด้วย configure terminal กำหนด VLAN จาก global mode และตั้งค่าพอร์ตจาก interface configuration mode"]
        ], [
          example("vlan-ranges", [13], "ใช้ตารางช่วง VLAN เลือกหมายเลขบน Catalyst",
            "หน้า 13 เปรียบเทียบ normal กับ extended และแสดงผล show vlan brief ที่มี VLAN 1 กับ 1002–1005",
            "บอกความหมายของกลุ่มที่เห็นและแยกช่วงสำหรับการตั้งค่า",
            [
              "จับแถว default ของ VLAN 1 กับแถว legacy 1002–1005 จากชื่อและสถานะในผล show vlan brief",
              "จัด 1–1005 เป็น normal range และ 1006–4094 เป็น extended range ตามคู่มือรุ่นที่อ้างอิง",
              "เช็ก VTP และรุ่นของอุปกรณ์ก่อนใช้ extended range เพราะที่เก็บและพฤติกรรมการซิงก์ขึ้นกับแพลตฟอร์ม"
            ],
            "ผล show vlan brief ในหน้าตัวอย่างแสดงรายการเริ่มต้นของสวิตช์ ไม่ได้แสดงหมายเลขทั้งหมดที่รองรับ",
            { references: [["คู่มือ Cisco Catalyst 2960 เรื่องช่วง VLAN และการตั้งค่า trunk", trunkGuide]] }),
          example("create-vlan", [14], "สร้าง VLAN และตั้งชื่อ",
            "ตารางให้ vlan-id และ vlan-name เป็นค่าที่ต้องเลือกก่อนสั่งงานใน privileged EXEC",
            "ไล่ลำดับจากการรับเลข VLAN ไปจนถึงสถานะที่เกิดบนสวิตช์",
            [
              "เข้า global configuration ด้วย configure terminal",
              "คำสั่ง vlan รับหมายเลขแล้วสร้างหรือเข้าแก้ VLAN นั้น จากนั้น name รับชื่อสำหรับแสดงในตาราง",
              "end กลับสู่ privileged EXEC เพื่อให้ตรวจรายการด้วย show vlan brief ได้"
            ],
            "ได้ VLAN ตามหมายเลขและชื่อที่ป้อน พอร์ตสมาชิกจะถูกกำหนดในขั้นถัดไป",
            { code: "configure terminal\nvlan <vlan-id>\nname <vlan-name>\nend" }),
          example("assign-access", [15], "ให้พอร์ตหนึ่งเป็นสมาชิก data VLAN",
            "เริ่มด้วยเลข VLAN ที่สร้างแล้วและหมายเลข interface ที่ต่อเครื่องปลายทาง",
            "ประกอบคำสั่งให้พอร์ตทำงานแบบ access และชี้ไปยัง VLAN ที่ต้องการ",
            [
              "เข้า global configuration แล้วระบุพอร์ตด้วย interface <interface-id>",
              "switchport mode access กำหนดโหมด Layer 2 ของพอร์ต และ switchport access vlan <vlan-id> กำหนดสมาชิก VLAN",
              "ออกด้วย end แล้วตรวจทั้งรายการพอร์ตใน show vlan brief และค่า Access Mode VLAN ใน show interfaces <interface-id> switchport"
            ],
            "เฟรมข้อมูลจากอุปกรณ์ที่ต่อพอร์ต access นี้จะถูกจัดเข้ากลุ่ม VLAN ที่เลือก",
            { code: "configure terminal\ninterface <interface-id>\nswitchport mode access\nswitchport access vlan <vlan-id>\nend", note: "หน้า PDF 15 พิมพ์ vlan กับ vlan-id ติดกัน ต้องคั่นด้วยช่องว่างก่อนหมายเลขจริง" }),
          example("shared-access", [16], "อ่านรูป PC5 ต่อผ่าน IP Phone",
            "S3 Fa0/18 ต่อเข้า IP Phone และ PC5 ใช้พอร์ตต่อพ่วงบนโทรศัพท์ ป้าย PC5 ระบุ Student VLAN 20 และ 172.17.20.25",
            "กำหนดชนิดทราฟฟิกที่สายเส้นเดียวต้องรองรับ",
            [
              "ตามรูป PC5 ส่งทราฟฟิก data ผ่านโทรศัพท์เข้า S3 และอยู่ใน data VLAN 20",
              "IP Phone ส่งทราฟฟิก voice ของตัวเองเข้า S3 ทางสายเส้นเดียวกัน โดยใช้ voice VLAN ที่สวิตช์กำหนด",
              "ใช้ค่า Access Mode VLAN และ Voice VLAN ตรวจว่าทั้งสองกลุ่มชี้ไปยัง VLAN ที่ต้องการ"
            ],
            "Fa0/18 มี data VLAN หนึ่งตัวสำหรับ PC5 และเพิ่ม voice VLAN หนึ่งตัวสำหรับโทรศัพท์"),
          example("read-vlan-details", [17], "ดูจำนวน VLAN และสถานะของ SVI แยกกัน",
            "สไลด์แสดงภาพผล show vlan summary และ show interface vlan 20",
            "หาจำนวน VLAN รวม จำนวน extended VLAN และสถานะอินเทอร์เฟซเสมือน VLAN 20",
            [
              "คำสั่ง show vlan มีตัวเลือก brief สำหรับรายชื่อและพอร์ต, id สำหรับเลขที่เลือก, name สำหรับชื่อที่เลือก และ summary สำหรับจำนวนรวม",
              "จาก show vlan summary ในภาพอ่านจำนวนรวม 7, VTP VLAN 7 และ extended VLAN 0",
              "ส่งหมายเลข 20 ให้คำสั่ง show interfaces vlan ตรวจ SVI โดยตรง บรรทัดสถานะในภาพแสดง Vlan20 is up และ line protocol is up"
            ],
            "ในภาพมี 7 VLAN, extended 0 และ SVI VLAN 20 เป็น up/up",
            { codePrompt: "show vlan summary\nshow interfaces vlan 20" }),
          example("delete-vlan", [18], "ไล่ผลของการลบ VLAN จากตาราง",
            "สไลด์ให้สองขอบเขตงาน คือเอา VLAN ID หนึ่งตัวออกจากฐานข้อมูล หรือรีเซ็ตฐานข้อมูล VLAN ของสวิตช์แลปทั้งหมด",
            "เลือกคำสั่งที่ตรงขอบเขตและบอกสิ่งที่จะเกิดกับพอร์ตสมาชิก",
            [
              "กรณีเลือกลบทีละ VLAN ให้ตรวจรายชื่อพอร์ตจาก show vlan brief และย้ายสมาชิกไป VLAN ที่ใช้งานได้ก่อน",
              "จาก global configuration ใช้ no vlan <vlan-id> เพื่อเอารายการหมายเลขนั้นออก แล้วตรวจว่าพอร์ตอยู่ในกลุ่มใหม่",
              "กรณีล้างฐานข้อมูล VLAN ทั้งชุด สไลด์อธิบายว่า vlan.dat คือไฟล์ใน flash ที่ถูกลบและมีการ reload อุปกรณ์ ส่วนการคืนค่าทั้งเครื่องยังเกี่ยวกับ startup-config แยกต่างหาก"
            ],
            "การลบหนึ่ง VLAN ใช้เลข VLAN เป็นข้อมูลเข้า ส่วนการลบ vlan.dat กระทบการตั้งค่า VLAN หลายกลุ่มพร้อมกันหลังโหลดใหม่",
            { code: "no vlan <vlan-id>" })
        ]),
      section("vlan-trunks", "vlan", "19–23", "VLAN Trunks",
        "ตอนตรวจ trunk ให้ดูแยกสามเรื่องว่าโหมดทำงานเป็น trunk จริงหรือยัง native VLAN เป็นเลขใด และ allowed list เปิดให้ VLAN ไหนใช้ลิงก์ได้",
        [
          ["Native และ allowed", "Native VLAN กำหนดการตีความเฟรม untagged ส่วน allowed VLAN list กำหนดสิทธิ์ให้ VLAN วิ่งผ่านลิงก์ ควรเทียบการตั้งค่าที่ปลายทั้งสองฝั่ง"],
          ["Dynamic Trunking Protocol (DTP)", "กลไก Cisco ที่ใช้เจรจาโหมด trunk สารบัญหน้า 3 ระบุ DTP และหน้าผลคำสั่ง 21–23 แสดงสถานะ Negotiation of Trunking ตัวเอกสารจบที่การคืนค่า trunk และเปลี่ยนเป็น access"]
        ], [
          example("configure-trunk", [19, 20], "ตั้ง Fa0/1 ให้ขน Faculty, Student, Guest และ Native",
            "สวิตช์ S1 กับ S2 เชื่อมที่ Fa0/1 สไลด์กำหนด VLAN 10, 20, 30 และ 99 คู่กับ 172.17.10.0/24, 172.17.20.0/24, 172.17.30.0/24 และ 172.17.99.0/24 ตามลำดับ",
            "เขียนคำสั่งของ S1 ให้พอร์ตทำงานเป็น trunk, native 99 และเปิด VLAN สี่ตัวนี้",
            [
              "ตั้งค่าพอร์ต Fa0/1 ใน interface mode แล้วกำหนด switchport mode trunk",
              "ใส่เลข 99 ให้ switchport trunk native vlan เพื่อกำหนดการจัดเฟรม untagged",
              "ใส่รายการ 10,20,30,99 ให้ switchport trunk allowed vlan แล้วตรวจให้ทั้งสองฝั่งเห็น native VLAN ตรงกันและอนุญาต VLAN ที่ต้องการ"
            ],
            "ผลที่ต้องตรวจคือ trunk แบบ 802.1Q, native 99 และ allowed list 10,20,30,99",
            {
              code: "configure terminal\ninterface fa0/1\nswitchport mode trunk\nswitchport trunk native vlan 99\nswitchport trunk allowed vlan 10,20,30,99\nend",
              note: "หน้า PDF 20 สมมติ Catalyst 2960 ที่ใช้ 802.1Q อยู่แล้ว บางแพลตฟอร์มที่เลือก encapsulation ได้ต้องกำหนด dot1q ก่อนเปิด trunk"
            }),
          example("verify-trunk", [21], "อ่านสถานะ Fa0/1 ในภาพ CLI",
            "ภาพใช้ show interfaces fa0/1 switchport และแสดง Trunking Native Mode VLAN: 99 กับ Trunking VLANs Enabled: ALL",
            "บอกสถานะการใช้งานจริง แล้วเทียบกับค่าที่คาดว่าจะได้จากหน้า 20",
            [
              "ดู Administrative Mode และ Operational Mode ทั้งคู่เป็น trunk และ operational encapsulation เป็น dot1q",
              "อ่าน native VLAN 99 ตามบรรทัดผลลัพธ์ แต่ allowed list ในภาพเป็น ALL จึงต่างจากรายการสี่ VLAN ในตัวอย่างก่อนหน้า",
              "ถ้าต้องตรวจว่า VLAN ใดส่งได้จริง ให้พิจารณาว่า VLAN มีอยู่และพอร์ตอยู่ในสถานะ forwarding เพิ่มจาก allowed list"
            ],
            "ตีความภาพหน้า 21 ว่า trunk ทำงานจริง, native 99, allowed ALL",
            {
              codePrompt: "show interfaces fa0/1 switchport",
              note: "หน้า PDF 21 พิมพ์ no switchport trunk native vlan 99 เหนือผลลัพธ์ที่ยังแสดง native 99 และผล allowed เป็น ALL ต่างจากหน้า 20 จึงยึดค่าที่เห็นจาก show สำหรับการอ่านภาพ คำสั่งตั้ง 99 อยู่หน้า 20 ส่วนรูปการคืนค่าอยู่หน้า 22"
            }),
          example("reset-trunk", [22, 23], "คืนค่า trunk เทียบกับเปลี่ยนกลับเป็น access",
            "หน้า 22 ใช้ no กับ allowed list และ native VLAN จากนั้นหน้า 23 ใช้ switchport mode access ที่ Fa0/1",
            "แยกผลหลังแต่ละชุดคำสั่งและอ่านค่าที่ควรตรวจ",
            [
              "ใน interface mode ใช้ no switchport trunk allowed vlan คืนรายการอนุญาตเป็น ALL และ no switchport trunk native vlan คืน native เป็น 1",
              "อ่านผล show interfaces fa0/1 switchport หลังหน้า 22 จะเห็น Operational Mode เป็น trunk อยู่ และเห็น native VLAN 1",
              "เมื่อสั่ง switchport mode access ในหน้า 23 ให้ดู Administrative Mode และ Operational Mode ว่าเป็น static access ทั้งคู่ โดย access VLAN ในภาพคือ 1"
            ],
            "หน้า 22 ยังคงเป็น trunk ด้วยค่าเริ่มต้น หน้า 23 ทำงานเป็น access port",
            {
              code: "no switchport trunk allowed vlan\nno switchport trunk native vlan\n\n! Next step in the slide\nswitchport mode access",
              references: [["คู่มือ Cisco Catalyst 2960 เรื่อง native และ allowed VLAN", trunkGuide]]
            })
        ]),
      section("error-and-flow", "tutorial", "1", "Error Detection และ Flow/Error Control",
        "Tutorial หน้าแรกให้แยกศัพท์ตามหน้าที่ก่อนทำโจทย์คำนวณ พอรับเฟรมหนึ่งมา เราต้องแยกให้ได้ว่าเป็นปัญหาตรวจความเสียหาย คุมอัตราการส่ง หรือกู้คืนด้วยการส่งซ้ำ",
        [
          ["Framing และ Error Detection", "Framing กำหนดขอบเขตเฟรม Parity Check ใช้จำนวนบิต 1, Checksum ใช้ค่ารวมของชุดข้อมูล และ CRC (Cyclic Redundancy Check) ใช้เศษจากการหารพหุนามแบบบิตเพื่อตรวจความผิดพลาด Syndrome คือค่าที่ตัวตรวจใช้บ่งชี้ว่าข้อมูลผิดเงื่อนไขของรหัส"],
          ["Flow Control และ Error Control", "Flow Control คุมจำนวนข้อมูลให้รับไหว ส่วน Error Control ใช้ feedback เช่น ACK (Acknowledgment), timer และ retransmission เมื่อต้องกู้ข้อมูลที่สูญหายหรือเสียหาย"],
          ["ARQ และ Sliding Window", "ARQ (Automatic Repeat reQuest) ส่งซ้ำตามการตอบรับ Stop-and-Wait ส่งหนึ่งเฟรมแล้วรอ Sliding Window กำหนดช่วงเลขที่ส่งค้างได้ และ Pipelining ใช้ช่วงนี้เพื่อให้หลายเฟรมเคลื่อนที่พร้อมกัน"],
          ["MAC และการแบ่งช่อง", "MAC (Medium Access Control) คุมการใช้สื่อร่วมกัน เช่น ALOHA ส่งตามจังหวะของผู้ใช้, CSMA/CD ตรวจจับ collision, CSMA/CA พยายามหลีกเลี่ยง collision, Reservation จองเวลาส่ง, FDMA แบ่งความถี่, TDMA แบ่งเวลา และ OFDMA จัดกลุ่ม subcarrier ย่อยให้หลายผู้ใช้"]
        ], [
          example("tutorial-q1", [1], "โจทย์ 1 ระบบรับมือเฟรมสูญหาย",
            "กลไกที่โจทย์ให้ใช้ ACK, timeout และ retransmission เมื่อเฟรมหายหรือเสียหาย",
            "เลือกชื่อกลไกจากคลังคำ",
            ["จับคำว่า timeout กับ retransmission ว่าเกิดหลังการส่งเมื่อการตอบรับมีปัญหา", "จัดเข้ากลุ่มกู้คืนเฟรม ส่วน Flow Control ดูว่าผู้ส่งควรส่งต่อได้มากแค่ไหน"],
            "Error Control"),
          example("tutorial-q2", [1], "โจทย์ 2 เก็บเฟรมที่มาก่อนลำดับ",
            "Receiver เก็บเฟรมที่มาผิดลำดับและ sender ส่งซ้ำเฉพาะเฟรมที่หาย",
            "ระบุชนิด ARQ",
            ["คำว่าเก็บเฟรมบอกว่าฝั่งรับมี buffer สำหรับเฟรมที่ยังส่งต่อไม่ได้", "เมื่อช่องที่หายมาถึงก็ประกอบกับเฟรมที่เก็บไว้ได้ จึงขอส่งซ้ำเฉพาะช่องนั้น"],
            "Selective Repeat ARQ"),
          example("tutorial-q3", [1], "โจทย์ 3 ฟังสื่อและสุ่มเวลารอก่อนส่งใน WLAN",
            "อุปกรณ์ฟังสื่อไร้สายก่อนส่งและใช้ random backoff หรือการสุ่มเวลารอ",
            "เลือกวิธีเข้าถึงสื่อจากคำสำคัญ",
            ["Carrier Sense หมายถึงการตรวจว่าสื่อกำลังถูกใช้อยู่หรือไม่", "สุ่มเวลารอเพื่อลดโอกาสเริ่มส่งพร้อมกันตรงกับ Collision Avoidance"],
            "CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)"),
          example("tutorial-q4", [1], "โจทย์ 4 ส่งสิทธิ์ด้วย control frame",
            "หลาย station รอใช้สื่อ แล้วส่งต่อสิทธิ์การส่งข้อมูลให้กันผ่านเฟรมควบคุมพิเศษ",
            "ระบุชื่อวิธี controlled access",
            ["สิทธิ์อยู่กับผู้ถือ token หรือเฟรมอนุญาต ณ ขณะนั้น", "เมื่อใช้สิทธิ์เสร็จจึงส่ง token ต่อ ทำให้ station ถัดไปได้สิทธิ์ส่ง"],
            "Token Passing"),
          example("tutorial-q5", [1], "โจทย์ 5 Two-Dimensional Even Parity",
            "ข้อมูลมี 3 dataword แถวละ 4 บิต และจะเพิ่ม even parity ทั้งแนวแถวและคอลัมน์",
            "หาจำนวนบิตทั้งบล็อกหลังเพิ่ม parity",
            ["เพิ่มคอลัมน์ parity ทางขวาหนึ่งคอลัมน์ แถวข้อมูลจึงยาว 4 + 1 = 5 บิต", "เพิ่มแถว parity ด้านล่างให้ครบทั้งบล็อก รวมบิตมุม จึงมี 3 + 1 = 4 แถว", "คูณจำนวนแถวกับความกว้าง 4 × 5 = 20"],
            "บล็อกมี 20 บิต ประกอบด้วยข้อมูล 12 บิตและ parity 8 บิต"),
          example("tutorial-q6", [1], "โจทย์ 6 ขนาดหน้าต่างของ Selective Repeat",
            "ใช้ sequence number ขนาด m = 4 บิต หมายเลขจึงวนจาก 0 ถึง 15",
            "หาขนาด sender window และ receiver window สูงสุดตามแบบใน Tutorial",
            ["มีพื้นที่หมายเลข 2⁴ = 16 ค่า", "Selective Repeat ใช้ขนาดหน้าต่างสมมาตรได้สูงสุดครึ่งหนึ่งของพื้นที่หมายเลข เพื่อแยกเฟรมรอบเดิมกับรอบใหม่เมื่อเลขวน", "แทนค่า 2⁽⁴⁻¹⁾ = 8"],
            "sender window สูงสุด 8 เฟรม และ receiver window สูงสุด 8 เฟรม")
        ]),
      section("mac-access", "tutorial", "2", "MAC / Multiple Access",
        "จับคู่โจทย์โดยดูว่าผู้ใช้ถูกแยกออกจากกันด้วยอะไร และมีใครเป็นผู้ให้สิทธิ์ส่ง",
        [
          ["CDMA", "Code Division Multiple Access แยกสัญญาณของแต่ละผู้ใช้ด้วยรหัส ตัวอย่างใช้ orthogonal codes หรือรหัสที่ตัวรับแยกกันได้ด้วยความสัมพันธ์ของรหัส"],
          ["Polling", "ตัวควบคุมกลางถาม station ทีละตัวว่าใครมีข้อมูลรอส่ง การวนถามมีต้นทุนแม้บาง station จะไม่มีข้อมูล"]
        ], [
          example("tutorial-q7", [2], "โจทย์ 7 แยกผู้ใช้ด้วยรหัส",
            "หลายคนส่งพร้อมกันในย่านความถี่เดียวกัน ตัวรับใช้ orthogonal code แยกข้อมูล",
            "หาวิธี multiple access ตรงกับเบาะแส",
            ["เวลาและความถี่ซ้อนกันในโจทย์ จึงหันไปดูตัวแปรที่ใช้แยกผู้ใช้", "ผู้ใช้มีรหัสต่างกัน ตัวรับแยกด้วยรหัสที่ตรงกัน"],
            "CDMA"),
          example("tutorial-q8", [2], "โจทย์ 8 หน่วยกลางถามทีละสถานี",
            "อุปกรณ์หนึ่งถาม station ตามลำดับว่ามีข้อมูลรอส่งหรือไม่",
            "หาวิธี controlled access ตรงกับตัวอย่าง",
            ["หน่วยกลางเป็นผู้เริ่มให้สิทธิ์", "พฤติกรรมหลักคือส่งคำถามไปทีละสถานีเพื่อรอการตอบกลับ"],
            "Polling")
        ]),
      section("arq-traces", "tutorial", "3–5", "Go-Back-N ARQ และ Selective Repeat ARQ",
        "เขียนค่า R (เฟรมแรกที่ receiver ยังรอ) กำกับไว้ทุกเหตุการณ์ และจด Sf (เฟรมค้างตัวแรกของ sender) กับ Sn (เฟรมถัดไปที่จะส่ง) ก่อนคำนวณเลข modulo",
        [
          ["Go-Back-N (GBN)", "Receiver window มีขนาด 1 และทิ้งเฟรมผิดลำดับ ตาม convention หน้า 3 ACK k ยืนยันครบถึง k−1 และกำลังรอ k เมื่อ timeout ให้ส่งซ้ำตั้งแต่เฟรมค้างจนถึงเฟรมที่ส่งออกไปแล้ว"],
          ["Selective Repeat (SR)", "Receiver เก็บเฟรมผิดลำดับที่อยู่ใน window และตอบ individual ACK ทันที ACK k ยืนยันตัว k แม้ด้านหน้าจะยังมีรู เมื่อรูถูกเติมจึงส่งเฟรมต่อขึ้นไปตามลำดับ"],
          ["ACK กับ NAK", "หน้า 3 เขียนว่าชุดนี้ใช้ positive ACK เท่านั้น แต่ข้อ 10 หน้า 4 กำหนด NAK (Negative Acknowledgment) โดยเฉพาะ จึงยึดสมมติฐานรายข้อ ใช้ timeout สำหรับ GBN ข้อ 9 และใช้ NAK 5 เร่งการส่งซ้ำของ SR ข้อ 10"]
        ], [
          example("tutorial-q9", [3], "โจทย์ 9 Go-Back-N เมื่อ Frame 5 หาย",
            "m = 3 หรือ modulo 8, sender window = 4 เริ่ม Sf = 4, Sn = 8 และ R = 4 ผู้ส่งส่ง 4, 5, 6, 7 แต่ receiver เห็น 4, 6, 7 ตามลำดับ",
            "หา ACK ทุกครั้ง การจัดการเฟรม 6 กับ 7 และชุดเฟรมที่ส่งซ้ำเมื่อเฟรม 5 timeout",
            [
              "รับ 4 ตรงกับ R จึงส่งต่อเฟรม 4 เลื่อน R เป็น 5 แล้วตอบ ACK 5",
              "เมื่อรับ 6 และ 7 ค่า R ยังเป็น 5 จึงทิ้งทั้งคู่และตอบ ACK 5 ซ้ำทุกครั้ง",
              "เมื่อ ACK 5 ถึงผู้ส่งและ timer ของเฟรมค้างตัวแรกหมด ผู้ส่งส่งซ้ำเฟรม 5, 6 และ 7 ตามลำดับ"
            ],
            "ตอบ ACK 5, 5, 5 ทิ้ง 6 กับ 7 และส่งซ้ำ 5, 6, 7",
            { note: "หน้า PDF 3 รูป sliding window ทั่วไปใช้ Sf = 0 และ Sn = 4 เพื่อแสดงหน้าที่ของตัวชี้ ส่วนโจทย์เริ่ม Sf = 4 และ Sn = 8 อ่านค่า 8 เป็นลำดับต่อเนื่องในโจทย์ เมื่อเขียนเลขในฟิลด์ 3 บิตจะวนเป็น 0" }),
          example("tutorial-q10", [4], "โจทย์ 10 Selective Repeat เมื่อ Frame 5 หาย",
            "ใช้ modulo 8 และ window ขนาด 4 เริ่มที่ {4,5,6,7} ส่ง 4, 5, 6, 7 แต่เห็น 4, 6, 7 ที่ฝั่งรับ โจทย์กำหนด individual ACK และ NAK",
            "หา ACK/NAK, เฟรมใน buffer, ค่า R, เฟรมที่ส่งซ้ำ และค่า Sf/R ตอนจบ",
            [
              "รับ 4 แล้วตอบ ACK 4 ส่งเฟรม 4 ขึ้นชั้นบน และเลื่อน R = 5 เมื่อ ACK 4 ถึง sender ให้เลื่อน Sf เป็น 5",
              "รับ 6 แล้วเก็บใน buffer ตอบ ACK 6 และ NAK 5 รับ 7 แล้วเก็บและตอบ ACK 7 สมมติส่ง NAK สำหรับช่องว่างนี้ครั้งเดียวตามโจทย์ ค่า R ยังค้างที่ 5",
              "เมื่อ NAK 5 ถึง sender ให้ส่งซ้ำเฉพาะ 5 เมื่อ receiver รับ 5 ให้ตอบ ACK 5 และปล่อย 5, 6, 7 ตามลำดับ R จึงวนเป็น 0",
              "เมื่อ ACK 5 ถึง sender และ ACK 6 กับ 7 ได้รับแล้ว ช่วงค้าง 5–7 เสร็จทั้งหมด Sf จึงวนเป็น 0 ตามตารางตัวอย่าง"
            ],
            "ACK 4, ACK 6 + NAK 5, ACK 7 แล้ว ACK 5 เก็บ 6 กับ 7 ส่งซ้ำเฉพาะ 5 และลงท้าย Sf = R = 0",
            {
              table: {
                headers: ["เหตุการณ์", "Sender Sf", "Receiver R", "สิ่งที่ต้องจับตา"],
                rows: [["เริ่ม", "4", "4", "window {4,5,6,7}"], ["ACK 4 ถึง", "5", "5", "window {5,6,7,0}"], ["รับ 6, 7 และ ACK ถึง sender", "5", "5", "6, 7 รอใน buffer"], ["รับ 5 ที่ส่งซ้ำ", "5", "0", "ส่ง 5, 6, 7 ขึ้นตามลำดับ"], ["ACK 5 ถึง", "0", "0", "window {0,1,2,3}"]]
              },
              note: "หน้า PDF 4 ระบุ NAK ตรงตัวแม้หมายเหตุหน้า 3 เขียนว่าใช้ positive ACK เท่านั้น คำตอบข้อนี้ยึดเงื่อนไขหน้า 4"
            }),
          example("corrected-sr-diagram", [5], "อ่านแผนภาพแก้ไข Selective Repeat ที่ Frame 1 หาย",
            "แผนภาพท้าย Tutorial ส่งเฟรม 0, 1, 2, 3 และทำเครื่องหมายว่าเฟรม 1 สูญหาย โดยใช้ buffer และ negative acknowledgment",
            "หาว่าต้องส่งซ้ำอะไร อ่านป้าย ACK ตามกติกา individual ACK และเช็กเฟรมที่ปล่อยขึ้นชั้นบน",
            [
              "ส่งเฟรม 0 ถึง receiver จึงตอบ ACK 0 และเลื่อนเฟรมถัดไปที่รอเป็น 1",
              "เมื่อ 2 และ 3 มาถึง เก็บแต่ละเฟรมและตอบ ACK 2 กับ ACK 3 เมื่อพบช่องว่าง 1 ครั้งแรกส่ง NAK 1 ได้ในรูปแบบที่โจทย์ใช้",
              "sender ส่งซ้ำเฟรม 1 เมื่อ receiver ได้ 1 ต้องตอบ ACK 1 จากนั้นส่ง 1, 2, 3 ขึ้นชั้นบนตามลำดับ"
            ],
            "ส่งซ้ำเพียง Frame 1 และปล่อย 1, 2, 3 เมื่อเติมช่องว่างเสร็จ",
            { note: "หน้า PDF 5 เรียกรูปนี้ว่าแก้ slide หน้าที่ 35 บนลูกศรล่างสุดที่เกิดหลังรับ Frame 1 ซ้ำยังมีป้ายแก้เป็น ACK3 ตามกติกา individual ACK ในตารางหน้าเดียวกัน ลูกศรนั้นควรเป็น ACK 1 ส่วน ACK 3 เป็นการยืนยันเมื่อรับ Frame 3" })
        ])
    ],
    exercises: [
      quiz("q1", "vlan", [4, 8, 9], "1. ARP broadcast วิ่งถึงใคร",
        "A กับ B อยู่ VLAN 40 คนละสวิตช์ C อยู่ VLAN 50 ฝั่งเดียวกับ B สมมติ trunk ระหว่างสวิตช์ส่ง VLAN 40 และ 50 ได้ A ส่ง ARP Request แบบ Layer 2 broadcast ใครจะเห็นจากสองเครื่องที่ระบุ",
        ["B และ C", "C เท่านั้น", "B เท่านั้น", "ทั้ง B และ C ต้องรอ router ส่ง broadcast ให้"], 2,
        ["A ส่งจาก access port ของ VLAN 40 สวิตช์จึง flood เฟรมอยู่ใน VLAN 40", "trunk ส่ง VLAN 40 ข้ามสวิตช์ได้ B จึงรับ ส่วน C รับ broadcast ของ VLAN 50", "ก กับ ข นับ C เกินมาจากการใช้สวิตช์ร่วมกัน ส่วน ง เข้าใจหน้าที่ router ผิด การส่งนี้อยู่ใน broadcast domain ของ VLAN 40"]),
      quiz("q2", "vlan", [10, 19, 20], "2. อ่าน native VLAN และ allowed list",
        "บน Catalyst สมมติใช้ native VLAN แบบ untagged ตามค่าเริ่มต้น พอร์ตเปิดใช้งานเป็น trunk ด้วยคำสั่งด้านล่าง เฟรม VLAN 20 และ VLAN 30 จะออกอย่างไร",
        ["VLAN 20 ไม่ออกตาม allowed list และ VLAN 30 ออกแบบมี tag", "ทั้งคู่ผ่าน trunk แบบมี tag", "VLAN 20 ออกแบบ untagged และ VLAN 30 ออกแบบมี tag", "VLAN 20 ไม่ออก และ VLAN 30 ออกแบบ untagged"], 0,
        ["เช็ก allowed list ก่อน มี 10, 30 กับ 99 ดังนั้น VLAN 20 ไม่ได้สิทธิ์ผ่าน", "VLAN 30 ผ่านได้และต่างจาก native 99 จึงออกแบบ tagged", "ข กับ ค ตีความว่าพอร์ต trunk เปิดทุก VLAN แม้มีรายการกำหนดไว้ ส่วน ง นำกติกา untagged ของ native VLAN 99 ไปใช้กับ VLAN 30"],
        { codePrompt: "switchport mode trunk\nswitchport trunk native vlan 99\nswitchport trunk allowed vlan 10,30,99" }),
      quiz("q3", "tutorial", [1], "3. นับบิตใน parity block",
        "ใช้ Two-Dimensional Even Parity กับ 5 dataword แถวละ 6 บิต และใส่ parity bit มุมตามวิธีใน Tutorial จะได้กี่บิต",
        ["30", "35", "41", "42"], 3,
        ["จาก 5 แถวข้อมูล เพิ่มแถว parity หนึ่งแถวเป็น 6 แถว", "จาก 6 คอลัมน์ เพิ่มคอลัมน์ parity เป็น 7 คอลัมน์ รวม 6 × 7 = 42 บิต", "30 นับข้อมูลล้วน 35 เพิ่มเฉพาะคอลัมน์ parity ส่วน 41 เพิ่มทั้งสองแนวแต่ตกบิตมุม"]),
      quiz("q4", "tutorial", [3], "4. Go-Back-N ข้ามขอบ modulo",
        "ใช้ modulo 8 และ ACK k หมายถึงกำลังรอเฟรม k Sender ส่ง 6, 7, 0, 1 Receiver รอ 6 และได้รับ 6, 0, 1 เพราะเฟรม 7 หาย สมมติ ACK แรกถึง sender ก่อน timeout ต้องตอบ ACK และส่งซ้ำอย่างไร",
        ["ACK 6, 0, 1 แล้วส่งซ้ำ 7", "ACK 7, 7, 7 แล้วส่งซ้ำ 7, 0, 1", "ACK 7, 1, 2 แล้วส่งซ้ำ 7", "ACK 7, 7, 7 แล้วส่งซ้ำ 7 อย่างเดียว"], 1,
        ["เมื่อได้ 6 ตรงลำดับ ค่า R ขยับจาก 6 เป็น 7 จึงตอบ ACK 7", "รับ 0 กับ 1 ขณะที่รอ 7 จึงทิ้งและตอบ ACK 7 ซ้ำ", "เมื่อ timeout GBN ส่งซ้ำตั้งแต่ 7 รวมเฟรมถัดไปที่ค้างคือ 0 และ 1", "ก ใช้เลขเฟรมที่มาถึงเหมือน individual ACK ค เลื่อน R ทั้งที่ขาด 7 ส่วน ง ใช้กติกาส่งซ้ำของ Selective Repeat"]),
      quiz("q5", "tutorial", [3, 4], "5. Selective Repeat ส่งซ้ำเฉพาะช่องว่าง",
        "ใช้ modulo 8, window 4 และ individual ACK พร้อม NAK Sender ส่ง 2, 3, 4, 5 โดยเฟรม 3 หาย Receiver ได้ 2, 4, 5 และเริ่มรอ 2 ค่า R ก่อนเฟรม 3 ที่ส่งซ้ำมาถึง และเฟรมที่ sender ส่งซ้ำคืออะไร",
        ["R = 3 และส่งซ้ำ 3, 4, 5", "R = 6 และส่งซ้ำ 3", "R = 3 และส่งซ้ำ 3", "R = 6 และส่งซ้ำ 4, 5"], 2,
        ["รับ 2 แล้วตอบ ACK 2 และเลื่อน R ไป 3 ซึ่งเป็นช่องว่างแรก", "เก็บ 4 กับ 5 ใน buffer ตอบ ACK 4 และ ACK 5 แยกกัน พร้อม NAK 3 ตามเงื่อนไข", "NAK 3 ทำให้ส่งซ้ำ 3 เมื่อรับ 3 จึงปล่อย 3 ถึง 5 และเลื่อน R เป็น 6", "ก ยกวิธีส่งซ้ำของ GBN มาใช้ ข กับ ง เลื่อน R ก่อนช่องว่างถูกเติม และ ง ส่งซ้ำเฟรมที่ได้รับแล้ว"])
    ],
    checklist: [
      "อธิบายความต่างของ access, trunk, native VLAN และ allowed list แล้วไล่เส้นทาง broadcast จากภาพหลายสวิตช์ได้",
      "บอกตำแหน่งและขนาด 802.1Q tag รวมถึงจุดที่ต้องคำนวณ FCS ใหม่ได้",
      "อ่าน show vlan brief กับ show interfaces switchport แล้วระบุโหมดใช้งานจริง, data/voice VLAN และ native/allowed VLAN ได้",
      "คำนวณบิตทั้งบล็อกของ two-dimensional parity และขนาด window ของ Selective Repeat จากจำนวนบิต sequence number ได้",
      "วาดตารางเฟรมที่ได้รับ ACK, buffer, เฟรมส่งซ้ำ และเลขที่เลื่อนไปของ GBN กับ SR เมื่อหมายเลขวนได้"
    ]
  });
})();
