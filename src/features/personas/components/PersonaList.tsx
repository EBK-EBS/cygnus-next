import { useState, useEffect, useRef, useCallback } from 'react';
import type { Persona, BusquedaPersona, TipoPersona } from '../types';
import { personaService } from '../services/personaService';

interface PersonaListProps {
  onVerDetalle: (id: number) => void;
}

const DEBOUNCE_MS = 300;

const PersonaList: React.FC<PersonaListProps> = ({ onVerDetalle }) => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState<BusquedaPersona>({ termino: '', tipoPersona: 'TODOS' });
  const [resultadosCount, setResultadosCount] = useState(0);

  const [terminoInput, setTerminoInput] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(false);

  const ejecutarBusqueda = async (busquedaParam: BusquedaPersona, mostrarLoading: boolean) => {
    try {
      if (mostrarLoading) setLoading(true);
      setError(null);
      const data = await personaService.listarPersonas(busquedaParam);
      setPersonas(data);
      setResultadosCount(data.length);
    } catch {
      setError('Error al cargar las personas. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    ejecutarBusqueda(busqueda, true);
    mountedRef.current = true;
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Búsqueda cuando cambia término (debounced) o tipoPersona — después del mount
  useEffect(() => {
    if (!mountedRef.current) return;
    ejecutarBusqueda(busqueda, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda.termino, busqueda.tipoPersona]);

  const handleTerminoChange = useCallback((value: string) => {
    setTerminoInput(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setBusqueda(prev => ({ ...prev, termino: value }));
    }, DEBOUNCE_MS);
  }, []);

  const handleTipoPersonaChange = useCallback((value: TipoPersona | 'TODOS') => {
    setBusqueda(prev => ({ ...prev, tipoPersona: value }));
  }, []);

  const limpiarBusqueda = useCallback(() => {
    setTerminoInput('');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setBusqueda({ termino: '', tipoPersona: 'TODOS' });
  }, []);

  const getNombrePersona = (persona: Persona): string => {
    if (persona.tipoPersona === 'NATURAL') {
      return `${persona.primerNombre} ${persona.segundoNombre || ''} ${persona.primerApellido} ${persona.segundoApellido || ''}`.trim();
    }
    return persona.razonSocial;
  };

  const getIdentificacionPrincipal = (persona: Persona): string => {
    const principal = persona.identificaciones.find(i => i.esPrincipal);
    if (!principal) return 'N/D';
    return `${principal.tipoIdentificacion}: ${principal.numeroIdentificacion}`;
  };

  const getBadgeTipo = (tipo: TipoPersona) => {
    return tipo === 'NATURAL'
      ? <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Natural</span>
      : <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">Jurídica</span>;
  };

  const getBadgeEstado = (estado: string) => {
    const estilos: Record<string, string> = {
      'ACTIVO': 'bg-green-100 text-green-800',
      'INACTIVO': 'bg-gray-100 text-gray-600',
      'PENDIENTE': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${estilos[estado] || 'bg-gray-100 text-gray-600'}`}>{estado}</span>;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1b4d3e]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-700 mb-3">{error}</p>
        <button
          onClick={() => ejecutarBusqueda(busqueda, true)}
          className="px-4 py-2 bg-[#1b4d3e] text-white rounded-md hover:bg-[#20a05a] transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Buscador */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <input
            type="text"
            placeholder="Buscar por nombre o identificación..."
            value={terminoInput}
            onChange={(e) => handleTerminoChange(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b4d3e]"
          />
          <select
            value={busqueda.tipoPersona}
            onChange={(e) => handleTipoPersonaChange(e.target.value as TipoPersona | 'TODOS')}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b4d3e] bg-white"
          >
            <option value="TODOS">Todos los tipos</option>
            <option value="NATURAL">Natural</option>
            <option value="JURIDICA">Jurídica</option>
          </select>
        </div>
        {(terminoInput || busqueda.tipoPersona !== 'TODOS') && (
          <button
            onClick={limpiarBusqueda}
            className="text-sm text-gray-600 hover:text-[#1b4d3e]"
          >
            Limpiar búsqueda
          </button>
        )}
      </div>

      {/* Resultados */}
      <div className="text-sm text-gray-600">
        {resultadosCount > 0
          ? `Se encontraron ${resultadosCount} persona${resultadosCount !== 1 ? 's' : ''}`
          : 'No se encontraron personas que coincidan con la búsqueda'}
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Identificación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Registro</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {personas.map((persona) => (
              <tr key={persona.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {getNombrePersona(persona)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getIdentificacionPrincipal(persona)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getBadgeTipo(persona.tipoPersona)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getBadgeEstado(persona.estado)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(persona.fechaRegistro).toLocaleDateString('es-CO')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onVerDetalle(persona.id)}
                    className="text-[#1b4d3e] hover:text-[#20a05a] transition-colors"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
            {personas.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No se encontraron personas que coincidan con la búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonaList;