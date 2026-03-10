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
  Activity,
  Calendar as CalendarIcon,
  Shield,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { mockTickets, mockUsers } from "../data/mockData";

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
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

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
  const systemHealth = "98%";

  // Filter Logic for Tickets
  const filteredTickets = mockTickets.filter(ticket => {
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Combine mock users with some extra dummy data for the table
  const allUsers = [
    ...mockUsers,
    { id: "EMP-999", name: "New Employee", email: "new.emp@company.com", role: "employee", department: "Sales" },
    { id: "HR-888", name: "Senior HR", email: "hr.senior@company.com", role: "hr", department: "HR" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Super Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">System-wide control, monitoring, and administration</p>
            </div>
            <div className="flex gap-3">
               <Button variant="outline" className="flex items-center gap-2 bg-white" onClick={() => setIsAddUserModalOpen(true)}>
                <CalendarIcon className="w-4 h-4" />
                <span>Select Period</span>
              </Button>
              <Button className="bg-slate-900 text-white hover:bg-slate-800 shadow-md" onClick={() => setIsAddUserModalOpen(true)}>
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
                  ? "border-b-2 border-slate-900 text-slate-900" 
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview & Tickets
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`pb-3 px-1 text-sm font-medium transition-all ${
                activeTab === "users" 
                  ? "border-b-2 border-slate-900 text-slate-900" 
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`pb-3 px-1 text-sm font-medium transition-all ${
                activeTab === "activity" 
                  ? "border-b-2 border-slate-900 text-slate-900" 
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Activity Logs
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <KPICard title="Total Users" value={totalUsers} icon={Users} color="text-purple-600" />
                <KPICard title="Total Tickets" value={totalTickets} icon={Ticket} color="text-blue-600" />
                <KPICard title="Active Admins" value={activeAdmins} icon={Shield} color="text-indigo-600" />
                <KPICard title="System Health" value={systemHealth} icon={Activity} color="text-green-600" />
              </div>

              {/* Tickets Table */}
              <Card className="shadow-sm border-gray-200">
                <CardHeader className="border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>All System Tickets</CardTitle>
                    <CardDescription>View and manage tickets across all departments</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <div className="relative w-full sm:w-[250px]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search tickets..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <Filter className="w-4 h-4 mr-2 text-gray-500" />
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
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Requester</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTickets.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            No tickets found matching your filters.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTickets.map((ticket) => (
                          <TableRow key={ticket.id}>
                            <TableCell className="font-medium">{ticket.id}</TableCell>
                            <TableCell className="max-w-xs truncate">{ticket.subject}</TableCell>
                            <TableCell>{ticket.employeeName}</TableCell>
                            <TableCell><StatusBadge status={ticket.status} /></TableCell>
                            <TableCell><PriorityBadge priority={ticket.priority} /></TableCell>
                            <TableCell>{ticket.assignedTo || "Unassigned"}</TableCell>
                            <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Link to={`/ticket/${ticket.id}`}>
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
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-200 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage employees, HR staff, and admins</CardDescription>
                </div>
                <Button size="sm" className="bg-slate-900 text-white" onClick={() => setIsAddUserModalOpen(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                            ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                              user.role === 'hr' ? 'bg-blue-100 text-blue-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>{user.department || "-"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            {user.role === 'admin' && (
                                <Button variant="outline" size="sm" className="text-xs">
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
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle>System Activity Log</CardTitle>
                <CardDescription>Trace actions performed by Office Heads, HR, and Admins</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockActivities.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.target}</TableCell>
                        <TableCell className="text-gray-500">{log.time}</TableCell>
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
            <Button onClick={handleCreateUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}