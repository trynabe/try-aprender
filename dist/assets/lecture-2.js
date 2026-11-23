window.ITDS211 ??= [];
window.ITDS211.push({
  id: "process",
  number: 2,
  codeLanguage: "c",
  title: "Process",
  thaiTitle: "โปรเซสและการทำงานของโปรแกรม",
  totalPages: 41,
  summary: "ตามรอยโปรแกรมจากไฟล์บนดิสก์จนเป็นโปรเซสที่ OS จัดการ ฝึกอ่านสถานะและ PCB แล้วไล่ผลของ fork(), wait() และ exec() ก่อนดูว่า System Call และ Timer Interrupt พา CPU กลับไปทำงานใน Kernel อย่างไร",
  sections: [
    {
      id: "process-abstraction",
      title: "จาก Program ไปเป็น Process",
      pages: "3–11",
      summary: "Program คือคำสั่งและข้อมูลที่เตรียมไว้ ส่วน Process คือการรันโปรแกรมหนึ่งครั้งพร้อมสถานะที่เปลี่ยนไป เช่น ตำแหน่งคำสั่งปัจจุบัน ตัวแปร และไฟล์ที่เปิด โปรแกรมไฟล์เดียวกันจึงมีหลายโปรเซสได้",
      points: [
        ["Program", "ชุดคำสั่งและข้อมูล เช่น ไฟล์โปรแกรมบนดิสก์"],
        ["Process", "อินสแตนซ์ที่กำลังดำเนินงาน มี PID, Address Space และสถานะประจำตัว"],
        ["Machine state", "ค่าที่ต้องจำเพื่อรันต่อ เช่น Registers, Program Counter (PC), Stack Pointer (SP) และสถานะ I/O"],
        ["Process monitor", "เครื่องมือดูโปรเซส เช่น Task Manager, Activity Monitor และ top"]
      ],
      examples: [
        {
          id: "baking-analogy",
          title: "สูตรเค้กกับการอบเค้ก",
          pages: [5],
          prompt: "ในภาพมีสูตร คนอบ วัตถุดิบ และเตาอบ ส่วนใดแทน Program ส่วนใดแทน Process?",
          steps: [
            "สูตรกำหนดลำดับขั้นล่วงหน้า จึงแทน Program",
            "คนอบรับสูตรและวัตถุดิบไปใช้กับเตา เปรียบได้กับ OS ที่เริ่มงานด้วยข้อมูลเข้าและทรัพยากร",
            "กิจกรรมลงมืออบเค้กแต่ละครั้งคือ Process มีสถานะของตัวเองว่าทำถึงตรงไหนแล้ว"
          ],
          answer: "สูตรเดียวใช้อบได้หลายครั้ง เช่นเดียวกับไฟล์โปรแกรมเดียวที่เปิดเป็นหลายโปรเซสได้",
          table: {
            headers: ["ในภาพ", "ในระบบ"],
            rows: [
              ["สูตร", "Program"],
              ["วัตถุดิบ", "Input"],
              ["เตาอบ", "Resources"],
              ["คนอบ", "Operating system"],
              ["การอบแต่ละครั้ง", "Process"]
            ]
          }
        },
        {
          id: "disk-to-process",
          title: "โหลดคำสั่งและข้อมูลจากดิสก์ไปยัง Process",
          pages: [6],
          prompt: "ภาพมี Program บนดิสก์และ Process ในหน่วยความจำ เมื่อสั่งรัน OS เตรียมอะไรเพิ่มจากไฟล์เดิม?",
          steps: [
            "ไฟล์โปรแกรมมีคำสั่งและข้อมูลเริ่มต้นที่บันทึกไว้",
            "OS เตรียม Address Space โดยแมปคำสั่งและข้อมูล รวมถึงพื้นที่ Heap และ Stack",
            "โปรเซสมี PC, Registers และข้อมูลสถานะสำหรับรันคำสั่งบน CPU"
          ],
          answer: "ตัวไฟล์เป็นต้นแบบ ส่วนโปรเซสมีหน่วยความจำและสถานะของการรันหนึ่งครั้ง",
          diagram: ["Disk · Program", "OS · Loader", "Memory · Process", "CPU · รันคำสั่ง"]
        },
        {
          id: "address-space",
          title: "ตัวแปรและคำสั่งอยู่ตรงไหนของ Address Space?",
          pages: [7, 8],
          prompt: "โปรแกรมมีคำสั่ง C, global ตัวหนึ่ง, buffer ที่จองด้วย malloc() และตัวแปรภายในฟังก์ชัน แต่ละอย่างตรงกับส่วนใดในภาพ?",
          steps: [
            "จับคู่คำสั่งกับ Text และตัวแปร global กับส่วนข้อมูล",
            "จับคู่หน่วยความจำที่ขอระหว่างรันด้วย malloc() กับ Heap ในภาพจำลอง",
            "จับคู่ข้อมูลการเรียกฟังก์ชัน เช่น return address และตัวแปรภายใน กับ Stack ในภาพจำลอง",
            "สถานะโปรเซสยังมี Registers เช่น EAX/EBX บน x86, PC, Stack Pointer และ Frame Pointer รวมถึงข้อมูลไฟล์ที่เปิด"
          ],
          answer: "Text เก็บคำสั่ง ส่วน Data, Heap และ Stack เก็บข้อมูลคนละหน้าที่ เมื่อโปรเซสพัก OS จึงต้องรักษาทั้งหน่วยความจำและค่าที่ CPU ใช้อยู่",
          table: {
            headers: ["ส่วนในภาพ", "ตัวอย่าง"],
            rows: [
              ["Text", "คำสั่งของโปรแกรม"],
              ["Data", "ตัวแปร global หรือ static"],
              ["Heap", "พื้นที่ที่จองแบบไดนามิกระหว่างรัน"],
              ["Stack", "ข้อมูลการเรียกฟังก์ชัน ตัวแปรภายใน และ return address"]
            ]
          },
          note: "ภาพเป็นแบบจำลองของ Address Space ตัวอย่างหนึ่ง Compiler อาจเก็บค่าบางตัวใน Register และตำแหน่งจริงขึ้นกับระบบ"
        },
        {
          id: "scheduler-process-flow",
          title: "Scheduler เลือกงานจากโปรเซสหลายตัวใน RAM",
          pages: [9],
          prompt: "ภาพ Process Execution มีโปรแกรมบนดิสก์ โปรเซสใน RAM ตาราง Thread และ Scheduler ชิ้นส่วนเหล่านี้ทำงานร่วมกันอย่างไร?",
          steps: [
            "โปรแกรมบนดิสก์มีชุดคำสั่ง เมื่อเริ่มรัน OS สร้างโปรเซสพร้อม Thread ที่รันคำสั่งได้",
            "Scheduler พิจารณางานที่พร้อมรัน การจัดลำดับอาจใช้ Priority ตามนโยบายของ OS",
            "เมื่อถึงเวลาหรือมีเหตุให้หยุดงานเดิมชั่วคราว OS ทำ Context Switch เพื่อให้ CPU รันงานที่เลือก"
          ],
          answer: "Scheduler เลือกว่าใครได้รัน ส่วน Context Switch เก็บสถานะของงานเดิมและโหลดสถานะของงานที่ได้รันต่อ",
          diagram: ["Program บนดิสก์", "Process และ Thread", "Scheduler", "CPU"]
        },
        {
          id: "read-process-monitors",
          title: "อ่าน Task Manager, Activity Monitor และ top",
          pages: [10, 11],
          prompt: "ถ้าเครื่องช้า จะหาว่าโปรเซสใดใช้ CPU หรือ RAM มากจากหน้าจอในสไลด์อย่างไร?",
          steps: [
            "บน Windows เปิด Task Manager แล้วดูคอลัมน์ CPU, Memory, Disk และ Network",
            "บน macOS ใช้ Activity Monitor ดูชื่อ, % CPU, CPU Time, Threads และ PID",
            "บน Linux ใช้ top ดู %CPU, %MEM, PID, สถานะ S และ COMMAND เพื่อระบุงานที่สนใจ"
          ],
          answer: "ใช้ทรัพยากรเป็นเกณฑ์ค้นหาแล้วตรวจชื่อและ PID เพื่อแยกโปรเซสหลายตัวที่ใช้โปรแกรมชื่อเดียวกัน",
          note: "เปอร์เซ็นต์ในหน้าจอเป็นค่าที่วัดในช่วงหนึ่ง โปรเซสที่ใช้ CPU ต่ำอาจยังใช้ RAM หรือกำลังรอ I/O"
        }
      ]
    },
    {
      id: "process-state-and-pcb",
      title: "การสร้างโปรเซส สถานะ และ PCB",
      pages: "12–19",
      summary: "โปรเซสอาจกำลังใช้ CPU (Running), พร้อมใช้ CPU (Ready) หรือรอเหตุการณ์ (Blocked) OS ใช้ Process Control Block จดข้อมูลของแต่ละรายการ รวมถึงสถานะและตำแหน่งที่ต้องกลับไปรัน",
      points: [
        ["Process API", "เริ่มและจบโปรเซส รอโปรเซสลูก พักหรือทำต่อ และอ่านสถานะหรือสถิติ"],
        ["Ready", "มีสิ่งที่ต้องใช้สำหรับรันแล้ว กำลังรอ CPU"],
        ["Blocked", "กำลังรอเหตุการณ์ เช่น อ่านดิสก์เสร็จ ให้ CPU ตอนนี้ก็ยังทำงานต่อไม่ได้"],
        ["Process table และ PCB", "Process table ช่วยค้นรายการด้วย PID แต่ละ PCB เก็บข้อมูลจัดตาราง หน่วยความจำ และไฟล์ของโปรเซสนั้น"]
      ],
      examples: [
        {
          id: "process-creation",
          title: "OS เตรียมอะไรเมื่อเปิดโปรแกรมจาก Shell?",
          pages: [12, 13],
          prompt: "ไล่จากคำสั่งเริ่มโปรแกรมไปจนถึงตอนที่โปรแกรมเริ่มรันฟังก์ชันหลัก",
          steps: [
            "OS เตรียม Address Space และแมป Code, Data, Heap และ Stack ตามรูปแบบของโปรแกรม",
            "เตรียมช่อง I/O มาตรฐาน โดยปกติ file descriptor 0 คือ stdin, 1 คือ stdout และ 2 คือ stderr",
            "OS กำหนดจุดเริ่มของ Executable ให้โปรเซสรัน Runtime ของ C ตั้งค่าที่จำเป็น แล้วเรียก main()",
            "Scheduler ให้ CPU กับโปรเซสเมื่อถูกเลือก"
          ],
          answer: "ต้องมีทั้งหน่วยความจำ บริบทของ CPU และช่อง I/O เพื่อให้โปรแกรมรันได้จริง",
          note: "ใน Unix โปรเซสลูกมักรับ file descriptor จากโปรเซสแม่ Shell สามารถเปลี่ยนปลายทางของช่องเหล่านี้ได้ เช่น ส่ง stdout ไปที่ไฟล์"
        },
        {
          id: "state-transitions",
          title: "พร้อมรัน รันอยู่ และรอ I/O สลับกันอย่างไร?",
          pages: [14],
          prompt: "โปรเซสได้รับ CPU จากนั้นเริ่มอ่านไฟล์และต้องรอจนอ่านเสร็จ ไล่สถานะที่เกิดขึ้น",
          steps: [
            "เมื่อ Scheduler เลือก Ready จะเปลี่ยนเป็น Running",
            "ถ้าคำขออ่านยังทำต่อไม่ได้ Running จะเปลี่ยนเป็น Blocked",
            "เมื่อการอ่านเสร็จ โปรเซสกลับไป Ready และมีสิทธิ์ถูกเลือกไป Running อีกครั้ง",
            "ถ้า OS หยุดโปรเซสเพราะหมดช่วงเวลาที่จัดให้ โดยโปรเซสไม่ได้รอเหตุการณ์ จะกลับ Running → Ready"
          ],
          answer: "หลัง I/O เสร็จโปรเซสจะพร้อมรัน การได้ CPU ทันทีขึ้นกับ Scheduler",
          diagram: ["Ready", "Running", "Blocked", "Ready"]
        },
        {
          id: "two-process-timeline",
          title: "อ่านตารางเวลา Process 0 และ Process 1",
          pages: [15],
          prompt: "สไลด์แสดงสองโปรเซสในช่วงเวลา 1–10 อธิบายว่าใครใช้ CPU ขณะที่ Process 0 รอ I/O และทำไม Process 0 ยังไม่รันทันทีเมื่อ I/O เสร็จ",
          steps: [
            "เวลา 1–3 ให้ Process 0 รัน และเริ่ม I/O ตอน 3 ส่วน Process 1 ยัง Ready",
            "เวลา 4–6 Process 0 Blocked จึงให้ Process 1 ใช้ CPU",
            "เวลา 7 I/O เสร็จ Process 0 กลับเป็น Ready ในตาราง Process 1 ยังรันต่อถึงเวลา 8",
            "เวลา 9–10 Process 0 กลับมาใช้ CPU เพราะ Process 1 จบแล้ว และ Process 0 จบที่เวลา 10"
          ],
          answer: "Process 1 ใช้ CPU ในเวลา 4–8 ส่วน Process 0 ใช้ CPU ในเวลา 1–3 และ 9–10",
          table: {
            headers: ["เวลา", "Process 0", "Process 1", "เหตุการณ์"],
            rows: [
              ["1–2", "Running", "Ready", "Process 0 ใช้ CPU"],
              ["3", "Running", "Ready", "Process 0 เริ่ม I/O"],
              ["4–6", "Blocked", "Running", "Process 1 ใช้ CPU ระหว่างรอ I/O"],
              ["7", "Ready", "Running", "I/O ของ Process 0 เสร็จ"],
              ["8", "Ready", "Running", "Process 1 จบเมื่อสิ้นช่วง"],
              ["9–10", "Running", "จบแล้ว", "Process 0 รันต่อจนจบ"]
            ]
          }
        },
        {
          id: "pcb-process-table",
          title: "ตาม PID ไปยังข้อมูล Process Control Block",
          pages: [16, 17, 18],
          prompt: "ในภาพ Process Table เก็บหมายเลข PID และตัวอ้างอิง PCB เมื่อ OS สลับออกจาก Process 1 ต้องเปิดดูข้อมูลส่วนใด?",
          steps: [
            "หา PCB ของ Process 1 จากตัวอ้างอิงใน Process Table",
            "บันทึกสถานะการรันและใช้ข้อมูล PC, SP และ Registers เพื่อกลับมารันต่อในภายหลัง",
            "ใช้ข้อมูล Priority และ CPU Time ในการจัดตาราง รวมทั้งข้อมูล Address Space และรายการไฟล์เปิดในการให้บริการโปรเซส"
          ],
          answer: "PID ใช้ระบุโปรเซส ส่วน PCB เป็นที่เก็บสถานะและข้อมูลทรัพยากรของโปรเซสนั้น",
          table: {
            headers: ["ข้อมูลใน PCB", "ตัวอย่างจากภาพ"],
            rows: [
              ["Process management", "PID, Parent PID, Registers, PC, Status Word, SP, State, Priority, Process Group, Signals และ CPU Time"],
              ["Memory management", "ข้อมูลหรือตัวชี้ส่วน Text, Data และ Stack"],
              ["File management", "Root Directory, Working Directory, File Descriptors, User ID และ Group ID"]
            ]
          }
        },
        {
          id: "xv6-struct-proc",
          title: "อ่าน struct proc ในตัวอย่าง xv6",
          pages: [19],
          prompt: "ในโค้ดสไลด์มี state, pid, parent, context, tf และ ofile แต่ละส่วนช่วย OS ทำอะไร?",
          steps: [
            "อ่าน pid และ parent เพื่อรู้ว่าเป็นโปรเซสใดและมาจากโปรเซสแม่ตัวไหน",
            "อ่าน state รายการ RUNNABLE, RUNNING และ SLEEPING ตรงกับ Ready, Running และ Blocked ในแบบจำลอง ส่วน ZOMBIE คือโปรเซสที่จบแล้วและรอให้เก็บผลการจบ",
            "ดู context สำหรับสลับการทำงานส่วน Kernel และ tf หรือ Trap Frame สำหรับสถานะที่เก็บตอนเข้า Kernel",
            "ดู mem, sz, kstack, ofile และ cwd เพื่อหาข้อมูลหน่วยความจำ Kernel Stack ไฟล์ที่เปิด และไดเรกทอรีปัจจุบัน"
          ],
          answer: "โค้ด xv6 แสดงให้เห็นว่า PCB รวมข้อมูลหลายด้านของโปรเซส ค่า Registers สำหรับ Context Switch เป็นเพียงส่วนหนึ่ง",
          code: `// ตัดเฉพาะฟิลด์ที่ใช้ติดตามตัวอย่าง
struct proc {
    char *mem;
    unsigned int sz;
    char *kstack;
    enum proc_state state;
    int pid;
    struct proc *parent;
    struct context context;
    struct trapframe *tf;
};`,
          note: "ชื่อฟิลด์และค่าของ state ในสไลด์เป็นของ xv6 รุ่นตัวอย่าง ระบบอื่นอาจจัดเก็บข้อมูลชุดเดียวกันในโครงสร้างต่างกัน"
        }
      ]
    },
    {
      id: "unix-process-api",
      title: "UNIX Process API และตัวอย่างภาษา C",
      pages: "21–28",
      summary: "fork() สร้างโปรเซสลูกที่เริ่มต่อจากจุดเรียก wait() ให้โปรเซสแม่รอลูก และกลุ่ม exec() โหลดโปรแกรมใหม่เข้าโปรเซสเดิม เรียงสามแนวคิดนี้ให้ถูก แล้วอ่านผลจากโปรแกรมที่สร้างโปรเซสได้ง่ายขึ้น",
      points: [
        ["fork()", "คืน PID ลูกให้โปรเซสแม่ คืน 0 ให้โปรเซสลูก และคืน -1 เมื่อสร้างลูกไม่สำเร็จ"],
        ["wait() และ waitpid()", "รอและรับผลของลูกโดยตรงครั้งละหนึ่งตัว แบบ waitpid() เลือก PID ที่ต้องการได้"],
        ["exec()", "แทนที่ Program Image ในโปรเซสเดิม เมื่อสำเร็จโปรแกรมใหม่เริ่มทำงาน ส่วนโค้ดที่เรียก exec() จะไม่ทำต่อ"],
        ["PID และ PPID", "getpid() อ่าน PID ของผู้เรียก และ getppid() อ่าน PID ของโปรเซสแม่"]
      ],
      examples: [
        {
          id: "fork-two-returns",
          title: "fork() ครั้งเดียว ทำไมได้ค่ากลับสองแบบ?",
          pages: [22, 23],
          prompt: "สมมติตัวอย่างในสไลด์ใช้ PID แม่ 2326 และ PID ลูก 2327 แต่ละฝั่งได้ค่าจาก fork() เท่าไร และจะพิมพ์ว่าอะไร?",
          steps: [
            "ก่อนถึง fork() มีโปรเซสแม่ 2326 เพียงตัวเดียว",
            "หลังสร้างสำเร็จ แม่ได้ค่ากลับ 2327 จึงรู้ PID ของลูก ส่วนลูกได้ค่ากลับ 0 และอ่าน PID จริงของตัวเองด้วย getpid()",
            "ลูกอ่าน PPID ได้ 2326 ขณะที่แม่รอให้ลูกจบ โปรแกรมตัวอย่างให้แม่พิมพ์บางบรรทัดก่อนเรียก waitpid() ดังนั้นข้อความสองฝั่งสลับลำดับกันได้"
          ],
          answer: "ค่าที่เก็บจาก fork() คนละแบบจึงใช้เลือกทางเดินใน if ได้ โดย 0 ในฝั่งลูกหมายถึงทางเดินของลูก ส่วน PID จริงของลูกคือ 2327 ในการรันตัวอย่าง",
          code: `#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void) {
    printf("Before fork: pid=%ld\\n", (long)getpid());
    fflush(stdout);
    pid_t child = fork();
    if (child < 0) {
        perror("fork");
        return 1;
    }
    if (child == 0) {
        printf("Child: pid=%ld ppid=%ld\\n",
               (long)getpid(), (long)getppid());
        return 0;
    }
    printf("Parent: pid=%ld child=%ld\\n",
           (long)getpid(), (long)child);
    return waitpid(child, NULL, 0) < 0 ? 1 : 0;
}`
        },
        {
          id: "wait-orders-output",
          title: "ให้ลูกพิมพ์ก่อนแม่ด้วย waitpid()",
          pages: [24],
          prompt: "สไลด์บอกว่าใช้ wait() บังคับให้ลูกพิมพ์ก่อน การวางคำสั่งรอไว้ตำแหน่งใดจึงจะได้ผล?",
          steps: [
            "ให้ฝั่งลูกพิมพ์ Child ก่อนจบ",
            "ให้ฝั่งแม่เรียก waitpid(child, NULL, 0) ก่อนพิมพ์ Parent",
            "เมื่อการรอสำเร็จ ลูกจบแล้ว แม่จึงพิมพ์ Parent ตามหลัง"
          ],
          answer: "ลำดับมาจากการวาง waitpid() ก่อนคำสั่งพิมพ์ของแม่ ถ้าแม่พิมพ์ก่อนรอ ลำดับระหว่างข้อความของทั้งสองฝั่งขึ้นกับ Scheduler",
          code: `/* ใน main() หลัง fork() สำเร็จ */
if (child == 0) {
    puts("Child");
    return 0;
}
if (waitpid(child, NULL, 0) < 0) {
    perror("waitpid");
    return 1;
}
puts("Parent");`
        },
        {
          id: "fork-loop-count",
          title: "fork() ก่อนลูป แล้ว fork() ในลูปอีกสองรอบ",
          pages: [25],
          prompt: "เริ่มจากหนึ่งโปรเซส เรียก fork() หนึ่งครั้งก่อนเข้า for แล้วทุกโปรเซสที่ไปถึงแต่ละรอบเรียก fork() อีกครั้ง ถ้าสำเร็จทุกครั้ง จะมีโปรเซสทั้งหมดกี่ตัวและพิมพ์ 42 กี่ครั้ง?",
          steps: [
            "ก่อนเรียก fork() มี 1 ตัว หลัง fork() นอกลูปมี 2 ตัว ทั้งสองตัวเดินต่อเข้าลูป",
            "ที่รอบ i = 0 แต่ละตัวสร้างลูกอีกหนึ่งตัว รวม 2 × 2 = 4 ตัว พิมพ์ข้อความของรอบนี้ 4 ครั้ง",
            "ที่รอบ i = 1 ทั้งสี่ตัวสร้างลูกอีกหนึ่งตัว รวม 4 × 2 = 8 ตัว พิมพ์ข้อความของรอบนี้ 8 ครั้ง",
            "หลังลูปทั้งแปดตัวเดินผ่าน wait(NULL) และไปถึงคำสั่งพิมพ์ 42 โปรเซสที่ไม่มีลูกให้รอจะผ่านไปหลัง wait() รายงานข้อผิดพลาด"
          ],
          answer: "มีโปรเซสทั้งหมดที่เกิดขึ้น 8 ตัว รวมตัวเริ่มต้น 1 ตัว จึงสร้างลูกใหม่ 7 ตัว และมีการพิมพ์ 42 ทั้งหมด 8 ครั้ง ลำดับข้อความอาจเปลี่ยนเมื่อรันซ้ำ",
          table: {
            headers: ["จุดในโปรแกรม", "จำนวนโปรเซสที่มาถึงหลัง fork()", "จำนวนครั้งที่พิมพ์ของจุดนั้น"],
            rows: [
              ["ก่อนเข้าลูป", "2", "2"],
              ["หลัง fork() ใน i = 0", "4", "4"],
              ["หลัง fork() ใน i = 1", "8", "8"],
              ["หลังลูป", "8 ตัวจะเดินมาถึง", "42 จำนวน 8 ครั้ง"]
            ]
          },
          code: `#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void) {
    pid_t result = fork();
    if (result < 0) return 1;
    printf("First fork returned %ld\\n", (long)result);

    for (int i = 0; i < 2; ++i) {
        fflush(stdout);
        result = fork();
        if (result < 0) return 1;
        printf("Round %d: fork returned %ld\\n", i, (long)result);
    }

    (void)wait(NULL); /* สาธิตการรอลูกหนึ่งตัวแบบในสไลด์ */
    puts("42");
    return 0;
}`,
          note: "wait(NULL) หนึ่งครั้งเก็บผลลูกโดยตรงได้หนึ่งตัว การรอให้ลูกทุกตัวเสร็จต้องรอแยกตาม PID หรือเรียกซ้ำจนไม่มีลูก คำสั่ง return 0 จาก main() ใช้จบโปรแกรมตามปกติ"
        },
        {
          id: "parent-child-memory",
          title: "ทำไมลูกแก้ x แล้ว x ของแม่ยังค่าเดิม?",
          pages: [26, 28],
          prompt: "หลัง fork() ค่า x เริ่มที่ 10 ถ้าลูกเพิ่ม x อีก 2 แต่แม่ไม่ได้แก้ x แต่ละฝั่งจะเห็นค่าเท่าไร?",
          steps: [
            "ตอน fork() เนื้อหาหน่วยความจำแบบส่วนตัวเริ่มเหมือนกัน ทั้งแม่และลูกจึงเห็น x = 10",
            "ลูกมี Address Space และ PCB ของตัวเอง เมื่อลูกทำ x += 2 ค่าของลูกกลายเป็น 12",
            "แม่ยังเห็น x = 10 แม้ waitpid() จะรอให้ลูกทำงานจนเสร็จ"
          ],
          answer: "ลูกพิมพ์ 12 แม่พิมพ์ 10 ถ้าต้องการส่งข้อมูลระหว่างโปรเซส ต้องเลือกกลไกสื่อสารหรือหน่วยความจำที่ตั้งใจแชร์",
          note: "ระบบสามารถใช้ Copy-on-Write เพื่อลดการคัดลอกทางกายภาพ การแยกพื้นที่ส่วนตัวยังให้ผลเหมือนแต่ละฝั่งมีสำเนาของตัวเอง"
        },
        {
          id: "exec-replaces-image",
          title: "ให้ลูกเปลี่ยนไปเป็น ls ด้วย exec()",
          pages: [27, 28],
          prompt: "ในสไลด์ลูกเพิ่ม x จาก 10 เป็น 12 แล้วเรียก ls ถ้า exec() สำเร็จ ลูกยังใช้ PID เดิมหรือไม่ โค้ดบรรทัดถัดจาก exec() จะทำงานไหม?",
          steps: [
            "แม่เรียก fork() แล้วได้ลูกตัวใหม่ ลูกพิมพ์ค่า x = 12 และส่งข้อความที่ค้างใน stdout ออกก่อน",
            "ลูกเรียก execlp() ให้โหลด ls โดยส่งชื่อโปรแกรมเป็น argv[0] และ /home เป็น argv[1]",
            "เมื่อสำเร็จ โปรแกรม ls เริ่มในลูกด้วย PID เดิม โปรแกรม C เดิมของลูกถูกแทนที่และไม่พิมพ์บรรทัดถัดจาก execlp()",
            "แม่รอลูกจบ แล้วพิมพ์ x ของตัวเองซึ่งยังเป็น 10"
          ],
          answer: "fork() เป็นจุดที่สร้าง PID ลูก ส่วน exec() เปลี่ยนโปรแกรมที่ลูกกำลังรัน ถ้า exec() คืน -1 ค่อยเข้าส่วนรายงานข้อผิดพลาด",
          code: `#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void) {
    int x = 10;
    pid_t child = fork();
    if (child < 0) return 1;
    if (child == 0) {
        x += 2;
        printf("Child x=%d\\n", x);
        fflush(stdout);
        execlp("ls", "ls", "/home", (char *)NULL);
        perror("execlp");
        return 1;
    }
    if (waitpid(child, NULL, 0) < 0) return 1;
    printf("Parent x=%d\\n", x);
    return 0;
}`,
          note: "สไลด์วาง /home เป็นอาร์กิวเมนต์ชื่อโปรแกรม ตำแหน่งนั้นคือ argv[0] หากต้องการทำงานเทียบกับ ls /home ให้แยกชื่อ ls และเส้นทาง /home คนละอาร์กิวเมนต์ตามตัวอย่าง"
        },
        {
          id: "exec-variants",
          title: "เลือก execl(), execv(), execvp() และแบบอื่นในสไลด์",
          pages: [28],
          prompt: "ถ้ามี argv เป็นอาร์เรย์ ต้องการค้น ls จาก PATH และใช้ Environment เดิม เลือกฟังก์ชันใด?",
          steps: [
            "มองตัว v เมื่อส่ง argv เป็นอาร์เรย์ และตัว l เมื่อส่งอาร์กิวเมนต์เรียงทีละตัว",
            "มองตัว p เมื่อต้องการค้น PATH โดยส่งชื่อไฟล์ที่ไม่มีเครื่องหมาย /",
            "มองตัว e เมื่อต้องการส่ง envp เพื่อกำหนด Environment ของโปรแกรมใหม่"
          ],
          answer: "ใช้ execvp() เพราะรับ argv เป็นอาร์เรย์ ค้น PATH และใช้ Environment เดิม",
          table: {
            headers: ["รูปแบบในสไลด์", "อาร์กิวเมนต์และการค้นหา"],
            rows: [
              ["execl()", "ลิสต์ทีละตัว ระบุ path"],
              ["execv()", "อาร์เรย์ argv ระบุ path"],
              ["execlp()", "ลิสต์ทีละตัว ค้น PATH เมื่อใช้ชื่อไฟล์"],
              ["execvp()", "อาร์เรย์ argv ค้น PATH เมื่อใช้ชื่อไฟล์"],
              ["execle()", "ลิสต์ทีละตัว ระบุ path และ envp"],
              ["execvpe()", "อาร์เรย์ argv ค้น PATH และรับ envp"]
            ]
          },
          note: "หกรูปแบบนี้เป็นฟังก์ชันกลุ่ม exec ที่สไลด์เลือกมาอธิบาย execvpe() เป็นส่วนขยายของ GNU และค้น PATH จาก Environment ของผู้เรียก"
        }
      ]
    },
    {
      id: "system-calls",
      title: "User Mode, Kernel Mode และ System Call",
      pages: "30–36",
      summary: "โปรเซสใช้คำสั่งทั่วไปบน CPU ได้โดยตรงใน User Mode ถ้าต้องการบริการที่ต้องใช้งานทรัพยากรผ่าน OS จะเรียก System Call เพื่อให้ Kernel ทำงานที่อนุญาต แล้วคืนผลกลับไป",
      points: [
        ["Limited Direct Execution", "ให้แอปรันบน CPU โดยตรงด้วยสิทธิ์จำกัด ทำงานได้เร็วโดยที่ Kernel ยังควบคุมทรัพยากรสำคัญ"],
        ["User Mode และ Kernel Mode", "โหมดกำหนดสิทธิ์ของคำสั่งบน CPU โค้ดแอปรันใน User Mode ส่วน Kernel ทำคำสั่งที่ต้องใช้สิทธิ์สูงกว่าได้"],
        ["Trap และ handler", "คำสั่งเรียกบริการพา CPU เข้า Kernel ส่วน Trap Table ช่วยระบุโค้ดที่รับเหตุการณ์นั้น"],
        ["Standard C library", "บางฟังก์ชันจัดข้อมูลหรือทำ Buffer ใน User Mode ก่อนส่งงานผ่าน System Call"]
      ],
      examples: [
        {
          id: "dual-mode-io",
          title: "แอปอ่านดิสก์โดยขอให้ Kernel ทำงานให้",
          pages: [30, 31],
          prompt: "ถ้าให้แอปรันคำสั่งบน CPU เอง เหตุใดแอปยังต้องเรียก OS เมื่อขออ่านไฟล์?",
          steps: [
            "แอปคำนวณหรือจัดข้อมูลทั่วไปใน User Mode",
            "การเข้าถึงทรัพยากรที่ OS ดูแลต้องผ่าน System Call CPU เปลี่ยนเข้า Kernel Mode ตามจุดเข้าที่กำหนดไว้",
            "Kernel ตรวจคำขอและสิทธิ์ ทำงานที่อนุญาต แล้วคืนผลให้แอปใน User Mode"
          ],
          answer: "สิทธิ์อยู่ที่ Kernel ทำงานตามคำขอของแอป เมื่อคืนผลแอปกลับไปรันด้วยสิทธิ์เดิม",
          diagram: ["User Mode · แอป", "System Call", "Kernel Mode · Handler", "User Mode · รับผล"],
          note: "เลข mode bit ในภาพเป็นค่าตามแบบจำลอง สถาปัตยกรรมจริงกำหนดระดับสิทธิ์ด้วยรายละเอียดต่างกัน"
        },
        {
          id: "system-call-families",
          title: "จับคู่งานกับ System Call ที่เกี่ยวข้อง",
          pages: [32],
          prompt: "จากรายชื่อในสไลด์ ถ้าต้องเปิดไฟล์ รอลูก หรืออ่านรหัสผู้ใช้ ควรนึกถึง API กลุ่มใด?",
          steps: [
            "งานไฟล์ใช้ open(), read(), write() และ close() ตามลำดับของงาน",
            "งานโปรเซสใช้ fork(), exec(), wait() และ getpid() ตามความต้องการ ส่วน kill() ใช้ส่งสัญญาณและ signal() ใช้กำหนดการจัดการสัญญาณ",
            "งานไดเรกทอรี จุดเมานต์ ลิงก์ และสิทธิ์ใช้ API เช่น chdir(), mount(), link(), unlink(), getuid(), setuid() และ chown()"
          ],
          answer: "ชื่อ API แยกได้ตามทรัพยากรที่ขอใช้ เช่น wait() รอโปรเซสลูก ส่วน getuid() อ่านรหัสผู้ใช้จริงของโปรเซส",
          table: {
            headers: ["กลุ่มงาน", "ตัวอย่างและหน้าที่"],
            rows: [
              ["ไฟล์", "open() เปิด, read() อ่าน, write() เขียน, close() ปิด file descriptor"],
              ["โปรเซส", "fork() สร้างลูก, exec() แทนโปรแกรม, wait() รับผลลูก, getpid() อ่าน PID"],
              ["สัญญาณ", "kill() ส่งสัญญาณ, signal() กำหนดการรับมือสัญญาณ"],
              ["เส้นทาง", "link() สร้าง hard link, unlink() ลบชื่อที่ลิงก์, mount() เมานต์ระบบไฟล์, chdir() เปลี่ยนไดเรกทอรี"],
              ["สิทธิ์", "getuid() อ่าน UID จริง, setuid() เปลี่ยน UID เมื่อได้รับอนุญาต, chown() เปลี่ยนเจ้าของไฟล์"]
            ]
          },
          note: "บางชื่อเป็นฟังก์ชันที่ Library ให้เรียก และอาจไปใช้ System Call ที่มีชื่ออื่นใน Kernel"
        },
        {
          id: "stdio-to-write",
          title: "printf() จัดรูปแบบข้อความก่อนส่งไป write()",
          pages: [32, 33],
          prompt: "ภาพให้แอปเรียก printf() เพื่อส่งข้อความออกจอ ฟังก์ชันนี้ทำงานร่วมกับ write() อย่างไร?",
          steps: [
            "printf() จัดรูปแบบข้อความใน Library และอาจเก็บผลไว้ใน Buffer ของ stdout",
            "เมื่อมีการ Flush เช่น เรียก fflush(stdout) หรือเมื่อ Buffer ถึงเงื่อนไขที่กำหนด Library ส่งข้อมูลผ่าน write() หรือกลไกระดับล่างที่เทียบเท่า",
            "Kernel ส่งข้อมูลไปยังปลายทางของ File Descriptor เช่น Terminal หรือไฟล์ที่ Shell Redirect ไว้"
          ],
          answer: "Library ทำหน้าที่จัดรูปแบบและจัดการ Buffer ส่วน System Call ทำให้ข้อมูลออกไปยังทรัพยากรที่ Kernel ดูแล",
          table: {
            headers: ["I/O ระดับล่างในสไลด์", "ตัวอย่างฟังก์ชัน Library ที่เกี่ยวข้อง"],
            rows: [
              ["open()", "fopen()"],
              ["close()", "fclose()"],
              ["read()", "fread(), getchar(), scanf(), fscanf(), getc(), fgetc(), fgets()"],
              ["write()", "fwrite(), putchar(), printf(), fprintf(), putc(), fputc(), puts(), fputs()"],
              ["lseek()", "fseek()"]
            ]
          },
          note: "หนึ่ง Library Call อาจไม่ต้องเข้า Kernel ทันทีเพราะมี Buffer ฟังก์ชัน gets() ที่ปรากฏในสไลด์อ่านข้อมูลเกินขนาด Buffer ได้ ควรใช้ fgets() ที่จำกัดขนาดแทน"
        },
        {
          id: "read-trap",
          title: "ตาม read() จากแอป ผ่าน Trap แล้วกลับมา",
          pages: [34],
          prompt: "ถ้าโปรเซสเรียก read(fd, buffer, 8) เพื่อขออ่านสูงสุด 8 ไบต์ ตัวเลขและข้อมูลเดินทางผ่านส่วนใดบ้าง?",
          steps: [
            "แอปเตรียม fd, ที่อยู่ buffer และจำนวนไบต์ แล้วเรียกฟังก์ชัน read() ของ Library",
            "Wrapper วางเลข System Call และอาร์กิวเมนต์ตามกติกาของสถาปัตยกรรม ก่อนใช้คำสั่งเข้าสู่ Kernel",
            "Kernel Dispatch ส่งงานไปยัง Handler ของ read() ซึ่งตรวจ fd และ Buffer แล้วอ่านข้อมูลตามที่ทำได้",
            "Kernel คืนค่าผ่านทางออกจาก Trap และ Wrapper กลับไปยังโปรแกรมผู้เรียก"
          ],
          answer: "ค่าบวกคือจำนวนไบต์ที่อ่านได้จริงและอาจน้อยกว่า 8 สำหรับไฟล์ทั่วไป 0 คือถึงท้ายไฟล์ และ -1 คือข้อผิดพลาด",
          diagram: ["แอปเรียก read()", "Library Wrapper", "Kernel Dispatch", "Read Handler", "คืนผลให้แอป"],
          note: "หัวภาพวาง nbytes ไว้ก่อน buffer แต่ลำดับของ POSIX C คือ read(fd, buffer, nbytes) ส่วนการใช้ Stack หรือ Register ขึ้นกับ ABI"
        },
        {
          id: "boot-trap-lifecycle",
          title: "จากการตั้ง Trap Table ถึงคำสั่งหลัง System Call",
          pages: [35, 36],
          prompt: "ทำไม CPU รู้ว่าจะเข้าฟังก์ชันไหนใน Kernel และรู้ว่าจะกลับมารันแอปจากตรงไหน?",
          steps: [
            "ตอน Boot OS ตั้ง Trap Table หรือโครงสร้างเทียบเท่าเพื่อระบุ Handler ของเหตุการณ์ เช่น System Call และคีย์บอร์ด Interrupt",
            "เมื่อเริ่มโปรเซส OS เตรียมหน่วยความจำ User Stack และบริบทเริ่มต้น ก่อนเข้า User Mode",
            "เมื่อแอปเรียก System Call ฮาร์ดแวร์กับโค้ดทางเข้า Kernel บันทึกสถานะที่จำเป็นบน Kernel Stack แล้วไปยัง Handler",
            "หลัง Handler ทำงาน เคอร์เนลคืนค่าบริบทและใช้ทางออกจาก Trap เพื่อให้ CPU รันต่อจากจุดหลังการเรียก หากโปรเซสจบผ่าน exit() Kernel จะจัดการทรัพยากรและสถานะการจบแทน"
          ],
          answer: "ตำแหน่ง Handler มาจากตารางที่ตั้งไว้ล่วงหน้า ตำแหน่งที่ผู้เรียกจะรันต่อมาจากบริบทที่ถูกเก็บระหว่างเข้า Kernel"
        }
      ]
    },
    {
      id: "context-switching",
      title: "Timer Interrupt และ Context Switch",
      pages: "38–41",
      summary: "Kernel ต้องได้ CPU กลับมาแม้โปรเซสจะทำลูปต่อเนื่องและไม่ยอมคืนเวลาเอง Timer Interrupt เปิดโอกาสให้ Scheduler ตัดสินใจ ถ้าเปลี่ยนโปรเซสจริง OS จะบันทึกบริบทของโปรเซสเดิมและกู้บริบทของโปรเซสถัดไป",
      points: [
        ["Yield, Block, Wait, Exit", "เหตุที่โปรเซสส่งการควบคุมกลับไปให้ OS เช่น ยอมสละ CPU, รอ I/O, รอลูก หรือจบงาน"],
        ["Timer Interrupt", "ตัวจับเวลาส่งสัญญาณให้ CPU เข้าสู่ Interrupt Handler ตามการตั้งของ OS"],
        ["Context Switch", "การสลับสิ่งที่ CPU กำลังรัน โดยรักษาจุดทำงานของงานเดิมไว้และดึงของงานใหม่กลับมาใช้"],
        ["Mode switch", "การเปลี่ยนสิทธิ์การรันเข้า Kernel หรือกลับ User Mode ซึ่งสามารถเกิดขึ้นขณะยังอยู่ในโปรเซสเดิม"]
      ],
      examples: [
        {
          id: "infinite-loop-timer",
          title: "โปรเซสติดลูปไม่จบ ทำไม OS ยังได้ CPU คืน?",
          pages: [38, 39],
          prompt: "สมมติ Process A รัน while (1) และไม่เรียก System Call ถ้า OS รอให้โปรเซสคืน CPU เอง Process B จะได้รันไหม?",
          steps: [
            "ตอน Boot OS ตั้งตำแหน่ง Timer Handler และเริ่มใช้ตัวจับเวลา",
            "เมื่อถึงเวลาที่ตั้งไว้ ฮาร์ดแวร์ส่ง Timer Interrupt แม้ A จะยังอยู่ในลูป",
            "CPU เข้า Kernel ระหว่างจัดการ Interrupt และ Scheduler ตัดสินใจว่าจะรัน A ต่อหรือเลือก B"
          ],
          answer: "Timer Interrupt ทำให้ OS ได้ตัดสินใจโดยไม่ต้องรอ A ยอมคืน CPU การเกิด Interrupt เปิดโอกาสให้สลับ แต่ผลขึ้นกับ Scheduler"
        },
        {
          id: "save-restore-ab",
          title: "บันทึก A แล้วกลับไปทำ B ต่อจากเดิม",
          pages: [40, 41],
          prompt: "ในภาพ A ถูกขัดจังหวะและ OS ต้องกลับไปทำ B ต่อ ทำไม B ไม่เริ่มทำตั้งแต่บรรทัดแรกทุกครั้ง?",
          steps: [
            "A รันใน User Mode เมื่อ Timer Interrupt มาถึง ฮาร์ดแวร์และโค้ดทางเข้าของเคอร์เนลบันทึกสถานะ A ไว้ใน Kernel Stack ของ A",
            "Kernel รัน Interrupt Handler จากนั้น Scheduler เลือก B และเรียกกลไกสลับบริบท",
            "บันทึกบริบทฝั่ง Kernel ของ A โหลดบริบทฝั่ง Kernel ของ B และเปลี่ยนไปใช้ Kernel Stack ของ B",
            "ทางออกจาก Trap กู้บริบท User Mode ของ B รวมถึง PC และ SP จึงกลับไปยังจุดที่ B ทำค้างไว้"
          ],
          answer: "B รันต่อจากค่าของ PC ที่เคยบันทึกไว้และใช้ Stack ของตัวเอง ส่วนสถานะ A ยังอยู่เพื่อกลับมารันภายหลัง",
          diagram: ["A รัน", "Timer Interrupt", "เก็บ A และเลือก B", "กู้ Registers, SP และ PC ของ B", "B รันต่อ"],
          note: "ถ้า Kernel จัดการ Interrupt หรือ System Call แล้วกลับสู่โปรเซสเดิม จะเกิดการเปลี่ยนโหมด แต่ไม่จำเป็นต้องเกิด Context Switch ไปยังโปรเซสอื่น"
        }
      ]
    }
  ],
  exercises: [
    {
      id: "practice-process-address-space",
      title: "เปิดโปรแกรมจากไฟล์เดียวกันสองครั้ง",
      pages: [5, 6, 7, 8, 16, 17],
      prompt: "เปิดโปรแกรมเดียวกันเป็นโปรเซส A และ B ตามผัง Address Space ในสไลด์ จงเลือกส่วนที่เก็บคำสั่งคำนวณ, ตัวแปร global total, พื้นที่ที่จองด้วย malloc() และ Return Address ตามลำดับ เมื่อ A เขียน total เป็น 50 ค่าของ B จะเปลี่ยนไหม?",
      choices: [
        "Text, Heap, Data, Stack และ total ของ B คงเดิม",
        "Text, Data, Heap, Stack และ total ของ B คงเดิม",
        "Text, Data, Stack, Heap และ total ของ B คงเดิม",
        "Text, Data, Heap, Stack และ total ของ B เปลี่ยนเป็น 50"
      ],
      correctChoice: 1,
      steps: [
        "คำสั่งคำนวณเป็นส่วน Text ส่วน global total อยู่ใน Data ของแต่ละโปรเซส",
        "พื้นที่เก็บข้อมูลที่ขอจาก malloc() อยู่ใน Heap ตามแบบจำลอง ส่วน Return Address ของการเรียกฟังก์ชันอยู่ใน Stack",
        "A และ B เป็นการรันคนละครั้ง ระบบแยก PID และเก็บข้อมูลติดตามโปรเซสผ่าน PCB ของแต่ละตัว",
        "total ในโจทย์เป็นหน่วยความจำส่วนตัวของแต่ละโปรเซส A เขียนของ A ได้โดยไม่มีผลต่อ total ของ B"
      ],
      answer: "คำสั่งอยู่ Text, global total อยู่ Data, พื้นที่ที่จองอยู่ Heap และ Return Address อยู่ Stack ส่วน total ของ B ยังเท่าเดิม"
    },
    {
      id: "practice-process-state-trace",
      title: "เติมสถานะหลัง Block, I/O Done และ Yield",
      pages: [14, 15],
      prompt: "มี CPU หนึ่งคอร์และมีเพียง A กับ B หลังเหตุการณ์เวลา 1, 2 และ 3 ทันที แต่ละตัวมีสถานะอะไร? แต่ละวงเล็บเรียงสถานะ (A, B)",
      choices: [
        "(Blocked, Running) / (Running, Ready) / (Running, Ready)",
        "(Ready, Running) / (Ready, Running) / (Running, Ready)",
        "(Blocked, Running) / (Ready, Running) / (Running, Blocked)",
        "(Blocked, Running) / (Ready, Running) / (Running, Ready)"
      ],
      correctChoice: 3,
      tablePrompt: {
        headers: ["เวลา", "เหตุการณ์"],
        rows: [
          ["0", "A และ B พร้อมรัน Scheduler เลือก A"],
          ["1", "A ต้องรอ I/O และ Scheduler ให้ B รัน"],
          ["2", "I/O ของ A เสร็จ ขณะที่ B ได้รันต่อ"],
          ["3", "B ส่งคืน CPU ด้วย yield และ Scheduler เลือก A"],
          ["4", "A จบโปรแกรม แล้ว Scheduler ให้ B รัน"]
        ]
      },
      steps: [
        "เวลา 0 มี A ใช้ CPU และ B รอคิว",
        "เวลา 1 A รอผล I/O จึง Blocked ส่วน B รับ CPU",
        "เวลา 2 A ทำงานต่อได้อีกครั้งจึง Ready แต่ B รันต่อเพราะในโจทย์ไม่สลับ CPU ตอน I/O เสร็จ",
        "เวลา 3 B ส่งคืน CPU ทั้งที่ยังพร้อมทำงาน จึง Ready ขณะที่ A ได้รัน",
        "เวลา 4 A จบ และ B จาก Ready กลับเป็น Running"
      ],
      answer: "ช่วงที่ A เป็น Blocked คือหลังเหตุการณ์เวลา 1 ส่วนหลังเวลา 2 A เป็น Ready และได้ CPU อีกครั้งหลังเวลา 3",
      table: {
        headers: ["เวลาหลังเหตุการณ์", "A", "B"],
        rows: [
          ["0", "Running", "Ready"],
          ["1", "Blocked", "Running"],
          ["2", "Ready", "Running"],
          ["3", "Running", "Ready"],
          ["4", "จบแล้ว", "Running"]
        ]
      }
    },
    {
      id: "practice-fork-wait-exec-output",
      title: "ทายลำดับข้อความจาก fork(), exec() และ waitpid()",
      pages: [22, 23, 24, 26, 27, 28],
      prompt: "ข้อใดระบุข้อความแต่ละบรรทัดบน stdout ตามลำดับและจำนวนโปรเซสใหม่ได้ถูกต้อง? สมมติว่า fork(), execlp() และ waitpid() สำเร็จ, PATH หาโปรแกรม echo เจอ และไม่มีข้อความอื่นแทรก",
      choices: [
        "C 7, OK, P 3 · สร้าง 1 โปรเซส",
        "C 7, OK, P 7 · สร้าง 1 โปรเซส",
        "P 3, C 7, OK · สร้าง 1 โปรเซส",
        "C 7, OK, P 3 · สร้าง 2 โปรเซส"
      ],
      correctChoice: 0,
      codePrompt: `#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void) {
    int x = 3;
    pid_t child = fork();
    if (child < 0) return 1;

    if (child == 0) {
        x += 4;
        printf("C %d\\n", x);
        fflush(stdout);
        execlp("echo", "echo", "OK", (char *)NULL);
        puts("X");
        return 1;
    }

    if (waitpid(child, NULL, 0) < 0) return 1;
    printf("P %d\\n", x);
    return 0;
}`,
      steps: [
        "fork() ทำให้มีลูกหนึ่งตัว ลูกได้ค่าคืน 0 และแม่ได้ PID ของลูก โค้ดจึงแยกไปคนละทาง",
        "ลูกแก้ x จาก 3 เป็น 7 ใน Address Space ของลูก แล้วพิมพ์ C 7 การเรียก fflush(stdout) ส่งบรรทัดนี้ออกก่อนเปลี่ยนโปรแกรม",
        "execlp() โหลด echo เข้าโปรเซสลูกเดิม echo จึงพิมพ์ OK ส่วน puts() ที่อยู่ถัดจาก execlp() ในโปรแกรมเก่าไม่ทำงาน",
        "แม่รอลูกผ่าน waitpid() ก่อนพิมพ์ ค่า x ในแม่ยังเป็น 3 จึงพิมพ์ P 3 เป็นบรรทัดสุดท้าย"
      ],
      answer: "ได้ C 7 จากนั้น OK และสุดท้าย P 3 คนละบรรทัด มีโปรเซสใหม่ 1 ตัวจาก fork() รวมกับแม่เป็น 2 ตัว"
    },
    {
      id: "practice-read-returns",
      title: "ขออ่าน 8 ไบต์เมื่อไฟล์เหลือ 3 ไบต์",
      pages: [31, 32, 33, 34, 36],
      prompt: "มี file descriptor ที่เปิดอ่านไฟล์ปกติได้ ตำแหน่งอ่านอยู่ก่อนท้ายไฟล์ 3 ไบต์ และ buf มีพื้นที่อย่างน้อย 8 ไบต์ โปรแกรมเรียก read(fd, buf, 8) สองครั้งติดกันโดยไม่มีข้อผิดพลาดหรือการแก้ไฟล์แทรก ข้อใดระบุค่าที่คืนและการเปลี่ยนโหมดได้ถูกต้อง?",
      choices: [
        "คืน 3 และ 0 โดยอยู่ใน User Mode ตลอด",
        "คืน 8 และ 0 โดยเข้า Kernel Mode แล้วกลับ User Mode",
        "คืน 3 และ 0 โดยเข้า Kernel Mode แล้วกลับ User Mode",
        "คืน 3 และ −1 โดยเข้า Kernel Mode แล้วกลับ User Mode"
      ],
      correctChoice: 2,
      steps: [
        "8 คือจำนวนสูงสุดที่ขออ่าน Library ส่งคำขอเข้า Kernel เพื่อให้ Handler ตรวจ fd และเข้าถึงไฟล์",
        "ครั้งแรกอ่านข้อมูลที่เหลือ 3 ไบต์ลง buf แล้วคืนค่า 3 ตำแหน่งอ่านขยับไปถึงท้ายไฟล์",
        "ครั้งที่สองที่ตำแหน่งท้ายไฟล์ไม่มีข้อมูลให้อ่านเพิ่ม Handler จึงคืน 0",
        "ทั้งสองครั้งเริ่มจากโปรแกรมใน User Mode ทำคำขอใน Kernel Mode แล้วคืนค่ากลับสู่ User Mode"
      ],
      answer: "read() ครั้งแรกคืน 3 และครั้งที่สองคืน 0 การคืน 0 ในโจทย์หมายถึงถึงท้ายไฟล์"
    },
    {
      id: "practice-context-resume",
      title: "Timer Interrupt แล้ว CPU จะอ่านคำสั่งของใครต่อ?",
      pages: [38, 39, 40, 41],
      prompt: "A กำลังรันบนคอร์เดียว หลัง Timer Interrupt จุดที่ A จะรันต่อคือ PC = 0x1200 ส่วน B พร้อมรันและมี PC ที่เก็บไว้เป็น 0x2040 เมื่อกลับ User Mode ข้อใดระบุบริบทและ PC ถูกต้องทั้งกรณีที่ Scheduler เลือก B และที่เลือก A?",
      choices: [
        "เลือก B กู้บริบท B ที่ 0x2040 เลือก A กู้บริบท A ที่ 0x1200",
        "เลือก B ใช้ PC ของ A ที่ 0x1200 เลือก A ใช้ PC ของ B ที่ 0x2040",
        "เลือก B เริ่มจากคำสั่งแรกของโปรแกรม เลือก A กู้ PC ที่ 0x1200",
        "เลือก B กู้ PC ที่ 0x2040 เลือก A รันต่อที่ 0x1200 โดยข้าม Kernel Mode"
      ],
      correctChoice: 0,
      steps: [
        "เมื่อเกิด Interrupt ระบบบันทึกสถานะของ A ที่จำเป็นต่อการรันต่อ เช่น PC, SP และ Registers",
        "ถ้าเลือก B กลไก Context Switch เก็บบริบท Kernel ของ A แล้วเปลี่ยนไปใช้บริบทและ Kernel Stack ของ B",
        "เมื่อลดระดับสิทธิ์กลับ User Mode ให้กู้สถานะของ B CPU จึงเริ่มจาก PC = 0x2040",
        "ถ้าเลือก A ให้คืนสถานะของ A และรันต่อที่ 0x1200 เส้นทางยังเข้าและออก Kernel แต่ไม่ต้องเปลี่ยนไปใช้บริบทของ B"
      ],
      answer: "เลือก B แล้วรันต่อที่ 0x2040 เลือก A แล้วรันต่อที่ 0x1200 สถานะที่ใช้คืนมาคู่กับโปรเซสที่ได้ CPU"
    }
  ]
});
