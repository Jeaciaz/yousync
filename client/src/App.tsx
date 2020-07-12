import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './pages/Index';

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>thats a header</h1>
      </header>

      <main>
        <Switch>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
