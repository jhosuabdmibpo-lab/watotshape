import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import logo from "../../assets/logo.png";
import "../../styles/login.css";

// --- Mock Data ---
const mockUsers = [
  { id: "HR-001", name: "HR Admin", email: "hr@company.com", role: "hr" as const },
  { id: "SYS-001", name: "System Admin", email: "admin@company.com", role: "admin" as const }
];

// --- Custom SVG Components ---

// Honeycomb Pattern Component
const HoneycombPattern = ({ className }) => (
  <svg 
    className={`absolute pointer-events-none ${className}`} 
    width="250" 
    height="250" 
    viewBox="0 0 450 450" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Pointy-topped hexagon with Radius = 100 */}
      <polygon 
        id="hex" 
        points="0,-100 86.6,-50 86.6,50 0,100 -86.6,50 -86.6,-50" 
      />
    </defs>
    {/* Group with opacity so overlapping strokes don't multiply in darkness */}
    <g opacity="0.6" stroke="#C9D866" strokeWidth="12" fill="none" strokeLinejoin="round">
      <use href="#hex" x="173.2" y="150" />
      <use href="#hex" x="86.6" y="0" />
      <use href="#hex" x="259.8" y="0" />
      <use href="#hex" x="0" y="150" />
      <use href="#hex" x="346.4" y="150" />
      <use href="#hex" x="86.6" y="300" />
      <use href="#hex" x="259.8" y="300" />
    </g>
  </svg>
);


