import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // อนุญาติส่งได้แค่ 1รูป [0] - แต่ถ้าจะส่งหลายรูป ต้อง check .lenght เลือกหลายรูปและใส่เป็นค่า [array]
        if (!file) return;

        if (!file.type.startsWith("image/")) { // ถ้าไฟล์ที่เลือก ไม่ใช่รูปภาพ
            toast.error("Please select an image file"); // แสดงข้อความ Error
            return;
        }

        const reader = new FileReader(); // สร้างตัวอ่านไฟล์
        reader.onloadend = () => { // base 64
            setImagePreview(reader.result); // เมื่ออ่านไฟล์เสร็จแล้ว 
        };
        reader.readAsDataURL(file); // อ่านไฟล์
    };

    const removeImage = () => { // remove Image
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => { // ส่งข้อความละ ฟังก์ชั่นนี้
        e.preventDefault();
        if (!text.trim() && !imagePreview) return; // อย่างน้อยอย่างใดอย่าง หนึ่ง ต้องมี text หรือ image ถึงจะส่ง ข้อความหรือรูปภาพได้
        if (isSending) return; // ป้องกันการกดส่งรัวๆ

        try {
            setIsSending(true);
            await sendMessage({ // เรียกใช้ฟังก์ชั่น sendMessage
                text: text.trim(),  // attibute text , 
                file: imagePreview, // attibute image (matching backend 'file' field)
            });
            setText(""); // ล้างค่า text
            setImagePreview(null); // ล้างค่า imagePreview
            if (fileInputRef.current) fileInputRef.current.value = ""; // ล้างค่า fileInputRef
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="px-4 py-3 border-t border-base-300 bg-base-200/30">
            {/* Image Preview */}
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-base-300"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 text-base-content flex items-center justify-center cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
                            type="button"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            )}

            {/* Input Row */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2">
                    <input
                        type="text"
                        className="flex-1 h-11 px-4 text-sm rounded-xl bg-base-200 border border-base-300 text-base-content placeholder-base-content/30 outline-none focus:border-primary transition-colors"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${imagePreview
                            ? "text-primary border-primary/30 bg-primary/10"
                            : "text-base-content/40 border-base-300 hover:text-base-content/70 hover:bg-base-200"
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image className="w-5 h-5" />
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={(!text.trim() && !imagePreview) || isSending}
                    className="p-2.5 rounded-xl bg-primary text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
