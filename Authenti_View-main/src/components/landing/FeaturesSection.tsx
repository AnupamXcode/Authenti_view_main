import { FileText, Users, TrendingUp, Network, Brain, MessageSquare } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Review Text Analysis",
    description: "NLP-powered detection of fake review patterns, suspicious phrases, and templated content.",
    color: "primary",
  },
  {
    icon: TrendingUp,
    title: "Rating Manipulation",
    description: "Time-series analysis detects rating spikes, distribution anomalies, and coordinated attacks.",
    color: "accent",
  },
  {
    icon: Users,
    title: "Reviewer Behavior",
    description: "Behavioral profiling identifies suspicious patterns, burst activity, and inconsistent ratings.",
    color: "trust-high",
  },
  {
    icon: Network,
    title: "Collusion Detection",
    description: "Graph-based analysis reveals reviewer networks, coordinated campaigns, and fake review rings.",
    color: "chart-4",
  },
  {
    icon: Brain,
    title: "Explainable AI",
    description: "Every decision comes with clear explanations—no black boxes, full transparency.",
    color: "primary",
  },
  {
    icon: MessageSquare,
    title: "AI Assistant",
    description: "Interactive chatbot explains findings, answers questions, and educates users.",
    color: "accent",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Complete <span className="text-gradient">Analysis Pipeline</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Multi-layered AI analysis that examines every aspect of review authenticity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl glass hover:bg-card/90 transition-all duration-300 hover:shadow-elevated animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-${feature.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
