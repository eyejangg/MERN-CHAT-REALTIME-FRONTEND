import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";
import toast from "react-hot-toast";


export const useAuthStore = create((set, get) => ({
    authUser: null,
    socket:null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/user/check");
            set({ authUser: res.data });
            get().connectSocket(); // เรียกใช้ socket.io
        } catch {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/user/register", data);
            set({ authUser: res.data.user });
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
            await axiosInstance.post("/user/login", data);
            const userRes = await axiosInstance.get("/user/check");
            set({ authUser: userRes.data });
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
            await axiosInstance.post("/user/logout");
            set({ authUser: null });
            get().disconnectSocket(); // เรียกใช้ socket.io
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/user/update-profile", data);
            set({ authUser: res.data.user });
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
