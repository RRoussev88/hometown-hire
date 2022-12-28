import { FC } from "react";

export const RatingDisplay: FC<{ name: string; value: number }> = ({
  name,
  value,
}) => (
  <div className="rating rating-sm">
    <input
      type="radio"
      name={name}
      className="mask mask-star-2 bg-primary"
      defaultChecked={value <= 1}
    />
    <input
      type="radio"
      name={name}
      className="mask mask-star-2 bg-primary"
      defaultChecked={value > 1 && value <= 2}
    />
    <input
      type="radio"
      name={name}
      className="mask mask-star-2 bg-primary"
      defaultChecked={value > 2 && value <= 3}
    />
    <input
      type="radio"
      name={name}
      className="mask mask-star-2 bg-primary"
      defaultChecked={value > 3 && value <= 4}
    />
    <input
      type="radio"
      name={name}
      className="mask mask-star-2 bg-primary"
      defaultChecked={value > 4}
    />
  </div>
);
