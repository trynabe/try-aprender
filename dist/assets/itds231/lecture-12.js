(() => {
  const { addChapter, section, example, quiz } = window.ComputerNetwork;
  const source = "transport";

  addChapter({
    number: 12,
    title: "Transport Layer (2)",
    thaiTitle: "UDP, TCP และการจัดการความแออัด",
    summary: "เริ่มจาก UDP ที่ส่ง Datagram เป็นชุดแยกกัน แล้วตาม TCP ตั้งแต่เปิด Connection การยืนยันไบต์และส่งซ้ำ ไปจนถึงการคุมอัตราส่งเมื่อปลายทางอ่านช้าหรือ Router เริ่มมีคิว ปิดท้ายด้วยการอ่านกราฟ BBR, Fairness, QUIC และ Throughput",
    goals: [
      "คำนวณ Internet checksum แบบ 16 บิตและทำนายผลเมื่อหลายบิตพลิกพร้อมกัน",
      "ไล่ Sequence number, Cumulative ACK, Timeout และ TCP Three-way Handshake จากแผนภาพลูกศร",
      "แยก rwnd สำหรับพื้นที่รับออกจาก cwnd สำหรับเครือข่าย แล้วอ่านกราฟ AIMD, CUBIC, BBR และคำนวณ Throughput"
    ],
    confusions: [
      "ACK=N คือรับข้อมูลต่อเนื่องถึง N−1 และกำลังรอไบต์ N",
      "Checksum ตรวจจับความผิดพลาด ส่วนการส่งข้อมูลซ้ำเพื่อกู้ข้อมูลเป็นอีกกลไกหนึ่ง",
      "Slow start เริ่มด้วยหน้าต่างเล็กแต่โตแบบทวีคูณ จนถึง Threshold ที่เปลี่ยนเป็นการโตแบบเส้นตรง",
      "UDP เองเป็นแบบ Best effort ขณะที่ QUIC สร้างความเชื่อถือได้และคุมความแออัดบน UDP"
    ],
    sources: [[source, 24, 94]],
    sections: [
      section("udp", source, "24–36", "Connectionless Transport: UDP", "UDP หรือ User Datagram Protocol ส่ง Datagram แต่ละชุดแยกกันแบบ Connectionless ข้ามขั้น Handshake จึงเริ่มส่งได้เลย ข้อมูลอาจสูญหาย มาซ้ำ หรือสลับลำดับ แอปตัดสินใจได้ว่าจะจัดการเหตุการณ์เหล่านี้อย่างไร", [
        ["ทำไมใช้ UDP", "Header เล็กและไม่มีสถานะ Connection ที่ชั้น UDP เหมาะกับงานที่ต้องการตอบเร็วหรือยอมรับการสูญหายบางส่วน เช่น DNS, SNMP และสื่อสตรีม HTTP/3 ใช้ QUIC เพื่อเพิ่มการส่งที่เชื่อถือได้และ Congestion control บน UDP"],
        ["UDP Header", "สี่ช่องกว้างช่องละ 16 บิต ได้แก่ Source port, Destination port, Length และ Checksum รวม 8 ไบต์ Length นับทั้ง Header และ Payload"],
        ["Checksum", "ค่าที่คำนวณจากข้อมูลเพื่อตรวจหาความผิดพลาด เช่น Bit flip หรือบิตเปลี่ยนจาก 0 เป็น 1 ใช้ 16-bit one's-complement arithmetic คือบวกทีละคำ วนทดจากซ้ายกลับมาขวา แล้วกลับบิตผลลัพธ์"],
        ["Pseudo-header", "ในการคำนวณจริง นำส่วนประกอบจาก IP เช่น IP ต้นทางและปลายทางมารวมด้วยเพื่อช่วยตรวจการส่งผิดที่ ค่า Checksum ที่ตรงกันมีความหมายว่าไม่พบข้อผิดพลาดจากการตรวจครั้งนั้น"]
      ], [
        example("udp-header-rfc", [25, 26, 27], "อ่านแผนผัง UDP Header ใน RFC 768", "ภาพเอกสารหน้า 27 แสดงตารางข้อมูลสองแถว แถวแรกแบ่ง Source port กับ Destination port แถวต่อมาเป็น Length กับ Checksum จากนั้นจึงเป็น Data octets", "หาขนาด Header และบอกว่าถ้าจะส่งข้อความที่เรียงลำดับอย่างเชื่อถือได้ต้องมีอะไรเพิ่ม", [
          "แต่ละแถวกว้าง 32 บิต แบ่งเป็นสองช่อง ช่องละ 16 บิต",
          "ส่วน Header สองแถวมี 64 บิต หรือ 8 ไบต์ แล้ว Payload ตามมา",
          "RFC ให้กลไกส่งข้อความแบบเบา แอปที่ต้องการลำดับหรือกู้ข้อความที่หายจึงใช้ TCP หรือใช้โปรโตคอลที่ทำกลไกดังกล่าวบน UDP"
        ], "UDP Header มี 8 ไบต์ โดย Length รวม 8 ไบต์นี้ด้วย", {
          references: [["RFC 768 — User Datagram Protocol", "https://www.rfc-editor.org/rfc/rfc768.html"]]
        }),
        example("udp-snmp-message", [28, 29, 30, 31], "ไล่ข้อความ SNMP จาก Server กลับ Client", "รูปมี SNMP Client และ SNMP Server เปิด UDP Socket หน้า 29 แสดง Server กำลังประกอบข้อความ ส่วนหน้า 30 แสดง Client รับข้อความ", "ไล่การห่อและแกะข้อมูล แล้วบอกว่า UDP ใช้ Header เพื่ออะไร", [
          "SNMP (Simple Network Management Protocol) สร้างข้อความระดับ Application แล้วส่งลง UDP ทาง Socket",
          "ฝั่งส่งกำหนด Port, Length และ Checksum แล้วประกบ UDP header หน้าข้อความก่อนส่งให้ IP",
          "Client รับ Segment จาก IP ตรวจ Checksum แล้วส่ง Payload ไป SNMP ผ่าน Socket ที่ตรงกับ Destination port"
        ], "ข้อความ SNMP เดิมถึงแอปผ่าน UDP Socket ฝั่ง Client ถ้าข้อมูลผ่านการตรวจและไปถึงปลายทาง", {
          diagram: ["SNMP Server สร้างข้อความ", "UDP เติม Header", "IP ส่ง Datagram", "UDP ฝั่ง Client ตรวจและเลือก Socket", "SNMP Client รับข้อความ"]
        }),
        example("decimal-checksum", [32], "ตรวจเลข 5 กับ 6 ที่ถูกเปลี่ยนระหว่างทาง", "ภาพตัวอย่างให้ผู้ส่งส่งเลข 5, 6 และผลรวม 11 ผู้รับมีข้อมูล 4, 6 และค่าเดิม 11", "ใช้ผลรวมตรวจว่าข้อมูลที่รับเปลี่ยนหรือไม่", [
          "ผลรวมฝั่งส่งคือ 5 + 6 = 11",
          "ผู้รับคำนวณใหม่จากข้อมูลที่ได้เป็น 4 + 6 = 10",
          "เปรียบเทียบ 10 กับค่า 11 ที่มากับข้อความ เห็นผลรวมต่างกันจึงตรวจพบความผิดพลาด"
        ], "ตรวจพบข้อผิดพลาด เพราะ 10 ต่างจาก 11", {
          note: "หน้า PDF 32 ใช้ผลบวกฐานสิบเพื่อสื่อแนวคิด สูตร Internet checksum จริงใช้เลข 16 บิตแบบกลับบิตในหน้า PDF 33–35"
        }),
        example("internet-checksum", [33, 34], "บวกเลข 16 บิตแล้ววนทด", "สไลด์ให้ 1110 0110 0110 0110 กับ 1101 0101 0101 0101 ซึ่งเขียนย่อในฐานสิบหกเป็น 0xE666 และ 0xD555", "หา Internet checksum แบบ 16 บิต", [
          "บวก 0xE666 + 0xD555 ได้ 0x1BBBB ซึ่งมี Carry หรือเลขทด 1 เลยขอบ 16 บิต",
          "ใช้ End-around carry หรือวนทดกลับมาบวกด้านขวา ได้ 0xBBBB + 1 = 0xBBBC",
          "ทำ One's complement คือกลับทุกบิตของ 0xBBBC ใน 16 บิต จึงได้ 0x4443"
        ], "Checksum = 0x4443 หรือ 0100 0100 0100 0011", {
          table: {
            headers: ["ขั้น", "เลขฐานสิบหก"],
            rows: [["บวก", "0x1BBBB"], ["วนทด", "0xBBBC"], ["กลับบิต", "0x4443"]]
          }
        }),
        example("checksum-collision", [35, 36], "บิตพลิกแล้ว Checksum ยังเป็นค่าเดิม", "หน้า 35 เปลี่ยนสองบิตท้ายของคำแรกจาก 10 เป็น 01 และของคำที่สองจาก 01 เป็น 10 เท่ากับเปลี่ยน 0xE666 เป็น 0xE665 และ 0xD555 เป็น 0xD556", "หา Checksum ใหม่และบอกว่าตรวจพบหรือไม่", [
          "คำแรกมีค่าลดลง 1 คำที่สองเพิ่มขึ้น 1 ผลรวมจึงคงเดิมที่ 0x1BBBB",
          "หลังวนทดและกลับบิต ได้ Checksum 0x4443 เหมือนก่อนบิตพลิก",
          "เมื่อเทียบค่าที่เพิ่งคำนวณกับที่ส่งมา ผู้รับตรวจไม่พบความผิดพลาดกรณีนี้"
        ], "ผลรวมที่การเปลี่ยนสองจุดหักล้างกันทำให้ Checksum ตรวจไม่พบ กรณีนี้แสดงข้อจำกัดของการตรวจจับ")
      ]),
      section("tcp-segments-rtt", source, "37–44", "TCP Segment Structure, Sequence Numbers and RTT", "TCP หรือ Transmission Control Protocol ใช้ Handshake เพื่อเก็บสถานะของแต่ละ Connection แล้วส่ง Byte stream หรือลำดับไบต์ที่เรียงได้ทั้งสองทิศใน Connection เดียว (Full duplex) ทั้งสองทิศจึงนับหมายเลขไบต์ของตัวเอง", [
        ["TCP Header", "มี Source/Destination port, Sequence number, Acknowledgment number, Header length, Flags, Receive window, Checksum, Urgent pointer และ Options ที่ทำให้ Header ยาวแปรผัน เช่น SYN/FIN สำหรับ Connection, RST สำหรับ Reset, CWR/ECE สำหรับ ECN"],
        ["Sequence number และ ACK", "Sequence number ระบุหมายเลขของไบต์แรกใน Segment ส่วน ACK (Acknowledgment) บอกหมายเลขไบต์ถัดไปที่รอ แบบ Cumulative ACK ตัวเดียวจึงยืนยันข้อมูลต่อเนื่องได้หลาย Segment"],
        ["MSS และ Pipelining", "MSS (Maximum Segment Size) คือขนาดข้อมูล TCP ต่อ Segment สูงสุดที่ใช้ใน Connection ส่วน Pipelining คือปล่อยหลาย Segment ค้างระหว่างทางได้ก่อนรอ ACK ทีละตัว"],
        ["RTT และ Timeout", "RTT (Round-trip time) คือเวลาตั้งแต่ส่ง Segment จนได้รับ ACK กลับ เมื่อ Timeout สั้นไปจะส่งซ้ำทั้งที่ ACK กำลังมา ถ้ายาวไปจะรอแก้การสูญหายนาน"]
      ], [
        example("tcp-window-diagram", [39, 40], "อ่านสีในหน้าต่าง Sequence number", "ภาพหน้า 40 เรียงไบต์ใน Sender sequence number space เป็นช่วง ACK แล้ว ช่วงส่งแต่ยังไม่ ACK ช่วงที่ยังส่งได้ และช่วงที่อยู่นอก Window", "ชี้ช่วงที่เรียกว่า In-flight และอธิบายว่า ACK ช่วยเลื่อนจุดเริ่ม Window อย่างไร", [
          "ช่วงแรกได้รับ ACK แล้ว ช่วงที่สองถูกส่งแล้วแต่ยังไม่ได้ ACK จึงเรียกว่า In-flight",
          "ช่วงที่สามอยู่ใน Window จึงเป็นพื้นที่สำหรับส่งข้อมูลใหม่ ส่วนช่วงสุดท้ายรอให้ Window ขยับ",
          "เมื่อได้ ACK ใหม่ที่ครอบคลุมข้อมูลเพิ่มเติม ขอบซ้ายจะเดินไปยังไบต์แรกที่ยังไม่ยืนยัน หากเกิดช่องว่าง ฝั่งรับยังบอกเลขไบต์ที่รออยู่แม้จะมี Segment หลังช่องว่างมาถึง"
        ], "In-flight คือไบต์ที่ส่งแล้วและยังไม่ได้รับ ACK ส่วนขอบซ้ายของ Window คือจุดข้อมูลที่ยังต้องรอยืนยัน", {
          table: {
            headers: ["ตำแหน่งจากซ้ายไปขวาในรูป", "สถานะ"],
            rows: [
              ["เขียว", "ส่งแล้วและ ACK แล้ว"],
              ["เหลือง", "In-flight ส่งแล้วแต่ยังไม่ ACK"],
              ["น้ำเงิน", "อยู่ใน Window และยังไม่ส่ง"],
              ["เทา", "อยู่นอก Window"]
            ]
          }
        }),
        example("telnet-byte-echo", [41], "Telnet Echo ตัว C ขนาดหนึ่งไบต์", "ผู้ใช้พิมพ์ C ที่ Host A และ Host B ส่ง C กลับ จากรูป A เริ่มส่งด้วย Seq=42 และรอไบต์แรกของ B ที่ 79", "เติมค่า Seq และ ACK ของการตอบกลับทั้งสองทิศ", [
          "A ส่งข้อมูล 1 ไบต์ที่ตำแหน่ง 42 พร้อม ACK=79 เพื่อบอกรอข้อมูลจากฝั่ง B ที่ 79",
          "B รับไบต์ 42 แล้วคาดหวัง 43 จึงส่ง ACK=43 และส่ง C กลับใน Segment เดียวกัน โดยใช้ Seq=79 ของตัวเอง",
          "A รับ C ที่ 79 แล้วส่ง ACK=80 เมื่อไม่มี Payload ในคำตอบนี้ ค่า Seq ฝั่ง A ยังคงเป็น 43"
        ], "A → B ใช้ Seq=42, ACK=79 แล้ว B → A ใช้ Seq=79, ACK=43 และ A ยืนยันด้วย Seq=43, ACK=80", {
          table: {
            headers: ["ทิศทาง", "Seq", "ACK", "ข้อมูล"],
            rows: [
              ["A → B", "42", "79", "C (1 ไบต์)"],
              ["B → A", "79", "43", "C (1 ไบต์)"],
              ["A → B", "43", "80", "ACK อย่างเดียว"]
            ]
          }
        }),
        example("tcp-rtt-graph", [42, 43, 44], "อ่านกราฟ SampleRTT และตั้ง Timeout", "กราฟหน้า 43 ใช้แกนนอนเป็นเวลาในวินาทีและแกนตั้งเป็น RTT ในมิลลิวินาที เส้นน้ำเงินเป็นค่าที่เพิ่งวัด เส้นชมพูเป็นค่าประมาณ สไลด์ให้ α = 0.125 และ β = 0.25", "อธิบายว่าเส้นใดแกว่งกว่า วิธีถัวค่าทำงานอย่างไร และจะเผื่อเวลารอ ACK เท่าใด", [
          "SampleRTT คือช่วงจากส่ง Segment ครั้งแรกจน ACK กลับมา เลี่ยง Sample จากการส่งซ้ำเมื่อแยกไม่ได้ว่า ACK มาจากรอบไหน",
          "EstimatedRTT ใช้ EWMA (Exponentially Weighted Moving Average) โดยนำค่าเดิมคูณ 0.875 แล้วบวก SampleRTT ใหม่คูณ 0.125 จุดน้ำเงินที่กระโดดเกิน 300 ms บางจุดจึงทำให้เส้นชมพูขยับเพียงบางส่วน",
          "อัปเดต DevRTT = 0.75 × DevRTT เดิม + 0.25 × |SampleRTT − EstimatedRTT| แล้วเอา 4 × DevRTT ที่ได้ไปบวก EstimatedRTT เป็นช่วงเผื่อ",
          "เมื่อ SampleRTT แปรปรวนขึ้น ส่วนเผื่อโตขึ้น ลดโอกาส Timeout เร็วเกินไป"
        ], "ใช้ TimeoutInterval = EstimatedRTT + 4 × DevRTT ตามแบบจำลองในสไลด์", {
          note: "หน้า PDF 43–44 ให้สูตรย่อสะดวกสำหรับอ่านกราฟ ถ้าต้องไล่ค่าตามมาตรฐาน RFC 6298 ให้คำนวณ RTTVAR (DevRTT) จาก SRTT เดิมก่อนอัปเดต SRTT และคำนึงถึงความละเอียดนาฬิกากับค่า RTO ขั้นต่ำด้วย",
          references: [["RFC 6298 — สูตรคำนวณ Retransmission Timeout", "https://www.rfc-editor.org/rfc/rfc6298.html"]]
        })
      ]),
      section("tcp-retransmission", source, "45–49", "Reliable Data Transfer and TCP Retransmission", "ผู้ส่งคอยดู ACK ที่เลื่อนขอบของข้อมูลยืนยันแล้ว TCP ส่งซ้ำได้เมื่อ Timer ของช่วงที่ค้างหมด หรือเมื่อ ACK ซ้ำหลายตัวส่งสัญญาณว่าฝั่งรับยังรอไบต์เดิม", [
        ["Sender แบบย่อ", "เมื่อแอปให้ข้อมูลจะสร้าง Segment พร้อม Seq และเริ่ม Timer ถ้ายังไม่มี Timer เมื่อ Timeout ให้ส่งช่วงที่ค้างซ้ำและเริ่มนับใหม่ เมื่อ ACK ยืนยันข้อมูลใหม่ให้เลื่อน SendBase แล้วเริ่ม Timer ถ้ายังมีข้อมูลค้าง"],
        ["SendBase", "หมายเลขไบต์แรกที่ยังไม่ได้ ACK โดย ACK ที่เลื่อนไปข้างหน้าครอบคลุมไบต์ต่อเนื่องก่อนเลขนั้น"],
        ["Fast retransmit", "เมื่อได้ Duplicate ACK 3 ตัวเพิ่มเติมหลัง ACK เดิม TCP ส่งซ้ำ Segment ค้างที่มี Seq น้อยสุดได้ก่อน Timer หมด"]
      ], [
        example("receiver-ack-table", [46], "ตัดสินใจว่าจะรอหรือส่ง ACK ทันที", "ตารางมีสี่เหตุการณ์ คือข้อมูลมาตามลำดับแล้ว ACK ก่อนหน้าส่งครบ มี ACK เก่ารออยู่ เห็นช่องว่าง และได้ Segment มาเติมช่องว่าง", "จับคู่เหตุการณ์กับการตอบ ACK ที่สไลด์ระบุ", [
          "ข้อมูลมาเรียงและ ACK ก่อนหน้าส่งครบแล้ว ใช้ Delayed ACK รอสั้น ๆ เผื่อจะ ACK พร้อม Segment ถัดไป",
          "ถ้ามี Segment ก่อนหน้าที่รอ ACK อยู่และได้ตัวถัดมาตามลำดับ ก็ส่ง Cumulative ACK ครอบทั้งคู่ทันที",
          "ถ้า Seq สูงกว่าที่รอ ให้ส่ง Duplicate ACK ระบุไบต์แรกที่ยังขาด พอได้ Segment มาเติมตั้งแต่ต้นช่องว่างให้ ACK ความคืบหน้าทันที"
        ], "กรณีแรกใช้ Delayed ACK ส่วนการยืนยันทั้งคู่ การพบช่องว่าง และการเริ่มเติมช่องว่างมี ACK ทันทีตามตาราง", {
          table: {
            headers: ["เหตุการณ์ที่ Receiver", "การตอบตามสไลด์"],
            rows: [
              ["ได้ Segment ตามลำดับ และ ACK ของข้อมูลก่อนหน้าส่งครบ", "รอ Segment ถัดไปได้ไม่เกิน 500 ms ถ้าไม่มีจึงส่ง ACK"],
              ["ได้ Segment ตามลำดับ และมีอีก Segment รอ ACK", "ส่ง Cumulative ACK หนึ่งตัวครอบทั้งสอง"],
              ["ได้ Segment ที่ Seq สูงกว่าเลขที่รอ", "ส่ง Duplicate ACK บอกเลขไบต์ที่รอ"],
              ["ได้ Segment ที่เริ่มจากขอบซ้ายของ Gap และเติมบางส่วนหรือทั้งหมด", "ส่ง ACK ทันที"]
            ]
          },
          note: "หน้า PDF 46 มองเห็นเฉพาะหัวตารางและเส้นในภาพที่แสดง ตารางนี้ถอดจากชั้นข้อความของ PDF แล้วเทียบพฤติกรรม Delayed ACK และ Duplicate ACK กับ RFC 5681 §4.2 ค่า 500 ms เป็นเพดานในมาตรฐาน",
          references: [["RFC 5681 — Generating Acknowledgments", "https://www.rfc-editor.org/rfc/rfc5681.html#section-4.2"]]
        }),
        example("lost-ack", [47], "รูปซ้ายของหน้า 47 เมื่อ ACK หาย", "A ส่ง Seq=92 พร้อมข้อมูล 8 ไบต์ถึง B แต่ ACK แรกหายตามเครื่องหมาย X", "หา ACK ที่ B ส่ง แล้วไล่ว่า A กับ B ทำอะไรต่อเมื่อ Timer หมด", [
          "B ได้ไบต์ 92–99 ครบ จึงส่ง ACK=100",
          "A ไม่เห็น ACK และ Timeout จึงส่ง Seq=92 จำนวน 8 ไบต์ซ้ำ",
          "B รู้ว่าข้อมูลช่วงนี้ได้รับแล้ว จึง ACK=100 อีกครั้งโดยแอปไม่ต้องรับข้อมูลซ้ำ"
        ], "A ได้ ACK=100 หลังการส่งซ้ำ แต่ B ได้ข้อมูลครบตั้งแต่ Segment แรก"),
        example("early-tcp-timeout", [47], "รูปขวาของหน้า 47 เมื่อ Timeout เร็วไป", "A ส่ง Seq=92 ยาว 8 ไบต์และ Seq=100 ยาว 20 ไบต์ B ได้ครบและส่ง ACK=100, 120 ตามลำดับ แต่ Timer ฝั่ง A หมดก่อน ACK แรกมาถึง", "ไล่การส่งซ้ำ ค่า SendBase และ ACK ที่ B ตอบเมื่อได้ของซ้ำ", [
          "ก่อนเห็น ACK, SendBase ของ A คือ 92 เมื่อ Timer หมดจึงส่ง Seq=92 ซ้ำ",
          "เมื่อ ACK=100 และ ACK=120 มาถึง SendBase เดินเป็น 100 แล้ว 120",
          "B ได้ข้อมูลถึงไบต์ 119 แล้ว เมื่อชุดซ้ำมาถึงก็ยืนยันเลขถัดไปเดิมคือ ACK=120"
        ], "การส่ง Seq=92 ซ้ำเกิดทั้งที่ B มีข้อมูลครบ และ SendBase สุดท้ายอยู่ที่ 120"),
        example("cumulative-ack-covers-loss", [48], "ACK=120 ชดเชย ACK=100 ที่หาย", "A ส่ง Seq=92 ยาว 8 ไบต์และ Seq=100 ยาว 20 ไบต์ B ตอบ ACK=100 กับ ACK=120 แต่ ACK=100 หายและ ACK=120 กลับมาทัน", "บอกว่า A ต้องย้อนส่ง Seq=92 หรือส่งข้อมูลใหม่ได้เลย", [
          "ชุดแรกมีไบต์ 92–99 ชุดที่สองมีไบต์ 100–119 รวมเป็นช่วงต่อเนื่อง 92–119",
          "ACK=120 ยืนยันสองช่วงไปพร้อมกันตามกฎ Cumulative ACK",
          "A จึงส่งข้อมูลใหม่ Seq=120 ยาว 15 ไบต์ได้ตามภาพ"
        ], "ACK=120 ครอบไบต์ก่อนหน้าทั้งหมด A จึงไม่ต้องส่ง Seq=92 ซ้ำ"),
        example("three-duplicate-acks", [49], "Fast Retransmit หลัง ACK=100 ซ้ำสามตัว", "A ส่ง Seq=92 ยาว 8 ไบต์ถึง B แต่ Seq=100 ยาว 20 ไบต์หาย Segment อีกสามชุดที่ส่งตามหลังยังไปถึง B", "นับ ACK ซ้ำให้ถูกและเลือก Segment ที่ต้องส่งซ้ำ", [
          "B ยืนยันชุดแรกด้วย ACK=100 หนึ่งตัว ต่อมาพบช่องว่างที่ไบต์ 100",
          "Segment ที่มาหลังช่องว่างแต่ละตัวทำให้ B ส่ง ACK=100 ซ้ำหนึ่งครั้ง รวม ACK=100 ที่เห็น 4 ตัว โดยตัวหลัง 3 ตัวคือ Duplicate ACK",
          "หลัง Duplicate ACK ตัวที่สาม A ส่ง Seq=100 ยาว 20 ไบต์ซ้ำได้เลย"
        ], "ส่งซ้ำ Seq=100 ก่อน Timeout เพราะฝั่งรับยืนยันซ้ำว่ารอไบต์ 100", {
          diagram: ["ACK=100 ครั้งแรก", "Duplicate ACK #1", "Duplicate ACK #2", "Duplicate ACK #3", "ส่ง Seq=100 ซ้ำ"]
        })
      ]),
      section("tcp-flow-control", source, "50–56", "TCP Flow Control", "เมื่อ IP ส่งข้อมูลเข้าฝั่งรับเร็วกว่า Application อ่านออก คิวใน TCP Receive buffer จะโต Flow control ใช้ Receive window (rwnd) ที่ฝั่งรับประกาศเพื่อให้ผู้ส่งปรับจำนวนไบต์ที่ส่งค้างไว้", [
        ["Receive buffer และ rwnd", "ในภาพ RcvBuffer คือความจุรวม ส่วน rwnd คือพื้นที่ว่างที่เหลือใน Buffer ฝั่งรับประกาศค่านี้ในช่อง Receive window ของ TCP Header"],
        ["ข้อจำกัดผู้ส่ง", "ผู้ส่งดูจำนวนไบต์ที่ส่งแล้วแต่ยังไม่ได้ ACK แล้วจำกัดให้พอดีกับ rwnd ฝั่งรับจึงไม่ถูกข้อมูลใหม่ท่วม ส่วนเพดานตามเครือข่ายต้องดู cwnd ด้วย"],
        ["ค่าที่ตั้งในระบบ", "หน้า 55–56 ยก 4,096 ไบต์เป็นตัวอย่างขนาด RcvBuffer และระบุว่าระบบสามารถตั้งค่าจาก Socket option หรือปรับอัตโนมัติได้"]
      ], [
        example("receive-buffer-backpressure", [51, 52, 53, 54, 55, 56], "Application อ่านช้ากว่าเครือข่ายส่งเข้ามา", "รูป TCP stack มี IP ดันข้อมูลขึ้น Buffer และแอปอ่านขึ้นไปอีกชั้น สไลด์ใช้ภาพน้ำไหลแรงประกอบ แล้วชี้ช่อง Receive window ใน Header", "อธิบายว่าคิวจะเป็นอย่างไร และรูปใช้ข้อมูลอะไรสั่งให้ต้นทางส่งช้าลง", [
          "เมื่ออัตราขาเข้ามากกว่าอัตราที่แอปอ่าน ข้อมูลค้างเพิ่ม ทำให้ส่วนว่างของ RcvBuffer ลดลง",
          "TCP Receiver ประกาศ rwnd ที่เล็กลงใน Header ขากลับ เพื่อแจ้งจำนวนไบต์ที่ยังรับเพิ่มได้",
          "ผู้ส่งจำกัดข้อมูล In-flight ตาม rwnd และรอให้แอประบายข้อมูลเพื่อได้พื้นที่เพิ่ม"
        ], "ลดข้อมูลค้างที่ผู้ส่งตาม rwnd เพื่อรักษาพื้นที่ Buffer ฝั่งรับ", {
          diagram: ["แอปอ่านช้า", "ข้อมูลสะสมใน Receive buffer", "Receiver ประกาศ rwnd ลดลง", "Sender จำกัด In-flight bytes"]
        })
      ]),
      section("tcp-connection-management", source, "57–64", "TCP Connection Management", "ก่อนส่งข้อมูล TCP เริ่มเก็บสถานะร่วมกันด้วย Handshake หรือการแลกข้อความควบคุม Client และ Server ตกลงจุดเริ่ม Sequence ของคนละทิศและรู้ว่าอีกฝั่งตอบกลับได้", [
        ["SYN และ ESTABLISHED", "SYN ใช้เริ่มต้นและซิงก์เลขลำดับ เมื่อทั้งสองฝั่งยืนยันเลขที่ตกลงกันแล้ว Connection จะอยู่ใน ESTABLISHED หรือ ESTAB ตามรูป"],
        ["Half-open Connection", "กรณีที่ฝั่งหนึ่งยังคิดว่า Connection เปิดอยู่ ทั้งที่อีกฝั่งเลิกใช้หรือสูญเสียสถานะไปแล้ว"],
        ["FIN", "FIN ปิดการส่งของฝั่งที่ออก FIN ผู้รับตอบ ACK และยังส่งในทิศกลับได้จนกว่าจะส่ง FIN ของตัวเอง"]
      ], [
        example("tcp-java-socket", [57], "อ่านโค้ด Java ฝั่ง Connect และ Accept", "สไลด์ให้ Client ใช้ชื่อเครื่องกับ Port ส่วน Server เรียก accept() บน welcomeSocket แล้วได้ connectionSocket", "อธิบายอินพุต ขั้นทำงาน และผลที่สองฝั่งได้", [
          "Client ใส่ Hostname และ Port ของ Server ที่เปิดรับอยู่ เมื่อสร้าง Socket แบบนี้ระบบจะพยายามเปิด TCP Connection",
          "Server ใช้ Socket ที่เปิดรอรับอยู่แล้วเรียก accept() เมื่อมี Connection พร้อมใช้งานจะคืน Socket ของ Client รายนั้น",
          "โค้ดทั้งสองฝั่งจึงมี Socket สำหรับส่งและรับ Byte stream ของ Connection นี้ โดย Server ยังใช้ welcomeSocket รับ Client รายอื่นต่อได้"
        ], "ได้ clientSocket และ connectionSocket คนละฝั่งของ TCP Connection เดียวกันเมื่อเชื่อมต่อสำเร็จ", {
          code: "// Client\nSocket clientSocket = new Socket(hostname, portNumber);\n\n// Server\nSocket connectionSocket = welcomeSocket.accept();",
          codeLanguage: "java",
          note: "หน้า PDF 57 พิมพ์ newSocket(\"hostname\", \"port number\") เป็นตัวแทน จึงเขียนตาม Java จริงด้วย new Socket และกำหนดให้ hostname เป็น String, portNumber เป็น int และ welcomeSocket เป็น ServerSocket ที่เปิดพอร์ตไว้"
        }),
        example("two-way-handshake-cases", [58, 59, 60, 61], "ดูสามผลลัพธ์ของ 2-way Handshake", "แบบจำลองให้ Client ส่ง req_conn(x) และ Server ตอบ acc_conn(x) เครือข่ายอาจหน่วง ทำข้อความหาย และทำให้สำเนาที่ส่งซ้ำมาถึงทีหลัง", "เทียบกรณีปกติ การเปิดค้าง และข้อมูลซ้ำตามสามแผนภาพ", [
          "หน้า 59 คำขอและคำตอบมาทันทั้งคู่เข้าสู่ ESTAB แล้ว Server รับ data(x+1) ตามปกติ",
          "หน้า 60 Client ส่ง req_conn(x) ซ้ำก่อน acc_conn(x) ตัวแรกมาถึง สำเนาติดค้างในเครือข่าย พอ Connection เดิมจบแล้ว Server ลืม x สำเนาเพิ่งมาถึง ทำให้ Server เข้า ESTAB ลำพัง",
          "หน้า 61 สำเนา data(x+1) มาถึงตามหลังคำขอเก่า Server จึงอาจรับข้อมูลเดิมอีกครั้งเป็นของ Connection ที่เพิ่งเชื่อว่าเปิดขึ้น"
        ], "ข้อตกลงสองข้อความทำงานในกรณีปกติ แต่สำเนาที่มาช้าอาจทำให้ Server เปิดค้างหรือรับข้อมูลซ้ำ", {
          note: "หน้า PDF 61 ทำเส้นเหตุการณ์ก่อน Connection เดิมจบให้จาง จึงอ่านประกอบกับหน้า PDF 59–60 ก่อน โค้ด req_conn(x) และ ACK(x+1) เป็นสัญลักษณ์ในแบบจำลอง 2-way ของสไลด์"
        }),
        example("tcp-three-way-handshake", [62], "ไล่ SYN, SYN-ACK และ ACK จากโค้ด Python", "ภาพให้ Client ตั้งเลขเริ่มต้น x, Server ตั้งเลขเริ่มต้น y โค้ด Client มี connect() และ Server มี bind(), listen() กับ accept()", "หาเลข ACK ของทั้งสองคำตอบ และบอกว่า accept() คืนอะไร", [
          "Server สร้าง IPv4 Stream socket (SOCK_STREAM), bind กับ Local port แล้ว listen(1) เพื่อรอ Connection โดย 1 เป็นค่า Backlog ที่ส่งให้ระบบ",
          "Client ใช้ (serverName, serverPort) กับ connect() เพื่อขอเปิด Connection แล้วส่ง SYN, Seq=x",
          "Server ได้ SYN จึงส่ง SYN+ACK, Seq=y, ACK=x+1 เพราะ SYN ใช้หนึ่งตำแหน่งในเลขลำดับ",
          "Client ได้ SYN+ACK แล้วส่ง ACK=y+1 โดยใช้ Seq=x+1 ที่เป็นเลขถัดไป ฝั่ง Server เข้า ESTABLISHED เมื่อได้ ACK นี้ แล้ว accept() คืน Socket เฉพาะของ Connection และที่อยู่ Client"
        ], "ลำดับคือ SYN(x) → SYN+ACK(y, x+1) → ACK(y+1) และได้ Socket สำหรับส่ง Byte stream สองทิศ", {
          code: "from socket import AF_INET, SOCK_STREAM, socket\n\n# ฝั่ง Server\nserver_socket = socket(AF_INET, SOCK_STREAM)\nserver_socket.bind(('', server_port))\nserver_socket.listen(1)\nconnection_socket, addr = server_socket.accept()\n\n# ฝั่ง Client ทำงานอีก Process\nclient_socket = socket(AF_INET, SOCK_STREAM)\nclient_socket.connect((server_name, server_port))",
          codeLanguage: "python",
          diagram: ["Client ส่ง SYN, Seq=x", "Server ส่ง SYN+ACK, Seq=y, ACK=x+1", "Client ส่ง ACK=y+1"],
          note: "หน้า PDF 62 เขียน LISTEN ใต้ฝั่ง Client ก่อน connect() ด้วย สำหรับ Active open ให้ถือว่า Client เปลี่ยนจาก CLOSED เป็น SYN-SENT ส่วน Server รอแบบ Passive open จาก LISTEN เป็น SYN-RECEIVED ตาม RFC 9293",
          references: [["RFC 9293 — Establishing a Connection", "https://www.rfc-editor.org/rfc/rfc9293.html#section-3.5"]]
        }),
        example("climbing-handshake", [63], "Three-way Handshake แบบคนปีนผา", "ภาพมีผู้ปีนและคนคุมเชือก พร้อมคำพูด On belay?, Belay on. และ Climbing.", "เทียบว่าข้อความแต่ละประโยคทำหน้าที่อะไร", [
          "ผู้ปีนถามว่าฝั่งคุมเชือกพร้อมหรือยัง เปรียบกับการส่ง SYN เปิดการสื่อสาร",
          "คนคุมเชือกตอบว่าพร้อมแล้ว เปรียบกับ SYN+ACK ที่ตอบคำถามและยืนยันฝั่งตัวเอง",
          "ผู้ปีนบอกว่ากำลังปีนให้คู่สื่อสารรู้ว่ารับคำตอบแล้ว เปรียบกับ ACK สุดท้าย"
        ], "คำพูดที่สามช่วยให้คนคุมเชือกรู้ว่าคำตอบข้อสองถึงอีกฝั่งแล้ว",
        { diagram: ["On belay?", "Belay on.", "Climbing."] }),
        example("tcp-close-fin", [64], "ปิด TCP ทั้งสองทิศด้วย FIN", "สไลด์ให้กติกาว่า Client และ Server ส่ง FIN ปิดฝั่งของตัวเอง พร้อมตอบ ACK ให้ FIN ที่รับ", "ไล่ความหมายของ FIN และ ACK ว่าแต่ละข้อความปิดทิศไหน", [
          "B ตอบ ACK ให้ FIN ของ A ฝั่ง A จบการส่ง แต่ยังรับข้อมูลจาก B ได้",
          "เมื่อ B ส่งข้อมูลของตัวเองหมดจึงส่ง FIN แล้ว A ตอบ ACK ปิดทิศกลับ",
          "ถ้าฝั่ง B พร้อมปิดทันทีสามารถรวม ACK ของ FIN กับ FIN ของตัวเองใน Segment เดียวกัน หรือทั้งสองฝั่งอาจเริ่มส่ง FIN พร้อมกันได้"
        ], "แต่ละฝั่งปิดทิศส่งของตัวเองด้วย FIN และรอ ACK ของอีกฝ่าย")
      ]),
      section("congestion-principles", source, "65–69", "Principles of Congestion Control", "Congestion คือหลายต้นทางพากันส่งจนเครือข่ายรองรับไม่ไหว Router เกิดคิวยาวทำให้ Queueing delay เพิ่ม และเมื่อ Buffer เต็มก็ทิ้ง Packet เพิ่มขึ้น", [
        ["ดูว่าคอขวดอยู่ที่ไหน", "Flow control ดูพื้นที่ Buffer ที่ Receiver ส่วน Congestion control ดูความหนาแน่นบนเส้นทาง เช่น คิวใน Router ภาพหน้า 66 ใช้ถนนแออัดหลายสายเทียบแรงส่งจากหลายต้นทาง และใช้น้ำไหลแรงเข้าเป้าหมายเดียวเทียบฝั่งรับอ่านไม่ทัน"],
        ["End-to-end Congestion Control", "ปลายทางอนุมานความแออัดจากสิ่งที่เห็นเอง เช่น Packet loss หรือ Delay เพิ่ม"],
        ["Network-assisted Congestion Control", "Router ส่งหรือทำเครื่องหมาย Feedback โดยตรง ระดับความแออัดหรืออัตราส่งที่ควรใช้ขึ้นกับโปรโตคอล ตัวอย่างในสไลด์คือ TCP ECN, ATM และ DECbit"]
      ], [
        example("implicit-explicit-congestion", [66, 67, 68], "อ่านลูกศร Feedback เมื่อคิวใน Router เริ่มเต็ม", "รูปสองแบบแสดงข้อมูลวิ่งจากต้นทางและ ACK วิ่งกลับ แบบที่สองมีลูกศร Explicit congestion info จาก Router เพิ่ม", "บอกว่าแต่ละแบบเรียนรู้ความแออัดจากไหน และแก้ปัญหาคนละจุดกับ Flow control อย่างไร", [
          "ถ้าภาพมีเฉพาะข้อมูลและ ACK ให้ปลายทางสังเกต Loss หรือ Delay เอง วิธีนี้คือ End-to-end",
          "ถ้าภาพมีสัญญาณจาก Router ที่มีคิว แนวทางคือ Network-assisted",
          "เหตุการณ์ในรูปเกิดที่ Router ระหว่างเส้นทาง จึงเป็น Congestion control ส่วนกรณีแอปอ่านจาก Socket ช้าในหน้า 51–56 เป็น Flow control"
        ], "ตัวสังเกตแยก End-to-end กับ Network-assisted คือ Feedback จาก Router")
      ]),
      section("aimd-and-cubic", source, "70–77", "TCP Congestion Control: AIMD, Slow Start and CUBIC", "สิ่งที่ TCP ผู้ส่งเปลี่ยนเองคือ cwnd (Congestion window) หรือเพดานจำนวนไบต์ที่ค้างได้ตามสภาพเครือข่าย พอมีข้อมูลให้ส่งต่อเนื่อง ฝั่งรับมีพื้นที่พอ และ RTT คงที่ อัตราส่งคร่าว ๆ คือ cwnd ÷ RTT", [
        ["AIMD", "Additive Increase, Multiplicative Decrease คือการเพิ่ม cwnd ทีละค่าคงที่ แต่หดลงด้วยตัวคูณเมื่อรู้ว่าคอขวดเริ่มแออัด จึงเห็นกราฟรูปฟันเลื่อย"],
        ["Slow start (ตามแบบจำลองในรูป)", "เริ่ม 1 MSS และเพิ่ม cwnd ต่อ ACK จนใกล้โตสองเท่าต่อ RTT เมื่อแตะ ssthresh (Slow-start threshold) จะเปลี่ยนเป็น Congestion avoidance ที่โตประมาณ +1 MSS ต่อ RTT"],
        ["Reno, Fast recovery และ Timeout", "ในแผนภาพหน้า 75 ACK ซ้ำครบสามครั้งให้ส่งซ้ำและเข้า Fast recovery ส่วน Timeout ลด cwnd ลงเหลือ 1 MSS และย้อนกลับ Slow start"],
        ["CUBIC", "เพิ่มหน้าต่างตามเส้นโค้งกำลังสามที่เปลี่ยนความชันตามระยะจากเวลา K ซึ่งเป็นจุดกลับถึงค่า Wmax เดิม"]
      ], [
        example("aimd-sawtooth", [70, 71, 72], "อ่านฟันเลื่อยของ AIMD กับหน้าต่าง cwnd", "กราฟแกนตั้งเป็นอัตราส่ง TCP และแกนนอนเป็นเวลา เส้นไต่ขึ้นทีละน้อยแล้วตกลงในทันที ภาพต่อมาวาดช่วงไบต์ In-flight ในหน้าต่างผู้ส่ง", "บอกว่าเส้นขึ้นและเส้นลงเกิดจากอะไร และอ่านหน่วย cwnd ÷ RTT", [
          "ใน Congestion avoidance จะขยาย cwnd ประมาณ 1 MSS ต่อ RTT ถ้า RTT คงที่ อัตราส่งจึงไต่ขึ้น",
          "เมื่อมีสัญญาณ Loss การลดหน้าต่างตามสัดส่วนทำให้เส้นตกในทันที รูปหน้า 71 ยก Reno ลดประมาณครึ่งหนึ่งเมื่อพบ Triple duplicate ACK และ Timeout ให้กลับไป 1 MSS ตามแบบง่าย",
          "ช่วง In-flight คือ LastByteSent − LastByteAcked ผู้ส่งคุมเพดานด้วย cwnd และ rwnd ถ้า cwnd เป็นตัวจำกัดและยังส่งได้ต่อเนื่อง cwnd หน่วยไบต์หาร RTT หน่วยวินาที จะได้ไบต์ต่อวินาที"
        ], "เพิ่มเป็นเส้นเอียง ลดเป็นสัดส่วนจนได้รูปฟันเลื่อย และใช้ cwnd ÷ RTT ประมาณอัตราส่งในเงื่อนไขที่กำหนด"),
        example("slow-start-threshold", [73, 74, 75], "อ่านกราฟเปลี่ยนจาก Slow Start เป็น Congestion Avoidance", "ภาพหน้า 73 ส่ง 1, 2, 4 Segment ต่อรอบ ส่วนกราฟหน้า 74 มีเส้น Threshold ที่ 8 Segment และกากบาท Loss ที่รอบ 8, cwnd 12 Segment", "ระบุจุดเปลี่ยนช่วงและหาค่า Threshold ใหม่ถ้า Loss ที่กากบาทเป็น Timeout", [
          "อ่านแกนตั้งเป็นขนาด cwnd หน่วย Segment และแกนนอนเป็นรอบส่งข้อมูล จากรอบ 1 ถึง 4 ขนาดโต 1 → 2 → 4 → 8",
          "แตะ ssthresh=8 ในรอบ 4 แล้วเพิ่มแบบเส้นตรงเป็น 9 → 10 → 11 → 12",
          "ถ้ากากบาทเป็น Timeout ให้ใช้ cwnd ก่อน Loss เท่ากับ 12 หาร 2 ได้ ssthresh=6 และกลับเริ่ม cwnd=1 MSS ตามผังหน้า 75"
        ], "จุดเปลี่ยนของกราฟเดิมคือรอบ 4 ที่ 8 Segment ถ้า Timeout ที่ 12 Segment จะได้ ssthresh=6 Segment และ cwnd=1 MSS", {
          note: "หมายเลข 8 และ 12 อ่านจากกราฟหน้า PDF 74 กากบาทบอกตำแหน่ง Loss การคำนวณรอบถัดไปสมมติชนิดเหตุการณ์เป็น Timeout ตามคำถามในสไลด์"
        }),
        example("reno-state-machine", [75], "ไล่สามสถานะในผัง TCP Reno", "รูปเชื่อม Slow start, Congestion avoidance และ Fast recovery ด้วยเหตุการณ์ ACK ใหม่, Duplicate ACK และ Timeout", "หาว่าค่า cwnd กับ ssthresh เปลี่ยนอย่างไรเมื่อได้ ACK ใหม่ พบ ACK ซ้ำครบสาม หรือหมดเวลา", [
          "ใน Slow start, ACK ใหม่เพิ่ม cwnd ทีละ 1 MSS ตามแบบในรูป พอ cwnd ถึง ssthresh จึงเข้า Congestion avoidance",
          "ใน Congestion avoidance, ACK ใหม่เพิ่ม cwnd ทีละ MSS × (MSS/cwnd) ซึ่งรวม ๆ ได้ประมาณ 1 MSS ต่อ RTT",
          "เมื่อ Duplicate ACK ครบสาม ให้ตั้ง ssthresh เป็นครึ่ง cwnd เดิม ตั้ง cwnd ชั่วคราวเป็น ssthresh + 3 MSS ส่ง Segment ที่หายซ้ำแล้วเข้า Fast recovery",
          "ระหว่าง Fast recovery, Duplicate ACK เพิ่มหน้าต่างอีก 1 MSS ถ้าได้ ACK ที่ยืนยันข้อมูลใหม่ให้ลดลงเป็น ssthresh และกลับ Congestion avoidance ส่วน Timeout ให้ตั้งเกณฑ์ใหม่ ลด cwnd เหลือ 1 MSS ส่งซ้ำ และเข้า Slow start"
        ], "ชนิดของ ACK และการหมดเวลาเป็นตัวกำหนดทั้งการส่งซ้ำและสถานะถัดไป", {
          note: "หน้า PDF 75 ย่อ ssthresh + 3 โดยนับ 3 Segment เมื่อนับ cwnd เป็นไบต์ให้เขียน ssthresh + 3 MSS ค่าเริ่มต้น 1 MSS และ ssthresh 64 KB เป็นค่าของผังตัวอย่าง",
          references: [["RFC 5681 — TCP Congestion Control", "https://www.rfc-editor.org/rfc/rfc5681.html"]]
        }),
        example("cubic-rate-graph", [76, 77], "อ่านเส้น TCP CUBIC เทียบกับ Reno", "กราฟเส้นประแสดง CUBIC และเส้นทึบแสดง Classic TCP หรือ Reno โดย Wmax คือค่าที่เคยแตะก่อนพบ Loss และ K คือเวลาที่ CUBIC กลับถึงค่านั้น", "บอกว่าช่วงไหน CUBIC ไต่เร็วหรือช้า และอธิบายผลที่เห็นในกราฟ", [
          "หลังลด Window ช่วงที่อยู่ห่างจาก K เส้น CUBIC ไต่เร็ว จึงกลับใกล้ระดับ Wmax เร็วในตัวอย่าง",
          "พอใกล้ K เส้นแบนลงเพราะต้องค่อย ๆ ลองใกล้อัตราที่ก่อนหน้านี้ทำให้เกิด Loss",
          "เมื่อผ่าน K และยังไม่มี Loss เส้นชันขึ้นอีกเพื่อสำรวจความจุเพิ่ม รูปหน้า 76 เปรียบให้เห็นพื้นที่ใต้เส้นมากขึ้นในกรณีที่ยกมา"
        ], "CUBIC ปรับความชันตามระยะจาก K ส่วนกราฟ Reno ใช้การเพิ่มเป็นเส้นตรงในช่วง Congestion avoidance", {
          note: "หน้า PDF 76–77 ใช้ Wmax เป็นระดับอ้างอิงในกราฟอัตราส่งกับหน้าต่าง สัดส่วน Wmax/2 ในภาพเป็นแบบจำลองเพื่อเทียบรูปทรง"
        })
      ]),
      section("bottleneck-bbr-ecn", source, "78–85", "Bottleneck Link, BBR and ECN", "Bottleneck link คือลิงก์ที่จำกัดความเร็วของ Flow บนเส้นทาง ถ้าลิงก์ส่งเต็มแล้ว การเพิ่มข้อมูลค้างจะเพิ่มคิวและ RTT ส่วน Throughput หรืออัตราข้อมูลที่ส่งถึงจริงจะคงอยู่ใกล้เพดานเดิม", [
        ["BDP (Bandwidth-delay product)", "ปริมาณข้อมูล In-flight พอดีกับการใช้ลิงก์เต็ม คำนวณส่วนแบ่ง Bottleneck bandwidth × min RTT ใช้หน่วย Bit/s × s ได้ Bit หรือ Byte/s × s ได้ Byte"],
        ["BBR (Bottleneck Bandwidth and RTT)", "หาจุดทำงานใกล้ BDP โดยประเมินอัตราที่ข้อมูลถึงปลายทางและ RTT ต่ำสุด แล้วคุมทั้งอัตราส่งและข้อมูล In-flight"],
        ["ECN (Explicit Congestion Notification)", "กลไกที่เครือข่ายทำเครื่องหมายว่าเริ่มแออัด ปลายทางสะท้อนข้อมูลกลับให้ผู้ส่งรู้"]
      ], [
        example("bottleneck-queue", [78, 79, 80], "ส่งเพิ่มเมื่อ Bottleneck Link ส่งเต็มอยู่แล้ว", "ภาพมี Router ตรงทางออกที่ลิงก์คอขวดกำลังทำงานเต็มความจุ R และมี Flow หลายเส้นผ่าน Router นี้ร่วมกัน", "ทำนาย Throughput, RTT และส่วนแบ่งอุดมคติถ้ามี N Flow", [
          "เมื่อทางออกส่งได้สูงสุด R ข้อมูลจากผู้ส่งเพิ่มจะไปเข้าคิวก่อน โดยความจุส่งออกยังอยู่ที่ R",
          "คิวที่ยาวขึ้นทำให้ Queueing delay และ RTT เพิ่ม ถ้า Buffer เต็มก็อาจเสีย Packet",
          "ในแบบจำลองที่ทุก Flow แบ่งเท่ากัน Flow หนึ่งได้ R/N รวม N Flow ใช้ความจุ R พอดี"
        ], "ลิงก์คอขวดกำหนด Throughput รวม พอส่งเต็ม การส่งเพิ่มจะเพิ่ม RTT และความเสี่ยงที่คิวล้น"),
        example("read-bdp-graphs", [81, 82, 83], "หาจุดพอดีจากกราฟ RTT และ Throughput", "กราฟใช้ปริมาณข้อมูล In-flight เป็นแกนนอน กราฟบนวัด RTT กราฟล่างวัด Throughput เส้นแนวตั้งแรกคือ BDP และเส้นที่สองคือจุดใกล้คิวเต็ม", "แยกสามช่วงของกราฟและหาตำแหน่งที่ Loss-based TCP กับ BBR มุ่งทำงาน", [
          "ก่อนถึง BDP ลิงก์ยังมีช่วงว่าง ส่งข้อมูลเพิ่มขึ้นแล้ว Throughput เพิ่มตาม RTT ใกล้ min RTT",
          "ที่ BDP อัตราที่ข้อมูลเข้าคอขวดเท่ากับอัตราที่ลิงก์ส่งออก ลิงก์ทำงานเต็มพอดี",
          "เลย BDP ข้อมูลเพิ่มจะสะสมในคิว ทำให้ RTT สูงขึ้นทั้งที่ Throughput เริ่มราบ จุด Loss-based TCP อยู่ใกล้ด้านคิวเต็ม ส่วน BBR เล็งใกล้จุดเริ่มของช่วงราบ"
        ], "จุดคุ้มในภาพอยู่แถว BDP ซึ่งใช้ความจุได้เต็มและลดการรอในคิว", {
          table: {
            headers: ["In-flight", "Throughput", "RTT"],
            rows: [
              ["ต่ำกว่า BDP", "เพิ่มตามข้อมูลที่ส่ง", "ใกล้ min RTT"],
              ["เท่ากับ BDP", "ถึงความจุที่มีให้ Flow", "ใกล้ min RTT"],
              ["สูงกว่า BDP", "ใกล้เพดานเดิม", "เพิ่มตามเวลาที่รอคิว"]
            ]
          },
          note: "หัวลูกศรด้านขวาในหน้า PDF 82–83 พิมพ์ BDP + queueing delay ทั้งที่แกนนอนเป็นปริมาณข้อมูล อ่านจุดนั้นเป็น BDP + ปริมาณข้อมูลในคิว ถ้าจะแปลงเวลารอเป็นปริมาณข้อมูล ให้คูณด้วยอัตราส่งออกของคิวก่อน"
        }),
        example("bbr-phases", [84], "BBR หาเพดานและวัด min RTT", "สไลด์แบ่งการคุมระยะสั้นเป็น Acceleration, Cruising และ Deceleration ส่วนระยะยาวจะลด In-flight เพื่อวัด RTT ใหม่", "อธิบายว่าแต่ละช่วงกำลังวัดหรือปรับค่าใด", [
          "Acceleration เพิ่มการส่งจน Throughput เริ่มราบ เพื่อหาอัตราที่ลิงก์รองรับให้ Flow นี้",
          "Cruising ส่งใกล้อัตราที่วัดจาก ACK เพื่อใช้ลิงก์ต่อเนื่อง",
          "Deceleration ลด In-flight ให้คิวมีโอกาสระบาย และระยะยาวก็ลดการส่งเป็นช่วงเพื่อวัด min RTT ใหม่"
        ], "สะสมค่าประมาณ Bottleneck bandwidth และ min RTT เพื่อปรับการส่งให้ใกล้จุดที่ลิงก์เต็มพอดี"),
        example("ecn-marking", [85], "ไล่ ECN=10 เป็น ECN=11 และ TCP ECE=1", "ต้นทางส่ง IP Datagram ที่ตั้ง ECN=10 ผ่าน Router ที่เริ่มแออัด ในภาพ Router เปลี่ยน Marking เป็น ECN=11 และยังส่ง Datagram ถึงปลายทาง", "บอกว่า TCP ต้นทางรู้สภาพ Router ได้อย่างไร", [
          "สองบิต ECN อยู่ใน IP Header ตอนต้นทางส่งใช้ค่า 10 ซึ่งบอกว่ารองรับการทำเครื่องหมาย",
          "Router ใช้นโยบายคิวของตัวเองแล้วทำเครื่องหมาย 11 (Congestion Experienced) ให้ Datagram เดินทางถึงปลายทางพร้อมสัญญาณ",
          "ปลายทางใส่ ECE=1 ใน TCP ACK กลับไปให้ผู้ส่งเป็นสัญญาณปรับการส่ง"
        ], "สัญญาณเริ่มที่ IP Header ขาไป และกลับไปถึงผู้ส่งบน ECE Flag ของ TCP ACK", {
          diagram: ["Source ส่ง IP: ECN=10", "Router ทำเครื่องหมาย ECN=11", "Destination รับ IP Datagram", "Destination ตอบ TCP ACK: ECE=1"]
        })
      ]),
      section("tcp-fairness", source, "86–88", "TCP Fairness", "โจทย์ Fairness ในสไลด์ถามว่าหลาย TCP Session ที่ใช้ Bottleneck link ร่วมกันจะแบ่งความจุเท่า ๆ กันได้ไหม เป้าของแบบจำลองคือแบ่งต่อ Session ที่แข่งขัน คล้ายกันทุกเส้น", [
        ["เป้าของกราฟ", "หากมี K Session ใช้ลิงก์ความจุ R เป้าคือ R/K ต่อ Session ภายใต้สมมติฐานในกราฟ เช่น RTT เท่ากัน จำนวน Session คงที่ และอยู่ใน Congestion avoidance"],
        ["UDP และ Parallel TCP", "แอปที่ส่ง UDP อาจตั้งอัตราเองและยอมรับ Loss ส่วนแอปที่เปิด TCP หลาย Connection จะกินหลายส่วนแบ่งเมื่อแบบจำลองแบ่งต่อ Connection"]
      ], [
        example("fairness-two-sessions", [86, 87], "อ่านกราฟการแบ่งอัตราส่งของ TCP สองเส้น", "กราฟใช้ Throughput ของ Connection 1 บนแกนนอน และ Connection 2 บนแกนตั้ง เส้นทแยงขึ้นคือสองเส้นได้เท่ากัน ส่วนเส้นทแยงลงคืออัตรารวมชน R", "ไล่ว่าทำไม Additive increase สลับ Multiplicative decrease จึงมีแนวโน้มเข้าใกล้แบ่งครึ่ง", [
          "เมื่อเพิ่มทั้งสอง Connection เท่ากัน เส้นผ่านกราฟจะมีความชัน 1 และชนเส้นความจุรวม R",
          "เมื่อเกิด Loss แล้วลดทั้งสองลงครึ่งหนึ่ง จุดจะถอยเข้าหาจุดกำเนิด ส่วนต่างสัมบูรณ์ระหว่างสองอัตราจึงลดลงครึ่งหนึ่ง",
          "ทำซ้ำหลายรอบ จุดที่ชนขอบ R จะเข้าใกล้เส้นแบ่งเท่ากันในเงื่อนไขที่ทั้งคู่มี RTT เท่ากันและใช้ AIMD แบบในรูป"
        ], "กราฟอุดมคติอธิบายว่าเป้าสำหรับสอง TCP Session คือ R/2 ต่อ Session"),
        example("parallel-tcp-shares", [88], "คำนวณส่วนแบ่งเมื่อเปิดหลาย TCP Connection", "ลิงก์ความจุ R มี Connection เดิม 9 เส้น หน้า 88 ให้ลองเพิ่ม 1 เส้นกับ 11 เส้น", "หา Throughput รวมของแอปใหม่ ถ้าแต่ละ Connection ได้ส่วนเท่ากัน", [
          "เพิ่ม 1 เส้น จะมีรวม 9 + 1 = 10 แอปใหม่ได้ 1 ส่วนจาก 10 หรือ R/10",
          "เพิ่ม 11 เส้น จะมีรวม 9 + 11 = 20 แอปใหม่ได้ส่วนของ 11 เส้น รวม 11R/20 หรือ 55% ของ R",
          "ถ้าต้องการครึ่งพอดีในแบบจำลองนี้ จำนวนที่เปิดใหม่ต้องเท่ากับจำนวนเดิมที่ 9 เส้น จึงได้ 9R/18 = R/2"
        ], "เปิด 1 เส้นได้ R/10 ส่วนเปิด 11 เส้นได้ 11R/20 เมื่อแบ่งเท่ากันต่อ Connection", {
          note: "หน้า PDF 88 พิมพ์ 9 เดิม + 11 ใหม่ แล้วสรุป R/2 ตัวเลขขัดกันเมื่อใช้สมมติฐานแบ่งเท่าต่อ Connection จึงแสดงผลตามจำนวนที่ให้ไว้"
        })
      ]),
      section("quic-and-throughput", source, "89–94", "Evolving Transport-layer Functionality and TCP Throughput", "Transport ต้องรับมือทั้งเส้นทาง Delay สูง ลิงก์ไร้สาย และงานที่รอผลนานไม่ได้ QUIC เป็น Secure transport ที่วิ่งบน UDP ใช้หลาย Stream ใน Connection เดียว และใช้เป็น Transport สำหรับ HTTP/3", [
        ["โจทย์ของเส้นทางแต่ละแบบ", "ตารางหน้า 90 ชี้ว่า Long fat pipe มีข้อมูลค้างมาก การสูญหายขัด Pipeline ได้ ลิงก์ไร้สายอาจ Loss จากสัญญาณหรือการเคลื่อนที่ ลิงก์ทางไกลมี RTT สูง Data center ไวต่อ Latency และ Background flow ยอมส่งที่ความสำคัญต่ำได้"],
        ["QUIC Stream", "Stream มีลำดับและการกู้ข้อมูลของตัวเอง ขณะเดียวกัน Stream ใน Connection เดียวกันแชร์ Congestion control และการป้องกันข้อมูลของ Connection"],
        ["Head-of-line blocking (HOL blocking)", "เมื่อต้องรอข้อมูลส่วนต้นที่ขาดหายก่อนปล่อยข้อมูลที่มาถึงแล้ว ตัวอย่างนี้เทียบการส่งหลายข้อความบน TCP Byte stream เดียวกับหลาย QUIC Stream"],
        ["Throughput ของฟันเลื่อย", "ถ้า Window ไต่เชิงเส้นจาก W/2 ถึง W, RTT คงที่ มีข้อมูลให้ส่งตลอด และละ Slow start ค่า Window เฉลี่ยจะเป็น 3W/4"]
      ], [
        example("quic-http-stack", [91, 92, 93], "ตาม HTTP Stream บน TCP และบน QUIC", "หน้า 91 เทียบ Stack HTTP/2 → TLS → TCP → IP กับ HTTP/3 → QUIC → UDP → IP หน้า 93 วาด HTTP GET หลายรายการและตำแหน่ง Error", "อธิบายว่าข้อมูลหายหนึ่งจุดจะทำให้หลาย Stream รอหรือเดินหน้าต่อ", [
          "ถ้าข้อมูลหลายรายการอยู่บน TCP Byte stream เดียว ฝั่งแอปอ่านไบต์ที่ตามมาหลังช่วงขาดไม่ได้จน TCP กู้ช่วงนั้นสำเร็จ",
          "QUIC แยก Stream เป็นลำดับของตัวเอง หากข้อมูลของ Stream หนึ่งหาย อีก Stream ที่มีข้อมูลครบยังเดินต่อได้ การสูญ Packet ที่บรรจุข้อมูลหลาย Stream จะหน่วงต่าง Stream ที่อยู่ใน Packet นั้น",
          "QUIC บน UDP เพิ่มการยืนยัน การกู้ข้อมูล การคุมความแออัด และการเข้ารหัสด้วย TLS แผนภาพบอกว่าอาจเริ่มส่งใน 1 RTT หรือ 0 RTT ในกรณีที่เชื่อมต่อซ้ำและมีสถานะพร้อม"
        ], "QUIC ลด Transport-level HOL blocking ข้าม Stream โดยยังรักษาลำดับภายในแต่ละ Stream", {
          diagram: ["HTTP/3 ส่งหลาย Stream", "QUIC จัดลำดับข้อมูลราย Stream", "UDP พา QUIC Packet", "Stream ที่ข้อมูลครบเดินหน้าต่อ"],
          note: "หน้า PDF 93 แสดงภาพซ้าย HTTP/1.1 แต่พื้นที่ภาพขวาว่าง ชั้นข้อความมีป้ายย่อย HTTP/2 with QUIC จึงใช้ Stack HTTP/3 ที่ปรากฏบนหน้า PDF 91 และใช้พฤติกรรม Stream ตามหน้า PDF 92 และ RFC 9000 อธิบายส่วนที่ภาพขาด",
          references: [["RFC 9000 — QUIC Streams และการ Multiplex", "https://www.rfc-editor.org/rfc/rfc9000.html#section-13"]]
        }),
        example("tcp-throughput-sawtooth", [94], "คำนวณ Throughput เฉลี่ยจากกราฟ W/2 ถึง W", "แกนตั้งของฟันเลื่อยแสดง Window ตกลงจาก W เหลือ W/2 เมื่อ Loss แล้วไต่ขึ้นเชิงเส้น W คือขนาด Window หน่วยไบต์ ณ จุดเกิด Loss", "หาอัตราส่งเฉลี่ยเมื่อมีข้อมูลพร้อมตลอด ละช่วง Slow start และให้ RTT คงที่", [
          "ช่วงฟันเลื่อยเพิ่มเชิงเส้นจาก W/2 ไป W จึงใช้ค่าเฉลี่ยของปลายสองด้าน คือ (W/2 + W) ÷ 2",
          "จัดรูปจะได้ Window เฉลี่ย 3W/4 ไบต์ต่อหนึ่งรอบ",
          "หารด้วย RTT หน่วยวินาที จึงเปลี่ยนจากไบต์ต่อรอบเป็นไบต์ต่อวินาที"
        ], "Throughput เฉลี่ย ≈ 3W/(4 × RTT) ไบต์ต่อวินาที ตามสมมติฐานของกราฟ")
      ])
    ],
    exercises: [
      quiz("q1", source, [33, 34, 35], "หา Internet Checksum จากเลขฐานสิบหก", "ให้เลข 16 บิต 0xF0F0 และ 0x2222 จงหา Internet checksum ของข้อมูลสองคำนี้ตามวิธีในสไลด์", [
        "0xEDED",
        "0x1313",
        "0xECEC",
        "0x11312"
      ], 2, [
        "บวก 0xF0F0 + 0x2222 ได้ 0x11312 ซึ่งยังมีตัวทด 1 ข้อ ง จึงเป็นผลบวกก่อนจำกัด 16 บิต",
        "วนทดด้วย 0x1312 + 1 = 0x1313 ก่อนกลับบิต ข้อ ข เป็นค่าระหว่างทาง",
        "กลับบิต 16 บิตของ 0x1313 ได้ 0xECEC ตรงกับข้อ ค ข้อ ก มาจากกลับบิต 0x1312 โดยลืมวนทด"
      ]),
      quiz("q2", source, [40, 45, 46, 49], "นับ Duplicate ACK จากช่องว่าง", "ผู้รับได้ Seq=300 ยาว 12 ไบต์แล้วส่ง ACK ส่วน Seq=312 ยาว 20 ไบต์หาย แต่ Segment ถัดมาอีกสามชุดไปถึงเรียบร้อย ถ้า ACK กลับมาครบและใช้ Fast retransmit ตามสไลด์ ผู้ส่งจะทำอะไร?", [
        "หลังเห็น ACK=312 รวมสี่ตัว ส่ง Seq=312 ซ้ำทันที",
        "หลังเห็น ACK=332 ส่ง Seq=332 ซ้ำทันที",
        "หลังเห็น ACK=312 รวมสามตัว ส่ง Seq=300 ซ้ำทันที",
        "รอ Timeout เพราะ ACK ที่ซ้ำกันใช้นับไม่ได้"
      ], 0, [
        "Seq=300 ยาว 12 ครอบไบต์ 300–311 ผู้รับส่ง ACK=312 ครั้งแรกเพราะไบต์ 312 คือไบต์ถัดไป",
        "ช่องว่างที่ 312 ทำให้ทั้งสาม Segment หลังช่องว่างสร้าง ACK=312 ซ้ำอีกสามตัว รวมสี่ตัว จึงส่ง Seq=312 ซ้ำตามข้อ ก",
        "ข้อ ข ข้ามข้อมูลที่หายไปแล้ว ข้อ ค นับ ACK เดิมเป็น Duplicate ACK และส่งซ้ำช่วงที่ยืนยันแล้ว ส่วนข้อ ง มองข้ามกลไก Fast retransmit"
      ]),
      quiz("q3", source, [53, 54, 55, 56, 72], "หาเพดานจาก rwnd และ cwnd พร้อมกัน", "ฝั่งรับมี Buffer 5,000 ไบต์ ถูกใช้แล้ว 1,700 ไบต์ และประกาศพื้นที่ว่าง ฝั่งส่งมี cwnd=2,400 ไบต์กับข้อมูล In-flight 2,000 ไบต์ สมมติว่าส่ง Segment สั้นได้และยังไม่มี ACK ใหม่ ผู้ส่งเพิ่มข้อมูลได้สูงสุดกี่ไบต์?", [
        "1,300 ไบต์",
        "400 ไบต์",
        "2,400 ไบต์",
        "3,300 ไบต์"
      ], 1, [
        "Receiver มี rwnd = 5,000 − 1,700 = 3,300 ไบต์",
        "ตอนนี้เพดานรวม In-flight คือ min(3,300, 2,400) = 2,400 ไบต์ หัก 2,000 ที่ค้างอยู่จึงเหลือ 400 ไบต์ตามข้อ ข",
        "ข้อ ก หักข้อมูลค้างจาก rwnd อย่างเดียว ข้อ ค ใช้ cwnd ทั้งหมดเสมือนยังไม่มีข้อมูลค้าง ส่วนข้อ ง ใช้พื้นที่ฝั่งรับเต็มโดยข้ามทั้ง cwnd และข้อมูลค้าง"
      ]),
      quiz("q4", source, [57, 60, 61, 62], "เติมเลข ACK ใน Three-way Handshake", "Client ส่ง SYN ที่ Seq=2200 และ Server เลือก Seq เริ่มต้น 700 ถ้าไม่ใส่ข้อมูลใน Handshake ให้หา ACK ใน SYN-ACK ของ Server และ ACK สุดท้ายของ Client ตามลำดับ", [
        "2200 และ 700",
        "701 และ 2201",
        "2202 และ 702",
        "2201 และ 701"
      ], 3, [
        "SYN ของ Client ใช้หนึ่งตำแหน่ง จึงได้ Server ACK=2200+1 = 2201",
        "SYN ของ Server ใช้หนึ่งตำแหน่งในลำดับของ Server จึงได้ Client ACK=700+1 = 701 ตรงกับข้อ ง",
        "ข้อ ก ลืมว่า SYN ใช้ตำแหน่งหนึ่ง ข้อ ข สลับทิศของ ACK และข้อ ค บวกสองครั้งให้ SYN เดียว"
      ]),
      quiz("q5", source, [70, 72, 94], "แปลง Window เฉลี่ยให้เป็น Throughput", "ในแบบจำลองฟันเลื่อยให้ W=12,000 ไบต์ และ RTT=40 ms ข้อมูลพร้อมส่งตลอด RTT คงที่ และละ Slow start อัตรา Throughput เฉลี่ยคือเท่าใด?", [
        "300,000 ไบต์ต่อวินาที",
        "150,000 ไบต์ต่อวินาที",
        "225,000 ไบต์ต่อวินาที",
        "225 ไบต์ต่อวินาที"
      ], 2, [
        "กราฟไต่เชิงเส้นจาก 6,000 ถึง 12,000 ไบต์ จึงใช้ค่าเฉลี่ย 3W/4 = 9,000 ไบต์",
        "แปลง RTT 40 ms เป็น 0.040 วินาทีแล้วหาร 9,000 ÷ 0.040 = 225,000 ไบต์ต่อวินาที ตรงข้อ ค",
        "ข้อ ก ใช้ Window สูงสุด ข้อ ข ใช้ Window ต่ำสุด ส่วนข้อ ง หารด้วย 40 โดยยังไม่ได้แปลงมิลลิวินาที"
      ])
    ],
    checklist: [
      "อ่านความยาว UDP Header และคำนวณ Checksum แบบ 16 บิตให้ครบทั้งทดวนกลับและกลับบิต",
      "ไล่ Seq และ Cumulative ACK ในตัวอย่าง Telnet และในกรณี ACK แรกหายได้",
      "นับ Triple duplicate ACK แยกจาก ACK เดิมและระบุข้อมูลที่ต้องส่งซ้ำได้",
      "ไล่ SYN, SYN-ACK, ACK พร้อมบอกว่า connect() และ accept() รับอะไรและคืนอะไร",
      "หาจำนวนไบต์ที่ส่งเพิ่มได้จาก rwnd, cwnd และ In-flight bytes และอธิบายสาเหตุที่ค่าหนึ่งลดได้แม้อีกค่าคงเดิม",
      "ชี้ช่วง Slow start, Congestion avoidance, ตำแหน่ง BDP และคำนวณ Throughput เฉลี่ยพร้อมหน่วย",
      "อธิบายว่า ECN ส่งสัญญาณกลับอย่างไร และเหตุใด Packet loss บน QUIC อาจกระทบเฉพาะบาง Stream"
    ]
  });
})();
