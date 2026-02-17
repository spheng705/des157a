(function () {
  "use strict";
  console.log("reading js");

  const bag = document.getElementById("bag");
  const items = document.querySelectorAll(".item");

  let itemsOut = 0;
  const itemList = ["ball", "sauce", "svt", "mahjong"];

  let isAnimating = false;

  bag.addEventListener("click", function () {
    if (isAnimating) return;
    isAnimating = true;

    setTimeout(() => {
      isAnimating = false;
    }, 650);

    if (itemsOut === itemList.length) {
      items.forEach((item) => item.classList.remove("revealed"));
      itemsOut = 0;
    } else {
      const nextItem = document.querySelector("." + itemList[itemsOut]);
      nextItem.classList.add("revealed");
      itemsOut++;
    }
  });
})();
