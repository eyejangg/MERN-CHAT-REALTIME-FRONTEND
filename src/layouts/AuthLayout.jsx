import AuthImagePattern from "../components/AuthImagePattern";

const AuthLayout = ({ children, imageTitle, imageSubtitle }) => {
    return (
        <div className="h-dvh pt-16 grid lg:grid-cols-2">
            {/* Left — Form */}
            <div className="flex items-center justify-center px-6 py-8 sm:px-12 overflow-y-auto">
                <div className="w-full max-w-md space-y-8">
                    {children}
                </div>
            </div>

            {/* Right — Pattern */}
            <AuthImagePattern title={imageTitle} subtitle={imageSubtitle} />
        </div>
    );
};

export default AuthLayout;
