//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ITrain } from "@ya-time-marker/lib";
import { Trains } from "@ya-time-marker/lib/build/Services/Trains";
import { arrowBack } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router";
import "../../../../../translations/i18n";
import { useFetch } from "../../../Hooks/useFetch";
import {
  StartTrainContext,
  StartTrainProvider,
} from "./Hooks/StartTrainContext";
import StartTrainRunner from "./StartTrainRunner";

const StartTrainWithRunner: React.FC<{
  isTrainDone: boolean;
}> = ({ isTrainDone }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [showLeftAlertConfirm, setShowLeftAlertConfirm] = useState(false);
  const { appTimer } = useContext(StartTrainContext);

  const exitTrain = () => history.go(-1);

  function showAlertToExitTrain() {
    if (isTrainDone) return exitTrain();
    if (appTimer) {
      appTimer.pause();
      setShowLeftAlertConfirm(true);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => showAlertToExitTrain()}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{t("start_train_header")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <>
          {!isTrainDone && (
            <>
              <div style={{ zIndex: 1 }}>
                <StartTrainRunner />
              </div>
              <div style={{ zIndex: 2 }}>
                <IonAlert
                  isOpen={!isTrainDone && showLeftAlertConfirm}
                  onDidDismiss={() => setShowLeftAlertConfirm(false)}
                  header={t("start_train_left_train")}
                  message={t("start_train_left_train_message")}
                  buttons={[
                    {
                      text: t("start_train_left_train_option_cancel"),
                      role: "cancel",
                      handler: () => {},
                    },
                    {
                      text: t("start_train_left_train_option_confirm"),
                      handler: () => exitTrain(),
                    },
                  ]}
                />
              </div>
            </>
          )}
          {isTrainDone && (
            <>
              <div>
                <div className="tw-py-4">
                  <div className="tw-px-4">
                    <p>{t("start_train_train_done")}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      </IonContent>
    </IonPage>
  );
};

const StartTrain: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [isTrainDone, setIsTrainDone] = useState(false);
  const { makeFetch, data, isLoading } = useFetch<null | ITrain>();

  useEffect(() => {
    if ((!data || data._id !== id) && !isLoading) {
      makeFetch(() => Trains.getTrain(id));
    }
  }, [id, data, makeFetch, isLoading]);

  return (
    <>
      {isLoading && (
        <>
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => history.go(-1)}>
                    <IonIcon icon={arrowBack} />
                  </IonButton>
                </IonButtons>
                <IonTitle>{t("start_train_header")}</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <div>
                <div className="tw-py-4">
                  <div className="tw-px-4">
                    <p>{t("loading")}</p>
                  </div>
                </div>
              </div>
            </IonContent>
          </IonPage>
        </>
      )}
      {!isLoading && data && (
        <StartTrainProvider
          train={data}
          onTrainEnd={() => setIsTrainDone(true)}
          children={<StartTrainWithRunner isTrainDone={isTrainDone} />}
        />
      )}
    </>
  );
};

export default StartTrain;
