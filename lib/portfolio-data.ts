export interface FeaturedProject {
  repo: string | null
  slug: string
  title: string
  tagline: string
  description: string
  challenges: string[]
  architecture: string
  tech: string[]
  category: 'Systems' | 'Graphics' | 'AI' | 'Full-Stack' | 'Robotics'
  metrics?: string
  liveUrl?: string
}

export const featuredProjects: FeaturedProject[] = [
  {
    repo: 'OSDev',
    slug: 'os-kernel',
    title: 'Operating System Kernel',
    tagline: 'A kernel written from scratch in C and x86 Assembly',
    description:
      'A from-scratch operating system: bootloader, protected-mode kernel, interrupt handling, memory management, and hardware drivers — over 1.2 MB of hand-written C running directly on bare metal.',
    challenges: [
      'Bootstrapping from real mode to protected mode with a custom bootloader',
      'Writing interrupt descriptor tables and hardware interrupt handlers',
      'Manual memory management with no standard library or runtime',
    ],
    architecture:
      'Layered kernel design: Assembly boot stage → C kernel core → driver layer, linked with custom linker scripts and built via a bare-metal Makefile toolchain.',
    tech: ['C', 'x86 Assembly', 'Linker Scripts', 'QEMU', 'Make'],
    category: 'Systems',
    metrics: '1.2 MB of kernel C, zero external dependencies',
  },
  {
    repo: 'pulse-app',
    slug: 'pulse-social-platform',
    title: 'Pulse — Social Platform',
    tagline: 'Cross-platform social app with a full backend',
    description:
      'A full social platform built with Flutter and a TypeScript + Python backend — feeds, profiles, and real-time interactions shipped across iOS, Android, and web from a single codebase.',
    challenges: [
      'Designing a scalable feed and interaction model',
      'Coordinating a polyglot stack: Dart client, TypeScript API, Python services',
      'Shipping to multiple platforms from one codebase',
    ],
    architecture:
      'Flutter client → TypeScript API layer → Python service workers, with platform channels for native iOS/Android integration.',
    tech: ['Dart', 'Flutter', 'TypeScript', 'Python', 'Kotlin', 'Swift'],
    category: 'Full-Stack',
    metrics: '2.5 MB Dart + 400 KB TypeScript across 12 languages',
  },
  {
    repo: 'Raytracing-GPU',
    slug: 'gpu-ray-tracer',
    title: 'GPU Ray Tracer',
    tagline: 'CUDA-accelerated physically-based rendering',
    description:
      'A physically-based ray tracer moved from CPU to GPU with CUDA kernels — parallelizing ray-scene intersection, materials, and sampling across thousands of GPU threads.',
    challenges: [
      'Restructuring recursive ray tracing into iterative GPU-friendly kernels',
      'Managing device memory and host–device transfer overhead',
      'Balancing thread divergence in material scattering code',
    ],
    architecture:
      'CUDA kernel pipeline: ray generation → BVH traversal → material scatter → accumulation buffer, orchestrated from a C++ host program.',
    tech: ['CUDA', 'C++', 'C', 'GPU Programming'],
    category: 'Graphics',
    metrics: 'Massively parallel path tracing on GPU threads',
  },
  {
    repo: 'Vulkan-Programming',
    slug: 'vulkan-rendering-engine',
    title: 'Vulkan Rendering Engine',
    tagline: 'Low-level graphics with explicit GPU control',
    description:
      'Real-time rendering built directly on the Vulkan API — explicit control over swapchains, pipelines, command buffers, and synchronization with no engine abstraction in between.',
    challenges: [
      'Managing Vulkan\u2019s explicit synchronization: fences, semaphores, barriers',
      'Building the full pipeline from instance creation to presentation',
      'Writing and binding SPIR-V shader stages by hand',
    ],
    architecture:
      'Explicit Vulkan pipeline: instance → device → swapchain → render pass → graphics pipeline → command submission, all managed manually in C++.',
    tech: ['C++', 'Vulkan', 'SPIR-V', 'GLSL'],
    category: 'Graphics',
  },
  {
    repo: 'RayCaster',
    slug: 'software-ray-caster',
    title: 'Software Ray Caster',
    tagline: 'Wolfenstein-style 3D projection in pure C',
    description:
      'A real-time raycasting renderer in pure C — DDA grid traversal, perspective projection, and texture mapping computed per-column with no graphics API assistance.',
    challenges: [
      'Implementing DDA raycasting math from first principles',
      'Correcting fisheye distortion in the perspective projection',
      'Optimizing per-frame column rendering for real-time speed',
    ],
    architecture:
      'Single-pass renderer: player state → per-column DDA ray march → wall height projection → framebuffer blit, every frame.',
    tech: ['C', 'Raycasting', 'Software Rendering'],
    category: 'Graphics',
  },
  {
    repo: 'Rust-Programming',
    slug: 'rust-systems-lab',
    title: 'Rust Systems Lab',
    tagline: 'Memory-safe systems programming experiments',
    description:
      'Over a million lines of Rust exploration: ownership, lifetimes, concurrency primitives, and LLVM-level behavior — systems programming with compile-time safety guarantees.',
    challenges: [
      'Modeling ownership and borrow semantics in complex data structures',
      'Fearless concurrency with threads, channels, and atomics',
      'Inspecting LLVM IR output to understand zero-cost abstractions',
    ],
    architecture:
      'Workspace of focused crates, each isolating one systems concept — from raw pointers and unsafe blocks to async runtimes.',
    tech: ['Rust', 'LLVM', 'Concurrency', 'Cargo'],
    category: 'Systems',
    metrics: '1M+ bytes of Rust source explored',
  },
]

