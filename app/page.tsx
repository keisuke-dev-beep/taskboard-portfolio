import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <header className="mb-10 border-b border-slate-200 pb-4">
          <p className="text-sm text-slate-500">Portfolio</p>

          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            My TaskBoard
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            Next.jsで作成したシンプルなタスク管理アプリです。
            タスクの追加や完了切替など、基本的な機能を実装しています。
          </p>
        </header>

        <div className="mb-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/tasks"
            className="text-sm text-slate-700 underline hover:text-slate-900"
          >
            タスク画面を見る →
          </Link>

          <a
            href="https://github.com/keisuke-dev-beep/taskboard-portfolio"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-500 underline hover:text-slate-700"
          >
            GitHub →
          </a>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              このアプリについて
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              タスクの追加、一覧表示、完了切替、削除ができるシンプルな構成にしています。
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              実装内容
            </h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
              <li>タスク一覧表示</li>
              <li>タスク追加</li>
              <li>完了状態の切り替え</li>
              <li>タスク削除</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              技術
            </h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
              <li>Next.js</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>API Routes</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}