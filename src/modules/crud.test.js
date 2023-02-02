import TasksOperations from './crud.js';
import Task from './task-class.js';

describe('Add task', () => {
  let tasksOperations;
  let mockLocalStorage;

  beforeEach(() => {
    mockLocalStorage = {};
    global.localStorage = {
      ...global.localStorage,
      getItem: jest.fn((key) => mockLocalStorage[key]),
      setItem: jest.fn((key, value) => {
        mockLocalStorage[key] = value;
      }),
    };
    tasksOperations = new TasksOperations([]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('addTask should add a new task to the tasks array', () => {
    const taskDesc = 'Feed the chicken';
    tasksOperations.addTask(taskDesc);
    expect(tasksOperations.tasksArr).toHaveLength(1);
    expect(tasksOperations.tasksArr[0].description).toBe(taskDesc);
  });

  test('addTask should add a new task to local storage', () => {
    const taskDesc = 'Feed the chicken';
    tasksOperations.addTask(taskDesc);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

describe('Remove task', () => {
  let tasksOperations;

  beforeEach(() => {
    tasksOperations = new TasksOperations([new Task(1, 'task 1'), new Task(2, 'task 2')]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('removeTask should remove the task with the specified index from the tasks array', () => {
    const taskIndex = 2;
    tasksOperations.removeTask(taskIndex);
    expect(tasksOperations.tasksArr).toHaveLength(1);
    expect(tasksOperations.tasksArr[0].index).toBe(1);
    expect(tasksOperations.tasksArr[0].description).toBe('task 1');
  });
  // test removing in the the local storage
  test('removeTask should update the local storage with the updated tasks array', () => {
    const taskIndex = 2;
    tasksOperations.removeTask(taskIndex);
    expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify([new Task(1, 'task 1')]));
  });
});
