import { cn } from "@common/lib/utils";
import { useEffect, useState } from "react";

export default function Rating({ value = 0, onChange, className, ...args }) {
  const [rating, setRating] = useState(value);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleRatingChange = (index) => {
    setRating(index + 1);
    if (onChange) {
      onChange(index + 1);
    }
  };

  const items = Array.from({ length: 10 }, (_, index) => (
    <RatingItem
      key={index}
      index={index}
      rating={rating}
      onClick={() => handleRatingChange(index)}
      className={cn(`mask mask-star-2 ${index % 2 === 0 ? 'mask-half-1' : 'mask-half-2'} bg-primary`, className)}
    />
  ));

  return (
    <div className="flex items-center text-lg gap-4">
      <div className="rating rating-lg rating-half">{items}</div>
      <span className="font-bold">{rating}</span>
    </div>
  );
}

function RatingItem({ index, rating, onClick, className }) {
  return (
    <input type="radio" name="rating-10"
      className={cn(className, { 'bg-primary': index < rating })}
      onClick={onClick}
    />
  );
}