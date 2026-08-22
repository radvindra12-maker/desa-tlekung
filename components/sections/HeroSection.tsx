"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

// ─── Pilar Giri Murti ─────────────────────────────────────────────────────────

interface PillarItem {
  title: string;
  description: string;
  icon: ReactNode;
}

const pillars: PillarItem[] = [
  {
    title: "Tempat Belajar",
    description:
      "Ruang tumbuh dan belajar untuk anak serta masyarakat.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Tempat Berkumpul",
    description:
      "Ruang untuk bertemu, berbagi, dan membangun kebersamaan.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
        />
      </svg>
    ),
  },
  {
    title: "Menikmati Rasa",
    description:
      "Kuliner lokal dan pengalaman rasa khas Giri Murti.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M8 3v8m0 0a3 3 0 006 0V3m-6 8V3m6 8V3m-9 0v5a6 6 0 0012 0V3M12 14v7m-4 0h8"
        />
      </svg>
    ),
  },
  {
    title: "Tempat Bertumbuh",
    description:
      "Mendorong kualitas hidup dan potensi masyarakat sekitar.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 21V10m0 0c-3.866 0-7-2.462-7-5.5C5 4.224 5.224 4 5.5 4 9.366 4 12 6.238 12 10zm0 0c0-3.762 2.634-6 6.5-6 .276 0 .5.224.5.5C19 7.538 15.866 10 12 10z"
        />
      </svg>
    ),
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: d,
      duration: 0.65,
      ease: "easeOut",
    },
  }),
};

// ─── Ambient glow cluster (right) ─────────────────────────────────────────────

function AmbientGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Main amber glow — far right */}
      <motion.div
        className="absolute"
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          right: "-10%",
          top: "10%",
          width: "55%",
          height: "80%",
          background:
            "radial-gradient(ellipse at 80% 45%, rgba(180,130,40,0.09) 0%, transparent 65%)",
        }}
      />

      {/* Secondary green-gold glow */}
      <motion.div
        className="absolute"
        animate={{
          opacity: [0.08, 0.2, 0.08],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          right: "5%",
          bottom: "-5%",
          width: "40%",
          height: "50%",
          background:
            "radial-gradient(ellipse at 70% 80%, rgba(100,160,60,0.06) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

// ─── Large ghosted "KOPI" background text ─────────────────────────────────────

function GhostText() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.3,
        duration: 1.4,
        ease: "easeOut",
      }}
      aria-hidden="true"
      className="pointer-events-none absolute right-[-2%] top-1/2 -translate-y-1/2 select-none"
    >
      <span
        className="block font-black leading-none tracking-tight"
        style={{
          fontSize: "clamp(9rem, 22vw, 22rem)",
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: "transparent",
          WebkitTextStroke:
            "1.5px rgba(180, 140, 60, 0.13)",
          letterSpacing: "-0.04em",
        }}
      >
        KOPI
      </span>
    </motion.div>
  );
}

// ─── Floating coffee beans SVG ────────────────────────────────────────────────

