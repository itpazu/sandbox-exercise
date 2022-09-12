import React from 'react';
import { Typography, Breadcrumbs, colors, Link } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
  '/submit': 'Submit File',
  '/send': 'Getting Results..',
  '/results': 'Results',
  '/results/table': 'Table',
  '/results/doughnut': 'Summary',
  '/results/email': 'Email',
};

const LinkRouter = (props) => (
  <Link {...props} variant='h4' component={NavLink} />
);
const Page = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs
      sx={{
        backgroundColor: colors.blue[100],
        ol: { justifyContent: 'center' },
      }}
      fontSize={'35px'}
      aria-label='breadcrumb'
      separator='/'
    >
      <LinkRouter underline='hover' color='inherit' to='/'>
        File Upload
      </LinkRouter>
      {pathnames.map((name, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last || name === 'results' ? (
          <Typography color='text.primary' key={to} variant='h4'>
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
