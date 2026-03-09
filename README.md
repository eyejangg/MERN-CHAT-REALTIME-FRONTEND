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

## 📅 บันทึกการพัฒนาระบบ (Changelog & Development Journey) - อัปเดตล่าสุด แบบละเอียดพร้อมตัวอย่างโค้ด

วันนี้เราได้ผ่านกระบวนการแก้ไขบั๊ก (Debugging) และปรับปรุงโครงสร้างโค้ด (Refactoring) หลายจุด เพื่อให้ระบบแชททำงานได้อย่างสมบูรณ์ นี่คือรายละเอียดเจาะลึกพร้อมตัวอย่างสิ่งที่เราทำครับ:

### 1. 🛠️ แก้ไขบั๊กการดึงข้อมูลรายชื่อเพื่อน (Data Mapping Issue)
**ปัญหาที่พบ:** 
รายชื่อเพื่อนใน Sidebar ฝั่งซ้ายไม่ยอมแสดงผล สาเหตุเกิดจากข้อมูลที่ดึงมาจาก Backend ไม่ตรงกับที่ Frontend คาดหวัง
- Frontend พยายามเข้าถึง `res.data` ตรงๆ
- แต่ Backend ส่งข้อมูลมาในรูปแบบก้อน Object ที่ชื่อ `filteredUsers` คือ `res.data.filteredUsers`

**การแก้ไข:** 
เข้าไปปรับแก้ที่ `useChatStore.js` ในฟังก์ชัน `getUsers` ให้เข้าถึงข้อมูลถูกจุด และทำการ "Map" ตัวแปรจากฐานข้อมูล (`fullname`, `profilePicture`) ให้ตรงกับที่ UI เรียกใช้ (`name`, `profilePic`)

**ตัวอย่างโค้ดที่แก้ไข:**
***ก่อนแก้ (ดึงข้อมูลผิดและไม่ได้ Map):***
```javascript
const res = await api.get("/message/users");
set({ users: res.data }); // ❌ ผิด: Backend ไม่ได้ส่งเป็น Array ตรงๆ
```

***หลังแก้ (ดึงถูกจุดและ Map ข้อมูลให้ UI นำไปใช้ง่ายขึ้น):***
```javascript
const response = await api.get("/message/users");
// ✅ ดึงจาก filteredUsers และแปลงชื่อคีย์ (Key)
const users = response.data.filteredUsers.map(user => ({
    ...user,
    name: user.fullname,            // แปลง fullname ไปใส่ชื่อตัวแปร name
    profilePic: user.profilePicture // แปลง profilePicture ไปใส่ตัวแปร profilePic
}));
set({ users }); // ส่ง array รายชื่อที่เตรียมเสร็จแล้วให้ UI นำไปใช้
```

### 2. 🧩 การสร้าง Skeleton Loading เพื่อ UI ที่เนียนตาขึ้น
**ทำไมต้องทำ?**
เวลาที่เว็บกำลังส่ง Request ไปขอข้อมูลจาก Backend หน้าจอแชทที่ว่างเปล่าจะทำให้ผู้ใช้รู้สึกว่าแอปสะดุด เราจึงนำ "กล่องสีเทาจางๆ กะพริบได้" (เรียกเทคนิคนี้ว่า Skeleton) มาใส่ไว้เพื่อหลอกตาให้ดูมีมิติและดูเป็นมืออาชีพ

**สิ่งที่เราทำ:**
- **สร้าง `SidebarSkeleton.jsx`**: จำลองหน้าตารายชื่อเพื่อนฝั่งซ้าย (กล่องวงกลมแทนบัญชีแบบจางๆ และเส้นตรงแถบยาวแทนชื่อเพื่อน) โดยดึงโค้ดที่รกรุงรังออกจากไฟล์หลักมาแยกไว้ต่างหาก
- **สร้าง `MessageSkeleton.jsx`**: จำลองกล่องแชทข้อความฝั่งผู้ส่ง-ผู้รับ

