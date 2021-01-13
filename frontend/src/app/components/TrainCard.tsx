//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { ITrain } from "@ya-time-marker/lib";
import React from "react";
import { useHistory } from "react-router";
import { ROUTE_TRAIN_START, ROUTE_TRAIN_VIEW } from "./Routes";

export type TrainCardProps = { train: ITrain };

const TrainCard: React.FC<TrainCardProps> = ({ train: { title, _id } }) => {
  const history = useHistory();
  return (
    <>
      <IonCard
        button
        onClick={() => history.push(ROUTE_TRAIN_VIEW({ id: _id! }))}
      >
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div className="tw-flex tw-justify-end " style={{ gap: "2px" }}>
            <IonButton
              children="Iniciar Treino"
              onClick={(e) => {
                e.stopPropagation();
                history.push(ROUTE_TRAIN_START({ id: _id! }));
              }}
            />
          </div>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default TrainCard;
