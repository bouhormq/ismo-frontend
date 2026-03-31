export type Action = {
  id: number;
  isDone: boolean;

  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate?: string;
  alarmDate?: string;

  object: string;
  description: string;
};

export type ActionType = {
  id: number;
  name: string;
  color: string;
};
