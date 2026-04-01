'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import type { Task } from '@/lib/types';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');

  const getTasks = async () => {
    setLoading(true);
    setErrorText('');

    try {
      const response = await fetch('/api/tasks', {
        cache: 'no-store',
      });

      if (!response.ok) {
        setErrorText('タスク一覧の取得に失敗しました。');
        setLoading(false);
        return;
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setErrorText('タスク一覧の取得中にエラーが発生しました。');
    }

    setLoading(false);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async (title: string) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        alert('タスクを追加できませんでした。');
        return;
      }

      await getTasks();
    } catch (error) {
      alert('タスク追加時にエラーが発生しました。');
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        alert('タスクの更新に失敗しました。');
        return;
      }

      await getTasks();
    } catch (error) {
      alert('タスク更新時にエラーが発生しました。');
    }
  };

  const deleteTask = async (id: string) => {
    const ok = window.confirm('このタスクを削除しますか？');
    if (!ok) return;

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        alert('タスクを削除できませんでした。');
        return;
      }

      await getTasks();
    } catch (error) {
      alert('タスク削除時にエラーが発生しました。');
    }
  };

  const completedCount = tasks.filter((item) => item.completed).length;

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <header className="mb-8 border-b border-slate-200 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Portfolio</p>
              <h1 className="mt-1 text-2xl font-semibold text-slate-900">
                My TaskBoard
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Next.jsで作成したシンプルなタスク管理アプリです。
              </p>
            </div>

            <Link
              href="/"
              className="text-sm text-slate-600 hover:underline"
            >
              トップへ戻る
            </Link>
          </div>
        </header>

        <div className="mb-8">
          <h2 className="text-base font-semibold text-slate-900">タスク追加</h2>
          <p className="mt-1 text-sm text-slate-500">
            入力して追加できます。
          </p>

          <div className="mt-3 border border-slate-200 p-4">
            <TaskForm onAddTask={addTask} />
          </div>
        </div>

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h2 className="text-base font-semibold text-slate-900">タスク一覧</h2>
            <span className="text-xs text-slate-500">全 {tasks.length} 件</span>
            <span className="text-xs text-slate-500">完了 {completedCount} 件</span>
          </div>

          {errorText ? (
            <div className="mb-4 border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {errorText}
            </div>
          ) : null}

          {loading ? (
            <div className="border border-slate-200 p-4 text-sm text-slate-500">
              読み込み中...
            </div>
          ) : tasks.length === 0 ? (
            <div className="border border-slate-200 p-4 text-sm text-slate-500">
              まだタスクはありません。
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          )}
        </div>
      </div>
    </main>
  );
}