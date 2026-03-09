import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);
            subscribeToMessages();
        }

        return () => unsubscribeFromMessages();
    }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages.length > 0) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);



    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col min-w-0">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => { // ในแต่ละรอบจะได้ message มา 1 ตัว จะส่งค่า message ไปให้ตัวแปร isSent และ message
                    const isSent = message.sender === authUser?._id;
                    return (
                        <div
                            key={message._id}
                            className={`flex ${isSent ? "justify-end" : "justify-start"}`}
                        >
                            {!isSent && (
                                <img
                                    src={selectedUser?.profilePic || "/avatar.webp"}
                                    alt=""
                                    className="w-8 h-8 rounded-full object-cover border border-base-300 mr-2 mt-auto shrink-0"
                                />
                            )}

                            <div className={`max-w-[70%] ${isSent ? "order-1" : ""}`}>
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="rounded-xl mb-1.5 max-w-[250px] border border-base-300"
                                    />
                                )}

                                {message.text && (
                                    <div
                                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isSent
                                            ? "bg-primary text-white rounded-br-md"
                                            : "bg-base-200 text-base-content rounded-bl-md"
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                )}

                                <p className={`text-[10px] mt-1 text-base-content/40 ${isSent ? "text-right" : "text-left"}`}>
                                    {formatMessageTime(message.createdAt)}
                                </p>
                            </div>

                            {isSent && (
                                <img
                                    src={authUser?.profilePic || "/avatar.webp"}
                                    alt=""
                                    className="w-8 h-8 rounded-full object-cover border border-base-300 ml-2 mt-auto shrink-0"
                                />
                            )}
                        </div>
                    );
                })}
                <div ref={messageEndRef} />
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatContainer;
