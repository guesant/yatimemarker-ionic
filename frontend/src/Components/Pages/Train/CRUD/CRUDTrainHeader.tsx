import { IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

export type CRUDTrainHeaderProps = {
  pageTitle: string;
  beforeTitle: any;
  afterTitle: any;
};

const CRUDTrainHeader: React.FC<CRUDTrainHeaderProps> = ({
  pageTitle,
  afterTitle,
  beforeTitle,
}) => {
  return (
    <IonToolbar>
      {beforeTitle}
      <IonTitle>{pageTitle}</IonTitle>
      {afterTitle}
    </IonToolbar>
  );
};

export default CRUDTrainHeader;
