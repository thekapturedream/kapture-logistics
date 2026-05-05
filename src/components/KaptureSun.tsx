import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
  spin?: boolean;
};

export function KaptureSun({ className, size = 28, spin = false }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      aria-label="Kapture"
      role="img"
      className={cn(spin && "animate-spin-slow", className)}
    >
      <circle cx="32" cy="32" r="10" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <line x1="32" y1="4" x2="32" y2="14" />
        <line x1="32" y1="50" x2="32" y2="60" />
        <line x1="4" y1="32" x2="14" y2="32" />
        <line x1="50" y1="32" x2="60" y2="32" />
        <line x1="12" y1="12" x2="19" y2="19" />
        <line x1="45" y1="45" x2="52" y2="52" />
        <line x1="52" y1="12" x2="45" y2="19" />
        <line x1="19" y1="45" x2="12" y2="52" />
      </g>
    </svg>
  );
}
