import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

 
export const Timers = new Mongo.Collection('timers');

if (Meteor.isServer) {
  // Only publish timers that belong to the current user
  Meteor.publish('timers', function timersPublication() {
    return Timers.find({ owner: this.userId });
  });  
}

Meteor.methods({
  'timers.insert'(text) {
    check(text, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Timers.insert({
      desc: text,
      createdAt: new Date(),
      owner: this.userId,
      secondsElapsed: 0,
      started: false,
      startedAt: new Date(),
      unmountDate: new Date(),
      didUnmount: false
    });
  },

  'timer.remove'(timerId) {
    check(timerId, String);

    const timer = Timers.findOne(timerId);

    if (timer.owner !== this.userId) {
      throw new Meteor.Error('no permission');
    }

    Timers.remove(timerId);
  },

  'timer.unmount'(timerId, seconds) {
    check(timerId, String);
    check(seconds, Number);

    Timers.update(timerId, { 
    	$set: { 
    		secondsElapsed: seconds,
    		unmountDate: new Date(),
        didUnmount: true
    	} 
    });
  },

  'timer.setStarted'(timerId, setStarted, seconds) {
    check(timerId, String);
    check(setStarted, Boolean);

    const timer = Timers.findOne(timerId);

    if (timer.owner !== this.userId) {
      throw new Meteor.Error('no permission');
    }

    if(!setStarted){
      Timers.update(timerId, { 
        $set: { 
          started: setStarted,
          secondsElapsed: seconds
        } 
      }); 
    }else{
      Timers.update(timerId, { 
        $set: { 
          started: setStarted,
          startedAt: new Date(),
          didUnmount: false 
        } 
      });
    }
    
  }, 
});