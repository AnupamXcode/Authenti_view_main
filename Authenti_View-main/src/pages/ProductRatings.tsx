import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/landing/Footer";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { Button } from "@/components/ui/button";
import { TrustGauge } from "@/components/analysis/TrustGauge";
import { ExplanationCard } from "@/components/analysis/ExplanationCard";
import { BarChart3, Loader2, TrendingUp, AlertTriangle, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface ProductAnalysis {
  trustScore: number;
  spikeAlerts: string[];
  explanations: string[];
  ratingData: { date: string; rating: number; reviews: number }[];
  distribution: { stars: number; count: number; percentage: number }[];
}

const sampleProducts = [
  { id: "PROD001", name: "Wireless Earbuds Pro" },
  { id: "PROD002", name: "Smart Watch X200" },
  { id: "PROD003", name: "Portable Charger 20000mAh" },
];

// Generate realistic-looking data
const generateRatingData = (manipulated: boolean) => {
  const data = [];
  const baseRating = manipulated ? 3.2 : 4.1;
  
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    let rating = baseRating + (Math.random() - 0.5) * 0.3;
    let reviews = Math.floor(Math.random() * 20) + 5;
    
    // Add spike for manipulated products
    if (manipulated && i >= 15 && i <= 20) {
      rating = 4.7 + Math.random() * 0.2;
      reviews = Math.floor(Math.random() * 50) + 40;
    }
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      rating: Math.round(rating * 10) / 10,
      reviews,
    });
  }
  
  return data;
};

const generateDistribution = (manipulated: boolean) => {
  if (manipulated) {
    return [
      { stars: 5, count: 450, percentage: 65 },
      { stars: 4, count: 80, percentage: 12 },
      { stars: 3, count: 40, percentage: 6 },
      { stars: 2, count: 30, percentage: 4 },
      { stars: 1, count: 90, percentage: 13 },
    ];
  }
  return [
    { stars: 5, count: 180, percentage: 35 },
    { stars: 4, count: 200, percentage: 39 },
    { stars: 3, count: 80, percentage: 16 },
    { stars: 2, count: 30, percentage: 6 },
    { stars: 1, count: 20, percentage: 4 },
  ];
};

export default function ProductRatings() {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ProductAnalysis | null>(null);

  const analyzeProduct = async () => {
    if (!selectedProduct) return;
    
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const isManipulated = selectedProduct === "PROD002";
    
    const ratingData = generateRatingData(isManipulated);
    const distribution = generateDistribution(isManipulated);

    let trustScore = isManipulated ? 35 : 82;
    const spikeAlerts: string[] = [];
    const explanations: string[] = [];

    if (isManipulated) {
      spikeAlerts.push("Unusual spike detected: Jan 15-20 (+85% reviews, +1.5★ avg)");
      spikeAlerts.push("J-shaped distribution anomaly (high 5★ and 1★, low middle ratings)");
      explanations.push("Rating distribution shows polarized pattern often associated with manipulation");
      explanations.push("Review volume spike doesn't correlate with known marketing events");
      explanations.push("65% 5-star reviews with 13% 1-star reviews suggests competing review campaigns");
    } else {
      explanations.push("Rating distribution follows expected normal pattern");
      explanations.push("Review volume remains consistent over time");
      explanations.push("No unusual spikes or anomalies detected");
    }

    setResult({
      trustScore,
      spikeAlerts,
      explanations,
      ratingData,
      distribution,
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
                <span className="text-gradient">Product Rating</span> Analysis
              </h1>
              <p className="text-xl text-muted-foreground">
                Detect rating manipulation through time-series and distribution analysis
              </p>
            </div>

            {/* Product Selection */}
            <div className="glass rounded-2xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select Product
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => {
                      setSelectedProduct(e.target.value);
                      setResult(null);
                    }}
                    className="w-full bg-muted rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Choose a sample product...</option>
                    {sampleProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} ({product.id})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={analyzeProduct}
                    disabled={!selectedProduct || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-5 h-5" />
                        Analyze Ratings
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-6 animate-slide-up">
                {/* Trust Score */}
                <div className="glass rounded-2xl p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">Rating Trust Score</h3>
                      <TrustGauge score={result.trustScore} size="lg" />
                    </div>
                    
                    {/* Spike Alerts */}
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">Detected Anomalies</h3>
                      {result.spikeAlerts.length > 0 ? (
                        <div className="space-y-3">
                          {result.spikeAlerts.map((alert, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-trust-low/10 border border-trust-low/30">
                              <AlertTriangle className="w-5 h-5 text-trust-low flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-foreground">{alert}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-trust-high/10 border border-trust-high/30">
                          <TrendingUp className="w-5 h-5 text-trust-high" />
                          <span className="text-sm text-foreground">No anomalies detected - ratings appear organic</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating Timeline Chart */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Rating Over Time (Last 30 Days)</h3>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.ratingData}>
                        <defs>
                          <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(215, 20%, 55%)" 
                          fontSize={12}
                          tickLine={false}
                        />
                        <YAxis 
                          domain={[1, 5]} 
                          stroke="hsl(215, 20%, 55%)" 
                          fontSize={12}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(222, 47%, 9%)",
                            border: "1px solid hsl(217, 33%, 17%)",
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: "hsl(210, 40%, 98%)" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="rating"
                          stroke="hsl(217, 91%, 60%)"
                          strokeWidth={2}
                          fill="url(#ratingGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Distribution Chart */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold text-foreground">Rating Distribution</h3>
                  </div>
                  <div className="space-y-3">
                    {result.distribution.map((item) => (
                      <div key={item.stars} className="flex items-center gap-4">
                        <span className="w-12 text-sm text-muted-foreground">{item.stars}★</span>
                        <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              item.stars >= 4 ? "bg-trust-high" :
                              item.stars === 3 ? "bg-trust-medium" : "bg-trust-low"
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="w-16 text-sm text-foreground text-right">
                          {item.percentage}% ({item.count})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explanation */}
                <ExplanationCard
                  title="Analysis Summary"
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
