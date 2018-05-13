import _ from 'underscore'

const compute = {
  results: [],
  matrix: [],

  // initialize array for add
  // data structure: e.g. 2 + 3 = 5
  // const question = { l: 2, r:3, v:5 }
  initAdds: (min, max) => {
    let list = _.range(min, max + 1);
    let add_list = []

    list.forEach((x) => {
      let t = _.map(list, (y) => {
        return {
          l: x,
          r: y,
          v: x + y,
          o: '+'
        }
      })

      add_list = [...add_list, ...t];
    })

    return add_list
  },

  // get sub_list by adds
  initSubstracts: (add_list) => {
    return _.map(add_list, function(item) {
      return {
        l: item.v,
        r: item.r,
        v: item.l,
        o: '-'
      }
    });
  },

  initMutiplies: (min, max) => {
    let list = _.range(min, max + 1);
    let multiply_list = []

    list.forEach((x) => {
      let t = _.map(list, (y) => {
        return {
          l: x,
          r: y,
          v: x * y,
          o: 'x'
        }
      })

      multiply_list = [...multiply_list, ...t];
    })

    return multiply_list
  },

  initDivides: (multiply_list) => {
    let divide_list = _.map(multiply_list, function(item) {
      return {
        l: item.v,
        r: item.r,
        v: item.l,
        o: '/' // &divide;
      }
    });
    // remove any case that right operand is 0
    return _.reject(divide_list, function(item) {
      return item.r == 0;
    })
  },

  // pick up non repeatable questions
  // list: list of the questions pool
  // size: number of questions to pick up
  pick: (list, size) => {
    let randomIndexs = new Set();
    let max = list.length
    while (randomIndexs.size < size) {
      let id = Math.floor(Math.random() * Math.floor(max))
      randomIndexs.add(id)
    }

    return _.map([...randomIndexs], function(idx) {
      return list[idx]
    })
  }

}

export default compute