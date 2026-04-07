import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#262626] bg-[#0A0A0A]/80 backdrop-blur-md">
      <div className="container mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          Campus<span className="text-gray-500">Swap</span>
        </Link>

        <div className="flex items-center gap-3">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171717] border border-[#262626] hover:border-gray-600 transition-colors">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
