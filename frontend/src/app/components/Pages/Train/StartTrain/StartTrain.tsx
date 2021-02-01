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
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useFetch } from "../../../Hooks/useFetch";
import {
  StartTrainContext,
  StartTrainProvider,
} from "./Hooks/StartTrainContext";
import StartTrainRunner from "./StartTrainRunner";

const StartTrainWithRunner: React.FC<{
  isTrainDone: boolean;
}> = ({ isTrainDone }) => {
  const history = useHistory();

  return (
    <>
      {(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [showLeftAlertConfirm, setShowLeftAlertConfirm] = useState(false);
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
                <IonTitle>Treino</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <>
                {!isTrainDone && (
                  <>
                    <div style={{ zIndex: 0 }}>
                      <StartTrainRunner />
                    </div>
                    <div style={{ zIndex: 1 }}>
                      <IonAlert
                        isOpen={showLeftAlertConfirm}
                        onDidDismiss={() => setShowLeftAlertConfirm(false)}
                        header={"Left Train"}
                        message={
                          "Você tem certeza de que deseja sair deste treino?"
                        }
                        buttons={[
                          { text: "Não", role: "cancel", handler: () => {} },
                          { text: "Sim", handler: () => exitTrain() },
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
                          <p>Feito.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            </IonContent>
          </IonPage>
        );
      })()}
    </>
  );
};

const StartTrain: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [isTrainDone, setIsTrainDone] = useState(false);
  const { makeFetch, data, isLoading } = useFetch<null | ITrain>();

  useEffect(() => {
    if ((!data || data._id !== id) && !isLoading) {
      makeFetch(() => getTrain(id));
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
                <IonTitle>Treino</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <div>
                <div className="tw-py-4">
                  <div className="tw-px-4">
                    <p>Carregando...</p>
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
