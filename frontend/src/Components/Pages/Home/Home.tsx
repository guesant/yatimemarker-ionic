import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonPopover,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
} from "@ionic/react";
import { Api, ITrain } from "@ya-time-marker/lib";
import { ellipsisHorizontal, ellipsisVertical, search } from "ionicons/icons";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ROUTE_SEARCH, ROUTE_SETTINGS, ROUTE_TRAIN_NEW } from "../../Routes";
import TrainCard from "../../TrainCard";
import { HomeHeaderLayout } from "./HomeHeaderLayout";

const {
  Trains: { getTrains },
} = Api;

const Home: React.FC = () => {
  const history = useHistory();
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

  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  function displayPopOver(event: any) {
    setShowPopover(
      event
        ? { showPopover: true, event }
        : { showPopover: false, event: undefined },
    );
  }

  return (
    <IonPage>
      <HomeHeaderLayout
        toolbarTitle="Início"
        toolbarActions={
          <IonButtons slot="end">
            <IonButton
              onClick={() => history.push(ROUTE_SEARCH())}
              children={<IonIcon slot="icon-only" icon={search} />}
            />
            <IonButton
              onClick={(event) => {
                event.persist();
                displayPopOver(event);
              }}
              children={
                <IonIcon
                  slot="icon-only"
                  md={ellipsisVertical}
                  ios={ellipsisHorizontal}
                />
              }
            />
          </IonButtons>
        }
      >
        <IonRefresher
          slot="fixed"
          onIonRefresh={async (e) => {
            try {
              await fetchTrains();
            } catch (_) {}
            (e.target as HTMLIonRefresherElement).complete();
          }}
        >
          <IonRefresherContent />
        </IonRefresher>
        <>
          <div>
            <IonPopover
              translucent
              event={popoverState.event}
              isOpen={popoverState.showPopover}
              onDidDismiss={() => displayPopOver(undefined)}
            >
              <IonList>
                {([
                  {
                    text: "Configurações",
                    action: () => history.push(ROUTE_SETTINGS()),
                  },
                ] as {
                  text: string;
                  action: () => any;
                  hidePopOver?: boolean;
                }[]).map(({ text, action }, idx, { length }) => (
                  <Fragment key={idx}>
                    <IonItem
                      button
                      detail={false}
                      children={text}
                      onClick={() => {
                        displayPopOver(undefined);
                        action();
                      }}
                      {...(idx === length - 1 ? { lines: "none" } : {})}
                    />
                  </Fragment>
                ))}
              </IonList>
            </IonPopover>
          </div>
        </>

        <IonList>
          <IonItem
            onClick={() => history.push(ROUTE_TRAIN_NEW())}
            button
            detail
          >
            Cadastrar Novo Treino
          </IonItem>
        </IonList>

        <div>
          {trains.map((train, idx) => (
            <Fragment
              key={train._id ?? idx}
              children={<TrainCard train={train} />}
            />
          ))}
        </div>
      </HomeHeaderLayout>
    </IonPage>
  );
};

export default Home;
