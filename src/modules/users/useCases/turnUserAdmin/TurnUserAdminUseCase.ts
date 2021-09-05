import { AppError } from "../../../../errors/AppError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if (!user) { 
      throw new AppError("User with given ID does not exists", 404);
    }

    const updatedUser = this.usersRepository.turnAdmin(user);

    return updatedUser;
  }
}

export { TurnUserAdminUseCase };
