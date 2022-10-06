import * as React from "react";
import { useState, useEffect } from "react";
import { contractAddresses, abiFile, alchemyKey } from "../constants";
import { ethers } from "ethers";
import Link from "next/link";
import { useSigner, useAccount, useConnect, useContractRead } from "wagmi";
import Endorse from "./endorse";

export default function Discover() {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const [finalAddress, setAddress] = useState(address);
  const [endorsees, setEndorsees] = useState("");
  const [numberListTransportOne, setNumberListTransportOne] = useState("");
  const [profileOne, setProfileOne] = useState("");
  const [profileTwo, setProfileTwo] = useState("");
  const [profileThree, setProfileThree] = useState("");
  const [profileFour, setProfileFour] = useState("");
  const [profileFive, setProfileFive] = useState("");
  const [profileSix, setProfileSix] = useState("");
  const [count, setCount] = useState("8");
  const [info0, setInfo0] = useState("");
  const [info1, setInfo1] = useState("");
  const [info2, setInfo2] = useState("");
  const [info3, setInfo3] = useState("");
  const [info4, setInfo4] = useState("");
  const [info5, setInfo5] = useState("");
  const [info6, setInfo6] = useState("");
  const [info7, setInfo7] = useState("");
  const [info8, setInfo8] = useState("");
  const [info9, setInfo9] = useState("");
  const [info10, setInfo10] = useState("");
  const [info11, setInfo11] = useState("");
  const [info12, setInfo12] = useState("");
  const [info13, setInfo13] = useState("");
  const [info14, setInfo14] = useState("");
  const [info15, setInfo15] = useState("");
  const [info16, setInfo16] = useState("");
  const [info17, setInfo17] = useState("");
  const [info18, setInfo18] = useState("");
  const [info19, setInfo19] = useState("");
  const [info20, setInfo20] = useState("");
  const [info21, setInfo21] = useState("");
  const [info22, setInfo22] = useState("");
  const [info23, setInfo23] = useState("");

  // Connected?
  console.log(isConnected);

  function populateArrayOfRand(count) {
    let numberListTransport = [];
    for (let i = 0; numberListTransport.length <= 6; i++) {
      let a = Math.floor(Math.random() * parseInt(count) + 1);
      if (numberListTransport.includes(a)) {
        console.log("already in list:", a);
      } else {
        numberListTransport.push(a);
      }
    }
    return numberListTransport;
  }

  //let numberListTransport = populateArrayOfRand(count);
  let numberListTransport = [];
  let numberList = [];
  //populateArrayOfRand(count);
  //const randInteger = Math.floor(Math.random() * parseInt(count) + 1);
  //console.log("here is a random int ", randInteger);
  //console.log(numberList);

  const readLength = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "returnProfilesLength",
    onSuccess(data) {
      console.log("profiles length is:", data.toString());
      setCount(data.toString());
      setNumberListTransportOne(
        (numberListTransport = populateArrayOfRand(count))
      );
    },
  });

  console.log("profile pulling from Ids");
  console.log("Rand List:", numberListTransportOne);
  console.log("count:", count);

  const readProfileOne = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "returnAddressFromIdNumber",
    args: numberListTransportOne[0],
    onSuccess(data) {
      console.log("profile one data set:", data);
      setProfileOne(data);
    },
  });

  const readProfileTwo = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "returnAddressFromIdNumber",
    args: numberListTransportOne[1],
    onSuccess(data) {
      console.log(data);
      setProfileTwo(data);
    },
  });

  const readProfileThree = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "returnAddressFromIdNumber",
    args: numberListTransportOne[2],
    onSuccess(data) {
      console.log(data);
      setProfileThree(data);
    },
  });

  const readProfileFour = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "returnAddressFromIdNumber",
    args: numberListTransportOne[3],
    onSuccess(data) {
      console.log(data);
      setProfileFour(data);
    },
  });

  const readProfileFive = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "returnAddressFromIdNumber",
    args: numberListTransportOne[4],
    onSuccess(data) {
      console.log(data);
      setProfileFive(data);
    },
  });

  const readProfileSix = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "returnAddressFromIdNumber",
    args: numberListTransportOne[5],
    onSuccess(data) {
      console.log(data);
      setProfileSix(data);
    },
  });

  //Read From Contract
  console.log("Read Addresses");
  console.log(profileOne);
  console.log(profileTwo);
  console.log(profileThree);

  const profileOneRead = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "viewProfileStrings",
    args: profileOne,
    onSuccess(data) {
      console.log(data);
      setInfo0(data[0]);
      setInfo1(data[1]);
      setInfo2(data[2]);
      setInfo3(data[3]);
    },
  });

  const profileTwoRead = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "viewProfileStrings",
    args: profileTwo,
    onSuccess(data) {
      console.log(data);
      setInfo4(data[0]);
      setInfo5(data[1]);
      setInfo6(data[2]);
      setInfo7(data[3]);
    },
  });

  const profileThreeRead = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "viewProfileStrings",
    args: profileThree,
    onSuccess(data) {
      console.log(data);
      setInfo8(data[0]);
      setInfo9(data[1]);
      setInfo10(data[2]);
      setInfo11(data[3]);
    },
  });

  const profileFourRead = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "viewProfileStrings",
    args: profileFour,
    onSuccess(data) {
      console.log(data);
      setInfo12(data[0]);
      setInfo13(data[1]);
      setInfo14(data[2]);
      setInfo15(data[3]);
    },
  });

  const profileFiveRead = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "viewProfileStrings",
    args: profileFive,
    onSuccess(data) {
      console.log(data);
      setInfo16(data[0]);
      setInfo17(data[1]);
      setInfo18(data[2]);
      setInfo19(data[3]);
    },
  });

  const profileSixRead = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "viewProfileStrings",
    args: profileSix,
    onSuccess(data) {
      console.log(data);
      setInfo20(data[0]);
      setInfo21(data[1]);
      setInfo22(data[2]);
      setInfo23(data[3]);
    },
  });

  // Dynamic Loop Set up
  const increment = () => {
    setCount((prev) => prev + 4);
  };

  /*
  useEffect(() => {
    if (isConnected) {
    }
  }, [isConnected]);
  */
  return (
    <div class="grid grid-cols-3 gap-2">
      <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words w-full mb-6 shadow-lg rounded-xl mt-16 bg-white">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
              <div class="relative">
                <img
                  src={info1}
                  class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
            <div class="w-full text-center mt-20"></div>
          </div>
          <div class="text-center mt-2">
            <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {info0}
            </h3>
            <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {}
            </div>
          </div>
          <div class="mt-6 py-6 border-t border-slate-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full px-4">
                <p class="font-light leading-relaxed text-slate-600 mb-4">
                  {info2}
                </p>
                <Link
                  href="/viewprofile/[pid]"
                  as={"/viewprofile/" + profileOne}
                >
                  <a
                    href="javascript:;"
                    class="font-normal text-slate-700 hover:text-slate-400"
                  >
                    Link to profile!
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words w-full mb-6 shadow-lg rounded-xl mt-16 bg-white">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
              <div class="relative">
                <img
                  src={info5}
                  class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
            <div class="w-full text-center mt-20"></div>
          </div>
          <div class="text-center mt-2">
            <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {info4}
            </h3>
            <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {}
            </div>
          </div>
          <div class="mt-6 py-6 border-t border-slate-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full px-4">
                <p class="font-light leading-relaxed text-slate-600 mb-4">
                  {info6}
                </p>
                <Link
                  href="/viewprofile/[pid]"
                  as={"/viewprofile/" + profileTwo}
                >
                  <a
                    href="javascript:;"
                    class="font-normal text-slate-700 hover:text-slate-400"
                  >
                    Link to profile!
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words w-full mb-6 shadow-lg rounded-xl mt-16 bg-white">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
              <div class="relative">
                <img
                  src={info9}
                  class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
            <div class="w-full text-center mt-20"></div>
          </div>
          <div class="text-center mt-2">
            <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {info8}
            </h3>
            <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {}
            </div>
          </div>
          <div class="mt-6 py-6 border-t border-slate-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full px-4">
                <p class="font-light leading-relaxed text-slate-600 mb-4">
                  {info10}
                </p>
                <Link
                  href="/viewprofile/[pid]"
                  as={"/viewprofile/" + profileThree}
                >
                  <a
                    href="javascript:;"
                    class="font-normal text-slate-700 hover:text-slate-400"
                  >
                    Link to profile!
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words w-full mb-6 shadow-lg rounded-xl mt-16 bg-white">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
              <div class="relative">
                <img
                  src={info13}
                  class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
            <div class="w-full text-center mt-20"></div>
          </div>
          <div class="text-center mt-2">
            <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {info12}
            </h3>
            <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {}
            </div>
          </div>
          <div class="mt-6 py-6 border-t border-slate-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full px-4">
                <p class="font-light leading-relaxed text-slate-600 mb-4">
                  {info14}
                </p>
                <Link
                  href="/viewprofile/[pid]"
                  as={"/viewprofile/" + profileFour}
                >
                  <a
                    href="javascript:;"
                    class="font-normal text-slate-700 hover:text-slate-400"
                  >
                    Link to profile!
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words w-full mb-6 shadow-lg rounded-xl mt-16 bg-white">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
              <div class="relative">
                <img
                  src={info17}
                  class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
            <div class="w-full text-center mt-20"></div>
          </div>
          <div class="text-center mt-2">
            <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {info16}
            </h3>
            <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {}
            </div>
          </div>
          <div class="mt-6 py-6 border-t border-slate-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full px-4">
                <p class="font-light leading-relaxed text-slate-600 mb-4">
                  {info18}
                </p>
                <Link
                  href="/viewprofile/[pid]"
                  as={"/viewprofile/" + profileFive}
                >
                  <a
                    href="javascript:;"
                    class="font-normal text-slate-700 hover:text-slate-400"
                  >
                    Link to profile!
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words w-full mb-6 shadow-lg rounded-xl mt-16 bg-white">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
              <div class="relative">
                <img
                  src={info21}
                  class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
            <div class="w-full text-center mt-20"></div>
          </div>
          <div class="text-center mt-2">
            <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {info20}
            </h3>
            <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {}
            </div>
          </div>
          <div class="mt-6 py-6 border-t border-slate-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full px-4">
                <p class="font-light leading-relaxed text-slate-600 mb-4">
                  {info22}
                </p>
                <Link
                  href="/viewprofile/[pid]"
                  as={"/viewprofile/" + profileSix}
                >
                  <a
                    href="javascript:;"
                    class="font-normal text-slate-700 hover:text-slate-400"
                  >
                    Link to profile!
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
