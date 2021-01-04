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
import { home, person } from "ionicons/icons";
import React, { Suspense, lazy } from "react";
import { Redirect, Route } from "react-router-dom";
import LoadingPage from "./Components/LoadingPage";
import {
  ROUTE_HOME,
  ROUTE_PROFILE,
} from "./Components/Routes";
import "./App.css";
import "./theme/variables.css";

const Promise_PageHome = import("./Components/Pages/Home/Home");
const Promise_PageProfile = import("./Components/Pages/Profile/Profile");
const PageHome = lazy(() => Promise_PageHome);
const PageProfile = lazy(() => Promise_PageProfile);

const App: React.FC = () => (
  <IonApp className="App">
    <IonReactRouter>
      <Suspense fallback={<LoadingPage />}>
        <IonRouterOutlet>
          <Route path={[ROUTE_HOME(), ROUTE_PROFILE()]}>
            <IonTabs>
              <IonRouterOutlet>
                <Route path={ROUTE_HOME()} component={PageHome} exact={true} />
                <Route
                  path={ROUTE_PROFILE()}
                  component={PageProfile}
                  exact={true}
                />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href={ROUTE_HOME()}>
                  <IonIcon icon={home} />
                  <IonLabel>Início</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href={ROUTE_PROFILE()}>
                  <IonIcon icon={person} />
                  <IonLabel>Meu Perfil</IonLabel>
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
