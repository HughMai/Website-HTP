import { createCrmMock } from "./crm-mock";

let mock: ReturnType<typeof createCrmMock> | null = null;

export default async function globalSetup() {
  mock = createCrmMock();
  const port = await mock.listen();
  // eslint-disable-next-line no-console
  console.log(`[e2e] CRM mock listening on http://127.0.0.1:${port}`);

  return async () => {
    await mock?.close();
  };
}
