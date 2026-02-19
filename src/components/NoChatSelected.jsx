import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="flex-1 flex items-center justify-center bg-base-100">
            <div className="text-center space-y-6 max-w-sm px-6">
                {/* Animated icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <MessageSquare className="w-10 h-10 text-primary" />
                        </div>
                        {/* Pulse ring */}
                        <div className="absolute inset-0 rounded-2xl border border-primary/20 animate-ping opacity-30" />
                    </div>
                </div>

                {/* Text */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-base-content tracking-tight">
                        Welcome to SE Chat!
                    </h2>
                    <p className="text-sm text-base-content/50 leading-relaxed">
                        Select a conversation from the sidebar to start chatting with your contacts.
                    </p>
                </div>

                {/* Decorative pills */}
                <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-base-200 border border-base-300 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs text-base-content/50">3 online</span>
                    </div>
                    <div className="px-3 py-1.5 bg-base-200 border border-base-300 rounded-full">
                        <span className="text-xs text-base-content/50">5 contacts</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoChatSelected;
