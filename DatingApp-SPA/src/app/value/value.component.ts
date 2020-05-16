import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  baseUrl = 'http://localhost:5000/';
  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getValues();
  }

  getValues() {
    this.http.get(this.baseUrl + 'api/values').subscribe(
      response => {
        this.values = response;
      },
      error => {
        console.log(error);
      });
  }

}
