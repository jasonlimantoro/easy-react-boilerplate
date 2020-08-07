import { InputType, Field } from "type-graphql";
import { User } from "../../../entities/User";
import { MinLength, IsEmail } from "class-validator";

@InputType({ description: "New user data" })
export class RegisterInput implements Partial<User> {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	@MinLength(8)
	password: string;
}
