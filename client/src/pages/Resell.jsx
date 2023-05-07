/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getWarrantyDetails } from "../contexts/useContract/readContract";
import Web3Context from "../contexts";
import Illustration from "../assets/illustration.svg";

import { resell } from "../contexts/useContract/writeContract";

function Resell() {
  const { Contract, account } = useContext(Web3Context);
  const { warrantyID } = useParams();
  const [data, setData] = useState("");
  const [expiry, setExpiry] = useState("");

  // get Details of the product
  useEffect(() => {
    getDetails();
  }, [Contract]);
  const [to, setCustomer] = useState("");

  // get the details of the product warranty
  const getDetails = async () => {
    const res = await getWarrantyDetails(Contract, warrantyID);
    // console.log(res)
    setData(res);
    const date = new Date(res.expiry * 1000);
    setExpiry(date);
  };

  // handle the customer input
  const handleCustomer = (event) => {
    setCustomer(() => ([event.target.name] = event.target.value));
  };

  // resell the product
  const resellNft = async () => {
    console.log(
      Contract,
      to,
      warrantyID,
      Math.round(warrantyID / 1000),
      account.currentAccount
    );

    const res = await resell(
      Contract,
      to,
      warrantyID,
      Math.round(warrantyID / 1000),
      account.currentAccount
    );

    console.log(res);
  };

  return (
    <>
      <div
        className="h-screen w-screen"
        style={{ backgroundColor: " #A7C6D7" }}
      >
        <Navbar />

        <img
          src={Illustration}
          alt="Illustration"
          className="fixed left-0 top-0"
          style={{ zIndex: "0" }}
        />
        <img
          src={Illustration}
          alt="Illustration"
          className="fixed bottom-0 right-0"
          style={{ zIndex: "0", rotate: "-90" }}
        />
        <div className="flex h-full  w-full flex-col items-center justify-center">
          <div className="flex h-4/6 w-1/3 flex-col items-center justify-start  rounded-lg border-2 border-light-gray-50">
            <div className="mt-4 py-4 text-2xl font-bold">
              Warranty #{warrantyID}
            </div>
            <div className="flex h-3/4 w-full flex-col items-center justify-evenly">
              <img
                className="mb-5 mt-5 h-2/3 w-auto rounded-lg p-0.5"
                src={data.imageURI}
              />
              <div className="mt-4 flex w-full flex-col items-center justify-center text-center">
                <span className="w-full text-center text-xl">
                  <span className="font-semibold">Product ID:</span>{" "}
                  {data.productId}
                </span>
                <span className="w-full text-center text-xl">
                  <span className="font-semibold">Current Owner</span>{" "}
                  {`${String(data && data.buyers[data.buyers.length - 1]).slice(
                    0,
                    5
                  )}...${String(
                    data && data.buyers[data.buyers.length - 1]
                  ).slice(
                    String(data && data.buyers[data.buyers.length - 1]).length -
                      5
                  )}`}
                </span>
                <input
                  placeholder="Enter Buyer Wallet ID"
                  type="text"
                  className="m-4 w-2/3 rounded-lg p-2"
                  onChange={handleCustomer}
                />
                <span className="w-full text-center text-xl">
                  <span className="font-semibold">Expiry Date:</span>
                  {data && String(expiry).slice(3, 25)}
                </span>
              </div>
            </div>
            {data && (data.status == 2 || data.status == 3) && (
              <a
                href={`https://testnets.opensea.io/assets/mumbai/0x356b61ae0f9c33461efae4fc184904a5f884f243/${data.tokenId}`}
                className="mt-5 cursor-pointer text-right text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
              >
                See at OpenSea
              </a>
            )}
          </div>
          <button
            onClick={resellNft}
            className="bottom-2 m-2 mt-5 flex h-10 w-1/3 items-center justify-center  rounded-xl border-black bg-United-Nations-Blue text-white hover:bg-limited-sky"
          >
            Resell
          </button>
        </div>
      </div>
    </>
  );
}

export default Resell;
