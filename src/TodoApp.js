/* eslint-disable arrow-body-style */
import { html, LitElement } from 'lit';

export class TodoApp extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  constructor() {
    super();
    this.todos = [];
  }

  render() {
    return html`
      <form @submit=${this.onSubmit}>
        <input data-testid="newItem" name="newItem" required />
        <button data-testid="add">Agregar</button>
      </form>
      <ol data-testid="todos-container">
        ${this.todos.map(item => {
          return html`
            <li>
              <input
                type="checkbox"
                data-testid="check"
                @click=${() => this.onChange(item)}
                .checked=${item.isDone}
              />
              <button
                data-testid="remove"
                @click=${() => this.remove(item)}
              >
                X
              </button>
              ${item.title}
            </li>
          `;
        })}
      </ol>
    `;
  }

  onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const newItem = data.get('newItem');
    form.reset();

    this.todos = [...this.todos, { title: newItem, isDone: false }];
  }

  remove(item) {
    this.todos = this.todos.filter(todo => {
      if (todo === item) {
        return false;
      }
      return true;
    });
  }

  onChange(todo) {
    this.todos = this.todos.map(item => {
      if (todo === item) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });
  }
}
