const { expect } = require("chai");

describe("Domains Contract", function () {
    let owner, alice, bob;
    let addr1, addr2, addr3;
    let Token, token;

    it("should deploy", async () => {
        [owner, alice, bob] = await ethers.getSigners();
        Token = await ethers.getContractFactory("Domains");
        token = await Token.deploy("code");

        addr1 = await owner.getAddress();
        addr2 = await alice.getAddress();
        addr3 = await bob.getAddress();

        token.register("ethereum", {
            value: ethers.utils.parseEther("0.1"),
        });
    });

    it("should revert Unauthorized", async () => {
        await token.connect(alice).setRecord("ethereum", "blockchain");
    });

    it("should revert AlreadyRegistered", async () => {
        await token.connect(alice).register("ethereum", {
            value: ethers.utils.parseEther("0.1"),
        });
    });

    it("should revert InvalidName", async () => {
        await token.connect(alice).register("e", {
            value: ethers.utils.parseEther("0.1"),
        });
    });
});
