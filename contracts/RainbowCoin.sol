pragma solidity 0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Metadata.sol";

contract RainbowCoin is ERC721Full, Ownable {
    address public metadata;
    uint256 public constant maxSupply = uint256(16581375); // (255 * 255 * 255)

    struct RGBColor {
        uint8 red;
        uint8 green;
        uint8 blue;
    }

    RGBColor[] tokens;

    constructor(string memory name, string memory symbol, address _metadata) public ERC721Full(name, symbol) {
        name = "RainbowCoin";
        symbol = "RGB";
        metadata = _metadata;
    }

    function getColor(uint _tokenId) public view returns(uint8 red, uint8 green, uint8 blue) {
        RGBColor memory _color = tokens[_tokenId];

        red = _color.red;
        green = _color.green;
        blue = _color.blue;
    }

    function mint(uint8 _red, uint8 _green, uint8 _blue) public payable onlyOwner {
        RGBColor memory _color = RGBColor({ red: _red, green: _green, blue: _blue });
        uint _tokenId = tokens.push(_color);
        _mint(msg.sender, _tokenId);
    }

    function updateMetadata(address _metadata) public onlyOwner {
        metadata = _metadata;
    }

    function tokenURI(uint _tokenId) external view returns (string memory _infoUrl) {
        return Metadata(metadata).tokenURI(_tokenId);
    }
}
