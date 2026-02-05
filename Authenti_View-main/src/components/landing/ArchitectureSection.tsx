import { ArrowRight, Database, Cpu, BarChart2, Shield } from "lucide-react";

const pipelineSteps = [
  { icon: Database, label: "Data Input", sublabel: "Review / Product / Reviewer" },
  { icon: Cpu, label: "ML Pipeline", sublabel: "NLP + Anomaly + Graph" },
  { icon: BarChart2, label: "Score Fusion", sublabel: "Weighted Aggregation" },
  { icon: Shield, label: "Trust Verdict", sublabel: "Explainable Output" },
];

export function ArchitectureSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="text-gradient">AuthentiView</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            End-to-end ML pipeline with complete transparency
          </p>
        </div>

        {/* Pipeline Visualization */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {pipelineSteps.map((step, index) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-trust flex items-center justify-center shadow-glow mb-2">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <span className="font-semibold text-foreground">{step.label}</span>
                  <span className="text-sm text-muted-foreground">{step.sublabel}</span>
                </div>
                {index < pipelineSteps.length - 1 && (
                  <ArrowRight className="hidden md:block w-6 h-6 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Score Formula */}
        <div className="max-w-3xl mx-auto p-8 rounded-2xl glass">
          <h3 className="text-xl font-semibold mb-6 text-center">Final Trust Score Formula</h3>
          <div className="bg-muted/50 rounded-xl p-6 font-mono text-sm md:text-base overflow-x-auto">
            <div className="text-accent mb-4">Final Trust Score =</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4">
              <div><span className="text-trust-high">0.45</span> × Text Credibility</div>
              <div><span className="text-primary">+ 0.30</span> × Behavior Normality</div>
              <div><span className="text-chart-4">+ 0.15</span> × Rating Stability</div>
              <div><span className="text-accent">+ 0.10</span> × Graph Integrity</div>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-4 text-sm">
            Weighted combination ensures robust, multi-dimensional assessment
          </p>
        </div>
      </div>
    </section>
  );
}
