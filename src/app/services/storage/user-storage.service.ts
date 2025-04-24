import { Injectable } from '@angular/core';

const TOKEN='ecom-token';
const USER='ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  
  constructor() { }

  public saveToken(token: string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

  public saveUser(user):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  static getToken(): string{
    return localStorage.getItem(TOKEN);
  }

  static getUser():any{
    return JSON.parse(localStorage.getItem(USER));
  }
  static getUserRole():string{
    const user=this.getUser();
    if(user==null){
      return'';
    }
    return user.role;
  }

  // static getUserId() : number {
  //   const user=this.getUser();
  //   if(user==null){
  //     console.log("No user ID found")
  //     return -1;
  //   }
  //   return user.id;
  // }
  static getUserId():number{
    const user=this.getUser();
    return user?.userId ?? null;
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken() ===null){
      return false;
    }
    const role: string=this.getUserRole();
    return role=='ROLE_ADMIN';
  }
  static isCustomerLoggedIn(): boolean{
    if(this.getToken() ===null){
      return false;
    }
    const role: string=this.getUserRole();
    return role=='ROLE_CUSTOMER';
  }

  static signout(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
