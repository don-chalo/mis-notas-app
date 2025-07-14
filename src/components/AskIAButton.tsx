'use client'

import { User } from "@supabase/supabase-js"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { Fragment, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { askAIButtonNotesAction } from "@/actions/notes";
import { toast } from "sonner";
import '@/styles/ai-response.css';

type AskAIButtonProps = {
  user: User | null
}

export default function AskAIButton({ user }: AskAIButtonProps) {
  const router = useRouter();

  const [isPending, startTransition] =  useTransition();

  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push('/login');
    } else if (isOpen) {
      setQuestionText('');
      setQuestions([]);
      setResponses([]);
    }
    setOpen(isOpen);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const handleInput = () => {
    const textarea = textAreaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleClickInput = () => {
    textAreaRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!questionText.trim()) {
      return;
    }
    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions);
    setQuestionText('');
    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      const response = await askAIButtonNotesAction(newQuestions, responses);
      if (String === response.constructor) {
        setResponses((prev) => [...prev, response]);
        setTimeout(scrollToBottom, 100);
      } else if (typeof response === 'object' ) {
        toast.error(
          'Error',
          {
            description: response['errorMessage']
          }
        );
      }
    });
  };

  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return <Dialog open={open} onOpenChange={handleOnOpenChange}>
    <DialogTrigger asChild>
      <Button variant="secondary" className="cursor-pointer">Preguntar a IA</Button>
    </DialogTrigger>
    <DialogContent className="custom-scrollbar flex h-[85vh] max-w-4xl flex-col overflow-y-auto" ref={contentRef}>
      <DialogHeader>
        <DialogTitle>Pregunta a la IA acerca de tus notas</DialogTitle>
        <DialogDescription>
          Nuestra IA puede contestar acerca de todas tus notas
        </DialogDescription>
      </DialogHeader>
      <div className="mt-4 flex flex-col gap-8">
        {
          questions.map((question, index) => (
            <Fragment key={index}>
              <p className="bg-muted text-muted-foreground ml-auto max-w-[60%] rounded-md px-2 py-1 text-sm">
                {question}
              </p>
              {
                responses[index] &&
                  <p
                    className="bot-response text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: responses[index] }} />
              }
            </Fragment>
          ))
        }
        {
          isPending && <p className="animate-pulse text-sm">Pensando...</p>
        }
      </div>
      <div className="mt-auto flex cursor-text flex-col rounded-lg border p-4"
        onClick={handleClickInput}>
        <Textarea
          ref={textAreaRef}
          placeholder="Pregunta lo que sea acerca de tus notas..."
          className="resize-none rounded-none border-none bg-transparent p-0 shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          style={{
            minHeight: "0",
            lineHeight: "normal"
          }}
          rows={1}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <Button className="ml-auto size-8 rounded-full">
          <ArrowUpIcon className="text-background"></ArrowUpIcon>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
}
