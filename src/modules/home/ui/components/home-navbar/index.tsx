import Image from "next/image";
import Link from "next/link";

import SearchInput from "./search-input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AuthButton from "@/modules/auth/component/auth-button";
import { Music } from "lucide-react";

export default function HomeNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />

          <Link href={"/"}>
            <div className="p-4 flex items-center gap-1">
              {/* <Image src="./logo.svg" alt="Logo" width={32} height={32} /> */}

              <Music className="text-rose-500" />

              <p className="text-xl font-semibold tracking-tight text-rose-500">
                NewTube
              </p>
            </div>
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
          <SearchInput />
        </div>

        {/* Auth */}

        <div className="flex-shrint-0 items-center flex gal-4">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
