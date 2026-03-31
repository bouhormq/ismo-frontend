declare module "react-big-calendar" {
  export interface Event {
    resourceId?: number;
    event?: Event;
  }
  export interface EventInteractionArgs<TEvent> {
    start?: Date;
    end?: Date;
  }
}
