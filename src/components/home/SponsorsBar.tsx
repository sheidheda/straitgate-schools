'use client';

const sponsors = [
  { name: 'Keller', style: 'font-sans text-4xl font-black tracking-tight' },
  { name: 'Mastercard Foundation', style: 'max-w-[11rem] text-center text-xl font-bold leading-5' },
  { name: 'ADTECH GROUP', style: 'font-mono text-3xl font-black tracking-wider' },
  { name: 'CURRO', style: 'font-serif text-4xl font-bold tracking-[0.18em]' },
  { name: 'HANDS TECH', style: 'text-2xl font-semibold tracking-[0.16em]' },
  { name: 'INJINI', style: 'text-3xl font-black tracking-[0.1em]' },
  { name: 'WRO', style: 'font-serif text-3xl font-black tracking-wider' },
  { name: 'Yenza', style: 'text-3xl font-black italic' },
  { name: 'Oxford Press', style: 'font-serif text-2xl font-semibold tracking-[0.08em]' },
  { name: 'Reflective Learning', style: 'max-w-[12rem] text-center text-2xl font-bold leading-5' },
  { name: 'Resolute Foundation', style: 'max-w-[12rem] text-center text-2xl font-black leading-5' },
  { name: 'SACE', style: 'font-serif text-4xl tracking-[0.2em]' },
];

export default function SponsorsBar() {
  const marqueeItems = [...sponsors, ...sponsors];

  return (
    <section className="overflow-hidden border-y border-primary/10 bg-light py-10" aria-label="Sponsors">
      <div className="sponsors-marquee flex w-max items-center gap-16 text-primary/80">
        {marqueeItems.map((sponsor, index) => (
          <div
            key={`${sponsor.name}-${index}`}
            className="flex h-20 min-w-44 shrink-0 items-center justify-center rounded-lg border border-primary/10 bg-white/70 px-3 shadow-sm"
          >
            <span className={sponsor.style}>{sponsor.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
