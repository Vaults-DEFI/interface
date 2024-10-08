import React from "react";
import LiquidityDistributionChart from "./textareachart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";


const Analytics = ({ data }) => {
  const token1 = data.item1;
  const token2 = data.item2;
  const value1 = 78.15; 
  const value2 = 21.85; 

  const graphdata = [
    { name: token1, value: value1 },
    { name: token2, value: value2 },
  ];


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
              {`${token1} - ${value1}%`}
              </div>
              <div className="rounded-lg p-3 text-nowrap border border-gray-500 text-sm">
              {`${token2} - ${value2}%`}
              </div>
            </div>
          </div>

          {/* <div className="w-48 h-48 border border-gray-400 rounded-xl flex items-center justify-start p-8">
            <div className="bg-gray-50 rounded-full w-32 h-32"></div>
          </div> */}

          <div className="w-full md:w-[47%] lg:w-full xl:w-[47%] border border-gray-600 rounded-lg">
            <table className="w-full border border-transparent border-spacing-2 text-xs">
              <thead>
                <tr className="text-gray-400 border-b-2 border-gray-600">
                  <th className="text-center p-3 ">ASSET</th>
                  <th className="text-center p-3 text-nowrap">TOKEN AMOUNT</th>
                  <th className="text-center p-3 ">VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center px-3 py-2 ">{token1}</td>
                  <td className="text-center px-3 py-2 ">0.049823K</td>
                  <td className="text-center px-3 py-2 ">$2.79</td>
                </tr>
                <tr>
                  <td className="text-center px-3 py-2 ">{token2}</td>
                  <td className="text-center px-3 py-2 ">615.03k</td>
                  <td className="text-center px-3 py-2 ">$615.03</td>
                </tr>
                {/* <tr>
                  <td className="text-center px-3 py-2 ">LP</td>
                  <td className="text-center px-3 py-2 ">0.00</td>
                  <td className="text-center px-3 py-2 ">$256.45K</td>
                </tr> */}
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
