import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCustomerDto {

    @IsString()
    @MinLength(3)
    @MaxLength(80)
    public name: string;

    @IsEmail()
    public email: string;

    @IsOptional()
    @MaxLength(10)
    @MinLength(10)
    public phone: number;

    @IsOptional()
    @MaxLength(150)
    public address: string;


    

}
