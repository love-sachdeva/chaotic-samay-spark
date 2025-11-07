import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

const ProductDetail = () => {
  const { handle } = useParams();
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(100)
  });

  const product = products?.find(p => p.node.handle === handle);
  const addItem = useCartStore(state => state.addItem);

  // Set default variant when product loads
  if (product && !selectedVariant && product.node.variants.edges.length > 0) {
    setSelectedVariant(product.node.variants.edges[0].node);
  }

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.node.title} locked in your cell`,
      position: "top-center",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center mt-16">
          <h1 className="text-4xl font-bold font-mono mb-4">CELL NOT FOUND</h1>
          <Link to="/">
            <Button className="font-mono uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collection
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <Link to="/">
          <Button variant="outline" className="mb-6 font-mono border-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="aspect-square bg-secondary/20 border-2 border-border overflow-hidden">
            {product.node.images.edges[0]?.node ? (
              <img
                src={product.node.images.edges[0].node.url}
                alt={product.node.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono">
                No image available
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="px-3 py-1 bg-accent text-accent-foreground font-mono text-xs font-bold uppercase tracking-wider">
                Limited Edition
              </span>
            </div>
            
            <h1 className="text-4xl font-bold font-mono mb-4">
              {product.node.title}
            </h1>
            
            <div className="text-3xl font-bold text-primary font-mono mb-6">
              {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
            </div>

            {product.node.description && (
              <div className="mb-6 text-muted-foreground font-mono">
                <p>{product.node.description}</p>
              </div>
            )}

            {/* Variant Selection */}
            {product.node.options.map((option) => (
              <div key={option.name} className="mb-6">
                <label className="block text-sm font-bold font-mono mb-2 uppercase tracking-wider">
                  {option.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const variant = product.node.variants.edges.find(v => 
                      v.node.selectedOptions.some(opt => opt.name === option.name && opt.value === value)
                    )?.node;
                    
                    const isSelected = selectedVariant?.id === variant?.id;
                    
                    return (
                      <Button
                        key={value}
                        variant={isSelected ? "default" : "outline"}
                        className={`font-mono ${isSelected ? '' : 'border-2'}`}
                        onClick={() => variant && setSelectedVariant(variant)}
                      >
                        {value}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}

            <Button 
              size="lg"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
              className="w-full font-mono uppercase tracking-wider text-lg mb-4"
            >
              {selectedVariant?.availableForSale ? 'Lock In Cart' : 'Out of Stock'}
            </Button>

            <div className="border-t border-border pt-6 mt-6 space-y-3 text-sm font-mono text-muted-foreground">
              <p>✓ Dark humor guaranteed</p>
              <p>✓ Limited edition contraband</p>
              <p>✓ Ships from the asylum</p>
              <p>✓ No refunds (you're already committed)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
