import { getAlertColor } from './helper';

class summaryModalParent {
  constructor(stats, palette, labels) {
    this.data = Object.values(stats);
    this.backgroundColor = this.getChartColors(labels, palette, 'light');
    this.borderWidth = 5;
    this.hoverBackgroundColor = this.getChartColors(labels, palette, 'dark');
  }

  getChartColors(labels, pallette, tone) {
    return labels.map((label) => pallette[getAlertColor(label)][tone]);
  }
}

export default class ChartData {
  constructor({ attributes: { stats } }, { palette }) {
    this.stats = stats;
    this.labels = Object.keys(stats);
    this.datasets = [new summaryModalParent(stats, palette, this.labels)];
  }
  get isThreatDetected() {
    return this.stats['malicious'] + this.stats['suspicious'] > 0;
  }
}
