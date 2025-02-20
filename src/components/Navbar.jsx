import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import UserMenu from "./UserMenu";
import LetsGoLogo from "/Logo/LetsGoLogo.png";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Destination", href: "#", current: false },
  { name: "Search", href: "#", current: false },
  { name: "Contact Us", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  const { userInfo, loading } = useContext(UserContext);

  const handleScrollToSearch = () => {
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Disclosure as="nav" className="">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
            <div className="sm:flex hidden shrink-0 items-center">
              <img
                alt="Your Company"
                src={LetsGoLogo}
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) =>
                  item.name === "Search" ? (
                    <button
                      key={item.name}
                      onClick={handleScrollToSearch}
                      className={classNames(
                        item.current
                          ? "bg-green-600 text-white"
                          : "text-gray-800 hover:bg-green-600 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-green-600 text-white"
                          : "text-gray-800 hover:bg-green-600 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
          <UserMenu userInfo={userInfo} />
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) =>
            item.name === "Search" ? (
              <DisclosureButton
                key={item.name}
                as="button"
                onClick={handleScrollToSearch}
                className={classNames(
                  item.current
                    ? "bg-green-600 text-white"
                    : "text-gray-300 hover:bg-green-600 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ) : (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-green-600 text-white"
                    : "text-gray-300 hover:bg-green-600 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            )
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}