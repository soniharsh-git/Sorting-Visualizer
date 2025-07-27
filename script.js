let array = [];
const container = document.getElementById('array-container');
const sizeSlider = document.getElementById('size');
const sizeValue = document.getElementById('size-value');
const speedSlider = document.getElementById('speed');

sizeValue.textContent = sizeSlider.value;
sizeSlider.addEventListener('input', () => {
  sizeValue.textContent = sizeSlider.value;
  generateArray();
});

speedSlider.addEventListener('input', () => {
  speed = 101 - speedSlider.value;
});

let speed = 101 - speedSlider.value;

function generateArray() {
  container.innerHTML = '';
  array = [];
  const size = parseInt(sizeSlider.value);

  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 300) + 10;
    array.push(value);

    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value}px`;
    bar.style.width = `${600 / size}px`;

    if (size <= 30) {
      const label = document.createElement('span');
      label.innerText = value;
      label.classList.add('bar-label');
      bar.appendChild(label);
    }

    container.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(el1, el2) {
  const temp = el1.style.height;
  el1.style.height = el2.style.height;
  el2.style.height = temp;

  const label1 = el1.querySelector('.bar-label');
  const label2 = el2.querySelector('.bar-label');

  if (label1 && label2) {
    const tempText = label1.innerText;
    label1.innerText = label2.innerText;
    label2.innerText = tempText;
  }
}

// Sorting Algorithms

async function bubbleSort(bars) {
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      bars[j].style.background = 'red';
      bars[j + 1].style.background = 'red';
      await sleep(speed);

      const val1 = parseInt(bars[j].style.height);
      const val2 = parseInt(bars[j + 1].style.height);

      if (val1 > val2) {
        bars[j].style.background = 'blue';
        bars[j + 1].style.background = 'blue';
        swap(bars[j], bars[j + 1]);
        await sleep(speed);
      }

      bars[j].style.background = '#00adb5';
      bars[j + 1].style.background = '#00adb5';
    }
    bars[bars.length - 1 - i].style.background = 'green';
  }
  bars[0].style.background = 'green';
}

async function selectionSort(bars) {
  for (let i = 0; i < bars.length; i++) {
    let minIdx = i;
    bars[minIdx].style.background = 'yellow';

    for (let j = i + 1; j < bars.length; j++) {
      bars[j].style.background = 'red';
      await sleep(speed);

      if (parseInt(bars[j].style.height) < parseInt(bars[minIdx].style.height)) {
        if (minIdx !== i) bars[minIdx].style.background = '#00adb5';
        minIdx = j;
        bars[minIdx].style.background = 'yellow';
      } else {
        bars[j].style.background = '#00adb5';
      }
    }

    if (minIdx !== i) {
      swap(bars[i], bars[minIdx]);
    }
    bars[minIdx].style.background = '#00adb5';
    bars[i].style.background = 'green';
  }
}

async function insertionSort(bars) {
  for (let i = 1; i < bars.length; i++) {
    let j = i;
    while (j > 0 && parseInt(bars[j].style.height) < parseInt(bars[j - 1].style.height)) {
      bars[j].style.background = 'orange';
      bars[j - 1].style.background = 'orange';
      await sleep(speed);
      swap(bars[j], bars[j - 1]);
      bars[j].style.background = '#00adb5';
      bars[j - 1].style.background = '#00adb5';
      j--;
    }
  }
  bars.forEach(bar => (bar.style.background = 'green'));
}

async function mergeSort(bars, l, r) {
  if (l >= r) return;
  const m = l + Math.floor((r - l) / 2);
  await mergeSort(bars, l, m);
  await mergeSort(bars, m + 1, r);
  await merge(bars, l, m, r);
}

async function merge(bars, l, m, r) {
  const left = bars.slice(l, m + 1).map(bar => parseInt(bar.style.height));
  const right = bars.slice(m + 1, r + 1).map(bar => parseInt(bar.style.height));

  let i = 0, j = 0, k = l;

  while (i < left.length && j < right.length) {
    bars[k].style.background = 'yellow';
    await sleep(speed);
    if (left[i] <= right[j]) {
      bars[k].style.height = `${left[i]}px`;
      if (bars[k].querySelector('.bar-label')) {
        bars[k].querySelector('.bar-label').innerText = left[i];
      }
      i++;
    } else {
      bars[k].style.height = `${right[j]}px`;
      if (bars[k].querySelector('.bar-label')) {
        bars[k].querySelector('.bar-label').innerText = right[j];
      }
      j++;
    }
    bars[k].style.background = '#00adb5';
    k++;
  }

  while (i < left.length) {
    bars[k].style.background = 'yellow';
    await sleep(speed);
    bars[k].style.height = `${left[i]}px`;
    if (bars[k].querySelector('.bar-label')) {
      bars[k].querySelector('.bar-label').innerText = left[i];
    }
    bars[k].style.background = '#00adb5';
    i++;
    k++;
  }

  while (j < right.length) {
    bars[k].style.background = 'yellow';
    await sleep(speed);
    bars[k].style.height = `${right[j]}px`;
    if (bars[k].querySelector('.bar-label')) {
      bars[k].querySelector('.bar-label').innerText = right[j];
    }
    bars[k].style.background = '#00adb5';
    j++;
    k++;
  }

  if (r - l + 1 === bars.length) {
    for (let i = l; i <= r; i++) {
      bars[i].style.background = 'green';
    }
  }
}

async function quickSort(bars, low, high) {
  if (low < high) {
    const pi = await partition(bars, low, high);
    await quickSort(bars, low, pi - 1);
    await quickSort(bars, pi + 1, high);
  } else if (low >= 0 && high >= 0 && low < bars.length && high < bars.length) {
    bars[low].style.background = 'green';
    bars[high].style.background = 'green';
  }
}

async function partition(bars, low, high) {
  const pivot = parseInt(bars[high].style.height);
  bars[high].style.background = 'yellow';
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    bars[j].style.background = 'red';
    await sleep(speed);
    if (parseInt(bars[j].style.height) < pivot) {
      i++;
      swap(bars[i], bars[j]);
    }
    bars[j].style.background = '#00adb5';
  }

  swap(bars[i + 1], bars[high]);
  bars[high].style.background = '#00adb5';
  bars[i + 1].style.background = 'green';
  return i + 1;
}

// Event Listeners
document.getElementById('generate').addEventListener('click', generateArray);

document.getElementById('start').addEventListener('click', async () => {
  const algo = document.getElementById('algorithm').value;
  const bars = document.querySelectorAll('.bar');

  switch (algo) {
    case 'bubble': await bubbleSort(bars); break;
    case 'selection': await selectionSort(bars); break;
    case 'insertion': await insertionSort(bars); break;
    case 'merge': await mergeSort(bars, 0, bars.length - 1); break;
    case 'quick': await quickSort(bars, 0, bars.length - 1); break;
  }
});

generateArray();