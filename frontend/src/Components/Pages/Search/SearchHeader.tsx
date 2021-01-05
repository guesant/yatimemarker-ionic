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
import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router";
import { SearchContext } from "./Hooks/SearchContext";

export type SearchHeaderProps = {
  formInputRef: React.RefObject<HTMLFormElement>;
  searchInputRef: React.RefObject<HTMLIonInputElement>;
};

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchInputRef,
  formInputRef,
}) => {
  const history = useHistory();
  const { searchText, setSearchText } = useContext(SearchContext);

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
            onClick={() => {
              history.goBack();
            }}
            children={<IonIcon icon={arrowBack} />}
          />
        </IonButtons>
        <form ref={formInputRef}>
          <IonInput
            ref={searchInputRef}
            value={searchText}
            placeholder="Buscar..."
            onIonChange={(e) => setSearchText(e.detail.value!)}
          />
        </form>
      </IonToolbar>
    </Fragment>
  );
};

export default SearchHeader;
