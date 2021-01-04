import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { ITrain } from "@ya-time-marker/lib";
import React from "react";

export type TrainCardProps = { train: ITrain };

const TrainCard: React.FC<TrainCardProps> = ({ train: { title } }) => {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </>
  );
};

export default TrainCard;
