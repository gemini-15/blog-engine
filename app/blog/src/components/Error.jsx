import React  from "react";

const Error = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="text-lg text-red-600 dark:text-red-400 font-medium">
                Could not contact the API.
            </div>
        </div>
    )
}

export default Error;