import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface Data {
  name: string;
  value: number;
}

interface Props {
  data: Data[] | Record<string, number>;
  color?: string;
}
export const PieChartComponent: React.FC<Props> = ({ data, color }) => {
  let formattedData: Data[] = [];
  if (data) {
    if (Array.isArray(data)) {
      formattedData = data;
    } else {
      formattedData = Object.entries(data).map(([group, value]) => ({
        name: group,
        value,
      }));
    }
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie dataKey="value" data={formattedData} cx="50%" cy="50%" outerRadius={80} fill={color} label />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
