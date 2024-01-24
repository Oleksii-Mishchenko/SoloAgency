import { useAppDispatch } from '../../app/hooks';
import { scrollToTop } from '../../helpers/scrollToTop';
import { AuthLinkType } from '../../types/AuthLinkType';
import * as authActions from '../../features/authSlice';
import './auth-link.scss';

type Props = {
  linkType: AuthLinkType;
  name: string;
};

export const AuthLink: React.FC<Props> = ({ linkType, name }) => {
  const dispatch = useAppDispatch();

  const handleAuth = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    scrollToTop();

    switch (linkType) {
      case AuthLinkType.Register:
        dispatch(authActions.openRegisterForm());
        break;

      case AuthLinkType.Login:
        dispatch(authActions.openLoginForm());
        break;

      default:
        return;
    }
  };

  return (
    <button type="button" className="auth-link" onClick={handleAuth}>
      {name}
    </button>
  );
};
