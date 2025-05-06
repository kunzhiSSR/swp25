import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "UploadPage" },
    { path: "/benchmark", label: "BenchmarkOverview" },
    { path: "/results", label: "EvaluationsREsult" },
    { path: "/builder", label: "CircuitBuilder" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <style>{`
        .navbar {
          background-color: whit;
          padding: 1rem 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .navbar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-title {
          font-weight: bold;
          color: #2563eb;
        }

        .menu-toggle {
          font-size: 1.5rem;
          background: none;
          border: none;
          color: #2563eb;
          cursor: pointer;
          display: none;
        }

        .navbar-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .nav-link {
          padding: 0.4rem 0.75rem;
          border-radius: 0.25rem;
          color: #2563eb;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }

        .nav-link:hover {
          background-color:rgb(219, 242, 254);
        }

        .nav-link.active {
          background-color: #2563eb;
          color: white;
        }

       
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-header">
          <div className="navbar-title">Quantum Circuit </div>

        </div>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`nav-link ${isActive(item.path) ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
