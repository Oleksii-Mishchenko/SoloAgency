import { useMemo } from 'react';
import { RatingType } from '../../types/Rating';
import './rating.scss';
import classNames from 'classnames';

type Props = {
  title: string;
  value: RatingType;
  onChange: (value: RatingType) => void;
};

export const Rating: React.FC<Props> = ({ title, value, onChange }) => {
  const stars: RatingType[] = useMemo(() => [1, 2, 3, 4, 5], []);

  return (
    <div className="rating">
      <p className="rating__title">{title}</p>
      <div className="rating__stars">
        {stars.map(star => (
          <button
            key={star}
            type="button"
            className={classNames('rating__star', {
              'rating__star--active': star <= value,
            })}
            onClick={() => onChange(star)}
          />
        ))}
      </div>
    </div>
  );
};
