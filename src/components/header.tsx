import Link from "next/link";

import { shadow } from "@/styles/utils";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import LogoutButton from "./LogoutButton";

export default function Header() {
    const user = 1;
    return (
        <header className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-8" style={{boxShadow: shadow}}>
            <Link className="flex items-end gap-2" href="/">
                <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">
                    Mis <span>Notas</span>
                </h1>
            </Link>
            <div className="flex gap-4">
                {
                    user ?
                        <LogoutButton /> :
                        <>
                            <Button asChild>
                                <Link href="/register" className="hidden sm:block">Registrarse</Link>
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