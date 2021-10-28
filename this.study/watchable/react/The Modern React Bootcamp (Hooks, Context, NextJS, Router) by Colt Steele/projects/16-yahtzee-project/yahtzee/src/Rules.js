/** Rule for Yahtzee scoring.
 *
 * This is an "abstract class"; the real rules are subclasses of these.
 * This stores all parameters passed into it as properties on the instance
 * (to simplify child classes so they don't need constructors of their own).
 *
 * It contains useful functions for summing, counting values, and counting
 * frequencies of dice. These are used by subclassed rules.
 */

class Rule {
  constructor(params) {
    // put all properties in params on instance
    Object.assign(this, params);
  }

  sum(dice) {
    // sum of all dice
    return dice.reduce((sum, die) => sum + die);
  }

  freq(dice) {
    // frequencies of dice values
    const freqs = new Map();
    for (let die of dice) {
      freqs.set(die, (freqs.get(die) || 0) + 1);
    }
    return Array.from(freqs.values());
  }

  count(dice, value) {
    // # times val appears in dice
    return dice.filter((die) => die === value).length;
  }
}

/** Given a sought-for val, return sum of dice of that val.
 *
 * Used for rules like "sum of all ones"
 */

class TotalOneNumber extends Rule {
  evalRoll = (dice) => {
    return this.value * this.count(dice, this.value);
  };
}

/** Given a required # of same dice, return sum of all dice.
 *
 * Used for rules like "sum of all dice when there is a 3-of-kind"
 */

class SumDistro extends Rule {
  evalRoll = (dice) => {
    // do any of the counts meet of exceed this distro?
    return this.freq(dice).some((dieCount) => dieCount >= this.count)
      ? this.sum(dice)
      : 0;
  };
}

/** Check if full house (3-of-kind and 2-of-kind) */

class FullHouse extends Rule {
  evalRoll = (dice) => {
    const freq = this.freq(dice);
    return freq.includes(3) && freq.includes(2) ? this.score : 0;
  };
}

/** Check for small straights. */

class SmallStraight extends Rule {
  evalRoll = (dice) => {
    const diceSet = new Set(dice);

    // There are three cases of small straight: 1234, 2345, 3456
    if (
      // Case 1234, 2345
      (diceSet.has(2) &&
        diceSet.has(3) &&
        diceSet.has(4) &&
        (diceSet.has(1) || diceSet.has(5))) ||
      // Case 3456
      (diceSet.has(3) && diceSet.has(4) && diceSet.has(5) && diceSet.has(6))
    ) {
      return this.score;
    }

    return 0;
  };
}

/** Check for large straights. */

class LargeStraight extends Rule {
  evalRoll = (dice) => {
    const diceSet = new Set(dice);

    // large straight must be 5 different dice & only one can be a 1 or a 6
    return diceSet.size === 5 && (!diceSet.has(1) || !diceSet.has(6))
      ? this.score
      : 0;
  };
}

/** Check if all dice are same. */

class Yahtzee extends Rule {
  evalRoll = (dice) => {
    // all dice must be the same
    return this.freq(dice)[0] === 5 ? this.score : 0;
  };
}

// ones, twos, etc score as sum of that value
export const ones = new TotalOneNumber({
  value: 1,
  description: "1 points per 1"
});
export const twos = new TotalOneNumber({
  value: 2,
  description: "2 points per 2"
});
export const threes = new TotalOneNumber({
  value: 3,
  description: "3 points per 3"
});
export const fours = new TotalOneNumber({
  value: 4,
  description: "4 points per 4"
});
export const fives = new TotalOneNumber({
  value: 5,
  description: "5 points per 5"
});
export const sixes = new TotalOneNumber({
  value: 6,
  description: "6 points per 6"
});

// three/four of kind score as sum of all dice
export const threeOfKind = new SumDistro({
  count: 3,
  description: "Sum all dice if 3 are the same"
});
export const fourOfKind = new SumDistro({
  count: 4,
  description: "Sum all dice if 4 are the same"
});

// full house scores as flat 25
export const fullHouse = new FullHouse({
  score: 25,
  description: "25 points for a full house"
});

// small/large straights score as 30/40
export const smallStraight = new SmallStraight({
  score: 30,
  description: "30 points for a small straight"
});
export const largeStraight = new LargeStraight({
  score: 40,
  description: "40 points for a small straight"
});

// yahtzee scores as 50
export const yahtzee = new Yahtzee({
  score: 50,
  description: "50 points for yahtzee"
});

// for chance, can view as some of all dice, requiring at least 0 of a kind
export const chance = new SumDistro({
  count: 0,
  description: "Sum of all dice"
});
