//import test from "node:test";
//import { describe } from "yargs";
//import { beforeEach } from "node:test";
import TasksOperations from "./crud.js";

describe('Adding Task', () => {
  let taskObj;
  let mockSetItem;
  beforeEach(() => {
    taskObj = new TasksOperations([]);
    mockSetItem = jest.spyOn(localStorage, 'setItem');
    mockSetItem.mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Should add a task with the given description", () => {
    //Arrange
    const task = 'Feed the chickens';

    //Act
    taskObj.addTask(task);

    //Assert
    expect(taskObj.taskArr[0]).toEqual([
      {
        index: 1,
        description: 'Feed the chickens',
        completed: false
      }
    ])
  })
})