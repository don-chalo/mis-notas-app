import { getUser } from "@/auth/server"
import SidebarGroupContent from "@/components/SidebarGroupContent";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel
  } from "@/components/ui/sidebar"
import { prisma } from "@/db/prisma";
import { Note } from "@prisma/client";
import Link from "next/link";
  
  export default async function AppSidebar() {
    const user = await getUser();
    let notes: Note[] = [];

    if (user) {
      notes = await prisma.note.findMany({
        where: {
          authorId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        }
      });
    }

    return (
      <Sidebar>
        <SidebarContent className="custom-scrollbar">
            <SidebarGroup>
                <SidebarGroupLabel>
                    { user ?
                        "Tus notas" :
                        <p>
                            <Link href="/login" className="underline">Inicia sesión</Link>{" "}
                            para ver tus notas
                        </p>
                    }
                </SidebarGroupLabel>
                {
                    user && <SidebarGroupContent notes={notes} />
                }
            </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }
  