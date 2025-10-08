export type User ={
    id:string;
    displayName:string;
    email:string;
    token:string;
    imageUrl:string;
}
export type LoginCreds ={
    email:string;
    password:string;
}
export type RegisterCreds ={
    email:string;
    disPlayName:string;
    password:string;
    gender: string;
    dateOfBirth: string;
    city: string;
    country: string;
}