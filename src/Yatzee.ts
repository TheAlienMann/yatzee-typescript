export default class Yatzee {
    private readonly dice: number[];

    constructor(d1: number, d2: number, d3: number, d4: number, _5: number) {
        this.dice = [];
        this.dice[0] = d1;
        this.dice[1] = d2;
        this.dice[2] = d3;
        this.dice[3] = d4;
        this.dice[4] = _5;
    }

    static chance(...args: number[]): number {
        return args.reduce((acc, val) => acc + val, 0);
    }

    static yatzy(...args: number[]): number {
        let counts = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i != args.length; ++i) {
            let die = args[i];
            counts[die - 1]++;
        }
        for (let i = 0; i != 6; i++) if (counts[i] == 5) return 50;
        return 0;
    }

    static ones(...args: number[]): number {
        return args.filter((num) => num == 1).reduce((acc, val) => acc + val, 0);
    }

    static twos(...args: number[]): number {
        return args.filter((num) => num == 2).reduce((acc, val) => acc + val, 0);
    }

    static threes(...args: number[]): number {
        return args.filter((num) => num == 3).reduce((acc, val) => acc + val, 0);
    }

    fours(): number {
        return this.dice.filter((num) => num == 4).reduce((acc, val) => acc + val, 0);
    }

    fives(): number {
        return this.dice.filter((num) => num == 5).reduce((acc, val) => acc + val, 0);
    }

    sixes(): number {
        return this.dice.filter((num) => num == 6).reduce((acc, val) => acc + val, 0);
    }

    static score_pair(...args: number[]): number {
        let counts = [0, 0, 0, 0, 0, 0, 0, 0];
        counts[args[0] - 1]++;
        counts[args[1] - 1]++;
        counts[args[2] - 1]++;
        counts[args[3] - 1]++;
        counts[args[4] - 1]++;
        for (let at = 0; at != 6; at++) if (counts[6 - at - 1] >= 2) return (6 - at) * 2;
        return 0;
    }

    static two_pair(...args: number[]): number {
        let counts = [0, 0, 0, 0, 0];
        counts[args[1 - 1] - 1]++;
        counts[args[2 - 1] - 1]++;
        counts[args[3 - 1] - 1]++;
        counts[args[4 - 1] - 1]++;
        counts[args[5 - 1] - 1]++;
        let n = 0;
        let score = 0;
        for (let i = 0; i < 5; i += 1)
            if (counts[5 - i - 1] >= 2) {
                n++;
                score += 5 - i;
            }
        if (n == 2) return score * 2;
        else return 0;
    }

    static four_of_a_kind(...args: number[]): number {
        let tallies = [0, 0, 0, 0, 0];
        tallies[args[1 - 1] - 1]++;
        tallies[args[2 - 1] - 1]++;
        tallies[args[3 - 1] - 1]++;
        tallies[args[4 - 1] - 1]++;
        tallies[args[5 - 1] - 1]++;
        for (let i = 0; i < 5; i++) if (tallies[i] >= 4) return (i + 1) * 4;
        return 0;
    }

    static three_of_a_kind(...args: number[]): number {
        let t = [0, 0, 0, 0, 0];
        t[args[0] - 1]++;
        t[args[1] - 1]++;
        t[args[2] - 1]++;
        t[args[3] - 1]++;
        t[args[4] - 1]++;
        for (let i = 0; i < 5; i++) if (t[i] >= 3) return (i + 1) * 3;
        return 0;
    }

    static smallStraight(...args: number[]): number {
        const numberOfOccurences = this.occurencesIn(args);
        return this.sumOf(numberOfOccurences, 5);
    }

    static largeStraight(...args: number[]): number {
        const numberOfOccurences = this.occurencesIn(args);
        return this.sumOf(numberOfOccurences, 5);
    }

    static fullHouse(...args: number[]): number {
        const numberOfOccurences = this.occurencesIn(args);
        return this.sumOf(numberOfOccurences, 2);
    }

    private static sumOf(numberOfOccurences: {}, countsOfOccurences: number) {
        let sum = 0;
        if (Object.keys(numberOfOccurences).length != countsOfOccurences) {
            return 0;
        } else {
            for (let [key, value] of Object.entries(numberOfOccurences)) {
                sum += +key * +value;
            }
            return sum;
        }
    }

    private static sumOfDifferentOccur(numberOfOccurences: {}, countsOfOccurences: number) {
        if (Object.keys(numberOfOccurences).length <= countsOfOccurences) {
            for (let [key, value] of Object.entries(numberOfOccurences)) {
                if (+value >= countsOfOccurences) {
                    return +key * countsOfOccurences;
                }
            }
        } else {
            return 0;
        }
    }

    private static occurencesIn(args: number[]) {
        const numberOfOccurences = {};
        for (let item = 0; item < args.length; item++) {
            if (isNaN(numberOfOccurences[args[item].toString()])) {
                numberOfOccurences[args[item].toString()] = 1;
            } else {
                numberOfOccurences[args[item].toString()] += 1;
            }
        }
        return numberOfOccurences;
    }
}
