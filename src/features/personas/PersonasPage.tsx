import { useState } from 'react';
import PersonaList from './components/PersonaList';
import PersonaDetail from './components/PersonaDetail';

const PersonasPage: React.FC = () => {
  const [vista, setVista] = useState<'listado' | 'detalle'>('listado');
  const [personaSeleccionadaId, setPersonaSeleccionadaId] = useState<number | null>(null);

  const handleVerDetalle = (id: number) => {
    setPersonaSeleccionadaId(id);
    setVista('detalle');
  };

  const handleVolver = () => {
    setVista('listado');
    setPersonaSeleccionadaId(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Personas</h1>
        <p className="text-sm text-gray-600 mt-1">
          Gestión centralizada de personas naturales y jurídicas
        </p>
      </div>

      {vista === 'listado' ? (
        <PersonaList onVerDetalle={handleVerDetalle} />
      ) : (
        personaSeleccionadaId && (
          <PersonaDetail
            personaId={personaSeleccionadaId}
            onVolver={handleVolver}
          />
        )
      )}
    </div>
  );
};

export default PersonasPage;