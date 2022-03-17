import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UniqueIdInput {
  @Field(() => ID, { nullable: false })
  id: string;
}

@ArgsType()
export class UniqueIdArgs {
  @Field(() => ID, { nullable: false })
  id: string;
}
