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