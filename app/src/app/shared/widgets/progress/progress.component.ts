import { Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements DoCheck {
  @Input() data = {
    count: 0,
    current: 0,
  };

  /**
   * Creates an instance of ProgressComponent.
   * @memberof ProgressComponent
   */
  constructor() { }

  /**
   * @memberof ProgressComponent
   */
  ngDoCheck() {
    this.getLength();
  }

  /**
   * @return {*}
   * @memberof ProgressComponent
   */
  getLength() {
    const C = this.data?.count;
    const CU = this.data?.current;
    const L: number = document.querySelector(
      '.progress__bar--count',
    )!.clientWidth;
    const PX = (CU / C) * L;

    return document
      .querySelector('.progress__bar--count-current')!
      .setAttribute('style', `width: ${PX}px`);
  }

  /**
   * @return {*}
   * @memberof ProgressComponent
   */
  getClass() {
    const C = this.data?.count;
    const CU = this.data?.current;

    let cl = 'grey';

    if (CU / C < 0.33) {
      cl = 'grey';
    } else if (CU / C > 0.33 && CU / C < 0.66) {
      cl = 'blue';
    } else {
      cl = 'green';
    }

    return cl;
  }
}
