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
    //Вспомогательный класс
    constructor(distance, prevPoint) {
      this.distance = distance; //Кротчайшая дистанция до звезды
      this.prevPoint = prevPoint; //Ссылка на предыдущую звезде
      this.visited = false; //Посещена ли звезда
    }
  }
  let open = start; //Звезда, которую будем открывать
  let nodes = {}; //"Массив", в который по ключу записываются данные из вспомогательного класса
  nodes[open] = new Point(0, null); //Запись для start

  let cycle = true; //Переменная для выхода из цикла
  while (cycle) {
    for (let point in graph[open]) {
      //Проходим по всем полям открытой звезды
      if (nodes[point]) {
        //Если не false, значит в эту звезду мы уже попадали и надо сравнить дистанции
        if (nodes[point].distance > nodes[open].distance + graph[open][point]) {
          nodes[point].distance = nodes[open].distance + graph[open][point];
          nodes[point].prevPoint = open;
        }
      } else {
        //Если false, то просто создаем запись в массиве nodes
        nodes[point] = new Point(
          graph[open][point] + nodes[open].distance,
          open
        );
      }
    }
    nodes[open].visited = true; //Говорим, что данную звезду уже открывали

    let bestDistance = null; //Вспомогательная переменная для поиска минимальной дистанции
    let canVisit = false; //Если окажется, что в классе nodes все звезды уже открыты, то значит, что пути нет
    for (let item in nodes) {
      //Проходим по всем полям nodes
      const point = nodes[item];
      if (!point.visited) {
        //Если не  открыта, тогда просматриваем дистанции
        canVisit = true;
        if (bestDistance === null) {
          bestDistance = point.distance;
          open = item;
        } else {
          if (bestDistance > point.distance) {
            bestDistance = point.distance;
            open = item;
          }
        }
      }
    }
    if (canVisit === false) {
      //Если в массиве nodes все звезды открыты, значит пути нет
      console.log("Решения нет");
      return {
        distance: 0,
        path: []
      };
    } else if (open === finish) {
      //Если следующая открывающаяся звезда будет finish, значит решение найдено
      cycle = false;
    }
  }

  let resultPath = [];

  open = finish;
  cycle = true;
  while (cycle) {
    //Проходимся по полям prevPoint и получаем путь
    resultPath.push(open);
    open = nodes[open].prevPoint;
    if (open === null) {
      //prevPoint=null только у звезды start
      cycle = false;
    }
  }
  return {
    distance: nodes[finish].distance,
    path: resultPath.reverse()
  };
};
