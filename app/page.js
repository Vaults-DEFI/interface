import { ConnectButton } from "@rainbow-me/rainbowkit";
import Nav from "./component/Nav";
import LiquidityVaults from "./component/LiquidityVaults";
import VaultTable from "./component/VaultTable";
import vaultData from "../public/data.json"

export default function Home() {

  const totalValueLocked =
    vaultData.reduce((total, vault) => {
      const value = parseFloat(vault.tvl.replace(/[$,K]/g, ""));
      return total + value * 1000; 
    }, 0) / 1000000; 

  const formattedTotalValueLocked = totalValueLocked.toFixed(2);

  return (
    <main className="w-[90%] xl:w-[85%] mx-auto mt-32">
      <LiquidityVaults totalValueLocked={formattedTotalValueLocked} />
      <VaultTable data={vaultData} />
    </main>
  );
}
