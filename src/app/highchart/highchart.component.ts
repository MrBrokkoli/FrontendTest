import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import DarkUnicaTheme from 'highcharts/themes/grid-light';
import { ChartColorEnum, ChartColorEnumToLabelMapping } from '../enums/ChartColorEnum';
import { ChartSensorEnum, ChartSensorEnumToLabelMapping } from '../enums/ChartSensorEnum';
import { ChartTypeEnum, ChartTypeEnumToLabelMapping } from '../enums/ChartTypeEnum';
import { ISerie } from '../interfaces/ISerie';
import { generateNumbers } from '../utils/generateNumbers';
DarkUnicaTheme(Highcharts);

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.css']
})
export class HighchartComponent {

  public startDate: Date | null;
  public endDate: Date | null;

  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: any;
  public needUpdate: boolean = false;
  private _series: ISerie[] = [];

  public types = Object.values(ChartTypeEnum);
  public selectedType: ChartTypeEnum = ChartTypeEnum.Line;
  public chartTypeEnumToLabelMapping = ChartTypeEnumToLabelMapping;

  public colors = Object.values(ChartColorEnum);
  public selectedColor: ChartColorEnum = ChartColorEnum.Default;
  public chartColorEnumToLabelMapping = ChartColorEnumToLabelMapping;

  public sensors = Object.values(ChartSensorEnum);
  public selectedSensor: ChartSensorEnum = ChartSensorEnum.Temperature;
  public chartSensorEnumToLabelMapping = ChartSensorEnumToLabelMapping;

  get visibleSeriesCount() : number {
    return this._series.filter(serie => serie.visible).length;
  }

  constructor() {

    this.endDate = new Date();    
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    this.startDate = startDate;

    this._series = this.getSeries();

    if (this._series.length > 0) {
      this._series[0].visible = true;
      this._series[0].color = ChartColorEnum.Default;
    }

    this.redraw();
  }

  private getSeries(): ISerie[] {

    var series: ISerie[] = [];

    Object.keys(ChartSensorEnum).forEach(key => {
      if (key === Object.keys(ChartSensorEnum)[Object.values(ChartSensorEnum).indexOf(ChartSensorEnum.All)]) return;
      series.push({
        name: key,
        data: generateNumbers(this.endDate?.getDate() ?? 0 - (this.startDate?.getDate() ?? 0) + 1),
        color: Object.values(ChartColorEnum)[Math.round(Math.random() * (Object.values(ChartColorEnum).length - 1))],
        pointStart: Date.UTC(this.startDate?.getFullYear() ?? 1970, this.startDate?.getMonth() ?? 1, this.startDate?.getDate() ?? 1),
        pointInterval: 3600 * 1000 * 24, // one day
        visible: false,
      });
    });

    return series;
  }

  public typeChanged(): void {

    this.redraw();
  }

  public colorChanged(): void {

    this._series.forEach(serie => {
      if (serie.visible) serie.color = this.selectedColor;
    });

    this.redraw();
  }

  public dateChanged(): void {

    if (this.endDate === null || this.startDate === null)
      return;

    this.updateData(this.startDate, this.endDate);

    this.redraw();
  }

  public sensorChanged(): void {

    if (this.selectedSensor === ChartSensorEnum.All) {
      this._series.forEach(serie => {
        serie.visible = true;
      });
    }
    else {
      this._series.forEach(serie => {
        if (serie.name === Object.keys(ChartSensorEnum)[Object.values(ChartSensorEnum).indexOf(this.selectedSensor)]) 
          serie.visible = true;
        else
          serie.visible = false;
      });
    }

    this.redraw();
  }

  private updateData(startDate: Date, endDate: Date): void {

    this._series.forEach(serie => {
      serie.data = generateNumbers(endDate.getDate() - startDate.getDate() + 1);
      serie.pointStart = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    });
  }

  private redraw(): void {

    if (this.endDate === null || this.startDate === null)
      return;

    this.chartOptions = {
      title: { 
        text: 'Chart'
      },
      xAxis: { 
        type: 'datetime'
      },
      chart: {
        type: this.selectedType
      },
      legend: {
        enabled: false
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Value'
        },
        labels: {
          overflow: 'justify'
        }
      },
      series: this._series,
    };

    this.needUpdate = true;
  }
}
