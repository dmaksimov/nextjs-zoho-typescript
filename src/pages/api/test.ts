// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  FileStore,
  HeaderMap,
  InitializeBuilder,
  Levels,
  LogBuilder,
  OAuthBuilder,
  ParameterMap,
  Records,
  SDKConfigBuilder,
  USDataCenter,
  UserSignature,
} from '@zohocrm/typescript-sdk-2.1';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = new UserSignature('test@test.com');

  const logger = new LogBuilder()
    .level(Levels.INFO)
    .filePath('./zoho-logs.log')
    .build();

  const dc = USDataCenter.SANDBOX();

  const sdkConfig = new SDKConfigBuilder()
    .autoRefreshFields(false)
    .pickListValidation(true)
    .build();

  const store = new FileStore('./zoho-tokens.txt');

  const token = new OAuthBuilder()
    .clientId('')
    .clientSecret('')
    .refreshToken('')
    .redirectURL('https://test.test/webadmin/zoho')
    .build();

  await new InitializeBuilder()
    .user(user)
    .environment(dc)
    .token(token)
    .store(store)
    .SDKConfig(sdkConfig)
    .logger(logger)
    .initialize();

  const recordOperations = new Records.RecordOperations();

  const paramInstance = new ParameterMap();

  const headerInstance = new HeaderMap();

  const response = await recordOperations.getRecord(
    BigInt('4226718000004578107'),
    'Contacts',
    paramInstance,
    headerInstance
  );

  console.log('response', response.getObject().data[0]);
  res
    .status(200)
    .json({ name: 'John Doe', record: response.getObject().data.length });
}
