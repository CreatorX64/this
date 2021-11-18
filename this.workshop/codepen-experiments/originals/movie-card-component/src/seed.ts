export interface Movie {
  genre: string;
  title: string;
  description: string;
  imgSrc: string;
  rating: string;
  reviewCount: number;
  backgroundColor: string;
}

export const seed: Movie[] = [
  {
    genre: "Sci-Fi",
    title: "TRON: Legacy",
    description:
      "The son of a virtual world designer goes looking for his father and ends up inside the digital world that his father designed. He meets his father's corrupted creation and a unique ally who was born inside the digital world.",
    imgSrc: "https://i.ibb.co/dJpPbYY/poster-1.jpg",
    rating: "6.8",
    reviewCount: 42,
    backgroundColor: "linear-gradient(to right, #016070, #002a3d)"
  },
  {
    genre: "Crime",
    title: "Kiss Kiss Bang Bang",
    description:
      "After being mistaken for an actor, a New York thief is sent to Hollywood to train under a private eye for a potential movie role, but the duo are thrown together with a struggling actress into a murder mystery.",
    imgSrc: "https://i.ibb.co/jyXbTrR/poster-2.jpg",
    rating: "7.5",
    reviewCount: 11,
    backgroundColor: "linear-gradient(to right, #3C8FC2, #282E82)"
  },
  {
    genre: "Drama",
    title: "The Social Network",
    description:
      "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out.",
    imgSrc: "https://i.ibb.co/dJM43RK/poster-3.jpg",
    rating: "7.7",
    reviewCount: 27,
    backgroundColor: "linear-gradient(to right, #423330, #171A23)"
  }
];
