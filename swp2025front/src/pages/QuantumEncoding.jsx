import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const QuantumEncoding = () => {
    // 不使用的变量用下划线前缀，避免lint警告
    const [_selectedEncoding] = useState('Amplitude Encoding');
    const navigate = useNavigate();

    // 跳转到Visual Editor页面
    const navigateToVisualEditor = () => {
        navigate('/visual-editor');
    };

    return (
        <div className="w-full h-screen p-2">
            {/* 上部分：两列布局 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                {/* 左侧：上传区域 */}
                <Card className="bg-white border-2 border-black p-3">
                    <div className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <h2 className="text-lg font-semibold">Encoding hochladen</h2>
                    </div>

                    <div className="border border-dashed border-gray-300 rounded-lg p-3">
                        <div className="flex flex-col items-center justify-center text-center">
                            <svg className="w-8 h-8 mb-2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                            <h3 className="text-base font-medium mb-1">Quantum Encoding hochladen</h3>
                            <p className="text-gray-500 text-sm mb-2">
                                Zieh Sie Ihre JSON-Datei hierher oder klicken Sie zum Auswählen
                            </p>
                            <Button className="bg-gray-800 hover:bg-gray-700 text-white mb-2 py-1 h-8 text-sm">
                                <svg className="mr-1 h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                </svg>
                                Datei auswählen
                            </Button>

                            <div className="w-full mt-1">
                                <div className="text-xs text-gray-500 mb-1">Erwartetes Format</div>
                                <pre className="text-left bg-gray-50 p-1 rounded-md text-xs font-mono text-gray-700 overflow-auto max-h-24">
                                    {`{
  "encoding_name": "AmplitudeEncoding",
  "qubits": 4,
  {"type": "H", "target": 0},
  ...
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 竖线分隔符，只在大屏幕显示 */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-4 bottom-[calc(100%-5rem)] w-px bg-black"></div>

                {/* 右侧：可视化区域 */}
                <Card className="bg-white border-2 border-black p-3">
                    <h2 className="text-lg font-semibold mb-2">Schaltkreis-Visualisierung</h2>

                    <div className="flex justify-between items-center mb-2">
                        <div className="relative w-[160px]">
                            <Select defaultValue="Amplitude Encoding">
                                <SelectTrigger className="bg-white border-gray-300 h-8 text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Amplitude Encoding">Amplitude Encoding</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-x-1">
                            <Button variant="outline" className="border-gray-300 text-gray-700 h-8 text-sm">JSON anzeigen</Button>
                            <Button
                                className="bg-gray-800 hover:bg-gray-700 text-white h-8 text-sm"
                                onClick={navigateToVisualEditor}
                            >
                                Im Editor öffnen
                            </Button>
                        </div>
                    </div>

                    <div className="border rounded-lg p-2 mb-2 bg-white">
                        {/* 量子电路可视化 */}
                        <div className="h-[120px] relative">
                            {/* q0 */}
                            <div className="absolute top-[15px] left-0 right-0 border-t border-gray-300"></div>
                            <div className="absolute top-[12px] left-[10px] text-xs text-gray-500">q0:</div>
                            <div className="absolute top-[5px] left-[60px] h-[18px] w-[18px] bg-blue-100 border border-blue-400 flex items-center justify-center text-xs">H</div>
                            <div className="absolute top-[15px] left-[100px] w-[2px] h-[35px] bg-blue-500"></div>
                            <div className="absolute top-[15px] left-[110px] w-[2px] h-[70px] bg-blue-500"></div>
                            <div className="absolute top-[5px] right-[60px] h-[18px] w-[18px] rounded-full border-2 border-blue-500"></div>

                            {/* q1 */}
                            <div className="absolute top-[50px] left-0 right-0 border-t border-gray-300"></div>
                            <div className="absolute top-[47px] left-[10px] text-xs text-gray-500">q1:</div>
                            <div className="absolute top-[40px] left-[100px] h-[18px] w-[18px] bg-red-100 border border-red-400 flex items-center justify-center text-xs">X</div>
                            <div className="absolute top-[40px] right-[30px] h-[18px] w-[18px] bg-green-100 border border-green-400 flex items-center justify-center text-xs">Rz</div>
                            <div className="absolute top-[40px] right-[60px] h-[18px] w-[18px] rounded-full border-2 border-blue-500"></div>

                            {/* q2 */}
                            <div className="absolute top-[85px] left-0 right-0 border-t border-gray-300"></div>
                            <div className="absolute top-[82px] left-[10px] text-xs text-gray-500">q2:</div>
                            <div className="absolute top-[75px] left-[140px] h-[18px] w-[18px] rounded-full border-2 border-purple-500 flex items-center justify-center text-xs">+</div>

                            {/* q3 */}
                            <div className="absolute top-[120px] left-0 right-0 border-t border-gray-300"></div>
                            <div className="absolute top-[117px] left-[10px] text-xs text-gray-500">q3:</div>
                            <div className="absolute top-[110px] left-[180px] h-[18px] w-[18px] rounded-full border-2 border-purple-500 flex items-center justify-center text-xs">+</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 border rounded">
                            <div className="text-xs text-gray-500">Circuit Depth</div>
                            <div className="text-base font-semibold"></div>
                        </div>
                        <div className="p-2 border rounded">
                            <div className="text-xs text-gray-500">Gate Count</div>
                            <div className="text-base font-semibold"></div>
                        </div>
                        <div className="p-2 border rounded">
                            <div className="text-xs text-gray-500">CNOT Count</div>
                            <div className="text-base font-semibold">2</div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* 下部分：编码规范 */}
            <Card className="bg-white border-2 border-black p-9">
                <h2 className="text-lg font-semibold mb-2">Encoding-Spezifikation</h2>
                <div className="text-xs text-gray-500 mb-1">Erwartetes JSON-Format</div>
                <pre className="bg-gray-50 p-2 rounded mb-2 text-xs font-mono text-gray-700 overflow-auto max-h-24">
                    {`{
  "encoding_name": "AmplitudeEncoding",
  "qubits": 4,
  "description": "Encodes classical data in the amplitudes",
  "gates": [
    {"type": "H", "target": 0},
    {"type": "CNOT", "control": 0, "target": 1},
    {"type": "Rz", "target": 1, "parameter": "theta"},
    {"type": "X", "target": 2},
    {"type": "CNOT", "control": 1, "target": 3},
  ]
}`}
                </pre>

                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    <div>
                        <h3 className="text-xs font-bold mb-1">Unterstützte Gates:</h3>
                        <ul className="text-xs space-y-0.5">
                            <li>• Single-Qubit Gates: H, X, Y, Z, S, T, RX, RY, RZ</li>
                            <li>• Two-Qubit Gates: CNOT, CZ, SWAP</li>
                            <li>• Three-Qubit Gates: Toffoli, Fredkin</li>
                            <li>• Parametrisierte Gates: RX(θ), RY(θ), RZ(θ)</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold mb-1">Benchmark-Prozess:</h3>
                        <ol className="text-xs list-decimal ml-4 space-y-0.5">
                            <li>Encoding hochladen und validieren</li>
                            <li>Benchmark-Komponenten auswählen</li>
                            <li>Benchmark ausführen</li>
                            <li>Ergebnisse analysieren</li>
                            <li>Optional: Encoding optimieren</li>
                        </ol>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default QuantumEncoding; 