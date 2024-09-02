import React from "react";
import LiquidityDistributionChart from "./textareachart";

const Analytics = ({data}) => {
  return (
    <div>
      <div className="bg-[#1E212A] rounded-xl py-3 px-4">
        <p className="text-sm text-gray-400 flex items-center gap-2">
          ⓘ Analytics may not always be 100% accurate. At times, data may be
          inaccurate due to bugs, RPC outages, or issues with 3rd party APIs
          among other potential reasons. If you see any discrepancies, please
          notify our Discord server.
        </p>
      </div>

      <div className="flex flex-col bg-[#1E212A] rounded-xl p-6 my-6">
        <h3 className="text-xl mb-4">LP Breakdown</h3>

        <div className="flex">

          <div className="w-48 h-48 border border-gray-400 rounded-xl flex items-center justify-start p-8">
<div className="bg-gray-50 rounded-full w-32 h-32"></div>
          </div>

          <div className="w-1/2">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400">
                  <th className="text-left">ASSET</th>
                  <th className="text-right">TOKEN AMOUNT</th>
                  <th className="text-right">VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">
                    <span className="bg-orange-500 text-black px-2 py-1 rounded">
                      ₿ WBTC
                    </span>
                  </td>
                  <td className="text-right">3.13K</td>
                  <td className="text-right">$178.30M</td>
                </tr>
                <tr>
                  <td className="py-2">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded">
                      $ USDC
                    </span>
                  </td>
                  <td className="text-right">3.13K</td>
                  <td className="text-right">$3.13K</td>
                </tr>
                <tr>
                  <td className="py-2">
                    <span className="bg-gray-700 px-2 py-1 rounded">LP</span>
                  </td>
                  <td className="text-right">0.00</td>
                  <td className="text-right">$256.45K</td>
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
