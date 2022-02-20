type returntype = "data" | "close";

export class DummyDataConnection {
    currentRow: number;
    constructor(private rows: number, private batchSize: number, private fakeWait = 20) {
        this.currentRow = 0;
    }

    /**
     * simple helper, to delay resonse
     * @param ms
     * @returns
     */
    wait(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    getType() {
        let type: returntype = "data";
        if (this.currentRow === this.rows) {
            type = "close";
        }
        return type;
    }

    /**
     * dum little data helper, it will callback with new data with a little delay
     * @param evenHandler
     */
    async query(evenHandler: (type: returntype, data: Record<string, any>[]) => void) {
        let data: Record<string, any>[] = [];
        let batchCount = 0;

        for (let i = 0; this.currentRow < this.rows; i++) {
            this.currentRow++;
            batchCount++;
            data.push({
                id: this.currentRow,
                name: "person" + this.currentRow,
                name1: "person" + this.currentRow,
                name2: "person" + this.currentRow,
                name3: "person" + this.currentRow,
                name4: "person" + this.currentRow,
                name5: "person" + this.currentRow,
                name6: "person" + this.currentRow,
                name7: "person" + this.currentRow,
                name8: "person" + this.currentRow
            });
            if (batchCount === this.batchSize) {
                evenHandler(this.getType(), data);
                await this.wait(this.fakeWait);
                data = [];
                batchCount = 0;
            }
        }

        if (data.length) {
            // if any left overs, we need to send it
            evenHandler(this.getType(), data);
        }
    }
}
