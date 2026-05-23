export function isValidEmail(email) {
  const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return emailPattern.test(email);
}

export function getExercisesLimit() {
  if (window.innerWidth < 768) return 8;  // mobile
  return 10;                              // tablet + desktop
}


export function hasUserAlreadyRated(exerciseId, email) {
  const ratedExercises = JSON.parse(localStorage.getItem('ratedExercises')) || [];
  return ratedExercises.some(
    item => item.exerciseId === exerciseId && item.email === email
  );
}

export function saveRatedExercise(exerciseId, email) {
  const ratedExercises = JSON.parse(localStorage.getItem('ratedExercises')) || [];
  ratedExercises.push({ exerciseId, email });
  localStorage.setItem('ratedExercises', JSON.stringify(ratedExercises));
}