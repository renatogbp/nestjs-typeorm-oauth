import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { OAuthLogin } from './oauth-login';

@Entity()
export class User {
    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    @ApiModelProperty()
    @ObjectIdColumn()
    id: ObjectID;

    @ApiModelProperty()
    @Column()
    username: string;

    @ApiModelProperty()
    @Column()
    email: string;

    @ApiModelProperty()
    @Column()
    password: string;

    @ApiModelProperty()
    @Column(type => OAuthLogin)
    oAuthLogins: OAuthLogin[];
}
