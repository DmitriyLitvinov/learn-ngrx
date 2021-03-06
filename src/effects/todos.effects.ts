import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { TodosService } from "../servises/todos.servise";
import { ActionsEnums } from '../enums/actions.enum'
import {Store} from "../../node_modules/@ngrx/store/src/store";


@Injectable()
export class TodosEffects {
  constructor(private actions$: Actions, private todosService: TodosService, private store: Store<any>) { }

  @Effect() getTodos$ = this.actions$
    .ofType(ActionsEnums.TODO.GET_TODOS)
    .withLatestFrom(this.store.select("visibilityFilter"), ( action, filter ) => filter)
    .switchMap(filter =>
      this.todosService.getTodos(filter)
        .map(todos => ({type: ActionsEnums.TODO.GET_TODOS_SUCCESS, payload: todos}))
        .catch(() => Observable.of({type: ActionsEnums.TODO.GET_TODOS_ERROR})));

  @Effect() addTodo$ = this.actions$
    .ofType(ActionsEnums.TODO.ADD_TODO)
    .switchMap(action =>
      this.todosService.addTodo(action.payload.title)
        .map(todo => ({type: ActionsEnums.TODO.ADD_TODO_SUCCESS, payload: todo}))
        .catch(() => Observable.of({type: ActionsEnums.TODO.ADD_TODO_ERROR})));

  @Effect() toggleDone$ = this.actions$
    .ofType(ActionsEnums.TODO.TOGGLE_DONE)
    .switchMap(action =>
      this.todosService.toggleDone(action.payload.id)
        .map(todo => ({type: ActionsEnums.TODO.TOGGLE_DONE_SUCCESS, payload: todo}))
        .catch(() => Observable.of({type: ActionsEnums.TODO.TOGGLE_DONE_ERROR})));
}
