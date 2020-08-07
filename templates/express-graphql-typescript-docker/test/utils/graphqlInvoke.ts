import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from "../../src/utils/createSchema";
import { Maybe } from "graphql/jsutils/Maybe";

interface Args {
	source: string;
	variableValues?: Maybe<{
		[key: string]: any;
	}>;
	userId?: string;
}

let schema: GraphQLSchema;

export const graphqlInvoke = async ({
	source,
	variableValues,
	userId,
}: Args) => {
	if (!schema) {
		schema = await createSchema();
	}
	return graphql({
		schema,
		source: source,
		contextValue: {
			req: {
				session: {
					userId,
				},
			},
			res: {},
		},
		variableValues,
	});
};
