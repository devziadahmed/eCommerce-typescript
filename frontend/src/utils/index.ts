export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let lastTime = 0;

  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    const now = new Date().getTime();

    if (now - lastTime < delay) return;

    lastTime = now;
    fn(...args);
  };
}

export function formatPrice(value: number, locale = "en-EG", currency = "EGP") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    currencyDisplay: "code",
  }).format(value);
}
