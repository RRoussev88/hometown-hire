import clsx from "clsx";
import type { FC } from "react";
import { SeverityLevel } from "../common";
import { Error, Info, Success, Warning } from "./SvgIcons";

export const Alert: FC<{ text: string; mode?: keyof typeof SeverityLevel }> = ({
  text,
  mode,
}) => (
  <div
    className={clsx("alert shadow-lg", {
      "alert-error": mode === SeverityLevel.error,
      "alert-info": mode === SeverityLevel.info,
      "alert-success": mode === SeverityLevel.success,
      "alert-warning": mode === SeverityLevel.warning,
    })}
  >
    <div>
      {mode === SeverityLevel.error && <Error />}
      {mode === SeverityLevel.info && <Info />}
      {mode === SeverityLevel.success && <Success />}
      {mode === SeverityLevel.warning && <Warning />}
      <span>{text}</span>
    </div>
  </div>
);
