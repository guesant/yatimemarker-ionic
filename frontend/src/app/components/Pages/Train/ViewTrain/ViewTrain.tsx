//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SvgIcon from "@material-ui/core/SvgIcon";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ITrain } from "@ya-time-marker/lib";
import { deleteTrain } from "@ya-time-marker/lib/build/Api/Trains/deleteTrain";
import { getTrain } from "@ya-time-marker/lib/build/Api/Trains/getTrain";
import { computeAllTrainDurations } from "@ya-time-marker/lib/build/utils/computeAllTrainDurations";
import { computeStepDuration } from "@ya-time-marker/lib/build/utils/computeStepDuration";
import { close, trash } from "ionicons/icons";
import ms from "ms";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useFetch } from "../../../Hooks/useFetch";
import { ROUTE_HOME, ROUTE_TRAIN_START } from "../../../Routes";
import { useStepContext } from "../Hooks/useStepContext";
import "../../../../../translations/i18n";
import { useTranslation } from "react-i18next";

const extendedStringifyMS = (duration: number) =>
  duration === Infinity ? String(Infinity) : ms(duration);

const ViewTrain: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [showActionSheet, setShowActionSheet] = useState(false);

  const { makeFetch, data: train, isLoading } = useFetch<null | ITrain>();

  useEffect(() => {
    if ((!train || train._id !== id) && !isLoading) {
      makeFetch(() => getTrain(id));
    }
  }, [id, train, makeFetch, isLoading]);

  const actionDeleteTrain = useCallback(async () => {
    await deleteTrain(id);
    history.push(ROUTE_HOME());
  }, [history, id]);

  const stepContext = useStepContext();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.go(-1)}>
              <SvgIcon component={ArrowBackIcon} />
            </IonButton>
          </IonButtons>
          <IonTitle>{train?.title ?? "Treino"}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowActionSheet(true)}>
              <SvgIcon component={MoreVertIcon} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading && (
          <>
            <div>
              <div className="tw-py-4">
                <div className="tw-px-4">
                  <p>{t("loading")}</p>
                </div>
              </div>
            </div>
          </>
        )}
        {!isLoading &&
          train &&
          (() => {
            const { steps } = train;
            return (
              <>
                <IonActionSheet
                  isOpen={showActionSheet}
                  onDidDismiss={() => setShowActionSheet(false)}
                  buttons={[
                    {
                      text: t("view_train_action_delete_train"),
                      role: "destructive",
                      icon: trash,
                      handler: actionDeleteTrain,
                    },
                    {
                      text: t("view_train_action_cancel"),
                      icon: close,
                      role: "cancel",
                    },
                  ]}
                />
                <div className="tw-flex tw-flex-col tw-h-full">
                  <div className="tw-flex-1 tw-overflow-y-auto">
                    <div className="tw-px-4 tw-my-4">
                      <IonList>
                        {steps.map((step, idx) => {
                          const { meta: { description = "" } = {} } = step;
                          return (
                            <Fragment key={idx}>
                              <IonItem button={false} detail={false}>
                                <IonLabel>{description}</IonLabel>
                                <IonLabel slot="end" className="tw-text-right">
                                  {extendedStringifyMS(
                                    computeStepDuration(stepContext)(step),
                                  )}
                                </IonLabel>
                              </IonItem>
                            </Fragment>
                          );
                        })}
                        {steps.length > 1 && (
                          <IonItem>
                            <IonLabel>
                              {">"} {t("settings_duration_interval")}
                            </IonLabel>
                            <IonLabel slot="end" className="tw-text-right">
                              {ms(stepContext.duration.interval)}
                            </IonLabel>
                          </IonItem>
                        )}
                        {steps.length > 0 && (
                          <IonItem>
                            <IonLabel>
                              {">"} {t("settings_duration_countdown")}
                            </IonLabel>
                            <IonLabel slot="end" className="tw-text-right">
                              {ms(stepContext.duration.startCountdown)}
                            </IonLabel>
                          </IonItem>
                        )}
                      </IonList>
                    </div>
                  </div>

                  <div>
                    <div>
                      <IonList>
                        <IonItem>
                          <IonLabel>{t("view_train_duration_total")}</IonLabel>
                          <IonLabel slot="end" className="tw-text-right">
                            {ms(
                              computeAllTrainDurations(stepContext)(train)
                                .totalDuration,
                            )}
                          </IonLabel>
                        </IonItem>
                      </IonList>
                    </div>
                    <div className="tw-px-4 tw-py-3">
                      <IonButton
                        expand="block"
                        onClick={() => history.push(ROUTE_TRAIN_START({ id }))}
                      >
                        {t("start_train_call_to_action")}
                      </IonButton>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
      </IonContent>
    </IonPage>
  );
};

export default ViewTrain;
