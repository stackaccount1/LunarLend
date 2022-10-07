const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("AnonStars", function () {
          let anonStars
          //let mockV3Aggregator
          let deployer
          const sendValue = ethers.utils.parseEther("1")
          const { log } = deployments
          beforeEach(async () => {
              // const accounts = await ethers.getSigners()
              // deployer = accounts[0]
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              anonStars = await ethers.getContract("AnonStars", deployer)
              //mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
          })
          /*
          describe("constructor", function () {
              it("sets the aggregator addresses correctly", async () => {
                  const response = await anonStar.getPriceFeed()
                  assert.equal(response, mockV3Aggregator.address)
              })
          })*/

          describe("createProfile", function () {
              // https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
              // could also do assert.fail
              /*it("Increments", async () => {
                  await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!")
              })*/
              // we could be even more precise here by making sure exactly $50 works
              // but this is good enough for now

              it("Checks to see if the id is 1 after 1 profile submission", async () => {
                  await anonStars.createProfile(
                      "puffer",
                      "www.google.com/images/puffer_profile_pic",
                      "coder of the blockchain clan",
                      "www.github.com/stackaccount1"
                  )
                  const response = await anonStars.returnId()
                  const value = 1
                  assert.equal(response.toString(), value.toString())
              })
              it("Assert two profiles created match", async () => {
                  const [account, accounts1, accounts2] = await ethers.getSigners()
                  //anonStars = anonStars.connect(accounts[0])
                  const create = await anonStars.createProfile("1", "1", "1", "1")
                  let one = await anonStars.viewProfileStrings(deployer)
                  const createdos = await anonStars
                      .connect(accounts1)
                      .createProfile("1", "1", "1", "1")
                  let two = await anonStars.viewProfileStrings(accounts1.address)
                  assert.equal(one.toString(), two.toString())
              })
              it("Creates three profiles, makes sure id is at No. 3", async () => {
                  const [account, accounts1, accounts2] = await ethers.getSigners()
                  //anonStars = anonStars.connect(accounts[0])
                  const create = await anonStars.createProfile("1", "1", "1", "1")
                  const createdos = await anonStars
                      .connect(accounts1)
                      .createProfile("1", "1", "1", "1")
                  const createtres = await anonStars
                      .connect(accounts2)
                      .createProfile("1", "1", "1", "1")
                  let id = await anonStars.returnId()
                  let three = 3
                  assert.equal(id.toString(), three.toString())
              })
          })
          describe("endorsementLogic", function () {
              it("Checks to see if the endorser is listed", async () => {
                  const [account, accounts1, accounts2, accounts3, accounts4] =
                      await ethers.getSigners()
                  const create = await anonStars.createProfile("1", "1", "1", "1")
                  const createdos = await anonStars
                      .connect(accounts1)
                      .createProfile("1", "1", "1", "1")
                  const response = await anonStars
                      .connect(accounts1)
                      .endorseProfile(account.address)
                  const endorsementaddresses = await anonStars.returnEndorsementsAddresses(
                      account.address
                  )
                  const two = accounts1.address
                  assert.equal(endorsementaddresses.toString(), two.toString())
              })
              it("Checks to see if multiple endorsers are listed", async () => {
                  const [account, accounts1, accounts2, accounts3, accounts4] =
                      await ethers.getSigners()
                  const create = await anonStars.createProfile("1", "1", "1", "1")
                  const createdos = await anonStars
                      .connect(accounts1)
                      .createProfile("1", "1", "1", "1")
                  const response = await anonStars
                      .connect(accounts1)
                      .endorseProfile(account.address)
                  const responsecharlie = await anonStars
                      .connect(accounts2)
                      .endorseProfile(account.address)
                  const responsealpha = await anonStars
                      .connect(accounts3)
                      .endorseProfile(account.address)
                  const responsezeta = await anonStars
                      .connect(accounts4)
                      .endorseProfile(accounts1.address)
                  const endorsementaddresses = await anonStars.returnEndorsementsAddresses(
                      account.address
                  )
                  const endorsementaddressessecond = await anonStars.returnEndorsementsAddresses(
                      accounts1.address
                  )
                  const three = accounts4.address
                  const two = [accounts1.address, accounts2.address, accounts3.address]
                  assert.equal(endorsementaddresses.toString(), two.toString())
                  assert.equal(endorsementaddressessecond.toString(), three.toString())
              })
          })
          /*
          describe("withdraw", function () {
              beforeEach(async () => { 
                  await fundMe.fund(["puffer","www.google.com", "coder of the blockchain clan", "www.brave.com"])
              })
              it("withdraws ETH from a single funder", async () => {
                  // Arrange
                  const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance = await fundMe.provider.getBalance(deployer)

                  // Act
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait()
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const gasCost = gasUsed.mul(effectiveGasPrice)

                  const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
                  const endingDeployerBalance = await fundMe.provider.getBalance(deployer)

                  // Assert
                  // Maybe clean up to understand the testing
                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance.add(startingDeployerBalance).toString(),
                      endingDeployerBalance.add(gasCost).toString()
                  )
              })
              // this test is overloaded. Ideally we'd split it into multiple tests
              // but for simplicity we left it as one
              it("is allows us to withdraw with multiple funders", async () => {
                  // Arrange
                  const accounts = await ethers.getSigners()
                  for (i = 1; i < 6; i++) {
                      const fundMeConnectedContract = await fundMe.connect(accounts[i])
                      await fundMeConnectedContract.fund({ value: sendValue })
                  }
                  const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance = await fundMe.provider.getBalance(deployer)

                  // Act
                  const transactionResponse = await fundMe.cheaperWithdraw()
                  // Let's comapre gas costs :)
                  // const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait()
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const withdrawGasCost = gasUsed.mul(effectiveGasPrice)
                  console.log(`GasCost: ${withdrawGasCost}`)
                  console.log(`GasUsed: ${gasUsed}`)
                  console.log(`GasPrice: ${effectiveGasPrice}`)
                  const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
                  const endingDeployerBalance = await fundMe.provider.getBalance(deployer)
                  // Assert
                  assert.equal(
                      startingFundMeBalance.add(startingDeployerBalance).toString(),
                      endingDeployerBalance.add(withdrawGasCost).toString()
                  )
                  // Make a getter for storage variables
                  await expect(fundMe.getFunder({ value: 0 })).to.be.reverted

                  for (i = 1; i < 6; i++) {
                      assert.equal(await fundMe.getAddressToAmountFunded(accounts[i].address), 0)
                  }
              })
              it("Only allows the owner to withdraw", async function () {
                  const accounts = await ethers.getSigners()
                  const fundMeConnectedContract = await fundMe.connect(accounts[1])
                  await expect(fundMeConnectedContract.withdraw()).to.be.reverted
              })
          })*/
      })
