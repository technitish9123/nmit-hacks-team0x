/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Web3Context from '../contexts';

import Navbar from '../components/Navbar';

function Landing() {
  const { account, sellerI } = useContext(Web3Context);

  return (
    <>
      {/* <div>
        <Navbar />
        <div className="w-full h-screen bg-new-secondary flex justify-center items-center">
          <div className="left w-1/2 ml-32">
            <div className="flex flex-col justify-start items-start">
              <div className="title font-bold text-4xl text-black ">
                On-Chain Warranties for Products
              </div>
              <div className="info mt-5">
                Free up your cupboard spaces and store your warranties in the
                digital world in the form of NFTs having proper ownership proof
                over it. Now the warranty is not a piece of paper but a form of
                token. Start issuing warranties for your products by registering
                below.
              </div>
              <div className="buttons w-full mt-8 flex justify-start items-center">
                {sellerI == 0 ? (
                  <NavLink
                    to="/createseller"
                    className="bg-new w-36 text-white p-2 text-center rounded-2xl"
                  >
                    Register as Seller
                  </NavLink>
                ) : (
                  <NavLink
                    to={`seller/${account.currentAccount}`}
                    className="bg-new w-32 text-white p-2 text-center rounded-2xl"
                  >
                    Seller
                  </NavLink>
                )}
                <NavLink
                  to={`/buyer/${account.currentAccount}`}
                  className="bg-new w-32 text-white p-2 ml-2 text-center rounded-2xl"
                >
                  Customer
                </NavLink>
              </div>
            </div>
          </div>
          <div className="right w-1/2 h-full flex justify-center items-center">
            <img
              className="w-96"
              src="https://res.cloudinary.com/dgy8ybeoy/image/upload/v1659277815/NFTDocket_Hero_mqqvsn.png"
            />
          </div>
        </div>
      </div> */}
        <Navbar />

      <div className=" flex  h-[90vh] items-center">

      <div className=" flex w-full flex-col items-center justify-center gap-y-24 ">
        <div className="relative z-40    text-8xl font-semibold ">
          Warranty{" "}
          <span className=" bg-[#047EC3] bg-clip-text text-transparent">
            System
          </span>{" "}
          made
          <br />{" "}
          <span className="bg-[#047EC3] bg-clip-text text-transparent">
            simple
          </span>{" "}
          for everyone{" "}
          {/* <img
            src={heroSectionLine}
            alt="hero-image"
            className=" absolute -bottom-10 right-36 -z-40"
          /> */}
        </div>

        {/* <div className="text-3xl font-semibold text-[#4B535F]">
          A secure and transparent portal to manage and visualize all of <br />
          the warranty for both buyers and sellers
        </div> */}

        

          <div className=" flex items-center gap-x-64 text-4xl font-semibold text-blue-400">
                {sellerI == 0 ? (
                  <NavLink
                    to="/createseller"
                    className="flex w-52  justify-center rounded-xl bg-[#5F97D9] px-4 py-3 text-center  hover:bg-sky-800"
                  >
                    Register as Seller
                  </NavLink>
                ) : (
                  <NavLink
                    to={`seller/${account.currentAccount}`}
                    className="flex w-52  justify-center rounded-xl bg-[#5F97D9] px-4 py-3 text-center  hover:bg-sky-800"
                  >
                    Seller
                  </NavLink>
                )}
                <NavLink
                  to={`/buyer/${account.currentAccount}`}
                  className="flex w-52  justify-center rounded-xl bg-[#5F97D9] px-4 py-3 text-center  hover:bg-sky-800"
                >
                  Customer
                </NavLink>
              </div>
       
      </div>
      <div className="absolute -right-24 ">
        {/* <img src={sittingPng} alt="landing-img" /> */}
      </div>
    </div>
    </>
  );
}

export default Landing;
