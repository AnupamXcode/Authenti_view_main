import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ExplanationCardProps {
  title: string;
  explanations: string[];
  type?: "info" | "warning" | "danger";
}

export function ExplanationCard({ title, explanations, type = "info" }: ExplanationCardProps) {
  const [expanded, setExpanded] = useState(false);

  const typeStyles = {
    info: "border-primary/30 bg-primary/5",
    warning: "border-trust-medium/30 bg-trust-medium/5",
    danger: "border-trust-low/30 bg-trust-low/5",
  };

  const iconColors = {
    info: "text-primary",
    warning: "text-trust-medium",
    danger: "text-trust-low",
  };

  return (
    <div className={cn("rounded-xl border p-4", typeStyles[type])}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className={cn("w-5 h-5", iconColors[type])} />
          <span className="font-medium text-foreground">{title}</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      
      {expanded && (
        <div className="mt-4 space-y-2 animate-slide-up">
          {explanations.map((exp, index) => (
            <p key={index} className="text-sm text-muted-foreground pl-7">
              • {exp}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
