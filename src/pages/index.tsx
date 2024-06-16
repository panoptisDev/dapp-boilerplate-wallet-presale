import React, { Fragment, useEffect } from "react";
// Importing Hooks
import { useAccount } from "wagmi";
// Importing Components
import Meta from "@/components/Meta";

export default function Home() {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      console.log("Wallet address: ", address);
    } else {
      console.log("Not connected");
    }
  }, [address, isConnected]);

  return (
    <Fragment>
      <Meta />

      <div className="flex flex-col items-center justify-center w-full min-h-screen text-white bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
        <div className="max-w-2xl p-8 mx-auto text-center">
          <h1 className="mb-4 text-5xl font-bold">
            Welcome to Shape Token Presale
          </h1>
          <p className="mb-8 text-xl">
            Join the Shape Token Presale to get your Token now!
          </p>
          <div className="flex items-center justify-center mb-8">
            <img src="/img/presale.webp" alt="Futuristic Concept" className="w-[300px] h-[300px] rounded-lg shadow-lg" />
          </div>
          <div>
          <a href="/presale" className="inline-block px-6 py-3 text-lg font-semibold text-white transition-transform transform border border-white border-solid rounded-full bg-primary hover:scale-105">
              To Presale
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}