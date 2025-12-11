/**
 * Main App Component
 * Root component with Ionic setup and routing
 */

import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

// Import pages (will be created)
import HomePage from './pages/HomePage';

// Setup Ionic
setupIonicReact({
  mode: 'ios', // Use iOS design patterns for consistency
  rippleEffect: true,
  animated: true
});

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/home">
            <Redirect to="/" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
