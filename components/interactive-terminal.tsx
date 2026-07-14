'use client'

import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderGit2, FileText, Terminal, Box } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

type CommandResult = { type: 'system' | 'user' | 'error'; text: string; component?: React.ReactNode }

const FILE_SYSTEM = {
  'about.txt': 'Systems Programmer & AI Builder.\nWriting kernels, renderers, and scalable backends.',
  'contact.txt': 'Email: contact@example.com\nGitHub: Rohan-Jose-08\nLinkedIn: in/rohan-jose',
  'projects/': 'Directory: Contains project deep dives.',
}

const PROJECTS_LIST = [
  'rj-os - Operating system kernel (C, Assembly)',
  'cuda-renderer - GPU Ray tracer (C++)',
  'portfolio - Interactive portfolio (Next.js, TS)',
  'neural-sim - AI training pipeline (Python)'
]

const ASCII_ART = `
  _____       _                 
 |  __ \\     | |                
 | |__) |___ | |__   __ _ _ __  
 |  _  // _ \\| '_ \\ / _\` | '_ \\ 
 | | \\ \\ (_) | | | | (_| | | | |
 |_|  \\_\\___/|_| |_|\\__,_|_| |_|
`

const ALL_COMMANDS = ['help', 'ls', 'cat', 'whoami', 'clear', 'echo', 'projects', 'theme', 'ascii']

export function InteractiveTerminal() {
  const [history, setHistory] = useState<CommandResult[]>([
    { type: 'system', text: 'rj-os v1.0.0 (tty1)' },
    { type: 'system', text: 'Type "help" for a list of available commands.' }
  ])
  const [input, setInput] = useState('')
  const [isCrt, setIsCrt] = useState(false)
  const [flicker, setFlicker] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const triggerFlicker = () => {
    if (!isCrt) return
    setFlicker(true)
    setTimeout(() => setFlicker(false), 100)
  }

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    triggerFlicker()

    const args = trimmed.split(' ')
    const command = args[0].toLowerCase()
    
    let result: CommandResult | null = null

    switch (command) {
      case 'help':
        result = { 
          type: 'system', 
          text: 'Available commands:\n  ls       List directory contents\n  cat      Print file content\n  whoami   Print user information\n  clear    Clear terminal output\n  projects List featured projects\n  theme    Toggle CRT effect\n  ascii    Print system art' 
        }
        break
      case 'ls':
        result = {
          type: 'system',
          component: (
            <motion.div 
              initial="hidden" 
              animate="show" 
              variants={{
                show: { transition: { staggerChildren: 0.1 } }
              }}
              className="flex flex-wrap gap-4 text-sm mt-1 mb-2"
            >
              <motion.span variants={{ hidden: { opacity: 0, y: 5 }, show: { opacity: 1, y: 0 } }} className="text-primary flex items-center gap-1.5"><FolderGit2 className="h-4 w-4" /> projects/</motion.span>
              <motion.span variants={{ hidden: { opacity: 0, y: 5 }, show: { opacity: 1, y: 0 } }} className="text-foreground flex items-center gap-1.5"><FileText className="h-4 w-4" /> about.txt</motion.span>
              <motion.span variants={{ hidden: { opacity: 0, y: 5 }, show: { opacity: 1, y: 0 } }} className="text-foreground flex items-center gap-1.5"><FileText className="h-4 w-4" /> contact.txt</motion.span>
            </motion.div>
          ),
          text: ''
        }
        break
      case 'projects':
        result = {
          type: 'system',
          component: (
            <motion.div 
              initial="hidden" 
              animate="show" 
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
              className="flex flex-col gap-1 mt-1 mb-2"
            >
              {PROJECTS_LIST.map((p, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, x: -5 }, show: { opacity: 1, x: 0 } }} className="text-foreground flex items-center gap-2">
                  <Box className="h-3 w-3 text-primary" /> {p}
                </motion.span>
              ))}
            </motion.div>
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
      case 'theme':
        setIsCrt(!isCrt)
        result = { type: 'system', text: `CRT mode ${!isCrt ? 'enabled' : 'disabled'}.` }
        break
      case 'ascii':
        result = { type: 'system', text: ASCII_ART }
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
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const args = input.trim().split(' ')
      if (args.length === 1) {
        // Autocomplete command
        const matches = ALL_COMMANDS.filter(cmd => cmd.startsWith(args[0].toLowerCase()))
        if (matches.length === 1) {
          setInput(matches[0] + ' ')
        }
      } else if (args.length === 2 && args[0].toLowerCase() === 'cat') {
        // Autocomplete files
        const files = Object.keys(FILE_SYSTEM)
        const matches = files.filter(f => f.startsWith(args[1].toLowerCase()))
        if (matches.length === 1) {
          setInput(`${args[0]} ${matches[0]}`)
        }
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-[#0d0f17] font-mono text-sm shadow-2xl relative z-20 mx-auto mt-12 transition-all duration-75 ${isCrt ? 'shadow-[0_0_30px_rgba(167,139,250,0.15)] ring-1 ring-primary/20' : ''}`}
    >
      <AnimatePresence>
        {flicker && (
          <motion.div 
            initial={{ opacity: 0.4 }} 
            animate={{ opacity: 0 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none" 
          />
        )}
      </AnimatePresence>

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
        className={`h-[280px] p-5 cursor-text text-left relative ${isCrt ? '[text-shadow:0_0_4px_rgba(167,139,250,0.6)]' : ''}`} 
        onClick={() => inputRef.current?.focus()}
      >
        {isCrt && (
          <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden rounded-b-xl opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
          </div>
        )}
        <div className="flex flex-col gap-2.5">
          {history.map((item, i) => (
            <motion.div 
              key={i} 
              initial={item.type === 'system' ? { opacity: 0, x: -4 } : false}
              animate={item.type === 'system' ? { opacity: 1, x: 0 } : false}
              className="whitespace-pre-wrap leading-relaxed"
            >
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
            </motion.div>
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
