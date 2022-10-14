import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const StyledLink = ({ to, ...props }) => (
  <Link
    {...props}
    to={to}
    style={{ textDecoration: 'none', color: 'blue', fontSize: '20px' }}
  />
);

function DrawerComponent(state) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ marginTop: '50%' }}>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <StyledLink {...state} to={'doughnut'}>
                Summary
              </StyledLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <StyledLink {...state} to='table'>
                Table
              </StyledLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <StyledLink {...state} to='email'>
                Email Results
              </StyledLink>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
