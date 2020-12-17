import {fileSize, extension,propArray , required, file} from "@rxweb/reactive-form-validators"

export class Genre {
    genreID: number;
  }

  export class Tehnology {
    tehnoID: number;
  }

  export class Actor {
    actorID: number;
  }

  export class Movie{
      @file()
      @fileSize({maxSize:2000 })
      @extension({extensions:["jpeg","jpg", "png"]})
    addMovieImage: File;
     
    @required()
    addMovieName: string;

    @required()
    addMovieDesc: string;

    @required()
    addMovieReldate: Object;

    @required()
    addMovieReltime: Object;

    @required()
    addMovieRuntime: number;

    @required()
    addMovieYear: number;

    @required()
    checkArrayGenre: Genre[]

    @required()
    checkArrayTehno: Tehnology[]

    @required()
    checkArrayActor: Actor[];

  }