document.querySelector(".pop button").onclick = function () {
  let doc = prompt("Enter Your Name");
  document.querySelector(".pop").style.display = "none";
  document.querySelector(".name span").innerHTML = doc;
  if (doc == null || doc == "") {
    document.querySelector(".name span").innerHTML = "Undefined";
  }
};

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
      console.log(countGame);
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
