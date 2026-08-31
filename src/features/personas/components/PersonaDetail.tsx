import { useState, useEffect } from 'react';
import type { Persona } from '../types';
import { personaService } from '../services/personaService';

interface PersonaDetailProps {
  personaId: number;
  onVolver: () => void;
}

const PersonaDetail: React.FC<PersonaDetailProps> = ({ personaId, onVolver }) => {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        setLoading(true);
        const data = await personaService.obtenerPersonaPorId(personaId);
        if (!data) {
          setError('No se encontró la persona solicitada.');
        } else {
          setPersona(data);
        }
      } catch (err) {
        setError('Error al cargar el detalle de la persona.');
      } finally {
        setLoading(false);
      }
    };
    cargarDetalle();
  }, [personaId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1b4d3e]"></div>
      </div>
    );
  }

  if (error || !persona) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700 mb-3">{error || 'Persona no encontrada'}</p>
        <button
          onClick={onVolver}
          className="px-4 py-2 bg-[#1b4d3e] text-white rounded-md hover:bg-[#20a05a] transition-colors"
        >
          Volver al listado
        </button>
      </div>
    );
  }

  const identificacionPrincipal = persona.identificaciones.find(i => i.esPrincipal);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onVolver}
          className="text-sm text-gray-600 hover:text-[#1b4d3e] flex items-center gap-2"
        >
          <i className="fas fa-arrow-left"></i> Volver al listado
        </button>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
          persona.estado === 'ACTIVO' ? 'bg-green-100 text-green-800' :
          persona.estado === 'INACTIVO' ? 'bg-gray-100 text-gray-600' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {persona.estado}
        </span>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-[#1b4d3e] px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            {persona.tipoPersona === 'NATURAL'
              ? `${persona.primerNombre} ${persona.segundoNombre || ''} ${persona.primerApellido} ${persona.segundoApellido || ''}`.trim()
              : persona.razonSocial}
          </h2>
          <p className="text-sm text-white/80">
            {persona.tipoPersona === 'NATURAL' ? 'Persona Natural' : 'Persona Jurídica'}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Identificación */}
          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Identificación</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Tipo</label>
                <p className="text-sm font-medium">{identificacionPrincipal?.tipoIdentificacion || 'N/D'}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Número</label>
                <p className="text-sm font-medium">{identificacionPrincipal?.numeroIdentificacion || 'N/D'}</p>
              </div>
              {identificacionPrincipal?.lugarExpedicion && (
                <div>
                  <label className="text-xs text-gray-500">Lugar de expedición</label>
                  <p className="text-sm font-medium">{identificacionPrincipal.lugarExpedicion}</p>
                </div>
              )}
            </div>
          </section>

          {/* Datos específicos por tipo */}
          {persona.tipoPersona === 'NATURAL' ? (
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Fecha de nacimiento</label>
                  <p className="text-sm font-medium">
                    {persona.fechaNacimiento ? new Date(persona.fechaNacimiento).toLocaleDateString('es-CO') : 'N/D'}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Género</label>
                  <p className="text-sm font-medium">{persona.genero || 'N/D'}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Estado civil</label>
                  <p className="text-sm font-medium">{persona.estadoCivil || 'N/D'}</p>
                </div>
              </div>
            </section>
          ) : (
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Información Corporativa</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Nombre comercial</label>
                  <p className="text-sm font-medium">{persona.nombreComercial || 'N/D'}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Fecha de constitución</label>
                  <p className="text-sm font-medium">
                    {persona.fechaConstitucion ? new Date(persona.fechaConstitucion).toLocaleDateString('es-CO') : 'N/D'}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Tipo de sociedad</label>
                  <p className="text-sm font-medium">{persona.tipoSociedad || 'N/D'}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Actividad económica</label>
                  <p className="text-sm font-medium">{persona.actividadEconomica || 'N/D'}</p>
                </div>
              </div>
            </section>
          )}

          {/* Contacto */}
          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-500">Teléfono</label>
                <p className="text-sm font-medium">
                  {persona.tipoPersona === 'NATURAL' ? persona.telefonoMovil : persona.telefonoContacto}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Correo electrónico</label>
                <p className="text-sm font-medium">
                  {persona.tipoPersona === 'NATURAL' ? persona.correoElectronico : persona.correoContacto}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Dirección</label>
                <p className="text-sm font-medium">
                  {persona.tipoPersona === 'NATURAL' ? persona.direccion : persona.direccionNotificacion}
                </p>
              </div>
            </div>
          </section>

          {/* Información del registro */}
          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Información del Registro</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Fecha de registro</label>
                <p className="text-sm font-medium">
                  {new Date(persona.fechaRegistro).toLocaleString('es-CO')}
                </p>
              </div>
              {persona.fechaActualizacion && (
                <div>
                  <label className="text-xs text-gray-500">Última actualización</label>
                  <p className="text-sm font-medium">
                    {new Date(persona.fechaActualizacion).toLocaleString('es-CO')}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PersonaDetail;