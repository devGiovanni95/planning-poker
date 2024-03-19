import { ITask, IUserContextType, IVotes } from './index'; // Suponha que as interfaces estão em './types'

describe('ITask interface', () => {
  it('should have correct properties', () => {
    const task: ITask = {
      id: '1',
      title: 'Sample Task',
      result: 1,
    };

    expect(task.id).toEqual('1');
    expect(task.title).toEqual('Sample Task');
    expect(task.result).toEqual(1);
  });

  it('should not require result property', () => {
    const task: ITask = {
      id: '2',
      title: 'Another Task',
    };

    expect(task.id).toEqual('2');
    expect(task.title).toEqual('Another Task');
    expect(task.result).toBeUndefined();
  });
});

describe('IUserContextType interface', () => {
  it('should have correct properties', () => {
    const context: IUserContextType = {
      userName: 'John',
      setUserName: (name: string) => {},
      taskName: 'Task',
      setTaskName: (name: string) => {},
    };

    expect(context.userName).toEqual('John');
    expect(typeof context.setUserName).toEqual('function');
    expect(context.taskName).toEqual('Task');
    expect(typeof context.setTaskName).toEqual('function');
  });
});
  
  describe('IVotes Interface', () => {
    it('should have id property of type string', () => {
      const vote: IVotes = {
        id: '1',
        user: 'John',
        vote: 5
      };
  
      expect(typeof vote.id).toBe('string');
    });
  
    it('should have user property of type string', () => {
      const vote: IVotes = {
        id: '1',
        user: 'John',
        vote: 5
      };
  
      expect(typeof vote.user).toBe('string');
    });
  
    it('should have vote property of type number', () => {
      const vote: IVotes = {
        id: '1',
        user: 'John',
        vote: 5
      };
  
      expect(typeof vote.vote).toBe('number');
    });
});