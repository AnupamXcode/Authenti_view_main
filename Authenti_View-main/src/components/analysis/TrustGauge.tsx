import { cn } from "@/lib/utils";

interface TrustGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function TrustGauge({ score, size = "md", showLabel = true }: TrustGaugeProps) {
  const getColor = (s: number) => {
    if (s >= 70) return "trust-high";
    if (s >= 40) return "trust-medium";
    return "trust-low";
  };

  const getVerdict = (s: number) => {
    if (s >= 70) return "Genuine";
    if (s >= 40) return "Suspicious";
    return "Likely Fake";
  };

  const color = getColor(score);
  const verdict = getVerdict(score);

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  const textSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={`hsl(var(--${color}))`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", textSizes[size], `text-${color}`)}>
            {score}%
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={cn("font-semibold text-lg", `text-${color}`)}>
          {verdict}
        </span>
      )}
    </div>
  );
}
