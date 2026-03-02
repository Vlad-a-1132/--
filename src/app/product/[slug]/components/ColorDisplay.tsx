'use client';

// Функция для получения CSS цвета по названию
const getColorValue = (colorName: string): string => {
  const colorMap: { [key: string]: string } = {
    // Основные цвета
    'красный': '#ef4444',
    'синий': '#3b82f6',
    'зеленый': '#10b981',
    'желтый': '#f59e0b',
    'оранжевый': '#f97316',
    'фиолетовый': '#8b5cf6',
    'розовый': '#ec4899',
    'коричневый': '#a16207',
    'черный': '#000000',
    'белый': '#ffffff',
    'серый': '#6b7280',
    
    // Дополнительные цвета
    'голубой': '#06b6d4',
    'салатовый': '#84cc16',
    'малиновый': '#dc2626',
    'бирюзовый': '#14b8a6',
    'золотой': '#fbbf24',
    'серебряный': '#9ca3af',
    
    // Вариации цветов
    'темно-красный': '#dc2626',
    'светло-красный': '#fca5a5',
    'темно-синий': '#1e40af',
    'светло-синий': '#93c5fd',
    'темно-зеленый': '#059669',
    'светло-зеленый': '#86efac',
    'темно-желтый': '#d97706',
    'светло-желтый': '#fde047',
    'темно-оранжевый': '#ea580c',
    'светло-оранжевый': '#fdba74',
    'темно-фиолетовый': '#7c3aed',
    'светло-фиолетовый': '#c4b5fd',
    'темно-розовый': '#be185d',
    'светло-розовый': '#f9a8d4',
    'темно-коричневый': '#92400e',
    'светло-коричневый': '#d97706',
    
    // Металлические цвета
    'бронзовый': '#cd7f32',
    'медный': '#b87333',
    'платиновый': '#e5e4e2',
    'никелевый': '#727472',
    
    // Пастельные цвета
    'пастельно-розовый': '#fce7f3',
    'пастельно-голубой': '#e0f2fe',
    'пастельно-желтый': '#fefce8',
    'пастельно-зеленый': '#f0fdf4',
    'пастельно-фиолетовый': '#faf5ff',
    
    // Неоновые цвета
    'неоново-розовый': '#ff1493',
    'неоново-зеленый': '#39ff14',
    'неоново-синий': '#00bfff',
    'неоново-желтый': '#ffff00',
    'неоново-оранжевый': '#ff4500'
  };
  
  // Очищаем название цвета от лишних символов
  const cleanColorName = colorName.toLowerCase().trim();
  
  // Проверяем, есть ли цвет в нашей карте
  if (colorMap[cleanColorName]) {
    return colorMap[cleanColorName];
  }
  
  // Если цвет не найден, пытаемся угадать по ключевым словам
  for (const [key, value] of Object.entries(colorMap)) {
    if (cleanColorName.includes(key) || key.includes(cleanColorName)) {
      return value;
    }
  }
  
  // Если ничего не найдено, возвращаем случайный цвет из палитры
  const fallbackColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#f97316', '#8b5cf6', '#ec4899'];
  return fallbackColors[Math.floor(Math.random() * fallbackColors.length)];
};

interface ColorDisplayProps {
  color: string;
}

export default function ColorDisplay({ color }: ColorDisplayProps) {
  if (!color) return null;

  const colors = color.split(',').map(c => c.trim());
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Цвет</h2>
      <div className="flex items-center space-x-3">
        {colors.map((colorName, index) => {
          const colorValue = getColorValue(colorName);
          const isLightColor = colorValue === '#ffffff' || colorValue === '#fefce8' || colorValue === '#f0fdf4' || colorValue === '#faf5ff' || colorValue === '#e0f2fe' || colorValue === '#fce7f3';
          
          return (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center shadow-sm"
                title={colorName}
              >
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ 
                    backgroundColor: colorValue,
                    border: isLightColor ? '1px solid #d1d5db' : 'none',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
              <span className="text-gray-600">{colorName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
