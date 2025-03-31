'use client'

import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

type AuthFormProps = {
    type: "login" | "signUp";
};

export default function AuthForm({ type }: AuthFormProps) {
    const router = useRouter();
    const isLoginForm = type === "login";
    const [isPending, startTransition] = useTransition();
    const handleSubmit = (formData: FormData) => {
        
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
                    <Label htmlFor="password">Password</Label>
                    <Input id="password"
                        name="password"
                        placeholder="password"
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
                        isLoginForm ? "login" : "Sign up"
                    }
                </Button>
                <p className="text-xs">
                    {
                        isLoginForm ? "¿Aún no tienes una cuenta?" : "¿Ya tienes una cuenta?"
                    }{" "}
                    <Link
                        href={isLoginForm ? "/sign-up" : "/login"}
                        className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-30" : ""}`}>
                        { isLoginForm ? "Sign up" : "Login" }
                    </Link>
                </p>
            </CardFooter>
        </form>
    );
}