export class CalculationUtils {
  static getPercentage(percentage, value) {
    if (!percentage || !value) return 0;
    percentage = Number(percentage);
    value = Number(value);
    return (percentage / 100) * value;
  }

  static addPercentage(percentage, value, tofixed = 2) {
    if (!percentage || !value) return 0;
    percentage = Number(percentage);
    value = Number(value);
    const result = ((percentage / 100) * value) + value;
    return result.toFixed(tofixed);
  }
}
