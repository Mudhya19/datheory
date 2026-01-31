import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import AdminApp from "./admin/AdminApp";
import Dashboard from "./admin/pages/Dashboard";
import ProjectsAdmin from "./admin/pages/ProjectsAdmin";
import ProjectForm from "./admin/pages/ProjectForm";
import Login from "./admin/pages/Login";
import AdminGuard from "./admin/AdminGuard";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import SkillForm from "./admin/pages/SkillForm";
import Profile from "./admin/pages/Profile";
import Users from "./admin/pages/Users";
import SkillsAdmin from "./admin/pages/Skills";

// Simple fallback components for now
const Skills = () => <div className="p-8"><h1 className="text-3xl font-bold text-yellow-400">Skills Page</h1><p>Skills and expertise</p></div>;
const About = () => <div className="p-8"><h1 className="text-3xl font-bold text-red-400">About Page</h1><p>About me section</p></div>;
const NotFound = () => <div className="p-8"><h1 className="text-3xl font-bold text-gray-400">404 - Page Not Found</h1><p>The page you're looking for doesn't exist</p></div>;

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />
      },
      {
        path: "/projects",
        element: <Projects />,
        errorElement: <NotFound />
      },
      {
        path: "/projects/:slug",
        element: <ProjectDetail />,
        errorElement: <NotFound />
      },
      {
        path: "/skills",
        element: <Skills />,
        errorElement: <NotFound />
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <NotFound />
      }
    ]
  },
  // Admin login - accessible at /login (primary) and /admin/login (alias)
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/admin/login",
    element: <Login />
  },
  {
    path: "/admin",
    element: (
      <AdminGuard>
        <AdminApp />
      </AdminGuard>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "projects",
        element: <ProtectedRoute permission="projects.view"><ProjectsAdmin /></ProtectedRoute>
      },
      {
        path: "projects/create",
        element: <ProtectedRoute permission="projects.create"><ProjectForm /></ProtectedRoute>
      },
      {
        path: "projects/:id/edit",
        element: <ProtectedRoute permission="projects.edit"><ProjectForm /></ProtectedRoute>
      },
      {
        path: "skills",
        element: <ProtectedRoute permission="skills.view"><SkillsAdmin /></ProtectedRoute>
      },
      {
        path: "skills/create",
        element: <ProtectedRoute permission="skills.create"><SkillForm /></ProtectedRoute>
      },
      {
        path: "skills/:id/edit",
        element: <ProtectedRoute permission="skills.edit"><SkillForm /></ProtectedRoute>
      },
      {
        path: "profile",
        element: <ProtectedRoute permission="profile.view"><Profile /></ProtectedRoute>
      },
      {
        path: "users",
        element: <ProtectedRoute permission="users.view"><Users /></ProtectedRoute>
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
