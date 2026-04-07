import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/10 dark font-sans">
      <Header />
      <main className="container mx-auto max-w-7xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
