import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe.each(['01-01', '03-01'])('%s teacher guidance', (unitId) => {
  it('states pilot privacy, file handling, research-use conditions, and the lower bound of AI-open logs', () => {
    const guide = readFileSync(resolve(process.cwd(), `content/book/${unitId}/teacher.md`), 'utf8');

    expect(guide).toMatch(/실명 대신.*별칭/);
    expect(guide).toMatch(/결과 파일에는 질문 이력과 외부 AI 링크를 연 시각/);
    expect(guide).toMatch(/교사 피드백 파일에는 질문.*코멘트/);
    expect(guide).toMatch(/수업이 끝나면.*파일을 삭제/);
    expect(guide).toMatch(/연구 계획.*동의 절차.*기관 심의/);
    expect(guide).toMatch(/가운데 클릭.*새 탭.*기록되지 않을 수/);
    expect(guide).toMatch(/실제 링크 열기의 하한/);
  });
});
