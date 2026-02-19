import { useAuthStore } from "../store/useAuthStore";
import AppLayout from "../layouts/AppLayout";

const HomePage = () => {
    const { authUser, logOut } = useAuthStore();

    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center px-4">
                <div className="max-w-md space-y-6">
                    <h1 className="text-4xl font-bold text-base-content">
                        Welcome back, {authUser?.fullname}!
                    </h1>
                    <p className="text-lg text-base-content/60">
                        You have successfully logged in. Now you can start building your chat features!
                    </p>
                </div>
            </div>
        </AppLayout>
    );
};

export default HomePage;
