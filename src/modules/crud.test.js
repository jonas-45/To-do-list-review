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
  // edit and clear all tasks

  // tasksOperations.test.js

  describe('editTask', () => {
    it('should edit the task description', () => {
      tasksOperations.tasksArr = [{ description: 'Study german ', completed: false }];
      tasksOperations.editTask(1, 'Edited task');
      expect(tasksOperations.tasksArr[0].description).toBe('Edited task');
    });

    it('should update local storage with updated tasks array', () => {
      tasksOperations.editTask(1, 'Edited task');
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('markAsCompleted', () => {
    it('should update the task\'s completed status', () => {
      tasksOperations.tasksArr = [{ description: 'Study C#', completed: false }];
      tasksOperations.markAsCompleted(1);
      expect(tasksOperations.tasksArr[0].completed).toBe(true);
    });

    it('should update the local storage with the updated tasks array', () => {
      tasksOperations.markAsCompleted(1);
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('Clear completed tasks', () => {
    test('clearAllCompletedTasks should remove all completed tasks', () => {
      
      //Arrange
      const taskArr = [
        {
          index: 1,
          description: 'Task 1',
          completed: false
        },{
          index: 2,
          description: 'Task 2',
          completed: true
        },{
          index: 3,
          description: 'Task 3',
          completed: true
        }
      ];
      const taskOpertaionsObj = new TasksOperations(taskArr);
  
      //Act
      taskOpertaionsObj.clearAllCompletedTasks();
  
      //Assert
      expect(taskOpertaionsObj.tasksArr).toHaveLength(1);
      expect(taskOpertaionsObj.tasksArr[0].description).toEqual('Task 1')
      expect(localStorage.setItem).toHaveBeenCalled();
  
    });
  });
});