export interface Expense {
    id: number,
    description: string,
    amount: number,
    type: string,
    date: Date,
}

export interface Sort {
    name: string,
    value: string,
    type: number,
}