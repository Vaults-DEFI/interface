import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "antd";
import {
  finaldeposit,
  Withdraw,
  parseDeposit,
  getTokenBalance,
  getContract,
} from "../BlockchainService";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

export async function position(address, contractAddress) {
  const contract = await getContract(contractAddress);
  if (!contract || !address) {
    throw new Error("Contract or address is not available");
  }
  const userShares = await contract.balanceOf(address);
  return ethers.utils.formatUnits(userShares, 18);
}

const Position = ({ data }) => {
  const { address, isConnected } = useAccount();

  const [activeTab, setActiveTab] = useState("deposit");

  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");

  const [amount, setAmount] = useState(10);

  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [balance1, setBalance1] = useState(null);
  const [balance2, setBalance2] = useState(null);

  const [userPosition, setUserPosition] = useState(null);

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");

  const [activeDeposit, setActiveDeposit] = useState(true);
  const [activeWithdraw, setActiveWithdraw] = useState(true);

  useEffect(() => {
    if (data.contractAddress) {
      console.log("contract addresssss....", data.contractAddress);
    } else {
      console.log("can't find contract addressss");
    }
  });

  useEffect(() => {
    const fetchPosition = async () => {
      if (address) {
        try {
          const userposition = await position(address, data.contractAddress);
          console.log("Position:", userposition);
          setUserPosition(Number(userposition).toFixed(3));
        } catch (error) {
          console.error("Error fetching position:", error);
        }
      } else {
        console.error("Address is undefined");
      }
    };

    fetchPosition();
  }); // Only re-run when `address` changes

  useEffect(() => {
    const fetchBalances = async () => {
      const token1Balance = await getTokenBalance(address, data.item1_Address);
      const token2Balance = await getTokenBalance(address, data.item2_Address);

      console.log("token1...", token1Balance);
      console.log(token2Balance);

      setBalance1(Number(token1Balance).toFixed(3));
      setBalance2(Number(token2Balance).toFixed(3));
    };
    fetchBalances();
  });

  const handleMaxitem1 = (balance) => {
    if (balance > 0) {
      setAmount1(balance); // Set max balance to the input field
      setError1(""); // Clear any previous error

      // Update activeDeposit if there are no errors
      setActiveDeposit(true);
    } else {
      setError1("No available balance");
      setActiveDeposit(false);
    }
  };

  const handleMaxitem2 = (balance) => {
    if (balance > 0) {
      setAmount2(balance);
      setError2("");

      // Update activeDeposit if there are no errors
      setActiveDeposit(true);
    } else {
      setError2("No available balance");
      setActiveDeposit(false);
    }
  };

  const handleMaxWithdraw = (userPosition) => {
    if (userPosition > 0) {
      setWithdrawAmount(userPosition);
      setError3("");

      setActiveWithdraw(true);
    } else {
      setError3("No Available Shares");
      setActiveWithdraw(false);
    }
  };

  const handleDeposit = async (item1_address, item2_address) => {
    // contract function
    console.log("item addressss", item1_address);
    console.log("item addressss", item2_address);
    try {
      // Call parseDeposit to get the result
      const result = await parseDeposit(amount1, amount2, data.contractAddress);
      // Check if result is undefined or null before proceeding
      if (!result) {
        console.error(
          "Error: previewDeposit call failed or returned undefined"
        );
        return;
      }

      // Call finaldeposit with amount1, amount2, and shares
      console.log("..................", item1_address);
      await finaldeposit(
        amount1,
        amount2,
        result.shares,
        item1_address,
        item2_address,
        data.contractAddress
      );
    } catch (error) {
      console.error("Deposit error:", error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await Withdraw(address, withdrawAmount, data.contractAddress);
    } catch (error) {
      console.error("withdraw error:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-[2px]">
      <div className="text-nowrap bg-[#1E212A] flex justify-between items-center rounded-t-xl rounded-b px-5 py-5">
        <span>Your position</span>
        <p className="flex gap-2 items-center text-xs">
          <span className="sm:text-sm text-gray-400">
            {userPosition ? userPosition : "--"} shares
          </span>
        </p>
      </div>

      <div className="flex items-center justify-between">
        <button
          className={`bg-[#1E212A] py-3 sm:py-5 w-[49.75%] rounded ${
            activeTab === "deposit" ? "bg-[#2B2E37]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("deposit")}
        >
          Deposit
        </button>

        <button
          className={`bg-[#1E212A] py-3 sm:py-5 w-[49.75%] rounded ${
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
            <div className="flex justify-end items-center text-sm mb-2">
              {/* <span>Amount</span> */}
              <span>Balance: {balance1 ? balance1 : "--"}</span>
            </div>
            <div
              className={`flex bg-[#2B2E37] items-center rounded-xl border-[0.5px] px-2 py-1 my-3 ${
                amount1 ? "border-orange-500" : ""
              }focus-within:border-orange-500`}
            >
              <p className="mx-2">{data.item1}</p>
              <input
                className="bg-transparent p-2 mx-2 focus:border-none focus:outline-none w-[80%] text-white"
                value={amount1}
                onChange={(e) => {
                  const value = e.target.value;

                  if (parseFloat(value) > balance1) {
                    setError1("Amount exceeds available balance");
                    setActiveDeposit(false);
                  } else {
                    setError1("");
                    setActiveDeposit(true);
                  }
                  setAmount1(value);
                }}
              />
              <button
                onClick={() => handleMaxitem1(balance1)}
                className="bg-[#3A4050] px-3 py-[6px] rounded-lg"
              >
                MAX
              </button>
            </div>
            {error1 && <p className="text-red-500 mb-5">{error1}</p>}

            <div className="flex justify-end items-center text-sm mb-2">
              {/* <span>Amount</span> */}
              <span>Balance: {balance2 ? balance2 : "--"}</span>
            </div>
            <div
              className={`flex bg-[#2B2E37] items-center rounded-xl border-[0.5px] px-2 py-1 my-3 ${
                amount2 ? "border-orange-500" : ""
              }focus-within:border-orange-500`}
            >
              <p className="mx-2">{data.item2}</p>
              <input
                className="bg-transparent p-2 mx-2 focus:border-none focus:outline-none w-[80%] text-white"
                value={amount2}
                onChange={(e) => {
                  const value = e.target.value;
                  if (parseFloat(value) > balance2) {
                    setError2("Amount exceeds available balance");
                    setActiveDeposit(false);
                  } else {
                    setError2("");
                    setActiveDeposit(true);
                  }
                  setAmount2(e.target.value);
                }}
              />
              <button
                onClick={() => handleMaxitem2(balance2)}
                className="bg-[#3A4050] px-3 py-[6px] rounded-lg"
              >
                MAX
              </button>
            </div>
            {error2 && <p className="text-red-500 mb-5">{error2}</p>}
          </div>
          <button
            onClick={
              activeDeposit
                ? () => handleDeposit(data.item1_Address, data.item2_Address)
                : null
            }
            className={`w-full text-white btn-text-white rounded-xl p-3 transition duration-300 text-nowrap my-3
              ${
                activeDeposit
                  ? "bg-orange-700 hover:bg-orange-600"
                  : "bg-orange-700 cursor-not-allowed opacity-50"
              }`}
            disabled={!activeDeposit}
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
              <div className="flex justify-start items-center text-sm mb-2">
                <span>Withdraw Reserved Liquidity</span>
              </div>
              <div
                className={`flex bg-[#2B2E37] items-center rounded-xl border-[0.5px] px-2 py-1 my-3 ${
                  withdrawAmount ? "border-orange-500" : ""
                } focus-within:border-orange-500`}
              >
                <p className="mx-2">Shares</p>
                <input
                  className="bg-transparent p-2 mx-2 focus:border-none focus:outline-none w-[80%] text-white"
                  value={withdrawAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (parseFloat(value) > userPosition) {
                      setError3("Amount exceeds available shares");
                      setActiveWithdraw(false);
                    } else {
                      setError3("");
                      setActiveWithdraw(true);
                    }
                    setWithdrawAmount(e.target.value);
                  }}
                />
                <button
                  onClick={() => handleMaxWithdraw(userPosition)}
                  className="bg-[#3A4050] px-3 py-[6px] rounded-lg"
                >
                  MAX
                </button>
              </div>
              {error3 && <p className="text-red-500 mb-5">{error3}</p>}

              <button
                onClick={activeWithdraw ? handleWithdraw : null}
                className={`w-full text-white btn-text-white rounded-xl p-3 transition duration-300 text-nowrap my-3
                  ${
                    activeWithdraw
                      ? "bg-orange-700 hover:bg-orange-600"
                      : "bg-orange-700 cursor-not-allowed opacity-50"
                  }`}
                disabled={!activeWithdraw}
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
                      className="mt-1"
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
