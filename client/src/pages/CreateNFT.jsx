/* eslint-disable */
import React, { useState, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import client from '../utils/ipfs';
import { createNFT } from '../contexts/useContract/writeContract';
import Web3Context from '../contexts';

import Navbar from '../components/Navbar';
import Illustration from "../assets/illustration.svg"

function CreateNFT() { 
  const {account,Contract,sellerI} = useContext(Web3Context)
  const{add} = useParams();
    const [show, setshow] = useState('')
    const[productId,setProductId]=useState("")
    const[customer,setCustomer]= useState("")
    const[expiry,setExpiry]=useState("")
    const[coverImageURI,setCoverImageURI] = useState("")
    const[Coverimage,setCoverImage] = useState("")
    //const [pic,setPic]=useState()
    const showPhoto = async(e) => {
        //console.log(e.target.files[0]);
        setCoverImage(e.target.files[0]);
        setshow(URL.createObjectURL(e.target.files[0]));
       
    }
    const handleProductId= (event) => {
        setProductId(() => ([event.target.name] = event.target.value));
      };
      const handleExpiry= (event) => {
        setExpiry(() => ([event.target.name] = event.target.value));
      };
      const handleCustomer= (event) => {
        setCustomer(() => ([event.target.name] = event.target.value));
      };
    const UploadImage = async (e) => {
      //let uri="" ;
     // console.log(Coverimage)
     e.preventDefault()
        const data = new FormData();
        data.append('file', Coverimage);
        data.append('upload_preset', 'mystiq');
        data.append('cloud_name', 'doybtqm8h');
        await fetch('https://api.cloudinary.com/v1_1/doybtqm8h/image/upload', {
          method: 'post',
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            const res = data.url
            setCoverImageURI(res);
            // console.log(res)
           // uri = data.url
            //console.log('Image Uploaded')
            alert("Image Uploaded");
             handleData(res)
           
          
          })
          .catch((err) => console.log(err));
      };
    
      const handleData = async (res) => {
     
        const obj = {
        
          name:"NFT Warranty",
          description:"This a NFT Warranty and Proof of Ownership of the following product",
          image: res,
          attributes: [
            {
                "display_type": "date", 
                "trait_type": "expiry", 
                "value":Math.floor(Date.now() /1000)+expiry+20

            },
            {
                "trait_type":"productId",
                "value":productId
            }
          ],
        };
    
        const result = await client.add(JSON.stringify(obj));
        const str = 'ipfs://';
        const finalResult = str.concat(String(result.path));
        // console.log(result)
      //  console.log(finalResult);
      alert('NFT Data added');
       await createNFT(Contract,finalResult,sellerI,productId,customer.toLowerCase(),expiry,res,account.currentAccount);
        alert('NFT created')
        setTimeout(function () {
          window.location.href = `/seller/${account.currentAccount}`;
        }, 4000);
      
        
      };
  return (
    <>
      <div className="w-screen h-screen" 
      style={{backgroundColor:" #A7C6D7"}}>
        <Navbar />

        <img src={Illustration} alt='Illustration' className='fixed top-0 left-0' style={{zIndex:"0"}}/>
        <img src={Illustration} alt='Illustration' className='fixed bottom-0 right-0' style={{zIndex:"0", rotate:"-90"}}/>
        <div className="w-full h-full  flex justify-center items-center overflow-auto" >
          <div className="w-1/3 min-h-1/2 h-fit flex justify-start items-center flex-col  py-8 mt-32 rounded-xl" style={{zIndex:"10", backgroundColor:"#F6FBF9"}}>
            <div className="text-2xl font-bold text-Independence mb-5">
              Create Warranty
            </div>
            <form className="flex flex-col justify-evenly items-center min-h-full h-fit w-full rounded-xl">
              <img src={show} className="w-60 h-auto max-h-60" id="show" />
              <input
                placeholder="Upload Image"
                type="file"
                accept="image/*"
                className="w-5/6 p-2 m-4 block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onChange={showPhoto}
              />
              <input
                placeholder="Enter Order ID"
                type="text"
                className="w-5/6 border-2 border-light-gray-50 m-4 p-2 rounded-lg"
                onChange={handleProductId}
              />
              <input
                placeholder="Enter Buyer Wallet ID"
                type="text"
                className="w-5/6 border-2 border-light-gray-50 m-4 p-2 rounded-lg"
                onChange={handleCustomer}
              />
              <input
                type="number"
                placeholder="Validity"
                className="w-5/6 border-2 border-light-gray-50 m-4 p-2 rounded-lg"
                onChange={handleExpiry}
              />
              <NavLink
                type="submit"
                className=" text-hash-light bg-United-Nations-Blue hover:bg-limited-sky  bottom-2 border-black rounded-xl  w-2/3 h-10  m-2 flex justify-center items-center"
                to="/seller"
                onClick={UploadImage}
              >
                Submit
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNFT;
