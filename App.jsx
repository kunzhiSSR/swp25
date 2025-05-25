import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import UploadPage from "./pages/UploadPage";
import BenchmarkOverview from "./pages/BenchmarkOverview";
import EvaluationResult from "./pages/EvaluationResult";
import CircuitBuilder from "./pages/CircuitBuilder";
import { CircuitProvider } from '@/contexts/CircuitContext';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-[250px] min-h-screen bg-[#1A1B1E] text-white">
      <div className="p-4">
        <div className="flex items-center gap-2 p-4">
          <span className="text-lg">QML Benchmark</span>
          <button className="ml-auto text-gray-400">
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
        <nav className="space-y-4 mt-4">
          <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg ${pathname === '/dashboard' ? 'bg-gray-800' : ''}`}>
            Dashboard
          </Link>
          <Link to="/upload" className={`flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg ${pathname === '/upload' ? 'bg-gray-800' : ''}`}>
            <span className="text-xl">↑</span>
            Upload
          </Link>
          <Link to="/benchmark" className={`flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg ${pathname === '/benchmark' ? 'bg-gray-800' : ''}`}>
            Benchmark-Komponenten
          </Link>
          <Link to="/visual-editor" className={`flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg ${pathname === '/visual-editor' ? 'bg-gray-800' : ''}`}>
            <span className="text-xl">✎</span>
            Visual Editor
          </Link>
          <Link to="/results" className={`flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg ${pathname === '/results' ? 'bg-gray-800' : ''}`}>
            Ergebnisse
          </Link>
        </nav>
      </div>
    </div>
  );
};

function App() {
  return (
    <CircuitProvider>
      <Router>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/dashboard" element={<BenchmarkOverview />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/benchmark" element={<BenchmarkOverview />} />
              <Route path="/visual-editor" element={<CircuitBuilder />} />
              <Route path="/results" element={<EvaluationResult />} />
              <Route path="/" element={<BenchmarkOverview />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CircuitProvider>
  );
}

export default App;
