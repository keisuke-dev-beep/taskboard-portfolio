import type { Task } from '@/lib/types';

// 今回はDBは使わず、簡易的にメモリで管理
let tasks: Task[] = [
  {
    id: '1',
    title: 'READMEを確認する',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'GitHubにpushする',
    completed: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];

export function getTasks() {
  return tasks;
}

export function addTask(title: string) {
  const task: Task = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks = [task, ...tasks];
  return task;
}

export function toggleTask(id: string) {
  let updatedTask: Task | null = null;

  tasks = tasks.map((task) => {
    if (task.id !== id) return task;

    updatedTask = {
      ...task,
      completed: !task.completed,
    };

    return updatedTask;
  });

  return updatedTask;
}

export function deleteTask(id: string) {
  const exists = tasks.some((task) => task.id === id);
  tasks = tasks.filter((task) => task.id !== id);
  return exists;
}