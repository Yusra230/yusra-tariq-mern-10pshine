import { Sparkles } from "lucide-react";

// Additional security info footer
export const AdditionalSecurityInfo: React.FC = () => (
  <div className="mt-8 bg-white/60 backdrop-blur-xl rounded-2xl border-2 border-pink-100 p-6">
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-6 h-6 text-pink-600" />
      </div>
      <div>
        <h3 className="font-bold text-gray-800 mb-2">Keep Your Account Safe</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start space-x-2">
            <span className="text-pink-500 mt-0.5">•</span>
            <span>Never share your password with anyone</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-purple-500 mt-0.5">•</span>
            <span>Use a unique password for NotesBloom</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-rose-500 mt-0.5">•</span>
            <span>Change your password regularly for better security</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);