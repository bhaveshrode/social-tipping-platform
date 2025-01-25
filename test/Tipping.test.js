const Tipping = artifacts.require("Tipping");

contract("Tipping", (accounts) => {
    let tipping;

    before(async () => {
        tipping = await Tipping.deployed();
    });

    it("should allow tipping a creator", async () => {
        const creator = accounts[1];
        const tipAmount = web3.utils.toWei('0.1', 'ether');

        // Tip the creator
        await tipping.tip(creator, { from: accounts[0], value: tipAmount });
        
        // Check the balance of the creator
        const balance = await tipping.getBalance(creator);
        assert.equal(balance.toString(), tipAmount, "The balance of the creator should be equal to the tip amount");
    });

    it("should emit an event when a tip is sent", async () => {
        const creator = accounts[1];
        const tipAmount = web3.utils.toWei('0.2', 'ether');

        // Listen for the TipSent event
        const result = await tipping.tip(creator, { from: accounts[0], value: tipAmount});

        // Check that the event was emitted
        const event = result.logs[0];
        assert.equal(event.event, "TipSent", "The event should be TipSent");
        assert.equal(event.args.creator, creator, "The creator address should match");
        assert.equal(event.args.sender, accounts[0], "The sender address should match");
        assert.equal(event.args.amount.toString(), tipAmount, "The amount should match the tip amount");
    });

    it("should not allow tipping with zero amount", async () => {
        const creator = accounts[1];

        try{
            await tipping.tip(creator, { from: accounts[0], value: 0});
            assert.fail("The tip should not be allowed with zero amount");
        }
        catch (error){
            assert(error.message.includes("Tip amount must be greater than zero"), "Expected error not received");
        }
    });

    it("should return the correct balance for a creator", async () => {
        const creator = accounts[1];
        const expectedBalance = web3.utils.toWei('0.1', 'ether');

        const balance = await tipping.getBalance(creator);
        assert.equal(balance.toString(), expectedBalance, "The balance should match the expected balance");
    });
});
