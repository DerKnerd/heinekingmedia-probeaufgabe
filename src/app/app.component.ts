import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  SORT_BY_RESOLVED_NOT_RESOLVED = 'resolvedNotResolved';
  SORT_BY_CREATE_DATE = 'createDate';

  SORT_DIRECTION_ASCENDING = 'asc';
  SORT_DIRECTION_DESCENDING = 'desc';

  todos = [];
  newTodoTitle = '';
  sortDirection = this.SORT_DIRECTION_ASCENDING;
  sortBy = this.SORT_BY_RESOLVED_NOT_RESOLVED;

  private static sortByCreateDate(item1, item2): number {
    if (item1.createDate > item2.createDate) {
      return 1;
    } else if (item1.createDate < item2.createDate) {
      return -1;
    } else if (item1.createDate === item2.createDate) {
      return 0;
    }
  }

  private static sortByResolvedNotResolved(item1, item2): number {
    if (item1.resolved === item2.resolved) {
      return 0;
    } else if (item1.resolved) {
      return 1;
    } else {
      return -1;
    }
  }

  sortTodos(): void {
    if (this.sortBy === this.SORT_BY_CREATE_DATE) {
      this.todos.sort(AppComponent.sortByCreateDate);
    } else if (this.sortBy === this.SORT_BY_RESOLVED_NOT_RESOLVED) {
      this.todos.sort(AppComponent.sortByResolvedNotResolved);
    }

    if (this.sortDirection === this.SORT_DIRECTION_DESCENDING) {
      this.todos.reverse();
    }
  }

  createTodo(): void {
    this.todos.push({
      title: this.newTodoTitle,
      resolved: false,
      createDate: Date.now(),
    });
    this.saveChanges();
    this.newTodoTitle = '';
  }

  saveChanges(): void {
    this.sortTodos();
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  ngOnInit(): void {
    this.todos = JSON.parse(localStorage.getItem('todos') ?? '[]');
    this.sortTodos();
  }
}
