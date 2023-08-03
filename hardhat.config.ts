import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { ProxyAgent, setGlobalDispatcher } from "undici";

const proxyAgent = new ProxyAgent("http://127.0.0.1:7890");
setGlobalDispatcher(proxyAgent);

const INFURA_API_KEY = "8e8beb654e4f46a78c77860887fb40f3";
const SEPOLIA_PRIVATE_KEY = "74d69c164c64a14cd2a12f281e4933cf1b306a70c4435b223867f7dc82826826";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: "GFIKH4U37SFPEWWYRD543IN6JBK84NPD75",
  },
};

export default config;
