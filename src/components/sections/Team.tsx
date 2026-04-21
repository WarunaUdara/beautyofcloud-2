'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Member { name: string; image: string }
interface TeamLead { name: string; image: string }
interface Category { title: string; lead: TeamLead; members: Member[] }
interface Executive { name: string; role: string; image: string }

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEAM_DATA: { executives: Executive[]; categories: Category[] } = {
  executives: [
    { name: 'Alex Rivera', role: 'Event Co-Chair', image: 'https://i.pravatar.cc/400?u=alex' },
    { name: 'Jordan Chen', role: 'Event Co-Chair', image: 'https://i.pravatar.cc/400?u=jordan' },
  ],
  categories: [
    {
      title: 'Programming & Web Development',
      lead: { name: 'Maria Santos', image: 'https://i.pravatar.cc/400?u=dev' },
      members: Array.from({ length: 10 }, (_, i): Member => ({
        name: `Dev Member ${i + 1}`, image: `https://i.pravatar.cc/100?u=devmem${i}`,
      })),
    },
    {
      title: 'Design & Marketing',
      lead: { name: 'Sophia Lee', image: 'https://i.pravatar.cc/400?u=design' },
      members: Array.from({ length: 10 }, (_, i): Member => ({
        name: `Design Member ${i + 1}`, image: `https://i.pravatar.cc/100?u=designmem${i}`,
      })),
    },
    {
      title: 'Logistics & Coordination',
      lead: { name: 'Carlos Vega', image: 'https://i.pravatar.cc/400?u=logistics' },
      members: Array.from({ length: 10 }, (_, i): Member => ({
        name: `Logistics Member ${i + 1}`, image: `https://i.pravatar.cc/100?u=logmem${i}`,
      })),
    },
    {
      title: 'Industry Relations',
      lead: { name: 'Mia Tanaka', image: 'https://i.pravatar.cc/400?u=relations' },
      members: Array.from({ length: 10 }, (_, i): Member => ({
        name: `Relations Member ${i + 1}`, image: `https://i.pravatar.cc/100?u=relmem${i}`,
      })),
    },
  ],
};

const TOTAL = TEAM_DATA.categories.length;

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

// ─── Slot config: left / center / right ──────────────────────────────────────

type SlotPos = 'left' | 'center' | 'right';

const slotStyle: Record<SlotPos, React.CSSProperties> = {
  center: { opacity: 1, transform: 'scale(1)', filter: 'none', zIndex: 10 },
  left: { opacity: 0.35, transform: 'scale(0.88) translateX(6%)', filter: 'blur(0.5px)', zIndex: 5 },
  right: { opacity: 0.35, transform: 'scale(0.88) translateX(-6%)', filter: 'blur(0.5px)', zIndex: 5 },
};

// ─── Co-chair card ────────────────────────────────────────────────────────────

