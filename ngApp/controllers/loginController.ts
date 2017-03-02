namespace coderbook2.Controllers {

  export class LoginController {
    public username;
    public password;

    static $inject = ['$state', 'userService'];

    constructor(private $state, private userService) {}

    public login() {
      this.userService.login(this.username, this.password)
        .then((res) => {
          console.log('yes you can do it');
          this.$state.go('user');
        });

    }
  }

}
