import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";


const LiquidityMiningProgram = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleContent = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="text-white w-full flex flex-col gap-[2px]">
      <div className="bg-[#1E212A] px-5 py-3 flex justify-between items-center rounded-t-xl">
        <h2 className="text-sm sm:text-lg font-medium sm:font-semibold">
          Merkl Liquidity Mining Program
        </h2>
        <button className="text-2xl" onClick={toggleContent}>
        {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>

      {isOpen && (
      <div className="bg-[#1E212A] px-5 py-5 flex flex-col justify-between gap-4">
        <p className="text-gray-300 text-sm">
          Claim your rewards without staking LP positions. Rewards are
          distributed in regular intervals.
          <a href="#" className="text-white font-bold hover:underline ml-1">
            Learn More
          </a>{" "}
        </p>
        

        <div className="flex justify-between items-center">
          <span className="text-gray-300">Reward APR</span>
          <span className="font-bold">21.02%</span>
        </div>
      </div>
      )}

      <div className="bg-[#1E212A] px-5 py-5 rounded-b-xl">
        <button className="w-full bg-[#FB5B0D1F] hover:opacity-90 text-orange-500 hover:text-orange-600 p-3 rounded-2xl transition duration-300 text-nowrap">
          Claim Rewards
        </button>
      </div>
    </div>
  );
};

export default LiquidityMiningProgram;
