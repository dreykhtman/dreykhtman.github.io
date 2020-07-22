const container = document.getElementById('container');
const list = document.getElementsByClassName('list');
let newList;

//
//
// Intersection Observer

const intersectionOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

const intersectionCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // (entry.boundingClientRect.y < 0) so everything happens only if the rectangle is above the window
    if (entry.intersectionRatio <= 1 && entry.boundingClientRect.y < 0) {
      newList = list[list.length - 1].cloneNode(true);

      // disconnect observer so elements aren't added when scrolling up
      intersectionObserver.disconnect();

      container.appendChild(newList);
      intersectionObserver.observe(list[list.length - 1]);
    }
  });
};

const intersectionObserver = new IntersectionObserver(
  intersectionCallback,
  intersectionOptions
);

intersectionObserver.observe(list[list.length - 1]);

//
//
// Mutation Observer

const mutationOptions = {
  childList: true,
};

let divCounter = parseInt(document.getElementById('counter').innerText, 10);

const mutationCallback = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      document.getElementById('counter').innerText = ++divCounter;
    }
  }
};

const mutationObserver = new MutationObserver(mutationCallback);
mutationObserver.observe(container, mutationOptions);
