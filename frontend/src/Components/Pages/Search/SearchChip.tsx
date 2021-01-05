import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React from "react";

export type SearchChipProps = {
  isSelected: boolean;
  chipText: string;
  onSelect: () => any;
  onDeselect: () => any;
};
export const SearchChip: React.FC<SearchChipProps> = ({
  isSelected,
  chipText,
  onSelect,
  onDeselect,
}) => {
  return (
    <IonChip
      color="primary"
      outline={!isSelected}
      onClick={() => {
        if (!isSelected) onSelect();
      }}
    >
      <IonLabel>{chipText}</IonLabel>
      {isSelected && (
        <IonIcon
          icon={closeCircle}
          onClick={(event) => {
            event.stopPropagation();
            isSelected && onDeselect();
          }}
        />
      )}
    </IonChip>
  );
};
