import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TemperatureService } from 'src/app/services/temperature.service';

@Component({
  selector: 'app-temperature-add',
  templateUrl: './temperature-add.component.html',
  styleUrls: ['./temperature-add.component.css'],
})
export class TemperatureAddComponent implements OnInit {
  influxAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private temperatureService: TemperatureService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createInfluxAddMemForm();
  }

  createInfluxAddMemForm() {
    this.influxAddForm = this.formBuilder.group({
      host: ['', Validators.required],
      measurement:["",Validators.required],
      bucket: ['lorawan_data', Validators.required],
      org: ['GrupArge', Validators.required],
      usedPercent: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  addTemperatureProperty() {
    console.log(this.influxAddForm);
    if (this.influxAddForm.valid) {
      let influxAddModel = Object.assign({}, this.influxAddForm.value);
      this.temperatureService
        .addTemeratureProperties(influxAddModel)
        .subscribe((response) => {
          this.toastrService.success('Temperature Added', 'Success');
        });
    } else {
      this.toastrService.error('Formunuz Eksik', 'Hata');
    }
  }
}
