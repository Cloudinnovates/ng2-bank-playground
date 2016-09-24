import { TwistBankPage } from './app.po';

describe('twist-bank App', function() {
  let page: TwistBankPage;

  beforeEach(() => {
    page = new TwistBankPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
