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
import { NextResponse } from 'next/server';

export async function GET() {
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
    .redirectURL('http://test.com/webadmin/zoho')
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

  return NextResponse.json({ foo: 'bar', response: response });
}
