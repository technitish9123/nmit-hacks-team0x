import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Web3Context from "../contexts";
import logo from "../assets/logo.svg";

function Navbar() {
  const { connectWallet, account } = useContext(Web3Context);

  return (
    <>
      <div className="fixed flex  h-20 w-full flex-row items-center justify-between pt-8">
        <div className="ml-20 flex items-center justify-center gap-x-16">
          <NavLink
            to="/"
            className="h-fit flex w-full  items-center justify-start gap-x-4 py-2 text-2xl font-bold  text-Independence"
          >
            <img src={logo} alt="logo" />
            E-warranty
          </NavLink>
          <NavLink
            to="/"
            className="flex items-center  justify-start py-2 text-2xl text-Independence "
          >
            Features
          </NavLink>
          <NavLink
            to="/"
            className="flex items-center justify-start py-2 text-2xl text-Independence  "
          >
            Testimonials
          </NavLink>
          <NavLink
            to="/"
            className="flex items-center  justify-start py-2 text-2xl text-Independence"
          >
            Pricing
          </NavLink>
        </div>
        {account.currentAccount == null ? (
          <div
            className="mr-24 h-10 w-52 cursor-pointer rounded-xl bg-United-Nations-Blue px-4 pt-2 font-semibold text-center text-white"
            onClick={connectWallet}
          >
            + Connect Wallet
          </div>
        ) : (
          <div className="mr-24 flex w-1/3 items-center justify-center text-white">
            Hey,{" "}
            {`${String(account.currentAccount).slice(0, 9)}...${String(
              account.currentAccount
            ).slice(String(account.currentAccount).length - 9)}`}
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
