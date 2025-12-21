import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Skills from "./pages/Skills";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/layout/AdminLayout";
import AdminProjects from "./pages/admin/Projects";
import AdminProfile from "./pages/admin/Profile";
import AdminSkills from "./pages/admin/Skills";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:slug", element: <ProjectDetail /> },
      { path: "/skills", element: <Skills /> },
      { path: "/about", element: <About /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "login", element: <AdminLogin /> },
      { path: "projects", element: <AdminProjects /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "skills", element: <AdminSkills /> },
      { path: "", element: <AdminProjects /> }, // Default to projects
    ]
  },
  { path: "*", element: <NotFound /> },
]);
