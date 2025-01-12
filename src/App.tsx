import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { search, gitCompare } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Index from "./pages/Index";
import Info from "./pages/Info";
import Compare from "./pages/Compare";
import Comparison from "./pages/Comparison";
import { useEffect, useState } from "react";
import useDarkMode from "./hooks/DarkMode";

setupIonicReact();

const App: React.FC = () => {
  // const [isDarkMode, setIsDarkMode] = useState(() => {
  //   const savedTheme = localStorage.getItem("isDarkMode");

  //   return savedTheme ? JSON.parse(savedTheme) : false;
  // });
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // useEffect(() => {
  //   document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");

  //   localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  // }, [isDarkMode]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/" render={() => <Redirect to="/search" />} exact />
            <Route path="/search" exact component={Index} />
            <Route path="/info" exact component={Info} />
            <Route path="/compare" exact component={Compare} />
            <Route path="/comparison" exact component={Comparison} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="search" href="/search">
              <IonIcon aria-hidden="true" icon={search} />
              <IonLabel>Search</IonLabel>
            </IonTabButton>
            <IonTabButton tab="compare" href="/compare">
              <IonIcon aria-hidden="true" icon={gitCompare} />
              <IonLabel>Compare</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
