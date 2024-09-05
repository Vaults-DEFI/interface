import React from "react";
import LiquidityDistributionChart from "./textareachart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Tooltip } from "antd";

const graphdata = [
  { name: "WRBTC", value: 78.15 },
  { name: "rUSDT", value: 21.85 },
];

const Analytics = ({ data }) => {
  return (
    <div>
      <div className="bg-[#1E212A] rounded-xl py-3 px-4">
        <p className="text-sm text-gray-400 flex items-center gap-2 text-justify">
          ⓘ Analytics may not always be 100% accurate. At times, data may be
          inaccurate due to bugs, RPC outages, or issues with 3rd party APIs
          among other potential reasons. If you see any discrepancies, please
          notify our Discord server.
        </p>
      </div>

      <div className="flex flex-col bg-[#1E212A] rounded-xl p-6 my-6">
        <h3 className="text-xl mb-4">LP Breakdown</h3>

        <div className="flex w-full items-center justify-between">
          <div className="w-[50%] h-[300px] flex justify-between items-center">
            <ResponsiveContainer width="100%" height="100%" className="w-[80%]">
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  data={graphdata}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#cbd5e1"
                  paddingAngle={5}
                  label
                />
            
              </PieChart>
            </ResponsiveContainer>

            <div>
              <div className="rounded-lg p-3 text-nowrap border border-gray-500 text-sm mb-2"> WRBTC - 78.15%</div>
              <div className="rounded-lg p-3 text-nowrap border border-gray-500 text-sm"> rUSDT - 21.85%</div>
            </div>
          </div>

          {/* <div className="w-48 h-48 border border-gray-400 rounded-xl flex items-center justify-start p-8">
            <div className="bg-gray-50 rounded-full w-32 h-32"></div>
          </div> */}

          <div className="w-[40%]">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400">
                  <th>ASSET</th>
                  <th>TOKEN AMOUNT</th>
                  <th>VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                      WRBTC
                  </td>
                  <td>3.13K</td>
                  <td>$178.30M</td>
                </tr>
                <tr>
                  <td>
                      rUSDT
                  </td>
                  <td>3.13K</td>
                  <td>$3.13K</td>
                </tr>
                <tr>
                  <td>
                    LP
                  </td>
                  <td>0.00</td>
                  <td>$256.45K</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <LiquidityDistributionChart />
    </div>
  );
};

export default Analytics;
