import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface Data {
  name: string;
  value: number;
  color?: string;
}

interface Props {
  data: Data[];
  colors?: string[]; // Allow custom colors to be passed
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const PieChartComponent: React.FC<Props> = ({ data, colors }) => {
  const defaultColors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7300',
    '#00C49F',
    '#FF8042',
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
  ];

  const mergedColors = colors ? colors.concat(defaultColors.slice(colors.length)) : shuffleArray([...defaultColors]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={65} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || mergedColors[index % mergedColors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
