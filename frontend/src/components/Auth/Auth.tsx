import React from 'react';
import './auth.scss';
import { MainButton } from '../MainButton';

export const Auth: React.FC = () => {
  return (
    <div className="auth">
      <div className="auth__account">Акаунт</div>

      <MainButton text="Вхід" />
    </div>
  );
};
