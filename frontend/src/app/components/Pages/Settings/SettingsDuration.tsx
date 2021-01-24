//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { parseDuration } from "@ya-time-marker/lib/build/utils/parseDuration";
import produce from "immer";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DEFAULT_INTERVAL_DURATION,
  DEFAULT_START_COUNTDOWN_DURATION,
  DEFAULT_TRAIN_DURATION,
} from "../../../constants/defaultDuration";
import { setSettings } from "../../../store/settings/actions/setSettings";
import { ISettingsState } from "../../../types/Settings";

const SettingsDuration = () => {
  const settings = useSelector(
    (state): ISettingsState => (state as any).settings,
  );
  const { duration } = settings;
  const dispatch = useDispatch();
  return (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>Duração</IonLabel>
        </IonListHeader>
        {([
          {
            ref: "train",
            text: "Treino",
            defaultValue: DEFAULT_TRAIN_DURATION,
          },
          {
            ref: "interval",
            text: "Intervalo",
            defaultValue: DEFAULT_INTERVAL_DURATION,
          },
          {
            ref: "startCountdown",
            text: "Contagem Regressiva",
            defaultValue: DEFAULT_START_COUNTDOWN_DURATION,
          },
        ] as {
          text: string;
          ref: keyof typeof duration;
          defaultValue: string;
        }[]).map(({ text, ref, defaultValue }) => {
          const updateValue = (newValue: string) => {
            dispatch(
              setSettings(
                produce(settings, (draft) => {
                  draft.duration[ref] = newValue;
                }),
              ),
            );
          };
          return (
            <Fragment key={ref}>
              <IonItem>
                <IonLabel>{text}</IonLabel>
                <IonInput
                  slot="end"
                  className="tw-text-right"
                  placeholder={defaultValue}
                  value={duration[ref]}
                  onIonChange={(e) => updateValue(e.detail.value!)}
                  onIonBlur={() => {
                    const currentValue = String(duration[ref]);
                    updateValue(parseDuration(defaultValue)(currentValue));
                  }}
                />
              </IonItem>
            </Fragment>
          );
        })}
      </IonList>
    </>
  );
};

export default SettingsDuration;
