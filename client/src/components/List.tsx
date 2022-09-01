import React, { ReactNode, ReactElement } from 'react';

interface ListProps<T> {
  items: T[];
  renderList: (list: T, index?: number) => ReactNode;
  className?: string;
  children?: ReactElement | ReactElement[];
  id?: string;
}

function List<T>({
  items,
  renderList,
  className,
  children,
  id,
}: ListProps<T>) {
  return (
    <ul className={`${className}`} id={id}>
      {items?.map(renderList)}
      {children}
    </ul>
  );
}

List.defaultProps = {
  className: '',
  children: false,
  id: '',
};

export default List;
