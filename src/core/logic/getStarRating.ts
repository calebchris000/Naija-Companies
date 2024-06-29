export const getStarRating = (rating: number) => {
  // rating = Math.max(0.5, Math.min(5, rating));
  const initial_stars = new Array(5).fill("☆");

  const full_stars = Math.floor(rating);
  const has_half_star = rating % 1 !== 0;
  if (rating > 0.5) {
    for (let i = 0; i < full_stars; i += 1) {
      initial_stars[i] = "★";
    }
  }
  if (has_half_star) {
    initial_stars[full_stars] = "⯨";
  }
  return initial_stars;
};

export const getStarColor = (star: number): string => {
  if(!star) {
    return "black"
  }
  if (star < 2.5) {
    return "red";
  } else if (star >= 2.5 && star <= 3.5) {
    return "orange";
  } else {
    return "green";
  }
};
