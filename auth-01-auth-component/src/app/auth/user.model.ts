export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date) {
  }

  get token() {
    if (!this._token || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
