/**
 * *****************************************************************************
 *
 * *****************************************************************************
 */

import {
  useState,
  useMemo,
  useRef,
  createElement as el,
} from 'react';
import { Textarea } from "../components/index.mts";

export function Test (props) {
  const ref = useRef(null);
  const actionHandler = async (formData) => {
    // 
    ref.current.reset();
  };

  const textarea = el(Textarea);

  return el("form", { ref: ref, action: actionHandler }, textarea);
}


