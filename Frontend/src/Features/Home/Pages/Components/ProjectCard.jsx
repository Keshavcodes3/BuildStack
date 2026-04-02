import React from 'react';
import { Code } from 'lucide-react';

const ProjectCard = ({ title = "API Reference", endpoint = "/v1/profile/arivera", data }) => {
  // Default dummy data if none provided
  const displayData = data || {
    status: 200,
    user: {
      handle: "@arivera",
      tier: "Architect",
      stack: ["Rust", "TypeScript"]
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
          <h3 className="font-bold text-lg text-slate-800">{title}</h3>
        </div>
        <div className="bg-orange-50 p-2 rounded-xl text-orange-500">
          <Code size={20} />
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-5 font-mono text-[11px] leading-relaxed text-slate-300">
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(displayData, null, 2)}
        </pre>
      </div>

      <div className="mt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
        <span className="text-gray-400 truncate mr-4">GET {endpoint}</span>
        <button className="text-orange-500 hover:text-orange-600 transition-colors">Copy Endpoint</button>
      </div>
    </div>
  );
};

export default ProjectCard;