import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "antd";

const Position = () => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [amount, setAmount] = useState(0);

  return (
    <div className="w-full flex flex-col gap-[2px]">
      <div className="text-nowrap bg-[#1E212A] flex justify-between items-center rounded-t-xl rounded-b px-5 py-5">
        <span>Your position</span>
        <p className="flex gap-2 items-center text-xs">
        <span className="">$0.00</span>
        <span className="sm:text-sm text-gray-400">0.0000 USDC</span>
        </p>
      </div>

      <div className="flex items-center justify-between">
        <button
          className={`bg-[#1E212A] py-3 sm:py-5 w-[33%] rounded ${
            activeTab === "deposit" ? "bg-[#2B2E37]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("deposit")}
        >
          Deposit
        </button>
        <button
          className={`bg-[#1E212A] py-3 sm:py-5 w-[33%] rounded ${
            activeTab === "reserve" ? "bg-[#2B2E37]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("reserve")}
        >
          Reserve
        </button>
        <button
          className={`bg-[#1E212A] py-3 sm:py-5 w-[33%] rounded ${
            activeTab === "withdraw" ? "bg-[#2B2E37]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("withdraw")}
        >
          Withdraw
        </button>
      </div>

      {activeTab === "deposit" && (
        <div className="bg-[#1E212A] text-gray-400 rounded-t rounded-b-xl px-5 py-5 mt-[0.4px]">
          <div className="flex flex-col">
            <div className="flex justify-between items-center text-sm mb-2">
              <span>Amount</span>
              <span>Balance: 0.000</span>
            </div>
            <div
              className={`flex bg-[#2B2E37] items-center rounded-xl border-[0.5px] px-2 py-1 my-3 ${
                amount ? "border-orange-500" : ""
              }focus-within:border-orange-500`}
            >
              <p className="mx-2">WETH</p>
              <input
                className="bg-transparent p-2 mx-2 focus:border-none focus:outline-none w-[80%]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button className="bg-[#3A4050] px-3 py-[6px] rounded-lg">
                MAX
              </button>
            </div>
          </div>
          <button className="w-full btn-text-white rounded-xl bg-orange-700 hover:bg-orange-600 p-3 transition duration-300 text-nowrap">
            Deposit
          </button>
          <div className="mt-7 text-sm flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="flex items-center gap-2">
                Deposit Fee{" "}
                <Tooltip
                  placement="bottom"
                  color="#111827"
                  width="400px"
                  overlayInnerStyle={{ width: "280px" }}
                  title="A deposit fee is a one-time charge applied at the time of deposit."
                >
                  <AiOutlineInfoCircle />
                </Tooltip>
              </span>
              <span>0.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-2">
                Performance Fee{" "}
                <Tooltip
                  placement="bottom"
                  color="#111827"
                  width="400px"
                  overlayInnerStyle={{ width: "280px" }}
                  title="A performance fee is charged on the profits earned by a vault's strategy."
                >
                  <AiOutlineInfoCircle />
                </Tooltip>
              </span>
              <span>0%</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reserve" && (
        <div className="bg-[#1E212A] rounded-t rounded-b-xl px-5 py-3 mt-[1px]">
          <div className="flex flex-col">
            <span className="text-sm my-3">Withdraw & Reserve</span>
            <div
              className={`flex bg-[#2B2E37] text-gray-400 items-center rounded-xl border-[0.5px] px-2 py-1 my-3 ${
                amount ? "border-orange-500" : ""
              }focus-within:border-orange-500`}
            >
              <p className="mx-2">WETH</p>

              <input
                className="w-[80%] bg-transparent flex-grow p-2 mx-2 focus:border-none focus:outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="text-sm mx-4">%</span>
              <button className="bg-[#3A4050] px-3 py-[6px] rounded-lg">
                MAX
              </button>
            </div>
          </div>
          <button className="w-full text-white rounded-xl bg-orange-700 hover:bg-orange-600 py-3 my-5">
            Withdraw
          </button>
        </div>
      )}

      {activeTab === "withdraw" && (
        <div className="bg-[#1E212A] rounded-t rounded-b-xl px-5 py-3 mt-[1px]">
          <span className="text-sm my-3">Withdraw Reserved Liquidity
          </span>

          <div className="text-center py-4">
            No reserved amount available to withdraw
          </div>
        </div>
      )}
    </div>
  );
};

export default Position;
