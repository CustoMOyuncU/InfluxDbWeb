import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mem } from '../models/mem';
import { ResponseModel } from '../models/responseModel';
import { Temperature } from '../models/temperature';

@Injectable({
  providedIn: 'root',
})
export class TemperatureService {
  private apiUrl = environment.baseUrl + 'infos/';
  private token =
    '-3nSWrR7Y4uGydYPn9o54y4Ve14CSNJK5nKZVZT-abV9ASNhxPxa8dC6fpJoaQrCrmqtT9HeW9MBgJQN3gEFww==';

  constructor(private httpClient: HttpClient) {}

  getTemperatureSettings(): Observable<Temperature[]> {
    return this.httpClient.get<Temperature[]>(this.apiUrl + 'gettemperature');
  }

  getTemperatureSettingsWithParam(a:string): Observable<Temperature[]> {
    return this.httpClient.get<Temperature[]>(this.apiUrl + 'gettemperature?time='+a);
  }

  addTemeratureProperties(mem: Mem): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'addtemperatureproperties',
      mem
    );
  }
  deleteTemperatureProperties(temperature: Temperature) {
    let start = new Date(temperature.start).toISOString();
    let stop = new Date(temperature.stop).toISOString();

    var perdicate = "from(bucket:\"lorawan_data\")\n"
    + "|> filter(fn: (r) => r[\"_measurement\"] == \""+temperature.measurement+"\")\n"
    console.log(perdicate)
    console.log({ start: start, stop: stop, perdicate: perdicate.toString() })
    const headers = new HttpHeaders()
      .set('Authorization', 'Token ' + this.token)
      .set('Content-Type', 'application/json');
      
    return this.httpClient.post('http://192.168.20.60:8086/api/v2/delete/?org=GrupArge&bucket=lorawan_data',
      { start: start, stop: stop, perdicate: perdicate.toString() },
      { headers: headers }
    );
  }
}
