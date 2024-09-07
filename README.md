# RacineFi - README

## **Description**
RacineFi is a decentralized, automated vault platform designed to maximize user returns by dynamically managing liquidity across decentralized exchanges (DEXs) and yield farms. The platform automatically handles liquidity rebalancing, reward harvesting, and reinvestment, offering users passive income growth with zero platform fees.

---

## **Key Features**
- **Automated Deposits & Withdrawals**: Easily deposit assets like WRBTC, RUSDT, or RIF, and receive shares representing your stake in the vault. Withdrawals are as simple as burning the shares and receiving the equivalent value of your assets.
- **Dynamic Liquidity Rebalancing**: Every 6 hours, the smart contract rebalances liquidity positions to maximize returns while mitigating impermanent loss.
- **Automated Reward Reinvestment**: Earned rewards are automatically harvested and reinvested for compounding growth, ensuring optimal passive returns.
- **Zero Platform Fees**: RacineFi allows users to keep 100% of their earnings, with no platform fees cutting into their profits.

---

## **Setup Instructions**

Follow these steps to set up and run the RacineFi frontend locally:

### **1. Clone the Repository**
Start by cloning the project repository to your local machine:
```bash
git clone <repository_url>
cd <repository_directory>
```

### **2. Install Dependencies**
Install all necessary dependencies using either **npm** or **yarn**:

- **npm**:
  ```bash
  npm install
  ```

- **yarn**:
  ```bash
  yarn install
  ```

### **3. Start the Development Server**
Once dependencies are installed, start the development server:

- **npm**:
  ```bash
  npm run dev
  ```

- **yarn**:
  ```bash
  yarn dev
  ```

### **4. Access the Frontend**
Open your browser and go to:
```url
http://localhost:3000
```
You will now be able to interact with the RacineFi platform.

---

## **Video Demo**
For a quick walkthrough of the platform, watch the demo here:  
[Video Demo](https://ethglobal.com/showcase/racinefi-h66ht)

---

## **Integration with Rootstock**
Our vault and liquidity management contracts are deployed on the Rootstock blockchain, ensuring high security and compatibility with Ethereum tools. This integration allows seamless vault operations, utilizing Rootstock’s low-cost, fast, and reliable infrastructure.

- **Vault Contract Address**: `0x9eC3104E33A234040C865F90860d95e9d98711b9` 
- **Strategy Contract Address**: `0x1CDd9fe9E02eb4CeE23121c32cC9303dB4D30D46`

---

## **Team**
- **Bhumi Sadariya**: Senior Smart Contract Developer, overseeing the development of the vault’s smart contracts to ensure secure and optimal operation on the blockchain.
- **Jay Sojitra**: Full Stack Developer, focusing on the end-to-end development of the RacineFi frontend, ensuring users have an intuitive interface to interact with the vault.


---

## **Feedback on Building on Rootstock**
Building on Rootstock was straightforward and highly secure. The platform's compatibility with existing Ethereum tooling enabled us to develop and deploy efficiently, while transaction finality and low gas fees were a bonus, making it a great environment for decentralized applications.
