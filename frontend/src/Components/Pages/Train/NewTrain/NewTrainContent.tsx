//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import produce from "immer";
import React, { useContext, useEffect } from "react";
import CRUDTrainContent from "../CRUD/CRUDTrainContent";
import { NewTrainContext } from "./Hooks/NewTrainContext";

export const NewTrainContent = () => {
  const { train, editIndex, setEditIndex, setTrain } = useContext(
    NewTrainContext
  );

  useEffect(() => {
    (() => {
      const now = new Date();
      setTrain(
        produce(train, (draft) => {
          draft.title = `Treino ${now.toLocaleDateString()}`;
        })
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CRUDTrainContent
        train={train}
        setTrain={setTrain}
        editIndex={editIndex}
        isEditMode={true}
        setEditIndex={setEditIndex}
      />
    </>
  );
};
