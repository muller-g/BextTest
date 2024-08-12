import { TaskListController } from '../task-list/task-list.controller';
import { TaskListService } from '../task-list/task-list.service';
import { CreateTaskListDto } from '../task-list/dto/create-task-list.dto';
import { UpdateTaskListDto } from '../task-list/dto/update-task-list.dto';
import { FilterTasksListDto } from 'src/task-list/dto/filter-task-list.dto';

describe('TaskController', () => {
  let taskListController: TaskListController;
  let taskListService: TaskListService;

  beforeEach(() => {
    taskListService = new TaskListService(null);
    taskListController = new TaskListController(taskListService);
  });

  describe('create', () => {
    it('should create a task list', async () => {
      const createTaskDto: CreateTaskListDto = { name: 'New Task List' };
      const result: any = { id: '1', ...createTaskDto };
      jest.spyOn(taskListService, 'create').mockResolvedValue(result);

      expect(await taskListController.create(createTaskDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks lists', async () => {
      const filters: FilterTasksListDto = { name: 'Test' };
      const result: any = [{ id: '1', name: 'Task List' }];
      jest.spyOn(taskListService, 'findAll').mockResolvedValue(result);

      expect(await taskListController.findAll(filters)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single task list', async () => {
      const id = '1';
      const result: any = [{ id: '1', name: 'Task List' }];
      jest.spyOn(taskListService, 'findOne').mockResolvedValue(result);

      expect(await taskListController.findOne(id)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a task list', async () => {
      const id = '1';
      const updateTaskDto: UpdateTaskListDto = { name: 'Updated Task List' };
      const result: any = { id, ...updateTaskDto };
      jest.spyOn(taskListService, 'update').mockResolvedValue(result);

      expect(await taskListController.update(id, updateTaskDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a task list', async () => {
      const id = '1';
      const result: any = [{ id: '1', name: 'Task List' }];
      jest.spyOn(taskListService, 'remove').mockResolvedValue(result);

      expect(await taskListController.remove(id)).toBe(result);
    });
  });
});
