import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const generateData = () => {
  const data = [];
  for (let i = 53000; i <= 78000; i += 1000) {
    data.push({
      price: i,
      WBTC: Math.random() * 10,
      USDC: Math.random() * 5,
      utilized: Math.random() * 700,
    });
  }
  return data;
};

const LiquidityDistributionChart = () => {
  const data = generateData();

  return (
    <div className="bg-[#1E212A] text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Current Liquidity Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="price" tick={{ fill: "white" }} />
          <YAxis tick={{ fill: "white" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
            itemStyle={{ color: "white" }}
          />
          <Legend></Legend>
          {/* <Bar dataKey="WRBTC" stackId="a" fill="#10B981" /> */}
          <Bar dataKey="rUSDT" stackId="a" fill="#F59E0B" />
          <Bar dataKey="utilized" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiquidityDistributionChart;
