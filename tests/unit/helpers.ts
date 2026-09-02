import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import config from '../../astro.config.mjs';

export const SITE = config.site as string;

type RenderOptions = {
  url?: string;
  props?: Record<string, unknown>;
  slots?: Record<string, unknown>;
};

export async function renderComponent(
  Component: unknown,
  { url = `${SITE}/`, props = {}, slots = {} }: RenderOptions = {}
): Promise<string> {
  const container = await AstroContainer.create({ astroConfig: { site: SITE } });
  return container.renderToString(Component as never, {
    props,
    slots,
    request: new Request(url)
  });
}
