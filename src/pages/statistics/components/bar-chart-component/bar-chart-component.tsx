import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export const BarChartComponent = ({ data }) => {
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Ukupno aktivnosti" fill="#8884d8" />
      <Bar dataKey="Aktivnost" fill="#82ca9d" />
    </BarChart>
  );
};
