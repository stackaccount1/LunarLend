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
        string emailAddress;
        string phone;
        string jobSeekingStatus;
    }

    uint256 public profileCount;
    uint256 public fee;

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
    event Received(address, uint256);

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
    // set the stake fee to be .01 matic 10^16
    //constructor
    constructor() {
        i_owner = msg.sender;
        id = 0;
        endorsementId = 0;
        profileCount = 0;
        fee = 1000000000000000000;
    }

    //recieve
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    //fallback
    //external
    //public
    function changeFee(uint256 _fee) public onlyOwner {
        fee = _fee;
    }

    function createProfile(
        string memory _username,
        string memory _profilePictureUrl,
        string memory _descriptionOfSkills,
        string memory _resumeLink,
        string memory _emailAddress,
        string memory _phone,
        string memory _jobSeekingStatus
    ) public payable profileExists {
        require(msg.value == fee, "not enough fee sent");
        id++;
        profileCount++;
        profiles[id] = Profile(
            id,
            _username,
            _profilePictureUrl,
            _descriptionOfSkills,
            _resumeLink,
            _emailAddress,
            _phone,
            _jobSeekingStatus
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

    function endorseProfile(address _endorsee) public payable {
        bool tOrF = returnEndorsementsAddressesAndVerifyAgainstEndorser(_endorsee, msg.sender);
        require(tOrF == true, "You cant endorse twice!");
        require(msg.value == fee, "not enough fee sent");
        require(msg.sender != _endorsee, "you cant endorse yourself");
        uint256 a = idToOwner[_endorsee];
        endorsementId++;
        endorsementList[a].push(endorsementId);
        endorsementToAddress[endorsementId] = msg.sender;
    }

    function changeProfileInformation(
        string memory _username,
        string memory _profilePictureUrl,
        string memory _descriptionOfSkills,
        string memory _resumeLink,
        string memory _emailAddress,
        string memory _phone,
        string memory _jobSeekingStatus
    ) public {
        idToOwner[msg.sender] = id;
        profiles[id] = Profile(
            id,
            _username,
            _profilePictureUrl,
            _descriptionOfSkills,
            _resumeLink,
            _emailAddress,
            _phone,
            _jobSeekingStatus
        );
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

    function returnEndorsementsAddressesAndVerifyAgainstEndorser(
        address _whoseThatProfile,
        address _endorser
    ) public view returns (bool) {
        uint256[] memory ret = returnEndorsements(_whoseThatProfile);
        bool tOrF = true;
        for (uint256 i = 0; i < ret.length; i++) {
            if (_endorser == endorsementToAddress[ret[i]]) {
                tOrF = false;
            }
            //else {tOrF = true;}
        }
        return tOrF;
    }
}
