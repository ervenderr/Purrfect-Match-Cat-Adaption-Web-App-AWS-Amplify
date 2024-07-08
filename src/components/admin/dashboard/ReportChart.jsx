import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Pending', value: 40 },
  { name: 'Approved', value: 30 },
  { name: 'Rejected', value: 10 },
  { name: 'In Progress', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        {/* <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[data.indexOf(entry) % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip /> */}
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ReportChart;
