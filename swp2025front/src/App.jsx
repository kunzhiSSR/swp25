import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuantumCircuitBuilder from './pages/QuantumCircuitBuilder';
import UploadPage from './pages/UploadPage';
import BenchmarkOverview from './pages/BenchmarkOverview';
import EvaluationResult from './pages/EvaluationResult';
import { CircuitProvider } from '@/contexts/CircuitContext';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/builder" />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/overview" element={<BenchmarkOverview />} />
        <Route path="/result" element={<EvaluationResult />} />
        <Route path="/builder" element={<QuantumCircuitBuilder />} />
      </Routes>
    </>
  );
}
