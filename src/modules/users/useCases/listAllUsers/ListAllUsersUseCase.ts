import { User } from "../../model/User";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User does not exists", 400);
    }

    if (user.admin === false) {
      throw new AppError("User is not an admin!", 400);
    }
    
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
