import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/landing/Footer";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { Button } from "@/components/ui/button";
import { TrustGauge } from "@/components/analysis/TrustGauge";
import { HighlightedText } from "@/components/analysis/HighlightedText";
import { ExplanationCard } from "@/components/analysis/ExplanationCard";
import { ScoreBreakdown } from "@/components/analysis/ScoreBreakdown";
import { Search, Star, Loader2, AlertTriangle } from "lucide-react";

interface AnalysisResult {
  fakeProba: number;
  verdict: string;
  highlights: { phrase: string; reason: string }[];
  explanations: string[];
  scores: { label: string; value: number; weight: number }[];
  finalScore: number;
}

const sampleReviews = [
  {
    text: "This product is absolutely amazing! Best purchase ever! I love it so much! 5 stars! Would recommend to everyone! Perfect in every way!",
    rating: 5,
  },
  {
    text: "Decent product for the price. The material feels a bit cheap but it works as expected. Delivery was on time. Might buy again if on sale.",
    rating: 3,
  },
  {
    text: "I've been using this for 3 months now. The battery life is impressive - lasts about 2 weeks on a single charge. Only downside is the somewhat complicated setup process, but customer support was helpful.",
    rating: 4,
  },
];

export default function AnalyzeReview() {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeReview = async () => {
    if (!reviewText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate ML analysis
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock analysis based on review characteristics
    const hasExcessivePositivity = /amazing|perfect|best|love|wonderful/i.test(reviewText);
    const isGeneric = reviewText.length < 100 && hasExcessivePositivity;
    const hasSpecificDetails = /\d+\s*(weeks?|months?|days?|hours?)/i.test(reviewText);
    const hasBalancedSentiment = /but|however|downside|although/i.test(reviewText);

    let textScore = 70;
    let behaviorScore = 75;
    const highlights: { phrase: string; reason: string }[] = [];
    const explanations: string[] = [];

    if (hasExcessivePositivity && !hasSpecificDetails) {
      textScore -= 30;
      highlights.push(
        { phrase: "absolutely amazing", reason: "Excessive positivity without specifics" },
        { phrase: "Best purchase ever", reason: "Hyperbolic claim" },
        { phrase: "Perfect in every way", reason: "Unrealistic superlative" }
      );
      explanations.push("Review contains multiple superlatives without supporting details");
      explanations.push("Language pattern matches common fake review templates");
    }

    if (isGeneric) {
      textScore -= 20;
      explanations.push("Review is unusually short and lacks specific product information");
    }

    if (hasSpecificDetails) {
      textScore += 15;
      explanations.push("Review includes specific usage timeframes, suggesting authentic experience");
    }

    if (hasBalancedSentiment) {
      textScore += 10;
      behaviorScore += 10;
      explanations.push("Balanced sentiment with both pros and cons indicates genuine review");
    }

    if (rating === 5 && textScore < 50) {
      explanations.push("5-star rating combined with suspicious text patterns");
    }

    textScore = Math.max(10, Math.min(100, textScore));
    behaviorScore = Math.max(30, Math.min(100, behaviorScore));

    const ratingScore = Math.abs(rating - 3) < 2 ? 80 : 60;
    const graphScore = 85;

    const finalScore = Math.round(
      0.45 * textScore +
      0.30 * behaviorScore +
      0.15 * ratingScore +
      0.10 * graphScore
    );

    setResult({
      fakeProba: 100 - finalScore,
      verdict: finalScore >= 70 ? "Genuine" : finalScore >= 40 ? "Suspicious" : "Likely Fake",
      highlights: highlights.filter((h) => reviewText.toLowerCase().includes(h.phrase.toLowerCase())),
      explanations: explanations.length > 0 ? explanations : ["Review appears to follow normal patterns"],
      scores: [
        { label: "Text Credibility", value: textScore, weight: 0.45 },
        { label: "Behavior Normality", value: behaviorScore, weight: 0.30 },
        { label: "Rating Stability", value: ratingScore, weight: 0.15 },
        { label: "Graph Integrity", value: graphScore, weight: 0.10 },
      ],
      finalScore,
    });

    setIsAnalyzing(false);
  };

  const loadSample = (sample: typeof sampleReviews[0]) => {
    setReviewText(sample.text);
    setRating(sample.rating);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">Review</span> Analyzer
              </h1>
              <p className="text-xl text-muted-foreground">
                Paste a review to detect authenticity using our AI pipeline
              </p>
            </div>

            {/* Input Section */}
            <div className="glass rounded-2xl p-6 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Review Text
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Paste the review text here..."
                    className="w-full h-32 bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Rating (Optional)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? "fill-chart-4 text-chart-4"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <button
                        onClick={() => setRating(0)}
                        className="ml-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={analyzeReview}
                    disabled={!reviewText.trim() || isAnalyzing}
                    className="flex-1"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Analyze Review
                      </>
                    )}
                  </Button>
                </div>

                {/* Sample Reviews */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Try a sample:</p>
                  <div className="flex flex-wrap gap-2">
                    {sampleReviews.map((sample, index) => (
                      <button
                        key={index}
                        onClick={() => loadSample(sample)}
                        className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                      >
                        Sample {index + 1} ({sample.rating}★)
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            {result && (
              <div className="space-y-6 animate-slide-up">
                {/* Main Result */}
                <div className="glass rounded-2xl p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center justify-center">
                      <TrustGauge score={result.finalScore} size="lg" />
                      <div className="mt-4 flex items-center gap-2">
                        <AlertTriangle className={`w-5 h-5 ${
                          result.finalScore >= 70 ? "text-trust-high" :
                          result.finalScore >= 40 ? "text-trust-medium" : "text-trust-low"
                        }`} />
                        <span className="text-lg font-medium text-foreground">
                          {result.fakeProba}% Fake Probability
                        </span>
                      </div>
                    </div>
                    
                    <ScoreBreakdown scores={result.scores} finalScore={result.finalScore} />
                  </div>
                </div>

                {/* Highlighted Text */}
                {result.highlights.length > 0 && (
                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-semibold text-foreground mb-4">Suspicious Phrases Detected</h3>
                    <HighlightedText text={reviewText} highlights={result.highlights} />
                    <p className="text-sm text-muted-foreground mt-4">
                      Hover over highlighted text to see why it's flagged
                    </p>
                  </div>
                )}

                {/* Explanation */}
                <ExplanationCard
                  title="Why this verdict?"
                  explanations={result.explanations}
                  type={result.finalScore >= 70 ? "info" : result.finalScore >= 40 ? "warning" : "danger"}
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
