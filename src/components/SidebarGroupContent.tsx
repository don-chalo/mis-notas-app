'use client'

import { SidebarGroupContent as SidebarGroupContentChadCN, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { Note } from "@prisma/client"
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import SelectNoteButton from './SelectNoteButton';
import DeleteNoteButton from './DeleteNoteButton';

type SidebarGroupContentProps = {
    notes: Note[]
};

export default function SidebarGroupContent({ notes }: SidebarGroupContentProps) {
    const [searchText, setSearchText] = useState('');
    const [localNotes, setLocalNotes] = useState(notes);
    useEffect(
        () => setLocalNotes(notes),
        [notes]
    );
    const fuse = useMemo(() => {
        return new Fuse(localNotes, {
            keys: ['text'],
            threshold: 0.4
        });
    }, [localNotes]);
    const filteredNotes = searchText ?
        fuse.search(searchText).map(result => result.item) :
        localNotes;
    
    const deleteNoteLocally = (noteId: string) => {
        setLocalNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    };
    return (
        <SidebarGroupContentChadCN>
            <div className='relative flex items-center'>
                <SearchIcon className="absolute left-2 size-2"></SearchIcon>
                <Input className="bg-muted pl-8"
                    placeholder="Buscar..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} />
            </div>
            <SidebarMenu className='mt-4'>
                {
                    filteredNotes.map((note) => (
                        <SidebarMenuItem key={note.id} className="group/item">
                            <SelectNoteButton note={note}></SelectNoteButton>
                            <DeleteNoteButton noteId={note.id} deleteNoteLocally={deleteNoteLocally}></DeleteNoteButton>
                        </SidebarMenuItem>) 
                    )
                }
            </SidebarMenu>
        </SidebarGroupContentChadCN>
    )
}