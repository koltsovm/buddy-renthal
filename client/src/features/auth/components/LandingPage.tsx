import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Братский прокат
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Совместное владение техникой: мотобайки, лодки, квадроциклы, снегоходы
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Добро пожаловать!</h2>
            <p className="text-gray-700 mb-4">
              Это приложение для организации совместного использования редко эксплуатируемой техники
              внутри закрытой группы собственников.
            </p>
            <p className="text-gray-700 mb-6">
              Основные возможности:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Регистрация и авторизация пользователей</li>
              <li>Создание групп собственников</li>
              <li>Каталог техники</li>
              <li>Календарь бронирований</li>
              <li>Учёт мото-часов</li>
              <li>Разделение расходов</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Войти
            </button>
            <button className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}