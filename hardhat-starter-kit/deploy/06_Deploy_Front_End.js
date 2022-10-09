const { frontEndContractsFile, frontEndAbiFile } = require("../helper-hardhat-config")
const fs = require("fs")
const { network } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const anonStars = await ethers.getContract("LunarLend")
    fs.writeFileSync(frontEndAbiFile, anonStars.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const anonStars = await ethers.getContract("LunarLend")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (network.config.chainId.toString() in contractAddresses) {
        if (!contractAddresses[network.config.chainId.toString()].includes(anonStars.address)) {
            contractAddresses[network.config.chainId.toString()].push(anonStars.address)
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [anonStars.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]
