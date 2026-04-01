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
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Portfolio</p>
            <h1 className="text-2xl font-semibold text-slate-900">
              My TaskBoard
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Next.jsで作成したシンプルなタスク管理アプリです。
            </p>
          </div>

          <Link
            href="/"
            className="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            トップへ戻る
          </Link>
        </header>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-base font-semibold text-slate-900">タスク追加</h2>
          <p className="mb-4 mt-1 text-sm text-slate-500">
            タスクの追加・更新・削除ができる構成にしています。
          </p>

          <TaskForm onAddTask={addTask} />
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">タスク一覧</h2>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-700">
              全 {tasks.length} 件
            </span>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-700">
              完了 {completedCount} 件
            </span>
          </div>

          {errorText ? (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {errorText}
            </div>
          ) : null}

          {loading ? (
            <div className="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-500">
              読み込み中...
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-500">
              まだタスクはありません。
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          )}
        </section>
      </div>
    </main>
  );
}