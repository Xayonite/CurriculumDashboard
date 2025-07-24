import { toPng } from "html-to-image";
import "../App.css"

const ChartDownloadButton = ({ chartRef, fileName, type = "line" }) => {
  const handleDownload = () => {
    if (!chartRef.current) return alert("Chart ref not found!");

    toPng(chartRef.current, { backgroundColor: "white" })
      .then((dataUrl) => {
        const link = document.createElement("a");
        const name = fileName ? fileName.split(".")[0] : "chart";
        link.download = `${name}-${type}Chart.png`; // ✅ Dynamically set chart type
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(`Failed to download ${type} chart:`, err);
      });
  };

  return (
    <button
      onClick={handleDownload}
      className='chart-download-button'
    >
      Download {type === "line" ? "Line" : "Bar"} Chart
    </button>
  );
};

export default ChartDownloadButton;
