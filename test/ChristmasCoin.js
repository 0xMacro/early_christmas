const { expect } = require("chai")

describe("ChristmasCoin contract", function () {

  let hhChristmasCoin
  let owner
  let alice
  
  const secondsUntilChristmas = 2.346e7;

  
  beforeEach(async function () {
    ChristmasCoin = await ethers.getContractFactory("ChristmasCoin")
    ;[owner, alice] = await ethers.getSigners()
    hhChristmasCoin = await ChristmasCoin.deploy(owner.address)
    await hhChristmasCoin.deployed()
  })

  it("should not allow presents to be opened before Christmas", async function () {
    await expect(hhChristmasCoin.transfer(
      alice.address,
      ethers.utils.parseEther('1')))
      .to.be.revertedWith("Not until Christmas!")
  })

  // Put an extra test demonstrating the vulnerability here...

  it("should allow presents to be opened after Christmas", async function () {
    await ethers.provider.send("evm_increaseTime", [secondsUntilChristmas])
    await ethers.provider.send("evm_mine", [])
    await hhChristmasCoin.transfer(alice.address, ethers.utils.parseEther('1'))
  })

})
