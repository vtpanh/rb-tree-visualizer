import { add, remove, search } from './helper/rbtree';
import { Tree } from './classes/tree';
require('./styles.css');

const addForm = document.forms.insert_form;
const delForm = document.forms.delete_form;
const searchForm = document.forms.search_form;

const inputForAdd = addForm.elements.numberadd;
const inputForDel = delForm.elements.numberdel;
const inputForSearch = searchForm.elements.numbersearch;

const btnAdd = addForm.elements.insert;
const btnDel = delForm.elements.del;
const btnSearch = searchForm.elements.search;

let rbTreeList = null;
let tree = {};

function handlerAdd(e) {
  e.preventDefault();
  const n = inputForAdd.value;
  if (n.search(/^\d{1,6}$/) === -1) {
    alert('You must enter only numbers');
    return;
  }
  rbTreeList = add(rbTreeList, parseInt(n));

  inputForAdd.value = '';
  // Reset canvas
  for (const row of document.querySelectorAll('.row')) {
    row.innerHTML = '';
  }

  // Print Canvas
  tree = new Tree(rbTreeList);
  console.log(tree);
  tree.display();
}

function handlerDel(e) {
  e.preventDefault();
  const n = inputForDel.value;
  if (n.search(/^\d{1,6}$/) === -1) {
    alert('You must enter only numbers');
    return;
  }
  rbTreeList = remove(rbTreeList, parseInt(n, 10));
  inputForDel.value = '';
  for (const row of document.querySelectorAll('.row')) {
    row.innerHTML = '';
  }
  tree = new Tree(rbTreeList);
  console.log(tree);
  tree.display();
}

function handlerSearch(e) {
  e.preventDefault();
  const n = inputForSearch.value;

  if (n.search(/^\d{1,6}$/) === -1) {
    alert('You must enter only numbers');
    return;
  }

  search(rbTreeList, n) ? alert(`Node ${n} found`) : alert('Node not found');
}

btnAdd.addEventListener('click', handlerAdd);
addForm.addEventListener('submit', handlerAdd);

btnDel.addEventListener('click', handlerDel);
delForm.addEventListener('submit', handlerDel);

btnSearch.addEventListener('submit', handlerSearch);
searchForm.addEventListener('submit', handlerSearch);
