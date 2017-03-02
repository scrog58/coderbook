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
        this.userData = res.data.user;
        this.userId = res.data.user._id;
      })
      .catch((err) => console.dir(err));
    }

    public getUser(id) {
      console.log(id);
      return this.USER_RESOURCE.get({id: id, headers: {
        //TODO figure out sending headers with $resource so we can send x-access-token
      }});
    }

    public getUserId() {
      return this.userId;
    }

    public getUserData() {
      return this.userData;
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
