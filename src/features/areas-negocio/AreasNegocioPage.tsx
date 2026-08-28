import { useState } from 'react'
import { File, Folder, FolderOpen, Plus, Save } from 'lucide-react'
import clsx from 'clsx'
import { Card } from '@/components/ui/Card'
import { useUIStore } from '@/store/uiStore'

interface TreeNode {
  label: string
  level: number
  icon: 'folder' | 'folder-open' | 'file'
}

const TREE: TreeNode[] = [
  { label: 'Dashboard', level: 1, icon: 'folder' },
  { label: 'Core Business', level: 1, icon: 'folder-open' },
  { label: 'Crédito', level: 2, icon: 'folder' },
  { label: 'Gestión', level: 3, icon: 'folder-open' },
  { label: 'Gestión G1', level: 4, icon: 'file' },
  { label: 'Gestión G2', level: 4, icon: 'file' },
  { label: 'Opciones Adicionales (Ejemplo N5)', level: 5, icon: 'file' },
  { label: 'Reportes', level: 3, icon: 'folder' },
  { label: 'Captaciones', level: 1, icon: 'folder' },
  { label: 'Configuración', level: 1, icon: 'folder-open' },
  { label: 'Seguridad', level: 2, icon: 'folder-open' },
  { label: 'Gestión', level: 3, icon: 'folder-open' },
  { label: 'Áreas de negocio', level: 4, icon: 'file' },
]

const PERFILES = [
  'Administrador del Sistema',
  'Gerente General',
  'Asesor de Crédito',
  'Cajero Principal',
  'Auditor Interno',
  'Analista de Riesgos',
]

const USUARIOS = [
  'Marlon Mansás (Admin)',
  'Velez Macias Hanner Alberto',
  'Rodriguez Perez Maria Elena',
  'Gomez Sanchez Carlos Andres',
  'Ortiz Gomez Laura Cristina',
  'Silva Rios David Felipe',
  'Mesa Toro Carolina',
]

const ICONS = {
  folder: Folder,
  'folder-open': FolderOpen,
  file: File,
}

/** Gestión de Áreas de Negocio y Accesos — reemplaza view-areas-negocio. */
export function AreasNegocioPage() {
  const showToast = useUIStore((s) => s.showToast)
  const [selectedNode, setSelectedNode] = useState('Core Business')
  const [accessTab, setAccessTab] = useState<'perfiles' | 'usuarios'>('perfiles')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 text-2xl font-bold text-brand-500">
          Gestión de Áreas de Negocio y Accesos
        </div>
        <div className="text-sm text-muted">
          Configure la estructura del menú (hasta 5 niveles) y asigne permisos por perfil o usuario.
        </div>
      </div>

      <div className="grid grid-cols-2 items-start gap-5">
        {/* Estructura del sistema */}
        <Card className="mb-0 flex flex-col p-5">
          <div className="mb-4 flex items-center justify-between border-b border-line pb-2.5">
            <h4 className="m-0 font-semibold text-ink">Estructura del Sistema</h4>
            <button
              onClick={() => showToast('Esta función abriría un modal para crear un nivel adicional en el árbol.')}
              className="flex items-center gap-1.5 rounded-md bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white"
            >
              <Plus className="size-3.5" /> Nuevo Nodo
            </button>
          </div>
          <div className="max-h-[500px] flex-1 overflow-y-auto pr-1.5">
            {TREE.map((node, i) => {
              const Icon = ICONS[node.icon]
              return (
                <button
                  key={i}
                  onClick={() => setSelectedNode(node.label)}
                  className={clsx(
                    'flex w-full items-center gap-2 py-1.5 text-left text-sm transition-colors',
                    selectedNode === node.label
                      ? 'rounded bg-active font-medium text-brand-500'
                      : 'text-ink hover:bg-hover',
                  )}
                  style={{ paddingLeft: `${node.level * 14}px` }}
                >
                  <Icon className={clsx('size-4 shrink-0', selectedNode === node.label ? 'text-brand-500' : 'text-muted')} />
                  {node.label}
                </button>
              )
            })}
          </div>
        </Card>

        {/* Control de accesos */}
        <Card className="mb-0 flex flex-col p-5">
          <div className="mb-4 border-b border-line pb-2.5">
            <h4 className="m-0 font-semibold text-ink">
              Accesos para: <span className="text-brand-500">{selectedNode}</span>
            </h4>
          </div>

          <div className="mb-4 flex gap-2.5 border-b border-line pb-0">
            <button
              onClick={() => setAccessTab('perfiles')}
              className={clsx(
                'border-b-2 pb-3 text-sm font-medium',
                accessTab === 'perfiles' ? 'border-brand-500 text-brand-500' : 'border-transparent text-muted',
              )}
            >
              Por Perfil
            </button>
            <button
              onClick={() => setAccessTab('usuarios')}
              className={clsx(
                'border-b-2 pb-3 text-sm font-medium',
                accessTab === 'usuarios' ? 'border-brand-500 text-brand-500' : 'border-transparent text-muted',
              )}
            >
              Por Usuario Individual
            </button>
          </div>

          {accessTab === 'perfiles' ? (
            <div className="flex flex-col gap-1.5">
              {PERFILES.map((p, i) => (
                <label key={p} className="flex cursor-pointer items-center gap-2 text-sm text-ink">
                  <input type="checkbox" defaultChecked={i < 3} className="size-4 accent-brand-500" />
                  {p}
                </label>
              ))}
            </div>
          ) : (
            <div>
              <input
                placeholder="Buscar usuario..."
                className="mb-4 w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-500"
              />
              <div className="flex max-h-[250px] flex-col gap-1.5 overflow-y-auto pr-2.5">
                {USUARIOS.map((u, i) => (
                  <label key={u} className="flex cursor-pointer items-center gap-2 text-sm text-ink">
                    <input type="checkbox" defaultChecked={i < 2} className="size-4 accent-brand-500" />
                    {u}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 border-t border-line pt-4 text-right">
            <button
              onClick={() => showToast('Permisos actualizados correctamente en base de datos')}
              className="flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
            >
              <Save className="size-4" /> Guardar Accesos
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}