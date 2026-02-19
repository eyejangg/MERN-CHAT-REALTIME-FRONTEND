import { useState } from "react";
import AppLayout from "../layouts/AppLayout";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <AppLayout>
            <Sidebar
                selectedUser={selectedUser}
                onSelectUser={setSelectedUser}
            />
            {!selectedUser ? (
                <NoChatSelected />
            ) : (
                <ChatContainer
                    selectedUser={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </AppLayout>
    );
};

export default HomePage;
