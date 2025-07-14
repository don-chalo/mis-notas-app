import Link from "next/link";

import { shadow } from "@/styles/utils";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import LogOutButton from "./LogoutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";

export default async function Header() {
  const user = await getUser();
  return (
    <header className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-8" style={{ boxShadow: shadow }}>
      <SidebarTrigger className="absolute left-1 top-1" />
      <Link className="flex items-end gap-2" href="/">
        <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">
          Mis <span>Notas</span>
        </h1>
      </Link>
      <div className="flex gap-4">
        {
          user ?
            <LogOutButton /> :
            <>
              <Button asChild>
                <Link href="/sign-up" className="hidden sm:block">Registrarse</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
            </>
        }
        <DarkModeToggle />
      </div>
    </header>
  );
}
