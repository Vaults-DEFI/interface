# RacineFi Vault - README

## **Description**
RacineFi is a decentralized, automated vault platform that maximizes returns for users by dynamically managing liquidity across decentralized exchanges (DEXs) and yield farms. The platform automates liquidity rebalancing, reward harvesting, and reinvestment to ensure users grow their investments with zero platform fees.

### **Key Features**
- **Automated Deposits & Withdrawals**: Users deposit assets (WRBTC, RUSDT, or RIF) and receive shares representing their vault stake. Withdrawals burn the shares and return the equivalent value of the deposited asset.
- **Dynamic Liquidity Rebalancing**: Every 6 hours, the rebalancer triggers the `moveticks` function, allowing the smart contract to automatically adjust liquidity positions for optimal returns and manage impermanent loss.
- **Automated Rewards Management**: Earned rewards are harvested and reinvested into the vault for compounding growth.

### **Ideal For**
- **Passive Investors**: No need for active management—RacineFi handles everything automatically.
- **Cost-Conscious Users**: Zero platform fees, allowing users to keep 100% of their earnings.

## **Setup Instructions**

To set up and run the RacineFi project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install dependencies using **npm** or **yarn**:
   - For npm:
     ```bash
     npm install
     ```
   - For yarn:
     ```bash
     yarn install
     ```

3. Start the development server:
   - For npm:
     ```bash
     npm run dev
     ```
   - For yarn:
     ```bash
     yarn dev
     ```

4. Access the project in your browser at `http://localhost:3000` (or the appropriate port).
