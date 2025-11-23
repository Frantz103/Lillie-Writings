"use strict";
/**
 * Event Bus
 *
 * Central event system for the Concepts and Synchronizations architecture.
 * Concepts emit events through this bus, and Synchronizations subscribe to them.
 * This maintains complete isolation between Concepts.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBus = void 0;
exports.createEventEmitter = createEventEmitter;
exports.createEventSubscriber = createEventSubscriber;
class EventBus {
    constructor() {
        this.handlers = new Map();
    }
    /**
     * Subscribe to an event
     * @param eventName - The name of the event (e.g., "text_capture.snippet_created")
     * @param handler - The function to call when the event is emitted
     * @returns A subscription object with an unsubscribe method
     */
    subscribe(eventName, handler) {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, new Set());
        }
        const handlers = this.handlers.get(eventName);
        handlers.add(handler);
        return {
            unsubscribe: () => {
                handlers.delete(handler);
                if (handlers.size === 0) {
                    this.handlers.delete(eventName);
                }
            },
        };
    }
    /**
     * Emit an event to all subscribers
     * @param eventName - The name of the event
     * @param payload - The data to send to subscribers
     */
    async emit(eventName, payload) {
        const handlers = this.handlers.get(eventName);
        if (!handlers || handlers.size === 0) {
            return;
        }
        // Call all handlers, awaiting promises if they exist
        const promises = Array.from(handlers).map(handler => {
            try {
                return Promise.resolve(handler(payload));
            }
            catch (error) {
                console.error(`Error in event handler for ${eventName}:`, error);
                return Promise.resolve();
            }
        });
        await Promise.all(promises);
    }
    /**
     * Remove all subscribers for an event
     * @param eventName - The name of the event
     */
    clear(eventName) {
        if (eventName) {
            this.handlers.delete(eventName);
        }
        else {
            this.handlers.clear();
        }
    }
    /**
     * Get the number of subscribers for an event
     * @param eventName - The name of the event
     */
    subscriberCount(eventName) {
        return this.handlers.get(eventName)?.size ?? 0;
    }
}
// Singleton instance
exports.eventBus = new EventBus();
// Type-safe event emitter helper
function createEventEmitter(eventName) {
    return (payload) => exports.eventBus.emit(eventName, payload);
}
// Type-safe event subscriber helper
function createEventSubscriber(eventName) {
    return (handler) => exports.eventBus.subscribe(eventName, handler);
}
