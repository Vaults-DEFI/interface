import React from "react";
import StrategyComparisonDiagram from "./StrategyComparisonDiagram";
import LiquidityManagementDashboard from "./LiquidityManagement";
import Image from "next/image";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const Overview = ({ data }) => {
  let strategyText = "";
  let strategyDescription = "";

  if (data.derivatives.includes("STRYKE")) {
    strategyText = "x1.4* Improved LP Profitability";
    strategyDescription =
      "The liquidity provided through this vault is utilized simultaneously for AMM and Option protocols. Liquidity at the current price generates swap fees from the AMM, while other liquidity generates option premiums.";
  } 
  
  else if (data.derivatives.includes("CAMELOT")) {
    strategyText = "Steadily Earn Real Yield";
    strategyDescription =
      "The liquidity provided through this vault is utilized for AMM to generate swap fee revenue, with the range managed by an automated strategy bot.";
  }

  return (
    <div className="py-3 pr-3">
      <h2 className="text-3xl font-bold my-3">{strategyText}</h2>
      <p className="text-gray-400 mb-6 text-justify">{strategyDescription}</p>
      <button className="bg-[#2B2E37] px-5 py-3 rounded-xl mb-6">
        More Info ↗
      </button>
      <div className="flex flex-col gap-[2px] my-7">
        <div className="flex flex-col sm:flex-row gap-2 justify-between sm:items-center bg-[#1E212A] rounded-t-xl px-5 py-6 text-xs sm:text-base">
          <span>Asset Allocation</span>
          <div>
            {data.derivatives.length === 2 ? (
              <div className="flex items-center gap-1">
                <Image
                  src={data.icons[0]}
                  alt={data.derivatives[0]}
                  width={16}
                  height={16}
                  className="rounded-full"
                />
                {data.derivatives[0]} /
                <Image
                  src={data.icons[1]}
                  alt={data.derivatives[1]}
                  width={16}
                  height={16}
                  className="rounded-full"
                />
                {data.derivatives[1]}
              </div>
            ) : (
              data.derivatives.map((derivative, index) => (
                <span key={index} className="flex items-center gap-1">
                  <Image
                    src={data.icons[index]}
                    alt={derivative}
                    width={16}
                    height={16}
                  />
                  {derivative}
                </span>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-between sm:items-center bg-[#1E212A] rounded-b-xl px-5 py-6 text-xs sm:text-base">
          <span>Source of revenue</span>
          <div>
            {data.derivatives.length === 2 ? (
              <div className="flex items-center gap-1">
                <span className="flex items-center gap-1">
                  <MdOutlineSwapHorizontalCircle />
                  SWAP FEE /
                </span>
                <span className="flex items-center gap-1">
                  <MdOutlineWorkspacePremium />
                  OPTION PREMIUM
                </span>
              </div>
            ) : (
              <span className="flex items-center gap-1">
                <MdOutlineSwapHorizontalCircle />
                SWAP FEE
              </span>
            )}
          </div>
        </div>
      </div>

      {data.derivatives.length === 2 && 
      <StrategyComparisonDiagram />
      }


      <LiquidityManagementDashboard data = {data} />
    </div>
  );
};

export default Overview;
