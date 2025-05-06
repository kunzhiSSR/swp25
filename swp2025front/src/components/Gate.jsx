

// src/components/Gate.jsx
function Gate({ gate, onClick }) {
    if (!gate) return null;
    return (
        <div onClick={onClick}>
            {gate.type}
        </div>
    );
}

export default Gate;   // 👈 别忘了这行
