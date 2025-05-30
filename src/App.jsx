import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import UploadPage from "./pages/UploadPage";
import BenchmarkOverview from "./pages/BenchmarkOverview";
import EvaluationResult from "./pages/EvaluationResult";
import CircuitBuilder from "./pages/CircuitBuilder";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="p-6">
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/benchmark" element={<BenchmarkOverview />} />
            <Route path="/results" element={<EvaluationResult />} />
            <Route path="/builder" element={<CircuitBuilder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
