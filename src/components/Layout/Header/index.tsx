import { useState, useEffect } from 'react'
import NavBar from "./NavBar"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"

type Props = {
  fullWidth: boolean
}

const Header: React.FC<Props> = ({ fullWidth }) => {
  const [scrolling, setScrolling] = useState(false);
  const backdropClass = scrolling ? "backdrop-blur-sm" : "";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`transition  bg-white-alpha-9 sticky dark:bg-slate-900 mb-2 md:mb-6 border-b-[1px] z-[40] border-gray-100 dark:border-gray-800 top-0 ${backdropClass}`}
    >    <div
      className={`m-auto px-16 h-16 w-full max-w-6xl flex justify-between items-center ${fullWidth && "md:px-24"
        }`}
    >
        <Logo />
        <div className={`flex gap-3 items-center `}>
          <NavBar />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Header
