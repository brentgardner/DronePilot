var RollingSpider = require("rolling-spider");
var log = require("./logger");

const rollingSpider = new RollingSpider();

const promise = new Promise(function(resolve, reject) {

  log('connecting...');
  rollingSpider.connect(function() {
    log('setup...');
    rollingSpider.setup(function() {
      rollingSpider.flatTrim();
      rollingSpider.startPing();
      rollingSpider.flatTrim();

      

      // Resolve promise
      resolve();

      log('listening...');
    });
  });

});

let action = promise;

/**
 * Drone module
 */



const drone = (function() {

  /**
   * Makes drone take off
   * Translates to Turn On
   * @return {Promise}
   */
  function takeoff() {

    console.log('taking off...');

    action = action.then(function() {
      return new Promise(function(resolve, reject) {

        rollingSpider.flatTrim(function() {
          rollingSpider.takeOff(function() {
            console.log('drone did take off!');
          });
          resolve();

          console.log('drone is hovering...');
        });


      });
    });

    return action;

  }

  /**
   * Lands drone
   * Translates to stop
   * @return {Promise}
   */
  function land() {

    console.log('landing...');

    action = action.then(function() {
      return new Promise(function(resolve, reject) {
        rollingSpider.land(function() {
          console.log('drone did land!');
          resolve();
        });


      });
    });

    return action;
  }

  /**
   * Move drone
   * Translates to Go Up and 2x for go Up Higher
   * @param {Object}
   * @return {Promise}
   */
  function move({direction = 'up', speed = 60, steps = 2}) {

    console.log('move...', direction);

    action = action.then(function() {
      return new Promise(function(resolve, reject) {

        // Direction should be: `up`, `down`, `left`, or `right`
        rollingSpider[direction]({ speed, steps }, function() {
          console.log('drone did move ', direction);
          resolve();
        });


      });
    });

    return action;

  }

  /**
   * Turn left or right
   * Translates to go left and go right
   * @return {Promise}
   */
  function turn({ direction = 'right', speed = 60, steps = 2 }) {

    console.log('turn...', direction);

    action = action.then(function() {
      return new Promise(function(resolve, reject) {

        // Turning right or left?
        let methodName = (direction === 'right') ?
          'turnRight' : 'turnLeft';

        rollingSpider[methodName]({ speed, steps }, function() {
          console.log('drone did turn ', direction);
          resolve();
        });

      });
    });

    return action;


  }

  /**
   * Causes the drone to shut off the motors "instantly"
   * Sometimes has to wait for other commands ahead of it to
   * complete... not fully safe yet
   *
   * @return {Promise}
   */
  function emergency() {

    console.log('emergency...');

    action = action.then(function() {
      return new Promise(function(resolve, reject) {

        rollingSpider.emergency(function() {
          console.log('emergency!');
          resolve();
        });


      });
    });

    return action;

  }

  /**
   * Flips the dron over towards the fron
   * Translates to Turn up side down
   * @return {Promise}
   */
  function frontflip() {

    console.log('frontflip...');

    action = action.then(function() {
      return new Promise(function(resolve, reject) {

        rollingSpider.frontFlip(function() {
          console.log('dene did a frontflip!');
          resolve();
        });


      });
    });

    return action;

  }

  /**
   * TODO Turn around needs to rotate on the Y axis
   * 
   * Add the status to a log file that prints to the directory for each flight;
   */

  function turnaround() {

    console.log('trurn around and around...');

    action = action.then(function() {
      return new Promise(function(resolve, reject) {

        rollingSpider.frontFlip(function() {
          console.log('drone did turn around!');
          resolve();
        });


      });
    });

    return action;

  }
  /**
   * Go forward
   */


  /**
   * Module pattern, exposing functions
   */
  return {
    takeoff,
    land,
    move,
    turn,
    emergency,
    frontflip
  };

})();

/**
 * Exports drone module
 */
module.exports = drone;

