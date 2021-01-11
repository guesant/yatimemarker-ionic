//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ITrain } from "@ya-time-marker/lib";
import React, { createContext, useState } from "react";
import { IStateSetter } from "../../../../../types/IStateSetter";

export const NewTrainContext = createContext<INewTrainContext>({} as any);

export type INewTrainContext = {
  train: ITrain;
  editIndex: number;
  setTrain: IStateSetter<INewTrainContext["train"]>;
  setEditIndex: IStateSetter<INewTrainContext["editIndex"]>;
};

export const NewTrainProvider: React.FC = ({ children }) => {
  const [editIndex, setEditIndex] = useState<INewTrainContext["editIndex"]>(-1);
  const [train, setTrain] = useState<INewTrainContext["train"]>({
    title: "",
    steps: [],
  });

  return (
    <NewTrainContext.Provider
      value={{ train, editIndex, setTrain, setEditIndex }}
      children={children}
    />
  );
};
