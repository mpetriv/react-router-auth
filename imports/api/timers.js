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
  'timers.insert'(description, timerType) {
    check(description, String);
    check(timerType, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    let timerSeconds = 0;
    if(timerType === 'countdown'){
      timerSeconds = 30;
    }

    Timers.insert({
      desc: description,
      createdAt: new Date(),
      owner: this.userId,
      type: timerType,
      seconds: timerSeconds,
      started: false,
      startedAt: new Date()
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

  'timer.setStarted'(timerId, setStarted, secs) {
    check(timerId, String);
    check(setStarted, Boolean);
    check(secs, Number);

    const timer = Timers.findOne(timerId);

    if (timer.owner !== this.userId) {
      throw new Meteor.Error('no permission');
    }

    if(!setStarted){
      Timers.update(timerId, { 
        $set: { 
          started: setStarted,
          seconds: secs
        } 
      }); 
    }else{
      Timers.update(timerId, { 
        $set: { 
          started: setStarted,
          startedAt: new Date()
        } 
      });
    }
    
  }, 
});