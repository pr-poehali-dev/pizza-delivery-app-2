import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
  const [currentPage, setCurrentPage] = useState<'menu' | 'profile' | 'cart' | 'favorites' | 'orders'>('menu');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [cartSheetOpen, setCartSheetOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    house: '',
    apartment: '',
    entrance: '',
    floor: '',
    comment: ''
  });

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

    if (deliveryType === 'delivery' && !deliveryAddress.street) {
      toast({
        title: 'Укажите адрес',
        description: 'Заполните адрес доставки',
        variant: 'destructive'
      });
      return;
    }

    const earnedBonuses = Math.floor(finalTotal * 0.05);
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total: finalTotal,
      bonusesUsed: bonusDiscount,
      bonusesEarned: earnedBonuses,
      date: new Date().toLocaleString('ru-RU'),
      status: 'В обработке',
      deliveryType,
      address: deliveryType === 'delivery' ? `${deliveryAddress.street}, д.${deliveryAddress.house}${deliveryAddress.apartment ? ', кв.' + deliveryAddress.apartment : ''}` : 'Самовывоз'
    };

    setOrders([newOrder, ...orders]);
    setBonusPoints(bonusPoints - bonusDiscount + earnedBonuses);
    setCart([]);
    setUseBonuses(false);
    setCartSheetOpen(false);

    toast({
      title: 'Заказ оформлен!',
      description: `Спасибо за заказ! Вы получили ${earnedBonuses} бонусов`,
    });
  };

  const toggleFavorite = (itemId: number) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
      toast({ title: 'Удалено из избранного' });
    } else {
      setFavorites([...favorites, itemId]);
      toast({ title: 'Добавлено в избранное' });
    }
  };

  const saveAddress = () => {
    if (!deliveryAddress.street || !deliveryAddress.house) {
      toast({
        title: 'Заполните адрес',
        description: 'Укажите улицу и дом',
        variant: 'destructive'
      });
      return;
    }
    setAddressDialogOpen(false);
    toast({ title: 'Адрес сохранен' });
  };

  const renderMenuItem = (item: MenuItem) => (
    <Card key={item.id} className="overflow-hidden transition-shadow">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover"
        />
        {item.popular && (
          <Badge className="absolute top-2 right-2 bg-accent text-xs">
            ХИТ
          </Badge>
        )}
        <button
          onClick={() => toggleFavorite(item.id)}
          className="absolute top-2 left-2 bg-background/80 backdrop-blur rounded-full p-2"
        >
          <Icon
            name="Heart"
            size={18}
            className={favorites.includes(item.id) ? 'fill-accent text-accent' : 'text-foreground'}
          />
        </button>
      </div>
      <div className="p-3">
        <h4 className="text-lg font-bold mb-1">{item.name}</h4>
        <p className="text-xs text-muted-foreground mb-3">
          {item.description}
        </p>
        {item.category === 'pizza' ? (
          <div className="space-y-2">
            {item.price.small && (
              <Button
                onClick={() => addToCart(item, 'small')}
                variant="outline"
                className="w-full justify-between"
                size="sm"
              >
                <span>25 см</span>
                <span className="font-bold">{item.price.small} ₽</span>
              </Button>
            )}
            {item.price.medium && (
              <Button
                onClick={() => addToCart(item, 'medium')}
                className="w-full justify-between"
                size="sm"
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
                size="sm"
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
            size="sm"
          >
            <span>Добавить</span>
            <span className="font-bold">{item.price.medium} ₽</span>
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background pb-20">
      {snowEnabled && <SnowEffect />}
      
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🍕</div>
            <div>
              <h1 className="text-xl font-bold text-primary">PizzaTime</h1>
              <p className="text-xs text-muted-foreground">Доставка за 30 минут</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={deliveryType === 'delivery' ? 'default' : 'outline'}
              onClick={() => {
                setDeliveryType('delivery');
                if (!deliveryAddress.street) {
                  setAddressDialogOpen(true);
                }
              }}
              className="text-xs"
            >
              Доставка
            </Button>
            <Button
              size="sm"
              variant={deliveryType === 'pickup' ? 'default' : 'outline'}
              onClick={() => {
                setDeliveryType('pickup');
                toast({
                  title: 'Самовывоз пока не работает',
                  description: 'Функция в разработке',
                  variant: 'destructive'
                });
              }}
              className="text-xs"
            >
              Самовывоз
            </Button>
          </div>
        </div>

        {deliveryType === 'delivery' && (
          <div className="border-t bg-secondary/20">
            <div className="container mx-auto px-4 py-2">
              <button
                onClick={() => setAddressDialogOpen(true)}
                className="text-sm flex items-center gap-2 w-full text-left"
              >
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="flex-1">
                  {deliveryAddress.street
                    ? `${deliveryAddress.street}, д.${deliveryAddress.house}${deliveryAddress.apartment ? ', кв.' + deliveryAddress.apartment : ''}`
                    : 'Адрес доставки'}
                </span>
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        )}
      </header>

      <Sheet open={cartSheetOpen} onOpenChange={setCartSheetOpen}>
        <SheetContent side="bottom" className="h-[80vh] overflow-y-auto rounded-t-2xl">
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
                    <Label htmlFor="useBonuses" className="cursor-pointer text-sm">
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

      <main className="container mx-auto px-4 py-4">
        {currentPage === 'menu' && (
          <>
            <section className="mb-6 text-center">
              <h2 className="text-2xl font-bold mb-2 text-primary">
                Горячая пицца за 30 минут
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                Свежие ингредиенты, настоящий вкус
              </p>
              <div className="flex gap-2 justify-center">
                <Badge variant="secondary" className="px-3 py-1 text-xs">
                  <Icon name="Clock" size={14} className="mr-1" />
                  30 мин
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-xs">
                  <Icon name="Award" size={14} className="mr-1" />
                  Бонусы 5%
                </Badge>
              </div>
            </section>

            {menuItems.filter(item => item.popular).length > 0 && (
              <section className="mb-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Icon name="Flame" className="text-accent" />
                  Популярное
                </h3>
                <div className="grid gap-4">
                  {menuItems.filter(item => item.popular).map(renderMenuItem)}
                </div>
              </section>
            )}

            <section>
              <h3 className="text-xl font-bold mb-3">Меню</h3>
              <Tabs defaultValue="pizza" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="pizza" className="text-xs">🍕</TabsTrigger>
                  <TabsTrigger value="drinks" className="text-xs">🥤</TabsTrigger>
                  <TabsTrigger value="snacks" className="text-xs">🍟</TabsTrigger>
                  <TabsTrigger value="combo" className="text-xs">🎁</TabsTrigger>
                </TabsList>

                {['pizza', 'drinks', 'snacks', 'combo'].map((category) => (
                  <TabsContent key={category} value={category}>
                    <div className="grid gap-4">
                      {menuItems.filter(item => item.category === category).map(renderMenuItem)}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          </>
        )}

        {currentPage === 'profile' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Профиль</h2>
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-3xl">
                  👤
                </div>
                <div>
                  <h3 className="text-xl font-bold">Гость</h3>
                  <p className="text-sm text-muted-foreground">guest@pizzatime.ru</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-accent/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Award" size={24} className="text-accent" />
                    <span className="font-semibold">Бонусы</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{bonusPoints}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setPizzaBuilderOpen(true)}
                >
                  <Icon name="ChefHat" size={18} className="mr-2" />
                  Конструктор пиццы
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/admin')}
                >
                  <Icon name="Settings" size={18} className="mr-2" />
                  Админ-панель
                </Button>
              </div>
            </Card>
          </div>
        )}

        {currentPage === 'favorites' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Избранное</h2>
            {favorites.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="Heart" size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Избранных товаров пока нет</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {menuItems.filter(item => favorites.includes(item.id)).map((item) => (
                  <Card key={item.id}>
                    <div className="flex gap-4 p-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                        <Button size="sm" onClick={() => addToCart(item)}>
                          Добавить • {item.price.medium} ₽
                        </Button>
                      </div>
                      <button onClick={() => toggleFavorite(item.id)}>
                        <Icon name="Heart" size={20} className="fill-accent text-accent" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {currentPage === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Мои заказы</h2>
            {orders.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">У вас пока нет заказов</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold">Заказ #{order.id}</h4>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <Badge variant="secondary">{order.status}</Badge>
                    </div>
                    <div className="space-y-2 mb-3">
                      {order.items.map((item: CartItem, idx: number) => (
                        <div key={idx} className="text-sm flex justify-between">
                          <span>{item.name} x{item.quantity}</span>
                          <span className="text-muted-foreground">
                            {((item.selectedSize ? item.price[item.selectedSize] || 0 : item.price.medium || 0) * item.quantity)} ₽
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <div className="text-sm">
                        <Icon name="MapPin" size={14} className="inline mr-1" />
                        {order.address}
                      </div>
                      <div className="font-bold">{order.total} ₽</div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-5 gap-1 py-2">
            <button
              onClick={() => setCurrentPage('menu')}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
                currentPage === 'menu' ? 'text-primary bg-primary/10' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Home" size={22} />
              <span className="text-xs">Меню</span>
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
                currentPage === 'profile' ? 'text-primary bg-primary/10' : 'text-muted-foreground'
              }`}
            >
              <Icon name="User" size={22} />
              <span className="text-xs">Профиль</span>
            </button>
            <button
              onClick={() => setCartSheetOpen(true)}
              className="flex flex-col items-center gap-1 py-2 rounded-lg text-primary relative -mt-4"
            >
              <div className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg">
                <Icon name="ShoppingCart" size={24} />
                {cart.length > 0 && (
                  <Badge className="absolute top-0 right-0 h-6 w-6 flex items-center justify-center p-0 bg-accent">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </div>
              <span className="text-xs mt-1">Корзина</span>
            </button>
            <button
              onClick={() => setCurrentPage('favorites')}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
                currentPage === 'favorites' ? 'text-primary bg-primary/10' : 'text-muted-foreground'
              }`}
            >
              <div className="relative">
                <Icon name="Heart" size={22} />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </div>
              <span className="text-xs">Избранное</span>
            </button>
            <button
              onClick={() => setCurrentPage('orders')}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
                currentPage === 'orders' ? 'text-primary bg-primary/10' : 'text-muted-foreground'
              }`}
            >
              <div className="relative">
                <Icon name="ShoppingBag" size={22} />
                {orders.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {orders.length}
                  </Badge>
                )}
              </div>
              <span className="text-xs">Заказы</span>
            </button>
          </div>
        </div>
      </nav>

      <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Адрес доставки</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="street">Улица *</Label>
              <Input
                id="street"
                value={deliveryAddress.street}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                placeholder="Ленина"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="house">Дом *</Label>
                <Input
                  id="house"
                  value={deliveryAddress.house}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, house: e.target.value })}
                  placeholder="12"
                />
              </div>
              <div>
                <Label htmlFor="apartment">Квартира</Label>
                <Input
                  id="apartment"
                  value={deliveryAddress.apartment}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, apartment: e.target.value })}
                  placeholder="45"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="entrance">Подъезд</Label>
                <Input
                  id="entrance"
                  value={deliveryAddress.entrance}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, entrance: e.target.value })}
                  placeholder="2"
                />
              </div>
              <div>
                <Label htmlFor="floor">Этаж</Label>
                <Input
                  id="floor"
                  value={deliveryAddress.floor}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, floor: e.target.value })}
                  placeholder="3"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="comment">Комментарий</Label>
              <Input
                id="comment"
                value={deliveryAddress.comment}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, comment: e.target.value })}
                placeholder="Домофон не работает"
              />
            </div>
            <Button onClick={saveAddress} className="w-full">
              Сохранить адрес
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
              <div className="grid grid-cols-2 gap-3">
                {ingredients.map((ingredient) => (
                  <Button
                    key={ingredient.name}
                    variant={selectedIngredients.includes(ingredient.name) ? 'default' : 'outline'}
                    onClick={() => toggleIngredient(ingredient.name)}
                    className="flex flex-col h-auto py-3"
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
