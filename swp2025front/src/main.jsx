// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App.jsx';
// import './index.css';



// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// );


// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import App from "./App";
import { CircuitProvider } from "@/contexts/CircuitContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* DnD Provider */}
    <DndProvider backend={HTML5Backend}>
      {/* 全站量子电路状态 Provider */}
      <CircuitProvider>
        {/* 路由 */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CircuitProvider>
    </DndProvider>
  </React.StrictMode>
);
