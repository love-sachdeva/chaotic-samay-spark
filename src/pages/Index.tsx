import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-pleasure.jpg";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(20)
  });

  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (product: any) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.node.title} locked in your cell`,
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden grungy-texture mt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-block px-4 py-2 bg-accent/20 border border-accent text-accent font-mono font-bold text-sm mb-4 uppercase tracking-wider">
            🔞 FOR ADULTS WHO GET THE JOKE 🔞
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6 text-glow">
            SAMAY RAINA'S
            <br />
            <span className="text-primary">PLEASURE COLLECTION</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-mono mb-4">
            Dark humor. Darker nights. Even darker protection.
          </p>
          <p className="text-lg text-accent font-mono mb-8">
            "Mummy kaisi hai?" - Better if you use protection 😏
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="font-mono uppercase tracking-wider bg-primary hover:bg-primary/90">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="font-mono uppercase tracking-wider border-2 border-accent text-accent hover:bg-accent/10">
              Why So Serious?
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-mono mb-4">
            <span className="text-primary">ESSENTIAL</span> COLLECTION
          </h2>
          <p className="text-muted-foreground font-mono mb-2">
            For weak independent women and true gentlemen alike
          </p>
          <p className="text-accent font-mono text-sm">
            ⚡ Hearing ka samay ho gya hai - Shop before it's too late ⚡
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.node.id} className="group overflow-hidden border-2 hover:border-primary transition-all duration-300">
                <Link to={`/product/${product.node.handle}`}>
                  <div className="aspect-square overflow-hidden bg-secondary/20">
                    {product.node.images.edges[0]?.node ? (
                      <img
                        src={product.node.images.edges[0].node.url}
                        alt={product.node.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/product/${product.node.handle}`}>
                    <h3 className="font-bold font-mono mb-2 group-hover:text-primary transition-colors">
                      {product.node.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary font-mono">
                      {product.node.priceRange.minVariantPrice.currencyCode} {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                    </span>
                    <Button 
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="font-mono uppercase text-xs tracking-wider"
                    >
                      Lock In
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground font-mono mb-4">
              Bachao Bachaao! No products yet.
            </p>
            <p className="text-muted-foreground font-mono mb-2">
              Tell me which products to add from this collection:
            </p>
            <div className="text-accent font-mono text-sm space-y-1 max-w-md mx-auto">
              <p>• Ae moorkh, apni chavi sudhaar</p>
              <p>• Mummy kaisi hai??</p>
              <p>• Weak independent women</p>
              <p>• Balraj is a true gentleman</p>
              <p>• National Institute of fuckAll talent</p>
              <p>• Kashmiri hu, patthar khaata hu</p>
              <p>• Bachao Bachaao</p>
              <p>• Hearing ka samay ho gya hai</p>
              <p>• Dark guy, Darker jokes</p>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8 grungy-texture">
        <div className="container mx-auto px-4 text-center space-y-2">
          <p className="text-muted-foreground font-mono text-sm">
            © 2025 SAMAY RAINA • DARK GUY, DARKER JOKES • FOR ADULTS ONLY (18+)
          </p>
          <p className="text-muted-foreground/60 font-mono text-xs">
            Stay safe. Stay protected. Stay funny. 😏
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
