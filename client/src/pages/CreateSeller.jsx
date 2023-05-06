/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import Web3Context from '../contexts';
import { createSeller } from '../contexts/useContract/writeContract';
import Navbar from '../components/Navbar';

function CreateSeller() {
  const [sellerId, setSellerId] = useState('');
  const history = useNavigate();
  const { account, Contract } = useContext(Web3Context);

  // set the seller id
  useEffect(() => {
    const rand = Math.round(Math.random() * 100000);
    setSellerId(rand);
  }, []);

  // create the seller profile
  const create = async () => {
    //console.log(Contract)
    await createSeller(sellerId, Contract, account.currentAccount);
    window.location.href = `seller/${account.currentAccount}`;
  };

  return (
    <>
      <div className="w-screen h-screen"  style={{backgroundColor:"#A7C6D7"}}>
        <Navbar />
        <div
          className="w-full h-full flex justify-evenly items-center"
      
        >
          <div
            className="w-1/3 h-1/2 drop-shadow rounded-lg flex flex-col justify-evenly items-center  px-20"
            style={{ backgroundColor: '#F6FBF9' }}
          >
            <div className="text-2xl text-Independence font-bold">
              Create Seller Profile
            </div>
            <form className="w-full h-1/2 flex flex-col justify-evenly items-center">
              <div className="w-full flex flex-col justify-evenly items-center">
                <label
                  htmlFor="wallet"
                  className=" p-3 text-Independence text-left text-lg font-semibold"
                >
                  Seller Wallet Address
                </label>
                <input
                  name="wallet"
                  placeholder="Enter Seller Wallet ID"
                  type="text"
                  className=" w-full p-3 rounded-md  border-2 border-gray-200"
                  readOnly
                  value={
                    account.currentAccount ? account.currentAccount : '0x00'
                  }
                />
              </div>
              <div className="w-full flex flex-col justify-evenly items-center">
                <label
                  htmlFor="seller"
                  className="p-2 text-Independence text-lg text-left font-semibold "
                >
                  Seller ID
                </label>
                <input
                  name="seller"
                  placeholder="Enter Seller ID"
                  type="text"
                  className=" w-full p-3 rounded-md border-2 border-gray-200"
                  readOnly
                  value={sellerId}
                />
              </div>
            </form>
            <button
              className="w-1/3 h-12 flex justify-center items-center font-semibold rounded-md bg-limited-sky text-hash-light"
              onClick={create}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateSeller;
