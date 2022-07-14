import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public startDate: string = "";
  public endDate: string = "";
  public numberOfHighcharts = 1;

  constructor() { }

  ngOnInit(): void {
  }
}
