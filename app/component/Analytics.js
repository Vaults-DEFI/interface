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

        <div className="flex w-full items-center justify-between flex-col md:flex-row lg:flex-col xl:flex-row gap-4">
          <div className=" w-full md:w-[50%] lg:w-full xl:w-[50%] h-[300px] flex justify-between items-center flex-col sm:flex-row">
            <ResponsiveContainer width="100%" height="100%" className=" w-[60%] xl:w-[80%]">
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
              <div className="rounded-lg p-3 text-nowrap border border-gray-500 text-sm mb-2">
                {" "}
                WRBTC - 78.15%
              </div>
              <div className="rounded-lg p-3 text-nowrap border border-gray-500 text-sm">
                {" "}
                rUSDT - 21.85%
              </div>
            </div>
          </div>

          {/* <div className="w-48 h-48 border border-gray-400 rounded-xl flex items-center justify-start p-8">
            <div className="bg-gray-50 rounded-full w-32 h-32"></div>
          </div> */}

          <div className="w-full md:w-[45%] lg:w-full xl:w-[45%] border border-gray-600 rounded-lg">
            <table className="w-full border border-transparent border-spacing-2">
              <thead>
                <tr className="text-gray-400 border-b-2 border-gray-600">
                  <th className="text-center p-3 ">ASSET</th>
                  <th className="text-center p-3 ">TOKEN AMOUNT</th>
                  <th className="text-center p-3 ">VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center px-3 py-2 ">WRBTC</td>
                  <td className="text-center px-3 py-2 ">3.13K</td>
                  <td className="text-center px-3 py-2 ">$178.30M</td>
                </tr>
                <tr>
                  <td className="text-center px-3 py-2 ">rUSDT</td>
                  <td className="text-center px-3 py-2 ">3.13K</td>
                  <td className="text-center px-3 py-2 ">$3.13K</td>
                </tr>
                <tr>
                  <td className="text-center px-3 py-2 ">LP</td>
                  <td className="text-center px-3 py-2 ">0.00</td>
                  <td className="text-center px-3 py-2 ">$256.45K</td>
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