**ตัวอย่างการใช้งานเพื่อบังหน้าจอโหลด (ใน `ChatContainer.jsx`):**
```javascript
// ถ้าตัวแปร isMessagesLoading เป็น true (ยังโหลดไม่เสร็จ) ให้เรนเดอร์ Skeleton แทน
if (isMessagesLoading) {
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton /> {/* ✅ แสดงโครงก้อนแชทจำลองรอข้อมูลจัดเต็ม */}
            <MessageInput />
        </div>
    );
}
```

### 3. 💬 ยกเครื่อง `ChatContainer.jsx` (รวมชิ้นส่วนแชท)
**ปัญหาที่พบ:**
ไฟล์นี้ตอนแรกเขียนไม่จบวงเล็บปีกกา มีตัวพิมพ์ผิด (เช่น `coe.log` แทนที่จะเป็น `console.log`) และยังไม่มีตัวช่วยแสดงเวลาของข้อความ

**การแก้ไข:**
- ลบโค้ดซ้ำซ้อน จัดระเบียบการแยกฝั่งข้อความผู้ส่ง (ซ้าย) ผู้รับ (ขวา) 
- นำฟังก์ชันอรรถประโยชน์จากในไฟล์ที่เราสร้างใหม่ (`src/lib/utils.js`) ชื่อว่า `formatMessageTime` มาแปลงรูปแบบเวลา เช่นจาก `2026-03-09T08:00:00Z` ให้ออกมาเหลือแค่ `15:00` น่าอ่านสบายตา

**ตัวอย่างโค้ดการใช้ฟังก์ชันเวลาจัดระเบียบ:**
```javascript
<p className={`text-[10px] mt-1 text-base-content/40 ${isSent ? "text-right" : "text-left"}`}>
    {formatMessageTime(message.createdAt)}  {/* ผลลัพธ์: จะได้เป็นเวลาแบบ 16:30 โชว์ข้างล่างข้อความ */}
</p>
```

### 4. ⚡ ฟื้นระบบส่งแชทแบบ Real-time (Socket.io)
**สิ่งที่ทำ:**
ในตอนก่อนหน้า เราเอาโค้ดส่วนนี้ออกเพื่อให้การเรียนรู้ของคุณเรียบง่ายที่สุด แต่วันนี้เราประกอบกลับเข้ามาแล้ว! เพราะหัวใจของแอปแชทคือการเด้งแจ้งเตือนแบบเรียลไทม์

**หลักการทำงานของ React useEffect + Socket.io:**
1. เมื่อผู้ใช้คลิกเลือกคุยกับเพื่อน (ตัวแปร `selectedUser` เปลี่ยน) คลาส `useEffect` จะตื่นขึ้นทำงานทันที
2. มันจะเรียกฟังก์ชัน `getMessages()` เพื่อดึงประวัติแชทเก่ามาโชว์
3. **และเรียก `subscribeToMessages()` ทันที** เพื่อสั่งให้ Web Socket เปิดพอร์ต "ตั้งใจฟัง" ข้อความใหม่ๆ จากคนนี้โดยเฉพาะ กรอเข้า State ทันที
4. ถ้าย้ายไปคุยกับคนอื่น หรือปิดหน้าแชท มันจะทำการ Return ฟังก์ชันอรรถประโยชน์ `unsubscribeFromMessages()` เพื่อคลายการฟังเดิมออก (Cleanup) ไม่ให้เกิดปัญหาข้อความซ้อนกัน (Memory Leak)

**ตัวอย่างโค้ดหัวใจสำคัญของการทำงานเรียลไทม์:**
```javascript
useEffect(() => {
    // 1. ตรวจสอบก่อนว่าเลือกเพื่อนคุยอยู่จริงๆ มั้ย
    if (selectedUser?._id) { 
        getMessages(selectedUser._id); // 2. โหลดแชทเก่ามาโชว์ที่หน้าจอ
        subscribeToMessages();         // 3. เริ่มจับตาดู Event ข่าวสารใหม่ๆ บนห้องแชท
    }

    // 4. พอคลิกออกไปหน้าอื่น ให้ล้างการฟังข้อความอันเดิมทิ้งเสมอ
    return () => unsubscribeFromMessages(); 
    
// Dependency array ด้านล่างนี้ จะสั่งให้ useEffect ทำงานก็ต่อเมื่อค่าตัวแปรจำพวกนี้เปลี่ยนไป
}, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);
```
