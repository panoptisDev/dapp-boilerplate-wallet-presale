// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ForecasterNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Forecast {
        uint256 tokenId;
        uint256 creationDate;
        string forecastPrice;
        string timeframe;
    }

    // Mapping from token ID to Forecast
    mapping(uint256 => Forecast) private _forecasts;

    event ForecastCreated(uint256 indexed tokenId, uint256 creationDate, string forecastPrice, string timeframe);

    constructor(address initialOwner) ERC721("ForecasterNFT", "FCXX") Ownable(initialOwner) {}

    function mintForecast(address recipient, string memory forecastPrice, string memory timeframe) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);

        uint256 creationDate = block.timestamp;
        _forecasts[newItemId] = Forecast({
            tokenId: newItemId,
            creationDate: creationDate,
            forecastPrice: forecastPrice,
            timeframe: timeframe
        });

        emit ForecastCreated(newItemId, creationDate, forecastPrice, timeframe);

        return newItemId;
    }

    function getForecast(uint256 tokenId) public view returns (uint256, uint256, string memory, string memory) {
        require(_exists(tokenId), "ERC721Metadata: Query for nonexistent token");

        Forecast memory forecast = _forecasts[tokenId];
        return (forecast.tokenId, forecast.creationDate, forecast.forecastPrice, forecast.timeframe);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

    Forecast memory forecast = _forecasts[tokenId];
        string memory creationDateStr = uint2str(forecast.creationDate);
        string memory forecastPrice = forecast.forecastPrice;
        string memory timeframe = forecast.timeframe;
    
        string memory json = string(
            abi.encodePacked(
                '{"name": "Forecast NFT #', uint2str(tokenId), '",',
                '"description": "An NFT that includes a forecast for Ethereum price.",',
                '"image": "https://iili.io/Jp43iWQ.png",',
                '"attributes": [',
                '{"trait_type": "Creation Date", "value": "', creationDateStr, '"},',
                '{"trait_type": "Forecast Price", "value": "', forecastPrice, '"},',
                '{"trait_type": "Timeframe", "value": "', timeframe, '"}',
                ']}'
            )
        );
        return string(abi.encodePacked("data:application/json;base64,", base64(bytes(json))));
    }

    // Helper function to check if a token exists
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _forecasts[tokenId].tokenId != 0;
    }

    // Helper function to convert uint256 to string
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    // Base64 encoding function
    string internal constant TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    function base64(bytes memory data) internal pure returns (string memory) {
        if (data.length == 0) return '';

        // load the table into memory
        string memory table = TABLE;

        // multiply by 4/3 rounded up
        uint256 encodedLen = 4 * ((data.length + 2) / 3);

        // add some extra buffer at the end
        string memory result = new string(encodedLen + 32);

        assembly {
            // set the actual output length
            mstore(result, encodedLen)

            // prepare the lookup table
            let tablePtr := add(table, 1)

            // input ptr
            let dataPtr := data
            let endPtr := add(dataPtr, mload(data))

            // result ptr, jump over length
            let resultPtr := add(result, 32)

            // run over the input, 3 bytes at a time
            for {} lt(dataPtr, endPtr) {}
            {
                dataPtr := add(dataPtr, 3)

                // read 3 bytes
                let input := mload(dataPtr)

                // write 4 characters
                mstore8(resultPtr, mload(add(tablePtr, and(shr(18, input), 0x3F))))
                resultPtr := add(resultPtr, 1)
                mstore8(resultPtr, mload(add(tablePtr, and(shr(12, input), 0x3F))))
                resultPtr := add(resultPtr, 1)
                mstore8(resultPtr, mload(add(tablePtr, and(shr(6, input), 0x3F))))
                resultPtr := add(resultPtr, 1)
                mstore8(resultPtr, mload(add(tablePtr, and(input, 0x3F))))
                resultPtr := add(resultPtr, 1)
            }

            // padding with '='
            switch mod(mload(data), 3)
            case 1 { mstore(sub(resultPtr, 2), shl(240, 0x3d3d)) }
            case 2 { mstore(sub(resultPtr, 1), shl(248, 0x3d)) }
        }

        return result;
    }
}