import { LogOut, UserCheck } from 'lucide-react';

interface PainelDeObrasViewProps {
  onLogout: () => void;
}

export default function PainelDeObrasView({ onLogout }: PainelDeObrasViewProps) {
  const loggedUser = sessionStorage.getItem('painelEnelUser') || 'obras';

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#f4f6fa]">
      {/* Top Navigation & Status Bar */}
      <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-xs z-20">
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src="/assets/aistudio/logo_enel_06efd94a.png"
            alt="Enel Brasil"
            className="h-7 sm:h-8 object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="h-5 w-px bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#0b3a9c] tracking-tight uppercase">
              Painel Obras Leste
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* User badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Usuário:</span>
            <span className="text-[#0b3a9c]">{loggedUser}</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            title="Sair do painel e voltar para a tela de login"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 active:bg-red-200 border border-red-200/80 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </header>

      {/* Embedded Painel de Obras (programação de obras with filters, KPIs, and card list) */}
      <main className="flex-1 w-full h-[calc(100vh-56px)] overflow-hidden relative">
        <iframe
          src="/painel.html"
          title="Programação e Painel de Obras"
          className="w-full h-full border-0"
        />
      </main>
    </div>
  );
}
