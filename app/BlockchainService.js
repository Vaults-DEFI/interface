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

const contractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

export async function getContract() {
  const signer = await connectWallet();
  const contract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    signer
  ); 
  return contract;
}

export async function parseDeposit(amount0, amount1) {
  try {
    // Get the contract instance
    const contract = await getContract(); 
    console.log("Contract address:", contract.address);

    // Convert input amounts to BigNumber
    const amount0BN = ethers.utils.parseUnits(amount0, 18);
    const amount1BN = ethers.utils.parseUnits(amount1, 18);

    console.log("Amount0BN:", amount0BN.toString());
    console.log("Amount1BN:", amount1BN.toString());

    // Encode the function call
    const data = contract.interface.encodeFunctionData("previewDeposit", [
      amount0BN,
      amount1BN,
    ]);

    // Perform the low-level call
    const result = await contract.provider.call({
      to: contract.address,
      data: data,
    });

    console.log("Raw result:", result);

    // Decode the result
    const decodedResult = contract.interface.decodeFunctionResult(
      "previewDeposit",
      result
    );
    console.log("Decoded result:", decodedResult);

    // Parse the decoded result
    const parsedResult = {
      shares: decodedResult.shares.toString(),
      amount0: decodedResult.amount0.toString(),
      amount1: decodedResult.amount1.toString(),
      fee0: decodedResult.fee0.toString(),
      fee1: decodedResult.fee1.toString(),
    };

    console.log("Parsed Deposit Result:", parsedResult);
    return parsedResult;
  } catch (error) {
    console.error("Error parsing deposit:", error);
    // Log additional error details
    if (error.error && error.error.message) {
      console.error("Detailed error message:", error.error.message);
    }
    // Re-throw the error for further handling
    throw error; 
  }
}

export async function finaldeposit(amount0, amount1, shares) {
  try {
    const contract = await getContract(); // Get the contract instance with signer

    // Convert input amounts to BigNumber
    const amount0BN = ethers.utils.parseUnits(amount0, 18);
    const amount1BN = ethers.utils.parseUnits(amount1, 18);

    const signer = await connectWallet();

    // // approve RBTC------
    // let checksumRBTC = ethers.utils.getAddress("0x542fda317318ebf1d3deaf76e0b632741a7e677d")
    // console.log("Checksum address:", checksumRBTC)

    // const RBTCContract = new ethers.Contract(checksumRBTC, ERC20Abi.abi, signer)
    // console.log("...", RBTCContract)
    // const approveRBTC = await RBTCContract.approve(contractAddress, amount0BN);
    // approveRBTC.wait()
    // console.log("Approved RBTC")

    // // approve rUSDT------
    // let checksumrUSDT = ethers.utils.getAddress("0xef213441a85df4d7acbdae0cf78004e1e486bb96")
    // console.log("Checksum address:", checksumrUSDT)

    // const rUSDTContract = new ethers.Contract(checksumrUSDT, ERC20Abi.abi, signer)
    // console.log("...", rUSDTContract)
    // const approverUSDT = await rUSDTContract.approve(contractAddress, amount0BN);
    // approverUSDT.wait()
    // console.log("Approved rUSDT")

    // Set a custom gas limit
    // const gasLimit = ethers.utils.hexlify(5000000); // Example value, adjust based on requirements

    const tx = await contract.deposit(amount0BN, amount1BN, shares, {
      gasLimit: 500000,
    }); // Call the deposit function with gas limit

    await tx.wait(); // Wait for the transaction to be mined
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


export async function previewWithdraw(shares) {
  try {
    const contract = await getContract();
    const sharesBN = ethers.utils.parseUnits(shares, 18);

    console.log("shares.....", sharesBN.toString());

    const data = contract.interface.encodeFunctionData("previewWithdraw", [
      sharesBN
    ]);

    const result = await contract.provider.call({
      to: contract.address,
      data: data,
    });

    console.log("Raw result:", result);

    const decodedResult = contract.interface.decodeFunctionResult(
      "previewWithdraw",
      result
    );
    console.log("Decoded result:", decodedResult);

    const parsedResult = {
      amount0: decodedResult.amount0.toString(),
      amount1: decodedResult.amount1.toString(),
    }
    console.log("Parsed Deposit Result:", parsedResult);
    return parsedResult;

  } catch (error) {
    console.error("Preview withdraw error:", error);
    if (error.error && error.error.message) {
      console.error("Detailed error message:", error.error.message);
    }
    throw error;   }
}

// export async function finalwithdraw(shares, minAmount0, minAmount1) {
//   try {
//     const contract = await getContract();
//     const sharesBN = ethers.utils.parseUnits(shares, 18);
//     const minAmount0BN = ethers.utils.parseUnits(minAmount0, 18);
//     const minAmount1BN = ethers.utils.parseUnits(minAmount1, 18);

//     const signer = await connectWallet();


//     const tx = await contract.withdraw(sharesBN, minAmount0BN, minAmount1BN, {
//       gasLimit: 500000,
//     });

//     await tx.wait();
//     console.log("Withdrawal successful");
//     return true;
//   } catch (error) {
//     console.error("Withdrawal error:", error);
//     if (error.data && error.data.message) {
//       console.error("Detailed error message:", error.data.message);
//     } else if (error.message) {
//       console.error("Error message:", error.message);
//     }
//     if (error.transaction) {
//       console.error("Transaction details:", error.transaction);
//     }
//     return false;
//   }
// }



