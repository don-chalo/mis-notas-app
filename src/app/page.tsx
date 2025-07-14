import { getUser } from "@/auth/server";
import AskAIButton from "@/components/AskIAButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import { prisma } from "@/db/prisma";

type HomeProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const noteIdParam = params.noteId;
  const user = await getUser();
  const noteId = Array.isArray(noteIdParam) ? noteIdParam[0] : noteIdParam || "";
  const note = await prisma.note.findUnique({
    where:{
      authorId: user?.id,
      id: noteId
    }
  });
  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
          <AskAIButton user={user} />
          <NewNoteButton user={user} />
      </div>
      <NoteTextInput noteId={noteId} startingNoteText={note?.text || "" } />
    </div>
  );
}
