import { IsBoolean, IsNotEmpty, isNotEmpty, IsNumber, isNumber, IsOptional, IsString } from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateProductDto {
    
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsBoolean()
    @IsOptional()
    available?: boolean;
    @IsNumber()
    @Type(()=> Number)
    price: number;
}
