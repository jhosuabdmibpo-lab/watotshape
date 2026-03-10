import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CreateTicket from "./pages/CreateTicket";
import AdminDashboard from "./pages/AdminDashboard";
import HRDashboard from "./pages/HRDashboard";
import TicketDetail from "./pages/TicketDetail";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/employee",
    Component: EmployeeDashboard,
  },
  {
    path: "/employee/create-ticket",
    Component: CreateTicket,
  },
  {
    path: "/hr",
    Component: HRDashboard,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/superadmin",
    Component: SuperAdminDashboard,
  },
  {
    path: "/ticket/:id",
    Component: TicketDetail,
  },
]);
