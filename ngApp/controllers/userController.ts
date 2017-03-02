namespace coderbook2.Controllers {

  export class UserController {
    public user;

    static $inject = ['userService'];

    constructor(private userService) {
      this.user = userService.getUser(userService.getUserId());
    }
  }

}
