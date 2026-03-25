import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const authRoutes = ["/login", "/admin/login"];
const adminRoutes = ["/admin", "/admin/projects", "/admin/dashboard"];

export default function Layout() {
  const location = useLocation();
  const pathname = location.pathname;

  const hideShell = authRoutes.includes(pathname) || adminRoutes.some((route) => pathname.startsWith(route));

  if (hideShell) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_25%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_22%),linear-gradient(180deg,#020617_0%,#030712_48%,#020617_100%)]" />

      <Header />

      <main className="relative z-10 min-h-[calc(100vh-220px)] px-0 pb-6 pt-4 sm:pt-5 lg:pt-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
