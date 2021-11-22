import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import SingleCountry from './components/SingleCountry';
import CountriesGrid from './components/CountriesGrid';
import { useState } from 'react';

// styles
import './App.css';

function App() {
  const [mode, setMode] = useState('light')

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar mode={mode} setMode={setMode} />
        <main>
          <Switch>
            <Route exact path="/">
              <CountriesGrid />
            </Route>
            <Route path="/country/:id">
              <SingleCountry mode={mode} />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
