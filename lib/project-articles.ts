export interface ArticleSection {
  heading: string
  paragraphs: string[]
  code?: { language: string; label: string; snippet: string }
  bullets?: string[]
}

export interface ProjectArticle {
  slug: string
  readingTime: string
  intro: string
  sections: ArticleSection[]
  lessons: string[]
  future: string[]
}

export const projectArticles: Record<string, ProjectArticle> = {
  'os-kernel': {
    slug: 'os-kernel',
    readingTime: '9 min read',
    intro:
      'Most programmers spend their careers standing on top of an operating system without ever looking underneath it. This project removes the floor entirely: a kernel written from scratch in C and x86 Assembly, booting on bare metal with no Linux, no libc, and no runtime — just the CPU, the firmware handoff, and 1.2 MB of hand-written systems code.',
    sections: [
      {
        heading: 'Why build an OS from scratch',
        paragraphs: [
          'Every abstraction a modern developer relies on — processes, virtual memory, file descriptors, even the humble printf — is a service provided by a kernel. The goal of this project was to earn those abstractions rather than inherit them: to understand exactly what happens between the moment power is applied and the moment a program runs.',
          'The project deliberately avoids existing kernels, bootloader frameworks, and standard libraries. Every byte that executes was either written by hand or emitted by a toolchain configured from scratch with custom linker scripts.',
        ],
      },
      {
        heading: 'Stage one: the bootloader',
        paragraphs: [
          'An x86 machine wakes up in 16-bit real mode, pretending it is 1978. The BIOS loads exactly 512 bytes — the boot sector — and jumps to it. Those 512 bytes have to do a remarkable amount of work: load the rest of the kernel from disk, enable the A20 line to unlock memory above 1 MB, install a Global Descriptor Table, and flip the CPU into 32-bit protected mode.',
          'The trickiest part is that the transition is one-way and unforgiving. A single wrong bit in a GDT descriptor triple-faults the CPU and silently reboots the machine — there is no debugger, no stack trace, no error message. Development iterated through QEMU with GDB attached to the emulated CPU, single-stepping through the mode switch instruction by instruction.',
        ],
        code: {
          language: 'asm',
          label: 'boot/switch_pm.asm — the point of no return',
          snippet: `switch_to_pm:
    cli                     ; interrupts off until IDT exists
    lgdt [gdt_descriptor]   ; load the GDT
    mov eax, cr0
    or  eax, 0x1            ; set PE bit
    mov cr0, eax
    jmp CODE_SEG:init_pm    ; far jump flushes the pipeline

[bits 32]
init_pm:
    mov ax, DATA_SEG        ; reload every segment register
    mov ds, ax
    mov ss, ax
    mov ebp, 0x90000        ; fresh stack in high memory
    mov esp, ebp
    call BEGIN_PM`,
        },
      },
      {
        heading: 'Interrupts: teaching the CPU to listen',
        paragraphs: [
          'A kernel without interrupts is a program that cannot hear. The Interrupt Descriptor Table maps all 256 interrupt vectors to handlers — the first 32 are CPU exceptions (divide-by-zero, page fault, general protection fault), and the rest are available for hardware IRQs and software interrupts.',
          'Hardware interrupts arrive through the 8259 Programmable Interrupt Controller, which powers on with mappings that collide with CPU exceptions. Remapping the PIC so IRQ 0 lands at vector 32 instead of vector 8 is a rite of passage: get it wrong and every timer tick looks like a double fault.',
          'With the IDT and PIC in place, the kernel gained a programmable timer for scheduling ticks and a keyboard driver that translates scancodes into characters — the first moment the OS could actually be interacted with.',
        ],
      },
      {
        heading: 'Memory management without a safety net',
        paragraphs: [
          'There is no malloc on bare metal until you write one. The kernel implements its own physical memory manager: it parses the memory map handed over at boot, marks reserved regions, and hands out page-aligned frames from a free list.',
          'On top of that sits a simple heap allocator for kernel data structures. Writing an allocator while simultaneously being the only user of that allocator teaches a brutal lesson in bootstrapping: the allocator\u2019s own bookkeeping must be placed in memory that was reserved before the allocator existed.',
        ],
        code: {
          language: 'c',
          label: 'kernel/mem.c — page-aligned kernel allocation',
          snippet: `uint32_t kmalloc_internal(uint32_t size, int align, uint32_t *phys) {
    if (align && (free_mem_addr & 0xFFF)) {
        /* Round up to the next 4 KB page boundary */
        free_mem_addr = (free_mem_addr & 0xFFFFF000) + 0x1000;
    }
    if (phys) *phys = free_mem_addr;
    uint32_t ret = free_mem_addr;
    free_mem_addr += size;
    return ret;
}`,
        },
      },
      {
        heading: 'The build system is part of the kernel',
        paragraphs: [
          'A freestanding kernel cannot be linked like a normal program. The Makefile drives a cross-compilation pipeline: NASM assembles the boot code, GCC compiles C with -ffreestanding and no standard includes, and a custom linker script places the kernel at exactly the physical address the bootloader loads it to.',
          'The linker script is where many OS projects quietly die. If the entry point is not at the expected offset, or if the sections are ordered so that early boot code references data that has not been loaded yet, the machine simply resets. Making the memory layout explicit and deterministic was as important as any line of C.',
        ],
      },
    ],
    lessons: [
      'Debugging without an OS means building observability first — serial port logging was written before almost anything else',
      'The x86 architecture is an archaeology dig: every layer of backwards compatibility must be understood to be escaped',
      'Toolchains are not magic — linker scripts, object formats, and calling conventions are all negotiable once you own the whole stack',
      'Triple faults are a feature: the CPU resetting on unrecoverable errors forces genuinely defensive design',
    ],
    future: [
      'Virtual memory with full paging and per-process address spaces',
      'A pre-emptive scheduler driven by the PIT timer',
      'A minimal filesystem and userspace ELF loader',
    ],
  },

  'pulse-social-platform': {
    slug: 'pulse-social-platform',
    readingTime: '8 min read',
    intro:
      'Pulse is a full social platform — feeds, profiles, posting, and real-time interactions — built as a single product across iOS, Android, and web. The interesting engineering is not any one feature but the coordination problem: a Flutter client, a TypeScript API, and Python services all evolving together without breaking each other.',
    sections: [
      {
        heading: 'One codebase, every platform',
        paragraphs: [
          'The client is Flutter, chosen deliberately over separate native apps. A social product lives or dies on iteration speed — the ability to redesign the feed, tweak an interaction, and ship it everywhere the same day. Flutter\u2019s widget model makes the entire UI a pure function of state, which means features are built once and behave identically across 2.5 MB of Dart.',
          'Where the platforms genuinely diverge — push notifications, deep links, media pickers — thin Kotlin and Swift platform channels bridge to native APIs. The rule: native code handles capability, Dart handles behavior. No business logic ever lives in the platform layer.',
        ],
      },
      {
        heading: 'Designing the feed',
        paragraphs: [
          'A feed looks trivial and is not. The naive approach — query every followed user\u2019s posts and sort at read time — collapses as the social graph grows, because read cost scales with follow count on every single refresh.',
          'Pulse uses a fan-out-on-write model for regular accounts: when a user posts, the post ID is pushed into each follower\u2019s precomputed timeline. Reads become a cheap, indexed lookup. High-follower accounts flip to fan-out-on-read to avoid write amplification, and the two strategies merge at query time.',
          'Pagination is cursor-based rather than offset-based. Offsets break the moment new posts arrive mid-scroll; an opaque cursor anchored to a post ID and timestamp keeps the feed stable no matter how fast content is flowing in.',
        ],
        code: {
          language: 'typescript',
          label: 'api/feed.ts — cursor-based timeline pagination',
          snippet: `export async function getTimeline(userId: string, cursor?: string) {
  const anchor = cursor ? decodeCursor(cursor) : null

  const entries = await db.timeline.findMany({
    where: {
      ownerId: userId,
      ...(anchor && { createdAt: { lt: anchor.createdAt } }),
    },
    orderBy: { createdAt: 'desc' },
    take: PAGE_SIZE + 1, // fetch one extra to detect the next page
    include: { post: { include: { author: true, stats: true } } },
  })

  const hasMore = entries.length > PAGE_SIZE
  const page = hasMore ? entries.slice(0, PAGE_SIZE) : entries
  return {
    posts: page.map((e) => e.post),
    nextCursor: hasMore ? encodeCursor(page[page.length - 1]) : null,
  }
}`,
        },
      },
      {
        heading: 'A polyglot backend, on purpose',
        paragraphs: [
          'The API layer is TypeScript — request validation, auth, and the data contracts the client depends on. Python workers handle the asynchronous heavy lifting: media processing, feed fan-out jobs, and notification dispatch. The two halves communicate through a job queue, never directly.',
          'This split forces a discipline that ended up being the project\u2019s biggest architectural win: every boundary is a serialized, versioned message. The Flutter client, the TypeScript API, and the Python workers can each be rewritten independently as long as the contracts hold.',
        ],
      },
      {
        heading: 'Real-time without meltdown',
        paragraphs: [
          'Likes, replies, and presence flow over WebSockets, but the system is designed so that real-time is an enhancement, not a dependency. Every real-time update has a pull-based fallback; if the socket drops, the client reconciles state on reconnect by re-fetching anything newer than its last known cursor.',
          'Optimistic UI makes interactions feel instant: a like is rendered immediately, tagged with a client-generated ID, and reconciled when the server acknowledges. Rollback on failure is rare but handled — the UI subtracts the phantom like rather than lying to the user.',
        ],
      },
    ],
    lessons: [
      'Contracts between services matter more than the services themselves — versioned schemas prevented every cross-language integration fire',
      'Fan-out strategy is the defining scalability decision of any social product, and it must be chosen before the first post is written',
      'Optimistic UI with reconciliation delivers perceived speed that no backend optimization can match',
      'Flutter platform channels should carry capability, never logic',
    ],
    future: [
      'End-to-end encrypted direct messages',
      'A ranking model layered on top of the chronological feed',
      'Self-serve moderation tooling backed by the Python worker fleet',
    ],
  },

  'gpu-ray-tracer': {
    slug: 'gpu-ray-tracer',
    readingTime: '9 min read',
    intro:
      'A physically-based path tracer produces beautiful images and burns absurd amounts of compute doing it — every pixel needs hundreds of rays, and every ray needs intersection tests, material scattering, and recursive bounces. This project takes a CPU path tracer and rebuilds it as CUDA kernels, turning an hours-long render into seconds by spreading the work across thousands of GPU threads.',
    sections: [
      {
        heading: 'The problem with recursion on a GPU',
        paragraphs: [
          'The textbook path tracer is elegantly recursive: a ray hits a surface, the material scatters it, and the function calls itself with the new ray until the ray escapes or runs out of bounces. GPUs hate this. Deep recursion per thread blows out stack memory, and divergent call depths across a warp serialize execution.',
          'The core restructuring was converting recursion into iteration: each thread carries an accumulated attenuation color and loops over bounces, multiplying attenuation at each hit. The math is identical — the memory behavior is completely different.',
        ],
        code: {
          language: 'cuda',
          label: 'render.cu — iterative bounce loop replacing recursion',
          snippet: `__device__ vec3 ray_color(ray r, hittable **world, curandState *rs) {
    vec3 attenuation(1.0f, 1.0f, 1.0f);
    for (int depth = 0; depth < MAX_BOUNCES; depth++) {
        hit_record rec;
        if ((*world)->hit(r, 0.001f, FLT_MAX, rec)) {
            ray scattered;
            vec3 albedo;
            if (rec.mat->scatter(r, rec, albedo, scattered, rs)) {
                attenuation = attenuation * albedo;
                r = scattered;          // continue the loop, not the stack
            } else {
                return vec3(0, 0, 0);   // absorbed
            }
        } else {
            return attenuation * sky_color(r);
        }
    }
    return vec3(0, 0, 0);               // bounce budget exhausted
}`,
        },
      },
      {
        heading: 'Randomness at 100,000 threads',
        paragraphs: [
          'Path tracing is Monte Carlo integration — it needs high-quality random numbers for every scatter decision, and it needs them independently in every thread. Sharing a random state would serialize threads; correlated sequences would produce visible artifacts in the render.',
          'The solution is cuRAND with one state per pixel, seeded by pixel index in a dedicated initialization kernel. It costs a few megabytes of device memory and buys perfectly independent sampling across the entire frame.',
        ],
      },
      {
        heading: 'Memory is the real bottleneck',
        paragraphs: [
          'The naive port ran barely faster than the CPU. The reason was memory access, not arithmetic: scene data scattered across global memory meant every intersection test paid hundreds of cycles of latency.',
          'Three changes recovered the performance. Scene primitives were packed into contiguous arrays so warp accesses coalesce. The framebuffer became a single accumulation buffer written once per sample rather than read-modify-written per bounce. And host-device transfers were eliminated from the render loop entirely — the image only crosses the PCIe bus once, when it is finished.',
        ],
      },
      {
        heading: 'Wrestling with divergence',
        paragraphs: [
          'GPU threads execute in warps of 32, and when threads in a warp take different branches, both paths execute serially. A path tracer is a divergence machine: within one warp, some rays hit metal, some hit glass, some hit nothing at all.',
          'Divergence cannot be eliminated, but it can be contained. Material scatter functions were flattened into a single dispatch with minimal per-material branching, and early-terminating rays exit the loop cheaply rather than idling through remaining bounces. Profiling with Nsight showed warp efficiency climbing from roughly 40% to over 70% after the restructuring.',
        ],
      },
    ],
    lessons: [
      'GPU performance is memory layout first, algorithm second — coalesced access patterns beat clever math',
      'Recursion is a CPU luxury; iterative formulations of the same algorithm are the price of massive parallelism',
      'Per-thread random state is non-negotiable for Monte Carlo methods on GPUs',
      'Profilers like Nsight are the only honest source of truth about warp divergence and occupancy',
    ],
    future: [
      'A GPU-friendly BVH with stackless traversal for large scene support',
      'Wavefront path tracing to sort rays by material and crush divergence',
      'Progressive rendering with live viewport preview',
    ],
  },

  'vulkan-rendering-engine': {
    slug: 'vulkan-rendering-engine',
    readingTime: '8 min read',
    intro:
      'Vulkan is what graphics looks like when the driver stops doing you favors. Where OpenGL hides the GPU behind a stateful context, Vulkan hands over every detail — memory, synchronization, pipeline state, presentation — and makes you responsible for all of it. This project builds a real-time rendering engine directly on that API, with roughly a thousand lines of deliberate setup standing between an empty window and the first triangle.',
    sections: [
      {
        heading: 'The thousand-line triangle',
        paragraphs: [
          'The famous Vulkan initiation ritual is real: instance creation, validation layers, physical device selection, logical device and queue creation, surface and swapchain setup, image views, render passes, framebuffers, pipeline layout, shader stages, command pools, command buffers, and synchronization primitives — all before one triangle appears.',
          'The engine treats this not as boilerplate to rush through but as an architecture to own. Each concern lives in its own subsystem with explicit lifetime management, because in Vulkan every object you create, you must destroy — in the correct order, after the GPU is provably done with it.',
        ],
      },
      {
        heading: 'Explicit synchronization, or: the GPU is a remote server',
        paragraphs: [
          'The hardest mental shift in Vulkan is that the CPU and GPU are asynchronous machines that share nothing by default. Recording a command buffer does nothing; submitting it starts work that finishes at some unknowable future time. Every dependency must be declared: semaphores order work on the GPU timeline, fences let the CPU wait on the GPU, and pipeline barriers order memory access within the GPU itself.',
          'The engine implements the canonical frames-in-flight pattern — multiple frames of command buffers and sync objects rotating so the CPU can record frame N+1 while the GPU draws frame N. Getting this wrong does not always crash; sometimes it just flickers once a minute, which is far worse to debug.',
        ],
        code: {
          language: 'cpp',
          label: 'renderer.cpp — one frame with explicit sync',
          snippet: `void Renderer::drawFrame() {
    // Wait until this frame slot's previous work is done
    vkWaitForFences(device, 1, &inFlight[frame], VK_TRUE, UINT64_MAX);
    vkResetFences(device, 1, &inFlight[frame]);

    uint32_t imageIndex;
    vkAcquireNextImageKHR(device, swapchain, UINT64_MAX,
                          imageAvailable[frame], VK_NULL_HANDLE, &imageIndex);

    recordCommands(commandBuffers[frame], imageIndex);

    VkSubmitInfo submit{VK_STRUCTURE_TYPE_SUBMIT_INFO};
    VkPipelineStageFlags waitStage =
        VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT;
    submit.waitSemaphoreCount   = 1;
    submit.pWaitSemaphores      = &imageAvailable[frame];
    submit.pWaitDstStageMask    = &waitStage;
    submit.signalSemaphoreCount = 1;
    submit.pSignalSemaphores    = &renderFinished[frame];

    vkQueueSubmit(graphicsQueue, 1, &submit, inFlight[frame]);
    present(imageIndex, renderFinished[frame]);
    frame = (frame + 1) % MAX_FRAMES_IN_FLIGHT;
}`,
        },
      },
      {
        heading: 'Shaders as compiled artifacts',
        paragraphs: [
          'Vulkan consumes SPIR-V bytecode, not shader source. GLSL shaders are compiled offline with glslc as part of the build, which moves shader errors from mysterious runtime failures to ordinary compile-time errors — one of Vulkan\u2019s quiet quality-of-life wins.',
          'Pipeline state is baked ahead of time too: blend modes, depth testing, vertex layouts, and shader stages are fixed into immutable pipeline objects. The draw loop does no state validation at all, which is precisely where Vulkan\u2019s performance headroom comes from.',
        ],
      },
      {
        heading: 'Surviving the swapchain',
        paragraphs: [
          'The swapchain — the queue of images presented to the screen — can be invalidated at any moment by a window resize or a display change. The engine handles VK_ERROR_OUT_OF_DATE_KHR by tearing down and rebuilding the swapchain and everything derived from it: image views, framebuffers, and any pipeline state tied to the surface format.',
          'Validation layers were indispensable throughout. Vulkan without validation layers fails silently or corrupts memory; with them, every misuse is reported with the object handle and the exact spec rule violated. They stay on in every debug build, no exceptions.',
        ],
      },
    ],
    lessons: [
      'Vulkan\u2019s verbosity is a specification of GPU reality — learning it means learning how graphics hardware actually works',
      'Synchronization bugs are timing-dependent and invisible; design the sync architecture before writing draw code',
      'Ahead-of-time pipeline compilation trades startup cost for a draw loop with zero driver guesswork',
      'Validation layers are not optional tooling, they are half the API',
    ],
    future: [
      'A render graph to derive barriers and passes automatically',
      'Deferred shading with multiple render targets',
      'Compute shader integration for GPU-driven culling',
    ],
  },

  'software-ray-caster': {
    slug: 'software-ray-caster',
    readingTime: '7 min read',
    intro:
      'Before GPUs, before Z-buffers, before 3D hardware of any kind, Wolfenstein 3D rendered corridors at speed on a 286 with one trick: raycasting. This project rebuilds that trick from first principles in pure C — a real-time 3D view computed column by column with nothing but arithmetic, a 2D grid, and a framebuffer.',
    sections: [
      {
        heading: 'One ray per screen column',
        paragraphs: [
          'The core insight of raycasting is dimensional reduction. A true ray tracer fires a ray per pixel; a raycaster fires one ray per screen column — 320 rays instead of 64,000 — because in a world of vertical walls on a flat floor, everything in a column is determined by a single wall hit.',
          'Each frame walks the screen left to right: compute the ray direction for this column from the player\u2019s facing direction and field of view, march the ray through the map grid until it hits a wall, then use the hit distance to decide how tall the wall should appear. Near walls are tall, far walls are short. That is the whole illusion.',
        ],
      },
      {
        heading: 'DDA: marching a grid perfectly',
        paragraphs: [
          'The naive way to march a ray is to step it forward in small increments and check for walls — slow, and it can tunnel straight through corners. The Digital Differential Analyzer algorithm is exact: since the map is a grid, the ray can jump directly from one grid-line crossing to the next, checking exactly the cells it passes through and never missing one.',
          'DDA maintains two running distances — to the next vertical grid line and the next horizontal one — and always steps whichever is nearer. Each step is two comparisons and an addition. Wall hits are found in a handful of iterations, making the frame cost predictable regardless of ray direction.',
        ],
        code: {
          language: 'c',
          label: 'raycast.c — the DDA marching loop',
          snippet: `while (!hit) {
    if (side_dist_x < side_dist_y) {
        side_dist_x += delta_dist_x;   /* jump to next vertical line */
        map_x += step_x;
        side = 0;
    } else {
        side_dist_y += delta_dist_y;   /* jump to next horizontal line */
        map_y += step_y;
        side = 1;
    }
    if (world_map[map_x][map_y] > 0) hit = 1;
}
/* Perpendicular distance avoids fisheye distortion */
double perp_dist = (side == 0)
    ? side_dist_x - delta_dist_x
    : side_dist_y - delta_dist_y;
int line_height = (int)(SCREEN_H / perp_dist);`,
        },
      },
      {
        heading: 'The fisheye problem',
        paragraphs: [
          'The first working build had a bug that is a rite of passage for every raycaster: walls bulged outward like the world was seen through a peephole. The cause is using true Euclidean ray distance for wall height — rays at the edge of the field of view travel farther to reach the same wall plane, so edge columns render shorter.',
          'The fix is projecting the hit distance onto the camera\u2019s viewing direction — the perpendicular distance to the camera plane rather than the distance along the ray. One line of math, and the corridors snap straight. It is a perfect miniature of graphics programming: the bug is geometric, and so is the fix.',
        ],
      },
      {
        heading: 'Texturing on a budget',
        paragraphs: [
          'Flat-shaded walls prove the math works; textures make it a world. The exact point where the ray strikes the wall determines which column of the texture to sample, and the wall\u2019s on-screen height determines the vertical stride through that texture column.',
          'The inner loop — sample texel, write pixel, step — runs for every visible pixel every frame, entirely on the CPU. Keeping it real-time meant fixed-point-friendly arithmetic, hoisting every invariant out of the loop, and treating the framebuffer as a flat array written in strict column order for cache friendliness. Distance-based shading, darkening far walls and side-facing walls, adds depth perception for a single multiply per column.',
        ],
      },
    ],
    lessons: [
      'Constraints are the engine: restricting the world to a 2D grid is what makes real-time 3D possible without hardware',
      'Geometric bugs need geometric reasoning — the fisheye fix cannot be found by staring at code, only by drawing the diagram',
      'Per-pixel inner loops make CPU cost visceral in a way no profiler can teach',
      'Every modern GPU concept — projection, sampling, shading — exists here in miniature, implementable by hand',
    ],
    future: [
      'Floor and ceiling casting with per-pixel horizontal texture mapping',
      'Sprite rendering with depth-sorted billboards',
      'Doors, thin walls, and variable-height sectors, Doom-style',
    ],
  },

  'rust-systems-lab': {
    slug: 'rust-systems-lab',
    readingTime: '8 min read',
    intro:
      'Rust makes a claim that sounds too good to be true: memory safety and data-race freedom, verified at compile time, with zero runtime cost. This project is a sustained investigation of that claim — over a million bytes of Rust across a workspace of focused crates, each isolating one systems concept, from ownership mechanics down to the LLVM IR the compiler actually emits.',
    sections: [
      {
        heading: 'A laboratory, not a tutorial',
        paragraphs: [
          'The repository is structured as a Cargo workspace where each crate is an experiment with a question. What does a self-referential struct actually require? When does an Arc<Mutex<T>> beat a channel? What assembly does an iterator chain compile to? Each crate is small enough to reason about completely and pointed enough to answer its question definitively.',
          'This structure mirrors how systems knowledge is actually built: not by reading about concepts but by constructing minimal cases where the concept is the only thing happening.',
        ],
      },
      {
        heading: 'Ownership as a design language',
        paragraphs: [
          'The borrow checker\u2019s rules fit on an index card — one mutable reference or any number of shared ones, and no reference outlives its data. Living with those rules in complex data structures is where the real learning happens. Doubly-linked lists, graphs, and arena allocators all force explicit decisions that C lets you defer until the segfault.',
          'The recurring insight: when the borrow checker fights back, it is usually objecting to the design, not the syntax. Restructuring ownership — indices instead of pointers, arenas instead of individual allocations, message passing instead of sharing — almost always produced designs that were also better C++ designs. The compiler was functioning as an architecture reviewer.',
        ],
        code: {
          language: 'rust',
          label: 'concurrency/src/workers.rs — fearless concurrency in practice',
          snippet: `fn parallel_sum(data: Vec<u64>, workers: usize) -> u64 {
    let data = Arc::new(data);
    let chunk = data.len().div_ceil(workers);

    let handles: Vec<_> = (0..workers)
        .map(|i| {
            let data = Arc::clone(&data);
            thread::spawn(move || {
                let start = i * chunk;
                let end = (start + chunk).min(data.len());
                data[start..end].iter().sum::<u64>()
            })
        })
        .collect();

    // If this compiles, there is no data race. Not "probably" — provably.
    handles.into_iter().map(|h| h.join().unwrap()).sum()
}`,
        },
      },
      {
        heading: 'Concurrency without fear, verified',
        paragraphs: [
          'The concurrency crates put Rust\u2019s marquee claim under load: threads sharing state through Arc and Mutex, channels moving ownership across thread boundaries, and atomics with explicit memory orderings. The Send and Sync marker traits turn data-race prevention into a type-checking problem — code that would race simply does not compile.',
          'The atomics experiments went deepest: comparing Relaxed, Acquire/Release, and SeqCst orderings and observing where the compiler and CPU are permitted to reorder operations. Rust did not remove the difficulty of memory ordering, but it fenced it into a small, explicitly-marked corner of the codebase.',
        ],
      },
      {
        heading: 'Trust, but read the IR',
        paragraphs: [
          '"Zero-cost abstraction" is a claim that can be checked. Several crates exist purely to emit LLVM IR and assembly — comparing an idiomatic iterator chain against a hand-written index loop, checking whether bounds checks survive optimization, watching a generic function monomorphize into specialized machine code.',
          'The results largely vindicate the claim: iterator pipelines compile to the same vectorized loops as manual C-style code, and abstraction layers dissolve completely under optimization. Finding the exceptions — where a stray bounds check or a missed inline survives — taught more about the compiler than any documentation could.',
        ],
      },
      {
        heading: 'Unsafe as a scalpel',
        paragraphs: [
          'The unsafe crates explore the boundary layer: raw pointers, manual memory layout, FFI declarations, and hand-built abstractions like a miniature Vec. The discipline that emerged is the one the standard library itself uses — unsafe blocks kept minimal, wrapped in safe APIs whose invariants are documented and enforced at the boundary.',
          'Writing unsafe Rust after safe Rust is clarifying in both directions: it reveals exactly which guarantees the safe language was providing, and it shows that those guarantees have a precise, local, auditable cost when you need to step outside them.',
        ],
      },
    ],
    lessons: [
      'The borrow checker is an architecture reviewer — designs it accepts are usually better designs in any language',
      'Send and Sync convert data races from runtime bugs into type errors, and that changes how ambitiously you write concurrent code',
      'Zero-cost abstraction is measurable: read the LLVM IR instead of taking the slogan on faith',
      'Unsafe Rust is best understood as a contract system — small blocks, documented invariants, safe wrappers',
    ],
    future: [
      'An async runtime built from raw futures to demystify executors and wakers',
      'A lock-free queue with hazard-pointer memory reclamation',
      'no_std experiments targeting bare-metal embedded boards',
    ],
  },
}