const CoChairCard: React.FC<{ exec: Executive; index: number }> = ({ exec, index }) => (
  <motion.div
    variants={fadeUp}
    transition={{ duration: 0.5, delay: index * 0.12 }}
    className="flex flex-col items-center"
  >
    <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-blue-400 mb-1.5">{exec.role}</p>
    <h3 className="font-['Syne',sans-serif] text-[26px] font-extrabold text-white tracking-tight mb-5">{exec.name}</h3>

    <motion.div
      whileHover={{ y: -7 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="relative rounded-[20px] overflow-hidden border border-white/[0.07] bg-[#0e1424] group cursor-pointer"
      style={{ width: 190, aspectRatio: '3/4' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-transparent z-10 pointer-events-none" />
      <Image src={exec.image} alt={exec.name} fill className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
      <div className="absolute bottom-0 inset-x-0 h-[42%] bg-gradient-to-t from-[#0e1424] to-transparent z-10" />
      <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2.5 z-20">
        <div className="h-px w-7 bg-blue-500/40" />
        <div className="w-2 h-2 rotate-45 border border-blue-500/55" />
        <div className="h-px w-7 bg-blue-500/40" />
      </div>
    </motion.div>

    <div className="mt-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
      <span className="text-[12px] text-blue-300">Organizing committee</span>
    </div>
  </motion.div>
);

// ─── Member avatar — image only, name chip on hover / tap ─────────────────────

const MemberAvatar: React.FC<{ member: Member }> = ({ member }) => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setActive(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex justify-center"
      style={{ paddingTop: 40, overflow: 'visible' }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive(v => !v)}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-[calc(100%-2px)] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-[#0d1526] border border-blue-500/35 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span className="text-[11px] font-medium text-white">{member.name}</span>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2" style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '4px solid rgba(59,130,246,0.35)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.2, zIndex: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        className="relative w-12 h-12 rounded-full overflow-hidden border-[2.5px] border-[#080c14] bg-[#131929] cursor-pointer"
        style={{ zIndex: active ? 20 : 1 }}
        role="img" aria-label={member.name} tabIndex={0}
        onFocus={() => setActive(true)} onBlur={() => setActive(false)}
      >
        <Image
          src={member.image} alt={member.name} fill
          className={`object-cover transition-all duration-300 ${active ? 'grayscale-0 brightness-105' : 'grayscale'}`}
        />
      </motion.div>
    </div>
  );
};

// ─── Team card ────────────────────────────────────────────────────────────────

const TeamCard: React.FC<{ category: Category; isCenter: boolean }> = ({ category, isCenter }) => (
  <div
    className="rounded-[20px] border bg-[#0e1424] transition-colors duration-300"
    style={{ borderColor: isCenter ? 'rgba(96,165,250,0.22)' : 'rgba(255,255,255,0.07)', overflow: 'visible' }}
  >
    {/* lead header */}
    <div className="flex items-start gap-3.5 p-[22px] pb-0">
      <div className="relative w-[72px] h-[72px] rounded-[14px] overflow-hidden border border-white/[0.08] flex-shrink-0">
        <Image
          src={category.lead.image} alt={category.lead.name} fill
          className={`object-cover object-top transition-all duration-500 ${isCenter ? 'grayscale-0' : 'grayscale'}`}
        />
        <span className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-[2.5px] border-[#0e1424]" />
      </div>
      <div className="min-w-0 pt-0.5">
        <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-blue-400 mb-0.5">Department</p>
        <h4 className="font-['Syne',sans-serif] text-[16px] font-bold text-white leading-snug mb-1.5">{category.title}</h4>
        <p className="text-[12px] text-slate-500">Lead: <span className="text-slate-300 font-medium">{category.lead.name}</span></p>
      </div>
    </div>

    <div className="mx-[22px] mt-[18px] h-px bg-white/[0.06]" />

    <div className="pt-4 pb-[22px]">
      <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-slate-600 px-[22px] mb-3.5">
        Members · {category.members.length}
      </p>
      {/* 5-column centered symmetric grid */}
      <div
        className="grid gap-x-2"
        style={{ gridTemplateColumns: 'repeat(5, 48px)', justifyContent: 'center', overflow: 'visible' }}
      >
        {category.members.map((m, i) => (
          <MemberAvatar key={`${m.name}-${i}`} member={m} />
        ))}
      </div>
    </div>
  </div>
);

// ─── Carousel ─────────────────────────────────────────────────────────────────

const wrap = (idx: number) => ((idx % TOTAL) + TOTAL) % TOTAL;

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const navigate = useCallback((dir: 1 | -1) => {
    setCurrent(c => wrap(c + dir));
  }, []);

  const goTo = useCallback((i: number) => setCurrent(i), []);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      navigate(1);
    }, 3000);
    return () => clearInterval(timer);
  }, [navigate, isHovered]);

  // swipe support
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) navigate(dx < 0 ? 1 : -1);
  };

  const slots: Array<{ offset: -1 | 0 | 1; pos: SlotPos }> = [
    { offset: -1, pos: 'left' },
    { offset: 0, pos: 'center' },
    { offset: 1, pos: 'right' },
  ];

  return (
    <div>
      {/* track */}
      <div
        className="relative overflow-hidden py-8 h-[480px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <AnimatePresence initial={false}>
            {slots.map(({ offset, pos }) => {
              const idx = wrap(current + offset);
              const cat = TEAM_DATA.categories[idx];
              return (
                <motion.div
                  key={cat.title}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    x: pos === 'right' ? '200%' : pos === 'left' ? '-200%' : '0%'
                  }}
                  animate={{
                    opacity: pos === 'center' ? 1 : 0.4,
                    scale: pos === 'center' ? 1 : 0.85,
                    x: pos === 'left' ? '-105%' : pos === 'right' ? '105%' : '0%',
                    zIndex: pos === 'center' ? 10 : 5
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    x: pos === 'left' ? '-200%' : pos === 'right' ? '200%' : '0%',
                    zIndex: 0
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute"
                  style={{
                    width: 'min(380px, 80vw)',
                    pointerEvents: pos === 'center' ? 'auto' : 'none',
                    willChange: 'transform, opacity',
                  }}
                  onClick={() => pos !== 'center' && navigate(offset as 1 | -1)}
                >
                  <TeamCard category={cat} isCenter={pos === 'center'} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* nav row */}
      <div className="flex items-center justify-center gap-5 mt-2">
        {/* dot indicators */}
        <div className="flex gap-2 items-center">
          {TEAM_DATA.categories.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to team ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
              style={{ width: i === current ? 20 : 6, background: i === current ? '#3b82f6' : 'rgba(255,255,255,0.18)' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Stats strip ──────────────────────────────────────────────────────────────

const STATS = [
  { num: '2', label: 'Co-chairs' },
  { num: '4', label: 'Departments' },
  { num: '44', label: 'Members' },
  { num: '1', label: 'Great event' },
];

// ─── Main section ─────────────────────────────────────────────────────────────

export const Team: React.FC = () => (
  <section
    id="team"
    className="py-24 sm:py-36 bg-[#080c14] relative"
    style={{ fontFamily: "'DM Sans', sans-serif", overflow: 'visible' }}
  >
    <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-80 rounded-full opacity-10"
      style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)' }} />

    <div className="container mx-auto px-6 relative" style={{ overflow: 'visible' }}>

      {/* header */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="text-center mb-16 sm:mb-20">
        <motion.p variants={fadeUp} className="text-[12px] font-medium tracking-[0.22em] uppercase text-blue-400 mb-3">The people behind the event</motion.p>
        <motion.h2 variants={fadeUp} className="font-['Syne',sans-serif] text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-3 leading-[1.05]">Meet the team</motion.h2>
        <motion.p variants={fadeUp} className="text-slate-400 text-base sm:text-[17px]">Organized by passionate people from across the industry.</motion.p>
      </motion.div>

      {/* co-chairs */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        className="flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-16 mb-20 sm:mb-24">
        {TEAM_DATA.executives.map((exec, i) => <CoChairCard key={exec.name} exec={exec} index={i} />)}
      </motion.div>

      {/* divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-slate-600 flex-shrink-0">Department teams</span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>

      {/* spotlight carousel */}
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <Carousel />
      </motion.div>

      {/* stats */}
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-14 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06] border border-white/[0.06] rounded-[20px] overflow-hidden bg-[#0e1424]">
        {STATS.map(s => (
          <div key={s.label} className="flex flex-col items-center py-6 px-5">
            <span className="font-['Syne',sans-serif] text-4xl font-extrabold text-white leading-none mb-1.5">{s.num}</span>
            <span className="text-[11px] tracking-[0.12em] uppercase text-slate-600">{s.label}</span>
          </div>
        ))}
      </motion.div>

    </div>
  </section>
);

export default Team;
