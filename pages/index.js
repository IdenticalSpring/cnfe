import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {Login} from './Login/Login.js';
import {Signup} from './Login/signup.js';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div>
        <Login /> 
        {/* <Signup />  */}
      </div>
    </>
  );
}
