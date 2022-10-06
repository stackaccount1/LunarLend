import * as React from "react";
import { contractAddresses, abiFile, alchemyKey } from "../constants";
import { useState } from "react";
//import { ethers, getAddress } from "ethers";
import { useContractRead, useContract, useSigner, useAccount } from "wagmi";

export default function ExperimentPage() {
  const [info, setInfo] = useState("");
  const [finalAddress, setAddress] = useState("");
  const [info0, setInfo0] = useState("");
  const [info1, setInfo1] = useState("");
  const [info2, setInfo2] = useState("");
  const [info3, setInfo3] = useState("");
  const { connector: activeConnector, isConnected, address } = useAccount();

  const contractRead = useContractRead({
    addressOrName: contractAddresses[80001][0],
    contractInterface: abiFile,
    functionName: "viewProfileStrings",
    args: address,
    onSuccess(data) {
      console.log(data);
      setInfo0(data[0]);
      setInfo1(data[1]);
      setInfo2(data[2]);
      setInfo3(data[3]);
    },
  });

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-yellow-200 via-lime-400 to-red-800">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {info0}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              <img src={info1} className="" />
              {info2}
              <a> Resume Link: </a>
              <a href> {info3}</a>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
