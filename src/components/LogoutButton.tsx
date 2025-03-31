'use client';

import React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

export default function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const error = 0;
        if (!error) {
            toast.success(
                "¡Hasta pronto!",
                { description: "Has cerrado sesión con exito" }
            );
            router.push("/");
        } else {
            toast.error(
                "Error",
                {
                    description: error
                }
            );
        }
        setLoading(false);
    };

    return (
        <Button className="w-24"
            disabled={loading}
            variant="outline"
            onClick={handleLogout}>
            {
                loading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    "Log Out"
                )
            }
        </Button>
    );
}