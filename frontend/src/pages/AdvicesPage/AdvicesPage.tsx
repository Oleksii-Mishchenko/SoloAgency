import './advices-page.scss';
import { Advices } from '../../components/Advices';
import { AddAdvice } from '../../components/AddAdvice';

export const AdvicesPage = () => {
  return (
    <div className="advices-page">
      <Advices relPage="advices-page" />

      <AddAdvice />
    </div>
  );
};
