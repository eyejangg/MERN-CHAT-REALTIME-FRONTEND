# 💬 MERN Realtime Chat Application (Frontend)

## 📝 รายละเอียดโปรเจกต์ (Project Overview)
แอปพลิเคชันแชทแบบเรียลไทม์ที่พัฒนาด้วย MERN Stack (ฝั่ง Frontend) รองรับการแชทรายบุคคลแบบทันทีแบบ Real-time พร้อมด้วยระบบจัดการสถานะผู้ใช้ (Online/Offline) และการแสดงผล UI ที่สวยงาม ทันสมัย ใช้งานง่าย

## ✨ ฟีเจอร์หลัก (Key Features)
- **ระบบบัญชีผู้ใช้ (Authentication):** สมัครสมาชิก, เข้าสู่ระบบ, และออกจากระบบอย่างปลอดภัย
- **จัดการอวาตาร์ (Profile Management):** อัปเดตรูปโปรไฟล์ส่วนตัวได้
- **แชทเรียลไทม์ (Real-time Messaging):** รับ-ส่งข้อความและรูปภาพได้ทันทีผ่านการเชื่อมต่อ WebSockets (Socket.io)
- **สถานะการใช้งาน (Online Status):** แสดงสถานะ "ออนไลน์" ของรายชื่อเพื่อนแบบเรียลไทม์และตัวกรองเฉพาะผู้ที่ออนไลน์
- **Skeleton Loading:** แสดง UI หน้าจอการโหลดข้อมูลอย่างเป็นธรรมชาติเพื่อประสบการณ์ผู้ใช้ (UX) ที่ดียิ่งขึ้น
- **สลับธีมแอป (Theme Switching):** รองรับการเปลี่ยนธีมแอปพลิเคชันด้วยชุดสีจาก DaisyUI
- **ระบบแจ้งเตือน (Toast Notifications):** แสดงผลลัพธ์การกระทำหรือข้อผิดพลาดให้ผู้ใช้ทราบอย่างทันท่วงที

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
- **Core:** React.js + Vite (เพื่อความเร็วในการ Build)
- **State Management:** Zustand (จัดการ State ได้รับความนิยมและเบากว่า Redux)
- **Styling:** Tailwind CSS + DaisyUI (เพื่อสร้าง UI Component แบบสวยงามสำเร็จรูป)
- **Icons:** Lucide-React
- **Real-time Engine:** Socket.io-client
- **HTTP Client:** Axios
- **Notifications:** React-Hot-Toast

## 🚀 การติดตั้งและเปิดใช้งาน (Installation & Setup)

1. **โคลนโปรเจกต์ (Clone the repository)**
   ```bash
   git clone <your-repository-url>
   cd MERN-CHAT-REALTIME-FRONTEND
   ```

2. **ติดตั้ง Packages ทั้งหมด**
   ```bash
   npm install
   ```

3. **ตั้งค่าตัวแปรแวดล้อม (Environment Variables)**
   ดัดแปลงไฟล์หรือสร้างไฟล์ `.env` ที่ Root ของโปรเจกต์ (หากมี):
   *(ไม่ต้องใส่ถ้าในโค้ดตั้งค่าเชื่อมไปยัง localhost:5000 อัตโนมัติแล้ว)*

4. **รันเซิร์ฟเวอร์สำหรับการพัฒนา (Run development server)**
   ```bash
   npm run dev
   ```
   จากนั้นเปิดเว็บบราวเซอร์ไปที่ `http://localhost:5173`

## 📂 โครงสร้างโฟลเดอร์ที่สำคัญ (Folder Structure)
- `src/components/` - ส่วนประกอบ UI ต่างๆ เช่น `Sidebar`, `ChatContainer`, `Navbar`, และ `MessageInput`
- `src/components/skeletons/` - UI สำหรับการโหลดข้อมูล เช่น `SidebarSkeleton`, `MessageSkeleton` เพื่อให้หน้าเว็บดูไม่กระตุกเวลาโหลดข้อมูล
- `src/lib/` - ส่วนเรียกใช้งาน Library ภายนอกและ Utilities เช่น การตั้งค่า `axios` และ `formatMessageTime` สำหรับแปลงเวลา
- `src/pages/` - หน้าหลักของแอป ได้แก่ `HomePage`, `LoginPage`, `SignUpPage`, `ProfilePage`, `SettingsPage`
- `src/store/` - รวบรวม Global State จัดการด้วย Zustand แบ่งเป็น `useAuthStore.js`, `useChatStore.js`, `useThemeStore.js`

## 🤝 หมายเหตุ
โปรเจกต์นี้เป็นหน้า Frontend สำหรับการทำงานร่วมกับระบบ Backend ที่สร้างจาก Node.js, Express และ MongoDB.

