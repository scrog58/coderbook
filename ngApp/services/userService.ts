namespace coderbook2.Services {

  export default class UserService {
    private ENDPOINT = '/api/users/';
    private USER_RESOURCE = this.$resource(this.ENDPOINT + ':id');
    private LOGIN = this.ENDPOINT + 'login';
    private REGISTER = this.ENDPOINT + 'register';

    private userId;
    private userData;

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
        this.userId = res.data.user._id;
        this.$window.sessionStorage.setItem('userId', this.userId);
      })
      .catch((err) => console.dir(err));
    }

    public getUser(id) {
      console.log(id);
      return this.USER_RESOURCE.get({id: id});
    }

    public getUserId() {
      return this.userId;
    }

    public getUserData() {
      if (!this.userData) {
        this.$http.defaults.headers.common['x-access-token'] = this.getToken();
        this.userData = this.getUser(this.$window.sessionStorage.userId);
      }
      return this.userData;
    }

    public isLoggedIn() {
      return this.getToken();
    }

    public getToken() {
      return this.$window.sessionStorage.token;
    }

    public setToken(token) {
      this.$window.sessionStorage.setItem('token', token);
      this.$http.defaults.headers.common['x-access-token'] = token;
    }

  }

angular.module('coderbook2').service('userService', UserService);
}
