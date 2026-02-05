import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/landing/Footer";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { Button } from "@/components/ui/button";
import { TrustGauge } from "@/components/analysis/TrustGauge";
import { ExplanationCard } from "@/components/analysis/ExplanationCard";
import { User, Loader2, Activity, Clock, Star, Package, Network } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

interface ReviewerAnalysis {
  trustScore: number;
  anomalyFlags: string[];
  explanations: string[];
  behaviorMetrics: {
    reviewsPerDay: number;
    avgRating: number;
    ratingVariance: number;
    categoryDiversity: number;
    burstActivity: boolean;
  };
  activityData: { day: string; reviews: number }[];
  radarData: { metric: string; value: number; fullMark: number }[];
  collusionProbability: number;
  communitySize: number;
}

const sampleReviewers = [
  { id: "REV001", name: "TechEnthusiast42" },
  { id: "REV002", name: "HappyShopper99" },
  { id: "REV003", name: "ProductTester_Pro" },
];

export default function ReviewerAnalysis() {
  const [selectedReviewer, setSelectedReviewer] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ReviewerAnalysis | null>(null);

  const analyzeReviewer = async () => {
    if (!selectedReviewer) return;
    
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const isSuspicious = selectedReviewer === "REV002";
    
    const behaviorMetrics = isSuspicious ? {
      reviewsPerDay: 8.5,
      avgRating: 4.9,
      ratingVariance: 0.1,
      categoryDiversity: 0.15,
      burstActivity: true,
    } : {
      reviewsPerDay: 0.3,
      avgRating: 3.8,
      ratingVariance: 1.2,
      categoryDiversity: 0.85,
      burstActivity: false,
    };

    const activityData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      activityData.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        reviews: isSuspicious 
          ? (i <= 2 ? Math.floor(Math.random() * 15) + 10 : Math.floor(Math.random() * 3))
          : Math.floor(Math.random() * 2),
      });
    }

    const radarData = [
      { metric: "Review Frequency", value: isSuspicious ? 90 : 30, fullMark: 100 },
      { metric: "Rating Consistency", value: isSuspicious ? 95 : 60, fullMark: 100 },
      { metric: "Category Focus", value: isSuspicious ? 85 : 25, fullMark: 100 },
      { metric: "Temporal Burst", value: isSuspicious ? 80 : 20, fullMark: 100 },
      { metric: "Network Overlap", value: isSuspicious ? 70 : 15, fullMark: 100 },
    ];

    const anomalyFlags: string[] = [];
    const explanations: string[] = [];

    if (isSuspicious) {
      anomalyFlags.push("High review velocity: 8.5 reviews/day (normal: <1)");
      anomalyFlags.push("Abnormally consistent ratings: 4.9★ avg with 0.1 variance");
      anomalyFlags.push("Low category diversity: Reviews concentrated in single category");
      anomalyFlags.push("Burst activity detected in last 72 hours");
      explanations.push("Reviewer behavior strongly deviates from normal user patterns");
      explanations.push("Isolation Forest algorithm flagged multiple anomaly dimensions");
      explanations.push("Review timing suggests automated or coordinated activity");
    } else {
      explanations.push("Review frequency matches typical organic user behavior");
      explanations.push("Rating distribution shows natural variance");
      explanations.push("Category diversity indicates genuine consumer interest");
    }

    setResult({
      trustScore: isSuspicious ? 22 : 88,
      anomalyFlags,
      explanations,
      behaviorMetrics,
      activityData,
      radarData,
      collusionProbability: isSuspicious ? 73 : 8,
      communitySize: isSuspicious ? 47 : 3,
    });

    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">Reviewer</span> Analysis
              </h1>
              <p className="text-xl text-muted-foreground">
                Behavioral profiling and collusion detection for reviewer accounts
              </p>
            </div>

            {/* Reviewer Selection */}
            <div className="glass rounded-2xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select Reviewer
                  </label>
                  <select
                    value={selectedReviewer}
                    onChange={(e) => {
                      setSelectedReviewer(e.target.value);
                      setResult(null);
                    }}
                    className="w-full bg-muted rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Choose a sample reviewer...</option>
                    {sampleReviewers.map((reviewer) => (
                      <option key={reviewer.id} value={reviewer.id}>
                        {reviewer.name} ({reviewer.id})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={analyzeReviewer}
                    disabled={!selectedReviewer || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <User className="w-5 h-5" />
                        Analyze Reviewer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-6 animate-slide-up">
                {/* Trust Score and Collusion */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">
                      Reviewer Trust Score
                    </h3>
                    <div className="flex justify-center">
                      <TrustGauge score={result.trustScore} size="lg" />
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">
                      Collusion Analysis
                    </h3>
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex items-center gap-4">
                        <Network className={`w-8 h-8 ${result.collusionProbability > 50 ? "text-trust-low" : "text-trust-high"}`} />
                        <div>
                          <div className="text-3xl font-bold text-foreground">
                            {result.collusionProbability}%
                          </div>
                          <div className="text-sm text-muted-foreground">Collusion Probability</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-lg font-semibold text-foreground">{result.communitySize}</span>
                        <span className="text-muted-foreground"> reviewers in network</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Behavior Metrics */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Activity className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Behavior Metrics</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { icon: Clock, label: "Reviews/Day", value: result.behaviorMetrics.reviewsPerDay.toFixed(1) },
                      { icon: Star, label: "Avg Rating", value: result.behaviorMetrics.avgRating.toFixed(1) + "★" },
                      { icon: Activity, label: "Rating Variance", value: result.behaviorMetrics.ratingVariance.toFixed(1) },
                      { icon: Package, label: "Category Diversity", value: (result.behaviorMetrics.categoryDiversity * 100).toFixed(0) + "%" },
                      { 
                        icon: Activity, 
                        label: "Burst Activity", 
                        value: result.behaviorMetrics.burstActivity ? "Yes" : "No",
                        alert: result.behaviorMetrics.burstActivity
                      },
                    ].map((metric) => (
                      <div 
                        key={metric.label}
                        className={`p-4 rounded-xl ${metric.alert ? "bg-trust-low/10 border border-trust-low/30" : "bg-secondary"}`}
                      >
                        <metric.icon className={`w-5 h-5 mb-2 ${metric.alert ? "text-trust-low" : "text-muted-foreground"}`} />
                        <div className={`text-xl font-bold ${metric.alert ? "text-trust-low" : "text-foreground"}`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Activity Timeline */}
                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-semibold text-foreground mb-4">Review Activity (Last 7 Days)</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={result.activityData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
                          <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                          <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(222, 47%, 9%)",
                              border: "1px solid hsl(217, 33%, 17%)",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar 
                            dataKey="reviews" 
                            fill={result.trustScore < 50 ? "hsl(0, 84%, 60%)" : "hsl(173, 80%, 40%)"} 
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Anomaly Radar */}
                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-semibold text-foreground mb-4">Anomaly Detection Profile</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={result.radarData}>
                          <PolarGrid stroke="hsl(217, 33%, 17%)" />
                          <PolarAngleAxis 
                            dataKey="metric" 
                            stroke="hsl(215, 20%, 55%)" 
                            fontSize={10}
                          />
                          <PolarRadiusAxis 
                            stroke="hsl(215, 20%, 55%)" 
                            fontSize={10}
                            domain={[0, 100]}
                          />
                          <Radar
                            name="Anomaly Score"
                            dataKey="value"
                            stroke={result.trustScore < 50 ? "hsl(0, 84%, 60%)" : "hsl(173, 80%, 40%)"}
                            fill={result.trustScore < 50 ? "hsl(0, 84%, 60%)" : "hsl(173, 80%, 40%)"}
                            fillOpacity={0.3}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Anomaly Flags */}
                {result.anomalyFlags.length > 0 && (
                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-semibold text-foreground mb-4">Detected Anomalies</h3>
                    <div className="space-y-2">
                      {result.anomalyFlags.map((flag, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-trust-low/10 border border-trust-low/30"
                        >
                          <div className="w-2 h-2 rounded-full bg-trust-low" />
                          <span className="text-sm text-foreground">{flag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explanation */}
                <ExplanationCard
                  title="Behavioral Analysis Summary"
                  explanations={result.explanations}
                  type={result.trustScore >= 70 ? "info" : result.trustScore >= 40 ? "warning" : "danger"}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
