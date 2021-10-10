// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @dev NFT to reperesent an artists work
 */
contract ArtistPiece is ERC721 {
    string private _authors;

    mapping(uint256 => string) private _tokenURIs;

    /**
     * @dev Give collection a name, symbol, and authors
     */
    constructor(string memory authors_, string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        _authors = authors_;
    }

    /**
     * @dev get authors
     */
    function authors() public view virtual returns (string memory) {
        return _authors;
    }

    /**
     * @dev randomly generated token id, implement minter role
     */
    function mint(uint256 tokenId, string memory URI) public returns (uint256) {
        //require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, URI);
        
        return tokenId;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];

        return _tokenURI;
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
}