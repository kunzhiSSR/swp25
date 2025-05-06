// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/upload', label: 'UploadPage' },
  { to: '/overview', label: 'BenchmarkOverview' },
  { to: '/result', label: 'EvaluationsResult' },
  { to: '/builder', label: 'CircuitBuilder' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="flex items-center px-6 py-3 shadow bg-white">
      <Link to="/" className="text-2xl font-bold text-indigo-700 mr-10">
        Quantum Circuit
      </Link>
      <nav className="flex gap-6 ml-auto">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`px-4 py-1 rounded ${pathname === to ? 'bg-indigo-600 text-white' : 'text-indigo-600'
              }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
