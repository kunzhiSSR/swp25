const GRID = 60;

/**
 * Gate 组件
 * props
 * -----
 * gate        { id, type, target, timeStep, control?, params? }
 * onEdit()    点击回调（由 CircuitCanvas 传入，负责选中 / 弹窗）
 * isSelected  布尔：当前门是否被选中
 */
export default function Gate({ gate, onEdit, isSelected }) {
    if (!gate) return null;

    /* ---------- 单量子比特门 ---------- */
    if (!gate.control) {
        return (
            <div
                className={`absolute px-2 py-1 rounded text-sm cursor-pointer select-none
                    ${isSelected ? 'bg-amber-500' : 'bg-indigo-600 text-white'}`}
                style={{
                    top: gate.target[0] * GRID + 8,
                    left: gate.timeStep * GRID + 8,
                }}
                onClick={onEdit}
            >
                {gate.type}
            </div>
        );
    }

    /* ---------- CNOT / CZ ---------- */
    const topRow = Math.min(gate.control[0], gate.target[0]);
    const bottomRow = Math.max(gate.control[0], gate.target[0]);
    const lineH = (bottomRow - topRow) * GRID;
    const color = isSelected ? 'amber-500' : 'indigo-600';
    const lineCls = `bg-${color}`;
    const borderCls = `border-${color}`;

    return (
        <>
            {/* 垂直连线（pointer-events:none 避免挡住拖拽） */}
            <div
                className={`absolute w-px ${lineCls} pointer-events-none`}
                style={{
                    left: gate.timeStep * GRID + 18,
                    top: topRow * GRID + GRID / 2,
                    height: lineH,
                }}
            />

            {/* 控制点 ● */}
            <div
                className={`absolute w-3 h-3 rounded-full cursor-pointer ${lineCls}`}
                style={{
                    top: gate.control[0] * GRID + GRID / 2 - 6,
                    left: gate.timeStep * GRID + 12,
                }}
                onClick={onEdit}
            />

            {/* 目标 ⊕ / ⊙ */}
            <div
                className={`absolute flex items-center justify-center
                    w-6 h-6 rounded-full bg-white text-[10px] font-bold
                    cursor-pointer border-2 ${borderCls}`}
                style={{
                    top: gate.target[0] * GRID + GRID / 2 - 12,
                    left: gate.timeStep * GRID,
                }}
                onClick={onEdit}
            >
                {gate.type === 'CNOT' ? '+' : 'Z'}
            </div>
        </>
    );
}
