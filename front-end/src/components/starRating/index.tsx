interface StarRatingProps {
  readonly rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 10 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-star-${i + 1}`} className="text-yellow-500">
          ★
        </span>
      ))}
      {halfStar && <span className="text-yellow-500">☆</span>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-star-${fullStars + (halfStar ? 1 : 0) + i + 1}`} className="text-gray-300">
          ★
        </span>
      ))}
      <span className="ml-2 text-gray-600">{rating}/10</span>
    </div>
  );
}
