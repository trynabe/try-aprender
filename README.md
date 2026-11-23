# Try-Aprender

by trynabe

เว็บทบทวนบทเรียนภาษาไทยพร้อมสรุป ตัวอย่าง แบบฝึกหัด และตัวติดตามความคืบหน้าที่บันทึกในเบราว์เซอร์

## วิชาที่อยู่ในเว็บ

- Computer System Lecture
- Website Technology Lecture & Lab
- Computer Network Lecture
- Software Engineer Lecture
- Reading Skills Lecture

## เปิดใช้งาน

รันจากโฟลเดอร์โปรเจกต์ด้วย Python 3.10 ขึ้นไป

```powershell
python serve-local.py
```

แล้วเปิดเบราว์เซอร์ที่ [localhost:4173](http://localhost:4173/)

- `dist/` เก็บหน้าเว็บ ไฟล์ JavaScript และ CSS รวมถึงไฟล์ฝึกของ Website Technology
- `reading-sources/` เก็บข้อความถอดจากเอกสารสำหรับดัชนี Reading Skills
- `serve-local.py` เปิดเว็บและให้บริการข้อความถอดเอกสารบนเครื่อง เครื่องที่มีโฟลเดอร์ `computer network` (โฟลเดอร์ย่อย `lecture`), `software engineering` (โฟลเดอร์ย่อย `lecture`) และ `reading english` วางไว้ข้างโฟลเดอร์โปรเจกต์ สามารถเปิด PDF ต้นฉบับของวิชาเหล่านี้ผ่านเว็บในเครื่องได้ด้วย
