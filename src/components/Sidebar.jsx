import { useEffect, memo, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users, Loader } from "lucide-react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";



const ContactItem = memo(({ user, isSelected, isOnline, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full px-3 py-2.5 flex items-center gap-3 transition-colors duration-150 cursor-pointer ${isSelected
            ? "bg-primary/10 border-l-2 border-primary"
            : "hover:bg-base-300/30 border-l-2 border-transparent"
            }`}
    >
        <div className="relative mx-auto lg:mx-0 shrink-0">
            <img
                src={user.profilePicture || "/avatar.webp"}
                alt={user.fullname}
                className="w-10 h-10 rounded-full object-cover border border-base-300"
            />
            {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-base-100" />
            )}
        </div>

        <div className="hidden lg:block text-left min-w-0">
            <div className="font-medium text-sm text-base-content truncate">
                {user.fullname}
            </div>
            <div className={`text-xs ${isOnline ? "text-green-500" : "text-base-content/40"}`}>
                {isOnline ? "Online" : "Offline"}
            </div>
        </div>
    </button>
));

ContactItem.displayName = "ContactItem";

const Sidebar = () => {
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
        useChatStore();
    const { onlineUsers } = useAuthStore();

    useEffect(() => { // เรียกใช้ครั้งแรก useEffect(() => {}, [dependency array]) / callback funtion + dependency array
        getUsers(); // จะเรียก getUsers มาก่อนเลย
    }, [getUsers]);
    const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-18 sm:w-20 lg:w-72 border-r border-base-300 flex flex-col bg-base-200/30 shrink-0 transition-all duration-200">
            {/* Header */}
            <div className="border-b border-base-300 p-3 lg:p-5">
                <div className="flex items-center gap-2.5">
                    <Users className="w-5 h-5 text-base-content/50 mx-auto lg:mx-0" />
                    <span className="font-semibold text-sm hidden lg:block text-base-content">
                        Contacts
                    </span>
                </div>
                <p className="text-xs text-base-content/40 mt-1 hidden lg:block">

                    {onlineUsers.length > 0
                        ? `${onlineUsers.length - 1} online` // -1 เพราะว่าไม่นับตัวเอง 
                        : "0 online"}

                </p>
            </div>

            {/* Online Only Toggle */}
            <div className="hidden lg:flex items-center gap-2 px-5 py-3 border-b border-base-300">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={showOnlineOnly}
                        onChange={(e) => setShowOnlineOnly(e.target.checked)}
                        className="checkbox checkbox-xs checkbox-primary"
                    />
                    <span className="text-sm text-base-content/70">Show online only</span>
                </label>
            </div>

            {/* User List */}
            <div className="overflow-y-auto flex-1 py-1">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <ContactItem
                            key={user._id}
                            user={user}
                            isSelected={selectedUser?._id === user._id}
                            isOnline={onlineUsers.includes(user._id)}
                            onClick={() => setSelectedUser(user)}
                        />
                    ))
                ) : (
                    <div className="text-center text-base-content/40 py-10 px-4">
                        <Users className="w-8 h-8 mx-auto mb-2 text-base-content/20" />
                        <p className="text-sm">No contacts yet</p>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
