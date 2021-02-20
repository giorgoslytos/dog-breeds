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

let abc = {
  message: [
    "https://images.dog.ceo/breeds/akita/512px-Ainu-Dog.jpg",
    "https://images.dog.ceo/breeds/akita/512px-Akita_inu.jpeg",
    "https://images.dog.ceo/breeds/akita/Akina_Inu_in_Riga_1.jpg",
    "https://images.dog.ceo/breeds/akita/Akita_Dog.jpg",
    "https://images.dog.ceo/breeds/akita/Akita_Inu_dog.jpg",
    "https://images.dog.ceo/breeds/akita/Akita_hiking_in_Shpella_e_Pellumbasit.jpg",
    "https://images.dog.ceo/breeds/akita/Akita_inu_blanc.jpg",
    "https://images.dog.ceo/breeds/akita/An_Akita_Inu_resting.jpg",
    "https://images.dog.ceo/breeds/akita/Japaneseakita.jpg",
  ],
  status: "success",
};

let def = {
  message: "https://images.dog.ceo/breeds/african/n02116738_10895.jpg",
  status: "success",
};
