import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "@ionic/react/css/core.css";
import { home } from "ionicons/icons";
import React, { Suspense, lazy } from "react";
import { Redirect, Route } from "react-router-dom";
import LoadingPage from "./Components/LoadingPage";
  ROUTE_HOME,
} from "./Components/Routes";
import "./App.css";
import "./theme/variables.css";

const Promise_PageHome = import("./Components/Pages/Home/Home");
const PageHome = lazy(() => Promise_PageHome);
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Suspense fallback={<LoadingPage />}>
        <IonRouterOutlet>
          <Route path={[ROUTE_HOME()]}>
            <IonTabs>
              <IonRouterOutlet>
                <Route path={ROUTE_HOME()} component={PageHome} exact={true} />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href={ROUTE_HOME()}>
                  <IonIcon icon={home} />
                  <IonLabel>Início</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </Route>
          <Route
            path="/"
            render={() => <Redirect to={ROUTE_HOME()} />}
            exact={true}
          />
        </IonRouterOutlet>
      </Suspense>
    </IonReactRouter>
  </IonApp>
);

export default App;