function CoffeeBeans() {
  const beans = [
    [78, 12, 9, 5.5, -28, 0.28, 1.0, 0],
    [92, 28, 7, 4.0, 15, 0.2, 0.8, 1.2],
    [68, 38, 8, 4.8, -45, 0.1, 0.9, 0.6],
    [86, 52, 6, 3.5, 30, 0.24, 0.7, 1.8],
    [95, 18, 5, 3.0, -10, 0.09, 0.6, 0.3],
    [74, 60, 9, 5.5, 55, 0.11, 1.0, 2.1],
    [88, 68, 7, 4.0, -35, 0.22, 0.8, 0.9],
    [96, 42, 6, 3.5, 20, 0.08, 0.65, 1.5],
    [70, 78, 8, 4.8, -60, 0.1, 0.9, 0.4],
    [82, 85, 5, 3.0, 40, 0.2, 0.7, 1.1],
    [91, 80, 9, 5.5, -15, 0.09, 1.0, 2.4],
    [76, 92, 6, 3.5, 65, 0.07, 0.6, 0.7],
    [99, 10, 4, 2.5, -5, 0.06, 0.5, 1.9],
    [100, 55, 5, 3.0, 25, 0.07, 0.6, 0.2],
    [97, 90, 4, 2.5, -50, 0.06, 0.5, 1.6],
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient
          id="beanFade"
          cx="90%"
          cy="50%"
          r="60%"
        >
          <stop
            offset="0%"
            stopColor="white"
            stopOpacity="1"
          />
          <stop
            offset="70%"
            stopColor="white"
            stopOpacity="0.6"
          />
          <stop
            offset="100%"
            stopColor="white"
            stopOpacity="0"
          />
        </radialGradient>

        <mask id="beanMask">
          <rect
            width="100"
            height="100"
            fill="url(#beanFade)"
          />
        </mask>
      </defs>

      <g mask="url(#beanMask)">
        {beans.map(
          (
            [
              cx,
              cy,
              rx,
              ry,
              rotate,
              opacity,
              ,
              delay,
            ],
            i
          ) => (
            <motion.g
              key={i}
              initial={{
                opacity: 0,
                scale: 0.6,
              }}
              animate={{
                opacity: [
                  (opacity as number) * 0.5,
                  opacity as number,
                  (opacity as number) * 0.5,
                ],
                y: [0, -8, 0],
                x: [0, 5, 0],
                rotate: [0, 4, -4, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 10 + (delay as number),
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: `${cx}% ${cy}%`,
              }}
            >
              <g
                transform={`translate(${cx} ${cy}) rotate(${rotate})`}
              >
                <ellipse
                  cx={0}
                  cy={0}
                  rx={rx as number}
                  ry={ry as number}
                  fill="none"
                  stroke="#C8A96E"
                  strokeWidth="0.9"
                  strokeOpacity={opacity as number}
                />

                <line
                  x1={0}
                  y1={-(ry as number) * 0.75}
                  x2={0}
                  y2={(ry as number) * 0.75}
                  stroke="#C8A96E"
                  strokeWidth="0.55"
                  strokeOpacity={
                    (opacity as number) * 0.9
                  }
                  strokeLinecap="round"
                />
              </g>
            </motion.g>
          )
        )}
      </g>
    </svg>
  );
}

// ─── Drifting dot field ───────────────────────────────────────────────────────

function DotField() {
  const dots = [
    [85, 15],
    [92, 38],
    [78, 55],
    [96, 72],
    [70, 88],
    [88, 22],
    [75, 42],
    [94, 60],
    [82, 80],
    [98, 8],
    [73, 68],
    [90, 48],
    [80, 30],
    [97, 85],
    [76, 10],
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {dots.map(([x, y], i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-amber-400"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.25, 0.1, 0.22, 0],
            y: [0, -6, 2, -4, 0],
          }}
          transition={{
            delay: i * 0.35,
            duration: 6 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Curved contour lines ─────────────────────────────────────────────────────

function ContourLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient
          id="contourFade"
          cx="85%"
          cy="50%"
          r="55%"
        >
          <stop
            offset="0%"
            stopColor="white"
            stopOpacity="1"
          />
          <stop
            offset="100%"
            stopColor="white"
            stopOpacity="0"
          />
        </radialGradient>

        <mask id="contourMask">
          <rect
            width="100"
            height="100"
            fill="url(#contourFade)"
          />
        </mask>
      </defs>

      <g mask="url(#contourMask)">
        {[
          "M 55 -5 Q 70 25 65 50 Q 60 75 70 105",
          "M 65 -5 Q 78 22 73 50 Q 68 78 76 105",
          "M 75 -5 Q 86 20 82 50 Q 76 80 84 105",
          "M 85 -5 Q 92 18 90 50 Q 87 82 93 105",
          "M 93 -5 Q 97 15 96 50 Q 95 85 99 105",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="#C8A96E"
            strokeWidth="0.4"
            strokeOpacity={0.09 - i * 0.01}
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.6 + i * 0.18,
              duration: 1.8,
              ease: "easeOut",
            }}
          />
        ))}
      </g>
    </svg>
  );
}

// ─── Pillar card ──────────────────────────────────────────────────────────────

function PillarCard({
  item,
  index,
}: {
  item: PillarItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 1.05 + index * 0.1,
        duration: 0.55,
        ease: "easeOut",
      }}
      className="
        group relative flex min-h-32 flex-1 flex-col
        rounded-2xl border border-white/20
        bg-white/10 p-4
        backdrop-blur-md
        transition-all duration-300
        hover:-translate-y-1
        hover:border-white/40
        hover:bg-white/20
      "
    >
      <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 transition-colors duration-300 group-hover:bg-orange-400/10 group-hover:text-orange-300">
        {item.icon}
      </span>

      <h3 className="text-sm font-bold text-white sm:text-base">
        {item.title}
      </h3>

      <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-white/55">
        {item.description}
      </p>

      <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-orange-400 transition-all duration-300 group-hover:w-3/4" />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-[115vh] overflow-hidden bg-linear-to-b from-(--dark-green) via-(--bg-primary) to-(--bg-primary)"
    >
      <AmbientGlow />
      <GhostText />
      <CoffeeBeans />
      <DotField />

      <motion.div
        initial={{
          opacity: 0,
          x: 120,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        transition={{
          duration: 10,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          WebkitMaskImage:
            "linear-gradient(to left, black 75%, transparent 100%)",
          maskImage:
            "linear-gradient(to left, black 75%, transparent 100%)",
        }}
        className="
          pointer-events-none
          absolute
          right-[-3%]
          bottom-0
          z-10
          h-[92%]
          w-[42vw]
          max-w-[720px]
          min-w-[420px]
          select-none
        "
      >
        <Image
          src="/images/hero/petani-kopi.png"
          alt="Petani Kopi Giri Murti"
          fill
          priority
          className="object-contain object-bottom"
        />

        <div
          className="
            absolute
            top-0
            right-0
            h-full
            w-20
            bg-gradient-to-l
            from-[var(--bg-primary)]
            to-transparent
          "
        />
      </motion.div>

      <ContourLines />

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col px-4 pt-28 pb-8 sm:px-6 lg:px-8">
        {/* Heading block */}
        <div className="flex max-w-3xl flex-1 flex-col justify-center">
          {/* Eyebrow */}
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeSlideUp}
            className="mb-5 inline-flex items-center gap-2 self-start"
          >
            <span
              className="
                flex items-center gap-1.5
                rounded-full border border-white/20
                bg-white/10 px-3 py-1.5
                text-xs font-semibold
                uppercase tracking-wider
                text-emerald-300
                backdrop-blur-sm
              "
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              WARISAN KOPI • SEJAK 1874 • GIRI MURTI
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            custom={0.35}
            initial="hidden"
            animate="visible"
            variants={fadeSlideUp}
            className="mb-2 text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{
              fontFamily:
                "Georgia, 'Times New Roman', serif",
            }}
          >
            <span className="relative inline-block text-(--beige)">
              Giri Murti

              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6 Q50 2 100 6 Q150 10 198 5"
                  stroke="#8B5E34"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            custom={0.48}
            initial="hidden"
            animate="visible"
            variants={fadeSlideUp}
            className="mt-4 mb-3 text-lg font-semibold tracking-wide text-white/80 sm:text-xl"
          >
            Warisan Rasa dari Lereng Kawi Sejak 1874
          </motion.p>

          {/* Description */}
          <motion.p
            custom={0.58}
            initial="hidden"
            animate="visible"
            variants={fadeSlideUp}
            className="mb-8 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
          >
            Pendopo Giri Murti adalah pusat kegiatan
            komunitas yang terbuka untuk umum, bukan
            sekadar tempat pengelolaan kebun kopi.
            Melalui berbagai program kegiatan seperti
            edukasi anak, wisata budaya, kuliner khas
            (termasuk warung Angling Darmo), tempat ini
            berkomitmen meningkatkan kualitas hidup dan
            sumber daya manusia di lingkungan sekitar.
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={0.7}
            initial="hidden"
            animate="visible"
            variants={fadeSlideUp}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="#profil"
              className="
                group inline-flex items-center gap-2.5
                rounded-full
                bg-(--green)
                px-6 py-3.5
                text-sm font-semibold text-white
                shadow-lg shadow-[var(--green)]-900/40
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-(--dark-green)
                hover:shadow-[var(--green)]-600/40
                active:translate-y-0
              "
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>

              Pelajari Sejarah

              <svg
                className="h-3.5 w-3.5 translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            <Link
              href="#kontak"
              className="
                group inline-flex items-center gap-2.5
                rounded-full
                border border-white/30
                bg-white/10
                px-6 py-3.5
                text-sm font-semibold text-white
                backdrop-blur-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-orange-400/60
                hover:bg-white/20
                active:translate-y-0
              "
            >
              <svg
                className="h-4 w-4 text-orange-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>

              Lihat Produk
            </Link>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.5,
              duration: 0.6,
            }}
            className="mt-10 hidden items-center gap-2 text-xs text-white/30 sm:flex"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>

            Gulir untuk melihat lebih
          </motion.div>
        </div>

        {/* ── Pilar Giri Murti ── */}
        <div className="mt-auto pt-8">
          <motion.div
            initial={{
              scaleX: 0,
              opacity: 0,
            }}
            animate={{
              scaleX: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.95,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="mb-5 h-px origin-left bg-white/10"
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="mb-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300/80">
              Lebih dari Sekadar Kebun Kopi
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {pillars.map((item, i) => (
              <PillarCard
                key={item.title}
                item={item}
                index={i}
              />
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.6,
                duration: 0.5,
              }}
              className="hidden self-center lg:flex"
            >
              <span
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-orange-400/30
                  bg-orange-500/15
                  px-4 py-2
                  text-xs font-medium text-orange-300
                  backdrop-blur-sm
                "
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Ruang Komunitas Giri Murti
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}