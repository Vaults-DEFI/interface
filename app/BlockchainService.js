import { ethers } from "ethers";
import contractAbi from "./ABI.json";
import ERC20Abi from "./IERC20.json";


export async function connectWallet() {
  if (typeof ethers === "undefined") {
    console.error("Ethers library is not loaded properly.");
    return;
  }

  if (typeof window.ethereum !== "undefined") {
    try {
      //   await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log("Signer:", signer);
      return signer;
    } catch (error) {
      console.error("Connection error:", error);
    }
  } else {
    console.log("Ethereum provider not found. Please install MetaMask.");
  }
}

export async function getContract() {
  const signer = await connectWallet();
  const contract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    signer
  );

  return contract;
}

const contractAddress = "0x9eC3104E33A234040C865F90860d95e9d98711b9";

export async function parseDeposit(amount0, amount1) {
  try {
    const contract = await getContract(); // Get the contract instance
    console.log("Contract address:", contract.address);

    // Convert input amounts to BigNumber
    const amount0BN = ethers.utils.parseUnits(amount0, 18);
    const amount1BN = ethers.utils.parseUnits(amount1, 18);

    console.log("Amount0BN:", amount0BN.toString());
    console.log("Amount1BN:", amount1BN.toString());

    // Encode the function call
    const data = contract.interface.encodeFunctionData("previewDeposit", [amount0BN, amount1BN]);

    // Perform the low-level call
    const result = await contract.provider.call({
      to: contract.address,
      data: data
    });

    console.log("Raw result:", result);

    // Decode the result
    const decodedResult = contract.interface.decodeFunctionResult("previewDeposit", result);
    console.log("Decoded result:", decodedResult);

    // Parse the decoded result
    const parsedResult = {
      shares: decodedResult.shares.toString(),
      amount0: decodedResult.amount0.toString(),
      amount1: decodedResult.amount1.toString(),
      fee0: decodedResult.fee0.toString(),
      fee1: decodedResult.fee1.toString()
    };

    console.log("Parsed Deposit Result:", parsedResult);
    return parsedResult;
  } catch (error) {
    console.error("Error parsing deposit:", error);
    // Log additional error details
    if (error.error && error.error.message) {
      console.error("Detailed error message:", error.error.message);
    }
    throw error; // Re-throw the error for further handling
  }
}

export async function finaldeposit(
  amount0,
  amount1,
  shares,
  item1_address,
  item2_address,
  // contractAddress
) {
  try {
    const contract = await getContract(); // Get the contract instance with signer

    // Convert input amounts to BigNumber
    const amount0BN = ethers.utils.parseUnits(amount0, 18);
    const amount1BN = ethers.utils.parseUnits(amount1, 18);

    const signer = await connectWallet();

    // approve RBTC------
    let checksumRBTC = ethers.utils.getAddress(item1_address)
    console.log("Checksum address:", checksumRBTC)

    const RBTCContract = new ethers.Contract(checksumRBTC, ERC20Abi.abi, signer)
    console.log("...", RBTCContract)
    const approveRBTC = await RBTCContract.approve(contractAddress, amount0BN);
    await approveRBTC.wait()
    console.log("Approved RBTC")

    // approve rUSDT------
    let checksumrUSDT = ethers.utils.getAddress(item2_address)
    console.log("Checksum address:", checksumrUSDT)

    const rUSDTContract = new ethers.Contract(checksumrUSDT, ERC20Abi.abi, signer)
    console.log("...", rUSDTContract)
    const approverUSDT = await rUSDTContract.approve(contractAddress, amount1BN);
    await approverUSDT.wait()
    console.log("Approved rUSDT")

    const tx = await contract.deposit(amount0BN, amount1BN, shares);
    await tx.wait();
    console.log("Deposit successful");

  } catch (error) {
    console.error("Deposit error:", error);
    if (error.data && error.data.message) {
      console.error("Detailed error message:", error.data.message);
    } else if (error.message) {
      console.error("Error message:", error.message);
    }
    if (error.transaction) {
      console.error("Transaction details:", error.transaction);
    }

  }
}

export async function Withdraw(withdrawAmount) {
  try {
    const contract = await getContract();
    console.log("Withdraw amount ..", withdrawAmount - (10 ** 18))
    // const withdrawAmountFormatted = ethers.utils.parseUnits(String(withdrawAmount), 18);
    const withdrawAmountFormatted = withdrawAmount * 10 ** 18 - 1
    console.log("formatted from ", withdrawAmountFormatted)

    const data = contract.interface.encodeFunctionData("previewWithdraw", [
      String(withdrawAmountFormatted),
    ]);
    const result = await contract.provider.call({
      to: contract.address,
      data: data,
    });

    const decodedResult = contract.interface.decodeFunctionResult(
      "previewWithdraw",
      result
    );

    const parsedResult = {
      amount0: decodedResult.amount0.toString(),
      amount1: decodedResult.amount1.toString(),
    };
    console.log("Parsed Withdraw Result:", parsedResult);
    console.log("typ...", typeof withdrawAmountFormatted)
    const tx = await contract.withdraw(
      String(withdrawAmountFormatted),
      parsedResult.amount0,
      parsedResult.amount1
    );
    await tx.wait();
    console.log("withdraw done");
  } catch (error) {
    console.error("Preview withdraw error:", error);
    if (error.error && error.error.message) {
      console.error("Detailed error message:", error.error.message);
    }
    throw error;
  }
}

// tokenbalance

export async function getTokenBalance(address, item_address) {
  try {
    let checksumRBTC = ethers.utils.getAddress(item_address);
    const signer = await connectWallet();
    console.log("signer from balance", signer)
    const RBTCContract = new ethers.Contract(
      checksumRBTC,
      ERC20Abi.abi,
      signer
    );
    console.log("just check----", address, item_address)
    const balance = await RBTCContract.balanceOf(address);
    console.log("balance", balance);
    return ethers.utils.formatUnits(balance, 18);
  } catch (error) {
    console.log(error);
  }
}

// export async function position(address) {
//   console.log("addressssssssssss", address);

//   const contract = await getContract();
//   const userShares = await contract.balanceOf(address);
//   return userShares;
// }
