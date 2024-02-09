import classNames from 'classnames';
import './file-link.scss';

type Props = {
  title: string;
  filePath: string;
  className?: string;
};

export const FileLink: React.FC<Props> = ({ className, title, filePath }) => {
  const fileExtension = filePath.slice(filePath.lastIndexOf('.'));

  return (
    <a
      className={classNames('file-link', className)}
      href={filePath}
      target="_blank"
    >
      {`${title} (${fileExtension})`}
    </a>
  );
};
