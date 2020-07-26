const container = document.getElementById('container');
const list = document.getElementsByClassName('list');
let newList;

const two = document.getElementById('two');
const four = document.getElementById('four');

//
//
// Intersection Observer

const intersectionOptions = {
  root: null,
  rootMargin: '-100% 0px 0px 0px',
  threshold: 0,
};

let startingPosition = -Infinity;

const intersectionCallback = (entries, observer) => {
  let positionOnIntersection =
    window.pageYOffset || document.documentElement.scrollTop;

  entries.forEach((entry) => {
    // console.log(window.pageYOffset);
    // console.log(document.documentElement.scrollTop);

    if (entry.boundingClientRect.y < 0) {
      two.classList.toggle('slide-from-left');
      two.classList.toggle('slide-left');
      four.classList.toggle('slide-right');
      four.classList.toggle('slide-from-right');

      // if (startingPosition < positionOnIntersection) {
      //   console.log('starting position ', startingPosition);
      //   console.log('down', positionOnIntersection);
      //   // scrolling down
      //   // two.classList.remove('slide-from-left');
      //   // four.classList.remove('slide-from-right');
      //   two.className = 'slide-left';
      //   four.className = 'slide-right';
      //   startingPosition = positionOnIntersection;
      //   console.log('starting position ', startingPosition);
      // } else {
      //   console.log('starting position ', startingPosition);

      //   console.log('up', positionOnIntersection);
      //   // scrolling up
      //   // two.classList.remove('slide-left');
      //   // four.classList.remove('slide-right');
      //   two.className = 'slide-from-left';
      //   four.className = 'slide-from-right';
      //   startingPosition = positionOnIntersection;
      //   console.log('starting position ', startingPosition);
      // }

      // two.classList.remove('slide-from-left');
      // four.classList.remove('slide-from-right');
      // two.classList.add('slide-left');
      // four.classList.add('slide-right');
    }
    // (entry.boundingClientRect.y < 0) so everything happens only if the rectangle is above the window
    // if (
    //   entry.intersectionRatio <= 1 &&
    //   entry.boundingClientRect.y < 0 &&
    //   entry.target.className === 'list'
    // ) {
    //   console.log('!11');
    //   newList = list[list.length - 1].cloneNode(true);
    //   // disconnect observer so elements aren't added when scrolling up
    //   intersectionObserver.disconnect();
    //   container.appendChild(newList);
    //   intersectionObserver.observe(list[list.length - 1]);
    //   intersectionObserver.observe(two[0]);
    //   intersectionObserver.observe(four[0]);
    // }
  });
};

const intersectionObserver = new IntersectionObserver(
  intersectionCallback,
  intersectionOptions
);

intersectionObserver.observe(list[list.length - 1]);
// intersectionObserver.observe(two);
// intersectionObserver.observe(two);

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
