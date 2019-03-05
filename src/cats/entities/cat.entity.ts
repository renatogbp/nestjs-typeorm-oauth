import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Cat {
    @ApiModelProperty()
    @ObjectIdColumn()
    id: ObjectID;

    @ApiModelProperty()
    @Column()
    name: string;

    @ApiModelProperty()
    @Column()
    age: number;

    @ApiModelProperty()
    @Column()
    breed: string;
}
