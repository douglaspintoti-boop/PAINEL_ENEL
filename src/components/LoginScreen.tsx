import React, { useState } from 'react';
import { User, Lock, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess?: (username: string) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    // Authentication verification matching original credentials (obras / leste)
    setTimeout(() => {
      const trimmedUser = username.trim().toLowerCase();
      const trimmedPass = password.trim();

      if (trimmedUser === 'obras' && trimmedPass === 'leste') {
        sessionStorage.setItem('painelEnelLogado', 'true');
        sessionStorage.setItem('painelEnelUser', username.trim());
        setIsLoading(false);
        setIsAuthorized(true);
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(username.trim());
          }
        }, 700);
      } else {
        setIsLoading(false);
        setErrorMessage('Usuário ou senha incorretos.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-800 flex flex-col justify-between items-center px-4 py-6 selection:bg-[#032775] selection:text-white">
      {/* Top Brand Bar */}
      <header className="w-full max-w-4xl flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/logo_enel_06efd94a.png"
            alt="Enel Brasil"
            className="h-9 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Ambiente Seguro Operacional</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="w-full flex justify-center items-center my-auto py-4">
        <div
          className={`w-full max-w-[420px] bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 sm:p-9 transition-all duration-300 ${
            isShaking ? 'translate-x-[-8px] ring-2 ring-red-400' : ''
          }`}
        >
          {isAuthorized ? (
            <div className="py-14 flex items-center justify-center text-center animate-fadeIn">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-wide">
                Acesso autorizado!
              </span>
            </div>
          ) : (
            <>
              {/* Logo Painel Obras Leste */}
              <div className="text-center mb-6">
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 inline-block mb-3 shadow-inner">
                  <img
                    src="/assets/aistudio/logo_painel_efdda814.png"
                    alt="Painel Obras Leste"
                    className="max-h-20 w-auto object-contain mx-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h1 className="text-xl font-bold text-[#032775] tracking-tight">
                  Acesso ao Sistema
                </h1>
              </div>

              {/* Error Message Alert */}
              {errorMessage ? (
                <div
                  id="errorMessage"
                  className="mb-5 flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm animate-fadeIn"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1 text-left">
                    <span className="font-semibold block">{errorMessage}</span>
                    <span className="text-xs text-red-600/90">
                      Verifique se o usuário e a senha foram digitados corretamente.
                    </span>
                  </div>
                </div>
              ) : null}

          {/* Login Form */}
          <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
            {/* Input Usuário */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="username"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Usuário / Matrícula
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Digite seu usuário"
                  autoComplete="username"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#032775] focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            {/* Input Senha */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#032775] focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-3.5 px-4 bg-[#032775] hover:bg-[#00a859] active:bg-[#032775] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Validando credenciais...</span>
                </>
              ) : (
                <>
                  <span>Entrar no Painel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          </>
        )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center py-4 text-xs text-slate-500 border-t border-slate-200/60 mt-4 space-y-1">
        <p className="font-medium text-slate-600">
          Enel Brasil © 2026 · Painel de Gestão e Acompanhamento de Obras
        </p>
        <p className="text-[11px] text-slate-400">
          Uso interno restrito. Todos os acessos são auditados em conformidade com as normas de conformidade regulatória.
        </p>
      </footer>
    </div>
  );
}
