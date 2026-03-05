(function () {
  "use strict";

  const bag = document.getElementById("bag");
  const layout = document.querySelector(".layout");
  const endOverlay = document.getElementById("end-overlay");
  const resetBtn = document.getElementById("reset-btn");

  // item position, story, and order
  const inventory = [
    { img: "images/ball.svg", x: 20, y: 25, story: "I've played golf since I was 5, and played competitively until senior year of high school. These are the golf balls I used for tournaments to win!" },
    { img: "images/sauce.svg", x: 88, y: 37, story: "I love cooking and learned from my dad. Oyster Sauce is and essential and the best sauce to make everything yummy :P" },
    { img: "images/mahjong.svg", x: 12, y: 80, story: "I first learned how to play by watching my Aunts. Now, Thursday is mahjong night with my friends!" },
    { img: "images/svt.svg", x: 88, y: 80, story: "K-Pop and music in general is a big part of my life. This lightstick's from my favorite group SEVENTEEN <3" },
    { img: "images/miffy.svg", x: 75, y: 55, story:"Miffy obsession started during my internship in Japan where I bought one too many of these keychains in almost every color..." }, 
    { img: "images/shark.svg", x: 13, y: 50, story: "I lost my airpods after I moved and found them over a year later in my slippers?? A funny story to an essential item" },
    { img: "images/owala.svg", x: 30, y: 55, story: "Collecting water bottles has always been a weird hobby. I've always been a Hydroflask user until this owala color dropped- I LOVE IT" },
    { img: "images/glass.svg", x: 50, y: 88, story: "I broke my glasses in Taiwan during a family trip and bought these as a replacement and souvenir. I can't see without them, literally!" },
    { img: "images/chap.svg", x: 30, y: 88, story: "For christmas my sister bought me a chapstick advent calendar. At first I was like okay, but now without I crash out- A MUST HAVE ALWAYS" },
    { img: "images/kuroo.svg", x: 70, y: 80, story: "My favorite anime is Haikyuu!! and I have an editing page dedicated to it! Guess how many followers I have-" },
    { img: "images/camera.svg", x: 70, y: 33, story: "My most expensive hobby is attending concerts and bringing my camera to capture my favorite artists and songs. Next up is Ariana Grande and BTS~" },
  ];

  let isAnimating = false;
  let currentIndex = 0;

  // clicking bag
  bag.addEventListener("click", function () {
    if (isAnimating) return;

    if (currentIndex >= inventory.length) {
      endOverlay.style.display = "flex";
      return;
    }

    isAnimating = true;

    const data = inventory[currentIndex]; 

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    itemContainer.innerHTML = `
      <div class="story-overlay">${data.story}</div>
      <img src="${data.img}" class="item-img">
    `;

    itemContainer.style.left = "50%";
    itemContainer.style.top = "50%";
    itemContainer.style.transform = "translate(-50%, -50%) scale(0)";
    itemContainer.style.opacity = "0";

    layout.appendChild(itemContainer);

    setTimeout(() => {
      itemContainer.style.left = `${data.x}%`;
      itemContainer.style.top = `${data.y}%`;
      itemContainer.style.transform = "translate(-50%, -50%) scale(1)";
      itemContainer.style.opacity = "1";
    }, 20);

    currentIndex++;

    setTimeout(() => {
      isAnimating = false;
    }, 300);
  });

  // reset items hop back in
  resetBtn.addEventListener("click", function () {
    endOverlay.style.display = "none";
    
    const items = document.querySelectorAll(".item-container");
    
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.left = "50%";
        item.style.top = "50%";
        item.style.transform = "translate(-50%, -50%) scale(0)";
        item.style.opacity = "0";
      }, index * 40); 
    });

    // reset counter
    setTimeout(() => {
      items.forEach(el => el.remove());
      currentIndex = 0;
    }, 800 + (items.length * 40)); 
  });

})();