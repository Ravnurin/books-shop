import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createStyles, CssBaseline, makeStyles } from 'Material';

import BookDetailsPage from 'Components/BookDetails';
import HomePage from 'Components/Home';
import { history } from 'Store';

import './App.css';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

const App: React.FC = () => (
  <>
  <CssBaseline />
    <div className={useStyles().root}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/book" component={BookDetailsPage} />
        </Switch>
      </ConnectedRouter>
    </div>
  </>
);

export default App;
