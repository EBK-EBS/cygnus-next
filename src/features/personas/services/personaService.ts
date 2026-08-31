import type { Persona, BusquedaPersona } from '../types';
import mockPersonas from '../data/mockData';

// Capa de acceso a datos desacoplada
// TODO: Reemplazar por llamadas HTTP al backend cuando esté disponible
class PersonaService {
  private personas: Persona[] = [...mockPersonas];

  async listarPersonas(busqueda?: BusquedaPersona): Promise<Persona[]> {
    // Simular latencia de red
    await this.delay(300);

    if (!busqueda || (!busqueda.termino && (!busqueda.tipoPersona || busqueda.tipoPersona === 'TODOS'))) {
      return this.personas;
    }

    let resultados = [...this.personas];

    // Filtro por tipo
    if (busqueda.tipoPersona && busqueda.tipoPersona !== 'TODOS') {
      resultados = resultados.filter(p => p.tipoPersona === busqueda.tipoPersona);
    }

    // Filtro por término
    if (busqueda.termino && busqueda.termino.trim()) {
      const termino = busqueda.termino.trim().toLowerCase();
      resultados = resultados.filter(p => {
        // Buscar en nombre legal
        const nombreLegal = p.tipoPersona === 'NATURAL'
          ? `${p.primerNombre} ${p.segundoNombre || ''} ${p.primerApellido} ${p.segundoApellido || ''}`
          : p.razonSocial;

        // Buscar en identificaciones
        const identificaciones = p.identificaciones
          .map(i => i.numeroIdentificacion)
          .join(' ');

        return nombreLegal.toLowerCase().includes(termino) ||
               identificaciones.toLowerCase().includes(termino);
      });
    }

    return resultados;
  }

  async obtenerPersonaPorId(id: number): Promise<Persona | undefined> {
    await this.delay(200);
    return this.personas.find(p => p.id === id);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const personaService = new PersonaService();