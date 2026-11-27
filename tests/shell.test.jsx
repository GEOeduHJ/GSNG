import { describe, expect, it, beforeEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { parseRoute } from '../src/book/router.js';
import App from '../src/book/App.jsx';
import { makeBook, memoryStorage, throwingStorage } from './fixtures/book.js';

describe('parseRoute', () => {
  it.each([
    ['', { name: 'toc' }],
    ['#/', { name: 'toc' }],
    ['#/u/01-01/open', { name: 'open', unitId: '01-01' }],
    ['#/u/01-01/l/2', { name: 'lesson', unitId: '01-01', index: 2 }],
    ['#/u/01-01/close', { name: 'close', unitId: '01-01' }],
    ['#/teacher', { name: 'teacher' }],
    ['#/teacher/01-01', { name: 'teacher', unitId: '01-01' }],
    ['#/help', { name: 'help' }],
    ['#/x', { name: 'toc' }],
    ['#/u/01-01/l/abc', { name: 'toc' }],
  ])('%s', (hash, expected) => {
    expect(parseRoute(hash)).toEqual(expected);
  });
});

function renderAt(hash, storage = memoryStorage()) {
  window.location.hash = hash;
  return render(<App book={makeBook()} storage={storage} />);
}

describe('book shell', () => {
  beforeEach(() => { window.location.hash = ''; });

  it('lists every part and unit, linking only units with content', () => {
    renderAt('#/');
    expect(screen.getByText('세계시민, 세계화와 지역 이해')).toBeTruthy();
    expect(screen.getByText('모자이크 세계')).toBeTruthy();
    expect(screen.getByRole('link', { name: /세계화와 세계시민/ }).getAttribute('href')).toBe('#/u/01-01/open');
    expect(screen.getByText('지역 변화의 역동성').closest('a')).toBeNull();
    expect(screen.getByText('세계의 기후와 인간 생활').closest('a')).toBeNull();
  });

  it('shows storage notice once', () => {
    const { unmount } = renderAt('#/', throwingStorage);
    expect(screen.queryByText(/이 기기에서는 학습 기록이 저장되지 않습니다/)).toBeNull();
    unmount();
    renderAt('#/help', throwingStorage);
    expect(screen.getAllByText(/이 기기에서는 학습 기록이 저장되지 않습니다/)).toHaveLength(1);
  });

  it('help page credits Project Zero with license and links', () => {
    renderAt('#/help');
    expect(screen.getByRole('heading', { name: '생각 루틴의 출처' })).toBeTruthy();
    expect(screen.getAllByText(/Project Zero/).length).toBeGreaterThan(0);
    expect(screen.getByText(/CC BY-NC-ND/)).toBeTruthy();
    expect(screen.getByRole('link', { name: /See, Think, Wonder/ }).getAttribute('href')).toBe('https://pz.harvard.edu/resources/see-think-wonder');
    expect(screen.getByRole('link', { name: /CC BY-NC-ND 4.0/ }).getAttribute('href')).toBe('https://creativecommons.org/licenses/by-nc-nd/4.0/');
    expect(screen.getByText(/원래 다섯 질문 가운데 넷만 썼다/)).toBeTruthy();
  });

  it('has no storage notice when storage works', () => {
    renderAt('#/help');
    expect(screen.queryByText(/이 기기에서는 학습 기록이 저장되지 않습니다/)).toBeNull();
  });

  it('never links to the teacher pages from student screens', () => {
    for (const hash of ['#/', '#/help']) {
      const { container, unmount } = renderAt(hash);
      expect(container.querySelector('a[href^="#/teacher"]')).toBeNull();
      unmount();
    }
  });

  it('follows hash changes', () => {
    renderAt('#/');
    act(() => {
      window.location.hash = '#/help';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(screen.getByRole('heading', { level: 1, name: '도움말' })).toBeTruthy();
  });
});
