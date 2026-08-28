import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import type { NavLeaf, NavNode } from './navigation'
import { NAV_TREE } from './navigation'
import { useUIStore } from '@/store/uiStore'

interface SidebarProps {
  mini: boolean
}

interface LeafProps {
  leaf: NavLeaf
  depth: number
  mini: boolean
}

interface NodeProps {
  node: NavNode
  depth: number
  mini: boolean
}

/** Nodo hoja: navega a una ruta o abre la vista de construcción. */
function Leaf({ leaf, depth, mini }: LeafProps) {
  const navigate = useNavigate()
  const showToast = useUIStore((s) => s.showToast)

  const paddingLeft = 12 + depth * 15

  const handleClick = () => {
    if (leaf.route === 'construccion' || leaf.construccion) {
      navigate(`/construccion/${encodeURIComponent(leaf.construccion ?? '')}`)
    } else if (leaf.route) {
      navigate(`/${leaf.route}${leaf.subview ? `/${leaf.subview}` : ''}`)
    } else {
      showToast('Función en construcción')
    }
  }

  if (mini) return null

  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center gap-2.5 py-2.5 text-left text-[0.8rem] text-ink transition-colors hover:bg-hover"
      style={{ paddingLeft: `${paddingLeft}px`, paddingRight: '20px' }}
    >
      {leaf.icon && <leaf.icon className="size-4 shrink-0 text-muted" />}
      <span>{leaf.label}</span>
    </button>
  )
}

/** Nodo rama: colapsable recursivamente. */
function Node({ node, depth, mini }: NodeProps) {
  const [open, setOpen] = useState(node.open ?? false)
  const navigate = useNavigate()
  const showToast = useUIStore((s) => s.showToast)

  const paddingLeft = 12 + depth * 15

  // Nodo con hijos: rama colapsable
  if (node.children.length > 0) {

    // Rama "carpeta" (Dashboard, Core Business...) sin ruta propia
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-2.5 py-2.5 text-left text-[0.85rem] text-ink transition-colors hover:bg-hover"
          style={{ paddingLeft: `${paddingLeft}px`, paddingRight: '20px' }}
          title={node.label}
        >
          {node.icon && <node.icon className="size-4 shrink-0 text-muted" />}
          {!mini && <span className="flex-1 truncate">{node.label}</span>}
          {!mini && (
            <ChevronDown
              className={clsx('size-3 shrink-0 text-muted transition-transform', open && 'rotate-180')}
            />
          )}
        </button>
        {(!mini || open) && (
          <div className={clsx(!mini && open && 'block')}>
            {node.children.map((child, i) =>
              'children' in child ? (
                <Node key={i} node={child} depth={depth + 1} mini={mini} />
              ) : (
                <Leaf key={i} leaf={child} depth={depth + 1} mini={mini} />
              ),
            )}
          </div>
        )}
      </div>
    )
  }

  // Nodo con una única hoja: atajo directo
  const leaf = node.children[0] as NavLeaf
  const handleClick = () => {
    if (leaf.route === 'construccion' || leaf.construccion) {
      navigate(`/construccion/${encodeURIComponent(leaf.construccion ?? '')}`)
    } else if (leaf.route) {
      navigate(`/${leaf.route}${leaf.subview ? `/${leaf.subview}` : ''}`)
    } else {
      showToast('Función en construcción')
    }
  }

  if (mini) return null

  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center gap-2.5 py-2.5 text-left text-[0.85rem] text-ink transition-colors hover:bg-hover"
      style={{ paddingLeft: `${paddingLeft}px`, paddingRight: '20px' }}
    >
      {node.icon && <node.icon className="size-4 shrink-0 text-muted" />}
      <span className="truncate">{leaf.label}</span>
    </button>
  )
}

/** Sidebar izquierdo con menú de 4 niveles renderizado desde NAV_TREE. */
export function Sidebar({ mini }: SidebarProps) {
  return (
    <aside
      className={clsx(
        'flex shrink-0 flex-col overflow-y-auto overflow-x-hidden border-r border-line bg-card transition-[width] duration-300',
        mini ? 'w-[60px]' : 'w-[240px]',
      )}
    >
      {mini ? (
        <div className="flex flex-col items-center py-3 text-muted">
          {NAV_TREE.map((node, i) =>
            node.icon ? <node.icon key={i} className="mb-4 size-5" /> : null,
          )}
        </div>
      ) : (
        NAV_TREE.map((node, i) => <Node key={i} node={node} depth={0} mini={false} />)
      )}
    </aside>
  )
}