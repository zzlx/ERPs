/**
 * *****************************************************************************
 *
 * 进度条
 *
 * *****************************************************************************
 */

import { createElement as e } from "react";
import { classNames } from "../../utils/index.mts";

export const Progress = props => el("progress", { ...props });