---

## 📅 บันทึกการพัฒนาระบบ (Changelog & Development Journey) - อัปเดตล่าสุด

วันนี้เราได้ทำการแก้ไขบั๊กและพัฒนาฟีเจอร์ที่สำคัญหลายส่วน เพื่อให้ระบบแชททำงานได้อย่างสมบูรณ์และมี UI ที่เป็นมิตรกับผู้ใช้มากขึ้น ดังนี้ครับ:

### 1. 🛠️ แก้ไขบั๊กการแสดงผลรายชื่อเพื่อน (Sidebar & Data Mapping)
- **ปัญหา:** รายชื่อเพื่อนในฝั่งซ้าย (Sidebar) ไม่แสดงผลเมื่อมีผู้ใช้ล็อกอินเข้ามา
- **สาเหตุ & การแก้ไข:** ฝั่ง Backend ส่งข้อมูลรายชื่อผู้ใช้มาในรูปแบบ Object `{"filteredUsers": [...]}` แต่ฝั่ง Frontend นำไปใช้ผิดรูปแบบ จึงได้เข้าไปแก้ไขในไฟล์ `useChatStore.js` ฟังก์ชัน `getUsers` ให้ดึงข้อมูล `res.data.filteredUsers` มาใช้งานแทน
- **Data Mapping คืนค่าให้เข้ากับ UI:** ทำการแปลงชื่อตัวแปร (Mapping) จาก Backend (`fullname`, `profilePicture`) ให้ตรงกับที่ UI เรียกใช้ (`name`, `profilePic`) ในทั้ง `useAuthStore.js` และ `useChatStore.js` เพื่อให้โค้ดส่วน UI สะอาดและอ่านง่าย

### 2. 🧩 การสร้างและจัดการ Skeleton Loading (UI/UX)
เพื่อไม่ให้หน้าจอดูกระตุกเวลาดึงข้อมูลจาก Server เราได้สร้าง Skeleton (หน้าจอโหลดก่อนของจริงจะมา) แยกเป็นคอมโพเนนต์เพื่อความเป็นระเบียบ:
- **`MessageSkeleton.jsx`**: สร้างกล่องข้อความจำลองสำหรับหน้าแชทหลัก
- **`SidebarSkeleton.jsx`**: สกัดโค้ดจำลองรายชื่อเพื่อนออกจาก `Sidebar.jsx` นำมาแยกเป็นไฟล์ใหม่ เพื่อลดความซับซ้อนของโค้ดใน Sidebar

### 3. 💬 ยกเครื่อง ChatContainer.jsx (แชทหลัก)
- **จัดระเบียบและแก้ Syntax Errors:** ลบโค้ดที่ซ้ำซ้อน, แก้คำผิด (เช่น `coe.log` เป็น `console.log`)
- **เชื่อมต่อ UI ให้สมบูรณ์:**
  - เพิ่มการเรนเดอร์ข้อความของตัวเอง (ขวา) และคู่สนทนา (ซ้าย) อย่างถูกต้อง
  - นำ `MessageSkeleton` เข้ามาใช้งานตอนรอโหลดข้อมูลข้อความ
  - นำฟังก์ชัน `formatMessageTime` จากไฟล์ `src/lib/utils.js` (สร้างใหม่วันนี้) มาแปลงรูปแบบเวลาให้เป็น `HH:MM` อ่านง่ายขึ้น
  - กำหนดรูปภาพโปรไฟล์พื้นฐานเป็น `/avatar.webp` ในกรณีที่ผู้ใช้ไม่มีรูปโปรไฟล์

### 4. ⚡ ฟื้นฟูระบบแสดงผลแบบเรียลไทม์ (Real-time Messaging)
- หลังจากที่นำออกไปชั่วคราวเพื่อให้ง่ายต่อการเขียนโค้ดตามบทเรียน วันนี้เราได้ประกอบระบบนี้กลับเข้ามาอย่างสมบูรณ์!
- **`useChatStore.js`**: เพิ่มฟังก์ชัน `subscribeToMessages()` (สำหรับรับฟังข้อความใหม่จาก Socket) และ `unsubscribeFromMessages()` (สำหรับยกเลิกการฟังเมื่อออกจาห้อง)
- **`ChatContainer.jsx`**: นำฟังก์ชันข้างต้นไปใส่ใน `useEffect` เพื่อให้เมื่อเราคลิกเลือกเพื่อน ระบบจะจำลองการ "เข้าห้องแชท" และสแตนด์บายรับข้อความใหม่แบบสดๆ ทันทีที่อีกฝ่ายพิมพ์ส่งมา
