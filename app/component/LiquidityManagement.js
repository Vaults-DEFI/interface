import Image from "next/image";
import React from "react";
import img1 from "../../public/icons/1.svg";
import img2 from "../../public/icons/2.webp";

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
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="text-2xl font-bold mb-2">{strategyText}</h2>
        <p className="text-[15px]">{strategyDescription}</p>
      </div>

      <div className="flex flex-col sm:flex-row w-full justify-center gap-[15px] sm:justify-between">
        {/* Tick Liquidity Management */}
        <div className="bg-[#1E212A] rounded-lg p-6 flex flex-col sm:w-[49.4%] w-full">
          <div className="text-gray-300">
            <h2 className="text-xl my-4 sm:min-h-16">
              Liquidity Rebalancing and Management
            </h2>
            <p className="mb-4 text-[15px] my-4 sm:min-h-[12rem] lg:min-h-64 text-justify">
              Our vault includes an automated feature that ensures your
              liquidity is always positioned within the most profitable range.
              By moving ticks, the smart contract adjusts your position in
              response to market changes, keeping your assets in the
              best-performing range and maximizing returns without requiring
              manual intervention.
            </p>
            <button className="bg-[#2B2E37] px-5 py-3 rounded-xl mb-3">
              More Info ↗
            </button>
            <div className="w-full flex items-center justify-center rounded-xl bg-[#2B2E37] mt-5 p-5">
              <Image src={img1} alt="graph" className="h-[200px] w-auto"></Image>
            </div>
          </div>
        </div>

        {/* Rebalance when update position */}
        <div className="bg-[#1E212A] rounded-lg p-6 flex flex-col sm:w-[49.4%] w-full">
          <div className="text-gray-300 ">
            <h2 className="text-xl my-4 sm:min-h-16">
              Automated Fee Harvesting
            </h2>
            <p className="mb-4 text-[15px] my-4 sm:min-h-[12rem] lg:min-h-[14rem] text-justify">
              The vault features an automated harvesting function that
              periodically claims all accrued fees from your liquidity position.
              These fees are then reinvested back into your position,
              compounding your earnings over time. This process is fully
              automated, ensuring that your rewards are consistently maximized
              without any manual effort on your part.
            </p>
            <button className="bg-[#2B2E37] px-5 py-3 rounded-xl mb-3">
              More Info ↗
            </button>
            <div className="w-full flex items-center justify-center bg-[#2B2E37] rounded-xl mt-5 p-5">
              <Image
                src={img2}
                alt="graph"
                className="h-[200px] w-auto"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityManagementDashboard;
