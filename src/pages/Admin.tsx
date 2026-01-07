import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
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

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
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
    }
  ]);

  const [snowEnabled, setSnowEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'pizza',
    priceSmall: '',
    priceMedium: '',
    priceLarge: '',
    image: '',
    popular: false
  });

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast({
        title: 'Вход выполнен',
        description: 'Добро пожаловать в админ-панель'
      });
    } else {
      toast({
        title: 'Ошибка',
        description: 'Неверный пароль',
        variant: 'destructive'
      });
    }
  };

  const handleSnowToggle = (enabled: boolean) => {
    setSnowEnabled(enabled);
    localStorage.setItem('snowEnabled', enabled.toString());
    toast({
      title: enabled ? 'Снег включен ❄️' : 'Снег выключен',
      description: enabled ? 'Зимний эффект активирован' : 'Зимний эффект деактивирован'
    });
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    setDarkMode(enabled);
    document.documentElement.classList.toggle('dark', enabled);
    localStorage.setItem('darkMode', enabled.toString());
    toast({
      title: enabled ? 'Темная тема' : 'Светлая тема',
      description: 'Тема успешно изменена'
    });
  };

  const handleAddItem = () => {
    setCurrentItem(null);
    setFormData({
      name: '',
      description: '',
      category: 'pizza',
      priceSmall: '',
      priceMedium: '',
      priceLarge: '',
      image: 'https://cdn.poehali.dev/projects/b6652ca8-65ba-4e1d-bf82-731f9c3c35ae/files/13ff8a53-13cf-480c-82b0-48021033da24.jpg',
      popular: false
    });
    setEditDialogOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setCurrentItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      priceSmall: item.price.small?.toString() || '',
      priceMedium: item.price.medium?.toString() || '',
      priceLarge: item.price.large?.toString() || '',
      image: item.image,
      popular: item.popular || false
    });
    setEditDialogOpen(true);
  };

  const handleSaveItem = () => {
    const newItem: MenuItem = {
      id: currentItem?.id || Date.now(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: {
        ...(formData.priceSmall && { small: parseInt(formData.priceSmall) }),
        ...(formData.priceMedium && { medium: parseInt(formData.priceMedium) }),
        ...(formData.priceLarge && { large: parseInt(formData.priceLarge) })
      },
      image: formData.image,
      popular: formData.popular
    };

    if (currentItem) {
      setMenuItems(menuItems.map(item => item.id === currentItem.id ? newItem : item));
      toast({
        title: 'Товар обновлен',
        description: `${newItem.name} успешно обновлен`
      });
    } else {
      setMenuItems([...menuItems, newItem]);
      toast({
        title: 'Товар добавлен',
        description: `${newItem.name} успешно добавлен в меню`
      });
    }

    setEditDialogOpen(false);
  };

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast({
      title: 'Товар удален',
      description: 'Товар успешно удален из меню'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary/30 to-background">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="text-2xl font-bold">Админ-панель</h1>
            <p className="text-muted-foreground">Введите пароль для входа</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="admin123"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Войти
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" className="w-full">
              Вернуться на главную
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">⚙️</div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Админ-панель</h1>
              <p className="text-xs text-muted-foreground">Управление приложением</p>
            </div>
          </div>

          <Button onClick={() => navigate('/')} variant="outline">
            <Icon name="Home" size={18} className="mr-2" />
            На главную
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">❄️</div>
              <div>
                <h3 className="font-bold">Зимний эффект</h3>
                <p className="text-sm text-muted-foreground">Падающий снег</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Снег на сайте</span>
              <Switch checked={snowEnabled} onCheckedChange={handleSnowToggle} />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">🌙</div>
              <div>
                <h3 className="font-bold">Тема оформления</h3>
                <p className="text-sm text-muted-foreground">Светлая / Темная</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Темная тема</span>
              <Switch checked={darkMode} onCheckedChange={handleDarkModeToggle} />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">📊</div>
              <div>
                <h3 className="font-bold">Статистика</h3>
                <p className="text-sm text-muted-foreground">Товаров в меню</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-primary">{menuItems.length}</div>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Управление товарами</h2>
          <Button onClick={handleAddItem}>
            <Icon name="Plus" size={18} className="mr-2" />
            Добавить товар
          </Button>
        </div>

        <div className="grid gap-4">
          {menuItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-secondary px-2 py-1 rounded">
                          {item.category === 'pizza' && '🍕 Пицца'}
                          {item.category === 'drinks' && '🥤 Напитки'}
                          {item.category === 'snacks' && '🍟 Закуски'}
                          {item.category === 'combo' && '🎁 Комбо'}
                        </span>
                        {item.popular && (
                          <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                            ⭐ Популярное
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditItem(item)}>
                        <Icon name="Pencil" size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3">
                    {item.price.small && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">25см:</span>{' '}
                        <span className="font-semibold">{item.price.small}₽</span>
                      </div>
                    )}
                    {item.price.medium && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">30см:</span>{' '}
                        <span className="font-semibold">{item.price.medium}₽</span>
                      </div>
                    )}
                    {item.price.large && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">35см:</span>{' '}
                        <span className="font-semibold">{item.price.large}₽</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentItem ? 'Редактировать товар' : 'Добавить товар'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Пепперони"
              />
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Классическая пицца с пепперони и моцареллой"
              />
            </div>

            <div>
              <Label htmlFor="category">Категория</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pizza">🍕 Пицца</SelectItem>
                  <SelectItem value="drinks">🥤 Напитки</SelectItem>
                  <SelectItem value="snacks">🍟 Закуски</SelectItem>
                  <SelectItem value="combo">🎁 Комбо</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="priceSmall">Цена 25см</Label>
                <Input
                  id="priceSmall"
                  type="number"
                  value={formData.priceSmall}
                  onChange={(e) => setFormData({ ...formData, priceSmall: e.target.value })}
                  placeholder="399"
                />
              </div>
              <div>
                <Label htmlFor="priceMedium">Цена 30см</Label>
                <Input
                  id="priceMedium"
                  type="number"
                  value={formData.priceMedium}
                  onChange={(e) => setFormData({ ...formData, priceMedium: e.target.value })}
                  placeholder="599"
                />
              </div>
              <div>
                <Label htmlFor="priceLarge">Цена 35см</Label>
                <Input
                  id="priceLarge"
                  type="number"
                  value={formData.priceLarge}
                  onChange={(e) => setFormData({ ...formData, priceLarge: e.target.value })}
                  placeholder="799"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">URL изображения</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="popular"
                checked={formData.popular}
                onCheckedChange={(checked) => setFormData({ ...formData, popular: checked })}
              />
              <Label htmlFor="popular">Отметить как популярное</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveItem} className="flex-1">
                {currentItem ? 'Сохранить' : 'Добавить'}
              </Button>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
