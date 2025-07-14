'use client'

import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { loginAction, signUpAction } from "@/actions/users";

type AuthFormProps = {
    type: "login" | "signUp";
};

export default function AuthForm({ type }: AuthFormProps) {
    const router = useRouter();
    const isLoginForm = type === "login";
    const [isPending, startTransition] = useTransition();
    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;            

            let errorMsg;
            let title;
            let description;

            if (isLoginForm) {
                errorMsg = (await loginAction(email, password))?.errorMessage;
                title = "Sesión iniciada";
                description = "Has iniciado sesión con exito";
            } else {
                errorMsg = (await signUpAction(email, password))?.errorMessage;
                title = "Registrado";
                description = "Te has registrado con exito";
            }

            if (errorMsg) {
                toast.error("Error", { description: errorMsg });
            } else {
                toast.success(title, { description });
                router.replace("/");
            }
        });
    };
    return (
        <form action={handleSubmit}>
            <CardContent className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email"
                        name="email"
                        placeholder="Email"
                        type="email"
                        required
                        disabled={isPending} />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password"
                        name="password"
                        placeholder="Contraseña"
                        type="password"
                        required
                        disabled={isPending} />
                </div>
            </CardContent>
            <CardFooter className="mt-4 flex flex-col gap-6">
                <Button className="w-full">
                    {
                        isPending ?
                        <Loader2 className="animate-spin" /> :
                        isLoginForm ? "Iniciar sesión" : "Registrarse"
                    }
                </Button>
                <p className="text-xs">
                    {
                        isLoginForm ? "¿Aún no tienes una cuenta?" : "¿Ya tienes una cuenta?"
                    }{" "}
                    <Link
                        href={isLoginForm ? "/sign-up" : "/login"}
                        className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-30" : ""}`}>
                        { isLoginForm ? "Registrarse" : "Iniciar sesión" }
                    </Link>
                </p>
            </CardFooter>
        </form>
    );
}