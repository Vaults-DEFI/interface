import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "antd";
import {
  finaldeposit,
  Withdraw,
  parseDeposit,
  previewWithdraw, getToken1Balance
} from "../BlockchainService";
import { useAccount } from "wagmi";



const Position = ({ data }) => {
  const { address, isConnected } = useAccount()

  const [activeTab, setActiveTab] = useState("deposit");

  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");

  const [amount, setAmount] = useState(10);

  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleDeposit = async () => {
    try {
      // Call parseDeposit to get the result
      const result = await parseDeposit(amount1, amount2);
      // Check if result is undefined or null before proceeding
      if (!result) {
        console.error(
          "Error: previewDeposit call failed or returned undefined"
        );
        return;
      }

      // Call finaldeposit with amount1, amount2, and shares
      await finaldeposit(amount1, amount2, result.shares);
    } catch (error) {
      console.error("Deposit error:", error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await Withdraw(address, withdrawAmount);
    } catch (error) {
      console.error("withdraw error:", error);
    }
  };

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
          className={`bg-[#1E212A] py-3 sm:py-5 w-[49.75%] rounded ${activeTab === "deposit" ? "bg-[#2B2E37]" : "text-gray-400"
            }`}
          onClick={() => setActiveTab("deposit")}
        >
          Deposit
        </button>

        <button
          className={`bg-[#1E212A] py-3 sm:py-5 w-[49.75%] rounded ${activeTab === "withdraw" ? "bg-[#2B2E37]" : "text-gray-400"
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
              className={`flex bg-[#2B2E37] items-center rounded-xl border-[0.5px] px-2 py-1 my-3 ${amount1 ? "border-orange-500" : ""
                }focus-within:border-orange-500`}
            >
              <p className="mx-2">{data.item1}</p>
              <input
                className="bg-transparent p-2 mx-2 focus:border-none focus:outline-none w-[80%] text-white"
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
              />
              <button className="bg-[#3A4050] px-3 py-[6px] rounded-lg">
                MAX
              </button>
            </div>
            <div
              className={`flex bg-[#2B2E37] items-center rounded-xl border-[0.5px] px-2 py-1 my-3 ${amount2 ? "border-orange-500" : ""
                }focus-within:border-orange-500`}
            >
              <p className="mx-2">{data.item2}</p>
              <input
                className="bg-transparent p-2 mx-2 focus:border-none focus:outline-none w-[80%] text-white"
                value={amount2}
                onChange={(e) => setAmount2(e.target.value)}
              />
              <button className="bg-[#3A4050] px-3 py-[6px] rounded-lg">
                MAX
              </button>
            </div>
          </div>
          <button
            onClick={handleDeposit}
            className="w-full btn-text-white rounded-xl bg-orange-700 hover:bg-orange-600 p-3 transition duration-300 text-nowrap"
          >
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
              <span>0%</span>
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

      {/* {activeTab === "withdraw" && (
        <div className="bg-[#1E212A] rounded-t rounded-b-xl px-5 py-3 mt-[1px]">
          <span className="text-sm my-3">Withdraw Reserved Liquidity</span>

          <div className="text-center py-4">
            No reserved amount available to withdraw
          </div>
        </div>
      )} */}

      {activeTab === "withdraw" && (
        <div className="bg-[#1E212A] text-gray-400 rounded-t rounded-b-xl px-5 py-5 mt-[0.4px]">
          {amount > 0 ? (
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-sm mb-2">
                <span>Withdraw Reserved Liquidity</span>
                <span>Balance: {withdrawAmount}</span>
              </div>
              <div
                className={`flex bg-[#2B2E37] items-center rounded-xl border-[0.5px] px-2 py-1 my-3 ${withdrawAmount ? "border-orange-500" : ""
                  } focus-within:border-orange-500`}
              >
                <p className="mx-2">Shares</p>
                <input
                  className="bg-transparent p-2 mx-2 focus:border-none focus:outline-none w-[80%] text-white"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <button className="bg-[#3A4050] px-3 py-[6px] rounded-lg">
                  MAX
                </button>
              </div>

              <button
                onClick={handleWithdraw}
                className="w-full btn-text-white rounded-xl bg-orange-700 hover:bg-orange-600 p-3 transition duration-300 text-nowrap"
              >
                Withdraw
              </button>
              <div className="mt-7 text-sm flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    Withdraw Fee{" "}
                    <Tooltip
                      placement="bottom"
                      color="#111827"
                      width="400px"
                      overlayInnerStyle={{ width: "280px" }}
                      title="A withdraw fee is a one-time charge applied at the time of withdrawal."
                    >
                      <AiOutlineInfoCircle />
                    </Tooltip>
                  </span>
                  <span>0%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              No reserved amount available to withdraw
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Position;
