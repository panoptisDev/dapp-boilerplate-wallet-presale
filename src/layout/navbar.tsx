import { useState, useEffect } from "react";
import ThemeSwitch from '../components/ThemeSwitch';
import Image from "next/image";
import Link from "next/link";
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
      <nav className="flex items-center justify-between mx-auto">
        <Link href="/">
          <div className="flex items-center py-4 pr-4">
            <Image src="/img/shape_logo.png" alt="logo" width={50} height={50} />
            <span className="ml-2 text-3xl">Shape Token Presale</span>
          </div>
        </Link>
        <div className="flex items-center md:hidden">
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
          className={`w-full md:flex md:items-center md:w-auto ${
            isNavVisible ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <li className="px-2 py-2 md:py-0">
              <Link href="/presale">
                <span className="block text-lg font-medium text-black dark:text-white">
                  Presale
                </span>
              </Link>
            </li>
            <li className="px-2 py-2 md:py-0">
              <Link href="/tokenomics">
                <span className="block text-lg font-medium text-black dark:text-white">
                  Tokenomics
                </span>
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-center mt-4 md:mt-0 md:ml-4">
            <div className="mr-4">
              <ConnectButton />
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </header>
  );
}