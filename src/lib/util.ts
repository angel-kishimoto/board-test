export const range = (n: number): number[] => [...Array(n).keys()]

export const setNodePos = (node: HTMLElement, left: number, top: number) => {
    if (left === null || left === undefined) return;
    if (top === null || top === undefined) return;
    node.style.top = `${top}px`;
    node.style.left = `${left}px`;
};


export const getNodePos = (node: HTMLElement) => {
    let style = window.getComputedStyle(node);
    let left = parseInt(style.left);
    let top = parseInt(style.top);
    return ({ left: left, top: top });
};


export const getMovement = (event: MouseEvent) => ({ x: event.movementX, y: event.movementY });



export const parseNum = (string: string): number => {
    let num = parseInt(string);
    if (isNaN(num)) num = 0;
    return num;
}

export const shuffle = (array: any[]): any[] => {
    let tmp = [...array]

    let iMax = range(tmp.length).reverse();

    for (let i of iMax) {
        if (i == 0) continue;
        const j = Math.floor(Math.random() * (i + 1));
        [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
    }
    return tmp;
}


export const calcLatticePosition = (areaWidth: number, areaHeight: number, objectWidth: number, objectHeight: number, nCol: number, nRow: number) => {
    const [dx, dy] = [areaWidth / nCol, areaHeight / nRow];
    const [offsetX, offsetY] = [(dx - objectWidth) / 2, (dy - objectHeight) / 2];

    const vertex = range(nCol).map((col) => range(nRow).map(row => [col, row])).flat();

    const positions = vertex.map(([col, row]) => [Math.round(dx * col + offsetX), Math.round(dy * row + offsetY)]);

    return positions;
}