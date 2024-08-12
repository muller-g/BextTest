import { TaskController } from '../task/task.controller';
import { TaskService } from '../task/task.service';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { FilterTasksDto } from '../task/dto/filter-task.dto';
import { UpdateTaskDto } from '../task/dto/update-task.dto';
import { Status } from '../task/dto/create-task.dto';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService(null);
    taskController = new TaskController(taskService);
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = { title: 'Test Task', description: 'Test Description', status: Status.Pendente, due_date: "2024-08-02T09:00:00Z", task_list: "some-id" };
      const result: any = { id: '1', ...createTaskDto };
      jest.spyOn(taskService, 'create').mockResolvedValue(result);

      expect(await taskController.create(createTaskDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const filters: FilterTasksDto = { title: 'Test', status: Status.Pendente };
      const result: any = [{ id: '1', title: 'Test Task', description: 'Test Description', status: Status.Pendente, due_date: "2024-08-02T09:00:00Z" }];
      jest.spyOn(taskService, 'findAll').mockResolvedValue(result);

      expect(await taskController.findAll(filters)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const id = 'some-id';
      const result: any = { id, title: 'Test Task', description: 'Test Description', status: Status.Pendente, due_date: "2024-08-02T09:00:00Z" };
      jest.spyOn(taskService, 'findOne').mockResolvedValue(result);

      expect(await taskController.findOne(id)).toBe(result);
    });
  });

  describe('findByTaskList', () => {
    it('should return return an array of tasks by task list id', async () => {
      const id = '1';
      const result: any = { id, title: 'Test Task', description: 'Test Description', status: Status.Pendente, due_date: "2024-08-02T09:00:00Z" };
      jest.spyOn(taskService, 'findByTaskList').mockResolvedValue(result);

      expect(await taskController.findByTaskList(id)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const id = '1';
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      const result: any = { id, ...updateTaskDto };
      jest.spyOn(taskService, 'update').mockResolvedValue(result);

      expect(await taskController.update(id, updateTaskDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const id = '1';
      const result: any = { id, title: 'Test Task', description: 'Test Description', status: Status.Pendente, due_date: "2024-08-02T09:00:00Z" };
      jest.spyOn(taskService, 'remove').mockResolvedValue(result);

      expect(await taskController.remove(id)).toBe(result);
    });
  });
});
