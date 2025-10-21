import { createSlice } from "@reduxjs/toolkit";


interface Meme {
  id: number;
  text: string;
  image?: string
}

interface MemesState {
    memes: Meme[]
}
const initialState: MemesState = {
  memes: [
    {
      id: 1,
      text: "ма ща лягу",
      image:
        "https://resizer.mail.ru/p/2268dda8-20f1-5684-8e46-1ce206d6808a/AQAKSxRdOMMduls_SPyQfnfrvxD4nZ3JC8XfWsjZUOrTdixhFEWfYvie9Q5Mffstkox4mFIXwYHGHWH6_clbmOMyW28.webp",
      
    },
    {
      id: 2,
      text: "красавчик",
      image:
        "https://resizer.mail.ru/p/7e71f550-5502-57bf-9cbb-c62cc628b865/AQAK0A7r_JTVN42WENwQUvY7oDz6WHsQJhqVuN2Y4ORIC5A3kphZrOPpQPGdqvADwYGIRoHCImRelRSrQqWp3tlRk28.webp",
      
    },
    {
      id: 3,
      text: "бесполезен",
      image:
        "https://resizer.mail.ru/p/f0a13cd4-381b-58d5-a6db-44c9cf54bc6f/AQAK7zUhQKXQ1tmpCc35B1nwIqAC4EbB1_hRBmoBy6IEHmiWI22kVHOu31A3OeK7Wxe4eMN5-6tWqrD5AH7PboSorgU.webp",
      
    },
    {
      id: 4,
      text: "заболевание",
      image:
        "https://resizer.mail.ru/p/7144e549-cc1d-50b4-8828-ff3fa26a73af/AQAK4TY2YC4xdFe5IfJ57-e-Wh6xIgxF7nAU_v6Si33xOYeA4rOYmdQ5PqbEO7OlC3soB_WHc_XL5q9mG9AEp8SE5hk.webp",
      
    },
    {
      id: 5,
      text: "том",
      image:
        "https://resizer.mail.ru/p/30ead4fc-8af6-569b-ad06-b5ebd0faa17c/AQAKmDAGoQQ5OLHCAdftMb-RC5_tyNacGRsl-OLd_kLA6Xrhsl_iuhN7yRXzAWX-DxqwK652gpk9PUKN1ait2NiPBGY.webp",
      
    },
  ],
};

const memesSlice = createSlice({
    name: 'memes',
    initialState,
    reducers: {
        getMems: (state) => {return state},
        
    }
})

export const {getMems} = memesSlice.actions;
export default memesSlice.reducer
