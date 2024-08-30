"use client";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black z-40 text-white px-2 xl:px-10 py-7 flex justify-between items-center sm:w-[90%] mx-auto">
      <div className="flex flex-row items-center space-x-10 xl:space-x-16">
        <div className="p-2 text-orange-500">LOGO Vault</div>
        <div className="hidden min-[900px]:flex space-x-5 xl:space-x-9">
          <Link href="/">Liquidity Vaults</Link>
          <Link href="/">Points</Link>
          <Link href="/">Spaceship</Link>
          <Link href="/">Astronaut</Link>
        </div>
      </div>
      {/* <div>
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: false,
          }}
        />
      </div> */}

      <div className="flex items-center sm:space-x-2 space-x-1">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className="text-white rounded-xl bg-orange-700 hover:bg-orange-600 px-4 py-2 transition duration-300 text-nowrap"
                      >
                        Connect Wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={openChainModal}
                        type="button"
                        className="bg-[#FB5B0D1F] hover:opacity-90 text-orange-500 hover:text-orange-600 px-4 py-2 rounded-2xl transition duration-300 text-nowrap"
                      >
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div className="flex items-center sm:space-x-2 space-x-1">
                      <button
                        onClick={openChainModal}
                        className="text-white sm:rounded-xl rounded-lg
                         bg-orange-700 hover:bg-orange-600 sm:px-3 px-2 sm:py-2 py-1 transition duration-300 flex items-center"
                      >
                        {chain.hasIcon && (
                          <div className="w-6 h-6 mr-2">
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                className="w-full h-full"
                              />
                            )}
                          </div>
                        )}
                        <span className="truncate max-w-[55px] sm:max-w-none text-[12px] font-medium">
                          {chain.name}
                        </span>
                      </button>
                      <button
                        onClick={openAccountModal}
                        type="button"
                        className="text-white sm:rounded-xl rounded-lg bg-orange-700 hover:bg-orange-600 sm:px-3 px-2 sm:py-2 py-1 transition duration-300 truncate max-w-[70px] sm:max-w-none text-[12px] font-medium"
                      >
                        {account.displayName}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>

        <div className="min-[900px]:hidden z-20 flex items-center justify-center">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="min-[900px]:hidden absolute top-[90px] right-[30px] w-[210px]">
            <div className="flex flex-col w-full bg-orange-700 rounded-lg overflow-hidden p-2 text-xs">
              <Link
                href="/"
                onClick={toggleMenu}
                className="hover:bg-orange-600 px-4 py-3 rounded-lg"
              >
                Liquidity Vaults
              </Link>
              <Link
                href="/"
                onClick={toggleMenu}
                className="hover:bg-orange-600 px-4 py-3 rounded-lg"
              >
                Points
              </Link>
              <Link
                href="/"
                onClick={toggleMenu}
                className="hover:bg-orange-600 px-4 py-3 rounded-lg"
              >
                Spaceship
              </Link>
              <Link
                href="/"
                onClick={toggleMenu}
                className="hover:bg-orange-600 px-4 py-3 rounded-lg"
              >
                Astronaut
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
