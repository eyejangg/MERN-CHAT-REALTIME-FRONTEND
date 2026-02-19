import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
        // Mock send
        setText("");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="px-4 py-3 border-t border-base-300 bg-base-100">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-xl border border-base-300"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center hover:bg-red-500/80 transition-colors"
                        >
                            <X className="w-3 h-3 text-base-content" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />

                {/* Image button */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all
                        ${imagePreview ? "bg-primary/20 text-primary" : "bg-base-200 text-base-content/40 hover:text-base-content hover:bg-base-300"}`}
                >
                    <Image className="w-4 h-4" />
                </button>

                {/* Text input */}
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 h-9 px-4 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content placeholder-base-content/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                {/* Send button */}
                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 hover:bg-primary/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                    <Send className="w-4 h-4 text-white" />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
