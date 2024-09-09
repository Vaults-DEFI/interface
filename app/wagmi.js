import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { rootstock } from "viem/chains";
// import { rootstockTestnet } from "wagmi/chains";

// const localhost = {
//   id: 30,
//   name: 'Localhost',
//   network: 'localhost',
//   nativeCurrency: {
//     name: 'RBTC',
//     symbol: 'RBTC',
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: {
//       http: ['http://127.0.0.1:8545'],
//     },
//     public: {
//       http: ['http://127.0.0.1:8545'],
//     },
//   },
//   testnet: true,
// };

export const config = getDefaultConfig({
  appName: "vaults",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains: [
    // localhost,
    rootstock,
    // rootstockTestnet,
  ],
  ssr: true,
});
