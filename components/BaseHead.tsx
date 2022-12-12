import { FC } from "react";

export const BaseHead: FC<{ title: string }> = ({ title }) => (
  <>
    <title>{title}</title>
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="description" content="Hiretown app" />
    <link rel="icon" href="/favicon.ico" />
  </>
);
