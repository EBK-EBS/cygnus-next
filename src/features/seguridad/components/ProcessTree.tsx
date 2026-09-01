import { Folder, FolderOpen, FolderPlus, Lock, Pencil, Trash2 } from 'lucide-react'
import clsx from 'clsx'
import type { ProcesoNode } from '../types'

interface ProcessTreeProps {
  tree: ProcesoNode[]
  selectedCodigo?: number
  onSelect: (node: ProcesoNode) => void
  onAddChild: (node: ProcesoNode | null) => void
  onEdit: (node: ProcesoNode) => void
  onDelete: (node: ProcesoNode) => void
}

function TreeRow({
  node,
  depth,
  selectedCodigo,
  onSelect,
  onAddChild,
  onEdit,
  onDelete,
}: {
  node: ProcesoNode
  depth: number
} & Omit<ProcessTreeProps, 'tree'>) {
  const selected = selectedCodigo === node.codigo
  const Icon = node.hijos.length > 0 ? FolderOpen : Folder

  return (
    <>
      <div
        onClick={() => onSelect(node)}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        className={clsx(
          'group flex cursor-pointer items-center justify-between gap-2 rounded py-1.5 pr-2 text-sm transition-colors',
          selected ? 'bg-active font-medium text-brand-500' : 'text-ink hover:bg-hover',
        )}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Icon className={clsx('size-4 shrink-0', selected ? 'text-brand-500' : 'text-muted')} />
          <span className="truncate">{node.nombre}</span>
          {node.requiereClave && <Lock className="size-3 shrink-0 text-warning" />}
        </span>
        <span className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            title="Nueva carpeta hija"
            onClick={(e) => {
              e.stopPropagation()
              onAddChild(node)
            }}
            className="rounded p-1 text-muted hover:bg-hover hover:text-brand-500"
          >
            <FolderPlus className="size-3.5" />
          </button>
          <button
            type="button"
            title="Editar carpeta"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(node)
            }}
            className="rounded p-1 text-muted hover:bg-hover hover:text-brand-500"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            type="button"
            title="Eliminar carpeta (y su contenido)"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(node)
            }}
            className="rounded p-1 text-muted hover:bg-hover hover:text-danger"
          >
            <Trash2 className="size-3.5" />
          </button>
        </span>
      </div>
      {node.hijos.map((hijo) => (
        <TreeRow
          key={hijo.codigo}
          node={hijo}
          depth={depth + 1}
          selectedCodigo={selectedCodigo}
          onSelect={onSelect}
          onAddChild={onAddChild}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  )
}

/** Árbol de procesos (carpetas de menú) de un perfil. */
export function ProcessTree({ tree, selectedCodigo, onSelect, onAddChild, onEdit, onDelete }: ProcessTreeProps) {
  if (tree.length === 0) {
    return <div className="py-8 text-center text-sm text-muted">Este perfil todavía no tiene procesos. Cree el primero con "Nueva Carpeta".</div>
  }

  return (
    <div className="flex max-h-[500px] flex-col gap-0.5 overflow-y-auto pr-1">
      {tree.map((node) => (
        <TreeRow
          key={node.codigo}
          node={node}
          depth={0}
          selectedCodigo={selectedCodigo}
          onSelect={onSelect}
          onAddChild={onAddChild}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
