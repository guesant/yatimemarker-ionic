import {
  IonButton,
  IonButtons,
  IonIcon,
  IonInput,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { Fragment, useContext, useRef } from "react";
import { useHistory } from "react-router";
import { SearchContext } from "./Hooks/SearchContext";

const SearchHeader: React.FC = () => {
  const history = useHistory();
  const { searchText, updateSearchText } = useContext(SearchContext);
  const searchInputRef = useRef<HTMLIonInputElement>(null);

  useIonViewDidEnter(() => {
    (async () => {
      if (searchInputRef.current && !searchText.trim().length) {
        await searchInputRef.current.setFocus();
      }
    })();
  }, [searchInputRef]);

  return (
    <Fragment>
      <IonToolbar>
        <div className="tw-sr-only">
          <IonTitle>Busca</IonTitle>
        </div>
        <IonButtons slot="start">
          <IonButton
            onClick={() => history.goBack()}
            children={<IonIcon icon={arrowBack} />}
          />
        </IonButtons>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            updateSearchText(searchText, "results");
          }}
        >
          <IonInput
            value={searchText}
            ref={searchInputRef}
            placeholder="Buscar..."
            onIonChange={(e) =>
              updateSearchText(e.detail.value!, "suggestions")
            }
          />
        </form>
      </IonToolbar>
    </Fragment>
  );
};

export default SearchHeader;
