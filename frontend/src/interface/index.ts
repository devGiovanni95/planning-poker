export interface ITask{
    id: string
    title: string
    result?: number
}

export interface IUserContextType {
    userName: string;
    setUserName: (name: string) => void;
    taskName: string;
    setTaskName: (name: string) => void;
  }

export interface IVotes{
    id: string;
    user: string;
    vote: number;
}