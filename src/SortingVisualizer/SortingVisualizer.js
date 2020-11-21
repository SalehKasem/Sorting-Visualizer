import React, { Component } from 'react';
import classes from './SortingVisualizer.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class SortingVisualizer extends Component {

    state = {
        array: [],
        swappedPair: [],
        pivot: null,
        speed: 75
    }

    componentDidMount() {
        this.initializeArray();
    }

    initializeArray = () => {
        const arr = [];
        for (let i = 0; i < 150; i++) {
            arr.push({
                val: this.getRandomNumber(10, 500),
                color: 'aqua'
            });
        }

        this.setState({
            array: arr,
        });
    }

    bubbleSort = async () => {
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

    };

    getRandomNumber = (max, min) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    sleep(ms) {
        return (
            new Promise((resolve, reject) => setTimeout(resolve, ms))
        );
    }

    speedChangeHandler = (event) => {
        this.setState({ speed: (event.target.value - 150)*(-1) })
    }

    swap = (array, leftIndex, rightIndex) => {
        var temp = array[leftIndex];
        array[leftIndex] = array[rightIndex];
        array[rightIndex] = temp;

    }

    quickSort = (arr, p, r, toDispatch) => {

        if (p >= r) {
            console.log(toDispatch);
            return;
        }

        let x = arr[r].val, i = p - 1;

        for (let j = p; j < r; j++) {
            if (arr[j].val <= x) {
                i++;
                this.swap(arr, i, j);
                toDispatch.push({
                    array: arr.slice(0),
                    swappedPair: [i, j],
                    pivot: r
                });
            }
        }

        let newPivot = i + 1;
        this.swap(arr, newPivot, r);
        toDispatch.push({
            array: arr.slice(0),
            swappedPair: [newPivot, r],
            pivot: newPivot
        });


        this.quickSort(arr, p, newPivot - 1, toDispatch);
        this.quickSort(arr, newPivot + 1, r, toDispatch);

    }

    quickSortAlgo = () => {

        let arr = this.state.array.slice(0);
        let toDispatch = [];
        if (arr.length > 1) {
            this.quickSort(arr, 0, arr.length - 1, toDispatch);
            this.handelDispatch(toDispatch);
        }

    }

    handelDispatch = async (toDispatch) => {
        for (let obj of toDispatch) {
            obj.array[obj.swappedPair[0]].color = "red";
            obj.array[obj.swappedPair[1]].color = "red";
            obj.array[obj.pivot].color = "yellow";
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

    render() {

        return (
            <div>
                <Toolbar />
                <div className={classes.SortingVisualizer}>
                    {this.state.array.map((obj, idx) => (
                        <div
                            className={classes.bar}
                            key={idx}
                            style={{
                                height: `${obj.val}px`,
                                background: obj.color
                            }}>
                        </div>
                    ))}
                </div>

                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.quickSortAlgo()}>Quick Sort</button>
                <button onClick={this.initializeArray}>SHUFFLE</button>
                <input
                    type="range"
                    min="0"
                    max="150"
                    onChange={this.speedChangeHandler} />

            </div>

        );
    }

}


export default SortingVisualizer;