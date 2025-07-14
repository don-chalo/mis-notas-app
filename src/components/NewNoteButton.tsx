'use client'

import { User } from "@supabase/supabase-js"
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { createNoteAction } from "@/actions/notes";

type NewNoteButtonProps = {
    user: User | null
}

export default function NewNoteButton({ user }: NewNoteButtonProps){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const handleClickNewButton = async () => {
        if (!user) {
            router.push("/login");
        } else {
            setLoading(true);
            const uuid = uuidv4();
            await createNoteAction(uuid);
            router.push(`/?noteId=${uuid}`);
            toast.success(
                "Nota creada con exito",
                {
                    description: "Has creado una nueva nota"
                }
            );
            setLoading(false);
        }
    };
    return (
        <Button className="w-24 cursor-pointer"
            disabled={loading}
            variant="secondary"
            onClick={handleClickNewButton}>
            {
                loading ? 
                    <Loader2 className="animate-spin" /> : "Nueva Nota"
            }
        </Button>
    );
}