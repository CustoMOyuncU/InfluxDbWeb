import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Mem } from 'src/app/models/mem';
import { TemperatureService } from 'src/app/services/temperature.service';

@Component({
  selector: 'app-temperature-add',
  templateUrl: './temperature-add.component.html',
  styleUrls: ['./temperature-add.component.css'],
})
export class TemperatureAddComponent implements OnInit {
  influxAddForm: FormGroup;
  influxDeleteForm: FormGroup;
  mems:Mem[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private temperatureService: TemperatureService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createInfluxAddMemForm();
    this.createInfluxDeleteForm();
  }

  createInfluxAddMemForm() {
    this.influxAddForm = this.formBuilder.group({
      host: ['', Validators.required],
      measurement: ['', Validators.required],
      bucket: ['lorawan_data', Validators.required],
      org: ['GrupArge', Validators.required],
      usedPercent: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  createInfluxDeleteForm() {
    this.influxDeleteForm = this.formBuilder.group({
      start: ['', Validators.required],
      stop: ['', Validators.required],
      measurement: ['', Validators.required],
    });
  }

  addTemperatureProperty() {
    console.log(this.influxAddForm);
    if (this.influxAddForm.valid) {
      let influxAddModel = Object.assign({}, this.influxAddForm.value);
      this.temperatureService
        .addTemeratureProperty(influxAddModel)
        .subscribe((response) => {
          this.toastrService.success('Temperature Added', 'Success');
        });
    } else {
      this.toastrService.error('Formunuz Eksik', 'Hata');
    }
  }

  addRandomTemperaturePropertiesBackEnd(){
    this.toastrService.info("Processing...","System")
    this.temperatureService.addRandomTemeraturePropertiesBackEnd().subscribe(response=>{
      console.log(response)
      this.toastrService.success("Operation complete","Random Data Added")
    })
  }

  addRandomTemperatureProperties(){
    for (let i = 0; i < 5000; i++) {
      var mem = new Mem()
      mem.bucket="lorawan_data"
      mem.org="GrupArge"
      mem.host="host3"
      mem.measurement="test_temperature"

      mem.usedPercent=Math.random() * (25-20+1)+20
      let nmbr= mem.usedPercent.toFixed(1)
      mem.usedPercent = Number(nmbr)
      //console.log(mem.usedPercent)

      mem.time = new Date()
      let startDate= new Date()
      let endNmbrDate ,startNmbrDate

      endNmbrDate = startDate.setMonth(mem.time.getMonth()+2)
      startNmbrDate = startDate.setMonth(mem.time.getMonth()+1)

      let randomTime = (startNmbrDate + Math.random() * (endNmbrDate - startNmbrDate))
      mem.time= new Date(randomTime)

      
      this.mems.push(mem)

      
    }
    this.temperatureService.addTemeratureProperties(this.mems).subscribe(response=>{
      this.toastrService.success("All random data added","Data Added")
    })
    //console.log(this.mems)
  }

  deleteTemperatureProperty(){
    
    console.log(this.influxDeleteForm)
    if (this.influxDeleteForm.valid) {
      let influxDeleteModel = Object.assign({}, this.influxDeleteForm.value);

      if (influxDeleteModel.stop < influxDeleteModel.start) {
        this.toastrService.error('Check your date', 'Date Error');
        return;
      }
      
      this.temperatureService.deleteTemperatureProperties(influxDeleteModel).subscribe(response=>{
        this.toastrService.info("Data between dates has been deleted","System")
      },responseError=>{
        this.toastrService.error("Check your date","Date Error")
      })
      
    }else{
      this.toastrService.error("Form is missing","Error")
    }
  }

  /* deleteTemperetureProp(){
    if (this.influxDeleteForm.valid) {
      let influxDeleteModel = Object.assign({}, this.influxDeleteForm.value);

      if (influxDeleteModel.stop < influxDeleteModel.start) {
        this.toastrService.error('Check your date', 'Date Error');
        return;
      }
      
      this.temperatureService.deleteTemperatureProperty(influxDeleteModel).subscribe(response=>{
        this.toastrService.info("Data between dates has been deleted","System")
      },responseError=>{
        this.toastrService.error("Check your date","Date Error")
      })
      
    }else{
      this.toastrService.error("Form is missing","Error")
    }
  } */
}
