import { create } from "zustand";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// part ที่เป็น attibute (ตัวแปร) ทั้งหมดเลย มีใครทำอะไรอยู่มั้ย

export const useAuthStore = create((set, get) => ({ // ก้อนนี้ต้อง return เป็น object ออกมา
    authUser: null, // เก็บข้อมูล user , object
    isCheckingAuth: true, // ตรวจสอบ Auth
    isSigningUp: false, // สมัครสมาชิก
    isSigningIn: false,// ล็อคอิน
    isUpdatingProfile: false, // อัพเดทโปรไฟล์
    onlineUsers: [], // ผู้ใช้งานออนไลน์


    // part ที่เป็น function (ฟังก์ชัน) ทั้งหมดเลย

    checkAuth: async () => {
        try {
            const response = await api.get("/user/check"); // เราส่ง set,get ด้านบนมา เราสามารถ ตั้งค่าตรงนี้ได้ get และ set เราจะได้ข้อมูล user มา เราจะ เช็คแค่ set authUser 
            set({ authUser: response.data });
        } catch (error) {
            console.log("Error in CheckAuth", error);
            set({ authUser: null }); // ถ้ามีปัญหา คืนเป็นค่า null ไป
        } finally { // state ที่ทำเสมอ เมื่อทำเสร็จแล้ว = finally
            set({ isCheckingAuth: false });
        }

    },



    // signUP

    register: async (data) => {
        set({ isSigningUp: true });
        try {
            const response = await api.post("/user/register", data); // ส่งข้อมูลไปให้ backend
            set({ authUser: response.data }); // รับข้อมูลจาก backend
            toast.success("Account create successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Sign Up failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    // signIn

    login: async (data) => {
        set({ isSigningIn: true })
        try {
            const response = await api.post("/user/login", data);
            set({ authUser: response.data });
            toast.success("Login Successfully");

        } catch (error) {
            toast.error(error.response?.data?.message || "Sign In failed");
        } finally {
            set({ isSigningIn: false });
        }
    },

    logOut: async () => {
        try {
            await api.post("/user/logout");
            set({ authUser: null });
            toast.success("Logout Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");

        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await api.put("/user/update-profile", data);
            set({ authUser: response.data });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    }

}));