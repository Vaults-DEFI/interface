"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import data from "../../public/data.json";
import Vaultinfo from "../component/Vaultinfo";

import Left from "../component/Leftdiv";

import Position from "../component/Position";
import LiquidityMiningProgram from "../component/LiquiditiMiningProgram";

import { MdKeyboardArrowLeft } from "react-icons/md";


const DetailsPage = () => {
  const { id } = useParams();
  const item = data.find((d) => d.id === id);

  return (
    <main className="w-[90%] xl:w-[85%] mx-auto mt-32">
      <div>
        <Link href="/">
          <button className="bg-[#1E212A] hover:bg-[#2b2E37] w-fit px-6 py-3 rounded-xl text-left flex items-center gap-2 sm:gap-3 mt-4 text-xs sm:text-base">
            <MdKeyboardArrowLeft /> Back to all Vaults
          </button>
        </Link>

        <Vaultinfo data={item} />

        <div className="w-full flex flex-col-reverse lg:flex-row items-start justify-between my-10">
          <div className="w-full lg:w-[60%] mt-10 lg:mt-0">
            <Left data = {item} />
          </div>
          <div className="flex flex-col md:flex-row lg:flex-col w-full lg:w-[39%] gap-2">
            <Position data = {item} />
            <LiquidityMiningProgram />
          </div>
        </div>{" "}
      </div>
    </main>
  );
};

export default DetailsPage;
