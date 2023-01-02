import type { FC } from "react";
import { SeverityLevel } from "../common";
import { Error, Info, Success, Warning } from "./SvgIcons";

export const Alert: FC<{ text: string; mode?: keyof typeof SeverityLevel }> = ({
  text,
  mode,
}) => (
  <div className={`alert alert-${mode} shadow-lg`}>
    <div>
      {mode === SeverityLevel.error && <Error />}
      {mode === SeverityLevel.info && <Info />}
      {mode === SeverityLevel.success && <Success />}
      {mode === SeverityLevel.warning && <Warning />}
      <span>{text}</span>
    </div>
  </div>
);
