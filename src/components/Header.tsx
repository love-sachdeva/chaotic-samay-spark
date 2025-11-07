import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold font-mono tracking-tighter">
              <span className="text-primary">SAMAY</span>
              <span className="text-foreground"> RAINA</span>
            </div>
            <div className="px-2 py-1 bg-accent/20 border border-accent text-accent text-xs font-mono font-bold rounded">
              18+ ONLY
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="font-mono text-sm hover:text-primary transition-colors uppercase tracking-wider">
              Essentials
            </Link>
            <Link to="/" className="font-mono text-sm hover:text-accent transition-colors uppercase tracking-wider">
              Dark Humor
            </Link>
          </nav>
          
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
