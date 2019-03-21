import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
    @ApiModelProperty()
    @IsString()
    readonly name: string;

    @IsInt()
    @ApiModelProperty()
    readonly age: number;

    @IsString()
    @ApiModelProperty()
    readonly breed: string;
}
