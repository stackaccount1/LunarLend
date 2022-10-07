const { getNamedAccounts, deployments, network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../helper-functions")

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    //args = []
    const lunarLend = await deploy("LunarLend", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations,
    })
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(lunarLend.address, args)
    }
    const networkName = network.name == "hardhat" ? "localhost" : network.name
    log(`Lunar Lend contract - ${lunarLend.address} --network ${networkName}`)
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "anon"]
