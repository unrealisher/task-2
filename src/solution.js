"use strict";

const solution = function(graph, start, finish) {
  // Алгоритм Дейкстры
  //   start: { A: 5, B: 2 },
  //         A: { C: 4, D: 2 },
  //         B: { A: 8, D: 7 },
  //         C: { D: 6, finish: 3 },
  //         D: { finish: 1 },
  //         finish: {}
  //   if (start === finish) {
  //     return;
  //   }

  class Point {
    constructor(distance, prevPoint) {
      this.distance = distance;
      this.prevPoint = prevPoint;
      this.visited = false;
    }
  }
  let open = start;
  let nodes = [];
  nodes[open] = new Point(0, null);

  let cycle = true;
  while (cycle) {
    for (let point in graph[open]) {
      if (nodes[point]) {
        if (nodes[point].distance > nodes[open].distance + graph[open][point]) {
          nodes[point].distance = nodes[open].distance + graph[open][point];
          nodes[point].prevPoint = open;
        }
      } else {
        nodes[point] = new Point(
          graph[open][point] + nodes[open].distance,
          open
        );
      }
    }
    nodes[open].visited = true;

    let toOpen;
    let bestDistance = null;
    for (let item in nodes) {
      const point = nodes[item];
      if (!point.visited) {
        if (bestDistance === null) {
          bestDistance = point.distance;
          toOpen = item;
        } else {
          if (bestDistance > point.distance) {
            bestDistance = point.distance;
            toOpen = item;
          }
        }
      }
    }
    if (toOpen === finish) {
      cycle = false;
    }
    open = toOpen;
  }

  let resultPath = [];

  open = finish;
  cycle = true;
  while (cycle) {
    resultPath.push(open);
    open = nodes[open].prevPoint;
    if (open === null) {
      cycle = false;
    }
  }
  return {
    distance: nodes[finish].distance,
    path: resultPath.reverse()
  };
};
