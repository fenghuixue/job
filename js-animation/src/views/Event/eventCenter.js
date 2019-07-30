/**
 * @file EventCenter
 * @author zq6
 */
import eventMixin from './eventMixin';

function EventCenter() {
    let ec = this;
    this._events = Object.create(null);
} 

eventMixin(EventCenter);

export default EventCenter;
