import { useRouter } from "next/router";
import Link from "next/link";
import * as React from "react";
import { useState, useEffect } from "react";
import { contractAddresses, abiFile, apiKey } from "../../constants";
import { ethers } from "ethers";
import { useSigner, useAccount, useConnect, useContractRead } from "wagmi";

const Wallet = () => {
  const router = useRouter();
  const { pid } = router.query;

  // view profile logic //
  const { connector: activeConnector, isConnected, address } = useAccount();
  const [finalAddress, setAddress] = useState(address);
  const [endorsees, setEndorsees] = useState("");
  const [count, setCount] = useState("");
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

  const endorseesRead = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "returnEndorsementsAddresses",
    args: pid,
    onSuccess(data) {
      console.log(data);
      setEndorsees(data);
    },
  });

  console.log(endorsees);

  const profileOneRead = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "viewProfileStrings",
    args: pid,
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
    args: endorsees[0],
    onSuccess(data) {
      console.log(data);
      setInfo4(data[0]);
      setInfo5(data[1]);
      setInfo6(data[2]);
      setInfo7(data[3]);
    },
  });

  console.log("endorsees list", endorsees);

  const profileThreeRead = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "viewProfileStrings",
    args: endorsees[1],
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
    args: endorsees[2],
    onSuccess(data) {
      console.log(data);
      setInfo12(data[0]);
      setInfo13(data[1]);
      setInfo14(data[2]);
      setInfo15(data[3]);
    },
  });

  const increment = () => {
    setCount((prev) => prev + 4);
  };

  return (
    <div class="container mx-auto my-5 p-5">
      <div class="md:flex no-wrap md:-mx-2 ">
        <div class="w-full md:w-3/12 md:mx-2">
          <div class="bg-white p-3 border-t-4 border-green-400">
            <div class="image overflow-hidden">
              <img class="h-auto w-full mx-auto" src={info1} alt="" />
            </div>
            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
              {info0}
            </h1>
            <h3 class="text-gray-600 font-lg text-semibold leading-6">
              {info2}
            </h3>
            <p class="text-sm text-gray-500 hover:text-gray-600 leading-6"></p>
            <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li class="flex items-center py-3">
                <span>Status</span>
                <span class="ml-auto">
                  <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    Active
                  </span>
                </span>
              </li>
              <li class="flex items-center py-3">
                <span>Member since</span>
                <span class="ml-auto">Nov 07, 2016</span>
              </li>
            </ul>
          </div>
          <div class="my-4"></div>
          <div class="bg-white p-3 hover:shadow">
            <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
              <span class="text-green-500">
                <svg
                  class="h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span>Sismo ZK Badges</span>
            </div>
            <div class="grid grid-cols-3">
              <div class="text-center my-2">
                <img
                  class="h-16 w-16 rounded-full mx-auto"
                  src="https://openseauserdata.com/files/faa6656d5f26af05e600fc7b24a1d1d2.svg"
                  alt=""
                />
                <a href="#" class="text-main-color">
                  Synaps Liveness ZK Badge
                </a>
              </div>
              <div class="text-center my-2">
                <img
                  class="h-16 w-16 rounded-full mx-auto"
                  src="https://openseauserdata.com/files/9403254569e0935f05d0170f0707c25d.svg"
                  alt=""
                />
                <a href="#" class="text-main-color">
                  Ethereum Power User ZK Badge
                </a>
              </div>
              <div class="text-center my-2">
                <img
                  class="h-16 w-16 rounded-full mx-auto"
                  src="https://openseauserdata.com/files/2f616464fe6e61b2255aa6eb3611b2fe.svg"
                  alt=""
                />
                <a href="#" class="text-main-color">
                  Sismo Early User ZK Badge
                </a>
              </div>
              <div class="text-center my-2">
                <img
                  class="h-16 w-16 rounded-full mx-auto"
                  src="https://openseauserdata.com/files/387f9ccd6ea60f772c166f1dfc3a6291.svg"
                  alt=""
                />
                <a href="#" class="text-main-color">
                  Proof of Humanity ZK Badge
                </a>
              </div>
            </div>
          </div>
          <div class="my-4"></div>
          <div class="bg-white p-3 hover:shadow">
            <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
              <span class="text-green-500">
                <svg
                  class="h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span>POAPS</span>
            </div>
            <div class="grid grid-cols-3">
              <div class="text-center my-2">
                <img
                  class="h-16 w-16 rounded-full mx-auto"
                  src="https://assets.poap.xyz/zksync-quiz-1-2021-logo-1632767342555.png"
                  alt=""
                />
                <a href="#" class="text-main-color">
                  zkSync Pop Quiz #1
                </a>
              </div>
              <div class="text-center my-2">
                <img
                  class="h-16 w-16 rounded-full mx-auto"
                  src="https://assets.poap.xyz/ethnewyork-staked-hacker-2022-logo-1656971060251.png"
                  alt=""
                />
                <a href="#" class="text-main-color">
                  ETH NY 2022
                </a>
              </div>
              <div class="text-center my-2">
                <img
                  class="h-16 w-16 rounded-full mx-auto"
                  src="https://assets.poap.xyz/bat-community-call-with-luke-mulks-10-12-2021-2021-logo-1634072030426.png"
                  alt=""
                />
                <a href="#" class="text-main-color">
                  Brave / BAT Community Calls
                </a>
              </div>
              <div class="text-center my-2">
                <img
                  class="h-16 w-16 rounded-full mx-auto"
                  src="https://assets.poap.xyz/bat-community-call-09-07-2021-2021-logo-1631021431618.png"
                  alt=""
                />
                <a href="#" class="text-main-color">
                  Brave / BAT Community Calls
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full md:w-9/12 mx-2 h-64">
          <div class="bg-white p-3 shadow-sm rounded-sm">
            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span clas="text-green-500">
                <svg
                  class="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span class="tracking-wide">Profile</span>
            </div>
            <div class="text-gray-700">
              <div class="grid md:grid-cols-2 text-sm">
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Description</div>
                  <div class="px-4 py-2"> {info2}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Contact Information</div>
                  <div class="px-4 py-2">+11 998001001/ email@email.com </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Resume Link</div>
                  <div class="px-4 py-2">
                    <a href>{info3}</a>
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold"></div>
                  <div class="px-4 py-2"></div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold"></div>
                  <div class="px-4 py-2"></div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold"></div>
                  <div class="px-4 py-2"></div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold"></div>
                  <div class="px-4 py-2">
                    <a class="text-blue-800" href=""></a>
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold"></div>
                  <div class="px-4 py-2"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="my-4"></div>
          <div class="bg-white p-3 shadow-sm rounded-sm">
            <div class="grid grid-cols-2">
              <div>
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span clas="text-green-500">
                    <svg
                      class="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </span>
                  <span class="tracking-wide">
                    This Profile Is Endorsed By:
                  </span>
                </div>
                <ul class="list-inside space-y-2">
                  <li>
                    <img src={info5} className="h-24 w-24" />
                    <div class="text-teal-600">{info4}</div>
                    <div class="text-teal-600">{info6}</div>
                    <div class="text-gray-500 text-xs">{info7}</div>
                    <div class="text-gray-500 text-xs">
                      <Link
                        href="/viewprofile/[pid]"
                        as={"/viewprofile/" + endorsees[0]}
                      >
                        View Profile
                      </Link>
                    </div>
                  </li>
                  <li>
                    <img src={info9} className="h-24 w-24" />
                    <div class="text-teal-600">{info8}</div>
                    <div class="text-teal-600">{info10}</div>
                    <div class="text-gray-500 text-xs">{info11}</div>
                    <div class="text-gray-500 text-xs">
                      <Link
                        href="/viewprofile/[pid]"
                        as={"/viewprofile/" + endorsees[1]}
                      >
                        View Profile
                      </Link>
                    </div>
                  </li>
                  <li>
                    <img src={info13} className="h-24 w-24" />
                    <div class="text-teal-600">{info12}</div>
                    <div class="text-teal-600">{info14}</div>
                    <div class="text-gray-500 text-xs">{info15}</div>
                    <div class="text-gray-500 text-xs">
                      <Link
                        href="/viewprofile/[pid]"
                        as={"/viewprofile/" + endorsees[2]}
                      >
                        View Profile
                      </Link>
                    </div>
                  </li>
                  <li>
                    {" "}
                    <button
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={increment}
                    >
                      See More Endorsers
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
