import { FaGithub, FaSearch } from "react-icons/fa";
import { BsCalendar2Week } from "react-icons/bs";
function Header() {
  return (
    <header className="bg-gray-900 text-white border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8   flex items-center justify-center">
            <BsCalendar2Week className="text-white text-2xl" />
          </div>
          <span className="text-2xl font-bold">FullCalendar</span>
        </div>

        {/* Navigation */}  
        <nav className="hidden md:flex items-center gap-6 pr-96 text-sm">
          <a href="#" className=" hover:text-sky-300 transition-colors">
            Demos
          </a>
          <a
            href="#"
            className="text-yellow-400 font-medium px-3 py-2 hover:text-sky-300 bg-[#0e1014] hover:bg-[#0d1117] rounded-md transition-all duration-200"
          >
            Docs
          </a>

          <div className="relative group">
            <button className="text-white  hover:text-sky-300 transition-all">
              Support
            </button>

            {/* underline */}
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-sky-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>

            {/* dropdown */}
            <div className="absolute left-0 mt-2 hidden group-hover:block w-56 bg-[#1f2937] shadow-lg  rounded-md border border-[#2b3748]">
              <ul className="flex flex-col py-2">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-300 hover:text-sky-300 transition-colors"
                  >
                    Getting Help
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-300 hover:text-sky-300 transition-colors"
                  >
                    Reporting Bugs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-300 hover:text-sky-300  transition-colors"
                  >
                    Requesting Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-300 hover:text-sky-300  transition-colors"
                  >
                    Contributing
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <a
            href="#"
            className="border-3 border-sky-300 px-4 py-2 rounded hover:bg-sky-300 hover:text-black transition-colors"
          >
            Pricing
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <span className="text-sm underline underline-offset-4 decoration-2 decoration-yellow-300">
            <span className="text-yellow-200 font-medium">Latest: </span>
            <span className=""> v6.1.19</span>
          </span>

          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub className="text-3xl text-white" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
