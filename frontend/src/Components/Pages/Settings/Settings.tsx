import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import produce from "immer";
import { arrowBack } from "ionicons/icons";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setSettings } from "../../../Store/settings/actions/setSettings";
import { getSettings } from "../../../Store/settings/selectors/getSettings";

const Settings: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const settings = useSelector(getSettings);

  const { theme } = settings;

  const setColorTheme = useCallback(
    (theme: string) => {
      dispatch(
        setSettings(
          produce(settings, (draft: any) => {
            draft.theme = theme;
          })
        )
      );
    },
    [dispatch, settings]
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.go(-1)}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Configurações</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <IonList>
            <IonListHeader>
              <IonLabel>Aparência</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>Tema</IonLabel>
              <IonSelect
                value={theme}
                okText="Ok"
                cancelText="Fechar"
                onIonChange={(e) => setColorTheme(e.detail.value)}
              >
                <IonSelectOption value="_auto">
                  Automático (Sistema)
                </IonSelectOption>
                <IonSelectOption value="light">Claro</IonSelectOption>
                <IonSelectOption value="dark">Escuro</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
