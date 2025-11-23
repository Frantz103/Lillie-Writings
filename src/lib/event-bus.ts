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

class EventBus {
  private handlers: Map<string, Set<EventHandler>> = new Map();

  /**
   * Subscribe to an event
   * @param eventName - The name of the event (e.g., "text_capture.snippet_created")
   * @param handler - The function to call when the event is emitted
   * @returns A subscription object with an unsubscribe method
   */
  subscribe<T = any>(eventName: string, handler: EventHandler<T>): EventSubscription {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, new Set());
    }

    const handlers = this.handlers.get(eventName)!;
    handlers.add(handler as EventHandler);

    return {
      unsubscribe: () => {
        handlers.delete(handler as EventHandler);
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
  async emit<T = any>(eventName: string, payload: T): Promise<void> {
    const handlers = this.handlers.get(eventName);
    if (!handlers || handlers.size === 0) {
      return;
    }

    // Call all handlers, awaiting promises if they exist
    const promises = Array.from(handlers).map(handler => {
      try {
        return Promise.resolve(handler(payload));
      } catch (error) {
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
  clear(eventName?: string): void {
    if (eventName) {
      this.handlers.delete(eventName);
    } else {
      this.handlers.clear();
    }
  }

  /**
   * Get the number of subscribers for an event
   * @param eventName - The name of the event
   */
  subscriberCount(eventName: string): number {
    return this.handlers.get(eventName)?.size ?? 0;
  }
}

// Singleton instance
export const eventBus = new EventBus();

// Type-safe event emitter helper
export function createEventEmitter<T>(eventName: string) {
  return (payload: T) => eventBus.emit(eventName, payload);
}

// Type-safe event subscriber helper
export function createEventSubscriber<T>(eventName: string) {
  return (handler: EventHandler<T>) => eventBus.subscribe(eventName, handler);
}
