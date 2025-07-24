import '../App.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

function SkillsLineChart({ lineChartData }) {
  if (!lineChartData) return <div>Loading chart...</div>;

  const { skills, series } = lineChartData;

  if (!series || series.length === 0) {
    return <div>No data to display</div>;
  }

  const chartData = skills.map((skill, idx) => {
    const point = { skill };
    series.forEach(({ name, data }) => {
      point[name] = data[idx];
    });
    return point;
  });

  return (
    <div className='graph-style'>
        <ResponsiveContainer width="100%" height={400}>
        <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" angle={-45} textAnchor="end" interval={0} height={80} />
            <YAxis domain={[0, 120]} tickFormatter={tick => `${tick}%`} />
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
            <Legend verticalAlign="top" height={36} />
            {series.map(({ name }, i) => (
            <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={COLORS[i % COLORS.length]}
                activeDot={{ r: 8 }}
                strokeWidth={2}
                animationDuration={800}
            />
            ))}
        </LineChart>
        </ResponsiveContainer>
    </div>
  );
}

export default SkillsLineChart;
