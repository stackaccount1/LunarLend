import * as React from "react";
import { contractAddresses, abiFile } from "../constants";
import { ethers } from "ethers";
import { useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function Endorse() {
  const [profile, setProfile] = useState({
    address: "",
    profilePictureUrl: "",
    descriptionOfSkills: "",
    resumeLink: "",
  });

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: contractAddresses[80001][0],
    chainId: 80001,
    contractInterface: abiFile,
    functionName: "endorseProfile",
    args: [profile.address],
    overrides: {
      value: ethers.utils.parseEther("0.01"),
    },
  });

  console.log(profile);
  console.log(profile.toString());

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-yellow-200 via-lime-400 to-red-800">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Endorse your fellow ANON!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Endorsements are immutable like the blocchain!
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label>
                Address of your peer: "0x00" do not include quotes
                <input type="text" name="address" onChange={handleChange} />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center"></div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                *Please double check all information, the blockchain is
                immutable, this is your edorsement, changes can not be made!*
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={!write || isLoading}
              onClick={() => write()}
            >
              {isLoading ? "Endorsing..." : "Endorse your peer!"}
            </button>
            {isSuccess && (
              <div>
                Successfully endorsed your peer
                <div>
                  <a href={`https://etherscan.io/tx/${data?.hash}`}>
                    Etherscan
                  </a>
                </div>
              </div>
            )}
            {(isPrepareError || isError) && (
              <div>Error: {(prepareError || error)?.message}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
