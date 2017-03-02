namespace coderbook2.Services {

  export default class UserService {
    private ENDPOINT = '/api/users/';
    private USER_RESOURCE = this.$resource(this.ENDPOINT + ':id');
    private LOGIN = this.ENDPOINT + 'login';
    private REGISTER = this.ENDPOINT + 'register';

    static $inject = ['$resource', '$http', '$window'];

    constructor(private $resource, private $http, private $window) {}

    public login(username, password) {
      return this.$http.post(this.LOGIN, {
        username: username,
        password: password
      })
      .then((res) => {
        console.dir(res);
        this.setToken(res.data.token);
        console.log(this.getToken());
      })
      .catch((err) => console.dir(err));
    }

    public isLoggedIn() {
      return this.getToken();
    }

    public getToken() {
      return this.$window.localStorage.token;
    }

    public setToken(token) {
      this.$window.localStorage.setItem('token', token);
    }

  }

angular.module('coderbook2').service('userService', UserService);
}
