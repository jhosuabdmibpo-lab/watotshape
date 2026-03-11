import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "../components/ui/utils";
import { 
  LayoutDashboard, 
  Ticket, 
  UserCircle, 
  FileText, 
  Settings,
  ShieldCheck,
  Users,
  Building2
} from "lucide-react";
import logo from "../../assets/logo.png";

const NavLink = ({ to, icon: Icon, children, exact = false }) => {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? "bg-white/10 text-white"
          : "text-gray-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{children}</span>
    </Link>
  );
};

export function AdminSidebar() {
  return (
    <div
      className="w-64 text-white flex flex-col h-screen fixed left-0 top-0 z-50"
      style={{ background: "linear-gradient(180deg, #020e27 0%, #4d5900 100%)" }}
    >
      <div className="flex items-center justify-center p-4 border-b border-white/10 h-20">
        <img src={logo} alt="Logo" className="h-8 w-auto mr-2 filter drop-shadow-[0_0_6px_#b0bf00]" />
        <h2 className="text-xl font-semibold tracking-tight">HR System</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/admin" icon={LayoutDashboard}>
          Admin Dashboard
        </NavLink>
        <NavLink to="/superadmin" icon={ShieldCheck}>
          Super Admin
        </NavLink>
        {/* You can add more links here as needed */}
      </nav>
      <div className="p-4 border-t border-white/10">
        <NavLink to="/settings" icon={Settings}>
          Settings
        </NavLink>
      </div>
    </div>
  );
}