// --- Main Page Component ---
export default function App() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"employee" | "hr" | "admin" | "mainadmin" | "superadmin">("employee");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - set user based on selected role
    let mockUser;
    if (selectedRole === "employee") {
      mockUser = {
        id: "EMP-1234",
        name: "Sarah Johnson",
        email: "sarah.johnson@company.com",
        role: "employee",
        department: "Engineering",
      };
    } else if (selectedRole === "hr") {
      mockUser = mockUsers.find(u => u.role === "hr")!;
    } else if (selectedRole === "admin") {
      mockUser = mockUsers.find(u => u.role === "admin")!;
    } else if (selectedRole === "mainadmin") {
      mockUser = {
        id: "MAIN-001",
        name: "Main Admin",
        email: "mainadmin@company.com",
        role: "mainadmin" as const,
        department: "IT",
      };
    } else if (selectedRole === "superadmin") {
      mockUser = {
        id: "SA-001",
        name: "Super Admin",
        email: "super@company.com",
        role: "superadmin" as const,
        department: "IT",
      };
    }

    setUser(mockUser);

    // Route based on role
    if (selectedRole === "admin") {
      navigate("/admin");
    } else if (selectedRole === "hr") {
      navigate("/hr");
    } else if (selectedRole === "mainadmin") {
      navigate("/admin");
    } else if (selectedRole === "superadmin") {
      navigate("/superadmin");
    } else {
      navigate("/employee");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      <img 
        src={logo} 
        alt="Background Logo" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] object-cover opacity-10 blur-lg -rotate-6"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"></div>
      
      <Card className="w-full max-w-md shadow-2xl border-none overflow-hidden z-10" 
        style={{
          background: 'linear-gradient(to top, #e9f09f 0%, white 40%)',
        }}>
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <img 
              src={logo} 
              alt="HR Ticketing System Logo" 
              className="w-16 h-16 rounded-2xl object-cover"/>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black leading-tight">
            HUMAN RESOURCE<br/>TICKETING
          </h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5 text-left">
              <label htmlFor="email" className="text-sm font-medium text-gray-800">
                Employee ID/ Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter your Employee ID or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 px-3 py-2 bg-gray-100 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b0bf00]/50 transition-shadow"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label htmlFor="password" className="text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-11 px-3 py-2 bg-gray-100 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b0bf00]/50 transition-shadow"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 text-#020e27 font-bold transition-all duration-300 hover:brightness-110 active:scale-[0.98] border-none shadow-md"
              style={{ 
                background: `linear-gradient(
                  to bottom, 
                  #edf3a9 10%, 
                  #dbeb2d 20%, 
                  #c4d109 70%, 
                  #8e9a00 100%
                )`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              Sign In
            </Button>

            {/* Demo toggle for testing */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center mb-2">Demo Mode - Select Role:</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={selectedRole === "employee" ? "default" : "outline"}
                  onClick={() => setSelectedRole("employee")}
                  size="sm"
                  className={`flex-1 transition-all duration-200 shadow-sm font-medium ${
                    selectedRole === "employee" 
                      ? "text-white border-none" 
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                  style={{
                    background: selectedRole === "employee"
                      ? "linear-gradient(to bottom, #1e293b 0%, #0f172a 100%)"
                      : "linear-gradient(to bottom, #ffffff 0%, #f1f5f9 100%)",
                    boxShadow: selectedRole === "employee"
                      ? "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.2)"
                      : "inset 0 1px 0 rgba(255,255,255,1), 0 1px 2px rgba(0,0,0,0.05)"
                  }}
                >
                  Employee
                </Button>
                <Button
                  type="button"
                  variant={selectedRole === "hr" ? "default" : "outline"}
                  onClick={() => setSelectedRole("hr")}
                  size="sm"
                  className={`flex-1 transition-all duration-200 shadow-sm ${
                    selectedRole === "hr" 
                      ? "text-white border-none" 
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                  style={{
                    background: selectedRole === "hr"
                      ? "linear-gradient(to bottom, #1a2a44 0%, #0a1428 100%)"
                      : "linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)",
                    boxShadow: selectedRole === "hr"
                      ? "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.2)"
                      : "inset 0 1px 0 rgba(255,255,255,1), 0 1px 2px rgba(0,0,0,0.05)"
                  }}
                >
                  HR
                </Button>
                <Button
                  type="button"
                  variant={selectedRole === "admin" ? "default" : "outline"}
                  onClick={() => setSelectedRole("admin")}
                  size="sm"
                  className={`flex-1 transition-all duration-200 shadow-sm font-medium ${
                    selectedRole === "admin" 
                      ? "text-white border-none" 
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                  style={{
                    background: selectedRole === "admin"
                      ? "linear-gradient(to bottom, #1e293b 0%, #0f172a 100%)"
                      : "linear-gradient(to bottom, #ffffff 0%, #f1f5f9 100%)",
                    boxShadow: selectedRole === "admin"
                      ? "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.2)"
                      : "inset 0 1px 0 rgba(255,255,255,1), 0 1px 2px rgba(0,0,0,0.05)"
                  }}
                >
                  Admin
                </Button>
                <Button
                  type="button"
                  variant={selectedRole === "mainadmin" ? "default" : "outline"}
                  onClick={() => setSelectedRole("mainadmin")}
                  size="sm"
                  className={`flex-1 transition-all duration-200 shadow-sm font-medium ${
                    selectedRole === "mainadmin" 
                      ? "text-white border-none" 
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                  style={{
                    background: selectedRole === "mainadmin"
                      ? "linear-gradient(to bottom, #1e293b 0%, #0f172a 100%)"
                      : "linear-gradient(to bottom, #ffffff 0%, #f1f5f9 100%)",
                    boxShadow: selectedRole === "mainadmin"
                      ? "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.2)"
                      : "inset 0 1px 0 rgba(255,255,255,1), 0 1px 2px rgba(0,0,0,0.05)"
                  }}
                >
                  Main Admin
                </Button>
                <Button
                  type="button"
                  variant={selectedRole === "superadmin" ? "default" : "outline"}
                  onClick={() => setSelectedRole("superadmin")}
                  size="sm"
                  className={`flex-1 transition-all duration-200 shadow-sm font-medium ${
                    selectedRole === "superadmin" 
                      ? "text-white border-none" 
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                  style={{
                    background: selectedRole === "superadmin"
                      ? "linear-gradient(to bottom, #1e293b 0%, #0f172a 100%)"
                      : "linear-gradient(to bottom, #ffffff 0%, #f1f5f9 100%)",
                    boxShadow: selectedRole === "superadmin"
                      ? "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.2)"
                      : "inset 0 1px 0 rgba(255,255,255,1), 0 1px 2px rgba(0,0,0,0.05)"
                  }}
                >
                  Super Admin
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
