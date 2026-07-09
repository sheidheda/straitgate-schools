import { StarIcon } from '@heroicons/react/24/solid';

export default function BrandText({ label, highlightIDot = false }: { label: string; highlightIDot?: boolean }) {
  if (!highlightIDot) return <>{label}</>;

  const iIndex = label.indexOf('i');
  if (iIndex === -1) return <>{label}</>;

  return (
    <>
      {label.slice(0, iIndex)}
      <span className="relative inline-block leading-none">
        i
        <StarIcon
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-0.1em] h-[0.55em] w-[0.55em] -translate-x-1/2 -rotate-[15deg] text-[#DC2626]"
        />
      </span>
      {label.slice(iIndex + 1)}
    </>
  );
}
