'use client';

import type { Task } from '@/lib/types';

type TaskListProps = {
  tasks: Task[];
  onToggleTask: (id: string) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
};

export default function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500">
        タスクはまだありません
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => {
        const createdAt = new Date(task.createdAt).toLocaleString();

        return (
          <li
            key={task.id}
            className="flex flex-col gap-2 rounded-md border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-2">
              <button
                type="button"
                onClick={() => onToggleTask(task.id)}
                className={`mt-1 h-4 w-4 rounded-full border ${
                  task.completed
                    ? 'bg-slate-700 border-slate-700'
                    : 'bg-white border-slate-400'
                }`}
              />

              <div>
                <p
                  className={`text-sm ${
                    task.completed
                      ? 'line-through text-slate-400'
                      : 'text-slate-800'
                  }`}
                >
                  {task.title}
                </p>

                <p className="text-xs text-slate-500">
                  {createdAt}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onToggleTask(task.id)}
                className="text-xs text-slate-600 hover:underline"
              >
                {task.completed ? '戻す' : '完了'}
              </button>

              <button
                type="button"
                onClick={() => onDeleteTask(task.id)}
                className="text-xs text-red-500 hover:underline"
              >
                削除
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}