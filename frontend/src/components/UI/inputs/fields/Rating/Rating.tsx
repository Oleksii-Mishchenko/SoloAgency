import { useMemo } from 'react';
import classNames from 'classnames';
import { RatingType } from '../../../../../types/Rating';
import { Label } from '../../elements';
import './rating.scss';

type Props = {
  title: string;
  value: RatingType;
  onChange: (value: RatingType) => void;
};

export const Rating: React.FC<Props> = ({ title, value, onChange }) => {
  const stars: RatingType[] = useMemo(() => [1, 2, 3, 4, 5], []);

  return (
    <div className="rating">
      <Label label={title} isRequired />

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
