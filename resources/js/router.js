import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Simple fallback components for now
const Home = () => < div className = "p-8" > < h1 className = "text-3xl font-bold text-green-400" > Home Page < /h1><p>Welcome to the portfolio</p > < /div>;
const Projects = () => < div className = "p-8" > < h1 className = "text-3xl font-bold text-blue-400" > Projects Page < /h1><p>List of projects</p > < /div>;
const ProjectDetail = () => < div className = "p-8" > < h1 className = "text-3xl font-bold text-purple-400" > Project Detail Page < /h1><p>Project details</p > < /div>;
const Skills = () => < div className = "p-8" > < h1 className = "text-3xl font-bold text-yellow-400" > Skills Page < /h1><p>Skills and expertise</p > < /div>;
const About = () => < div className = "p-8" > < h1 className = "text-3xl font-bold text-red-400" > About Page < /h1><p>About me section</p > < /div>;
const NotFound = () => < div className = "p-8" > < h1 className = "text-3xl font-bold text-gray-400" > 404 - Page Not Found < /h1><p>The page you're looking for doesn't exist</p > < /div>;

export const router = createBrowserRouter([{
        path: "/",
        element: < Home / > ,
        errorElement: < NotFound / >
    },
    {
        path: "/projects",
        element: < Projects / > ,
        errorElement: < NotFound / >
    },
    {
        path: "/projects/:slug",
        element: < ProjectDetail / > ,
        errorElement: < NotFound / >
    },
    {
        path: "/skills",
        element: < Skills / > ,
        errorElement: < NotFound / >
    },
    {
        path: "/about",
        element: < About / > ,
        errorElement: < NotFound / >
    },
    {
        path: "*",
        element: < NotFound / >
    }
]);
