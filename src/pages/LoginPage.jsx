import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { MessageSquare, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import AuthLayout from "../layouts/AuthLayout";


const LoginPage = () => {
    const { login, isLoggingIn } = useAuthStore(); // ดึง login, isLoggingIn จาก useAuthStore
    const [showPassword, setShowpassword] = useState(false); // state สำหรับแสดงรหัสผ่าน
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData); // ส่ง formData เข้าไป 
    }

    return (
        <AuthLayout
            imageTitle="Welcome back!"
            imageSubtitle="Sign in to continue your conversations and catch up with your messages."
        >
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <MessageSquare className="w-7 h-7 text-primary" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-base-content tracking-tight">
                    Welcome Back
                </h1>
                <p className="text-sm text-base-content/60">Sign in to your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-base-content/80">
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="w-5 h-5 text-base-content/30" />
                        </div>
                        <input
                            id="login-email"
                            type="email"
                            className="w-full h-12 pl-12 pr-4 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder-base-content/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-base-content/80">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="w-5 h-5 text-base-content/30" />
                        </div>
                        <input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            className="w-full h-12 pl-12 pr-12 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder-base-content/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-base-content/30 hover:text-base-content/60 transition-colors"
                            onClick={() => setShowpassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    id="login-submit"
                    type="submit"
                    disabled={isLoggingIn} // ป้องกันการกดปุ่มซ้ำ
                    className="w-full h-12 bg-primary text-white font-semibold rounded-xl hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                >
                    {isLoggingIn ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                        "Sign in"
                    )}
                </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-base-content/60">
                Don&apos;t have an account?{" "}
                <Link
                    to="/signup"
                    className="text-primary hover:underline font-medium"
                >
                    Create account
                </Link>
            </p>
        </AuthLayout>
    );
};


export default LoginPage;
