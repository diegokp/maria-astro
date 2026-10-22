// Marcado mínimo para destacar los puntos clave de un texto plano (p. ej. el
// `description` de un servicio, que es frontmatter y no admite HTML):
// `**texto**` → <span class="highlight">texto</span>. En el cuerpo markdown se
// escribe directamente el <span class="highlight">.
const MARK = /\*\*(.+?)\*\*/g;

const escapeHtml = (text: string) =>
	text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** HTML seguro con los `**…**` convertidos en destacados. Úsalo con `set:html`. */
export const highlightHtml = (text: string) =>
	escapeHtml(text).replace(MARK, '<span class="highlight">$1</span>');

/** Texto plano sin marcas, para donde no se destaca (p. ej. las tarjetas). */
export const stripHighlight = (text: string) => text.replace(MARK, '$1');
