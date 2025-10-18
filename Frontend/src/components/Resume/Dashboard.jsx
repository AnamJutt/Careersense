import React from 'react'

const Dashboard = ({result,handleNewResume}) => {
      const [expandedCategory, setExpandedCategory] = React.useState(null); 
    return (
        <div className="max-w-6xl w-full bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                    Resume Scan Results
                </h2>
                <button
                    onClick={handleNewResume}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Upload New Resume
                </button>
            </div>

            <div className="flex gap-8">
                {/* Left Column - Match Rate + Categories */}
                <div className="w-1/3 flex flex-col items-center">
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full">
                            <circle
                                cx="64"
                                cy="64"
                                r="60"
                                stroke="#e5e7eb"
                                strokeWidth="10"
                                fill="none"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="60"
                                stroke="#16a34a"
                                strokeWidth="10"
                                fill="none"
                                strokeDasharray={2 * Math.PI * 60}
                                strokeDashoffset={
                                    2 * Math.PI * 60 * (1 - result.matchRate / 100)
                                }
                                strokeLinecap="round"
                                transform="rotate(-90 64 64)"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                            {result.matchRate}%
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600 font-medium">Match Rate</p>

                    {/* Categories */}
                    <div className="mt-6 w-full">
                        {Object.entries(result.categories).map(([name, data]) => (
                            <div key={name} className="mb-4 border-b pb-3">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() =>
                                        setExpandedCategory(
                                            expandedCategory === name ? null : name
                                        )
                                    }
                                >
                                    <p className="text-sm font-medium text-gray-700">
                                        {name}
                                    </p>
                                    <span className="text-xs text-gray-500">
                                        {data.issues} issues
                                    </span>
                                </div>

                                <div className="w-full bg-gray-200 h-2 rounded mt-1">
                                    <div
                                        className="bg-blue-500 h-2 rounded"
                                        style={{
                                            width: `${Math.max(0, 100 - data.issues * 10)}%`,
                                        }}
                                    ></div>
                                </div>

                                {/* Show issueDetails when expanded */}
                                {expandedCategory === name && data.issueDetails.length > 0 && (
                                    <ul className="mt-3 ml-2 list-disc text-sm text-gray-600 space-y-1">
                                        {data.issueDetails.map((issue, i) => (
                                            <li key={i}>{issue}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Detailed Checks */}
                <div className="w-2/3">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Detailed Checks
                    </h3>
                    <div className="space-y-4">
                        {result.checks.map((check, i) => (
                            <div
                                key={i}
                                className="p-4 border rounded-md flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{check.title}</p>
                                    <p className="text-sm text-gray-600">{check.message}</p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${check.status === "pass"
                                        ? "bg-green-100 text-green-700"
                                        : check.status === "fail"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {check.status.toUpperCase()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dashboard