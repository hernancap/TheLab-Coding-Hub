class Pila<T> {
    private elementos: T[] = [];

    push(item: T): boolean {
        this.elementos.push(item);
        return true;
    }

    pop(): T | undefined {
        return this.elementos.pop();
    }

    size(): number {
        return this.elementos.length;
    }

    protected contiene(elemento: T): boolean {
        return this.elementos.includes(elemento);
    }
    
}

export { Pila };
