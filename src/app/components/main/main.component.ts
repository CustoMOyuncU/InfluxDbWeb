import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Temperature } from 'src/app/models/temperature';
import { TemperatureService } from 'src/app/services/temperature.service';
declare var getsth:any
declare var startsth:any

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  temperatures:Temperature[]
  number:number[]=[]
  

  constructor(
    private toastrService: ToastrService,
    private temperatureService: TemperatureService
  ) {}

  ngOnInit(): void {
    this.getTemperatureProperties()
    console.log(document.getElementById("tableOfTemperature"))
  }



  startsth(){
    new startsth(this.temperatures)
  }

  getTemperatureProperties() {
    this.temperatureService.getTemperatureSettings().subscribe((response) => {
      this.temperatures = response;
      this.toastrService.info("Data get complete","Data Arrived")
      
      startsth(this.temperatures)
    },responseError=>{
      this.toastrService.error("Data get unsuccessful","Error")
    });
  }
}
