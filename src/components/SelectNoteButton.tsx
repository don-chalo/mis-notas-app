'use client'

import useNote from "@/hooks/useNote"
import { Note } from "@prisma/client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { SidebarMenuButton } from "./ui/sidebar"
import Link from "next/link"

type SelectNoteButtonProps = {
  note: Note
}

export default function SelectNoteButton({ note }: SelectNoteButtonProps) {
  const noteId = useSearchParams().get("noteId") || "";
  const { noteText: selectedNoteText } = useNote();
  const [shouldUseGlobalNoteText, setShouldUseGlobalNoteText] = useState(false);
  const [localNoteText, setLocalNoteText] = useState(note.text);

  useEffect(() => {
    setShouldUseGlobalNoteText(noteId === note.id);
  }, [noteId, note.id]);

  useEffect(() => {
    if (shouldUseGlobalNoteText) {
      setLocalNoteText(selectedNoteText);
    }
  }, [selectedNoteText, shouldUseGlobalNoteText]);

  const blankNoteText = "EMPTY NOTE";
  let noteText = localNoteText || blankNoteText;

  if (shouldUseGlobalNoteText) {
    noteText = selectedNoteText || blankNoteText;
  }

  return <SidebarMenuButton asChild className={`items-start gap-0 pr-12 ${note.id === noteId ? 'bg-sidebar-accent/50' : ''}`}>
    <Link href={`/?noteId=${note.id}`} className="flex h-fit flex-col">
      <p className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap">
        {noteText}
      </p>
      <p
       className="text-muted-foreground text-xs">
        {note.updatedAt.toDateString()}
      </p>
    </Link>
  </SidebarMenuButton>
}