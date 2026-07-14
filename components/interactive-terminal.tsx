'use client'

import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { FolderGit2, FileText, Terminal } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

type CommandResult = { type: 'system' | 'user' | 'error'; text: string; component?: React.ReactNode }

const FILE_SYSTEM = {
  'about.txt': 'Systems Programmer & AI Builder.\nWriting kernels, renderers, and scalable backends.',
  'contact.txt': 'Email: contact@example.com\nGitHub: Rohan-Jose-08\nLinkedIn: in/rohan-jose',
  'projects/': 'Directory: Contains project deep dives.',
}

export function InteractiveTerminal() {
  const [history, setHistory] = useState<CommandResult[]>([
    { type: 'system', text: 'rj-os v1.0.0 (tty1)' },
    { type: 'system', text: 'Type "help" for a list of available commands.' }
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    const args = trimmed.split(' ')
    const command = args[0].toLowerCase()
    
    let result: CommandResult | null = null

    switch (command) {
      case 'help':
        result = { 
          type: 'system', 
          text: 'Available commands:\n  ls       List directory contents\n  cat      Print file content\n  whoami   Print user information\n  clear    Clear terminal output\n  echo     Print text' 
        }
        break
      case 'ls':
        result = {
          type: 'system',
          component: (
            <div className="flex flex-wrap gap-4 text-sm mt-1 mb-2">
              <span className="text-primary flex items-center gap-1.5"><FolderGit2 className="h-4 w-4" /> projects/</span>
              <span className="text-foreground flex items-center gap-1.5"><FileText className="h-4 w-4" /> about.txt</span>
              <span className="text-foreground flex items-center gap-1.5"><FileText className="h-4 w-4" /> contact.txt</span>
            </div>
          ),
          text: ''
        }
        break
      case 'cat':
        if (!args[1]) {
          result = { type: 'error', text: 'cat: missing file operand' }
        } else if (FILE_SYSTEM[args[1] as keyof typeof FILE_SYSTEM]) {
          const content = FILE_SYSTEM[args[1] as keyof typeof FILE_SYSTEM]
          if (content.startsWith('Directory:')) {
             result = { type: 'error', text: `cat: ${args[1]}: Is a directory` }
          } else {
             result = { type: 'system', text: content }
          }
        } else {
          result = { type: 'error', text: `cat: ${args[1]}: No such file or directory` }
        }
        break
      case 'whoami':
        result = { type: 'system', text: 'guest' }
        break
      case 'clear':
        setHistory([])
        return
      case 'echo':
        result = { type: 'system', text: args.slice(1).join(' ') }
        break
      default:
        result = { type: 'error', text: `command not found: ${command}` }
    }

    setHistory(prev => [...prev, { type: 'user', text: trimmed }, result!])
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-[#0d0f17] font-mono text-sm shadow-2xl relative z-20 mx-auto mt-12"
    >
      <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-destructive/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-primary/80" />
        </div>
        <div className="ml-4 flex items-center gap-2 text-xs text-muted-foreground font-medium">
          <Terminal className="h-3.5 w-3.5" />
          <span>guest@rj-os: ~</span>
        </div>
      </div>
      
      <ScrollArea 
        className="h-[280px] p-5 cursor-text text-left" 
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-col gap-2.5">
          {history.map((item, i) => (
            <div key={i} className="whitespace-pre-wrap leading-relaxed">
              {item.type === 'user' ? (
                <div>
                  <span className="text-primary mr-2 font-semibold">guest@rj-os:~$</span>
                  <span className="text-foreground">{item.text}</span>
                </div>
              ) : item.type === 'error' ? (
                <span className="text-destructive">{item.text}</span>
              ) : (
                <div className="text-muted-foreground">
                  {item.text && <div>{item.text}</div>}
                  {item.component && item.component}
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center mt-1">
            <span className="text-primary mr-2 font-semibold shrink-0">guest@rj-os:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent text-foreground outline-none border-none caret-primary focus:ring-0 p-0 m-0"
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
    </motion.div>
  )
}
