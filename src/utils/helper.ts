import { SongType } from '@/sharedTypes/sharedTypes';
import { current } from '@reduxjs/toolkit';

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;
  return `${minutes}:${outputSeconds}`;
}

export const getTimePanel = (
  currentTime: number,
  totalTime: number | undefined,
) => {
  if (totalTime) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
  }
};
export function getUniqueValuesByKey(
  arr: SongType[],
  key: keyof SongType,
): string[] {
  // Используем Set для хранения уникальных значений
  const uniqueValues = new Set<string>();

  // Проходим по каждому объекту в массиве
  arr.forEach((item) => {
    const value = item[key];

    // Если значение — массив строк
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqueValues.add(v);
        }
      });
    }
    // Если значение — строка
    else if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });

  // Преобразуем Set обратно в массив и возвращаем
  return Array.from(uniqueValues);
}
