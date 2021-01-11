//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonButton,
  IonButtons,
  IonFab,
  IonFabButton,
  IonFabList,
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
import {
  add,
  caretUp,
  caretUpCircleOutline,
  ellipsisHorizontal,
  ellipsisVertical,
  search,
} from "ionicons/icons";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import "../../../../translations/i18n";
import {
  ROUTE_PROFILE,
  ROUTE_SEARCH,
  ROUTE_SETTINGS,
  ROUTE_TRAIN_NEW,
} from "../../Routes";
import TrainCard from "../../../../Components/TrainCard";
import { HomeHeaderLayout } from "./HomeHeaderLayout";

const {
  Trains: { getTrains },
} = Api;

const Home: React.FC = () => {
  const history = useHistory();
  const [trains, setTrains] = useState<ITrain[]>([]);
  const { t } = useTranslation();

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
        toolbarTitle={t("home_header")}
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
        <>
          <IonRefresher
            slot="fixed"
            onIonRefresh={async (e) => {
              try {
                await fetchTrains();
              } catch (_) {}
              (e.target as HTMLIonRefresherElement).complete();
            }}
            children={<IonRefresherContent />}
          />
        </>
        <>
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton color="light">
              <IonIcon md={caretUp} ios={caretUpCircleOutline} />
            </IonFabButton>
            <IonFabList side="top">
              <IonFabButton
                color="primary"
                onClick={() => history.push(ROUTE_TRAIN_NEW())}
                children={
                  <>
                    <IonIcon icon={add} />
                  </>
                }
              />
            </IonFabList>
          </IonFab>
        </>
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
                    text: t("my_profile"),
                    action: () => history.push(ROUTE_PROFILE()),
                  },
                  {
                    text: t("settings"),
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
