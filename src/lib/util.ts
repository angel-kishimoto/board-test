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