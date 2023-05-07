/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Web3Context from "../contexts";
import {
  buyerDetails,
  getWarrantyDetails,
} from "../contexts/useContract/readContract";

import logo from "../assets/logo.svg";
import activeWarrantfyLogo from "../assets/active-warranty.svg";
import pendingWarrantfyLogo from "../assets/p-w.svg";
import expiryWarrantfyLogo from "../assets/e-w.svg";

const Seller = () => {
  function Navbutton(props) {
    return (
      <a
        href={props.link}
        className={` ${
          props.link === "#active" ? "bg-light-gray-100" : "bg-light-gray-25"
        } h-fit  active:bg-light-gray-200 mr-3   mt-4 flex w-5/6 justify-center gap-x-4 rounded-xl py-4 text-center text-lg   font-semibold text-Independence  hover:bg-light-gray-100 hover:text-black`}
        onClick={() => {
          setSelectedTab(props.link);
        }}
      >
        <span>
          <img src={props?.img} alt={props.content} />
        </span>
        {props.content}
      </a>
    );
  }

  // count the number of warranties
  function WarrantyCount(props) {
    return (
      <>
        <div className="flex h-10 w-1/4 cursor-default items-center justify-center rounded-full border-2 border-black bg-table-header">
          {props.head}: {props.count}
        </div>
      </>
    );
  }

  // function to display pending warranty requests
  function PendingWarranty(props) {
    return (
      <>
        <NavLink
          to={`/Approve/${props.id}`}
          className="mx-4 my-2 flex h-14 items-center justify-between border-b-2  py-2  text-xl hover:bg-light-gray-100"
        >
          <div className="flex items-center justify-center pl-5">
            <img className="h-10 w-10 rounded-full" src={props.img} />
            <span className="px-3">{props.name}</span>
          </div>
          <span className="pr-12">{props.status}</span>
          <span className="pr-5">#{props.id}</span>
        </NavLink>
      </>
    );
  }

  // function to display active warranty requests
  function ActiveWarranty(props) {
    return (
      <>
        <NavLink
          to={`/warranty/${props.id}`}
          className="mx-4 my-2 flex h-14 items-center justify-between border-b-2  py-2  text-xl hover:bg-light-gray-100"
          >
          <div className="flex items-center justify-center pl-5">
            <img className="h-10 w-10 rounded-full" src={props.img} />
            <span className="px-3">{props.name}</span>
          </div>
          <span className="pr-12">{props.status}</span>
          <span className="pr-12">{props.expiry}</span>
          <span className="pr-5">#{props.id}</span>
        </NavLink>
      </>
    );
  }

  // function to display expired warranty requests
  function ExpiredWarranty(props) {
    return (
      <>
        <NavLink
          to={`/warranty/${props.id}`}
          className="mx-4 my-2 flex h-14 items-center justify-between border-b-2  py-2  text-xl hover:bg-light-gray-100"
        >
          <div className="flex items-center justify-center pl-5">
            <img className="h-10 w-10 rounded-full" src={props.img} />
            <span className="px-3">{props.name}</span>
          </div>
          <span className="pr-12">{props.status}</span>
          <span className="pr-5">#{props.id}</span>
        </NavLink>
      </>
    );
  }

  // main

  const { connectWallet, account, Contract } = useContext(Web3Context);
  const { add } = useParams();
  const [nfts, setNfts] = useState([]);
  //console.log(account.currentAccount)
  useEffect(() => {
    // console.log(add)
    getData();
    // console.log(nfts);
  }, [Contract, add]);
  const getData = async () => {
    const res = await buyerDetails(Contract, add);
    // console.log(res)
    setNfts(res);
  };

  const [selectedTab, setSelectedTab] = useState("#active");
  console.log(selectedTab);

  return (
    <>
      <div className="h-fit mb-10 flex min-h-screen w-screen overflow-x-hidden bg-hash-light">
        <div className="sidebar flex h-full w-1/6 flex-col items-center border-r-1 shadow-md ">
          <NavLink
            to="/"
            className="h-fit flex w-full items-center justify-center gap-x-4 border-b-2  bg-hash-light text-xl font-bold text-Independence"
          >
            <span>
              <img src={logo} alt="logo" width={30} />
            </span>
            <span className="px-2 py-5  text-xl font-semibold">eWarranty</span>
          </NavLink>{" "}
          <Navbutton
            link="#active"
            content="Active Warranties"
            img={activeWarrantfyLogo}
          />
          <Navbutton
            link="#pending"
            content="Pending Warranties"
            img={pendingWarrantfyLogo}
          />{" "}
          <Navbutton
            link="#expired"
            content="Expired Warranties"
            img={expiryWarrantfyLogo}
          />
        </div>

        <div className="main h-fit min-h-screen w-5/6  ">
          <div className=" ml-4 shadow-md">
            <div className="h-fit flex items-center justify-between bg-hash-light py-4 text-Independence">
              <span className="cursor-default  pl-12   text-4xl font-semibold ">
                eWarranty Management
              </span>
              {account.currentAccount == null ? (
                <div
                  className="mr-20 h-10 w-40 cursor-pointer rounded-xl bg-secondary-2 pt-2 text-center text-white"
                  onClick={connectWallet}
                >
                  + Connect Wallet
                </div>
              ) : (
                <div className="mr-20">
                  Hey,{" "}
                  {`${String(account.currentAccount).slice(0, 9)}...${String(
                    account.currentAccount
                  ).slice(String(account.currentAccount).length - 9)}`}
                </div>
              )}{" "}
            </div>

            <div className="ml-8 flex items-center justify-start gap-x-9 px-2 py-2 pt-2 text-xl font-medium text-gray-100">
              <button
                className={`w-20   ${
                  selectedTab === "#active"
                    ? "border-United-Nations-Blue  border-b-2 text-United-Nations-Blue"
                    : ""
                }`}
              >
                Active
              </button>
              <button
                className={`w-20   ${
                  selectedTab === "#pending"
                    ? "border-United-Nations-Blue  border-b-2 text-United-Nations-Blue"
                    : ""
                }`}
              >
                Pending{" "}
              </button>
              <button
                className={`w-20  ${
                  selectedTab === "#expired"?"border-United-Nations-Blue  border-b-2 text-United-Nations-Blue"
                    : ""
                }`}
              >
                {" "}
                Expired{" "}
              </button>
            </div>
          </div>

          {selectedTab === "#pending" ? (
            <div id="pending">
             
              <div className="border-gray-25  my-2 ml-4 flex h-14 items-center justify-between border-b-1 px-8  text-xl font-medium text-gray-100 ">
                <span className="">Your Wallet</span>
                <span className="">Status</span>
                <span className="">Token Id</span>
              </div>
              <div className="flex flex-col justify-evenly">
                {nfts.length &&
                  nfts
                    .filter((res) => res.status == 0 || res.status == 1)
                    .map((obj) => {
                      const {
                        expiry,
                        status,
                        creationTime,
                        productId,
                        buyers,
                        imageURI,
                        tokenId,
                      } = obj;
                      // console.log(tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/"))

                      return (
                        <PendingWarranty
                          img={imageURI}
                          name={`${String(buyers[buyers.length - 1]).slice(
                            0,
                            5
                          )}...${String(buyers[buyers.length - 1]).slice(
                            String(buyers[buyers.length - 1]).length - 5
                          )}`}
                          status="Pending"
                          id={tokenId}
                        />
                      );
                    })}
              </div>
            </div>
          ) : selectedTab === "#active" ? (
            <div id="active">
             
              <div className="border-gray-25  my-2 ml-4 flex h-14 items-center justify-between border-b-1 px-8  text-xl font-medium text-gray-100 ">
                <span className="">Your Wallet</span>
                <span className="">Status</span>
                <span className="">Expiry Date</span>
                <span className="">Token Id</span>
              </div>
              <div className="flex flex-col justify-evenly">
                {nfts.length &&
                  nfts
                    .filter((res) => res.status == 2)
                    .map((obj) => {
                      const {
                        expiry,
                        status,
                        creationTime,
                        productId,
                        tokenId,
                        buyers,
                        imageURI,
                      } = obj;
                      //const date = new Date(expiry*1000);
                      var date = new Date(expiry * 1000);

                      return (
                        <ActiveWarranty
                          img={imageURI}
                          name={`${String(buyers[buyers.length - 1]).slice(
                            0,
                            5
                          )}...${String(buyers[buyers.length - 1]).slice(
                            String(buyers[buyers.length - 1]).length - 5
                          )}`}
                          status="Active"
                          id={tokenId}
                          expiry={String(date).slice(4, 25)}
                        />
                      );
                    })}
              </div>
            </div>
          ) : (
            <div id="expired">
             
              <div className="border-gray-25  my-2 ml-4 flex h-14 items-center justify-between border-b-1 px-8  text-xl font-medium text-gray-100 ">
                <span className="">Your Wallet</span>
                <span className="">Status</span>
                <span className="">Token Id</span>
              </div>

              <div className="flex flex-col justify-evenly">
                {nfts.length &&
                  nfts
                    .filter((res) => res.status == 3)
                    .map((obj) => {
                      const {
                        expiry,
                        status,
                        creationTime,
                        productId,
                        tokenId,
                        buyers,
                        imageURI,
                      } = obj;

                      return (
                        <ExpiredWarranty
                          img={imageURI}
                          name={`${String(buyers[buyers.length - 1]).slice(
                            0,
                            5
                          )}...${String(buyers[buyers.length - 1]).slice(
                            String(buyers[buyers.length - 1]).length - 5
                          )}`}
                          status="Expired"
                          id={tokenId}
                        />
                      );
                    })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Seller;
