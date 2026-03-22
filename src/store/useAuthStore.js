import { create } from "zustand";
import { axiosInstance as api } from "../lib/axios";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    socket: null, // เก็บ Socket instance ไว้ใน Store!
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    // ❸ Check Auth → เปิดเว็บ → ส่ง Cookie ไปถาม Backend
    checkAuth: async () => {
        try {
            const res = await api.get("/user/check"); // await api.get("/user/check") เช็คว่ามี Cookie ไหม
            const mappedUser = res.data ? { ...res.data, name: res.data.fullname, profilePic: res.data.profilePicture } : null; 
            // map ข้อมูล ให้ตรงกับ frontend 
            set({ authUser: mappedUser }); // set ข้อมูล authUser
            get().connectSocket(); // เรียกใช้ socket.io
        } catch {
            set({ authUser: null }); // ถ้าไม่มี Cookie ให้ set authUser เป็น null
        } finally {
            set({ isCheckingAuth: false }); // set isCheckingAuth เป็น false
        }
    },

    // ❷ Register → สร้างบัญชี → Auto-Login → ต่อ Socket
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await api.post("/user/register", data); // await api.post("/user/register", data) สร้างบัญชี
            const user = res.data.user; // const user = res.data.user เก็บข้อมูล user
            const mappedUser = user ? { ...user, name: user.fullname, profilePic: user.profilePicture } : null;
            set({ authUser: mappedUser }); // set ข้อมูล authUser
            get().connectSocket(); // เรียกใช้ socket.io
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            await api.post("/user/login", data);
            const userRes = await api.get("/user/check");
            const mappedUser = userRes.data ? { ...userRes.data, name: userRes.data.fullname, profilePic: userRes.data.profilePicture } : null;
            set({ authUser: mappedUser });
            get().connectSocket(); // เรียกใช้ socket.io
            toast.success("Logged in successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await api.post("/user/logout"); // await api.post("/user/logout") ตัดการเชื่อมต่อ socket.io
            set({ authUser: null }); // set ข้อมูล authUser
            get().disconnectSocket(); // ตัดการเชื่อมต่อ socket.io
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await api.put("/user/update-profile", data); // await api.put("/user/update-profile", data) อัปเดตข้อมูล
            const user = res.data.user; // const user = res.data.user เก็บข้อมูล user
            const mappedUser = user ? { ...user, name: user.fullname, profilePic: user.profilePicture } : null;
            set({ authUser: mappedUser }); // set ข้อมูล authUser
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {// ฟังก์ชั่นนี้ connect Socket.io
        const { authUser, socket } = get();
        if (!authUser || socket?.connected) return; // ถ้า authUser ไม่มี หรือ socket.connected มีอยู่แล้ว ให้ return ออกไปเลย

        const socketURL = import.meta.env.VITE_SOCKET_URL; // ดึงค่า VITE_SOCKET_URL จาก .env
        const newSocket = io(socketURL, {
            query: { // กำลังจะจับมือกันและส่ง userId ไปหา Server query ที่เราตั้งค่าไว้
                userId: authUser._id,
            }
        });

        // จูน Chanel connect ให้ตรงกัน กับ ฝั่ง Server Backend
        // connect function
        newSocket.connect();
        set({ socket: newSocket });

        newSocket.on("getOnlineUsers", (userId) => { // รับค่า userId ที่ออนไลน์ออกไปทั้งหมด ส่งผ่าน getOnlineUsers ในฝั่งของ Server ทีั่เราตั้งค่าไว้
            set({ onlineUsers: userId });  // เก็บค่า userId ที่ออนไลน์ออกไปทั้งหมด
        });
    },

    // disconnect function
    disconnectSocket: () => {
        const { socket } = get();
        if (socket?.connected) {
            socket.disconnect();
        }
        set({ socket: null, onlineUsers: [] });
    }
}));
