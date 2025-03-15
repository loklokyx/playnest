
export type GameRequest = {
    id: string;
    location:string;
    startTime: Date;
    capacity: number;
    userId: string;
    state: State
    num_player:number;
    type:string;
  };

  export enum State {
    Pending = "pending",
    Finished = "finished",
  }
  