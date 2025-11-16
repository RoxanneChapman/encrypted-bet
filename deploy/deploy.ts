import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log(`Deploying EncryptedBet contract from account: ${deployer}`);

  const deployedEncryptedBet = await deploy("EncryptedBet", {
    from: deployer,
    log: true,
    args: [], // No constructor arguments needed
  });

  console.log(`✅ EncryptedBet contract deployed successfully!`);
  console.log(`📍 Contract address: ${deployedEncryptedBet.address}`);
  console.log(`🔗 Network: ${hre.network.name}`);

  // Verify contract on Etherscan if not on localhost/hardhat
  if (hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
    console.log(`⏳ Verifying contract on Etherscan...`);
    try {
      await hre.run("verify:verify", {
        address: deployedEncryptedBet.address,
        constructorArguments: [],
      });
      console.log(`✅ Contract verified successfully!`);
    } catch (error) {
      console.log(`⚠️ Contract verification failed:`, error);
    }
  }
};
export default func;
func.id = "deploy_all"; // id required to prevent reexecution
func.tags = ["EncryptedBet"];


