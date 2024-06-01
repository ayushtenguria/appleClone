import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    <>
      <header className="flex justify-between items-center py-5 sm:px-10 px-5 ">
        <nav className="flex w-full screen-max-width">
          <img src={appleImg} alt="apple" width={14} height={18} />
          <div className="flex max-sm:hidden justify-center flex-1 ">
            {navLists.map((nav, i) => {
              return (
                <div
                  className="px-5 cursor-pointer text-gray hover:text-white transition-all"
                  key={i}
                >
                  {nav}
                </div>
              );
            })}
          </div>
          <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
            <img src={searchImg} alt="search" width={18} height={18} />
            <img src={bagImg} alt="bag" width={18} height={18} />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
