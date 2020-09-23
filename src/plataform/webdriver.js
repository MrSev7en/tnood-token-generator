try {
  Object.defineProperty(navigator, 'languages', {
    get: () => {
      return ['en-US', 'en'];
    },
  });
} catch {}

try {
  Object.defineProperty(navigator, 'plugins', {
    get: () => {
      return [1, 2, 3, 4, 5];
    },
  });
} catch {}

delete navigator.__proto__.webdriver;
