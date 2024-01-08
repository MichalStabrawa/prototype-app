import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BartChart(props) {
const {data}= props

console.log(data)

return(
    <ResponsiveContainer width="50%" height="100%">
    <BarChart
      width={200}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis  domain={[100,'dataMax']}/>
      <Tooltip />
      <Legend />
      <Bar
        dataKey="currentlyPrice"
        barSize={20}
        fill="#8884d8"
        activeBar={<Rectangle fill="pink" stroke="blue" />}
      />
      <Bar
        dataKey="chosenData"
        barSize={20}
        fill="#82ca9d"
        activeBar={<Rectangle fill="gold" stroke="purple" />}
      />
    </BarChart>
  </ResponsiveContainer>
)
}