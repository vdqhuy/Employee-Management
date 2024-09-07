export function addMoreZeroBeforNumber(number_of_zero, current_value) {
    let zeroString = '';
    for(let i = 0; i < number_of_zero; i++) {
        zeroString += '0';
    }
    return (zeroString + current_value).slice(-number_of_zero);
}