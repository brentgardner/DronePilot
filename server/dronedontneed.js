/**
 * Drone module
 */

const drone = (function() {

    /**
     * Makes drone take off
     * @return {Promise}
     */
    function takeoff() {
  
      console.log('taking off...');
  
      action = action.then(function() {
        return new Promise(function(resolve, reject) {
  
          rollingSpider.flatTrim(function() {
            rollingSpider.takeOff(function() {
              console.log('took off!');
            });
            resolve();
  
            console.log('hovering!');
          });
  
  
        });
      });
  
      return action;
  
    }
  
    /**
     * Lands drone
     * @return {Promise}
     */
    function land() {
  
      console.log('land...');
  
      action = action.then(function() {
        return new Promise(function(resolve, reject) {
          rollingSpider.land(function() {
            console.log('landed!');
            resolve();
          });
  
  
        });
      });
  
      return action;
    }

     /**
     * Lands drone
     * @return {Promise}
     */
    function frontflip() {
  
      console.log('front flip...');
  
      action = action.then(function() {
        return new Promise(function(resolve, reject) {
          rollingSpider.frontFlip(function() {
            console.log('flipped!');
            resolve();
          });
  
  
        });
      });
  
      return action;
    }
  
    /**
     * Move drone
     * @param {Object}
     * @return {Promise}
     */
    function move({direction = 'up', speed = 60, steps = 2}) {
  
      console.log('move...', direction);
  
      action = action.then(function() {
        return new Promise(function(resolve, reject) {
  
          // Direction should be: `up`, `down`, `left`, or `right`
          rollingSpider[direction]({ speed, steps }, function() {
            console.log('down!');
            resolve();
          });
  
  
        });
      });
  
      return action;
  
    }
  
    /**
     * Turn left or right
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
            console.log('turned!', direction);
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
  
  