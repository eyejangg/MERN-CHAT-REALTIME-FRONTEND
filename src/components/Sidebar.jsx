import { useState } from "react";
import { Users, Search } from "lucide-react";

// Mock Users Data
const MOCK_USERS = [
    { _id: "1", fullname: "John Doe", profilePic: null, online: true, lastMessage: "Hey, how's it going? 👋" },
    { _id: "2", fullname: "Jane Smith", profilePic: null, online: false, lastMessage: "See you tomorrow!" },
    { _id: "3", fullname: "Mike Johnson", profilePic: null, online: true, lastMessage: "Sounds great, let's do it!" },
    { _id: "4", fullname: "Sarah Wilson", profilePic: null, online: false, lastMessage: "Can we reschedule?" },
    { _id: "5", fullname: "David Brown", profilePic: null, online: true, lastMessage: "I'll send you the file now." },
];

const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
};

const Sidebar = ({ onSelectUser, selectedUser }) => {
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [search, setSearch] = useState("");

    const filteredUsers = MOCK_USERS.filter((user) => {
        const matchesSearch = user.fullname.toLowerCase().includes(search.toLowerCase());
        const matchesOnline = showOnlineOnly ? user.online : true;
        return matchesSearch && matchesOnline;
    });

    const onlineCount = MOCK_USERS.filter((u) => u.online).length;

    return (
        <aside className="h-full flex flex-col border-r border-base-300 bg-base-100 w-20 lg:w-80 transition-all duration-300 shrink-0">
            {/* Header */}
            <div className="p-4 border-b border-base-300">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="hidden lg:block">
                        <h2 className="font-semibold text-base-content text-sm">Messages</h2>
                        <p className="text-xs text-base-content/50">{onlineCount} online</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative hidden lg:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        className="w-full h-9 pl-9 pr-4 bg-base-200 border border-base-300 rounded-lg text-sm text-base-content placeholder-base-content/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Online Toggle */}
                <label className="hidden lg:flex items-center gap-2 mt-3 cursor-pointer select-none">
                    <div
                        onClick={() => setShowOnlineOnly((v) => !v)}
                        className={`relative w-8 h-4 rounded-full transition-colors duration-200 ${showOnlineOnly ? "bg-primary" : "bg-base-300"}`}
                    >
                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all duration-200 ${showOnlineOnly ? "left-4.5" : "left-0.5"}`} />
                    </div>
                    <span className="text-xs text-base-content/60">Online only</span>
                </label>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto py-2">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => onSelectUser(user)}
                            className={`w-full flex items-center gap-3 px-3 py-3 mx-1 rounded-xl transition-all duration-200 group
                                ${selectedUser?._id === user._id
                                    ? "bg-primary/10 border border-primary/20"
                                    : "hover:bg-base-200 border border-transparent"
                                }
                                lg:w-[calc(100%-8px)]
                            `}
                        >
                            {/* Avatar */}
                            <div className="relative flex-shrink-0 mx-auto lg:mx-0">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white
                                    ${selectedUser?._id === user._id ? "bg-primary" : "bg-base-300 group-hover:bg-primary/70 transition-colors"}`}>
                                    {getInitials(user.fullname)}
                                </div>
                                {user.online && (
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-base-100" />
                                )}
                            </div>

                            {/* Info (hidden on mobile) */}
                            <div className="hidden lg:flex flex-col items-start min-w-0 flex-1">
                                <div className="flex w-full justify-between items-center">
                                    <span className={`font-medium text-sm truncate ${selectedUser?._id === user._id ? "text-primary" : "text-base-content"}`}>
                                        {user.fullname}
                                    </span>
                                    {user.online && (
                                        <span className="text-xs text-green-500 flex-shrink-0">Online</span>
                                    )}
                                </div>
                                <span className="text-xs text-base-content/40 truncate w-full text-left mt-0.5">{user.lastMessage}</span>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="text-center py-8 text-base-content/40 text-sm hidden lg:block">
                        No contacts found
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
