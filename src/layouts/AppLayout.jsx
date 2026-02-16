const AppLayout = ({ children }) => {
    return (
        <div className="h-dvh pt-16">
            <div className="h-full flex overflow-hidden">
                {children}
            </div>
        </div>
    );
};

export default AppLayout;
