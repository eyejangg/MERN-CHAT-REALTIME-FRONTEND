<div align="center">
  <h1>🌐 MERN-CHAT-REALTIME-FRONTEND</h1>
  <p>หน้าบ้าน (Frontend) สำหรับแอปพลิเคชันแชทแบบ Real-time สร้างตัวกับ React, Vite, Tailwind CSS และใช้ Zustand จัดการ State</p>
</div>

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **React & Vite**: สร้างระบบ SPA ที่โหลดอย่างรวดเร็ว (ฝั่ง Client)
- **Zustand**: บริหารจัดการ State ที่เกี่ยวข้องกับ User (AuthStore) และ Message (ChatStore) อย่างมีประสิทธิภาพ
- **Socket.IO-client**: เป็นฝั่งสายเชื่อมต่อข้อมูล Real-time แจ้งคนออนไลน์และดึงแชทให้ลื่นไหล
- **Tailwind CSS + DaisyUI**: เขียนดีไซน์หน้าตาโปรเจกต์ให้สวยเนียนตา แบบ Utility-first
- **Axios**: ส่ง Request ยิง API ไปยัง Backend พร้อมทั้งแนบ HttpOnly Cookie ฝังไปให้อัตโนมัติ
- **React-Router-DOM**: ดักจับเปลี่ยนหน้า และป้องกันการเปลี่ยนหน้า (Route Protection)

---

## 🚀 การติดตั้งและเริ่มต้นใช้งาน (Installation & Setup)

1. **Clone โปรเจกต์**
   ```bash
   git clone https://github.com/eyejangg/MERN-CHAT-REALTIME-FRONTEND.git
   cd MERN-CHAT-REALTIME-FRONTEND
   ```

2. **ติดตั้งไลบรารีทั้งหมด**
   ```bash
   npm install
   ```

3. **รันเซิร์ฟเวอร์แบบ Development**
   ```bash
   npm run dev
   ```
   *แอปพลิเคชันจะรันที่ `http://localhost:5173` (หรือตามที่ Vite กำหนด)*

> **ข้อควรระวังเกี่ยวกับการเรียก API:** 
> โปรเจกต์นี้ตั้งค่า `proxy` ในไฟล์ `vite.config.js` เพื่อ Forward ทุกๆ Request `/api` ไปยัง `http://localhost:5000` (Backend API) โดยตรง (ป้องกันปัญหา CORS) 

---

## 📂 โครงสร้างและจุดประสานที่สำคัญ

*   **`src/store`**: ห้องบัญชาการรวมศูนย์! `useAuthStore.js` สำหรับระบบ Authen ทั้งมวล และ `useChatStore.js` สำหรับดึงส่งแชท+Socket.io ฟังชันก์
*   **`src/lib`**: ประกอบด้วยไฟล์คู่ใจ (Axios Base) (Socket Client) (Utility Date Format) ใช้งานได้เลย
*   **`src/App.jsx`**: ตัวจัดการ Routing รวมถึงป้องกัน Routes ต่างๆ เช่นถ้าไม่ล็อกอิน ก็ดันให้กลับไปที่ `LoginPage`

---

## 📚 ตำราเจาะลึกโค้ด (Documentation)

ในโปรเจกต์นี้เราได้มีคู่มือที่เขียนกำกับไว้ให้ใน Directory เพื่อสำหรับศึกษา (Study Guide):
* **`MERN_GUIDE.md`**: คู่มือภาพรวม การสร้างโปรเจกต์ โครงสร้างแอป สรุปรวม Library + Syntax หลัก ทุกสิ่งเชื่อมต่ออย่างไร
* **`SOB.md`**: เจาะลึกคอนเซ็ปต์ภาษา JavaScript/React/การใช้งานไลบรารี (Promise, Async/Await, Zustand) 
