/*export interface IGetMovies{
           actors: string,
          categories: string,
          id:number,
          img: string
          name: string,
         price: number
          desc: string,
          rel:string,
          runtime: number,
          tehnologies: string,
         year: number
}*/

export interface IGetMovies{
    id:number;
    name: string;
    desc: string;
    rel:string;
    runtime: number;
    img: string;
    year: number;
    tehnologies: string;
   categories: string;
   actors: string;
   price: number;
}

export interface addMovie{
    id:number;
    addMovieName: string;
    addMovieDesc: string;
    addMovieReldate:string;
    addMovieReltime:string;
    addMovieRuntime: number;
    addMovieImage: Object;
    addMovieYear: number;
    checkArrayTehno: number[];
    checkArrayGenre: number[];
    checkArrayActor: number[];
}

export interface updateMovie{
    id:number;
    img: {id: number , link: string};
    addMovieName: string;
    addMovieDesc: string;
    addMovieReldate:string;
    addMovieReltime:string;
    addMovieRuntime: number;
    addMovieImage: Object;
    addMovieYear: number;
    checkArrayTehno: number[];
    checkArrayGenre: number[];
    checkArrayActor: number[];
}

export interface addMovieResponse {
    message: string;
    }