import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  rootstockTestnet,
  rootstock
} from "wagmi/chains";


export const config = getDefaultConfig({
  appName: "vaults",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains: [
    rootstockTestnet
  //   (process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
  //     ? [rootstockTestnet]
  //     : []),
  ],
  ssr: true,
});
