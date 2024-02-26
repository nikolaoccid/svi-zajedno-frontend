import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

export const TinyBarChartsComponent = ({ data, color }) => {
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="sustav" fill={color} barSize={100} />
    </BarChart>
  );
};
