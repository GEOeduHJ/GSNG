/** Minimal markdown (headings, bullets, paragraphs) rendered as React elements — no HTML injection. */
export function renderMarkdown(text) {
  const blocks = [];
  let list = null;
  let paragraph = [];
  const flushParagraph = () => {
    if (paragraph.length) blocks.push(<p key={`p-${blocks.length}`}>{paragraph.join(' ')}</p>);
    paragraph = [];
  };
  const flushList = () => {
    if (list) blocks.push(<ul key={`ul-${blocks.length}`}>{list.map((item, index) => <li key={index}>{item}</li>)}</ul>);
    list = null;
  };
  for (const raw of String(text ?? '').split(/\r?\n/)) {
    const line = raw.trim();
    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      flushParagraph(); flushList();
      const Tag = heading[1].length === 1 ? 'h2' : 'h3';
      blocks.push(<Tag key={`h-${blocks.length}`}>{heading[2]}</Tag>);
    } else if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      (list ??= []).push(line.replace(/^[-*]\s+/, ''));
    } else if (!line) {
      flushParagraph(); flushList();
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph(); flushList();
  return blocks;
}

export default function TeacherGuide({ text }) {
  if (!text) return <p className="hint">이 중단원의 교사용 안내는 아직 없습니다.</p>;
  return <div className="teacher-guide">{renderMarkdown(text)}</div>;
}
