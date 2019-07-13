import React, { useState, MouseEvent } from 'react';
import { push, Push } from 'connected-react-router';
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Theme,
  Button
} from 'Material';
import { connect } from 'react-redux';
import { ApplicationState } from './Reducers/index';

import './Header.css';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface OwnProps {
  push: Push;
}

type Props = OwnProps & Pick<ApplicationState, 'basket'>;

function Header({ push, basket }: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const basketItems = Object.keys(basket).map(k => basket[k]);
  const open = Boolean(anchorEl);

  const handleMenu = (event: MouseEvent<HTMLButtonElement | MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const goToBook = (id: number) => {
    push(`/book/${id}`);
  }

  const getBasketItems = () => {
    

    return basketItems.map(b => (
      <MenuItem key={b.id} onClick={() => goToBook(b.id)}>
        {b.count} x {b.title} = £{b.price * b.count}
      </MenuItem>
    ));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div style={{width: '100%'}}>
          <Button color="inherit" style={{ marginTop: '0.6rem', float: 'left' }} onClick={() => push('/')}>
            Home
          </Button>
            <IconButton
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              className="button"
              onClick={handleMenu}
              color="inherit"
              style={{float: 'right'}}
              disabled={basketItems.length === 0}
            >
              Basket
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              { getBasketItems()}
              
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = ({ basket }: Props) => ({ basket });

export default connect(mapStateToProps, { push })(Header);