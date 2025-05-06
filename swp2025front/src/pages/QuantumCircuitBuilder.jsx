// src/pages/QuantumCircuitBuilder.jsx
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GatePalette from '../components/GatePalette';
import CircuitCanvas from '../components/CircuitCanvas';
import Toolbar from '../components/Toolbar';
import { CircuitProvider } from '../contexts/CircuitContext';

export default function QuantumCircuitBuilder() {
  const handleRun = () => {
    console.log('Run benchmark…');
  };
  function CircuitBuilderPage() {
    return (
      <>
        <h1 className="text-2xl font-bold mb-2">Quantum Circuit</h1>
        <Toolbar />                     {/* 👈 新 Toolbar */}
        <div className="flex">
          <GatePalette />
          <CircuitCanvas />
        </div>
      </>
    );
  }
  return (
    <CircuitProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col h-full">
          <Toolbar onRun={handleRun} />
          <div className="flex flex-1 overflow-hidden">
            <GatePalette />
            <CircuitCanvas />
          </div>
        </div>
      </DndProvider>
    </CircuitProvider>
  );
}
