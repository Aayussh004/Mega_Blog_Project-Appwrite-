import conf from './conf/conf';
import './App.css'
import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice'
import { Header,Footer } from './components';
import { Outlet } from 'react-router-dom';
function App() {
// console.log(import.meta.env.VITE_MYVARIABLE);
// console.log(conf.appwriteCollectionID)

const [loading,setLoading] = useState(true);
const dispatch = useDispatch();//this connects redux to react basically used for sending the data to store room 

// now ab ek useEffect use krenge taaki userauthentication se data store me bhej ske
useEffect(()=>{
  authService.getCurrentUser()
  .then((userkadata)=>{
    if(userkadata){//if user exist then data ko dispatch (bhej do) krdo store ke authSlice ke login method me 
      dispatch(login({userkadata}));
    }
    else{
      dispatch(logout());//if data nhi mila means user hi nhi hai to logout call krdo
    }
  })
  .finally(()=> setLoading(false));
},[])


  return (loading ? null : (
  <div className=' min-h-screen flex flex-wrap content-between bg-gray-400'>
  <div className=' w-full block'>
    <Header/>
    <main>
    TODO: <Outlet/> 
    </main>
    <Footer/>
  </div>
  </div>
  ))
}

export default App


// here we will use these opensource plateform:
/* # Appwrite - For using backend services kyuki hmne to abhi khali react pdha h to backend opensource se easily ho jaega
   # Tiny MCE - For using text editor functionality, kyuki jo backend se html ka response aayega usko interpret krke frontend me show krna h
   # React Hook Form - Ye apne forms ko manage krne ke liye hai, apn ne thoda advance form use kiye hai
 
   # NPM COMMANDS to download project dependencies - (google me jaa ke dekh lena download krte time)
    npm install @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parserreact-hook-form

  # For environment variable - 
  make a .env file and add it to gitignore coz ye mei dusro ko nhi dena chahata nhi to koi bhi mere variables access krke change kr skta hai haa bt future me agr mujhe project banana hua to uske liye .env.sample file bna diya h

  # .env file - 
    # now make variables in .env file 
    # then appwrite ki website me jaake project create kro wha se project id and endpoint api uthao aur yha .env file ke variable me inject kr do
    # now go to appwrite website and create a database then create collection and collection me permission dena all users ko anc copy db and collection id nd paste it in .env file
    # now go to storage and create a bucket, copy bucket id and paste it in .env file

  # create a conf folder in src and rewrite all id's to stringify them ye production grad apps ke liye kaafi achi practice hai so tht aapko baar baar import.meta.env.VITE_ na likhna pde

  # now I want to create vendor's login account for appwrite realted kaam so 
    # create an appwrite folder in src and create a file auth.js ab baaki ka explanation auth.js ke andr hai
    # iske baad appwrite ke andar hi config.js file banani hai aur database manage krna h 
  
  # For configuring redux in this project, make store folder in ./src
    # make store.js inside store to configure redux
    # make another file authSlice.js inside store for redux 

  # configure Components for project
    # make component folder inside ./src
    # make a folder of Header inside components and a file Header.js
    # make a folder of Footer inside components and a file Footer.js

  # Now go to App.jsx in which if user is logged in show him something otherwise show him something else
*/