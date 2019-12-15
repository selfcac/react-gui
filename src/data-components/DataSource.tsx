
export type dsDataType = string;
type FilterItemFunction = (i: dsDataType) => boolean;
type SortFunction = (a: dsDataType, b: dsDataType) => number;
type NotifyFunction = () => void;


export class DataSource {
    
    private myData : dsDataType[] = [];
    private subscribers : Array<NotifyFunction> = [];
    
    private lastFilterFunc : FilterItemFunction = (a) => true;
    private lastSortFunc : SortFunction = (a,b) => 0;
    filteredData : dsDataType[]  = [];

    loadData (data: dsDataType[]) {
        this.myData = data;
        this.updateData()
    }

    addSubscriber(f: NotifyFunction) {
        this.subscribers.push(f);
        this.notifySubscribers();
    }

    addData(n: dsDataType) {
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