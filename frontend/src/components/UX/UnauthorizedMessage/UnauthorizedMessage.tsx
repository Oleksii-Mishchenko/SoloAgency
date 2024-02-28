import { AuthLinkType } from '../../../types/AuthLinkType';
import { AuthLink } from '../../UI/buttons';
import './unauthorized-message.scss';

type Props = {
  warning: string;
};

export const UnauthorizedMessage: React.FC<Props> = ({ warning }) => {
  return (
    <div className="unauthorized-message">
      <p className="unauthorized-message__warn">{warning}</p>

      <p className="unauthorized-message__offer">
        {'Будь ласка, '}
        <AuthLink linkType={AuthLinkType.Register} name="Зареєструйтесь" />
        {' або '}
        <AuthLink linkType={AuthLinkType.Login} name="Увійдіть" />
        {' в свій обліковий запис.'}
      </p>
    </div>
  );
};
