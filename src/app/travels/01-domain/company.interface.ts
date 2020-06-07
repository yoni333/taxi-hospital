import {ICarCompany} from './car-company.interface';
export interface ICompany {


    id?: string;
    companyCode: string;
    companyName: string;
    companyNameUkrain: string;
    owner: string;
    ownerUkrain: string;
    phone1: string;
    phone2: string;
    phoneOffice: string;
    city: string;
    cityUkrain: string;
    adress: string;
    adressUkrain: string;

    travels: [{}];
    drivers: {}[];

    cars: ICarCompany[];
    driverAppUID: string;
    driverAppEmail: string;

}
