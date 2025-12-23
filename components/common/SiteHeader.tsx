"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiDocumentText, HiMenu, HiX } from "react-icons/hi";
import { Combobox } from "@/components/ui/combobox";
import { useLocationFilter } from "@/hooks/useLocationFilter";
import { useWindowScroll } from "@/hooks/useWindowScroll";
import UserDropDown from "./UserDropDown";

const locations = [
  { label: "All Locations", value: "all" },
  { label: "Bankura", value: "bankura" },
  { label: "Midnapore", value: "midnapore" },
  { label: "Jhargram", value: "jhargram" },
  { label: "Burdwan", value: "burdwan" },
  { label: "Kolkata", value: "kolkata" },
  { label: "Howrah", value: "howrah" },
  { label: "Hooghly", value: "hooghly" },
];

const HIDDEN_LOCATION_ROUTES = ["/contact-us", "/signin"];

const MobileMenu = ({
  isOpen,
  onClose,
  selectedLocation,
  setSelectedLocation,
  showLocationFilter,
}: any) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md sm:hidden"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 z-[70] w-64 transform bg-white shadow-xl transition-transform duration-300 sm:hidden">
        <div className="flex h-full flex-col bg-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-900">Menu</span>
            <button
              onClick={onClose}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <HiHome className="w-5 h-5" />
                <span className="font-medium">Room</span>
              </Link>
              <Link
                href="/contact-us"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <HiDocumentText className="w-5 h-5" />
                <span className="font-medium">Contact Us</span>
              </Link>
            </div>
            {showLocationFilter && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Location
                </label>
                <Combobox
                  options={locations}
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                  placeholder="Select location..."
                  searchPlaceholder="Search location..."
                  emptyMessage="No location found."
                  showSearch={true}
                  buttonClassName="w-full justify-between text-gray-700 border-gray-300 hover:bg-gray-100"
                  popoverClassName="w-full !z-[80]"
                />
              </div>
            )}
          </nav>
        </div>
      </div>
    </>,
    document.body
  );
};

const SiteHeader = () => {
  const pathname = usePathname();
  const { selectedLocation, setSelectedLocation } = useLocationFilter("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollY = useWindowScroll(); // Assuming custom hook returns number
  const isScrolled = scrollY > 10;

  useEffect(() => {
    setMounted(true);
  }, []);

  const showLocationFilter = !HIDDEN_LOCATION_ROUTES.includes(pathname);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.classList.toggle("overflow-hidden");
  };

  return (
    <header
      className={`bg-[var(--navy)] text-white ${isScrolled ? "onscroll" : ""}`}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          <nav className="hidden transform -translate-x-1/2 sm:flex items-center gap-4 md:gap-6 absolute left-1/2">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-pink-500 transition-colors"
            >
              <HiHome className="w-5 h-5" />
              <span>Room</span>
            </Link>
            <Link
              href="/contact-us"
              className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-pink-500 transition-colors"
            >
              <HiDocumentText className="w-5 h-5" />
              <span>Contact Us</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <UserDropDown />

            {showLocationFilter && (
              <div className="hidden sm:block">
                {mounted && (
                  <Combobox
                    options={locations}
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                    placeholder="Select location..."
                    searchPlaceholder="Search location..."
                    emptyMessage="No location found."
                    showSearch={true}
                    buttonClassName="!text-white !border-white/20 !bg-transparent hover:!bg-[var(--navy-dark)] w-auto min-w-[160px] justify-between text-sm sm:text-base"
                    popoverClassName="w-[160px]"
                  />
                )}
              </div>
            )}

            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-center p-2 rounded-md sm:hidden hover:bg-[var(--navy-dark)]"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mounted && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={toggleMobileMenu}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          showLocationFilter={showLocationFilter}
        />
      )}
    </header>
  );
};

export default SiteHeader;
