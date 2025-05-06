import React, { createContext, useContext, useState, useCallback } from 'react';
import { nanoid } from 'nanoid';          // pnpm add nanoid

/**
 * CircuitContext 负责管理电路全局状态（qubits 数与 gate 列表）
 */
const CircuitContext = createContext(null);

export const CircuitProvider = ({ children }) => {
    /** 量子比特行数（默认 5 行） */
    const [qubits, setQubits] = useState(5);

    /** gates 数组，每个 gate 至少包含:
     *   { id, type, target:[row], control?, params?, timeStep }
     */
    const [gates, setGates] = useState([]);

    /** 添加新 Gate（外部拖拽成功后调用） */
    const addGate = useCallback((gate) => {
        setGates((prev) => [...prev, { id: nanoid(6), ...gate }]);
    }, []);

    /** 更新 Gate（参数编辑抽屉保存时调用） */
    const updateGate = useCallback((id, updates) => {
        setGates((prev) =>
            prev.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        );
    }, []);

    /** 删除 Gate（按 Delete 或右键菜单时调用） */
    const removeGate = useCallback((id) => {
        setGates((prev) => prev.filter((g) => g.id !== id));
    }, []);

    /** 导出 JSON 结构给后端 */
    const exportCircuit = useCallback(() => {
        return { qubits, gates };
    }, [qubits, gates]);

    const value = {
        circuit: { qubits, gates },
        setQubits,
        addGate,
        updateGate,
        removeGate,
        exportCircuit,
    };

    return (
        <CircuitContext.Provider value={value}>
            {children}
        </CircuitContext.Provider>
    );
};

/** 任何组件只要在 <CircuitProvider> 内部，都能 useCircuit() 取到状态 */
export const useCircuit = () => {
    const ctx = useContext(CircuitContext);
    if (!ctx) throw new Error('useCircuit must be used within CircuitProvider');
    return ctx;
};
