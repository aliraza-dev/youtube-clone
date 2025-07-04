import Link from "next/link";
import { Music } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import AuthButton from "@/modules/auth/component/auth-button";
import { StudioUploadModal } from "../studio-upload-modal";

export function StudioNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b shadow-md">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />

          <Link href={"/studio"}>
            <div className="p-4 flex items-center gap-1">
              {/* <Image src="./logo.svg" alt="Logo" width={32} height={32} /> */}

              <Music className="text-rose-500" />

              <p className="text-xl font-semibold tracking-tight text-rose-500">
                Studio
              </p>
            </div>
          </Link>
        </div>

        {/* Auth */}
        <div className="flex-1"></div>

        <div className="flex-shrint-0 items-center flex gap-4">
          <StudioUploadModal />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
