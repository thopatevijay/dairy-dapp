const MilkCollector = ({requiredRole}) => {
    return (
        <div className="">
            <div className="bg-indigo-500 text-center text-white py-3">
                <h1 className="text-3xl font-medium">Access Denied</h1>
            </div>
            <div className="p-4">
                <p className="text-lg font-medium">You must be a {requiredRole} to access this page. Redirecting to Dashboard.</p>
            </div>
        </div>
    )
};

export default MilkCollector;
