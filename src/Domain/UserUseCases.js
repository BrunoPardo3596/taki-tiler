import UserRepository from '../Data/UserRepository';

class UserUseCases{

  constructor(userRepository){
    this.userRepository = userRepository;
  }

  static Instance(userRepo){
    var instance;
    if(!instance)
      instance = new UserRepository(userRepo);
    return instance
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
export default UserUseCases;