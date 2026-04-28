export class Utils {
    private static instance: null | Utils = null;

    private constructor() { }

    public static getInstance(): Utils {
        if (this.instance == null) {
            this.instance = new Utils();
        }
        return this.instance;
    }

    public allergiesOverlap(studentAllergies: number[], menuItemIngredients: number[]): number[] {
        const overlapIds: number[] = []
        const set = new Set(studentAllergies);

        set.forEach((allergy: number) => {
            if (menuItemIngredients.includes(allergy)) {
                overlapIds.push(allergy)
            }
        })
        return overlapIds
    }
}
