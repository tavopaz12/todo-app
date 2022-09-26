import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../todo-app.js';

let elem;
let elemRoot;

beforeEach(async () => {
  elem = await fixture(html`<todo-app></todo-app>`);
  elemRoot = elem.shadowRoot;
});

describe('When the user wants add a new item', () => {
  it('And new item field is empty, Then empty should not be added', () => {
    const input = elemRoot.querySelector('[data-testid="newItem"]');
    const btn = elemRoot.querySelector('[data-testid="add"]');

    btn.click();

    expect(input.checkValidity()).to.be.false;
  });
  it('Then new item should be added', async () => {
    const input = elemRoot.querySelector('[data-testid="newItem"]');
    const btn = elemRoot.querySelector('[data-testid="add"]');
    const todosContainer = elemRoot.querySelector(
      '[data-testid="todos-container"]'
    );

    input.value = 'Cenar';
    btn.click();

    await elem.updateComplete;

    expect(todosContainer.textContent).to.contains('Cenar');
  });
});

describe('When the new item is added', () => {
  it('Then the input is cleared', async () => {
    const input = elemRoot.querySelector('[data-testid="newItem"]');
    const btn = elemRoot.querySelector('[data-testid="add"]');

    input.value = 'Cenar';
    btn.click();

    await elem.updateComplete;

    expect(input.value).to.equal('');
  });
});

describe('When the user wants add more than one items', () => {
  it('Then more than one items should be added', async () => {
    const input = elemRoot.querySelector('[data-testid="newItem"]');
    const btn = elemRoot.querySelector('[data-testid="add"]');
    const todosContainer = elemRoot.querySelector(
      '[data-testid="todos-container"]'
    );

    input.value = 'Cenar';
    btn.click();

    await elem.updateComplete;

    input.value = 'Comer';
    btn.click();

    await elem.updateComplete;

    expect(todosContainer.textContent).to.contains('Cenar');
    expect(todosContainer.textContent).to.contains('Comer');
  });
});

describe('When the user wants remove one item', () => {
  it('Then one item should be removed', async () => {
    const input = elemRoot.querySelector('[data-testid="newItem"]');
    const btn = elemRoot.querySelector('[data-testid="add"]');
    const todosContainer = elemRoot.querySelector(
      '[data-testid="todos-container"]'
    );

    input.value = 'Cenar';
    btn.click();
    await elem.updateComplete;

    const btnRemove = elemRoot.querySelector('[data-testid="remove"]');
    btnRemove.click();

    await elem.updateComplete;

    expect(todosContainer.textContent).not.to.contains('Cenar');
  });
});

describe('When the user wants to mark the pending as finished', () => {
  it('Then the pending is marked as finished', async () => {
    const input = elemRoot.querySelector('[data-testid="newItem"]');
    const btn = elemRoot.querySelector('[data-testid="add"]');

    input.value = 'Comer';
    btn.click();

    await elem.updateComplete;

    const check = elemRoot.querySelector('[data-testid="check"]');
    check.click();

    await elem.updateComplete;

    expect(check.checkValidity()).to.be.true;
  });
});
