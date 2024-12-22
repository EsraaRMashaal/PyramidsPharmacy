import { Link } from 'react-router-dom';
import React from 'react';

interface BreadcrumbItem {
  name: string;
  link?: string;
}

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbItem[];
}

const Breadcrumb = ({ breadcrumbs }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {breadcrumbs[breadcrumbs.length - 1].name}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className="flex items-center">
              {breadcrumb.link ? (
                <Link to={breadcrumb.link}>{breadcrumb.name}</Link>
              ) : (
                <span className="text-primary">{breadcrumb.name}</span>
              )}
              {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;