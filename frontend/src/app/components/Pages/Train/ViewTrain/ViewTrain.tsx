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
import { close, trash } from "ionicons/icons";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useFetch } from "../../../Hooks/useFetch";
import { ROUTE_HOME, ROUTE_TRAIN_START } from "../../../Routes";

const ViewTrain: React.FC = () => {
  const history = useHistory();
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
                  <p>Carregando...</p>
                </div>
              </div>
            </div>
          </>
        )}
        {!isLoading && train && (
          <>
            <IonActionSheet
              isOpen={showActionSheet}
              onDidDismiss={() => setShowActionSheet(false)}
              buttons={[
                {
                  text: "Deletar Treino",
                  role: "destructive",
                  icon: trash,
                  handler: actionDeleteTrain,
                },
                {
                  text: "Cancelar",
                  icon: close,
                  role: "cancel",
                },
              ]}
            />
            <div className="tw-flex tw-flex-col tw-h-full">
              <div>
                <div className="tw-px-4 tw-my-4">
                  <IonList>
                    {train.steps.map(({ meta: { description } }, idx) => (
                      <Fragment key={idx}>
                        <IonItem button={false} detail={false}>
                          {description}
                        </IonItem>
                      </Fragment>
                    ))}
                  </IonList>
                </div>
              </div>
              <div className="tw-px-4">
                <IonButton
                  expand="block"
                  onClick={() => {
                    history.push(ROUTE_TRAIN_START({ id }));
                  }}
                >
                  Iniciar Treino
                </IonButton>
              </div>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViewTrain;
