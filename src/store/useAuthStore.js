import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { socket } from "../lib/socket";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/user/check");
            set({ authUser: res.data });
            get().connectSocket();
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
            toast.success("Account created successfully!");
            get().connectSocket();
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
            toast.success("Logged in successfully!");
            get().connectSocket();
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
            toast.success("Logged out successfully!");
            get().disconnectSocket();
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

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || socket.connected) return;

        socket.auth = { userId: authUser._id };
        socket.connect();

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (socket.connected) {
            socket.disconnect();
        }
        set({ onlineUsers: [] });
    },
}));
