function showScrollItem() {
  const scrollItems = document.querySelectorAll('.scroll-item');
  const isWindowDefined = typeof window !== 'undefined';

  if (!isWindowDefined) return;

  for (const item of scrollItems) {
    const itemRect = item.getBoundingClientRect();

    if (itemRect.top < window.innerHeight) {
      item.style.opacity = 1;
      item.style.transform = 'translateY(0)';
    } else {
      item.style.opacity = 0;
      item.style.transform = 'translateY(2rem)';
    }
  }
}
