import Image from "next/image";
import React from "react";
import graph from "../../public/icons/graph.svg";

const StrategyComparisonDiagram = () => {
  return (
    <div className="bg-[#1E212A] sm:p-14 p-4 rounded-xl flex flex-col items-center gap-3">
      <div className="w-full overflow-hidden my-4 flex items-center justify-center">
        <Image src={graph} alt="graph" width={700} className="min-w-[250px] border border-gray-700 rounded-xl"></Image>
      </div>
    </div>
  );
};

export default StrategyComparisonDiagram;
