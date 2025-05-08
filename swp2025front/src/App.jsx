// import { Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import QuantumCircuitBuilder from './pages/QuantumCircuitBuilder';
// import UploadPage from './pages/UploadPage';
// import BenchmarkOverview from './pages/BenchmarkOverview';
// import EvaluationResult from './pages/EvaluationResult';
// import { CircuitProvider } from '@/contexts/CircuitContext';

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Navigate to="/builder" />} />
//         <Route path="/upload" element={<UploadPage />} />
//         <Route path="/overview" element={<BenchmarkOverview />} />
//         <Route path="/result" element={<EvaluationResult />} />
//         <Route path="/builder" element={<QuantumCircuitBuilder />} />
//       </Routes>
//     </>
//   );
// }


// // src/App.jsx
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Navbar from "@/components/Navbar";
// import QuantumCircuitBuilder from "@/pages/QuantumCircuitBuilder";
// import UploadPage from "@/pages/UploadPage";
// import BenchmarkOverview from "@/pages/BenchmarkOverview";
// import EvaluationResult from "@/pages/EvaluationResult";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <main className="p-6">
//         <Routes>
//           <Route path="/" element={<Navigate to="/builder" />} />
//           <Route path="/upload" element={<UploadPage />} />
//           <Route path="/overview" element={<BenchmarkOverview />} />
//           <Route path="/result" element={<EvaluationResult />} />
//           <Route path="/builder" element={<QuantumCircuitBuilder />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }


// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import QuantumCircuitBuilder from "@/pages/QuantumCircuitBuilder";
import UploadPage from "@/pages/UploadPage";
import BenchmarkOverview from "@/pages/BenchmarkOverview";
import EvaluationResult from "@/pages/EvaluationResult";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="h-[calc(100vh-64px)] p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/builder" />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/overview" element={<BenchmarkOverview />} />
          <Route path="/result" element={<EvaluationResult />} />
          <Route path="/builder" element={<QuantumCircuitBuilder />} />
        </Routes>
      </main>
    </div>
  );
}
