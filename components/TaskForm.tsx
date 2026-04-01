'use client';

import { FormEvent, useState } from 'react';

type TaskFormProps = {
  onAddTask: (title: string) => Promise<void>;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = title.trim();

    if (!text) {
      setErrorMsg('入力してください');
      return;
    }

    try {
      setIsAdding(true);
      setErrorMsg('');

      await onAddTask(text);
      setTitle('');
    } catch (error) {
      // とりあえずシンプルに表示
      setErrorMsg('追加できませんでした');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="やることを入力..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />

        <button
          type="submit"
          disabled={isAdding}
          className="min-w-[100px] whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {isAdding ? '追加中...' : '追加'}
        </button>
      </div>

      {errorMsg && (
        <p className="text-sm text-red-600">
          {errorMsg}
        </p>
      )}
    </form>
  );
}