/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import PainelDeObrasView from './components/PainelDeObrasView';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('painelEnelLogado') === 'true';
  });

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('painelEnelLogado');
    sessionStorage.removeItem('painelEnelUser');
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <PainelDeObrasView onLogout={handleLogout} />;
  }

  return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
}
