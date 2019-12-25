import { DomainItem } from "../commons/Classes/DomainItem";


type FilterItemFunction<T> = (i: T) => boolean;
type SortFunction<T> = (a: T, b: T) => number;
type NotifyFunction = () => void;


export class DataSource<T> {
    
    private myData : T[] = [];
    private subscribers : Array<NotifyFunction> = [];
    
    private lastFilterFunc : FilterItemFunction<T> = (a) => true;
    private lastSortFunc : SortFunction<T> = (a,b) => 0;
    filteredData : T[]  = [];

    loadData (data: T[]) {
        this.myData = data;
        this.updateData()
    }

    addSubscriber(f: NotifyFunction) {
        this.subscribers.push(f);
        this.notifySubscribers();
    }

    addData(n: T) {
        this.myData.push(n);
        this.updateData()
    }

    applyFilter(f: FilterItemFunction<T>) {
        this.lastFilterFunc = f;
        this.updateData()
    }

    reApplyFilters() {
        this.updateData();
    }

    applySort(f: SortFunction<T>) {
        this.lastSortFunc = f;
        this.updateData()
    }

    private updateData() {
        this.filteredData = this.myData.filter(this.lastFilterFunc).sort(this.lastSortFunc);
        this.notifySubscribers()
    }

    private notifySubscribers() {
        this.subscribers.forEach(f => f());
    }
}