const ArtistPiece = artifacts.require("ArtistPiece");

module.exports = async function(deployer) {
	//deploy Token
	await deployer.deploy(ArtistPiece, "Max Brown", "Gimmie the Loot", "LOOT");
};