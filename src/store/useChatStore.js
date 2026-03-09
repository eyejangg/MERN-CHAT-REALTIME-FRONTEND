import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance as api } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({ // call back funtion และส่ง  funtion set, function get เป็น parameter เข้าไปด้วย - จะเรียกใช้ในภายหลัง
    // และส่ง object ของ state ที่ต้องการเก็บไว้ 
    messages: [],
    users: [],
    selectedUser: null, // user ที่ถูกเลือก
    isUsersLoading: false, // ใช้สำหรับ loading state
    isMessageLoading: false, // loading state ของ messages

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await api.get("/message/users");
            const users = response.data.filteredUsers.map(user => ({
                ...user,
                name: user.fullname,
                profilePic: user.profilePicture
            }));
            set({ users });
        } catch (error) {
            toast.error(error.response.data.message || "Get users failed");
        } finally {
            set({ isUsersLoading: false }); // กำหนดให้ isUsersLoading เป็น false
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get(); // ทำไมต้องใช้ selectedUser เพราะว่า เราต้องส่งข้อความไปยัง user ที่ถูกเลือก
        try {
            const response = await api.post("/message/send/" + selectedUser._id, // ส่งข้อความไปยัง user ที่ถูกเลือก
                messageData,
            );
            set({ messages: [...messages, response.data] }) // นำข้อมูลที่ส่งไปแล้วมาต่อท้าย array เดิม
        } catch (error) {
            toast.error(error.response.data.message || "Sending Message Failed");
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true }) 
        try {
            const response = await api.get(`/message/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error(error.response.data.message || "Get Message Failed");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            const isMessageFromSelectedUser = newMessage.sender === selectedUser._id;
            if (!isMessageFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (socket) socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser });
    },
}));
