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
  {
    path: "/admin/login",
    element: <Login />
  },
  {
    path: "/admin",
    element: <AdminApp />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "projects", element: <ProjectsAdmin /> },
      { path: "projects/create", element: <ProjectForm /> },
      { path: "projects/:id/edit", element: <ProjectForm /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
