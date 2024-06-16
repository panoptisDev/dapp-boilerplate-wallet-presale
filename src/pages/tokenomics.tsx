import React from "react";
// Importing Components
import Meta from "@/components/Meta";

export default function Tokenomics() {
  return (
    <div className="flex items-center justify-center w-screen h-screen p-8 text-white bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
      <Meta />

      <div className="max-w-3xl p-8 mx-auto text-center transition-transform transform bg-black bg-opacity-75 border-2 border-white rounded-lg shadow-lg hover:scale-105 hover:border-primary hover:shadow-2xl">
        <h1 className="mb-6 text-5xl font-bold">Tokenomics</h1>
        <p className="mb-6 text-lg">
          Welcome to the ForcasterToken (FCT) ecosystem. Here's how our tokenomics works:
        </p>
        <p className="mb-6 text-lg">
          There are a total of 25,000,000 ForcasterTokens (FCT) in circulation. By staking your FCT, you become eligible to receive a proportionate share of the revenue generated from the betting pool fees.
        </p>
        <p className="mb-6 text-lg">
          The earnings from the betting pool are collected and redistributed to FCT holders based on the amount of tokens they have staked. This means the more tokens you stake, the larger your share of the revenue.
        </p>
        <p className="mb-6 text-lg">
          Staking your tokens not only gives you a share of the betting pool revenue but also supports the stability and growth of the ForcasterToken ecosystem. We appreciate your participation and support.
        </p>
        <div className="mt-8">
        <a href="/staking" className="inline-block px-6 py-3 text-lg font-semibold text-white transition-transform transform border border-white border-solid rounded-full bg-primary hover:scale-105">
            Stake Your Tokens
          </a>
        </div>
      </div>
    </div>
  );
}