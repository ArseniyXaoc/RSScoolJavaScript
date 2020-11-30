class EventObserver {
    constructor() {
        this.observes = [];
    }

    subscribe(fn){
        this.observes.push(fn);
    }

    unsubscribe(fn){
       this.observes = this.observes.filter((subscriber) => subscriber !==fn);
    }

    broadcast(data){
        this.observes.forEach((subscriber) => subscriber(data));
    }
} // Подписаться

export { EventObserver};
// observer.unsubscribe(fn); // Отписаться
// observer.broadcast(); // Вызов подписавшихся
