export class UserModel {

  constructor(

    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid? : string

  ) {

    

  }

}
