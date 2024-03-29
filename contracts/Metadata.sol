pragma solidity 0.5.0;

import "./helpers/strings.sol";

contract Metadata {
    using Strings for *;

    function tokenURI(uint _tokenId) public pure returns (string memory _infoUrl) {
        string memory base = "https://rainbowco.in/metadata/";
        string memory id = uint2str(_tokenId);
        return base.toSlice().concat(id.toSlice());
    }

    function uint2str(uint i) internal pure returns (string memory) {
        uint _tmpI = i;

        if (_tmpI == 0)
            return "0";
        uint j = _tmpI;
        uint length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint k = length - 1;
        while (_tmpI != 0) {
            uint _uint = 48 + _tmpI % 10;
            bstr[k--] = toBytes(_uint)[31];
            _tmpI /= 10;
        }
        return string(bstr);
    }

    function toBytes(uint256 x) public pure returns (bytes memory b) {
        b = new bytes(32);
        assembly {  // solium-disable-line security/no-inline-assembly
            mstore(add(b, 32), x)
        }
    }
}
