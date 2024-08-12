import { Transform } from "class-transformer";
import { IsEnum, IsISO8601, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export enum Status {
    Pendente = 'Pendente',
    Andamento = 'Andamento',
    Concluida = 'Concluida',
}
  
export class CreateTaskDto {
    @ApiProperty({
        description: 'Nome da tarefa',
        default: "Tarefa 1",
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Descrição da tarefa',
        default: "Essa tarefa tem uma descrição",
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Status da tarefa',
        default: "Pendente",
        enum: ['Pendente', 'Concluída', 'Andamento']
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;

    @ApiProperty({
        description: 'Data de vencimento tarefa',
        default: "2024-08-02T09:00:00Z",
    })
    @IsNotEmpty()
    @IsISO8601()
    @Transform(({ value }) => new Date(value).toISOString(), { toClassOnly: true })
    due_date: string;

    @ApiProperty({
        description: 'ID ta lista de tarefas',
        default: "66b7fd4ad2100cee87204387",
    })
    @IsMongoId()
    @IsNotEmpty()
    task_list: string;
}
