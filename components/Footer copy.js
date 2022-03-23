import Link from "next/link";
import { SiNextdotjs, SiMongodb, SiTailwindcss } from "react-icons/si";
import { IconContext } from "react-icons";

const Footer = () => {
  return (
    <div className="p-2 font-semibold flex my-4 justify-items-center">
      <div className="self-center">
        <p className="">
          Developed by
          <span className=" bg-orange-500 px-2 py-1 rounded-md mx-2">
            <Link className="text-red-500" href="https://github.com/m13poul">
              Chris
            </Link>
          </span>
          @2022
        </p>
      </div>
      <div className="ml-auto">
        <div className="flex">
          <p className="self-center mr-4">Built with</p>
          <IconContext.Provider
            value={{
              style: { fontSize: "30px" },
            }}
          >
            <SiNextdotjs /> <SiMongodb />
            <SiTailwindcss />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Footer;
