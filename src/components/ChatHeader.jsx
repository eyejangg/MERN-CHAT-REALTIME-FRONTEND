import { X } from "lucide-react";

const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
};

const ChatHeader = ({ selectedUser, onClose }) => {
    return (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-base-300 bg-base-100/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials(selectedUser.fullname)}
                    </div>
                    {selectedUser.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-base-100" />
                    )}
                </div>
                {/* Info */}
                <div>
                    <h3 className="font-semibold text-base-content text-sm">{selectedUser.fullname}</h3>
                    <p className="text-xs text-base-content/50">
                        {selectedUser.online ? (
                            <span className="text-green-500">● Online</span>
                        ) : (
                            "Offline"
                        )}
                    </p>
                </div>
            </div>

            {/* Close button */}
            <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-base-content/40 hover:text-base-content hover:bg-base-200 transition-all"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default ChatHeader;
