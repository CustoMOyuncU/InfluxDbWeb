import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Temperature } from 'src/app/models/temperature';
import { TemperatureService } from 'src/app/services/temperature.service';
declare var startsth:any

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  temperatures:Temperature[]
  number:number[]=[]
  filterText:string
  dataTableSpinner:boolean = true
  dashboardSpinner:boolean = true

  constructor(
    private toastrService: ToastrService,
    private temperatureService: TemperatureService
  ) {}

  ngOnInit(): void {
    this.getTemperatureProperties()
  }

  startsth(){
    new startsth(this.temperatures)
  }

  getTemperatureProperties() {
    this.temperatureService.getTemperatureSettings().subscribe((response) => {
      this.temperatures = response;
      this.toastrService.info("Data get complete ("+this.temperatures.length+")","Data Arrived")
      this.dataTableSpinner=false
      
      if (this.temperatures.length>=100) {
        this.toastrService.info("Could not fetch Dashboard because there is too much data","Dashboard Cannot Get")
        this.dashboardSpinner=false
        document.getElementById("lineChart").remove()
      }else{
        startsth(this.temperatures)
        this.dashboardSpinner=false
      }
      
      
    },responseError=>{
      this.toastrService.error("Data get unsuccessful","Error")
    });
  }
}