export interface ExperienceItem {
  role: string
  org: string
  period: string
  summary: string
  highlights: string[]
  tags: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Chief Programmer',
    org: 'VEX Robotics Team',
    period: 'Competition seasons',
    summary:
      'Led all software for a competitive robotics team — autonomous routines, control systems, and driver-assist code under hard competition deadlines.',
    highlights: [
      'Designed autonomous routines with PID control and sensor fusion',
      'Built driver-control abstractions for fast iteration between matches',
      'Owned the full C++ codebase running on embedded microcontrollers',
    ],
    tags: ['C++', 'Embedded', 'Control Systems', 'PID'],
  },
  {
    role: 'Work Experience',
    org: 'BAE Systems',
    period: 'Engineering placement',
    summary:
      'Embedded with engineering teams at one of the world\u2019s largest defence and aerospace companies, seeing how safety-critical systems are specified, built, and verified.',
    highlights: [
      'Exposure to rigorous engineering process on safety-critical systems',
      'Observed systems-of-systems architecture at industrial scale',
    ],
    tags: ['Aerospace', 'Systems Engineering', 'Process'],
  },
  {
    role: 'Technology Placements',
    org: 'Industry placements',
    period: 'Ongoing',
    summary:
      'Hands-on placements across the technology sector, translating classroom fundamentals into production engineering context.',
    highlights: [
      'Worked alongside professional engineering teams',
      'Applied software fundamentals in commercial environments',
    ],
    tags: ['Software', 'Professional Practice'],
  },
  {
    role: 'Hardware Repair & Refurbishment',
    org: 'Independent',
    period: 'Erasmus+ placement',
    summary:
      'Diagnosed, repaired, and refurbished computer hardware — building the low-level hardware intuition that informs systems software work.',
    highlights: [
      'Component-level diagnosis and repair',
      'Deep familiarity with hardware architecture from the board up',
    ],
    tags: ['Hardware', 'Diagnostics', 'Electronics'],
  },
]

export interface SkillDomain {
  domain: string
  blurb: string
  skills: string[]
}

export const skillDomains: SkillDomain[] = [
  {
    domain: 'Systems Engineering',
    blurb: 'Bare metal to userspace',
    skills: ['C++', 'Rust', 'C', 'Operating Systems', 'Concurrency', 'Performance Optimisation'],
  },
  {
    domain: 'Full-Stack Development',
    blurb: 'Product-grade web engineering',
    skills: ['TypeScript', 'React', 'Next.js', 'PostgreSQL', 'Prisma', 'Node.js'],
  },
  {
    domain: 'Artificial Intelligence',
    blurb: 'Applied model engineering',
    skills: ['LLMs', 'Agent Systems', 'Vector Search', 'Inference Pipelines'],
  },
  {
    domain: 'Graphics & Simulation',
    blurb: 'Pixels from first principles',
    skills: ['Vulkan', 'CUDA', 'Rendering', 'GPU Programming', 'Game Engines'],
  },
  {
    domain: 'Robotics & Embedded',
    blurb: 'Software meeting hardware',
    skills: ['C++', 'Microcontrollers', 'Control Systems', 'Sensor Fusion'],
  },
  {
    domain: 'Infrastructure',
    blurb: 'Shipping and scaling',
    skills: ['Docker', 'CI/CD', 'Cloud', 'Distributed Systems', 'Linux'],
  },
]

export const principles = [
  {
    title: 'Build for scale',
    body: 'Every system is designed as if it will 100x. The architecture that survives growth is the one designed for it from commit one.',
  },
  {
    title: 'Understand systems deeply',
    body: 'From the bootloader to the browser — abstractions are tools, not excuses. Knowing what the machine actually does is a permanent advantage.',
  },
  {
    title: 'Optimise for leverage',
    body: 'The best engineering multiplies. One good tool, one sharp abstraction, one automated pipeline pays dividends on every future project.',
  },
  {
    title: 'Automate repetitive work',
    body: 'If it happens twice, it gets scripted. Human attention is the scarcest resource in any engineering system.',
  },
  {
    title: 'Favour elegant architecture',
    body: 'Complexity is a cost paid on every read. The elegant design is usually also the fast one, the safe one, and the maintainable one.',
  },
  {
    title: 'Measure performance',
    body: 'Intuition proposes; profilers dispose. Every optimisation claim is backed by a number, or it is a guess.',
  },
]

export const currentlyBuilding = [
  { name: 'Pulse', detail: 'Social platform — Flutter + TypeScript backend' },
  { name: 'OSDev', detail: 'From-scratch OS kernel in C and Assembly' },
  { name: 'AI developer tooling', detail: 'Impact analysis for large codebases' },
]

export const contactLinks = {
  github: 'https://github.com/Rohan-Jose-08',
  linkedin: 'https://www.linkedin.com/',
  email: 'mailto:hello@rohanjose.dev',
  resume: '/resume.pdf',
}
