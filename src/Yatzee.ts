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
        for (var i = 0; i != args.length; ++i) {
            let die = args[i];
            counts[die - 1]++;
        }
        for (i = 0; i != 6; i++) if (counts[i] == 5) return 50;
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

    static score_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        let counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        counts[d1 - 1]++;
        counts[d2 - 1]++;
        counts[d3 - 1]++;
        counts[d4 - 1]++;
        counts[d5 - 1]++;
        for (let at = 0; at != 6; at++) if (counts[6 - at - 1] >= 2) return (6 - at) * 2;
        return 0;
    }

    static two_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        let counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        counts[d1 - 1]++;
        counts[d2 - 1]++;
        counts[d3 - 1]++;
        counts[d4 - 1]++;
        counts[d5 - 1]++;
        let n = 0;
        let score = 0;
        for (let i = 0; i < 6; i += 1)
            if (counts[6 - i - 1] >= 2) {
                n++;
                score += 6 - i;
            }
        if (n == 2) return score * 2;
        else return 0;
    }

    static four_of_a_kind(_1: number, _2: number, d3: number, d4: number, d5: number): number {
        var tallies;
        tallies = [0, 0, 0, 0, 0, 0, 0, 0];
        tallies[_1 - 1]++;
        tallies[_2 - 1]++;
        tallies[d3 - 1]++;
        tallies[d4 - 1]++;
        tallies[d5 - 1]++;
        for (let i = 0; i < 6; i++) if (tallies[i] >= 4) return (i + 1) * 4;
        return 0;
    }

    static three_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        var t;
        t = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        t[d1 - 1]++;
        t[d2 - 1]++;
        t[d3 - 1]++;
        t[d4 - 1]++;
        t[d5 - 1]++;
        for (let i = 0; i < 6; i++) if (t[i] >= 3) return (i + 1) * 3;
        return 0;
    }

    static smallStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        var tallies;
        tallies = [0, 0, 0, 0, 0, 0, 0];
        tallies[d1 - 1] += 1;
        tallies[d2 - 1] += 1;
        tallies[d3 - 1] += 1;
        tallies[d4 - 1] += 1;
        tallies[d5 - 1] += 1;
        if (tallies[0] == 1 && tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1) return 15;
        return 0;
    }

    static largeStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        var tallies;
        tallies = [0, 0, 0, 0, 0, 0, 0, 0];
        tallies[d1 - 1] += 1;
        tallies[d2 - 1] += 1;
        tallies[d3 - 1] += 1;
        tallies[d4 - 1] += 1;
        tallies[d5 - 1] += 1;
        if (tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1 && tallies[5] == 1) return 20;
        return 0;
    }

    static fullHouse(d1: number, d2: number, d3: number, d4: number, d5: number): number {
        var tallies;
        var _2 = false;
        var i;
        var _2_at = 0;
        var _3 = false;
        var _3_at = 0;

        tallies = [0, 0, 0, 0, 0, 0, 0, 0];
        tallies[d1 - 1] += 1;
        tallies[d2 - 1] += 1;
        tallies[d3 - 1] += 1;
        tallies[d4 - 1] += 1;
        tallies[d5 - 1] += 1;

        for (i = 0; i != 6; i += 1)
            if (tallies[i] == 2) {
                _2 = true;
                _2_at = i + 1;
            }

        for (i = 0; i != 6; i += 1)
            if (tallies[i] == 3) {
                _3 = true;
                _3_at = i + 1;
            }

        if (_2 && _3) return _2_at * 2 + _3_at * 3;
        else return 0;
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
}
