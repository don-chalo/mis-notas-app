'use client'

import { useSearchParams } from "next/navigation"
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect } from "react";
import { debounceTimeout } from "@/lib/constants";
import useNote from "@/hooks/useNote";
import { updateNoteAction } from "@/actions/notes";

type NoteTextInputProps = {
    noteId: string,
    startingNoteText: string
}

let updateTimeout: NodeJS.Timeout

export default function NoteTextInput({ noteId, startingNoteText }: NoteTextInputProps) {
    const noteIdParam = useSearchParams().get("noteId") || "";
    const {noteText, setNoteText} = useNote();

    useEffect(
        () => {
            if (noteIdParam === noteId) {
                setNoteText(startingNoteText);
            }
        },
        [startingNoteText, noteIdParam, noteId, setNoteText]
    );

    const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setNoteText(text);
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(
            () => {
                updateNoteAction(noteId, text);
            },
            debounceTimeout
        );
    }
    return <Textarea
        className="custom-scrollbar mb-4 h-full max-w-4xl resize-none border p-4 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Escribe tu nota..."
        value={noteText}
        onChange={handleUpdateNote}
    />
}