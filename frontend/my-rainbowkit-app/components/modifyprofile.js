import * as React from "react";
import { contractAddresses, abiFile } from "../constants";
import { ethers, utils } from "ethers";
import { useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function ModifyProfile() {
  const [profile, setProfile] = useState({
    username: "",
    profilePictureUrl: "",
    descriptionOfSkills: "",
    resumeLink: "",
    emailAddress: "",
    phone: "",
    jobSeekingStatus: "",
  });

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const one = profile.username;
  const two = profile.profilePictureUrl;
  const three = profile.descriptionOfSkills;
  const four = profile.resumeLink;
  const five = profile.emailAddress;
  const six = profile.phone;
  const seven = profile.jobSeekingStatus;

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: contractAddresses[80001][0],
    chainId: 80001,
    contractInterface: abiFile,
    functionName: "changeProfileInformation",
    args: [one, two, three, four, five, six, seven],
  });

  /*
      overrides: {
      value: ethers.utils.parseEther("0.01"),
    },
  */

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-yellow-200 via-lime-400 to-red-800">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Update your anonymous profile!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            ></a>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label>
                User Name: "anon of the chain"
                <input type="text" name="username" onChange={handleChange} />
              </label>
            </div>
            <div>
              <label>
                Profile Picture Url: "ipfs link here"
                <input
                  type="text"
                  name="profilePictureUrl"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Describe Your Skills: "vyper maxi"
                <input
                  type="text"
                  name="descriptionOfSkills"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Resume Link: "anon github url here"
                <input
                  type="text"
                  name="resumeLink"
                  placeholder={profile.resumeLink}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Email Address: "yonder@protonmail.com"
                <input
                  type="text"
                  name="emailAddress"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Phone Number: "*67"
                <input type="text" name="phone" onChange={handleChange} />
              </label>
            </div>
            <div>
              <label>
                Job Seeking Status: "I am available for consulting at $55 per
                hour"
                <input
                  type="text"
                  name="jobSeekingStatus"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p></p>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={!write || isLoading}
              onClick={() => write()}
            >
              {isLoading ? "Creating..." : "Create Profile!"}
            </button>
            {isSuccess && (
              <div>
                Successfully updated your profile!
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
