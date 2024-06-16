import { useEffect, useState } from "react";
//Importing icon
import { IoLogoGithub, IoPlanet } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegram } from 'react-icons/fa';

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer className="p-4 bg-02 sm:flex sm:items-center sm:justify-between sm:p-6 xl:p-8 dark:bg-09">
      <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-300 sm:mb-0">
        &copy; {new Date().getFullYear()}{" "}
        <a
          className="hover:underline"
          href="https://mashu.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          built with💚 
        </a>
          by panoptisDev.
      </p>
      <div className="flex items-center justify-center space-x-1">
        {/* GitHub */}
        <a
          href="https://github.com/panoptisDev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-300 hover:text-blue-200 hover:dark:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <IoLogoGithub className="w-5 h-5" />
          <span className="sr-only">Github</span>
        </a>
        {/* Twitter */}
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-300 hover:text-blue-600 hover:dark:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <FaXTwitter className="w-5 h-5" />
          <span className="sr-only">Twitter</span>
        </a>
        {/* Telegram */}
        <a
          href="https://t.me/PanoptisN"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-300 hover:text-primary hover:dark:text-primary hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <FaTelegram className="w-5 h-5" />
          <span className="sr-only">Telegram</span>
        </a>
        {/* WebSite */}
        <a
          href="https://github.com/panoptisDev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-300 hover:text-green-500 hover:dark:text-green-500 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <IoPlanet className="w-5 h-5" />
          <span className="sr-only">Website</span>
        </a>
      </div>
    </footer>
  );
}
//bright
//import { BiLogoTelegram } from "react-icons/bi";
//<BiLogoTelegram />

//dark
//import { PiTelegramLogo } from "react-icons/pi";
//<PiTelegramLogo />