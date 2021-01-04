import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { Api, ITrain } from "@ya-time-marker/lib";
import React, { Fragment, useEffect, useState } from "react";
import TrainCard from "../../TrainCard";

const {
  Trains: { getTrains },
} = Api;

const Home: React.FC = () => {
  const [trains, setTrains] = useState<ITrain[]>([]);

  async function fetchTrains() {
    setTrains((await getTrains()) as any[]);
  }

  useEffect(() => {
    fetchTrains();
  }, []);

  useIonViewWillEnter(() => {
    fetchTrains();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Início</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          {trains.map((train, idx) => (
            <Fragment
              key={train._id ?? idx}
              children={<TrainCard train={train} />}
            />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
