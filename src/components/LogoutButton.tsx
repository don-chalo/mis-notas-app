'use client';

import React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { logOutAction } from "@/actions/users";

export default function LogOutButton() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const handleLogout = async () => {
        setLoading(true);
        const { errorMessage } = await logOutAction();
        if (!errorMessage) {
            toast.success(
                "¡Hasta pronto!",
                { description: "Has cerrado sesión con exito" }
            );
            router.push("/");
        } else {
            toast.error(
                "Error",
                { description: errorMessage }
            );
        }
        setLoading(false);
    };

    return (
        <Button className="w-24 cursor-pointer"
            disabled={loading}
            variant="outline"
            onClick={handleLogout}>
            {
                loading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    "Cerrar"
                )
            }
        </Button>
    );
}