/* 统一的门库定义 —— 供 Palette / Canvas / Drawer 共用 */
export const GATE_DEFS = {
    /* ───── 基础 ───── */
    H: { label: 'H', category: 'foundation', params: [] },
    X: { label: 'X', category: 'foundation', params: [] },
    Y: { label: 'Y', category: 'foundation', params: [] },
    Z: { label: 'Z', category: 'foundation', params: [] },

    /* ───── 旋转门 ───── */
    RX: {
        label: 'RX', category: 'rotation',
        params: [{ key: 'theta', label: 'θ (rad)', min: 0, max: Math.PI * 2, step: 0.01, default: 0 }]
    },
    RY: {
        label: 'RY', category: 'rotation',
        params: [{ key: 'theta', label: 'θ (rad)', min: 0, max: Math.PI * 2, step: 0.01, default: 0 }]
    },
    RZ: {
        label: 'RZ', category: 'rotation',
        params: [{ key: 'theta', label: 'θ (rad)', min: 0, max: Math.PI * 2, step: 0.01, default: 0 }]
    },

    /* ───── 纠缠 / 受控 ───── */
    CNOT: { label: 'CNOT', category: 'entangle', params: [], requiresControl: true },
    CZ: { label: 'CZ', category: 'entangle', params: [], requiresControl: true },
    SWAP: { label: 'SWAP', category: 'entangle', params: [], requiresControl: true, multiTarget: true }
};

/** 带参数的门列表（抽屉/Palette 判断用） */
export const PARAM_GATES = Object.entries(GATE_DEFS)
    .filter(([, def]) => def.params.length > 0)
    .map(([k]) => k);
