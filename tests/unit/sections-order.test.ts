import { describe, it, expect } from 'vitest';
import { sectionOrder, sectionNum, type SectionId } from '../../src/lib/sections';
import { writingLive } from '../../src/data/site';

describe('ordem das seções', () => {
  it('põe skills logo depois de experiência', () => {
    expect(sectionOrder.slice(0, 3)).toEqual(['work', 'skills', 'projects']);
  });

  it('só inclui writing quando a seção está no ar', () => {
    expect(sectionOrder.includes('writing')).toBe(writingLive);
  });

  it('termina em estante e contato', () => {
    expect(sectionOrder.slice(-2)).toEqual(['shelf', 'contact']);
  });
});

describe('sectionNum', () => {
  it('numera a partir de 01 com dois dígitos', () => {
    expect(sectionNum('work')).toBe('01');
    expect(sectionNum('skills')).toBe('02');
    expect(sectionNum('projects')).toBe('03');
  });

  it('desloca estante e contato conforme o gate de writing', () => {
    expect(sectionNum('shelf')).toBe(writingLive ? '05' : '04');
    expect(sectionNum('contact')).toBe(writingLive ? '06' : '05');
  });

  it('recusa um id que não está na ordem', () => {
    expect(() => sectionNum('nada' as SectionId)).toThrow();
  });
});
