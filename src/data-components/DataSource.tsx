
export type DataType = string;
type FilterItemFunction = (i: DataType) => boolean;
type SortFunction = (a: DataType, b: DataType) => number;
type NotifyFunction = () => void;


export class DataSource {
    
    private myData : DataType[] = [];
    private subscribers : Array<NotifyFunction> = [];
    
    private lastFilterFunc : FilterItemFunction = (a) => true;
    private lastSortFunc : SortFunction = (a,b) => 0;
    filteredData : DataType[]  = [];

    loadData (data: DataType[]) {
        this.myData = data;
        this.updateData()
    }

    addSubscriber(f: NotifyFunction) {
        this.subscribers.push(f);
        this.notifySubscribers();
    }

    addData(n: DataType) {
        this.myData.push(n);
        this.updateData()
    }

    applyFilter(f: FilterItemFunction) {
        this.lastFilterFunc = f;
        this.updateData()
    }

    applySort(f: SortFunction) {
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