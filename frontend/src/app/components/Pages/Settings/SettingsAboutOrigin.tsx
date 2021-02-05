//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import React from "react";
import SVGBandeiraRO from "../../../assets/img/bandeira-ro.svg";

const SettingsAboutOrigin = () => {
  return (
    <>
      <div className="tw-py-4">
        <div className="tw-px-4">
          <div className="tw-pointer-events-none tw-select-none tw-flex tw-flex-wrap tw-items-center tw-opacity-20">
            <p>Feito em Ji-Paraná, RO.</p>
            <span className="tw-ml-1 tw-mr-2">-</span>
            <img
              src={SVGBandeiraRO}
              alt="RO"
              style={{
                borderRadius: "25%",
                width: "1.125rem",
                height: "1.125rem",
                maxWidth: "24px",
                maxHeight: "24px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsAboutOrigin;
