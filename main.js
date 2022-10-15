let worng = document.querySelector(".wrong span");
let boxContainer = document.querySelector(".box-container");
let boxes = Array.from(boxContainer.children);
let boxIndex = [...Array.from([...boxes]).keys()];

function order(box) {
  let count = box.length;
  let temp, random;
  while (count > 0) {
    random = Math.floor(Math.random() * count);
    count--;
    temp = box[count];
    box[count] = box[random];
    box[random] = temp;
  }
  return box;
}

order(boxIndex);

boxes.forEach((box, index) => {
  box.style.order = boxIndex[index];
  box.addEventListener("click", () => {
    box.classList.add("is-flip");
    fliped();
  });
});
let countGame = 0;
function fliped() {
  let flip = boxes.filter((box) => box.classList.contains("is-flip"));
  if (flip.length === 2) {
    boxContainer.style.pointerEvents = "none";
    if (flip[0].dataset.tech == flip[1].dataset.tech) {
      flip[0].classList.remove("is-flip");
      flip[1].classList.remove("is-flip");

      flip[0].classList.add("fliped");
      flip[1].classList.add("fliped");
      countGame++;
      boxContainer.style.pointerEvents = "auto";
    } else {
      worng.innerHTML++;
      setTimeout(() => {
        flip[0].classList.remove("is-flip");
        flip[1].classList.remove("is-flip");
        boxContainer.style.pointerEvents = "auto";
      }, 1000);
    }
  }
  if (countGame == boxes.length / 2) {
    document.querySelector(".win").style.display = "flex";
  }
}
let timer = document.querySelector(".time span");
let time = 1.5;
let sec = time * 60;
timer.innerHTML = `${Math.floor(time)}:${sec % 60}`;
function countDown() {
  sec--;
  let min = sec / 60;
  let second = sec % 60;
  timer.innerHTML = `0${Math.floor(min)}:${
    second < 10 ? `0${second}` : second
  }`;
}
let lose = document.querySelector(".loser");

document.querySelector(".pop button").onclick = function () {
  let doc = prompt("Enter Your Name");
  document.querySelector(".pop").style.display = "none";
  document.querySelector(".name span").innerHTML = doc;
  if (doc == null || doc == "") {
    document.querySelector(".name span").innerHTML = "Undefined";
  }
  boxes.forEach((box) => {
    box.classList.add("is-flip");
  });
  setTimeout(() => {
    boxes.forEach((box) => {
      box.classList.remove("is-flip");
    });
  }, 2000);
  let count = setInterval(() => {
    countDown();
    if (sec == 0) {
      clearInterval(count);
      lose.style.display = "flex";
      boxContainer.style.pointerEvents = "none";
    }
    if (countGame == boxes.length / 2) {
      clearInterval(count);
    }
  }, 1000);
};
