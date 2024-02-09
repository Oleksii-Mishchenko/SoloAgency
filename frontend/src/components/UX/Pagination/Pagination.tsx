import classNames from 'classnames';
import { useMemo } from 'react';
import { PaginationConfig } from '../../../types/PaginationConfig';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../helpers/getSearchWith';
import './pagination.scss';

type Props = {
  className?: string;
  config: PaginationConfig;
};

export const Pagination: React.FC<Props> = ({ className, config }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { num_pages, current_page, next_page, previous_page } = config;
  const pageNums = useMemo(() => {
    return Array.from({ length: num_pages }, (_, index) => index + 1);
  }, [num_pages]);

  const getActPageNum = (pageNum: number | null): number | null => {
    return pageNum === null || pageNum <= 1 ? null : pageNum;
  };

  const setSearchWith = (params: { [key: string]: string | null | number }) => {
    const newParams = getSearchWith(params, searchParams);

    setSearchParams(newParams);
  };

  const handlePageChange = (pageNum: number | null) => {
    const actPageNum = getActPageNum(pageNum);

    setSearchWith({ page: actPageNum });
  };

  return (
    <div className={classNames('pagination', className)}>
      <button
        type="button"
        className="pagination__button pagination__button--left"
        onClick={() => handlePageChange(previous_page)}
        disabled={!previous_page}
      />

      <div className="pagination__pages">
        {pageNums.map(pageNum => {
          const isActive = pageNum === current_page;
          const actPageNum = getActPageNum(pageNum);
          const path = getSearchWith({ page: actPageNum }, searchParams);

          return isActive ? (
            <span
              key={pageNum}
              className="pagination__page pagination__page--active"
            >
              {pageNum}
            </span>
          ) : (
            <Link key={pageNum} to={`?${path}`} className="pagination__page">
              {pageNum}
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        className="pagination__button pagination__button--right"
        onClick={() => handlePageChange(next_page)}
        disabled={!next_page}
      />
    </div>
  );
};
