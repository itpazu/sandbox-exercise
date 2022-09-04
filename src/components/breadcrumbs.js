import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
  '/results': 'results',
  '/submit': 'submit file',
};

const LinkRouter = (props) => <Link {...props} component={NavLink} />;
const Page = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  console.log(location);

  return (
    <Breadcrumbs aria-label='breadcrumb' separator='=>'>
      <LinkRouter underline='hover' color='inherit' to='/'>
        File Upload
      </LinkRouter>
      {pathnames.map((_, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color='text.primary' key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline='hover' color='inherit' to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
};
export default Page;
