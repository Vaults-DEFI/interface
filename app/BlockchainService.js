import { ethers } from "ethers";
import contractAbi from "./ABI.json";

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

const contractAddress = "0x34A1D3fff3958843C43aD80F30b94c510645C316";
// const contractABI = [
//   {
//     type: "function",
//     name: "previewDeposit",
//     inputs: [
//       {
//         name: "_amount0",
//         type: "uint256",
//         internalType: "uint256",
//       },
//       {
//         name: "_amount1",
//         type: "uint256",
//         internalType: "uint256",
//       },
//     ],
//     outputs: [
//       {
//         name: "shares",
//         type: "uint256",
//         internalType: "uint256",
//       },
//       {
//         name: "amount0",
//         type: "uint256",
//         internalType: "uint256",
//       },
//       {
//         name: "amount1",
//         type: "uint256",
//         internalType: "uint256",
//       },
//       {
//         name: "fee0",
//         type: "uint256",
//         internalType: "uint256",
//       },
//       {
//         name: "fee1",
//         type: "uint256",
//         internalType: "uint256",
//       },
//     ],
//     stateMutability: "view",
//   },
//   {
//     type: "function",
//     name: "deposit",
//     inputs: [
//       {
//         name: "_amount0",
//         type: "uint256",
//         internalType: "uint256",
//       },
//       {
//         name: "_amount1",
//         type: "uint256",
//         internalType: "uint256",
//       },
//       {
//         name: "_minShares",
//         type: "uint256",
//         internalType: "uint256",
//       },
//     ],
//     outputs: [],
//     stateMutability: "nonpayable",
//   },
//   //   {
//   //     type: "event",
//   //     name: "Deposit",
//   //     inputs: [
//   //         {
//   //             name: "user",
//   //             type: "address",
//   //             indexed: true,
//   //             internalType: "address"
//   //         },
//   //         {
//   //             name: "shares",
//   //             type: "uint256",
//   //             indexed: false,
//   //             internalType: "uint256"
//   //         },
//   //         {
//   //             name: "amount0",
//   //             type: "uint256",
//   //             indexed: false,
//   //             internalType: "uint256"
//   //         },
//   //         {
//   //             name: "amount1",
//   //             type: "uint256",
//   //             indexed: false,
//   //             internalType: "uint256"
//   //         },
//   //         {
//   //             name: "fee0",
//   //             type: "uint256",
//   //             indexed: false,
//   //             internalType: "uint256"
//   //         },
//   //         {
//   //             name: "fee1",
//   //             type: "uint256",
//   //             indexed: false,
//   //             internalType: "uint256"
//   //         }
//   //     ],
//   //     "anonymous": false
//   // },
// ];

export async function getContract() {
  const signer = await connectWallet();
  console.log("signerrrrrrrrr", signer);
  console.log("abi...", contractAbi.abi);
  const contract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    signer
  ); // Use the signer to create the contract instance
  return contract;
}

// export async function parseDeposit(amount0, amount1) {
//   try {
//     const contract = await getContract(); // Get the contract instance
//     console.log(contract);
//     console.log("amount 0", amount0);
//     console.log("amount 1", amount1);
//     const amount0BN = ethers.utils.parseUnits(amount0, 18);
//     const amount1BN = ethers.utils.parseUnits(amount1, 18);
//     // const result = await contract.strategy();
//     // const result = await contract.previewDeposit(amount0BN, amount1BN); // Call the smart contract function
//     const data = contract.interface.encodeFunctionData("previewDeposit", [
//       amount0BN,
//       amount1BN,
//     ]);
//     const result = await contract.provider.call({
//       to: contract.address,
//       data: data,
//     });
//     console.log("Parsed Deposit Result:", result); // Log the result for debugging
//     return result; // Return the result`
//   } catch (error) {
//     console.error("Error parsing deposit:", error);
//   }
// }


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

export async function finaldeposit(amount0, amount1, shares) {
  try {
    const contract = await getContract(); // Get the contract instance with signer
    const tx = await contract.deposit(amount0, amount1, shares); // Call the deposit function
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Deposit successful");
  } catch (error) {
    console.error("Deposit error:", error);
  }
}
