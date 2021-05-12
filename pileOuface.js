let pile = 0;
let face = 0;

function tirer() {
  if (Math.random() > 0.5) {
    pile++;
    document.getElementById("text").innerHTML = "Pile";
  } else {
    face++;
    document.getElementById("text").innerHTML = "Face";
  }

  if (pile >= 10) {
    document.location.href = "easy.html";
  }
}
