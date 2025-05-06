# SWP2025 Frontend

This is the frontend project for the quantum encoding benchmark interface.

✳️ Umsetzungshinweise: Aufgabenbereiche 2.1–2.4

Die Seiten und Komponenten dieses Projekts sind in den Ordnern src/pages/ und src/components/ organisiert. Im Folgenden wird erklärt, wo jede Teilfunktion implementiert werden soll .
✅ 2.1 Upload und Visualisierung von Kodierungen

📁 Datei: src/pages/UploadPage.jsx

🛠 Was ist zu tun:

    Ermögliche das Hochladen oder Einfügen von JSON-kodierten Quanten-Circuits.

    Nach dem Upload soll das JSON geparst und visuell als Gatter-Schaltkreis (Wire-and-Gate-Diagramm) angezeigt werden.

    Verwende entweder eine eigene Visualisierung oder ein Dritt-Tool (z. B. react-json-view, qiskit, einfache SVG-Renderfunktion).

    Zeige Parameter wie Qubit-Anzahl, Tiefe oder Gatteranzahl an.

✅ 2.2 Anzeige von Benchmark-Komponenten

📁 Datei: src/pages/BenchmarkOverview.jsx
🛠 Was ist zu tun:

    Lade Benchmark-Komponenten (Datensätze, Kodierungen, Ansatz) über ein API oder mit Mockdaten.

    Zeige für jede Komponente eine Karte mit Name, Beschreibung, ggf. Schaltkreis-Vorschau.

    Erlaube Klick für Details (z. B. vollständige Struktur oder JSON).

    Temporär: Erzeuge lokale Beispielobjekte z. B.:

{
  name: "AngleEncoding",
  description: "Kodiert Merkmale als RY-Rotationen",
  image: "encoding-preview.png"
}

✅ 2.3 Visualisierung und Vergleich von Ergebnissen

📁 Datei: src/pages/EvaluationResult.jsx

🛠 Was ist zu tun:

    Zeige Metriken wie Accuracy, Loss, Circuit-Depth etc.

    Ermögliche Vergleich von verschiedenen Kodierungen per Diagramm (z. B. mit Recharts).

    Wechsle zwischen Kodierungen, Darstellung als Balken-/Liniendiagramm + Datentabelle.

    Beispiel-Mockdaten:


✅ 2.4 Visueller Quantum Circuit Builder (Drag & Drop)

📁 Datei: src/pages/CircuitBuilder.jsx


🛠 Was ist zu tun:

    Nutze react-dnd oder @dnd-kit für Drag-and-Drop.

    User kann Gates ins Raster ziehen, Parameter setzen, Position wählen.

    Unterstützung für Gatter: X, H, RX, RY (mit Winkel), CNOT (mit Control/Target).

    JSON-Export der Circuit-Struktur im internen Format.

    Optional: Hochladen eines JSON zur Wiederherstellung im Editor.



