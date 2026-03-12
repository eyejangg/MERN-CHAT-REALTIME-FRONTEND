import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import AppLayout from "../layouts/AppLayout";

const HomePage = () => {
    const { selectedUser } = useChatStore();

    return (
        <AppLayout>
            <Sidebar />
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </AppLayout>
    );
};

export default HomePage;

// หลังจาก Login มา Default เรายังไม่เหลือคุยกับใคร จะ = selectedUser 