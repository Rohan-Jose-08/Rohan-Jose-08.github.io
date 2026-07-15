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
      'A hobbyist i386 multiboot operating system with a monolithic C kernel, paging, interrupts, ATA and audio drivers, a graphics shell, custom libc, and a bundled userland packaged as a bootable ISO.',
    challenges: [
      'Coordinating paging, IRQs, device drivers, and user-mode transitions on i386',
      'Building a custom libc and GUI layer for bundled user applications',
      'Cross-compiling and packaging the workspace into GRUB boot media',
    ],
    architecture:
      'GRUB multiboot entry → monolithic i386 kernel and drivers → custom libc/libgui → embedded and disk-backed user applications, assembled through an i686-elf cross-toolchain.',
    tech: ['C', 'x86 Assembly', 'GRUB', 'QEMU', 'Make'],
    category: 'Systems',
    metrics: 'Kernel, custom libc, GUI library, and bundled userland',
  },
  {
    repo: 'pulse-app',
    slug: 'pulse-social-platform',
    title: 'Pulse — Social Platform',
    tagline: 'Cross-platform social app with a full backend',
    description:
      'A Flutter social application with TypeScript backend routes, Firebase services, real-time messaging, geohash-based discovery, and a separate Python recommendation service.',
    challenges: [
      'Keeping location-aware posts and map discovery consistent through geohashes',
      'Coordinating Flutter, TypeScript/Firebase, and a Python recommendation service',
      'Supporting messages, invitations, profiles, highlights, and activity flows',
    ],
    architecture:
      'Flutter client → TypeScript/Firebase backend and real-time layer → Python ML service, with shared product flows for posts, profiles, messaging, and location discovery.',
    tech: ['Dart', 'Flutter', 'TypeScript', 'Firebase', 'Python'],
    category: 'Full-Stack',
    metrics: 'Flutter client, API backend, and ML service',
  },
  {
    repo: 'Raytracing-GPU',
    slug: 'gpu-ray-tracer',
    title: 'GPU Ray Tracer',
    tagline: 'CUDA-accelerated physically-based rendering',
    description:
      'A compact CUDA ray tracer that assigns pixels to GPU threads and implements spheres, camera rays, materials, random sampling, and PPM image output in C++/CUDA.',
    challenges: [
      'Moving ray generation and colour sampling into CUDA device code',
      'Maintaining independent cuRAND state for parallel samples',
      'Representing camera, sphere, and material logic across host and device code',
    ],
    architecture:
      'C++ host setup → CUDA random-state and render kernels → device-side scene intersections and material scattering → PPM framebuffer output.',
    tech: ['CUDA', 'C++', 'cuRAND', 'PPM'],
    category: 'Graphics',
    metrics: 'Single-file CUDA render pipeline with reusable geometry headers',
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
    title: 'Rust Game Programming Lab',
    tagline: 'A collection of Rust game and engine experiments',
    description:
      'A repository of Rust experiments built around several game frameworks, including an Amethyst Pong implementation with systems for movement, collisions, scoring, and input.',
    challenges: [
      'Organising game behaviour into ECS-style systems',
      'Connecting input bindings, rendering, movement, and scoring',
      'Comparing project structures across Rust game frameworks',
    ],
    architecture:
      'Multiple self-contained Cargo projects, including an Amethyst application split into state setup, resources, entities, and focused gameplay systems.',
    tech: ['Rust', 'Cargo', 'Amethyst', 'ECS'],
    category: 'Systems',
    metrics: 'Multiple Cargo-based game experiments',
  },
  {
    repo: 'hospitaldatabase',
    slug: 'hospital-management-platform',
    title: 'Hospital Management Platform',
    tagline: 'Role-based healthcare workflows with secure patient access',
    description:
      'A deployed Next.js healthcare platform for patients, clinicians, and administrators — appointment booking, test results, two-factor authentication, reminders, and a relational PostgreSQL data model.',
    challenges: ['Separating patient, doctor, staff, and administrator workflows', 'Modeling appointments, clinical profiles, and test results in PostgreSQL', 'Adding password, authenticator, and SMS-based access controls'],
    architecture: 'Next.js App Router UI → route handlers and server actions → Prisma → PostgreSQL, with dedicated authentication, notification, and PDF-result flows.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT', '2FA'],
    category: 'Full-Stack',
    liveUrl: 'https://hospitaldatabase.vercel.app',
  },
  {
    repo: 'biology-website-1',
    slug: 'biology-challenge-site',
    title: 'Biology Challenge Website',
    tagline: 'An animated educational web experience',
    description:
      'A responsive Biology Challenge site built with Next.js, Tailwind, Radix UI, and Framer Motion, including an animated interactive identity, profile views, and theme-aware UI components.',
    challenges: ['Creating an interactive animated SVG identity', 'Keeping the UI accessible while layering motion and hover states', 'Organising reusable page and component structure in the App Router'],
    architecture: 'Next.js App Router pages → reusable UI primitives and theme provider → Framer Motion interactions and Tailwind presentation layer.',
    tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Framer Motion'],
    category: 'Full-Stack',
  },
  {
    repo: 'Drone-Main',
    slug: 'pico-drone-controller',
    title: 'Pico Drone Flight Controller',
    tagline: 'Embedded attitude control with IMU feedback and radio input',
    description:
      'Raspberry Pi Pico firmware that reads BNO055 orientation data, receives joystick commands over an NRF24L01 radio, and computes roll, pitch, and yaw PID outputs for a drone control loop.',
    challenges: ['Integrating IMU calibration and NDOF orientation readings', 'Tuning separate PID loops for roll, pitch, and yaw', 'Handling radio input and actuator output within a constrained embedded loop'],
    architecture: 'NRF24L01 joystick link + BNO055 IMU → Pico control loop → independent PID controllers → UART output for downstream motor control.',
    tech: ['C++', 'Raspberry Pi Pico', 'BNO055', 'NRF24L01', 'PID Control'],
    category: 'Robotics',
  },
  {
    repo: 'Mastermind',
    slug: 'networked-mastermind',
    title: 'Networked Mastermind',
    tagline: 'A multiplayer code-breaking game built in GameMaker',
    description:
      'An A Level Computer Science project that turns Mastermind into a polished client/server game with maker and breaker roles, turn validation, persistence, audiovisual feedback, and UDP state messages.',
    challenges: ['Encoding the Mastermind scoring rules into a clear turn state machine', 'Coordinating maker and breaker roles over UDP networking', 'Building save/load and feedback systems around the game loop'],
    architecture: 'GameMaker rooms and object controllers manage the board and validation; a MultiClient extension carries role and result messages between peers.',
    tech: ['GameMaker Language', 'UDP Networking', 'Game Design', 'State Machines'],
    category: 'Full-Stack',
  },
  {
    repo: 'testmod',
    slug: 'minecraft-mod-prototype',
    title: 'Minecraft Mod Prototype',
    tagline: 'A Forge-based Java modding experiment',
    description:
      'An early Java/Forge modding project that explores the Minecraft client and content pipeline, including custom model assets and a Gradle-based mod development environment.',
    challenges: ['Working within the Forge and Gradle toolchain', 'Connecting custom blockbench model assets to game content', 'Navigating a large, event-driven game API and build output'],
    architecture: 'Gradle/Forge project structure → Java mod entry points and registries → custom model assets → Minecraft runtime integration.',
    tech: ['Java', 'Minecraft Forge', 'Gradle', 'Blockbench'],
    category: 'Graphics',
  },
  {
    repo: 'quantfin',
    slug: 'quantitative-trading-stack',
    title: 'Quantitative Trading Stack',
    tagline: 'Governed research and paper execution without live-order risk',
    description:
      'A Python quantitative research and simulated-execution system with validated market data, look-ahead-resistant backtests, statistical models, portfolio allocation, risk limits, model governance, and an explicitly blocked live-trading path.',
    challenges: [
      'Preventing look-ahead through decision-dated signals and next-session execution',
      'Combining transaction costs, trial tracking, and walk-forward validation',
      'Enforcing capital limits and kill switches before simulated orders reach the broker',
    ],
    architecture:
      'Validated Yahoo data lake → research models and walk-forward backtests → portfolio and risk engines → order state machine and simulated broker → audit, reconciliation, and red-team reports.',
    tech: ['Python', 'NumPy', 'pandas', 'SciPy', 'pytest', 'mypy'],
    category: 'AI',
    metrics: '37 focused tests across data, models, execution, risk, and reporting',
  },
  {
    repo: 'legacymind',
    slug: 'legacymind-modernization',
    title: 'LegacyMind',
    tagline: 'COBOL modernization with signed equivalence evidence',
    description:
      'A verification-first COBOL 85 to Java 21 modernization platform with dual parsers, a shared intermediate representation, model-assisted candidate generation, four verification layers, signed certification reports, reproducible benchmarks, and a Next.js evidence dashboard.',
    challenges: [
      'Lowering legacy COBOL semantics into a stable, auditable intermediate representation',
      'Finding migration defects with property, differential, symbolic, and static analysis',
      'Turning verification evidence into reproducible, cryptographically signed certificates',
    ],
    architecture:
      'COBOL source → stub or ProLeap parser → shared IR → model-assisted Java candidates → compile and four-layer verification → Ed25519 certificate and evidence dashboard.',
    tech: ['TypeScript', 'Java', 'COBOL', 'Next.js', 'Docker', 'Ed25519'],
    category: 'AI',
    metrics: '7/7 benchmark modules certified; 97.1% parser acceptance on 759 files',
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
  linkedin: 'https://linkedin.com/in/rohan-jose-8a85b331a',
  email: 'mailto:rohanjose08@gmail.com',
  resume: '/resume.pdf',
}
