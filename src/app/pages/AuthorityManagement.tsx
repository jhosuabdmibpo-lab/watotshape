import { useState } from "react";
import { useParams, Link } from "react-router";
import { AdminSidebar } from "../components/AdminSidebar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft, User, Shield, MessageSquare, UserPlus, Ticket, Users } from "lucide-react";
import { mockUsers } from "../data/mockData";
import logo from "../../assets/logo.png";

interface AuthorityOptions {
  canCommentTicket: boolean;
  canAddAccount: boolean;
  canRemoveAccount: boolean;
  canAccessOtherAccount: boolean;
  canAccessAllTickets: boolean;
  canGiveAuthority: boolean;
}

export default function AuthorityManagement() {
  const { userId } = useParams();
  const user = mockUsers.find(u => u.id === userId);
  
  const [fullControl, setFullControl] = useState(false);
  const [authorities, setAuthorities] = useState<AuthorityOptions>({
    canCommentTicket: false,
    canAddAccount: false,
    canRemoveAccount: false,
    canAccessOtherAccount: false,
    canAccessAllTickets: false,
    canGiveAuthority: false,
  });

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

  const handleFullControlChange = (value: string) => {
    const isFullControl = value === "full";
    setFullControl(isFullControl);
    if (isFullControl) {
      setAuthorities({
        canCommentTicket: true,
        canAddAccount: true,
        canRemoveAccount: true,
        canAccessOtherAccount: true,
        canAccessAllTickets: true,
        canGiveAuthority: true,
      });
    } else {
      setAuthorities({
        canCommentTicket: false,
        canAddAccount: false,
        canRemoveAccount: false,
        canAccessOtherAccount: false,
        canAccessAllTickets: false,
        canGiveAuthority: false,
      });
    }
  };

  const handleAuthorityChange = (key: keyof AuthorityOptions, checked: boolean) => {
    setAuthorities(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleSave = () => {
    console.log("Saving authorities...", { fullControl, authorities });
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
            <h1 className="text-3xl font-semibold text-[#4e5668]">Authority Management</h1>
            <p className="text-slate-600 mt-1">Manage user permissions and access levels</p>
          </div>

          {/* Account Owner Info */}
          <Card className="max-w-2xl mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Owner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">User ID</Label>
                  <p className="font-mono text-sm">{user.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Current Role</Label>
                  <p className="capitalize font-medium">{user.role}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="text-lg font-semibold">{user.name}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Email</Label>
                  <p>{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authority Options */}
          <Card className="max-w-2xl mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Authority Settings
              </CardTitle>
              <CardDescription>Select the access level for this user</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Full Control Radio */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Access Level</Label>
                <RadioGroup 
                  value={fullControl ? "full" : "custom"} 
                  onValueChange={handleFullControlChange}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full-control" />
                    <Label htmlFor="full-control" className="font-medium cursor-pointer">
                      Full Control
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom-control" />
                    <Label htmlFor="custom-control" className="font-medium cursor-pointer">
                      Custom Authority
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Custom Authority Options */}
              <div className={`space-y-3 ${fullControl ? 'opacity-50 pointer-events-none' : ''}`}>
                <Label className="text-base font-medium">Specific Permissions</Label>
                <div className="grid gap-3 ml-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="can-comment" 
                      checked={authorities.canCommentTicket}
                      onCheckedChange={(checked) => handleAuthorityChange("canCommentTicket", checked as boolean)}
                    />
                    <Label htmlFor="can-comment" className="flex items-center gap-2 cursor-pointer">
                      <MessageSquare className="w-4 h-4" />
                      Can Comment on Tickets
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="can-add-account" 
                      checked={authorities.canAddAccount}
                      onCheckedChange={(checked) => handleAuthorityChange("canAddAccount", checked as boolean)}
                    />
                    <Label htmlFor="can-add-account" className="flex items-center gap-2 cursor-pointer">
                      <UserPlus className="w-4 h-4" />
                      Can Add Accounts
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="can-remove-account" 
                      checked={authorities.canRemoveAccount}
                      onCheckedChange={(checked) => handleAuthorityChange("canRemoveAccount", checked as boolean)}
                    />
                    <Label htmlFor="can-remove-account" className="flex items-center gap-2 cursor-pointer">
                      <UserPlus className="w-4 h-4" />
                      Can Remove Accounts
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="can-access-other-account" 
                      checked={authorities.canAccessOtherAccount}
                      onCheckedChange={(checked) => handleAuthorityChange("canAccessOtherAccount", checked as boolean)}
                    />
                    <Label htmlFor="can-access-other-account" className="flex items-center gap-2 cursor-pointer">
                      <Users className="w-4 h-4" />
                      Can Access Other Accounts
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="can-access-tickets" 
                      checked={authorities.canAccessAllTickets}
                      onCheckedChange={(checked) => handleAuthorityChange("canAccessAllTickets", checked as boolean)}
                    />
                    <Label htmlFor="can-access-tickets" className="flex items-center gap-2 cursor-pointer">
                      <Ticket className="w-4 h-4" />
                      Can Access All Tickets
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="can-give-authority" 
                      checked={authorities.canGiveAuthority}
                      onCheckedChange={(checked) => handleAuthorityChange("canGiveAuthority", checked as boolean)}
                    />
                    <Label htmlFor="can-give-authority" className="flex items-center gap-2 cursor-pointer">
                      <Users className="w-4 h-4" />
                      Can Give Authority to Other Accounts
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 max-w-2xl">
            <Link to="/superadmin">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleSave} className="bg-[#4e5668] text-white hover:bg-[#4e5668]/90">Save Authorities</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
