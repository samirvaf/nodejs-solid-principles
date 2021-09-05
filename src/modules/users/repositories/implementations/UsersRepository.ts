import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    const current_date = new Date();

    Object.assign(user, {
      name,
      email,
      created_at: current_date,
      updated_at: current_date
    })

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find(t => t.id === id);
    return user
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find(t => t.email === email);
    return user
  }

  turnAdmin(receivedUser: User): User {
    receivedUser.admin = true;
    receivedUser.updated_at = new Date();
    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
