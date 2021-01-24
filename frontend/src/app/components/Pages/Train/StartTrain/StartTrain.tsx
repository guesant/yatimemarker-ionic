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
import { getTrain } from "@ya-time-marker/lib/build/Api/Trains";
import { arrowBack } from "ionicons/icons";
import ms from "ms";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { ISettingsState } from "../../../../types/Settings";
import { useFetch } from "../../../Hooks/useFetch";
import StartTrainRunner from "./StartTrainRunner";

const parseStateDuration = (duration: string | number) => ms(String(duration));

const StartTrain: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [isTrainDone, setIsTrainDone] = useState(false);
  const { makeFetch, data, isLoading } = useFetch<null | ITrain>();
  const [showLeftAlertConfirm, setShowLeftAlertConfirm] = useState(false);

  const { duration } = useSelector(
    (state): ISettingsState => (state as any).settings,
  );

  useEffect(() => {
    if ((!data || data._id !== id) && !isLoading) {
      makeFetch(() => getTrain(id));
    }
  }, [id, data, makeFetch, isLoading]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setShowLeftAlertConfirm(true)}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Treino</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAlert
          isOpen={showLeftAlertConfirm}
          onDidDismiss={() => setShowLeftAlertConfirm(false)}
          header={"Left Train"}
          message={"Você tem certeza de que deseja sair deste treino?"}
          buttons={[
            { text: "Não", role: "cancel", handler: () => {} },
            { text: "Sim", handler: () => history.go(-1) },
          ]}
        />
        {isLoading && (
          <>
            <div>
              <div className="tw-py-4">
                <div className="tw-px-4">
                  <p>Carregando...</p>
                </div>
              </div>
            </div>
          </>
        )}
        {!isLoading && data && (
          <>
            {!isTrainDone && (
              <>
                <StartTrainRunner
                  train={data}
                  onTrainEnd={() => {
                    setIsTrainDone(true);
                  }}
                  trainDuration={parseStateDuration(duration.train)}
                  intervalDuration={parseStateDuration(duration.interval)}
                  countdownDuration={parseStateDuration(
                    duration.startCountdown,
                  )}
                />
              </>
            )}
            {isTrainDone && (
              <>
                <div>
                  <div className="tw-py-4">
                    <div className="tw-px-4">
                      <p>Feito.</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default StartTrain;
