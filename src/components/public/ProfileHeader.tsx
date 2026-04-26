export default function ProfileHeader() {
  return (
    <header className="flex flex-col items-center pt-10 pb-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center mb-4">
        <span className="text-3xl font-bold text-slate-600">J</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-800">Jandrea</h1>
      <p className="text-slate-500 mt-1">Catálogos y enlaces</p>
    </header>
  );
}
