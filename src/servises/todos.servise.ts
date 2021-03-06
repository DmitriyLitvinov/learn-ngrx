import {Injectable} from "../../node_modules/@angular/core/src/di/metadata";
import {Observable} from "../../node_modules/rxjs/Observable";
import {EventEmitter} from "../../node_modules/@angular/core/src/facade/async";

@Injectable()
export class TodosService{
  private todos = [{id: 1, title: "Learn ngrx/store", completed: true}, {id: 2, title: "Learn ngrx/effects", completed: false}];

  public toggleDoneTodo = new EventEmitter();

  getTodos(filter) {
    return Observable.timer(1000).mapTo(this.getVisibleTodos(this.todos, filter));
  }

  addTodo (title) {
    const todo = {id: Math.random(), title, completed: false};
    return Observable.timer(2000).mapTo(todo);
  }

  toggleDone(id) {
    return Observable.timer(500).mapTo(id);
  }

  getVisibleTodos( todos, filter ) {
    if( filter === "SHOW_ALL" ) {
      return todos;
    } else if( filter === "SHOW_COMPLETED" ) {
      return todos.filter(t => t.completed);
    } else {
      return todos.filter(t => !t.completed);
    }
  }

}
