// 画横线、可高亮
export default function QuantumLines({ rows, width, hoveredRow }) {
    return (
        <svg className="absolute inset-0 pointer-events-none">
            {Array.from({ length: rows }).map((_, i) => (
                <line
                    key={i}
                    x1="0"
                    x2={width}
                    y1={i * 64 + 32}
                    y2={i * 64 + 32}
                    stroke={hoveredRow === i ? '#3B82F6' : '#3f3f46'}   // indigo-500 / zinc-700
                    strokeWidth={2}
                />
            ))}
        </svg>
    );
}
