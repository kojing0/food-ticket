// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract MyToken is ERC721, Ownable {
    constructor() ERC721("Food NFT", "FDT") {}

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://ipfs.io/ipfs/QmUG9kEFETtHgSEyL99ruq3TL9dci2uAzcHL5paCCsdSXe/";
    }

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }
}

// contract MyToken is ERC721, Ownable, ERC2981 {
//     using Strings for uint256;

//     uint256 private constant _START_TOKEN_ID = 1;
//     uint256 public totalSupply = 0;
//     string private _baseTokenURI =
//         "https://yuheinakasaka.github.io/twitter-icons/metadata/";
//     mapping(uint256 => string) private _tokenURIs;

//     constructor() ERC721("My NFT", "MYNFT") {
//         _setDefaultRoyalty(owner(), 0);
//     }

//     function mint(uint256 tokenID_, address address_) external onlyOwner {
//         require(tokenID_ >= _START_TOKEN_ID, "invalid token id");

//         unchecked {
//             ++totalSupply;
//         }

//         _safeMint(address_, tokenID_);
//     }

//     function tokenURI(
//         uint256 tokenID_
//     ) public view override returns (string memory) {
//         _requireMinted(tokenID_);

//         string memory uri = _tokenURIs[tokenID_];
//         if (bytes(uri).length > 0) {
//             return uri;
//         }

//         return
//             string(
//                 abi.encodePacked(_baseTokenURI, tokenID_.toString(), ".json")
//             );
//     }

//     function setBaseTokenURI(
//         string calldata newBaseTokenURI_
//     ) external onlyOwner {
//         _baseTokenURI = newBaseTokenURI_;
//     }

//     function setTokenURI(
//         uint256 tokenID_,
//         string calldata uri_
//     ) external onlyOwner {
//         _requireMinted(tokenID_);
//         _tokenURIs[tokenID_] = uri_;
//     }

//     function royaltyInfo(
//         uint256 tokenID_,
//         uint256 salePrice_
//     ) public view override returns (address, uint256) {
//         _requireMinted(tokenID_);
//         return super.royaltyInfo(tokenID_, salePrice_);
//     }

//     function setDefaultRoyalty(
//         address receiver_,
//         uint96 feeNumerator_
//     ) external onlyOwner {
//         _setDefaultRoyalty(receiver_, feeNumerator_);
//     }

//     function supportsInterface(
//         bytes4 interfaceId
//     ) public view override(ERC721, ERC2981) returns (bool) {
//         return
//             ERC721.supportsInterface(interfaceId) ||
//             ERC2981.supportsInterface(interfaceId);
//     }
// }
