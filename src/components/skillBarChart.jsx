import '../App.css'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";

function SkillBarChart({ data }) {
  return (
    <div className='graph-style'>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
            dataKey="skill"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
            />
            <YAxis />
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
            <Bar
            dataKey="percentage"
            name="Coverage (%)"
            label={{ position: "top", formatter: (val) => `${val.toFixed(1)}%` }}
            >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            </Bar>
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
}

export default SkillBarChart;
