import { UserConfig, SSRConfig } from './types';
export declare const serverSideTranslations: (defaultConfigPath?: string) => (initialLocale: string, namespacesRequired?: string[] | undefined, configOverride?: UserConfig | null) => Promise<SSRConfig>;
