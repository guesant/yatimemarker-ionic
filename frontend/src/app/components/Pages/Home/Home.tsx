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
import { ITrain } from "@ya-time-marker/lib";
import { Trains } from "@ya-time-marker/lib/build/Services/Trains";
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
import { ROUTE_SEARCH, ROUTE_SETTINGS, ROUTE_TRAIN_NEW } from "../../Routes";
import TrainCard from "../../TrainCard";
import { HomeHeaderLayout } from "./HomeHeaderLayout";

const Home: React.FC = () => {
  const history = useHistory();
  const [trains, setTrains] = useState<ITrain[]>([]);
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  async function fetchTrains() {
    setIsLoading(true);
    try {
      setTrains((await Trains.getTrains()) as any[]);
    } catch (_) {}
    setIsLoading(false);
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
                    text: t("settings"),
                    callback: () => history.push(ROUTE_SETTINGS()),
                  },
                ] as {
                  text: string;
                  callback: () => any;
                }[]).map(({ text, callback }, idx, { length }) => (
                  <Fragment key={idx}>
                    <IonItem
                      button
                      detail={false}
                      children={text}
                      onClick={() => {
                        displayPopOver(undefined);
                        callback();
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

        <div>
          <div className="tw-py-4">
            <div className="tw-px-4">
              {!trains.length && !isLoading && (
                <>
                  <p>
                    {t("home_add_new_train_before")}
                    <IonIcon icon={add} />
                    {t("home_add_new_train_after")}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </HomeHeaderLayout>
    </IonPage>
  );
};

export default Home;
