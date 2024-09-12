import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {Login} from './Login/login.js';
import {Signup} from './Login/signup.js';
import React from 'react';
import DefaultLayout from '@/layout/DefaultLayout';
import styled from 'styled-components';


export default function HomePage() {
  return (
    <>
      <div>
        {/* <Login /> */}
        {/* <Signup />  */}
      </div>
      <DefaultLayout>
        HomePage

      </DefaultLayout>

    </>
  );
}