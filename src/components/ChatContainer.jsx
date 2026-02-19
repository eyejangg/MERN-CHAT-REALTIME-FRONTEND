import { useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";

// Mock messages for demo
const getMockMessages = (selectedUserId, myId) => [
    {
        _id: "1",
        senderId: selectedUserId,
        text: "Hey there! 👋 How's it going?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
        _id: "2",
        senderId: myId,
        text: "I'm doing great, thanks for asking! 😊",
        createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    },
    {
        _id: "3",
        senderId: selectedUserId,
        text: "Awesome! Are you working on something new?",
        createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    },
    {
        _id: "4",
        senderId: myId,
        text: "Yes! Building a real-time chat app with MERN stack. It's coming along nicely 🚀",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
        _id: "5",
        senderId: selectedUserId,
        text: "That sounds really cool! Can't wait to see it.",
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
];

const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
};

const formatTime = (isoDate) => {
    return new Date(isoDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ChatContainer = ({ selectedUser, onClose }) => {
    const { authUser } = useAuthStore();
    const myId = authUser?._id ?? "me"; // fallback so mock works even without authUser
    const messages = getMockMessages(selectedUser._id, myId);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedUser]);

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
            <ChatHeader selectedUser={selectedUser} onClose={onClose} />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.map((message) => {
                    const isMe = message.senderId === myId;
                    return (
                        <div
                            key={message._id}
                            className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                        >
                            {/* Avatar */}
                            {!isMe && (
                                <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center text-xs font-semibold text-base-content flex-shrink-0 mb-1">
                                    {getInitials(selectedUser.fullname)}
                                </div>
                            )}

                            {/* Bubble */}
                            <div className={`flex flex-col gap-1 max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
                                <div
                                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                                    ${isMe
                                            ? "bg-primary text-white rounded-br-sm"
                                            : "bg-base-200 text-base-content border border-base-300 rounded-bl-sm"
                                        }`}
                                >
                                    {message.image && (
                                        <img src={message.image} alt="Attachment" className="rounded-xl mb-2 max-w-[200px]" />
                                    )}
                                    {message.text}
                                </div>
                                <span className="text-xs text-base-content/30 px-1">
                                    {formatTime(message.createdAt)}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatContainer;
