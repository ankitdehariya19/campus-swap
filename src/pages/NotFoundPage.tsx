import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5 py-20 bg-[#0A0A0A]">
      <div className="relative">
        <h1 className="text-[180px] font-black leading-none tracking-tighter text-[#171717] select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
           <svg className="w-24 h-24 text-rose-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-12">Lost in space?</h2>
      <p className="text-gray-500 mt-4 max-w-md mx-auto text-[15px] leading-relaxed">
        The page you're searching for seems to have wandered off onto another campus. Let's get you back to safety.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/">
          <Button variant="primary" className="px-8 h-12 rounded-2xl min-w-[200px]">
            Return to Marketplace
          </Button>
        </Link>
        <button onClick={() => window.history.back()} className="h-12 px-8 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
          Go Back
        </button>
      </div>
    </div>
  );
}
