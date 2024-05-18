import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';


import { environment } from '../../../environments/environment.development';
import { ServerRespEntity } from '../interfaces/server-resp.interface';
import { Entity } from '../interfaces/entity.interface';

@Injectable({
  providedIn: 'root'
})
export class EntitesService {

  private http = inject(HttpClient)
  
  private url: string = `${environment.baseUrl}/entity`
  private token!: string;

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': this.token
    });
  }

  constructor() {
    const data = localStorage.getItem('token')
    if (data) this.token = data
  }

  getAllEntities(): Observable<Entity[]>{
    return this.http.get<ServerRespEntity>(this.url)
      .pipe(map(response => response.data));
  }

  getEntityById( entity_id: string ): Observable<Entity[]>{
    return this.http.get<ServerRespEntity>(`${this.url}/${entity_id}`)
      .pipe(map(response => response.data));
  }

  saveEntity(entity: object): Observable<ServerRespEntity> {
    return this.http.post<ServerRespEntity>(this.url, entity);
  }

  editEntity(entity: object): Observable<ServerRespEntity> {
    return this.http.put<ServerRespEntity>(this.url, entity);
  }
  
  deleteEntityById(id: string): Observable<boolean> {
    console.log(id);
    return this.http.delete<ServerRespEntity>(`${this.url}/${id}`)
      .pipe(map(response => response.success === true));
  }

}