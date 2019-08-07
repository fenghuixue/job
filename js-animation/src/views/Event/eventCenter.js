/**
 * @file EventCenter
 * @author zq6
 */
import eventMixin from './eventMixin';

function EventCenter() {
    this._events = Object.create(null);
} 

eventMixin(EventCenter);

export default EventCenter;
