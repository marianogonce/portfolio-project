import { Injectable } from '@angular/core';

export interface proyectType {
  projectId: string,
  tituloProyecto: string,
  descripcion: string,
  imagenUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  listaDeProyectos : proyectType[] = [
    {projectId: "1",
      tituloProyecto: "Primer Proyecto", 
    descripcion: "Este es mi primer proyecto", 
    imagenUrl: "../../assets/img/imagen-portada.jpeg"
  },
  {
    projectId: "2",
    tituloProyecto: "Segundo Proyecto", 
    descripcion: "Este es mi segundo proyecto", 
    imagenUrl: "../../assets/img/imagen-portada.jpeg"
  }, 
  {projectId: "3",
  tituloProyecto: "Tercer Proyecto", 
  descripcion: "Este es mi tercer proyecto", 
  imagenUrl: "../../assets/img/imagen-portada.jpeg"
},
{projectId: "4",
tituloProyecto: "Cuarto Proyecto", 
descripcion: "Este es mi cuarto proyecto", 
imagenUrl: "../../assets/img/imagen-portada.jpeg"
}, 
{projectId: "5",
tituloProyecto: "Quinto Proyecto", 
descripcion: "Este es mi quinto proyecto", 
imagenUrl: "../../assets/img/imagen-portada.jpeg"
},
{projectId: "6",
tituloProyecto: "Sexto Proyecto", 
descripcion: "Este es mi sexto proyecto", 
imagenUrl: "../../assets/img/imagen-portada.jpeg"
}
]
  
  getProyectos() {
    return this.listaDeProyectos; 
  }

  getProyectoById(id:string) {
    return this.listaDeProyectos[this.giveIndex(id)]; 
  }

  giveIndex(id:string) {
    return this.listaDeProyectos.map(proyecto =>proyecto.projectId).indexOf(id);
  }

  constructor() { }
}
