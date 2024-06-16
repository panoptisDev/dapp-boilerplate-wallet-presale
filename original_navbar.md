import { useState, useEffect } from "react";
import ThemeSwitch from '../components/ThemeSwitch';
import Image from "next/image";
import Link from "next/link";
//Importing RainbowKit
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function NavBar() {
  const [isNavVisible, setNavVisibility] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="px-4 shadow-lg xs:px-6 md:px-8 bg-02 dark:bg-09">
      <nav className="flex flex-wrap items-center justify-between mx-auto">
      <Link href="/" target="_self" className="flex items-center py-4 pr-4">
          <Image src="/img/logo.png" alt="logo" width={50} height={50} />
          <span className="ml-2 text-3xl">ForeCaster</span>
        </Link>
        <div className="h-8 px-8 py-5 cursor-pointer contents justify-self-end md:hidden">
          <div
            onClick={toggleNav}
            className={`hamburger flex flex-col justify-between w-6 h-5 cursor-pointer ${
              isNavVisible ? "open" : ""
            }`}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>

        <div
          className={`w-full md:block md:max-w-header-nav ${
            isNavVisible ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col w-full p-0 mt-0 mb-6 md:m-0 md:flex-row md:justify-around">
            <li className="flex items-center justify-center">
              <a
                className="block py-2 text-lg font-medium text-black px- dark:text-white"
                href="/betting"
                target="_self"
              >
                Betting
              </a>
            </li>
            <li className="flex items-center justify-center">
              <a
                className="block px-4 py-2 text-lg font-medium text-black dark:text-white"
                href="/tokenomics"
                target="_blank"
                rel="noreferrer"
              >
                Tokenomics
              </a>
            </li>
            <li className="flex items-center justify-center pt-2 md:pt-0">
              <div className="mr-4">
                <ConnectButton/>
              </div>
              <ThemeSwitch /> 
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
