import { cn } from "@/lib/utils";

interface ScoreBreakdownProps {
  scores: {
    label: string;
    value: number;
    weight: number;
  }[];
  finalScore: number;
}

export function ScoreBreakdown({ scores, finalScore }: ScoreBreakdownProps) {
  const getColor = (s: number) => {
    if (s >= 70) return "trust-high";
    if (s >= 40) return "trust-medium";
    return "trust-low";
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground">Score Breakdown</h4>
      
      <div className="space-y-3">
        {scores.map((score) => (
          <div key={score.label} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {score.label} <span className="text-xs">({(score.weight * 100).toFixed(0)}%)</span>
              </span>
              <span className={cn("font-medium", `text-${getColor(score.value)}`)}>
                {score.value}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-500", `bg-${getColor(score.value)}`)}
                style={{ width: `${score.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">Final Trust Score</span>
          <span className={cn("text-2xl font-bold", `text-${getColor(finalScore)}`)}>
            {finalScore}
          </span>
        </div>
      </div>
    </div>
  );
}
