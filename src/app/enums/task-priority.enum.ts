export enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export const PriorityDetails = {
  [TaskPriority.Low]: { text: 'Низкий', style: TaskPriority.Low },
  [TaskPriority.Medium]: { text: 'Средний', style: TaskPriority.Medium },
  [TaskPriority.High]: { text: 'Высокий', style: TaskPriority.High },
};
