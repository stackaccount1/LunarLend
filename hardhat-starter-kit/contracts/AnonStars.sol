// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// 3. Interfaces, Libraries, Contracts, Errors
//error error_notenougheth();
error YouAreNotThatGuy_Owner();
error ImSorryTheProfileExists();

/**@title anon stars main contract
 * @author Stackaccount1
 * @notice This contract is for creating an profile, and endorsing others, must lock money to endorse to prevent spam, payment is sent back over a long period
 * @dev This implements price feeds as our library
 */

contract AnonStars {
    //Type Declarations
    // *price converter
    //State Variables
    address private immutable i_owner;
    uint256 public id;
    uint256 public endorsementId;

    struct Profile {
        uint256 id;
        string username;
        string profilePictureUrl;
        string descriptionOfSkills;
        string resumeLink;
    }

    uint256 public profileCount;

    mapping(uint256 => Profile) public profiles;
    mapping(uint256 => address) public profileToOwner;
    mapping(address => uint256) public idToOwner;
    mapping(uint256 => address) public endorsementToAddress;
    mapping(uint256 => uint256[]) public endorsementList;

    //Events
    event NewProfileGenerated(
        uint256 id,
        string username,
        string profilePictureUrl,
        string descriptionOfSkills,
        string resumeLink
    );

    //Modifiers
    modifier onlyOwner() {
        // require(msg.sender == i_owner);
        if (msg.sender != i_owner) revert YouAreNotThatGuy_Owner();
        _;
    }

    modifier profileExists() {
        if (idToOwner[msg.sender] > 0) revert ImSorryTheProfileExists();
        _;
    }

    // *owner modifier
    //Functions
    // *create profile - maybe superfluid send stake fee back over time, or time lock stake with VRF
    // *endorse profile - maybe superfluid send stake fee back over time, or time lock stake with VRF
    //constructor
    constructor() {
        i_owner = msg.sender;
        id = 0;
        endorsementId = 0;
        profileCount = 0;
    }

    //recieve
    //fallback
    //external
    //public
    function createProfile(
        string memory _username,
        string memory _profilePictureUrl,
        string memory _descriptionOfSkills,
        string memory _resumeLink
    ) public profileExists {
        id++;
        profileCount++;
        profiles[id] = Profile(
            id,
            _username,
            _profilePictureUrl,
            _descriptionOfSkills,
            _resumeLink
        );
        profileToOwner[id] = msg.sender;
        idToOwner[msg.sender] = id;
        emit NewProfileGenerated(
            id,
            _username,
            _profilePictureUrl,
            _descriptionOfSkills,
            _resumeLink
        );
    }

    function endorseProfile(address _endorsee) public {
        require(msg.sender != _endorsee, "you cant endorse yourself");
        uint256 a = idToOwner[_endorsee];
        endorsementId++;
        endorsementList[a].push(endorsementId);
        endorsementToAddress[endorsementId] = msg.sender;
    }

    //internal
    //private
    //view / pure

    function viewProfile(address _whoseThatProfile) public view returns (Profile memory profile) {
        uint256 idtoreturn = idToOwner[_whoseThatProfile];
        Profile memory myProfile = profiles[idtoreturn];
        return myProfile;
    }

    function viewProfileStrings(address _whoseThatProfile)
        public
        view
        returns (
            string memory username,
            string memory profilePictureUrl,
            string memory descriptionOfSkills,
            string memory resumeLink
        )
    {
        uint256 idtoreturn = idToOwner[_whoseThatProfile];
        Profile memory myProfile = profiles[idtoreturn];
        return (
            myProfile.username,
            myProfile.profilePictureUrl,
            myProfile.descriptionOfSkills,
            myProfile.resumeLink
        );
    }

    function withdraw() public onlyOwner {
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    function returnId() public view returns (uint256) {
        return id;
    }

    function returnEndorsementId() public view returns (uint256) {
        return endorsementId;
    }

    function returnProfilesLength() public view returns (uint256) {
        return profileCount;
    }

    function returnEndorsements(address _whoseThatProfile) public view returns (uint256[] memory) {
        uint256 a = idToOwner[_whoseThatProfile];
        endorsementList[a];
        uint256[] memory ret = new uint256[](endorsementList[a].length);
        for (uint256 i = 0; i < endorsementList[a].length; i++) {
            ret[i] = endorsementList[a][i];
        }
        return ret;
    }

    function returnEndorsementsAddresses(address _whoseThatProfile)
        public
        view
        returns (address[] memory)
    {
        uint256[] memory ret = returnEndorsements(_whoseThatProfile);
        address[] memory addList = new address[](ret.length);
        for (uint256 i = 0; i < ret.length; i++) {
            addList[i] = endorsementToAddress[ret[i]];
        }
        return addList;
    }
}
