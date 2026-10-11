import Navbar from "./Navbar";
import Marquee from "./Marquee";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <Navbar />
      <Marquee />
    </header>
  );
};

export default Header;
