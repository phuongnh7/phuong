describe('Test app', () => {
  const timeOut = 60000;
  beforeAll(async () => {
    jest.setTimeout(timeOut);
    await page.goto('http://localhost:3000')
  })

  test('page title', async () => {
    await expect(page.title()).resolves.toBe('Zalora TwitSplit');
  })


  test('should load without error', async () => {
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('Message');
  }, timeOut);

  test('send button is disabled when load', async () => {
    const isDisabled = await page.$eval('#sendBtn', el => el.disabled);
    // Make assertion
    expect(isDisabled).toBeTruthy();
  }, timeOut);


  test('should match a input with id message then fill it with text', async () => {
    await page.waitForSelector('#message');
    await expect(page).toFill('#message', 'James')

    //assertion buuton send is enabled
    const isEnabled = await page.$eval('#sendBtn', el => !el.disabled);
    expect(isEnabled).toBeTruthy();
  })

  test('send short message', async () => {
    await page.waitForSelector('#message');
    await expect(page).toFill('#message', 'short message');
    await page.click("#sendBtn");

    await page.waitForSelector('.post-message');
    const chunkMsgs = await page.$$('div.post-message li');
    expect(chunkMsgs.length).toBe(0);
    await page.screenshot({ path: 'e2e/screenshot/shortMsg.png' });
  })

  test('send long message', async () => {
    await page.waitForSelector('#message');
    await expect(page).toFill('#message', "If a user's input is greater than 50 characters, split it into chunks that each is less than or equal to 50 characters and post each chunk as a separate message");
    await page.click("#sendBtn");

    await page.waitForSelector('.post-message');
    const chunkMsgs = await page.$$('div.post-message li');
    expect(chunkMsgs.length).toBe(4);
    await page.screenshot({ path: 'e2e/screenshot/longMsg.png' });
  })


  test('send message can not split', async () => {
    await page.waitForSelector('#message');
    await expect(page).toFill('#message', "Ifauser'sinputisgreaterthan50characterssplititintochunks that each is less than or equal to 50 chara");
    await page.click("#sendBtn");

    //verify has error message
    const errors = await page.$$('.error');
    expect(errors.length).toBeGreaterThan(0);

    const chunkMsgs = await page.$$('div.post-message li');
    expect(chunkMsgs.length).toBe(0);
    await page.screenshot({ path: 'e2e/screenshot/errorMsg.png' });
  })

})