import React from 'react';

const bubbleSort = async(props) => {
    let array = this.state.array.slice(0);
    let toDispatch = [];
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (array[j].val > array[j + 1].val) {
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
                toDispatch.push({
                    array: array.slice(0),
                    swappedPair: [j, j + 1],
                });
            }
        }
    }

    for (let obj of toDispatch) {
        obj.array[obj.swappedPair[0]].color = "red";
        obj.array[obj.swappedPair[1]].color = "red";
        this.setState({
            array: [...obj.array],
            swappedPair: obj.swappedPair
        });

        await this.sleep(this.state.speed);

        obj.array[obj.swappedPair[0]].color = "aqua";
        obj.array[obj.swappedPair[1]].color = "aqua";
        this.setState({ array: [...obj.array] });
    };

    let arr = [...this.state.array];
    for (let i = 0; i < arr.length; i++) {
        arr[i].color = "#00ff00";
        this.setState({ array: [...arr] });
        await this.sleep(this.state.speed);
    };

}

function sleep(ms) {
    return (
        new Promise((resolve, reject) => setTimeout(resolve, ms))
    );
}

export default bubbleSort;