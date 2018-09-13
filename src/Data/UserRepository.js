import axios from 'axios';

class UserRepository{

  baseUrl = "https://tq-template-server-sample.herokuapp.com/";

  static Instance(){
    var instance;
    if(!instance)
      instance = new UserRepository();
    return instance
  }

  getUserList = (page, window) => {
    return axios.get(
      `${this.baseUrl}users?pagination={"page": ${page}, "window": ${window}}`,
      {headers: {Authorization: localStorage.getItem("token")}})
    .then(response => {
      return response.data.data;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getTotalUsers = () => {
    return axios.get(`${this.baseUrl}users`, {headers: {Authorization: localStorage.getItem("token")}})
      .then(response => {
        return response.data.pagination.total
      });
  }

  getUserDetail = (id) => {
    return axios.get('https://tq-template-server-sample.herokuapp.com/users/' + id,
      {headers: { Authorization: localStorage.getItem("token") } })
    .then(response => {return response.data.data});
  }

  createUser = (user) => {
    return axios.post('https://tq-template-server-sample.herokuapp.com/users', user,
      { headers: { Authorization: localStorage.getItem("token") } })
    .then(() => {return true})
    .catch(() => {return false});
  }

  editUser = (id, user) => {
    return axios.put('https://tq-template-server-sample.herokuapp.com/users/' + id, user,
    { headers: { Authorization: localStorage.getItem("token") } })
    .then(() => {return true})
    .catch(() => { return false});
  }

  validateUser = (userInfo) => {
    return axios.post('https://tq-template-server-sample.herokuapp.com/authenticate', userInfo)
    .then(response => {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("name", response.data.data.user.name);
      return true;})
    .catch(() => {
      return false;
    });
  }

}
export default UserRepository