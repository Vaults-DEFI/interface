import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const generateData = () => {
  const data = [];
  for (let i = 53000; i <= 78000; i += 1000) {
    data.push({
      price: i,
      WBTC: Math.random() * 10,
      USDC: Math.random() * 5,
      utilized: Math.random() * 700
    });
  }
  return data;
};

const LiquidityDistributionChart = () => {
  const data = generateData();
  
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Current Liquidity Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="price" tick={{fill: 'white'}} />
          <YAxis tick={{fill: 'white'}} />
          <Tooltip 
            contentStyle={{backgroundColor: '#1F2937', border: 'none'}}
            itemStyle={{color: 'white'}}
          />
          <Bar dataKey="WBTC" stackId="a" fill="#10B981" />
          <Bar dataKey="USDC" stackId="a" fill="#F59E0B" />
          <Bar dataKey="utilized" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 bg-gray-800 p-3 rounded">
        <h3 className="font-semibold mb-2">Current price</h3>
        <p>Price range: (51.68164k) - (51.73334k)</p>
        <p>Utilization (%): 99.62%</p>
        <p>USD Coin: 1.3017k</p>
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>WBTC</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span>USDC</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
          <span>Utilized for option</span>
        </div>
      </div>
    </div>
  );
};

export default LiquidityDistributionChart;
