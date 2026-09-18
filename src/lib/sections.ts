import { writingLive } from '../data/site';

export type SectionId = 'work' | 'skills' | 'projects' | 'writing' | 'shelf' | 'contact';

/**
 * Toda seção que a home conhece, na ordem em que aparece. Inserir ou remover
 * uma seção é mexer só nesta lista.
 */
const allSections: SectionId[] = ['work', 'skills', 'projects', 'writing', 'shelf', 'contact'];

/** As seções que a home monta de fato: `writing` só entra quando está no ar. */
export const sectionOrder: SectionId[] = allSections.filter(
  (id) => id !== 'writing' || writingLive
);

const pad = (position: number) => String(position).padStart(2, '0');

/**
 * O rótulo numérico da seção, com dois dígitos: `01`, `02`, ...
 *
 * Uma seção desligada por gate (hoje só `writing`) continua respondendo com o
 * número que teria no ar, para que renderizá-la isolada, como nos testes, não
 * quebre. Um id que não existe estoura, que é o caso de erro de digitação.
 */
export function sectionNum(id: SectionId): string {
  const visible = sectionOrder.indexOf(id);
  if (visible !== -1) {
    return pad(visible + 1);
  }
  const known = allSections.indexOf(id);
  if (known === -1) {
    throw new Error(`Seção fora de sectionOrder: ${id}`);
  }
  return pad(known + 1);
}
