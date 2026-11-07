import { useNavigate } from "react-router-dom";
import { Map, Clock, DollarSign, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Map,
    title: "Календарь бронирований",
    description:
      "Выбирайте дату, время и единицу техники в общем календаре группы.",
  },
  {
    icon: Clock,
    title: "Учёт мото-часов",
    description:
      "Фиксируйте фактически отработанные часы за каждым участником.",
  },
  {
    icon: DollarSign,
    title: "Разделение расходов",
    description:
      "Вводите затраты на топливо, обслуживание, хранение и делите их между участниками.",
  },
  {
    icon: History,
    title: "История использования",
    description:
      "Смотрите лог: кто, когда, какую технику и сколько времени использовал.",
  },
];

const steps = [
  {
    number: "01",
    title: "Создайте группу",
    description:
      "Зарегистрируйтесь, создайте группу собственников и пригласите участников по ссылке.",
  },
  {
    number: "02",
    title: "Добавьте технику",
    description:
      "Занесите мотоциклы, лодки, квадроциклы и другую технику в общий каталог группы.",
  },
  {
    number: "03",
    title: "Бронируйте и делите расходы",
    description:
      "Бронируйте слот в календаре, фиксируйте мото-часы и разделяйте затраты между участниками.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="text-xl font-bold tracking-tight">Братский прокат</span>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" variant="ghost" onClick={() => navigate("/login")}>
              Войти
            </Button>
            <Button size="sm">Создать группу</Button>
          </div>
        </div>
      </nav>

      <main>
        <section className="py-24 px-6 overflow-hidden">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 max-w-lg">
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Совместное владение техникой
                  <br />
                  без лишних хлопот
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Бронируйте мотоциклы, лодки и квадроциклы в общем календаре,
                  ведите учёт мото-часов и делите расходы внутри закрытой группы
                  собственников.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate("/login")}>
                    Войти
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => navigate("/register")}
                  >
                    Регистрация
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block">
                <Card className="p-8">
                  <CardHeader>
                    <CardTitle className="text-left">Ваша группа</CardTitle>
                    <CardDescription className="text-left">
                      Управляйте техникой и бронями вместе с близкими
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4 text-sm">
                      <Map className="w-5 h-5 text-muted-foreground" />
                      <span>Участники группы</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                        <span className="text-[10px]">+</span>
                      </div>
                      <span>Техника в каталоге</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Активные бронирования</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 border-y border-border">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl font-semibold tracking-tight">Возможности</h2>
              <p className="mt-4 text-muted-foreground">
                всё необходимое для совместного использования техники
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground mb-4">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Как это работает
                </h2>
                <div className="space-y-6">
                  {steps.map((step) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block">
                <Card className="p-0 overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-muted-foreground">
                      Здесь будет превью интерфейса
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              B
            </div>
            <span className="font-semibold">Братский прокат</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Совместное владение техникой для закрытых групп собственников
          </p>
        </div>
      </footer>
    </div>
  );
}
