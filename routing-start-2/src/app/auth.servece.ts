import set = Reflect.set;

export class AuthServece {
  isLogged = false;
  logIn() {
    this.isLogged = true;
  }
  logOut() {
    this.isLogged = false;
  }
  isAuthenticated() {
    const promise = new Promise(((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLogged);
      }, 500);
    }));
    return promise;
  }
}
