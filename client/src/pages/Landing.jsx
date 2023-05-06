/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Web3Context from "../contexts";

import Navbar from "../components/Navbar";
import heroSectionLine from "../assets/heroSectionLine.svg";
import sittingPng from "../assets/sitting-removebg.png";

function Landing() {
  const { account, sellerI } = useContext(Web3Context);

  return (
    <>
      <Navbar />

      <div className=" flex  items-center pt-60">
        <div className=" flex w-full flex-col items-center justify-center gap-y-24  text-hash-dark">
          <div className="relative z-40    text-8xl font-semibold ">
            Warranty
            <span className=" bg-sky-blue-x bg-clip-text text-transparent">
            {" "} System
            </span>
            {" "} made
            <br />
            <span className="bg-sky-blue-x bg-clip-text text-transparent">
              simple
            </span>{" "}
            for everyone
            <img
              src={heroSectionLine}
              alt="hero-image"
              width={400}
              className=" absolute -bottom-10 right-36 "
            />
          </div>

          <div className="text-3xl font-semibold text-Independence">
            A secure and transparent portal to manage and visualize all of{" "}
            <br />
            the warranty for both buyers and sellers
          </div>

          <div className=" flex items-center gap-x-64 text-3xl font-semibold text-hash-light">
            {sellerI == 0 ? (
              <NavLink
                to="/createseller"
                className="hover:bg-limited-sky  flex w-72 justify-center rounded-xl bg-United-Nations-Blue px-2 py-3  text-center"
              >
                Register as Seller
              </NavLink>
            ) : (
              <NavLink
                to={`seller/${account.currentAccount}`}
                className="hover:bg-limited-sky   flex  w-72 justify-center rounded-xl bg-United-Nations-Blue px-4 py-3  text-center"
              >
                Seller
              </NavLink>
            )}
            <NavLink
              to={`/buyer/${account.currentAccount}`}
              className="hover:bg-limited-sky  flex  w-72 items-center justify-center rounded-xl bg-United-Nations-Blue px-4 py-3  text-center"
            >
              Customer
            </NavLink>
          </div>
        </div>
        <div className="absolute -right-24 ">
          <img src={sittingPng} alt="landing-img" />
        </div>
      </div>
    </>
  );
}

export default Landing;
