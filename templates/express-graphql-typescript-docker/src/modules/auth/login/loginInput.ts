import { InputType, Field } from "type-graphql";
import { MinLength, IsEmail } from "class-validator";

@InputType({ description: "New user data" })
export class LoginInput {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	@MinLength(8)
	password: string;
}
