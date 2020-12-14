/* eslint-disable no-restricted-properties */
/* eslint-disable prefer-rest-params */
/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */

/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = function a() {
    return this.width * this.height;
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const j = JSON.parse(json);
  const a = Object.create(proto);
  const fedya = Object.entries(j);
  fedya.forEach(([inA, inB]) => {
    a[inA] = inB;
  });
  return a;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

// const cssSelectorBuilder = {
//   element(/* value */) {
//     throw new Error('Not implemented');
//   },

//   id(/* value */) {
//     throw new Error('Not implemented');
//   },

//   class(/* value */) {
//     throw new Error('Not implemented');
//   },

//   attr(/* value */) {
//     throw new Error('Not implemented');
//   },

//   pseudoClass(/* value */) {
//     throw new Error('Not implemented');
//   },

//   pseudoElement(/* value */) {
//     throw new Error('Not implemented');
//   },

//   combine(/* selector1, combinator, selector2 */) {
//     throw new Error('Not implemented');
//   },
// };

const weight = {
  tag: 1,
  id: 2,
  class: 3,
  attr: 4,
  pseudoClass: 5,
  pseudoElement: 6,
};

class FreeObj {
  constructor() {
    this.element = '';
    this.id = '';
    this.class = [];
    this.attr = [];
    this.pseudoClass = [];
    this.pseudoElement = '';
    this.length = 0;
    this.weight = 0;
  }
}

class RsCss {
  constructor() {
    this.name = 'RS-CSS';
    this.isCombined = false;
    this.strForCombine = '';
    this.combinedString = [];
    // this.currentObj = {
    //   element: '',
    //   id: '',
    //   class: [],
    //   attr: [],
    //   pseudoClass: [],
    //   pseudoElement: '',
    //   length: 0,
    //   weight: 0,
    // };
    this.currentObj = new FreeObj();
  }

  checkWeight(w) {
    if (this.currentObj.weight === w && this.currentObj.length === 1) {
      // console.log('ravno');
      this.throwError(1);
    }
  }

  checkOrder(w) {
    if ((this.currentObj.weight) > w && this.currentObj.length === 1) {
      // console.log('-1 ravno');
      this.throwError(2);
    }
  }

  element(value) {
    // console.log('element', value);
    this.checkWeight(weight.tag);
    this.checkOrder(weight.tag);
    if (this.currentObj.weight >= weight.tag) {
      this.combinedString.push(`${this.combineStr()}`);
      this.currentObj = new FreeObj();
      // console.log('combined');
    }
    this.currentObj.element = value;
    this.currentObj.length += 1;
    this.currentObj.weight += weight.tag;
    return this;
  }

  id(value) {
    // console.log('id', value);
    this.checkWeight(weight.id);
    this.checkOrder(weight.id);
    if (this.currentObj.weight >= weight.id) {
      this.combinedString.push(`${this.combineStr()}`);
      this.currentObj = new FreeObj();
      // console.log('combined');
    }
    this.currentObj.id = value;
    this.currentObj.length += 1;
    this.currentObj.weight += weight.id;

    return this;
  }

  class(value) {
    // console.log('class', value);
    this.checkOrder(weight.class);
    if (this.currentObj.class > weight.class) {
      // this.combines.push();
      // console.log('combined');
    } else {
      this.currentObj.class.push(value);
      this.currentObj.length += 1;
      this.currentObj.weight += weight.class;
    }
    return this;
  }

  attr(value) {
    // console.log('attr', value);
    this.checkOrder(weight.attr);
    if (this.currentObj.attr > weight.attr) {
      // this.combines.push();
      // console.log('combined');
    } else {
      this.currentObj.attr.push(value);
      this.currentObj.length += 1;
      this.currentObj.weight += weight.attr;
    }
    return this;
  }

  pseudoClass(value) {
    // console.log('pseudoClass', value);
    this.checkOrder(weight.pseudoClass);
    if (this.currentObj.pseudoClass > weight.pseudoClass) {
      // this.combines.push();
      // console.log('combined');
    } else {
      this.currentObj.pseudoClass.push(value);
      this.currentObj.length += 1;
      this.currentObj.weight += weight.pseudoClass;
    }
    return this;
  }

  pseudoElement(value) {
    // console.log('pseudoElement', value);
    this.checkWeight(weight.pseudoElement);
    this.checkOrder(weight.pseudoElement);
    if (this.currentObj.weight > weight.pseudoElement) {
      // this.combines.push();
      // console.log('combined');
    } else {
      this.currentObj.pseudoElement = value;
      this.currentObj.length += 1;
      this.currentObj.weight += weight.pseudoElement;
    }
    return this;
  }

  combine(...args) {
    // console.log('\r\n');
    // console.log(`combine: '${args[1]}'`, this.currentObj, this.combinedString);
    const len = this.combinedString.length - 1;
    if (this.isCombined === false) {
      this.isCombined = true;
      this.combinedString[len] = `${this.combinedString[len]} ${args[1]} ${this.combineStr()}`;
    } else {
      const last = this.combinedString.pop();
      this.combinedString[len - 1] = `${this.combinedString[len - 1]} ${args[1]} ${last}`;
    }
    this.currentObj = new FreeObj();
    // console.log('combined:', this.combinedString);
    // console.log('\r\n');
    return this;
  }

  combineStr() {
    const strE = this.currentObj.element;
    const strI = this.currentObj.id ? `#${this.currentObj.id}` : '';
    const strC = this.currentObj.class.length > 0 ? `.${this.currentObj.class.join('.')}` : '';
    const strA = this.currentObj.attr.length > 0 ? this.currentObj.attr.map((e) => `[${e}]`).join('') : '';
    const strPC = this.currentObj.pseudoClass.length > 0 ? `:${this.currentObj.pseudoClass.join(':')}` : '';
    const strPE = this.currentObj.pseudoElement ? `::${this.currentObj.pseudoElement}` : '';
    return `${strE}${strI}${strC}${strA}${strPC}${strPE}`;
  }

  throwError(num) {
    this.currentObj = new FreeObj();
    if (num === 1) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    } else if (num === 2) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
  }

  stringify() {
    if (this.combinedString.length > 0) {
      const str = this.combinedString[0];
      this.currentObj = new FreeObj();
      this.isCombined = false;
      this.combinedString = [];
      // console.log('stringify', str);
      // console.log('\r\n\r\n');
      // console.log('\r\n\r\n');
      return str;
    }
    // const { name } = this;
    const strE = this.currentObj.element;
    const strI = this.currentObj.id ? `#${this.currentObj.id}` : '';
    const strC = this.currentObj.class.length > 0 ? `.${this.currentObj.class.join('.')}` : '';
    const strA = this.currentObj.attr.length > 0 ? this.currentObj.attr.map((e) => `[${e}]`).join('') : '';
    const strPC = this.currentObj.pseudoClass.length > 0 ? `:${this.currentObj.pseudoClass.join(':')}` : '';
    const strPE = this.currentObj.pseudoElement ? `::${this.currentObj.pseudoElement}` : '';
    const str = `${strE}${strI}${strC}${strA}${strPC}${strPE}`;
    // console.log('stringify', this.currentObj);
    // this.currentObj = {
    //   element: '',
    //   id: '',
    //   class: [],
    //   attr: [],
    //   pseudoClass: [],
    //   pseudoElement: '',
    //   length: 0,
    //   weight: 0,
    // };
    this.currentObj = new FreeObj();
    this.isCombined = false;
    this.combinedString = [];

    // console.log('stringify', str);
    // console.log('\r\n\r\n');
    // console.log('\r\n\r\n');
    return str;
  }
}


const cssSelectorBuilder = new RsCss();

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
