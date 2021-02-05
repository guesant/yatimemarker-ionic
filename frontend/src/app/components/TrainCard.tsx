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
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { SvgIcon } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import { ITrain } from "@ya-time-marker/lib";
import { computeAllTrainDurations } from "@ya-time-marker/lib/build/utils/computeAllTrainDurations";
import React from "react";
import { useHistory } from "react-router";
import { shortEnglishDurationHumanizer } from "./Helpers/shortEnglishDurationHumanizer";
import { useStepContext } from "./Pages/Train/Hooks/useStepContext";
import { ROUTE_TRAIN_START, ROUTE_TRAIN_VIEW } from "./Routes";
import "../../translations/i18n";
import { useTranslation } from "react-i18next";

export type TrainCardProps = { train: ITrain };

const TrainCard: React.FC<TrainCardProps> = ({
  train,
  train: { title, _id },
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const stepContext = useStepContext();
  const { totalDuration } = computeAllTrainDurations(stepContext)(train);
  return (
    <>
      <IonCard
        button
        onClick={() => history.push(ROUTE_TRAIN_VIEW({ id: _id! }))}
      >
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>
            <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-1">
              <div className="tw-text-lg">
                <SvgIcon fontSize="inherit" component={TimerIcon} />
              </div>
              <p>
                <span>{shortEnglishDurationHumanizer(totalDuration)}</span>
              </p>
            </div>
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <div className="tw-flex tw-justify-end " style={{ gap: "2px" }}>
            <IonButton
              children={t("start_train_call_to_action")}
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
