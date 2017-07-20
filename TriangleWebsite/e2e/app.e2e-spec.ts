import { TriangleWebsitePage } from './app.po';

describe('triangle-website App', () => {
  let page: TriangleWebsitePage;

  beforeEach(() => {
    page = new TriangleWebsitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
