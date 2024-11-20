import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kisiler } from './kisiler.model'; 

@Injectable({
  providedIn: 'root'
})
export class KisilerService {
  private apiUrl = 'http://localhost:29242/api/kisiler'; 

  listKisiler: Kisiler[] = [];
  kisilerData: Kisiler = new Kisiler(); 

  constructor(private http: HttpClient) { }

  addKisi() {
    return this.http.post(this.apiUrl, this.kisilerData);
  }

  updateKisi() {
    return this.http.put(`${this.apiUrl}/${this.kisilerData.id}`, this.kisilerData);
  }

  getKisiler(): Observable<Kisiler[]> {
    return this.http.get<Kisiler[]>(this.apiUrl);
  }

  getKisi(id: number): Observable<Kisiler> {
    return this.http.get<Kisiler>(`${this.apiUrl}/${id}`);
  }

  deleteKisi(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
