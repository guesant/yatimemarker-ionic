import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="tw-sr-only">
        <IonToolbar>
          <IonTitle>Carregando...</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="tw-px-4 tw-py-4">
          <p>Carregando...</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoadingPage;
