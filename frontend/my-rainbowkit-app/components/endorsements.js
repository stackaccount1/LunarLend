import * as React from "react";
import { useState, useEffect } from "react";
import { contractAddresses, abiFile, alchemyKey } from "../constants";
import { ethers } from "ethers";
import { useSigner, useAccount, useConnect, useContractRead } from "wagmi";

export default function Endorsements() {
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

  // Connected?
  console.log(isConnected);

  const endorseesRead = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "returnEndorsementsAddresses",
    args: address,
    onSuccess(data) {
      console.log(data);
      setEndorsees(data);
    },
  });

  const profileOneRead = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "viewProfileStrings",
    args: endorsees[0],
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
    args: endorsees[1],
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
    args: endorsees[2],
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
    args: endorsees[3],
    onSuccess(data) {
      console.log(data);
      setInfo12(data[0]);
      setInfo13(data[1]);
      setInfo14(data[2]);
      setInfo15(data[3]);
    },
  });

  // Dynamic Loop Set up
  const increment = () => {
    setCount((prev) => prev + 4);
  };

  useEffect(() => {
    if (isConnected) {
    }
  }, [isConnected]);

  return (
    <div className="flex min-h-full items-stretch justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-transparent via-rose-800 to-neutral-900">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Endorsed by the following community Anons!
          </h2>
          <div class="flex items-center bg-gradient-to-t from-yellow-200 via-lime-400 to-red-800">
            <img src={info1} className="h-24 w-24" />
            <div>
              <strong>{info0}</strong>
              <span>{info2}</span>
              <span>{info3}</span>
            </div>
          </div>
          <div class="flex items-center bg-gradient-to-t from-yellow-200 via-lime-400 to-red-800">
            <img src={info5} className="h-24 w-24" />
            <div>
              <strong>{info4}</strong>
              <span>{info6}</span>
              <span>{info7}</span>
            </div>
          </div>
          <div class="flex items-center bg-gradient-to-t from-yellow-200 via-lime-400 to-red-800">
            <img src={info9} className="h-24 w-24" />
            <div>
              <strong>{info8}</strong>
              <span>{info10}</span>
              <span>{info11}</span>
            </div>
          </div>
          <div class="flex items-center bg-gradient-to-t from-yellow-200 via-lime-400 to-red-800">
            <img src={info13} className="h-24 w-24" />
            <div>
              <strong>{info12}</strong>
              <span>{info14}</span>
              <span>{info15}</span>
            </div>
          </div>
          <button
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={increment}
          >
            See More Endorsers
          </button>
        </div>
      </div>
    </div>
  );
}
