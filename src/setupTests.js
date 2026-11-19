import '@testing-library/jest-dom';

window.matchMedia = window.matchMedia || ((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false
}));

window.scrollTo = window.scrollTo || (() => {});

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

window.IntersectionObserver = window.IntersectionObserver || ObserverStub;
window.ResizeObserver = window.ResizeObserver || ObserverStub;
