export interface IOrbit {

    id?:string,
    orbitCode:string,
    showOrder:number,
    orbitShortName: string,
    orbitDescripionHebrew: string,
    orbitDescripionEnglish: string,
    orbitDescripionUkrain: string,
    KM:number,
    KMoutBorder:number,
    isBorder:string | boolean,
    startLocation:string | boolean,
    isOfficial?:boolean
    specialPrice?:{carCode:string,price:number}[]
      
   


}
