import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import SnowEffect from '@/components/SnowEffect';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: { small?: number; medium?: number; large?: number };
  image: string;
  category: string;
  popular?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
  selectedSize?: 'small' | 'medium' | 'large';
}

const Index = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bonusPoints, setBonusPoints] = useState(450);
  const [useBonuses, setUseBonuses] = useState(false);
  const [pizzaBuilderOpen, setPizzaBuilderOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['Сыр моцарелла', 'Томатный соус']);
  const [pizzaSize, setPizzaSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [snowEnabled, setSnowEnabled] = useState(false);

  useEffect(() => {
    const savedSnow = localStorage.getItem('snowEnabled');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedSnow === 'true') {
      setSnowEnabled(true);
    }
    
    if (savedDarkMode === 'true') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Пепперони',
      description: 'Классическая пицца с пепперони и моцареллой',
      price: { small: 399, medium: 599, large: 799 },
      image: 'https://cdn.poehali.dev/projects/b6652ca8-65ba-4e1d-bf82-731f9c3c35ae/files/13ff8a53-13cf-480c-82b0-48021033da24.jpg',
      category: 'pizza',
      popular: true
    },
    {
      id: 2,
      name: 'Маргарита',
      description: 'Свежие томаты, моцарелла и базилик',
      price: { small: 349, medium: 549, large: 749 },
      image: 'https://cdn.poehali.dev/projects/b6652ca8-65ba-4e1d-bf82-731f9c3c35ae/files/d62b6e38-c894-42d2-b0ce-46a7b36e66ba.jpg',
      category: 'pizza',
      popular: true
    },
    {
      id: 3,
      name: 'Мясная',
      description: 'Пепперони, колбаски, бекон и ветчина',
      price: { small: 449, medium: 649, large: 849 },
      image: 'https://cdn.poehali.dev/projects/b6652ca8-65ba-4e1d-bf82-731f9c3c35ae/files/febea084-ef2a-4993-b0fd-e13729f2aa72.jpg',
      category: 'pizza',
      popular: true
    },
    {
      id: 4,
      name: 'Четыре сыра',
      description: 'Моцарелла, пармезан, дор блю и чеддер',
      price: { small: 429, medium: 629, large: 829 },
      image: 'https://cdn.poehali.dev/projects/b6652ca8-65ba-4e1d-bf82-731f9c3c35ae/files/13ff8a53-13cf-480c-82b0-48021033da24.jpg',
      category: 'pizza'
    },
    {
      id: 5,
      name: 'Гавайская',
      description: 'Ветчина, ананасы и моцарелла',
      price: { small: 399, medium: 599, large: 799 },
      image: 'https://cdn.poehali.dev/projects/b6652ca8-65ba-4e1d-bf82-731f9c3c35ae/files/d62b6e38-c894-42d2-b0ce-46a7b36e66ba.jpg',
      category: 'pizza'
    },
    {
      id: 6,
      name: 'Кока-Кола',
      description: '0.5л',
      price: { medium: 99 },
      image: 'https://cdn.poehali.dev/projects/b6652ca8-65ba-4e1d-bf82-731f9c3c35ae/files/13ff8a53-13cf-480c-82b0-48021033da24.jpg',
      category: 'drinks'
    },
    {
      id: 7,
      name: 'Сырные палочки',
      description: 'С моцареллой и соусом',
      price: { medium: 249 },
      image: 'https://cdn.poehali.dev/projects/b6652ca8-65ba-4e1d-bf82-731f9c3c35ae/files/febea084-ef2a-4993-b0fd-e13729f2aa72.jpg',
      category: 'snacks'
    },
    {
      id: 8,
      name: 'Комбо "Вечер"',
      description: '2 пиццы средние + 2 напитка',
      price: { medium: 1299 },
      image: 'https://cdn.poehali.dev/projects/b6652ca8-65ba-4e1d-bf82-731f9c3c35ae/files/d62b6e38-c894-42d2-b0ce-46a7b36e66ba.jpg',
      category: 'combo',
      popular: true
    }
  ];

  const ingredients = [
    { name: 'Томатный соус', price: 49 },
    { name: 'Сыр моцарелла', price: 99 },
    { name: 'Пепперони', price: 129 },
    { name: 'Ветчина', price: 99 },
    { name: 'Шампиньоны', price: 79 },
    { name: 'Болгарский перец', price: 69 },
    { name: 'Оливки', price: 89 },
    { name: 'Томаты', price: 69 },
    { name: 'Лук', price: 49 },
    { name: 'Бекон', price: 129 },
    { name: 'Курица', price: 109 },
    { name: 'Ананасы', price: 89 }
  ];

  const addToCart = (item: MenuItem, size: 'small' | 'medium' | 'large' = 'medium') => {
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.selectedSize === size
    );

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id && cartItem.selectedSize === size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1, selectedSize: size }]);
    }

    toast({
      title: 'Добавлено в корзину',
      description: `${item.name} добавлена в корзину`,
    });
  };

  const removeFromCart = (itemId: number, size?: string) => {
    setCart(cart.filter((item) => !(item.id === itemId && item.selectedSize === size)));
  };

  const updateQuantity = (itemId: number, size: string | undefined, change: number) => {
    setCart(
      cart.map((item) =>
        item.id === itemId && item.selectedSize === size
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.selectedSize ? item.price[item.selectedSize] || 0 : item.price.medium || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const calculateCustomPizzaPrice = () => {
    const basePrice = pizzaSize === 'small' ? 199 : pizzaSize === 'medium' ? 299 : 399;
    const ingredientsPrice = selectedIngredients.reduce((total, ingName) => {
      const ing = ingredients.find(i => i.name === ingName);
      return total + (ing?.price || 0);
    }, 0);
    return basePrice + ingredientsPrice;
  };

  const addCustomPizza = () => {
    const customPizza: MenuItem = {
      id: Date.now(),
      name: 'Своя пицца',
      description: selectedIngredients.join(', '),
      price: { [pizzaSize]: calculateCustomPizzaPrice() },
      image: 'https://cdn.poehali.dev/projects/b6652ca8-65ba-4e1d-bf82-731f9c3c35ae/files/13ff8a53-13cf-480c-82b0-48021033da24.jpg',
      category: 'pizza'
    };
    addToCart(customPizza, pizzaSize);
    setPizzaBuilderOpen(false);
    setSelectedIngredients(['Сыр моцарелла', 'Томатный соус']);
  };

  const toggleIngredient = (ingredientName: string) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredientName));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    }
  };

  const total = calculateTotal();
  const bonusDiscount = useBonuses ? Math.min(bonusPoints, total * 0.3) : 0;
  const finalTotal = total - bonusDiscount;

  const handleOrder = () => {
    if (cart.length === 0) {
      toast({
        title: 'Корзина пуста',
        description: 'Добавьте товары в корзину',
        variant: 'destructive'
      });
      return;
    }

    const earnedBonuses = Math.floor(finalTotal * 0.05);
    setBonusPoints(bonusPoints - bonusDiscount + earnedBonuses);
    setCart([]);
    setUseBonuses(false);

    toast({
      title: 'Заказ оформлен!',
      description: `Спасибо за заказ! Вы получили ${earnedBonuses} бонусов`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      {snowEnabled && <SnowEffect />}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🍕</div>
            <div>
              <h1 className="text-2xl font-bold text-primary">PizzaTime</h1>
              <p className="text-xs text-muted-foreground">Доставка за 30 минут</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin')}
              className="gap-2"
            >
              <Icon name="Settings" size={18} />
              <span className="hidden sm:inline">Админ</span>
            </Button>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setPizzaBuilderOpen(true)}
            >
              <Icon name="ChefHat" size={18} />
              <span className="hidden sm:inline">Конструктор</span>
            </Button>

            <div className="hidden sm:flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
              <Icon name="Award" size={18} className="text-accent" />
              <span className="font-semibold">{bonusPoints} бонусов</span>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="relative gap-2">
                  <Icon name="ShoppingCart" size={18} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                  <span className="hidden sm:inline">Корзина</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Ваша корзина</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <Card key={`${item.id}-${item.selectedSize}`} className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.selectedSize === 'small' && '25 см'}
                                {item.selectedSize === 'medium' && '30 см'}
                                {item.selectedSize === 'large' && '35 см'}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                                >
                                  -
                                </Button>
                                <span className="font-semibold">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                                >
                                  +
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeFromCart(item.id, item.selectedSize)}
                                  className="ml-auto text-destructive"
                                >
                                  <Icon name="Trash2" size={16} />
                                </Button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">
                                {((item.selectedSize ? item.price[item.selectedSize] || 0 : item.price.medium || 0) * item.quantity)} ₽
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}

                      <Card className="p-4 bg-secondary/20">
                        <div className="flex items-center justify-between mb-2">
                          <span>Сумма заказа:</span>
                          <span className="font-semibold">{total} ₽</span>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            id="useBonuses"
                            checked={useBonuses}
                            onChange={(e) => setUseBonuses(e.target.checked)}
                            className="rounded"
                          />
                          <Label htmlFor="useBonuses" className="cursor-pointer">
                            Использовать бонусы (до {Math.min(bonusPoints, Math.floor(total * 0.3))} ₽)
                          </Label>
                        </div>

                        {bonusDiscount > 0 && (
                          <div className="flex items-center justify-between text-accent mb-2">
                            <span>Скидка бонусами:</span>
                            <span className="font-semibold">-{bonusDiscount} ₽</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-lg font-bold border-t pt-2 mt-2">
                          <span>Итого:</span>
                          <span>{finalTotal} ₽</span>
                        </div>

                        <Button onClick={handleOrder} className="w-full mt-4" size="lg">
                          Оформить заказ
                        </Button>
                      </Card>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-primary">
            Горячая пицца за 30 минут
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Свежие ингредиенты, настоящий вкус и быстрая доставка
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge variant="secondary" className="px-4 py-2 text-base">
              <Icon name="Clock" size={16} className="mr-2" />
              Доставка 30 мин
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-base">
              <Icon name="Award" size={16} className="mr-2" />
              Бонусы 5%
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-base">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Свежие продукты
            </Badge>
          </div>
        </section>

        {menuItems.filter(item => item.popular).length > 0 && (
          <section className="mb-12 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Flame" className="text-accent" />
              Популярное
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems
                .filter((item) => item.popular)
                .map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in"
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-accent">
                        ХИТ
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h4 className="text-xl font-bold mb-2">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      {item.category === 'pizza' ? (
                        <div className="space-y-2">
                          {item.price.small && (
                            <Button
                              onClick={() => addToCart(item, 'small')}
                              variant="outline"
                              className="w-full justify-between"
                            >
                              <span>25 см</span>
                              <span className="font-bold">{item.price.small} ₽</span>
                            </Button>
                          )}
                          {item.price.medium && (
                            <Button
                              onClick={() => addToCart(item, 'medium')}
                              className="w-full justify-between"
                            >
                              <span>30 см</span>
                              <span className="font-bold">{item.price.medium} ₽</span>
                            </Button>
                          )}
                          {item.price.large && (
                            <Button
                              onClick={() => addToCart(item, 'large')}
                              variant="outline"
                              className="w-full justify-between"
                            >
                              <span>35 см</span>
                              <span className="font-bold">{item.price.large} ₽</span>
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Button
                          onClick={() => addToCart(item)}
                          className="w-full justify-between"
                        >
                          <span>Добавить</span>
                          <span className="font-bold">{item.price.medium} ₽</span>
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
            </div>
          </section>
        )}

        <section className="animate-fade-in">
          <h3 className="text-2xl font-bold mb-6">Меню</h3>
          <Tabs defaultValue="pizza" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="pizza">🍕 Пицца</TabsTrigger>
              <TabsTrigger value="drinks">🥤 Напитки</TabsTrigger>
              <TabsTrigger value="snacks">🍟 Закуски</TabsTrigger>
              <TabsTrigger value="combo">🎁 Комбо</TabsTrigger>
            </TabsList>

            {['pizza', 'drinks', 'snacks', 'combo'].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="text-xl font-bold mb-2">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            {item.description}
                          </p>
                          {category === 'pizza' ? (
                            <div className="space-y-2">
                              {item.price.small && (
                                <Button
                                  onClick={() => addToCart(item, 'small')}
                                  variant="outline"
                                  className="w-full justify-between"
                                >
                                  <span>25 см</span>
                                  <span className="font-bold">{item.price.small} ₽</span>
                                </Button>
                              )}
                              {item.price.medium && (
                                <Button
                                  onClick={() => addToCart(item, 'medium')}
                                  className="w-full justify-between"
                                >
                                  <span>30 см</span>
                                  <span className="font-bold">{item.price.medium} ₽</span>
                                </Button>
                              )}
                              {item.price.large && (
                                <Button
                                  onClick={() => addToCart(item, 'large')}
                                  variant="outline"
                                  className="w-full justify-between"
                                >
                                  <span>35 см</span>
                                  <span className="font-bold">{item.price.large} ₽</span>
                                </Button>
                              )}
                            </div>
                          ) : (
                            <Button
                              onClick={() => addToCart(item)}
                              className="w-full justify-between"
                            >
                              <span>Добавить</span>
                              <span className="font-bold">{item.price.medium} ₽</span>
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>

      <Dialog open={pizzaBuilderOpen} onOpenChange={setPizzaBuilderOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Конструктор пиццы</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div>
              <Label className="text-base font-semibold mb-3 block">Выберите размер</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { size: 'small' as const, label: '25 см', price: 199 },
                  { size: 'medium' as const, label: '30 см', price: 299 },
                  { size: 'large' as const, label: '35 см', price: 399 }
                ].map(({ size, label, price }) => (
                  <Button
                    key={size}
                    variant={pizzaSize === size ? 'default' : 'outline'}
                    onClick={() => setPizzaSize(size)}
                    className="flex flex-col h-auto py-4"
                  >
                    <span className="font-bold">{label}</span>
                    <span className="text-sm">{price} ₽</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">
                Выберите ингредиенты ({selectedIngredients.length})
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ingredients.map((ingredient) => (
                  <Button
                    key={ingredient.name}
                    variant={selectedIngredients.includes(ingredient.name) ? 'default' : 'outline'}
                    onClick={() => toggleIngredient(ingredient.name)}
                    className="flex flex-col h-auto py-3 text-left"
                  >
                    <span className="font-semibold text-sm">{ingredient.name}</span>
                    <span className="text-xs">+{ingredient.price} ₽</span>
                  </Button>
                ))}
              </div>
            </div>

            <Card className="p-4 bg-secondary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Ваша пицца:</span>
                <span className="text-lg font-bold text-primary">{calculateCustomPizzaPrice()} ₽</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedIngredients.join(', ')}
              </p>
            </Card>

            <Button onClick={addCustomPizza} className="w-full" size="lg">
              Добавить в корзину
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;