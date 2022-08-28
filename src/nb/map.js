const map = new Map();
map.set("easy", 0.333333333333);
map.set("medium", 1.0333333333333);
map.set("hard", 1.0333333333333);

Array.from(map.entries()).map((label) => {
  console.log(label);
});
