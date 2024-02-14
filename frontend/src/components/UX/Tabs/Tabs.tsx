import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Tab } from '../../../types/Tab';
import { getSearchWith } from '../../../helpers/getSearchWith';
import './tabs.scss';

type Props = {
  tabs: { [key: string]: Tab };
  activeTab: string;
};

export const Tabs: React.FC<Props> = ({ tabs, activeTab }) => {
  const preparedTabs = Object.entries(tabs);

  return (
    <div className="tabs">
      {preparedTabs.map(([tabName, { id, title, path }]) => {
        const link = getSearchWith({ type: path });

        return (
          <div
            className={classNames('tabs__tab', {
              'tabs__tab--active': tabName === activeTab,
            })}
            key={id}
          >
            <Link to={{ search: link }} className="tabs__tab-link">
              {title}
            </Link>
          </div>
        );
      })}

      <div className="tabs__space" />
    </div>
  );
};
