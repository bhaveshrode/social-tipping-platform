const Tipping = artifacts.require("Tipping")

module.exports = function (deployer) {
    deployer.deploy(Tipping);
};
