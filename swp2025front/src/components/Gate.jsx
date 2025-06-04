console.debug('Gate component v2025-05-11 loaded');

// src/components/Gate.jsx
import { memo, useRef } from 'react';
import { GRID } from './CircuitCanvas.jsx';
import { PARAM_GATES } from '@/constants/gates';

const DOT_SIZE = 10;   // 控制点尺寸增大
const PLUS_SIZE = 32;  // 目标圆直径增大
const LINE_WIDTH = 3;   // 竖线粗细增加

// Define fixed widths for elements based on Tailwind classes if possible, or measure them.
// Assuming w-12 for gate is 3rem = 48px if 1rem = 16px.
const GATE_WIDTH = 48;
const GATE_HEIGHT = 48;
const PARAM_BOX_WIDTH = 100; // Given fixed width in style
const PARAM_BOX_SPACING_TOP = 8; // Desired spacing below the gate

// This offset accounts for the column of qubit labels (e.g., "q0:", "q1:") AND
// the parent padding/margins of the Time Step ID row (t0, t1...).
// Calculation based on CircuitCanvas.jsx header:
// Header padding: px-4 (1rem = 16px if root is 16px)
// ID column: w-16 (4rem = 64px) + mr-1 (0.25rem = 4px)
// Total offset for t0 column start = 16 + 64 + 4 = 84px.
const ROW_LABEL_COLUMN_WIDTH = 84;

// 为不同类型的门设置不同的颜色
const gateColors = {
    H: 'bg-blue-500 border-blue-600',
    X: 'bg-red-500 border-red-600',
    Y: 'bg-orange-500 border-orange-600',
    Z: 'bg-purple-500 border-purple-600',
    RX: 'bg-green-500 border-green-600',
    RY: 'bg-teal-500 border-teal-600',
    RZ: 'bg-cyan-400 border-cyan-500',
    CNOT: 'bg-indigo-500 border-indigo-600',
    CZ: 'bg-purple-600 border-purple-700',
    SWAP: 'bg-pink-500 border-pink-600'
};

// 格式化参数值，保留两位小数
const formatParam = (value) => {
    if (typeof value !== 'number') return '0.00';
    return value.toFixed(2);
};

function Gate({ gate, onSelect, readOnly = false }) {
    const ref = useRef(null);

    /* 统一点选 & 双击逻辑 */
    const click = e => {
        if (readOnly) return;
        e.stopPropagation();

        // 单击时不做任何操作
    };

    const dbl = e => {
        if (readOnly) return;
        e.stopPropagation();
        // 双击时显示工具栏
        const rect = ref.current?.getBoundingClientRect();
        onSelect?.(gate, rect);
    };

    /* ─── 受控门（CNOT / CZ / …） ─── */
    if (gate.control?.length) {
        const [targetRow] = gate.target;
        // Calculate center X for the vertical line, accounting for the row label column
        const x = ROW_LABEL_COLUMN_WIDTH + gate.timeStep * GRID + GRID / 2;

        const minRow = Math.min(...gate.control, targetRow);
        const maxRow = Math.max(...gate.control, targetRow);

        /* 控制点渲染 */
        const controls = gate.control.map(r => (
            <div
                key={r}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-600 bg-white"
                style={{
                    left: x,
                    top: r * GRID + GRID / 2,
                    width: DOT_SIZE + 4,
                    height: DOT_SIZE + 4,
                }}
                onClick={click}
                onDoubleClick={dbl}
                ref={r === gate.control[0] ? ref : null}
            />
        ));

        /* 目标：空心圆 */
        const target = (
            <div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-600 bg-white
                     flex items-center justify-center text-blue-700 font-bold select-none cursor-pointer"
                style={{
                    left: x,
                    top: targetRow * GRID + GRID / 2,
                    width: PLUS_SIZE,
                    height: PLUS_SIZE,
                }}
                onClick={click}
                onDoubleClick={dbl}
                ref={ref}
            >
                {gate.type === 'CZ' ? 'Z' : '+'}
            </div>
        );

        return (
            <>
                {/* 竖线 */}
                <div
                    className="absolute bg-blue-600"
                    style={{
                        left: x - LINE_WIDTH / 2,
                        top: minRow * GRID + GRID / 2,
                        width: LINE_WIDTH,
                        height: (maxRow - minRow) * GRID,
                    }}
                />
                {controls}
                {target}
            </>
        );
    }

    /* ─── 单量子门 ─── */
    const colorClasses = gateColors[gate.type] || 'bg-gray-500 border-gray-600';
    const rectStyle = {
        left: ROW_LABEL_COLUMN_WIDTH + gate.timeStep * GRID + (GRID - GATE_WIDTH) / 2,
        top: gate.target[0] * GRID + (GRID - GATE_HEIGHT) / 2,
    };

    // 检查门是否有参数
    const hasParams = gate.params && gate.params.length > 0;
    const paramValue = hasParams ? gate.params[0] : null;
    const paramValueText = hasParams ? formatParam(paramValue) : '';

    return (
        <>
            {/* 门的主体 */}
            <div
                ref={ref}
                role="button"
                onClick={click}
                onDoubleClick={dbl}
                className={`absolute z-10 w-12 h-12 rounded-md border-2 shadow ${colorClasses}
                    flex items-center justify-center text-base font-bold text-white
                    select-none cursor-pointer`}
                style={rectStyle}
                aria-label={`Gate ${gate.type}`}
            >
                {gate.type}
            </div>


            {hasParams && (
                <div
                    className="absolute z-20 bg-white px-4 py-1.5 rounded-md border border-gray-400 text-xs font-medium text-gray-800 shadow-sm"
                    style={{
                        left: ROW_LABEL_COLUMN_WIDTH + gate.timeStep * GRID + (GRID - PARAM_BOX_WIDTH) / 2, // Center param box in grid cell
                        top: (gate.target[0] * GRID + (GRID - GATE_HEIGHT) / 2) + GATE_HEIGHT + PARAM_BOX_SPACING_TOP, // Position below the gate
                        width: `${PARAM_BOX_WIDTH}px`,
                        textAlign: 'center'
                    }}
                >
                    θ={paramValueText}
                </div>
            )}
        </>
    );
}

export default memo(Gate);
