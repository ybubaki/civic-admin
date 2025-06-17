import { Routes, Route, BrowserRouter } from "react-router";
import Login from "./pages/login";
import DashboardLayout from "./layouts/dashboard.layout";
import Home from "./pages/dashboard/home";
import Reports from "./pages/dashboard/reports";
import Users from "./pages/dashboard/users";
import Settings from "./pages/dashboard/settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="issues" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
