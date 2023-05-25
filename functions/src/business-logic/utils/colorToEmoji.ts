export const colorToEmoji = (color: string) => {
    if (color.toUpperCase() == 'GREEN') {
        return '🟢';
    } else if (color.toUpperCase() == 'YELLOW') {
        return '🟡';
    } else if (color.toUpperCase() == 'RED') {
        return '🔴';
    }
    return '';
}