import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entities/User";
import { ExpressContext } from "../../types/interfaces";
import config from "../../lib/config";
import bcrypt from "bcryptjs";
import { RegisterInput } from "./register/registerInput";
import { LoginInput } from "./login/loginInput";

@Resolver()
export class AuthResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: ExpressContext): Promise<User | null> {
		if (!req.session!.userId) return null;
		const user = await User.findOne(req.session!.userId);
		return user || null;
	}

	@Mutation(() => User)
	async register(
		@Arg("input") { email, password }: RegisterInput
	): Promise<User> {
		return User.create({
			email,
			password: bcrypt.hashSync(password, 10),
		}).save();
	}

	@Mutation(() => Boolean, { nullable: true })
	async login(
		@Arg("input") { email, password }: LoginInput,
		@Ctx() { req }: ExpressContext
	): Promise<Boolean | null> {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return null;
		}
		const match = bcrypt.compareSync(password, user.password);
		if (!match) {
			return null;
		}
		// Set a cookie to the request object
		req.session!.userId = user.id;
		return true;
	}

	@Mutation(() => Boolean)
	async logout(@Ctx() { req, res }: ExpressContext): Promise<Boolean> {
		return new Promise((resolve, reject) => {
			req.session?.destroy((err) => {
				if (err) reject(false);
				res.clearCookie(config.COOKIE_NAME);
				resolve(true);
			});
		});
	}
}
