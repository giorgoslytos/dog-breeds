let breedSubbreedMask = [
  { breed: "australian", subbreed: "shepherd" },
  { breed: "bulldog", subbreed: "boston" },
  { breed: "bulldog", subbreed: "english" },
  { breed: "bulldog", subbreed: "french" },
  { breed: "bullterrier", subbreed: "staffordshire" },
  { breed: "cattledog", subbreed: "australian" },
];

let selectedBreeds = [
  "african",
  "appenzeller",
  "australian",
  "basenji",
  "beagle",
  "bluetick",
  "borzoi",
  "bouvier",
  "brabancon",
  "bulldog",
  "bullterrier",
  "cattledog",
];
let selectedSubBreeds = [
  { breed: "bulldog", subbreed: "boston" },
  { breed: "bulldog", subbreed: "french" },
  { breed: "cattledog", subbreed: "australian" },
];
//search by breed only
selectedBreeds.filter(
  (x) => !selectedSubBreeds.map((x) => x.breed).includes(x)
);
