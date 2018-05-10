/* eslint no-undef: 0*/
/* eslint-env node*/
/* flow */

class API {
  // let token = 'token not set';
  // let myHeaders = new Headers();

// test push

  constructor() {
    // console.log('API constructor');
    this.sessionInfo = {
      token: '',
    };

    this.myHeaders = new Headers();
    this.myHeaders.append('Content-Type', 'application/json');
    this.myInit = {
      method: 'POST',
      headers: this.myHeaders,
      cache: 'default' };
    this.token = 'token not set';
    // fetch('https://api.sppx.io/rest/user/token', this.myInit).then(res => res.json().then(data => this.token = data['token']));
    fetch('https://api.sppx.io/rest/user/token', this.myInit).then(res => res.json().then(data => this.token = data.token));
  }
  getToken = () => this.token;

  setToken = () => {
    this.myHeaders.append('X-CSRF-Token', this.token);
  }

  login = () => {
    const logHeaders = new Headers();
    logHeaders.append('Content-Type', 'application/json');

    logHeaders.append('X-CSRF-Token', this.token);

    const logInit = {
      method: 'POST',
      headers: logHeaders,
      body: JSON.stringify({
        username: 'flippanthubris',
        password: '1875Jung1961!',
      }),
      cache: 'default',
    };

    console.log(logHeaders);

    fetch('https://api.sppx.io/rest/user/logout', logInit).then(res => console.log(res.json()));
  }

}

export default API;
