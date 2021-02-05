//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IonButton, IonButtons } from "@ionic/react";
import SvgIcon from "@material-ui/core/SvgIcon";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DoneIcon from "@material-ui/icons/Done";
import { Trains } from "@ya-time-marker/lib/build/Services/Trains";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import "../../../../../translations/i18n";
import { ROUTE_HOME } from "../../../Routes";
import CRUDTrainHeader from "../CRUD/CRUDTrainHeader";
import { NewTrainContext } from "./Hooks/NewTrainContext";

export const NewTrainHeader: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const {
    train,
    train: { title, steps },
  } = useContext(NewTrainContext);

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(Boolean(title && steps.length));
  }, [title, steps]);

  async function saveTrain() {
    await Trains.addTrain(train);
    history.push(ROUTE_HOME());
  }

  return (
    <>
      <CRUDTrainHeader
        pageTitle={t("new_train_header")}
        beforeTitle={
          <IonButtons slot="start">
            <IonButton onClick={() => history.go(-1)}>
              <SvgIcon component={ArrowBackIcon} />
            </IonButton>
          </IonButtons>
        }
        afterTitle={
          <IonButtons slot="end">
            <IonButton disabled={!isValid} onClick={saveTrain}>
              <SvgIcon component={DoneIcon} />
            </IonButton>
          </IonButtons>
        }
      />
    </>
  );
};
