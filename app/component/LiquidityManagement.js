import Image from "next/image";
import React from "react";
import bargraph from "../../public/icons/bargraph.svg";
import linegraph from "../../public/icons/linegraph.svg";
import swap from "../../public/icons/usdctoweth.svg"

const LiquidityManagementDashboard = ({ data }) => {
  let strategyText = "";
  let strategyDescription = "";

  if (data.derivatives.includes("STRYKE")) {
    strategyText = "Strategy: Wide / Rebalance";
    strategyDescription =
      "The liquidity provided through this vault is utilized simultaneously for AMM and Option protocols. Liquidity at the current price generates swap fees from the AMM, while other liquidity generates option premiums.";
  } else if (data.derivatives.includes("CAMELOT")) {
    strategyText = "Strategy: Narrow / Rebalance";
    strategyDescription = "";
  }

  return (
    <div className="flex flex-col gap-7 my-9 ">
      <div>
        <h2 className="text-2xl font-bold mb-2">{strategyText}</h2>
        <p className="text-[15px]">{strategyDescription}</p>
      </div>

      <div className="flex flex-col sm:flex-row w-full justify-center gap-[15px] sm:justify-between">
        {/* Tick Liquidity Management */}
        <div className="bg-[#1E212A] rounded-lg p-6 flex flex-col sm:w-[49.4%] w-full">
          {data.derivatives.length === 2 && (
            <div className="text-gray-300">
              <h2 className="text-xl my-4 min-h-7">Tick Liquidity Management</h2>
              <p className="mb-4 text-[15px] my-4 min-h-28">
                To adapt high capital efficiency in LPDfi, liquidity has to be a
                tick liquidity. Orange vault provide liquidity in range and
                manages hundreds of tick liquidity positions automatically.
              </p>
              <button className="bg-[#2B2E37] px-5 py-3 rounded-xl mb-3">
                More Info ↗
              </button>
              <div className="w-full rounded-xl overflow-hidden my-4">
                <Image src={bargraph} alt="graph" width={400} className="w-full"></Image>
              </div>
            </div>
          )}

          {data.derivatives.length === 1 && (
            <div className="text-gray-300">
              <h2 className="text-xl my-4 min-h-7">Narrow Range</h2>
              <p className="mb-4 text-[15px] my-4 min-h-28">
                Steadily earn real yield and get auto-compounded without risk of
                impermanent loss.
              </p>
              <button className="bg-[#2B2E37] px-5 py-3 rounded-xl mb-3">
                More Info ↗
              </button>
              <div className="w-full rounded-xl overflow-hidden my-4">
                <Image src={linegraph} alt="graph" width={400}></Image>
              </div>
            </div>
          )}
        </div>

        {/* Rebalance when update position */}
        <div className="bg-[#1E212A] rounded-lg p-6 flex flex-col sm:w-[49.4%] w-full">
          <div className="text-gray-300 ">
            <h2 className="text-xl my-4 min-h-7">Rebalance when update position
            </h2>
            <p className="mb-4 text-[15px] my-4 min-h-28">
            This vault rebalance asset allocation to balance the amount of liquidities. To mitigate slippage on swap and gas cost, the vault utilizes flashloan and swap aggregator.
            </p>
            <button className="bg-[#2B2E37] px-5 py-3 rounded-xl mb-3">
              More Info ↗
            </button>
            <div className="w-full rounded-xl overflow-hidden my-4">
              <Image src={swap} alt="graph" width={400} className="w-full"></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityManagementDashboard;
