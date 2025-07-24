import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";
import { useRef } from "react";
import ChartDownloadButton from "./chartDownloadButton";
import '../App.css'

function SkillBarChart({ skillDistribution, fileName  }) {
  const chartRef = useRef(null);

  return (
    <div ref={chartRef} className='graph-style'>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart
            data={skillDistribution}
            margin={{ top: 20, right: 20, left: 12, bottom: 70 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
            dataKey="skill"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={80}
            />
            <YAxis />
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
            <Bar
            dataKey="percentage"
            name="Coverage (%)"
            label={{ position: "top", formatter: (val) => `${val.toFixed(1)}%` }}
            >
            {skillDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            </Bar>
        </BarChart>
        </ResponsiveContainer>

        <ChartDownloadButton
          chartRef={chartRef}
          fileName={fileName}
          type="Bar"
        />

        </div>
  );
}

export default SkillBarChart;
