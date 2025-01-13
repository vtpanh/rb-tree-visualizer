import { Node } from './node';

// Example of a tree - insert 23, 25
// Tree {list: {…}, leaves: Array(7), nodes: Array(0)}
// leaves: (7) [{…}, null, {…}, null, null, null, null]
// list: {value: 23, left: null, right: {…}, parent: null, color: 0}
// nodes: (7) [Node, Node, Node, Node, Node, Node, Node]

class Tree {
  constructor(list) {
    this.list = list;
    this.leaves = [];
    this.nodes = [];

    this.leaves.push(this.list);
    let current = this.list;
    let idx = 0;

    while (idx < this.leaves.length) {
      if (!current) {
        this.leaves[idx] = null;
        current = this.leaves[++idx];
        continue;
      }
      if (current && current.left) {
        this.leaves[idx * 2 + 1] = current.left;
      } else {
        this.leaves[idx * 2 + 1] = null;
      }

      if (current && current.right) {
        this.leaves[idx * 2 + 2] = current.right;
      } else {
        this.leaves[idx * 2 + 2] = null;
      }
      current = this.leaves[++idx];
    }
  }

  display() {
    for (const cnv of document.querySelectorAll('canvas')) {
      cnv.remove();
    }

    this.leaves.forEach((leaf, idx) => {
      let field;
      if (idx === 0) field = document.querySelector('.row.root');
      if (idx === 1 || idx === 2) field = document.querySelector('.row.one');
      if (idx > 2 && idx < 7) field = document.querySelector('.row.two');
      if (idx > 6 && idx < 15) field = document.querySelector('.row.three');
      if (idx > 14 && idx < 31) field = document.querySelector('.row.four');
      if (idx > 30 && idx < 63) field = document.querySelector('.row.five');
      if (idx > 62 && idx < 127) field = document.querySelector('.row.six');
      if (idx > 126 && idx < 255) field = document.querySelector('.row.seven');
      const { value } = leaf ? leaf : { value: 'none' };
      const color = !leaf || leaf.color === 1 ? 'red' : 'black';
      this.nodes[idx] = new Node({ value, color, field });
    });
    this.drawLines();
  }

  drawLines() {
    this.nodes.forEach((node, idx) => {
      if (node.value === 'none' || idx === 0) return;

      const rectNode = this.nodes[idx].node.getBoundingClientRect();
      const rectParent =
        this.nodes[Math.floor((idx - 1) / 2)].node.getBoundingClientRect();

      const sideLeft = rectNode.left < rectParent.left;

      const canvas = document.createElement('canvas');
      canvas.width = Math.abs(rectParent.left - rectNode.left);
      canvas.height = Math.abs(rectNode.top - rectParent.top);

      if (sideLeft) {
        canvas.style.left = `${rectNode.right - 20}px`;
      } else {
        canvas.style.left = `${rectParent.right - 20}px`;
      }

      canvas.style.top = `${rectParent.top + 20}px`;
      const ctx = canvas.getContext('2d');

      if (sideLeft) {
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(canvas.width, 0);
      } else {
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
      }

      ctx.lineWidth = 2;
      ctx.stroke();
      document.body.appendChild(canvas);
    });
  }
}

export { Tree };
