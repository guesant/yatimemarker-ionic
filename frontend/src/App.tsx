//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "@ionic/react/css/core.css";
import { blue } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { Suspense } from "react";
import { Redirect, Route } from "react-router-dom";
import "./App.css";
import "./app/assets/tw-dist.css";
import { useAppTheme } from "./app/components/Hooks/useAppTheme";
import LoadingPage from "./app/components/LoadingPage";
import {
  ROUTE_HOME,
  ROUTE_SEARCH,
  ROUTE_SETTINGS,
  ROUTE_TRAIN_NEW,
  ROUTE_TRAIN_START,
  ROUTE_TRAIN_VIEW,
} from "./app/components/Routes";
import "./app/theme/variables.css";
import {
  PageHome,
  PageNewTrain,
  PageSearch,
  PageSettings,
  PageStartTrain,
  PageViewTrain,
} from "./AppPages";

const App: React.FC = () => {
  const [theme] = useAppTheme();

  const muiAppTheme = createMuiTheme({
    palette: {
      type: theme,
      primary: {
        main: blue[500],
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={muiAppTheme}>
        <IonApp className="App">
          <IonReactRouter>
            <Suspense fallback={<LoadingPage />}>
              <IonRouterOutlet>
                <Route path={ROUTE_HOME()} component={PageHome} exact={true} />
                <Route path={ROUTE_SEARCH()} component={PageSearch} exact />
                <Route
                  path={ROUTE_SETTINGS()}
                  component={PageSettings}
                  exact={true}
                />
                <Route
                  path={ROUTE_TRAIN_VIEW()}
                  component={PageViewTrain}
                  exact={true}
                />
                <Route
                  path={ROUTE_TRAIN_START()}
                  component={PageStartTrain}
                  exact={true}
                />
                <Route
                  path={ROUTE_TRAIN_NEW()}
                  component={PageNewTrain}
                  exact={true}
                />
                <Route
                  path="/"
                  render={() => <Redirect to={ROUTE_HOME()} />}
                  exact={true}
                />
              </IonRouterOutlet>
            </Suspense>
          </IonReactRouter>
        </IonApp>
      </ThemeProvider>
    </>
  );
};

export default App;
