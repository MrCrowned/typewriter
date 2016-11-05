/*
 * typewriter.js
 * An ES6 Port of the original typewriter.js
 *
 * Copyright 2014, Connor Atherton - http://connoratherton.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * 
 * 
 * Github:  http://github.com/ConnorAtherton/typewriter
 */
'use strict';

class Typewriter {

   constructor(element, opts) {
     if (!element) throw new Error('A selector or element must be specified');
     if (!opts.text) throw new Error('TypeWriter needs text to type');

     var options = {
       element: document.querySelector(selector) || element,
       text: opts.text,
       words: opts.words || false,
       interval: opts.interval || 'human',
       lowerBound: opts.lowerBound || 30,
       upperBound: opts.upperBound || 200
     },

     randomIntFromInterval = (min, max) => {
       return Math.floor(Math.random() * (max - min + 1) + min);
     },

     isNumber = (number) => {
       return !isNaN(parseFloat(number)) && isFinite(number);
     },

     getIntervalSpeed = () => {
       if (isNumber(options.interval)) return options.interval;

       return randomIntFromInterval(options.lowerBound, options.upperBound);
     },

     typeByLettersConstantInterval = (cb) => {
       var numberOfLetters = options.text.length,
           currentPosition = 0;

       var interval = window.setInterval(() => {
         if (currentPosition === numberOfLetters) {
           window.clearInterval(interval);

           cb && cb.call(window);
         } else {
           options.element.innerHTML += options.text[currentPosition];
           currentPosition++;
         }
       }, getIntervalSpeed());
     },

     typeByLettersRandomisedInterval = (cb) => {
       var numberOfLetters = options.text.length,
           currentPosition = 0;

       repeat(numberOfLetters, currentPosition, cb);
     },

     repeat = (numberOfLetters, currentPosition, cb) => {
       if (numberOfLetters === 0) return cb && cb.call(window);

       var interval = getIntervalSpeed.call(),
           timer;

       options.element.innerHTML += options.text[currentPosition];

       timer = setTimeout(() => {
         numberOfLetters--; currentPosition++;
         repeat(numberOfLetters, currentPosition, cb);
       }, interval);
     },

     typeByWords = (cb) => {
       let words = options.text.split(' '),
           numberOfWords = words.length,
           currentPosition = 0;

       let interval = window.setInterval(() => {
         if (currentPosition === numberOfWords) {
           window.clearInterval(interval);

           cb && cb.call(window);
         } else {
           options.element.innerHTML += (words[currentPosition] + ' ');
           currentPosition++;
         }
       }, getIntervalSpeed());
     };

     this.type = (cb) => {
       options.words ? typeByWords(cb) :
           isNumber(options.interval) ? typeByLettersConstantInterval(cb) :
                                        typeByLettersRandomisedInterval(cb);
     }

  }
}