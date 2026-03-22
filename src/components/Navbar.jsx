import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Settings, User, LogOut } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const Navbar = () => {
    const { logout, authUser, onlineUsers } = useAuthStore();
    const { selectedUser } = useChatStore();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-base-100/80 backdrop-blur-lg border-b border-base-300">
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors duration-200">
                        <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-lg font-bold text-base-content tracking-tight">
                        SE Chat
                    </h1>
                </Link>

                {/* Right Nav */}
                <nav className="flex items-center gap-1">
                    <Link
                        to="/settings"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-base-content/60 hover:text-primary hover:bg-base-300/30 transition-all duration-200"
                    >
                        <Settings className="w-4 h-4" />
                        <span className="hidden sm:inline">Settings</span>
                    </Link>

                    {authUser && (
                        <>
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-base-content/60 hover:text-primary hover:bg-base-300/30 transition-all duration-200"
                            >
                                {authUser.profilePic ? (
                                    <img
                                        src={authUser.profilePic}
                                        alt="Profile"
                                        className="size-7 rounded-full object-cover border-2 border-primary/20"
                                    />
                                ) : (
                                    <div className="size-7 rounded-full bg-base-300 flex items-center justify-center">
                                        <User className="w-4 h-4" />
                                    </div>
                                )}
                                <span className="hidden sm:inline font-medium">{authUser.name || "Profile"}</span>
                            </Link>

                            <button
                                onClick={logout}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-base-content/60 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
