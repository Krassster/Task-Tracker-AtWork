export enum TaskStatus {
  atWork = 'atWork',
  suspended = 'suspended',
  notStarted = 'notStarted',
}

export const StatusDetails = {
  [TaskStatus.atWork]: { text: 'В работе', style: TaskStatus.atWork },
  [TaskStatus.suspended]: {
    text: 'Приостановлен',
    style: TaskStatus.suspended,
  },
  [TaskStatus.notStarted]: {
    text: 'Не начат',
    style: TaskStatus.notStarted,
  },
};
