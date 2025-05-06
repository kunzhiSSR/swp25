// src/components/CircuitCanvas.jsx（只展示关键差异）
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/components/PaletteGate';
import { useCircuit } from '@/contexts/CircuitContext';
import { nanoid } from 'nanoid';

export default function CircuitCanvas() {
    const { addGate /*, circuit  */ } = useCircuit();

    /* 把整个画布设为 Drop 容器 */
    const [, dropRef] = useDrop(() => ({
        accept: ItemTypes.GATE,
        drop: (item, monitor) => {
            // 1. 计算丢下的位置（行 row / 列 col）
            const offset = monitor.getClientOffset();
            const canvasRect = document
                .getElementById('canvas')   // 给画布 div 一个 id
                .getBoundingClientRect();

            const GRID = 60;
            const col = Math.floor((offset.x - canvasRect.left) / GRID);
            const row = Math.floor((offset.y - canvasRect.top) / GRID);

            // 2. 新建 Gate 对象
            addGate({
                id: nanoid(6),
                type: item.type,      // ‘H’ / ‘RX’…
                target: [row],
                timeStep: col,
                params: ['RX', 'RY', 'RZ'].includes(item.type) ? [0] : undefined,
            });
        },
    }), []);

    return (
        <div
            id="canvas"
            ref={dropRef}
            className="relative border w-full h-[400px] overflow-x-auto bg-white"
        >
            {/* 画格线 / Gate 方块渲染 与之前一样 */}
        </div>
    );
}
