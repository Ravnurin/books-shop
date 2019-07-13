import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createStyles, Container, CssBaseline, makeStyles, Theme } from 'Material';

import BookDetailsPage from 'Components/BookDetails';
import HomePage from 'Components/Home';
import Header from 'Header';

import { history } from 'Store';

import './App.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    container: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  })
);

const App: React.FC = () => (
  <>
    <Header />
    <Container component="main">
      <CssBaseline />
      <div className={useStyles().root}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/book/:id" component={BookDetailsPage} />
          </Switch>
        </ConnectedRouter>
      </div>
    </Container>
  </>
);

export default App;
