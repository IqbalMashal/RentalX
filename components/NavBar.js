import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 px-6 bg-white shadow-md border-b">
      {/* Logo Section */}
      <Link href="/">
        <Image
          src="/logo1.png"
          alt="Logo"
          width={120}
          height={120}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        />
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {["Home", "History", "Contact Us"].map((item, index) => (
          <Link key={index} href={`/${item.toLowerCase().replace(/\s/g, "")}`}>
            <h2
              className="px-4 py-2 rounded-lg text-gray-700 font-medium 
              hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              {item}
            </h2>
          </Link>
        ))}
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3">
        <UserButton />
      </div>
    </nav>
  );
}

export default NavBar;
