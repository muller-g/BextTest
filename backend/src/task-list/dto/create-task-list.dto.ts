import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskListDto {
    @ApiProperty({
        description: 'Nome da lista de tarefas',
        default: "Lista de Tarefas 1",
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
