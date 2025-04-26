export function playSound(soundPath) {
  const audio = new Audio(soundPath);
  audio.volume = 1;
  audio.play().catch(error => {
    console.error('Error al reproducir el sonido:', error);
  });
}
