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
      checked={value >= 1 && value < 2}
    />
    <input
      type="radio"
      name={name}
      className="mask mask-star-2 bg-primary"
      checked={value >= 2 && value < 3}
    />
    <input
      type="radio"
      name={name}
      className="mask mask-star-2 bg-primary"
      checked={value >= 3 && value < 4}
    />
    <input
      type="radio"
      name={name}
      className="mask mask-star-2 bg-primary"
      checked={value >= 4 && value < 5}
    />
    <input
      type="radio"
      name={name}
      className="mask mask-star-2 bg-primary"
      checked={value >= 5}
    />
  </div>
);
