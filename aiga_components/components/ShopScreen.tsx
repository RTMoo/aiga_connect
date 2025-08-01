import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Grid, List, ShoppingCart, Heart } from "lucide-react";
import { UserRole, Screen } from "./AppNavigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ShopScreenProps {
  userRole: UserRole | "";
  onNavigate: (screen: Screen) => void;
}

export function ShopScreen({ userRole, onNavigate }: ShopScreenProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [category, setCategory] = useState("all");

  const categories = [
    { id: "all", label: "Все товары" },
    { id: "clothing", label: "Одежда" },
    { id: "equipment", label: "Экипировка" },
    { id: "accessories", label: "Аксессуары" }
  ];

  const products = [
    {
      id: 1,
      name: "Рашгард AIGA Connect",
      price: 15000,
      originalPrice: 18000,
      category: "clothing",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=300&h=300",
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      name: "Шорты для грэпплинга Премиум",
      price: 12000,
      category: "clothing",
      image: "https://images.unsplash.com/photo-1506629905607-aeb3dbeaa4e0?auto=format&fit=crop&w=300&h=300",
      rating: 4.7,
      inStock: true
    },
    {
      id: 3,
      name: "Пояс для BJJ",
      price: 8000,
      category: "equipment",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&h=300",
      rating: 4.9,
      inStock: false
    },
    {
      id: 4,
      name: "Толстовка AIGA",
      price: 20000,
      category: "clothing",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&h=300",
      rating: 4.6,
      inStock: true
    },
    {
      id: 5,
      name: "Перчатки для грэпплинга",
      price: 6000,
      category: "equipment",
      image: "https://images.unsplash.com/photo-1609205433001-af8e1b9b5db8?auto=format&fit=crop&w=300&h=300",
      rating: 4.5,
      inStock: true
    },
    {
      id: 6,
      name: "Бутылка для воды",
      price: 3000,
      category: "accessories",
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=300&h=300",
      rating: 4.4,
      inStock: true
    }
  ];

  const filteredProducts = category === "all" 
    ? products 
    : products.filter(product => product.category === category);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('kk-KZ', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0
    }).format(price);
  };

  const renderGridView = () => (
    <div className="grid grid-cols-2 gap-4">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="p-4 bg-card border-border">
          <div className="aspect-square mb-3 relative overflow-hidden rounded-lg">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge className="bg-red-500 text-white">Нет в наличии</Badge>
              </div>
            )}
          </div>
          <h3 className="text-white text-sm mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <span className="text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground text-xs line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-red-400"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          <Button
            size="sm"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.inStock ? "В корзину" : "Нет в наличии"}
          </Button>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="p-4 bg-card border-border">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 relative overflow-hidden rounded-lg">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-red-400 text-xs">Нет</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1">{product.name}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-primary">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-muted-foreground text-sm line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-sm">★ {product.rating}</span>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    product.inStock 
                      ? "text-green-400 border-green-400" 
                      : "text-red-400 border-red-400"
                  }`}
                >
                  {product.inStock ? "В наличии" : "Нет в наличии"}
                </Badge>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("home")}
              className="mr-4 text-muted-foreground hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl text-white">Магазин AIGA</h1>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={`border-border ${
                viewMode === "grid" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-white"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`border-border ${
                viewMode === "list" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-white"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={category === cat.id ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                category === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-white"
              }`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="flex-1 px-6 pb-6">
        {viewMode === "grid" ? renderGridView() : renderListView()}
      </div>
    </div>
  );
}