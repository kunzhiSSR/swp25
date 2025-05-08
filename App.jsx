import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import UploadPage from "./pages/UploadPage";
import BenchmarkOverview from "./pages/BenchmarkOverview";
import EvaluationResult from "./pages/EvaluationResult";
import CircuitBuilder from "./pages/CircuitBuilder";
import { CircuitProvider } from '@/contexts/CircuitContext';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <CircuitProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="p-6">
              <Routes>
                <Route path="/" element={<UploadPage />} />
                <Route path="/overview" element={<BenchmarkOverview />} />
                <Route path="/result" element={<EvaluationResult />} />
                <Route path="/builder" element={<CircuitBuilder />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CircuitProvider>
    </DndProvider>
  );
}

export default App;
