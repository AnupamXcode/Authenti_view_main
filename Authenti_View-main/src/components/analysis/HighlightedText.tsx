import { cn } from "@/lib/utils";

interface HighlightedTextProps {
  text: string;
  highlights: { phrase: string; reason: string }[];
}

export function HighlightedText({ text, highlights }: HighlightedTextProps) {
  let result = text;
  const parts: { text: string; highlighted: boolean; reason?: string }[] = [];
  
  // Simple highlight matching
  let lastIndex = 0;
  const sortedHighlights = [...highlights].sort((a, b) => 
    text.toLowerCase().indexOf(a.phrase.toLowerCase()) - text.toLowerCase().indexOf(b.phrase.toLowerCase())
  );

  sortedHighlights.forEach(({ phrase, reason }) => {
    const lowerText = text.toLowerCase();
    const lowerPhrase = phrase.toLowerCase();
    const index = lowerText.indexOf(lowerPhrase, lastIndex);
    
    if (index !== -1) {
      if (index > lastIndex) {
        parts.push({ text: text.slice(lastIndex, index), highlighted: false });
      }
      parts.push({ text: text.slice(index, index + phrase.length), highlighted: true, reason });
      lastIndex = index + phrase.length;
    }
  });

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), highlighted: false });
  }

  if (parts.length === 0) {
    parts.push({ text, highlighted: false });
  }

  return (
    <p className="text-foreground leading-relaxed">
      {parts.map((part, index) => (
        part.highlighted ? (
          <span
            key={index}
            className="relative inline-block bg-trust-low/20 text-trust-low px-1 rounded cursor-help border-b-2 border-trust-low/50"
            title={part.reason}
          >
            {part.text}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        )
      ))}
    </p>
  );
}
