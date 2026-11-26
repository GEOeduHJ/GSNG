import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { neighborPages } from '../src/book/pageSequence.js';
import App from '../src/book/App.jsx';
import { makeBook, memoryStorage } from './fixtures/book.js';

function bookWithTwoReadyUnits() {
  const book = makeBook();
  book.units.push({ ...book.units[0], id: '01-02', title: '지역 변화의 역동성', lessons: [{ ...book.units[0].lessons[0], id: 'lesson-01-02-1', unitId: '01-02' }] });
  return book;
}

afterEach(() => { vi.unstubAllGlobals(); delete window.matchMedia; window.location.hash = ''; });

describe('neighborPages', () => {
  const book = bookWithTwoReadyUnits();

  it('goes from the opening to lesson 1 and back to the table of contents', () => {
    const { prev, next } = neighborPages(book, { name: 'open', unitId: '01-01' });
    expect(prev).toEqual({ href: '#/', label: '차례' });
    expect(next).toEqual({ href: '#/u/01-01/l/1', label: '절 1 절 1 제목' });
  });

  it('moves between lessons and from the last lesson to the closing page', () => {
    expect(neighborPages(book, { name: 'lesson', unitId: '01-01', index: 2 })).toEqual({
      prev: { href: '#/u/01-01/l/1', label: '절 1 절 1 제목' },
      next: { href: '#/u/01-01/l/3', label: '절 3 절 3 제목' },
    });
    expect(neighborPages(book, { name: 'lesson', unitId: '01-01', index: 3 }).next).toEqual({ href: '#/u/01-01/close', label: '세계화와 세계시민 마무리' });
  });

  it('continues from a closing page to the next ready unit, or the table of contents', () => {
    expect(neighborPages(book, { name: 'close', unitId: '01-01' }).next).toEqual({ href: '#/u/01-02/open', label: '01-02 지역 변화의 역동성' });
    expect(neighborPages(book, { name: 'close', unitId: '01-02' }).next).toEqual({ href: '#/', label: '차례' });
  });

  it('returns nothing for pages outside the reading sequence', () => {
    expect(neighborPages(book, { name: 'help' })).toEqual({ prev: null, next: null });
  });
});

describe('page arrows on screen', () => {
  function renderAt(hash) {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    vi.stubGlobal('IntersectionObserver', class { observe() {} disconnect() {} unobserve() {} });
    window.matchMedia = (query) => ({ matches: query.includes('min-width'), addEventListener() {}, removeEventListener() {} });
    window.location.hash = hash;
    return render(<App book={bookWithTwoReadyUnits()} storage={memoryStorage()} />);
  }

  it('lets a student skip a lesson activity with the next arrow', () => {
    renderAt('#/u/01-01/l/1');
    const next = screen.getByRole('link', { name: '다음 쪽: 절 2 절 2 제목' });
    expect(next.getAttribute('href')).toBe('#/u/01-01/l/2');
    expect(screen.getByRole('link', { name: '이전 쪽: 세계화와 세계시민 여는 쪽' }).getAttribute('href')).toBe('#/u/01-01/open');
  });

  it('lets a student leave the opening page before finishing the question stages', () => {
    renderAt('#/u/01-01/open');
    expect(screen.getByRole('link', { name: '다음 쪽: 절 1 절 1 제목' }).getAttribute('href')).toBe('#/u/01-01/l/1');
  });

  it('shows no arrows on the table of contents or help page', () => {
    const { container } = renderAt('#/help');
    expect(container.querySelector('.page-arrows')).toBeNull();
  });
});
