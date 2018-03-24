
# Electronic Life
Following along with *Eloquent Javascript's* [project](https://eloquentjavascript.net/2nd_edition/07_elife.html). Attempting to translate to ES6 syntax.

## Animation:
Plants vs Herbivores:

<img src="https://media.giphy.com/media/U7LNVTF1tcsVJjkjBx/giphy.gif" width="600px">

## Results
Currently we're getting about 1 plant : 2 herbivore win rates (14:28). But now 28: 50. 31 : 55. 45: 86. 50: 91. 57: 98. 64: 109. Now let's clean up the checker function.

With a few more checkers, we have 20: 32, 24: 42, 28: 48, 31: 57.

(Hmm this is the opposite effect than I anticipated:)
(Well I suppose it's possible they both converge toward same amount. Will need to automate this.)
With all catcher, we have 9: 20, 13: 34, 20: 52, 25: 59, 28: 67, 35: 75, 39: 89

Ok now looking at the correct array: 10: 15, 15: 21, 21: 23, 25: 31, 30: 45, 37: 56, 42: 65, 47: 70, 54: 75, 62: 84, 70: 96. So we need to find the limit to which each of these series is converging.
