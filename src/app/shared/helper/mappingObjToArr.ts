import { IGetCategories} from './../models/IGetCategories';
export class MappingObjToArr {
    
    
   constructor(private readonly obj:any ){

   }

   public MapingObj(){
    const mapped = Object.keys(this.obj).map(key => ({type: key, value: this.obj[key]}));
     return mapped;     
  }

 /*  public MapingObj(obj: { type: string, value: string }){
        const mapped = Object.keys(obj).map(key => ({type: key, value: obj[key]}));
         return mapped;     
      }*/
      public defaultPropertyChecked( isChecked) {
          this.obj.map((obj) => {
            obj.checked = isChecked;
            return obj;
          })
      }


    
}
