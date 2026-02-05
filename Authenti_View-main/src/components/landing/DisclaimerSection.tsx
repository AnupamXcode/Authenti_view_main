import { AlertTriangle } from "lucide-react";

export function DisclaimerSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex items-start gap-4 p-6 rounded-xl border border-chart-4/30 bg-chart-4/5">
          <AlertTriangle className="w-6 h-6 text-chart-4 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">Ethical AI Disclaimer</h4>
            <p className="text-muted-foreground text-sm">
              This system provides probabilistic assessments and does not make definitive claims about user intent or authenticity. 
              Results should be used as one of many factors in decision-making. AuthentiView is designed for transparency and 
              responsible AI use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
