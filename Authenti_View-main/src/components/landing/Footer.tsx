import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-trust flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-gradient">AuthentiView</span>
          </div>
          <p className="text-sm text-muted-foreground">
            AI-Powered Review Intelligence • Built for Trust & Transparency
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AuthentiView. Demo Project.
          </p>
        </div>
      </div>
    </footer>
  );
}
