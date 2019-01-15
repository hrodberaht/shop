import applyRounded from './applyRounded';

const parseToRoundedAmount = value => (value ? +applyRounded(+value) : 0);

export default parseToRoundedAmount;
