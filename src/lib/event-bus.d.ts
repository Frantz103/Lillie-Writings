/**
 * Event Bus
 *
 * Central event system for the Concepts and Synchronizations architecture.
 * Concepts emit events through this bus, and Synchronizations subscribe to them.
 * This maintains complete isolation between Concepts.
 */
type EventHandler<T = any> = (payload: T) => void | Promise<void>;
interface EventSubscription {
    unsubscribe: () => void;
}
declare class EventBus {
    private handlers;
    /**
     * Subscribe to an event
     * @param eventName - The name of the event (e.g., "text_capture.snippet_created")
     * @param handler - The function to call when the event is emitted
     * @returns A subscription object with an unsubscribe method
     */
    subscribe<T = any>(eventName: string, handler: EventHandler<T>): EventSubscription;
    /**
     * Emit an event to all subscribers
     * @param eventName - The name of the event
     * @param payload - The data to send to subscribers
     */
    emit<T = any>(eventName: string, payload: T): Promise<void>;
    /**
     * Remove all subscribers for an event
     * @param eventName - The name of the event
     */
    clear(eventName?: string): void;
    /**
     * Get the number of subscribers for an event
     * @param eventName - The name of the event
     */
    subscriberCount(eventName: string): number;
}
export declare const eventBus: EventBus;
export declare function createEventEmitter<T>(eventName: string): (payload: T) => Promise<void>;
export declare function createEventSubscriber<T>(eventName: string): (handler: EventHandler<T>) => EventSubscription;
export {};
