export const chunkArray = (arr: number[], cnt: number) =>
    arr.reduce((prev: number[][], cur: number, i: number, a: number[]) => (!(i % cnt) ? prev.concat([a.slice(i, i + cnt)]) : prev), []);

export const generateArray = (length: number) => {
    const values = [...Array(length)].map((_, i) => i + 1);
    const result = [...Array(length)].map(() => values.splice(Math.floor(Math.random() * values.length), 1)[0]);

    return chunkArray(result, 3);
};

export const isWin = (arr: number[][]) => {
    const array = arr.reduce(function (flat, current) {
        return flat.concat(current);
    }, []);

    return array.toString() === array.slice().sort().toString();
};

export const correctArr = (i: number, j: number, arr: number[][], number: number, setArr: (arr: number[][]) => void) => {
    arr?.forEach((array, e) =>
        array.forEach((item, k) => {
            if (item === number && ((Math.abs(j - k) === 1 && e === i) || (Math.abs(e - i) === 1 && j === k))) {
                [arr[i][j], arr[e][k]] = [arr[e][k], arr[i][j]];
                setArr([...arr]);
            }
        }),
    );
};
