import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-green-400 font-semibold"
      : "text-slate-300 hover:text-white";

  return (
    <nav className="bg-slate-800 px-8 py-4 flex gap-6">
      <NavLink to="/" className={linkClass}>Home</NavLink>
      <NavLink to="/projects" className={linkClass}>Projects</NavLink>
      <NavLink to="/skills" className={linkClass}>Skills</NavLink>
      <NavLink to="/about" className={linkClass}>About</NavLink>
    </nav>
  );
}
