//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import React from "react";

export type HomeHeaderLayoutProps = {
  toolbarActions: any;
  toolbarTitle: string;
};

export const HomeHeaderLayout: React.FC<HomeHeaderLayoutProps> = ({
  children,
  toolbarTitle,
  toolbarActions,
}) => {
  const isIOS = isPlatform("ios");
  return (
    <>
      {!isIOS && (
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>{toolbarTitle}</IonTitle>
            {toolbarActions}
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent fullscreen={isIOS}>
        {isIOS && (
          <IonHeader collapse="condense">
            <IonToolbar className="tw-flex tw-items-center tw-flex-wrap tw-pb-2">
              <IonTitle
                className="tw-flex tw-relative tw-min-w-min tw-pb-0 tw-leading-none tw-mt-1"
                size="large"
                slot="start"
              >
                {toolbarTitle}
              </IonTitle>
              {toolbarActions}
            </IonToolbar>
          </IonHeader>
        )}
        {children}
      </IonContent>
    </>
  );
};
