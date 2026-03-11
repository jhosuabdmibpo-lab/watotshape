import { useParams, Link } from "react-router";
import { AdminSidebar } from "../components/AdminSidebar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, User, Mail, Building, Shield, Tag } from "lucide-react";
import { mockUsers } from "../data/mockData";
import logo from "../../assets/logo.png";

export default function UserEdit() {
  const { userId } = useParams();
  const user = mockUsers.find(u => u.id === userId);

  if (!user) {
    return (
      <div className="flex min-h-screen bg-slate-50 items-center justify-center">
        <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">User not found</h2>
            <Link to="/superadmin">
                <Button variant="link">Go Back to Dashboard</Button>
            </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // In a real app, you would handle form validation and API calls here.
    console.log("Saving user changes...");
  };

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
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/superadmin" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to User Management
            </Link>
            <h1 className="text-3xl font-semibold text-[#4e5668]">Edit User</h1>
            <p className="text-slate-600 mt-1">Update user information and permissions</p>
          </div>

          {/* User Account Details Display */}
          <div className="grid gap-6 mb-6">
            {/* Account Information Card */}
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Information
                </CardTitle>
                <CardDescription>Current user account details</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <User className="w-4 h-4" /> User ID
                    </Label>
                    <div className="p-3 bg-slate-100 rounded-md font-mono text-sm">{user.id}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Role
                    </Label>
                    <Select defaultValue={user.role}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" /> Full Name
                  </Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email Address
                  </Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Building className="w-4 h-4" /> Department
                  </Label>
                  <Select defaultValue={user.department || "hr-department"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr-department">HR Department</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Card (for HR users) */}
            {user.role === 'hr' && user.assignedCategories && (
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    HR Assigned Categories
                  </CardTitle>
                  <CardDescription>Categories this HR staff is assigned to manage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.assignedCategories.map((category, index) => (
                      <Badge key={index} variant="outline" className="text-sm px-3 py-1">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 max-w-2xl">
            <Link to="/superadmin">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleSave} className="bg-[#4e5668] text-white hover:bg-[#4e5668]/90">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

