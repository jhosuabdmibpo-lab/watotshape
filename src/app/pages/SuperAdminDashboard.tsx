import { useState } from "react";
import { Link } from "react-router";
import { AdminSidebar } from "../components/AdminSidebar";
import { KPICard } from "../components/KPICard";
import { StatusBadge } from "../components/StatusBadge";
import { PriorityBadge } from "../components/PriorityBadge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Ticket,
  Users,
  Calendar as CalendarIcon,
  Shield,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  ArrowDownUp
} from "lucide-react";
import { mockTickets, mockUsers } from "../data/mockData";
import { format } from "date-fns";
import logo from "../../assets/logo.png";

// Mock Activity Logs
const mockActivities = [
  { id: 1, user: "Admin User", action: "Created new employee account", target: "John Doe", time: "2 hours ago" },
  { id: 2, user: "HR Manager", action: "Resolved ticket", target: "TKT-005", time: "4 hours ago" },
  { id: 3, user: "Admin User", action: "Updated system settings", target: "Email Notifications", time: "1 day ago" },
  { id: 4, user: "HR Specialist", action: "Reassigned ticket", target: "TKT-002", time: "1 day ago" },
  { id: 5, user: "Office Head", action: "Approved leave request", target: "REQ-889", time: "2 days ago" },
];

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const handleCreateUser = () => {
    // In a real app, you would handle form validation and API calls here.
    console.log("Creating new user...");
    // For now, we just close the modal.
    // You could add the new user to the `allUsers` state to see it in the UI.
    setIsAddUserModalOpen(false);
  };

  // KPI Calculations
  const totalTickets = mockTickets.length;
  // Mocking total users count including those not in mockUsers array for demo
  const totalUsers = mockUsers.length + 15; 
  const activeAdmins = mockUsers.filter(u => u.role === 'admin').length;

  // Filter and Sort Logic for Tickets
  const sortedAndFilteredTickets = mockTickets
    .filter(ticket => {
      const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
      const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDate = !date || new Date(ticket.createdAt).toDateString() === date.toDateString();
      return matchesStatus && matchesSearch && matchesDate;
    })
    .sort((a, b) => {
      const [sortBy, sortOrder] = sortOption.split('-');
      const order = sortOrder === 'asc' ? 1 : -1;

      if (sortBy === 'date') {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order;
      }
      if (sortBy === 'name') {
        return a.employeeName.localeCompare(b.employeeName) * order;
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
        const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
        return (priorityA - priorityB) * order;
      }
      return 0;
    });

  // Combine mock users with some extra dummy data for the table
  const allUsers = [
    ...mockUsers,
    { id: "EMP-999", name: "New Employee", email: "new.emp@company.com", role: "employee", department: "Sales" },
    { id: "HR-888", name: "Senior HR", email: "hr.senior@company.com", role: "hr", department: "HR" }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <div className="flex-1 ml-64 overflow-auto" style={{
        backgroundImage: `url(${logo}), linear-gradient(135deg, #f7f9e6 0%, #eef2cc 100%)`,
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '500px, cover',
        backgroundBlendMode: 'soft-light',
        backgroundAttachment: 'fixed',
      }}>
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-[#4e5668]">Super Admin Dashboard</h1>
              <p className="text-slate-600 mt-1">System-wide control, monitoring, and administration</p>
            </div>
            <div className="flex gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-auto justify-start text-left font-normal bg-white ${
                      !date && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select Period</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button className="bg-[#4e5668] text-white hover:bg-[#4e5668]/90 shadow-md" onClick={() => setIsAddUserModalOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-6 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 px-1 text-sm font-medium transition-all ${
                activeTab === "overview" 
                  ? "border-b-2 border-[#4e5668] text-[#4e5668]" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Overview & Tickets
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`pb-3 px-1 text-sm font-medium transition-all ${
                activeTab === "users" 
                  ? "border-b-2 border-[#4e5668] text-[#4e5668]" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            > 
              User Management
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`pb-3 px-1 text-sm font-medium transition-all ${
                activeTab === "activity" 
                  ? "border-b-2 border-[#4e5668] text-[#4e5668]" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Activity Logs
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard title="Total Users" value={totalUsers} icon={Users} color="text-[#4e5668]" />
                <KPICard title="Total Tickets" value={totalTickets} icon={Ticket} color="text-[#b0bf00]" />
                <KPICard title="Active Admins" value={activeAdmins} icon={Shield} color="text-[#4e5668]" />
              </div>

              {/* Tickets Table */}
              <Card
                className="border-slate-700 text-slate-300"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%), linear-gradient(180deg, #2c3e50 0%, #0f172a 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 10px 30px rgba(0, 0, 0, 0.6)'
                }}
              >
                <CardHeader className="border-b border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-white">All System Tickets</CardTitle>
                    <CardDescription className="text-slate-400">View and manage tickets across all departments</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <div className="relative w-full sm:w-[250px]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search tickets..."
                        className="pl-8 bg-slate-800/50 border-slate-700 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-[150px] bg-slate-800/50 border-slate-700 text-white">
                        <Filter className="w-4 h-4 mr-2 text-slate-400" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-full sm:w-[180px] bg-slate-800/50 border-slate-700 text-white">
                        <ArrowDownUp className="w-4 h-4 mr-2 text-slate-400" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date-desc">Date (Newest)</SelectItem>
                        <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                        <SelectItem value="name-asc">Requester (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Requester (Z-A)</SelectItem>
                        <SelectItem value="priority-desc">Priority (High-Low)</SelectItem>
                        <SelectItem value="priority-asc">Priority (Low-High)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-slate-700">
                        <TableHead style={{ width: '100px', color: 'white' }}>ID</TableHead>
                        <TableHead style={{ color: 'white' }}>Subject</TableHead>
                        <TableHead style={{ color: 'white' }}>Requester</TableHead>
                        <TableHead style={{ color: 'white' }}>Status</TableHead>
                        <TableHead style={{ color: 'white' }}>Priority</TableHead>
                        <TableHead style={{ color: 'white' }}>Assigned To</TableHead>
                        <TableHead style={{ color: 'white' }}>Date</TableHead>
                        <TableHead style={{ color: 'white' }}></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedAndFilteredTickets.length === 0 ? (
                        <TableRow className="border-b-0">
                          <TableCell colSpan={8} className="text-center py-8 text-slate-400">
                            No tickets found matching your filters.
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortedAndFilteredTickets.map((ticket) => (
                          <TableRow key={ticket.id} className="border-b-slate-800 hover:bg-slate-800/50">
                            <TableCell className="font-medium">{ticket.id}</TableCell>
                            <TableCell className="max-w-xs truncate">{ticket.subject}</TableCell>
                            <TableCell>{ticket.employeeName}</TableCell>
                            <TableCell><StatusBadge status={ticket.status} /></TableCell>
                            <TableCell><PriorityBadge priority={ticket.priority} /></TableCell>
                            <TableCell>{ticket.assignedTo || "Unassigned"}</TableCell>
                            <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Link to={`/ticket/${ticket.id}`} className="text-lime-400 hover:text-lime-300">
                                <Button variant="ghost" size="sm">View</Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "users" && (
            <Card
              className="border-slate-700 text-slate-300"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%), linear-gradient(180deg, #2c3e50 0%, #0f172a 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 10px 30px rgba(0, 0, 0, 0.6)'
              }}
            >
              <CardHeader className="border-b border-slate-700 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">User Management</CardTitle>
                  <CardDescription className="text-slate-400">Manage employees, HR staff, and admins</CardDescription>
                </div>
                <Button size="sm" className="bg-[#4e5668] text-white hover:bg-[#4e5668]/90" onClick={() => setIsAddUserModalOpen(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-slate-700">
                      <TableHead style={{ color: 'white' }}>Name</TableHead>
                      <TableHead style={{ color: 'white' }}>Email</TableHead>
                      <TableHead style={{ color: 'white' }}>Role</TableHead>
                      <TableHead style={{ color: 'white' }}>Department</TableHead>
                      <TableHead className="text-right" style={{ color: 'white' }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allUsers.map((user) => (
                      <TableRow key={user.id} className="border-b-slate-800 hover:bg-slate-800/50">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            user.role === 'admin' ? 'bg-[#4e5668]/10 text-[#4e5668]' : 
                            user.role === 'hr' ? 'bg-[#b0bf00]/20 text-[#828d00]' : 
                            'bg-slate-100 text-slate-800'}`}>
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>{user.department || "-"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="text-lime-400 hover:text-lime-300">Edit</Button>
                            {user.role === 'admin' && (
                                <Button variant="outline" size="sm" className="text-xs border-amber-500 text-amber-500 hover:bg-amber-500/10 hover:text-amber-400">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Grant Authority
                                </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === "activity" && (
            <Card
              className="border-slate-700 text-slate-300"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%), linear-gradient(180deg, #2c3e50 0%, #0f172a 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 10px 30px rgba(0, 0, 0, 0.6)'
              }}
            >
              <CardHeader className="border-b border-slate-700">
                <CardTitle className="text-white">System Activity Log</CardTitle>
                <CardDescription className="text-slate-400">Trace actions performed by Office Heads, HR, and Admins</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-slate-700">
                      <TableHead style={{ color: 'white' }}>User</TableHead>
                      <TableHead style={{ color: 'white' }}>Action</TableHead>
                      <TableHead style={{ color: 'white' }}>Target</TableHead>
                      <TableHead style={{ color: 'white' }}>Time</TableHead>
                      <TableHead style={{ color: 'white' }}></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockActivities.map((log) => (
                      <TableRow key={log.id} className="border-b-slate-800 hover:bg-slate-800/50">
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.target}</TableCell>
                        <TableCell className="text-slate-500">{log.time}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new user account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" placeholder="John Doe" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@company.com" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">Department</Label>
              <Input id="department" placeholder="Engineering" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateUser} className="bg-[#4e5668] text-white hover:bg-[#4e5668]/90">Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}