//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ITrain } from "@ya-time-marker/lib";
import { getTrain } from "@ya-time-marker/lib/build/Api/Trains";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetch } from "../../../Hooks/useFetch";
import StartTrainRunner from "./StartTrainRunner";

const DURATION_TRAIN = 30 * 1000;
const DURATION_INTERVAL = 10 * 1000;
const DURATION_INITIAL_COUNTDOWN = 15 * 1000;

const StartTrain: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { makeFetch, data: train, isLoading } = useFetch<null | ITrain>();
  const [isTrainDone, setIsTrainDone] = useState(false);

  useEffect(() => {
    if ((!train || train._id !== id) && !isLoading) {
      makeFetch(() => getTrain(id));
    }
  }, [id, train, makeFetch, isLoading]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Treino</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
        {!isLoading && train && (
          <>
            {!isTrainDone && (
              <>
                <StartTrainRunner
                  train={train}
                  onTrainEnd={() => {
                    setIsTrainDone(true);
                  }}
                  trainDuration={DURATION_TRAIN}
                  countdownDuration={DURATION_INITIAL_COUNTDOWN}
                  intervalDuration={DURATION_INTERVAL}
                />
              </>
            )}
            {isTrainDone && (
              <>
                <div>
                  <div className="tw-py-4">
                    <div className="tw-px-4">
                      <p>Done! Congratulations!</p>
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
