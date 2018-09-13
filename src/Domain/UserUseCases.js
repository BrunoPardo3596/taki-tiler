import UserRepository from '../Data/UserRepository';

class UserUseCases{

  constructor(){
    this.userRepository = UserRepository;
  }

  getUserList = (page, window) => {
    return this.userRepository.getUserList(page, window);
  }

  getTotalUsers = () => {
    return this.userRepository.getTotalUsers();
  }

  getUserDetail = (id) => {
    return this.userRepository.getUserDetail(id);
  }

  createUser = (user) => {
    return this.userRepository.createUser(user)
  }

  editUser = (id, user) => {
    return this.userRepository.editUser(id, user);
  }

  validateUser = (userInfo) => {
    return this.userRepository.validateUser(userInfo);
  }

}
const instance = new UserUseCases();
Object.freeze(instance);
export default instance;