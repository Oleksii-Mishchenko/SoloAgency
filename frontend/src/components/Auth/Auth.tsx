import React from 'react';
import './auth.scss';
import { MainButton } from '../MainButton';

export const Auth: React.FC = () => {
  return (
    <div className="auth">
      <MainButton className="auth__enter-button" text="Вхід" />
    </div>
  );
};
